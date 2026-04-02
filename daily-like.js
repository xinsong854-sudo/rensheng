#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Emoji regex pattern
const emojiRegex = /[\p{Emoji}]/u;

// Get fresh feed
console.log('Fetching latest feed...');
const feedOutput = execSync('npx -y @talesofai/neta-skills@latest request_interactive_feed --page_size 40', {
  encoding: 'utf8',
  env: process.env
});

const feed = JSON.parse(feedOutput);

// Filter posts: unliked, no emoji in title, normal_unit type (human-created)
const toLike = feed.module_list
  .filter(m => m.module_id === 'normal_unit')
  .map(m => m.json_data)
  .filter(p => p.likeStatus === 'unliked')
  .filter(p => !emojiRegex.test(p.name))
  .slice(0, 15);  // Like up to 15 posts per day

console.log(`Found ${toLike.length} posts to like`);

// Load existing liked posts
const memoryDir = path.join(process.cwd(), 'memory');
const likedFile = path.join(memoryDir, 'liked-posts.json');

let likedPosts = { lastRun: null, posts: {} };
if (fs.existsSync(likedFile)) {
  likedPosts = JSON.parse(fs.readFileSync(likedFile, 'utf8'));
}

const results = {
  timestamp: new Date().toISOString(),
  liked: [],
  skipped: [],
  errors: []
};

// Like each post
for (const post of toLike) {
  const uuid = post.uuid;
  
  // Skip if already liked today
  if (likedPosts.posts[uuid]) {
    console.log(`Skipping (already liked): ${post.name} by ${post.creator.nick_name}`);
    results.skipped.push({ uuid, name: post.name, creator: post.creator.nick_name, reason: 'already_liked' });
    continue;
  }
  
  try {
    console.log(`Liking: ${post.name} by ${post.creator.nick_name}`);
    
    // Use neta-skills CLI to like the collection
    execSync(`npx -y @talesofai/neta-skills@latest like_collection --uuid "${uuid}"`, {
      encoding: 'utf8',
      env: process.env,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    results.liked.push({
      uuid,
      name: post.name,
      creator: post.creator.nick_name,
      likedAt: new Date().toISOString()
    });
    
    // Mark as liked
    likedPosts.posts[uuid] = {
      name: post.name,
      creator: post.creator.nick_name,
      likedAt: new Date().toISOString()
    };
    
    // Small delay to avoid rate limiting
    const waitMs = 500;
    execSync(`sleep 0.5`, { stdio: 'pipe' });
    
  } catch (err) {
    console.error(`Error liking ${uuid}: ${err.message}`);
    results.errors.push({ uuid, name: post.name, error: err.message });
  }
}

// Update liked posts file
likedPosts.lastRun = new Date().toISOString();
fs.mkdirSync(memoryDir, { recursive: true });
fs.writeFileSync(likedFile, JSON.stringify(likedPosts, null, 2));

// Summary
console.log('\n=== Daily Like Summary ===');
console.log(`Liked: ${results.liked.length} posts`);
console.log(`Skipped: ${results.skipped.length} posts`);
console.log(`Errors: ${results.errors.length} posts`);
console.log(`Total liked posts in history: ${Object.keys(likedPosts.posts).length}`);

// Output JSON for reporting
console.log('\n=== JSON Result ===');
console.log(JSON.stringify({
  total_liked: results.liked.length,
  total_skipped: results.skipped.length,
  total_errors: results.errors.length,
  liked_posts: results.liked
}, null, 2));
