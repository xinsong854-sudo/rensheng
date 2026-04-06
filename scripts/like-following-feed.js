#!/usr/bin/env node
/**
 * Like all posts from followed users on Neta (Optimized)
 * - Fetch subscribe list
 * - For each user, fetch first 3 pages of their interactive feed
 * - Filter out AI posts (emoji detection - real emoji only)
 * - Skip already-liked posts
 * - Like remaining posts
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.NETA_TOKEN;
const API_BASE = process.env.NETA_API_BASE_URL || 'https://api.talesofai.cn';
const LIKED_POSTS_FILE = path.join(__dirname, '../memory/liked-posts.json');

// Config
const MAX_PAGES_PER_USER = 3;
const PAGE_SIZE = 20;
const DELAY_BETWEEN_REQUESTS = 300;
const DELAY_BETWEEN_USERS = 500;

// Load existing liked posts
let likedData = { lastRun: null, stats: {}, posts: {} };
if (fs.existsSync(LIKED_POSTS_FILE)) {
  try {
    likedData = JSON.parse(fs.readFileSync(LIKED_POSTS_FILE, 'utf-8'));
  } catch (e) {
    console.warn('Failed to load liked posts, starting fresh');
  }
}

// Stats
let totalChecked = 0;
let likedCount = 0;
let skippedAlreadyLiked = 0;
let skippedAiPost = 0;
let skippedEmptyFeed = 0;
let errors = 0;
let apiCallCount = 0;

/**
 * Check if a string contains real emoji characters (not Chinese punctuation)
 */
function containsEmoji(text) {
  if (!text) return false;
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{2600}-\u{26FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F3FB}-\u{1F3FF}\u{20E3}\u{1F1E0}-\u{1F1FF}\u{E0020}-\u{E007F}]/u;
  return emojiRegex.test(text);
}

/**
 * Determine if a post is AI-generated
 */
function isAiPost(post) {
  const name = post.name || '';
  const description = post.description || '';
  const ctaPrompt = post.cta_info?.launch_prompt?.core_input || '';
  
  // Check title/description for emoji
  if (containsEmoji(name) || containsEmoji(description)) {
    return true;
  }
  
  // Interactive posts with templates = AI-generated
  if (post.is_interactive && ctaPrompt) {
    return true;
  }
  
  return false;
}

/**
 * Make HTTPS request
 */
