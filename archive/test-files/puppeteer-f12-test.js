const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/home/node/.openclaw/workspace';
const URL = 'https://xinsong854-sudo.github.io/tujian/';

async function runTest() {
    console.log('🚀 启动 Puppeteer 测试...');
    
    const consoleLogs = [];
    const errors = [];
    
    // 启动 headless Chrome
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });
    
    try {
        const page = await browser.newPage();
        
        // 设置页面视口
        await page.setViewport({ width: 1280, height: 720 });
        
        // 监听所有 console 消息
        page.on('console', msg => {
            const type = msg.type();
            const text = msg.text();
            const logEntry = `[${type.toUpperCase()}] ${new Date().toISOString()} - ${text}`;
            consoleLogs.push(logEntry);
            console.log(`📝 Console (${type}): ${text}`);
        });
        
        // 监听页面错误
        page.on('pageerror', error => {
            const errorEntry = `[PAGE ERROR] ${new Date().toISOString()} - ${error.message}`;
            errors.push(errorEntry);
            console.log(`❌ Page Error: ${error.message}`);
        });
        
        // 监听请求失败
        page.on('requestfailed', request => {
            const failEntry = `[REQUEST FAILED] ${new Date().toISOString()} - ${request.url()}`;
            errors.push(failEntry);
            console.log(`❌ Request Failed: ${request.url()}`);
        });
        
        console.log(`🌐 打开网址：${URL}`);
        await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // 等待页面加载完成
        console.log('⏳ 等待页面加载完成（3 秒）...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // 截图登录界面
        const loginScreenshotPath = path.join(WORKSPACE, 'f12-login-screenshot.png');
        console.log(`📸 截图登录界面：${loginScreenshotPath}`);
        await page.screenshot({ path: loginScreenshotPath, fullPage: false });
        
        // 查找用户名输入框
        console.log('🔍 查找用户名输入框...');
        
        // 尝试多种选择器查找用户名输入框
        let usernameInput = null;
        const selectors = [
            'input[type="text"]',
            'input[name="username"]',
            'input[placeholder*="用户"]',
            'input[placeholder*="user"]',
            'input[id*="user"]',
            'input[id*="name"]',
            '#username',
            '#user',
            '.username',
            '[data-testid="username"]'
        ];
        
        for (const selector of selectors) {
            try {
                usernameInput = await page.$(selector);
                if (usernameInput) {
                    console.log(`✅ 找到用户名输入框：${selector}`);
                    break;
                }
            } catch (e) {
                // 继续尝试下一个选择器
            }
        }
        
        if (!usernameInput) {
            // 如果都没找到，尝试查找所有 input 元素
            const allInputs = await page.$$('input');
            console.log(`📋 找到 ${allInputs.length} 个 input 元素`);
            if (allInputs.length > 0) {
                usernameInput = allInputs[0];
                console.log('⚠️ 使用第一个 input 元素作为用户名输入框');
            }
        }
        
        if (usernameInput) {
            // 输入用户名
            console.log('✏️ 输入用户名："安诺涅"');
            await usernameInput.click();
            await usernameInput.type('安诺涅', { delay: 50 });
        } else {
            console.log('❌ 未找到用户名输入框');
            errors.push('[ERROR] 未找到用户名输入框');
        }
        
        // 查找并点击"验证权限"按钮
        console.log('🔍 查找"验证权限"按钮...');
        
        let verifyButton = null;
        const buttonSelectors = [
            'button:contains("验证权限")',
            'button:contains("验证")',
            'input[type="submit"]',
            'button[type="submit"]',
            'button[id*="verify"]',
            'button[id*="auth"]',
            '#verify',
            '#submit',
            '.verify-btn',
            '.submit-btn',
            '[data-testid="verify"]'
        ];
        
        // 尝试通过文本查找按钮
        try {
            const buttons = await page.$$('button');
            for (const btn of buttons) {
                const text = await page.evaluate(el => el.textContent, btn);
                if (text.includes('验证') || text.includes('权限')) {
                    verifyButton = btn;
                    console.log(`✅ 找到验证按钮，文本："${text}"`);
                    break;
                }
            }
        } catch (e) {
            console.log('⚠️ 查找按钮时出错：' + e.message);
        }
        
        if (!verifyButton) {
            // 尝试所有按钮
            const allButtons = await page.$$('button, input[type="submit"]');
            console.log(`📋 找到 ${allButtons.length} 个按钮元素`);
            if (allButtons.length > 0) {
                verifyButton = allButtons[0];
                console.log('⚠️ 使用第一个按钮作为验证按钮');
            }
        }
        
        if (verifyButton) {
            console.log('🖱️ 点击"验证权限"按钮');
            await verifyButton.click();
        } else {
            console.log('❌ 未找到验证权限按钮');
            errors.push('[ERROR] 未找到验证权限按钮');
        }
        
        // 等待 3 秒
        console.log('⏳ 等待 3 秒...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // 截图主界面
        const mainScreenshotPath = path.join(WORKSPACE, 'f12-main-screenshot.png');
        console.log(`📸 截图主界面：${mainScreenshotPath}`);
        await page.screenshot({ path: mainScreenshotPath, fullPage: false });
        
        // 保存完整控制台日志
        const consoleLogPath = path.join(WORKSPACE, 'f12-console-log.txt');
        console.log(`💾 保存控制台日志：${consoleLogPath}`);
        
        const reportContent = `
================================================================================
                        Puppeteer F12 控制台测试报告
================================================================================
测试时间：${new Date().toISOString()}
测试网址：${URL}
================================================================================

【控制台日志】
--------------------------------------------------------------------------------
${consoleLogs.join('\n') || '无日志记录'}

================================================================================
【错误信息】
--------------------------------------------------------------------------------
${errors.join('\n') || '无错误记录'}

================================================================================
【文件输出】
--------------------------------------------------------------------------------
- 登录界面截图：${loginScreenshotPath}
- 主界面截图：${mainScreenshotPath}
- 控制台日志：${consoleLogPath}

================================================================================
【测试摘要】
--------------------------------------------------------------------------------
- Console 日志总数：${consoleLogs.length}
- 错误总数：${errors.length}
- 测试状态：${errors.length === 0 ? '✅ 成功' : '⚠️ 完成（有错误）'}

================================================================================
`.trim();
        
        fs.writeFileSync(consoleLogPath, reportContent);
        
        console.log('\n✅ 测试完成！');
        console.log(reportContent);
        
    } catch (error) {
        console.error('❌ 测试失败:', error.message);
        errors.push(`[FATAL ERROR] ${new Date().toISOString()} - ${error.message}`);
        
        // 保存错误报告
        const errorReportPath = path.join(WORKSPACE, 'f12-console-log.txt');
        fs.writeFileSync(errorReportPath, `测试失败：${error.message}\n\n${error.stack}`);
    } finally {
        await browser.close();
        console.log('🔒 浏览器已关闭');
    }
}

runTest().catch(console.error);
