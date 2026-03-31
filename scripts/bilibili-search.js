#!/usr/bin/env node

/**
 * B 站搜索视频并截图
 * 使用 puppeteer-extra + stealth 插件绕过反爬
 * 
 * 用法：
 * node scripts/bilibili-search.js [搜索关键词]
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// 启用 stealth 插件
puppeteer.use(StealthPlugin());

async function searchAndScreenshot(keyword) {
  console.log('🎬 启动 B 站浏览器...\n');
  console.log(`🔍 搜索关键词：${keyword}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1920,1080'
    ],
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });

  try {
    const page = await browser.newPage();

    // 设置真实的 User-Agent
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    await page.setUserAgent(userAgent);

    // 绕过 webdriver 检测
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
      });
    });

    // 打开 B 站搜索页面
    const searchUrl = `https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword)}`;
    console.log(`🌐 打开搜索页面：${searchUrl}`);
    
    await page.goto(searchUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    console.log('✅ 页面加载成功！\n');

    // 等待视频列表加载
    await page.waitForSelector('.bili-video-card, .video-list-item', { timeout: 10000 });
    
    // 获取搜索结果数量
    const videoCards = await page.$$('.bili-video-card');
    const videoCount = videoCards.length;
    console.log(`📊 找到约 ${videoCount} 个视频\n`);

    // 获取前 5 个视频的信息
    console.log('📺 前 5 个视频:');
    const videos = await page.$$eval('.bili-video-card', cards => {
      return cards.slice(0, 5).map(card => {
        // 尝试多种选择器获取标题
        const titleEl = card.querySelector('[title]') || card.querySelector('.bili-title') || card.querySelector('.video-title');
        const title = titleEl?.getAttribute('title') || titleEl?.textContent?.trim() || '无标题';
        
        // 获取 UP 主
        const upEl = card.querySelector('.up-name') || card.querySelector('.author-name');
        const up = upEl?.textContent?.trim() || '未知 UP';
        
        // 获取播放量
        const playEl = card.querySelector('.play-icon') || card.querySelector('.stat-icon');
        const play = playEl?.parentElement?.textContent?.trim() || '0';
        
        // 获取视频链接
        const linkEl = card.querySelector('a[href*="/video/"]');
        const link = linkEl?.getAttribute('href') || '';
        
        return { title, up, play, link };
      });
    });

    videos.forEach((v, i) => {
      console.log(`  ${i + 1}. ${v.title}`);
      console.log(`     UP: ${v.up} | 播放：${v.play}`);
      if (v.link) console.log(`     链接：${v.link}`);
    });
    console.log('');

    // 截图
    const safeKeyword = keyword.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
    const screenshotPath = `/home/node/.openclaw/workspace/bilibili-search-${safeKeyword}.png`;
    
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 搜索结果截图：${screenshotPath}\n`);

    // 点击第一个视频
    if (videos.length > 0 && videos[0].link) {
      console.log('▶️  点击第一个视频...');
      
      // 直接导航到视频页面（修复链接）
      let videoUrl = videos[0].link;
      if (!videoUrl.startsWith('http')) {
        // 去掉可能重复的域名
        videoUrl = videoUrl.replace('//www.bilibili.com', '');
        videoUrl = `https://www.bilibili.com${videoUrl}`;
      }
      console.log(`🌐 打开视频：${videoUrl}`);
      
      await page.goto(videoUrl, {
        waitUntil: 'networkidle2',
        timeout: 60000
      });
      
      // 等待视频播放器加载
      await page.waitForSelector('#bilibili-player, .player-place, video', { timeout: 10000 });
      
      const videoTitle = await page.$eval('h1.video-title, #video_title, .video-info-title', el => el?.textContent?.trim() || '未知标题').catch(() => '未知标题');
      console.log(`✅ 进入视频页面：${videoTitle}\n`);

      // 视频页面截图
      const videoScreenshotPath = `/home/node/.openclaw/workspace/bilibili-video-${safeKeyword}.png`;
      await page.screenshot({ path: videoScreenshotPath, fullPage: true });
      console.log(`📸 视频页面截图：${videoScreenshotPath}\n`);
    } else if (videos.length > 0) {
      console.log('⚠️  未找到视频链接，跳过点击步骤\n');
    }

    console.log('⏱️  浏览器将在 10 秒后关闭...');
    await new Promise(resolve => setTimeout(resolve, 10000));

  } catch (error) {
    console.error('❌ 错误:', error.message);
    throw error;
  } finally {
    await browser.close();
    console.log('\n✅ 浏览器已关闭');
  }
}

// 获取命令行参数
const keyword = process.argv[2] || '危机前夜';

searchAndScreenshot(keyword).catch(console.error);