function apiRequest(urlPath, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, API_BASE);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        'x-token': TOKEN,
        'x-platform': 'nieta-app/web',
        'Content-Type': 'application/json',
      },
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        apiCallCount++;
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${data.substring(0, 200)}`));
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch subscribe list (all pages)
 */
async function fetchSubscribeList() {
  const allUsers = new Map();
  let pageIndex = 0;
  
  while (true) {
    console.log(`Fetching subscribe list page ${pageIndex}...`);
    const data = await apiRequest(`/v1/user/subscribe-list?page_size=50&page_index=${pageIndex}`);
    
    if (data.list && data.list.length > 0) {
      for (const user of data.list) {
        allUsers.set(user.uuid, user);
      }
    }
    
    if (!data.has_next) break;
    pageIndex++;
    await sleep(DELAY_BETWEEN_REQUESTS);
  }
  
  return Array.from(allUsers.values());
}

/**
 * Fetch user's interactive feed (limited pages)
 */
async function fetchUserFeed(userUuid) {
  const posts = [];
  let hasMore = true;
  let pagesFetched = 0;
  
  while (hasMore && pagesFetched < MAX_PAGES_PER_USER) {
    try {
      const data = await apiRequest(
        `/v1/home/feed/interactive?scene=personal_feed&target_user_uuid=${userUuid}&page_size=${PAGE_SIZE}`
      );
      pagesFetched++;
      
      if (data.module_list && data.module_list.length > 0) {
        for (const mod of data.module_list) {
          if (mod.json_data) {
            posts.push(mod.json_data);
          }
        }
      }
      
      hasMore = data.page_data?.has_next_page || false;
      if (hasMore && pagesFetched < MAX_PAGES_PER_USER) {
        await sleep(DELAY_BETWEEN_REQUESTS);
      }
    } catch (e) {
      console.error(`  API error: ${e.message}`);
      hasMore = false;
    }
  }
  
  return posts;
}

/**
 * Like a collection (story)
 */
async function likeCollection(uuid) {
  return apiRequest('/v1/story/story-like', 'PUT', {
    storyId: uuid,
    is_cancel: false
  });
}

/**
 * Save progress
 */
function saveProgress() {
  likedData.lastRun = new Date().toISOString();
  likedData.stats = {
    totalPosts: totalChecked,
    likedCount,
    skippedCount: skippedAlreadyLiked + skippedAiPost + skippedEmptyFeed,
    aiPostCount: skippedAiPost,
    alreadyLikedCount: skippedAlreadyLiked,
    errors
  };
  fs.writeFileSync(LIKED_POSTS_FILE, JSON.stringify(likedData, null, 2));
}

/**
 * Main
 */
async function main() {
  console.log('=== Starting Follow Feed Like Task ===');
  console.log(`API: ${API_BASE}`);
  console.log(`Max pages per user: ${MAX_PAGES_PER_USER}`);
  console.log(`Already liked posts: ${Object.keys(likedData.posts).length}\n`);
  
  // Step 1: Get subscribe list
  console.log('Step 1: Fetching subscribe list...');
  const users = await fetchSubscribeList();
  console.log(`Found ${users.length} unique followed users.\n`);
  
  // Step 2: Process each user's feed
  console.log('Step 2: Processing user feeds...\n');
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const startTime = Date.now();
    
    let feedPosts;
    try {
      feedPosts = await fetchUserFeed(user.uuid);
    } catch (e) {
      console.error(`[${i + 1}/${users.length}] ${user.name} - Error: ${e.message}`);
      errors++;
      continue;
    }
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    
    if (feedPosts.length === 0) {
      console.log(`[${i + 1}/${users.length}] ${user.name} - No posts (${elapsed}s)`);
      skippedEmptyFeed++;
      await sleep(DELAY_BETWEEN_USERS);
      continue;
    }
    
    console.log(`[${i + 1}/${users.length}] ${user.name} - ${feedPosts.length} posts (${elapsed}s)`);
    
    for (const post of feedPosts) {
      const uuid = post.uuid;
      const name = (post.name || '(no title)').substring(0, 40);
      const creator = post.creator?.nick_name || 'unknown';
      totalChecked++;
      
      // Check if already liked in local cache
      if (likedData.posts[uuid]) {
        skippedAlreadyLiked++;
        continue;
      }
      
      // Check API like status
      if (post.likeStatus === 'liked') {
        skippedAlreadyLiked++;
        likedData.posts[uuid] = { name, creator, likedAt: new Date().toISOString(), source: 'api_status' };
        continue;
      }
      
      // Check if AI post
      if (isAiPost(post)) {
        skippedAiPost++;
        continue;
      }
      
      // Like the post
      try {
        await likeCollection(uuid);
        likedCount++;
        likedData.posts[uuid] = { name, creator, likedAt: new Date().toISOString() };
        console.log(`  ❤️ ${name}`);
        await sleep(DELAY_BETWEEN_REQUESTS);
      } catch (e) {
        console.error(`  ❌ Failed: ${name} - ${e.message}`);
        errors++;
      }
    }
    
    saveProgress();
    await sleep(DELAY_BETWEEN_USERS);
  }
  
  console.log('\n=== Task Complete ===');
  console.log(`Total posts checked: ${totalChecked}`);
  console.log(`Liked: ${likedCount}`);
  console.log(`Skipped (already liked): ${skippedAlreadyLiked}`);
  console.log(`Skipped (AI posts): ${skippedAiPost}`);
  console.log(`Skipped (empty feeds): ${skippedEmptyFeed}`);
  console.log(`Errors: ${errors}`);
  console.log(`API calls: ${apiCallCount}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  saveProgress();
  process.exit(1);
});
