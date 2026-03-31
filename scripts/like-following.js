const https = require('https');
const fs = require('fs');
const path = require('path');

const NETA_TOKEN = process.env.NETA_TOKEN;
const BASE_URL = 'https://api.talesofai.cn';
const LIKED_FILE = path.join(__dirname, '../memory/liked-posts.json');

// Proper emoji regex - matches Unicode emoji ranges only (not Chinese punctuation)
const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{231A}-\u{231B}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2614}\u{2615}\u{2648}-\u{2653}\u{267F}\u{2693}\u{26A1}\u{26AA}-\u{26AB}\u{26BD}-\u{26BE}\u{26C4}-\u{26C5}\u{26CE}\u{26D4}\u{26EA}\u{26F2}-\u{26F3}\u{26F5}\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}]/u;

function hasEmoji(text) {
    return EMOJI_REGEX.test(text);
}

function httpRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ raw: data });
                }
            });
        });
        req.on('error', reject);
        if (postData) {
            req.write(JSON.stringify(postData));
        }
        req.end();
    });
}

async function getSubscribeList() {
    const options = {
        hostname: 'api.talesofai.cn',
        path: '/v1/user/subscribe-list?page_size=100',
        method: 'GET',
        headers: {
            'x-token': NETA_TOKEN,
            'x-platform': 'nieta-app/web'
        }
    };
    const result = await httpRequest(options);
    return result.list || [];
}

async function getUserStories(userUuid) {
    const options = {
        hostname: 'api.talesofai.cn',
        path: `/v3/user/${userUuid}/story?page_size=30`,
        method: 'GET',
        headers: {
            'x-token': NETA_TOKEN,
            'x-platform': 'nieta-app/web'
        }
    };
    const result = await httpRequest(options);
    return result.list || [];
}

async function likeStory(storyUuid) {
    const options = {
        hostname: 'api.talesofai.cn',
        path: '/v3/story/like',
        method: 'POST',
        headers: {
            'x-token': NETA_TOKEN,
            'x-platform': 'nieta-app/web',
            'Content-Type': 'application/json'
        }
    };
    const result = await httpRequest(options, { story_uuid: storyUuid });
    return result.code === 0;
}

function loadLikedPosts() {
    try {
        const fileData = JSON.parse(fs.readFileSync(LIKED_FILE, 'utf8'));
        const likedSet = new Set();
        const details = fileData.details || [];
        details.forEach(item => {
            if (item.action === 'liked') {
                likedSet.add(item.story_uuid);
            }
        });
        return { data: { details: details, total_users: fileData.total_users || 0 }, likedSet };
    } catch (e) {
        return { data: { details: [], total_users: 0 }, likedSet: new Set() };
    }
}

function saveLikedPosts(likedData, newLikes, stats) {
    const timestamp = new Date().toISOString();
    const existingDetails = (likedData && likedData.data && Array.isArray(likedData.data.details)) ? likedData.data.details : [];
    const details = [...existingDetails];
    
    newLikes.forEach(like => {
        // Remove existing entry if present
        const existingIndex = details.findIndex(d => d.story_uuid === like.story_uuid);
        if (existingIndex >= 0) {
            details.splice(existingIndex, 1);
        }
        // Add new entry
        details.push({
            story_uuid: like.story_uuid,
            title: like.title,
            user_uuid: like.user_uuid,
            user_name: like.user_name,
            action: like.action,
            timestamp: like.timestamp
        });
    });
    
    // Update summary stats
    const likedDetails = details.filter(d => d.action === 'liked');
    const aiSkipped = details.filter(d => d.action === 'skipped_ai');
    const alreadyLiked = details.filter(d => d.action === 'already_liked');
    
    const newData = {
        timestamp: timestamp,
        total_users: stats.totalUsers,
        total_posts_checked: details.length,
        total_liked: likedDetails.length,
        skipped_ai: aiSkipped.length,
        skipped_already_liked: alreadyLiked.length,
        details: details
    };
    
    fs.writeFileSync(LIKED_FILE, JSON.stringify(newData, null, 2));
}

async function main() {
    console.log('Starting Neta Following Like Task...\n');
    
    // Load existing liked posts
    const { data: likedData, likedSet } = loadLikedPosts();
    console.log(`Loaded ${likedSet.size} previously liked posts\n`);
    
    // Get subscribe list
    const users = await getSubscribeList();
    console.log(`Found ${users.length} followed users\n`);
    
    let totalPosts = 0;
    let likedCount = 0;
    let skippedAi = 0;
    let skippedAlready = 0;
    const newLikes = [];
    
    // Process each user
    for (const user of users) {
        const userUuid = user.uuid;
        const userName = user.name;
        
        console.log(`Processing: ${userName} (${userUuid})`);
        
        try {
            const stories = await getUserStories(userUuid);
            
            for (const story of stories) {
                const storyUuid = story.uuid;
                const title = story.title;
                totalPosts++;
                
                // Check if already liked
                if (likedSet.has(storyUuid)) {
                    console.log(`  ⊘ Skip (already liked): ${title}`);
                    skippedAlready++;
                    continue;
                }
                
                // Check for emoji (AI post indicator)
                if (hasEmoji(title)) {
                    console.log(`  ⊘ Skip (AI post with emoji): ${title}`);
                    skippedAi++;
                    // Record as skipped
                    newLikes.push({
                        story_uuid: storyUuid,
                        title: title,
                        user_uuid: userUuid,
                        user_name: userName,
                        action: 'skipped_ai',
                        timestamp: new Date().toISOString()
                    });
                    continue;
                }
                
                // Like the post
                console.log(`  ♥ Liking: ${title}`);
                const success = await likeStory(storyUuid);
                
                if (success) {
                    console.log(`    ✓ Success`);
                    likedCount++;
                    newLikes.push({
                        story_uuid: storyUuid,
                        title: title,
                        user_uuid: userUuid,
                        user_name: userName,
                        action: 'liked',
                        timestamp: new Date().toISOString()
                    });
                    likedSet.add(storyUuid);
                } else {
                    console.log(`    ✗ Failed`);
                }
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 150));
            }
        } catch (error) {
            console.error(`  Error processing user ${userName}: ${error.message}`);
        }
    }
    
    // Save results
    const stats = { totalUsers: users.length, totalPosts: totalPosts, liked: likedCount, skippedAi: skippedAi, skippedAlready: skippedAlready };
    saveLikedPosts(likedData, newLikes, stats);
    
    // Print summary
    console.log('\n========== SUMMARY ==========');
    console.log(`Total users processed: ${users.length}`);
    console.log(`Total posts checked: ${totalPosts}`);
    console.log(`Actual likes: ${likedCount}`);
    console.log(`Skipped (AI posts): ${skippedAi}`);
    console.log(`Skipped (already liked): ${skippedAlready}`);
    console.log('=============================\n');
}

main().catch(console.error);
