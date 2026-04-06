#!/usr/bin/env node

/**
 * 捏 Ta 管理后台登录
 * 使用 puppeteer-extra + stealth 插件
 * 
 * 用法：
 * node scripts/nieta-login.js
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

async function login() {
  console.log('🎬 启动浏览器...\n');
  console.log('📍 目标：https://app.nieta.art/mine\n');

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
      '--window-size=1920,1080',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-site-isolation-trials',
      '--allow-running-insecure-content'
    ],
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    }
  });

  const cookiePath = path.join('/home/node/.openclaw/workspace', 'nieta-cookies.json');

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    // 检查是否有保存的 Cookie
    if (fs.existsSync(cookiePath)) {
      console.log('📁 发现保存的 Cookie，尝试自动登录...\n');
      const cookies = JSON.parse(fs.readFileSync(cookiePath, 'utf-8'));
      await page.setCookie(...cookies);
    }

    console.log('🌐 打开捏 Ta 管理后台...');
    
    // 先访问首页，再跳转到管理后台
    await page.goto('https://app.nieta.art', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    console.log('✅ 首页加载成功，跳转到管理后台...');
    
    await page.goto('https://app.nieta.art/mine', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    console.log('✅ 页面加载成功！\n');

    // 等待 5 秒让页面完全加载（包括 JavaScript）
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 检查页面是否有内容
    const bodyContent = await page.evaluate(() => document.body.innerHTML.length);
    console.log(`📄 页面内容长度：${bodyContent} 字符\n`);

    // 截图
    const screenshotPath = path.join('/home/node/.openclaw/workspace', 'nieta-mine-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 截图已保存：${screenshotPath}\n`);

    // 检查登录状态
    const isLoggedIn = await page.evaluate(() => {
      // 检查是否有用户头像/昵称
      const avatar = document.querySelector('.user-avatar, .avatar, img[src*="avatar"]');
      const username = document.querySelector('.user-name, .username, .nickname');
      const logoutBtn = document.querySelector('[class*="logout"], [class*="exit"]');
      
      return {
        hasAvatar: !!avatar,
        hasUsername: !!username,
        hasLogout: !!logoutBtn,
        isLoggedIn: !!(avatar || username || logoutBtn)
      };
    });

    console.log('🔐 登录状态检测:');
    console.log(`   头像：${isLoggedIn.hasAvatar ? '✅' : '❌'}`);
    console.log(`   用户名：${isLoggedIn.hasUsername ? '✅' : '❌'}`);
    console.log(`   退出按钮：${isLoggedIn.hasLogout ? '✅' : '❌'}`);
    console.log(`   已登录：${isLoggedIn.isLoggedIn ? '✅' : '❌'}\n`);

    if (isLoggedIn.isLoggedIn) {
      console.log('✅ 已经登录！保存 Cookie 供下次使用...\n');
      
      // 获取并保存 Cookie
      const cookies = await page.cookies();
      const authCookies = cookies.filter(c => ['session', 'token', 'user', 'nieta', 'JWT'].some(k => c.name.toLowerCase().includes(k)));
      
      fs.writeFileSync(cookiePath, JSON.stringify(cookies, null, 2), 'utf-8');
      console.log(`📁 Cookie 已保存：${cookiePath}`);
      console.log(`🔑 认证 Cookie: ${authCookies.length} 个\n`);
      
      // 获取用户信息
      const userInfo = await page.evaluate(() => {
        const name = document.querySelector('.user-name, .username, .nickname')?.textContent?.trim();
        const email = document.querySelector('.user-email, .email')?.textContent?.trim();
        return { name, email };
      });
      
      console.log('👤 用户信息:');
      console.log(`   用户名：${userInfo.name || '未知'}`);
      console.log(`   邮箱：${userInfo.email || '未知'}\n`);
    } else {
      console.log('⚠️  未登录，需要先生手动登录...\n');
      console.log('💡 提示：');
      console.log('   1. 在打开的浏览器中登录捏 Ta');
      console.log('   2. 登录后 Cookie 会自动保存');
      console.log('   3. 下次运行脚本会自动登录\n');
    }

    console.log('⏱️  浏览器将在 30 秒后关闭...');
    await new Promise(resolve => setTimeout(resolve, 30000));

  } catch (error) {
    console.error('❌ 错误:', error.message);
    throw error;
  } finally {
    await browser.close();
    console.log('\n✅ 浏览器已关闭');
  }
}

login().catch(console.error);
