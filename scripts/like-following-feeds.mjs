import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Load liked posts
const memoryPath = path.join('/home/node/.openclaw/workspace/memory/liked-posts.json');
let memoryData = { posts: {}, lastRun: null, stats: null };
if (fs.existsSync(memoryPath)) {
  memoryData = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
}

const likedPostIds = new Set(Object.keys(memoryData.posts || {}));

// Emoji detection: match real Unicode emoji characters, NOT Chinese punctuation
const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{231A}\u{231B}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{24C2}\u{25AA}\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{1F1E0}-\u{1F1FF}]/gu;

function hasRealEmoji(text) {
  if (!text) return false;
  return EMOJI_REGEX.test(text);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getFeed(userId, pageSize = 20) {
  try {
    const result = execSync(
      `npx -y @talesofai/neta-skills@latest request_interactive_feed --scene "personal_feed" --target_user_uuid "${userId}" --page_size ${pageSize}`,
      { timeout: 30000, maxBuffer: 10 * 1024 * 1024 }
    ).toString();
    
    const data = JSON.parse(result);
    return data.module_list || [];
  } catch (e) {
    console.error(`  Feed error for ${userId}: ${e.message.slice(0, 100)}`);
    return [];
  }
}

function likePost(uuid) {
  try {
    execSync(
      `npx -y @talesofai/neta-skills@latest like_collection --uuid "${uuid}" --is_cancel false`,
      { timeout: 15000, maxBuffer: 1024 * 1024 }
    ).toString();
    return true;
  } catch (e) {
    return false;
  }
}

// All unique subscribed user UUIDs (from 2 pages, deduplicated)
const allUsers = [
  "03a363afb33b4c1195a3084bdb400f85","065c51c544ce46b691ba89ac9df6c86d","1024f0bd80de43f5b765935b35701611",
  "1e79bb92d7ad4341885cdc47a6993368","200f380f702949118c5e5cc434656c41","27a299588150477680f15fb23e1e0e56",
  "359af92e1e4e48ea90d85005d8d9bfbf","3d1ce6c2ac7348989e89e25f99220929","4dc5d4be9edb4760b1d1ad9400f3007b",
  "58267c15d24247a99ff7aeab554cd8f0","5b752c742d75430cb2cead2615cc4594","5c4d01ec00004480b70d5f1ade38630c",
  "5c4e260cbc464d4e943fc8dcd6999cb7","5f471b30e18043b29570812428dfbd4e","64ff30f06a1949cc940fd3a26ed0cf3b",
  "66f0b4707f1c4bddae59237c60b6069b","6722053a1ad14007acede95a0d6aa758","6da1d4c0ba5440389cf73c9b8da3cdf5",
  "7170003af11b4949899e8640e502b974","72eb47fd3a5a409482b05373188323c8","785d16cc3595466481569ca264c6b927",
  "7bba62ca248e4cffb50834ac94cb7ec9","7ce8a2585a244a02bf3ac4a410fe7799","94f4048e3661402d8f69ba7d894596fa",
  "9805f08fa4c4472baafdd28468050082","a313f864801340819477e74750a76d5a","a4007a70808a4722bb03470b787458a6",
  "a4fecf550189406d93a4bf81c8392c5e","ab95b26beca34338948b05077ead7738","ac587b0d44c645359d42e4b7d5842c80",
  "b1b1bddcf964461e8388712bf5858182","b54055229bff4748b9c7ca70e78cbb9f","b73d425abee54f24b00015d454819942",
  "b91c3751186d4f649576686168347900","bd2b96ed296c42e6818f560034f211ab","c1515fc7832a483989e48a0bc7556eb1",
  "c28e8f12c02d42e29e899865d3ed6511","c68eaf16916b44b293ab951b6eef5977","d606047dc0834536808ce664e390fccd",
  "d716e321b72249f18acb0b398e8aa9f4","d89e2a50b0674a35bef8fd01b4cd9c5b","d9dba4a0936449c285f275a61f12d3f9",
  "db560a85a4b24912921bd9d8e872a46b","e67067ed54cf465e8a2662cf57d70b2e","ec10cc5c9f0b47ffa5dea95d2cca4d47",
  "f0efe0dad00240b0b9a8ee3ee6eb2ea9","f4bbceb83e7846f0aa197429710e8fb0","faa5be8c90734da2acdf8abb3746196d",
  "fbbee96a06624b7589549466991cc15a","fffe71f7488d4631b12f5dea5c340765","17049dd3bb9448f2adcdccfb81c319af",
  "179e3837a3044a369c627a2139492886","1b7795d91e0e4447bddbe6f9a9f2ae58","1c66eb8b462344bb962b0dc069895f6c",
  "24ca3adc2205416680f1ae970208640f","2b913c0ab7c548109d2556dbc20f4243","33d2a9f8e07b4082889974553ddee0b2",
  "40656db1ad584af1a3abe28fee4705e4","4128e4f5916044e48c8b8baedbe07fc1","465f92d23d8d4d5b91e830cb89b15ad1",
  "492656f8ff0b428e89254ba52add4215","498ca1c6154f436597ed576def9056a2","583d5e221d1f46a78c097262c4845d41",
  "6677c91a04f84a039398cd7462f94a9f","6a395a8a78eb4a12aa6810e0dc0212ae","6d4060eb3a5b41e780d30dcd9b2f3861",
  "780228e44c6d4bd588408f391e2bbbdb","880dca2f605e4f4aa3d8eac7176266ab","8dbb3b6baf304025acae98896c18b98e",
  "9ffcad2ea18642879d90626753337c34","a346d641c6ad4fd295f26c27f6b4f3f7","a4d091c420fa41c7b8d2783d4a6b0c01",
  "ae66527a31ae4b4c9c94e8d60bf6d61a","b0f7cf3c64a64d31914f6b1e43879945","bd475d65674c434b87f8ea2fc0a2f5aa",
  "bddb5569596e49a0834e2d9210f13a11","c01dc9bc3a424789863e5ef9326cd574","c28ea3cb42d14ee3b8e4ae40e2d00374",
  "c2cf170b56874bf5ba28e73dc9d78d62","ca35d51082324204a486f70045889da8","cc232d2e3e034f7dadcbcfc3385787f0",
  "d8c245ddbe1549f4a3b48b318cc41cb4","dea40716eae3429a88b884713e6c2f40","e355b7d1cf144c5aac5f944bcabbc07b",
  "e3790ddaac4b406cac7d25cfc5c46fc5","ec8c80fe3a71450ab3e8964375631f65",
];

const uniqueUsers = [...new Set(allUsers)];
console.log(`Total unique users: ${uniqueUsers.length}`);

let totalPosts = 0;
let likedCount = 0;
let skippedAlreadyLiked = 0;
let skippedAiPost = 0;
let skippedError = 0;
let apiErrors = 0;

for (let i = 0; i < uniqueUsers.length; i++) {
  const userId = uniqueUsers[i];
  console.log(`\n[${i + 1}/${uniqueUsers.length}] Fetching feed for user ${userId}...`);
  
  const modules = getFeed(userId, 20);
  
  if (modules.length === 0) {
    console.log(`  No posts found`);
    continue;
  }
  
  console.log(`  Got ${modules.length} posts`);
  
  for (const mod of modules) {
    totalPosts++;
    const jd = mod.json_data || {};
    const postId = mod.data_id || jd.uuid;
    const postTitle = jd.name || '(无标题)';
    const creator = jd.creator?.nick_name || '未知';
    const likeStatus = jd.likeStatus;
    
    // Already liked via API
    if (likeStatus === 'liked') {
      skippedAlreadyLiked++;
      continue;
    }
    
    // Already liked in our records
    if (likedPostIds.has(postId)) {
      skippedAlreadyLiked++;
      continue;
    }
    
    // Check for AI posts (posts with real emoji in title)
    if (hasRealEmoji(postTitle)) {
      skippedAiPost++;
      memoryData.posts[postId] = {
        name: postTitle,
        creator,
        likedAt: new Date().toISOString(),
        reason: 'ai_post_emoji'
      };
      continue;
    }
    
    // Like the post
    console.log(`  ▶ Liking: "${postTitle}" by ${creator}`);
    const success = likePost(postId);
    
    if (success) {
      likedCount++;
      memoryData.posts[postId] = {
        name: postTitle,
        creator,
        likedAt: new Date().toISOString()
      };
      await sleep(500);
    } else {
      console.log(`  ✗ Like failed for: "${postTitle}"`);
      skippedError++;
      apiErrors++;
    }
  }
}

// Save results
memoryData.lastRun = new Date().toISOString();
memoryData.stats = {
  totalPosts,
  likedCount,
  skippedCount: skippedAlreadyLiked + skippedAiPost + skippedError,
  aiPostCount: skippedAiPost,
  alreadyLikedCount: skippedAlreadyLiked,
  errors: apiErrors
};

fs.writeFileSync(memoryPath, JSON.stringify(memoryData, null, 2));

console.log('\n===== RESULTS =====');
console.log(`Total posts checked: ${totalPosts}`);
console.log(`Liked: ${likedCount}`);
console.log(`Skipped (already liked): ${skippedAlreadyLiked}`);
console.log(`Skipped (AI/emoji posts): ${skippedAiPost}`);
console.log(`Skipped (errors): ${skippedError}`);
console.log(`Total skipped: ${skippedAlreadyLiked + skippedAiPost + skippedError}`);
console.log(`Errors: ${apiErrors}`);
