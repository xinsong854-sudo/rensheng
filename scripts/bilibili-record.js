#!/usr/bin/env node

/**
 * B 站视频录制（3 秒 GIF）
 * 使用 puppeteer-extra + stealth 插件
 * 
 * 用法：
 * node scripts/bilibili-record.js [视频 URL]
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

async function recordVideo(url, duration = 3) {
  console.log('🎬 启动 B 站浏览器...\n');
  console.log(`📹 录制视频：${url}`);
  console.log(`⏱️  录制时长：${duration}秒\n`);

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

  const frameDir = path.join('/tmp', `bilibili-frames-${Date.now()}`);
  fs.mkdirSync(frameDir, { recursive: true });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    console.log('🌐 打开视频页面...');
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    console.log('✅ 页面加载成功！\n');

    // 先截图看看页面
    const debugPath = '/home/node/.openclaw/workspace/bilibili-record-debug.png';
    await page.screenshot({ path: debugPath, fullPage: false });
    console.log(`📸 调试截图：${debugPath}\n`);

    // 等待视频播放器加载（更宽松的选择器）
    try {
      await page.waitForSelector('.bpx-player-container, #bilibili-player, .player-place, video, .video-player, .ep-video', { timeout: 10000 });
      console.log('▶️  视频播放器已加载\n');
    } catch (e) {
      console.log('⚠️  未找到视频播放器，可能是：');
      console.log('   1. 需要登录才能观看');
      console.log('   2. 视频已删除或不可用');
      console.log('   3. 页面结构不同\n');
      console.log('📸 继续录制页面（不播放视频）...\n');
    }

    // 尝试自动播放视频
    try {
      await page.click('.bpx-player-ctrl-play, .video-player-button, button[aria-label="播放"]');
      console.log('▶️  点击播放按钮');
    } catch (e) {
      console.log('⚠️  未找到播放按钮，尝试其他方法...');
    }

    // 等待 1 秒让视频开始播放
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 开始录制：每秒截取 3 帧（3fps），录制 duration 秒
    const fps = 3;
    const totalFrames = duration * fps;
    const frameInterval = 1000 / fps;

    console.log(`📸 开始录制：${totalFrames} 帧 @ ${fps}fps\n`);

    for (let i = 0; i < totalFrames; i++) {
      const framePath = path.join(frameDir, `frame_${String(i).padStart(4, '0')}.png`);
      await page.screenshot({ path: framePath, type: 'png' });
      console.log(`   帧 ${i + 1}/${totalFrames}`);
      await new Promise(resolve => setTimeout(resolve, frameInterval));
    }

    console.log('\n🎞️  录制完成，正在合成 GIF...\n');

    // 使用 ffmpeg 合成 GIF
    const outputPath = path.join('/home/node/.openclaw/workspace', `bilibili-video-${Date.now()}.gif`);
    
    const ffmpegCommand = `ffmpeg -y -r ${fps} -i ${frameDir}/frame_%04d.png -vf "fps=${fps},scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "${outputPath}" 2>&1`;
    
    console.log('🔧 执行 ffmpeg 命令...');
    execSync(ffmpegCommand, { stdio: 'inherit' });

    console.log(`\n✅ GIF 已保存：${outputPath}`);
    
    // 清理临时文件
    fs.rmSync(frameDir, { recursive: true, force: true });
    console.log('🧹 已清理临时文件\n');

    // 显示文件信息
    const stats = fs.statSync(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`📊 文件大小：${sizeMB} MB`);

  } catch (error) {
    console.error('❌ 错误:', error.message);
    // 保留临时文件用于调试
    console.log(`📁 临时帧目录：${frameDir}`);
    throw error;
  } finally {
    await browser.close();
    console.log('\n✅ 浏览器已关闭');
  }
}

// 获取命令行参数
const url = process.argv[2] || 'https://www.bilibili.com/video/BV13MQSBQEJV';

recordVideo(url, 3).catch(console.error);
