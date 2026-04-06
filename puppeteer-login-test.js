const puppeteer = require('puppeteer');
const path = require('path');

async function runLoginTest() {
    console.log('🚀 开始 Puppeteer 登录测试...\n');
    
    let browser;
    try {
        // 启动浏览器
        console.log('1. 启动浏览器...');
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });
        console.log('   ✓ 浏览器启动成功\n');
        
        // 创建新页面
        console.log('2. 创建新页面...');
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });
        console.log('   ✓ 页面创建成功\n');
        
        // 打开本地 HTML 文件
        const htmlPath = path.join(__dirname, 'test-login-page.html');
        const fileUrl = 'file://' + htmlPath;
        console.log('3. 打开测试页面:', fileUrl);
        await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
        console.log('   ✓ 页面加载完成\n');
        
        // 检查页面是否加载完成
        console.log('4. 检查页面元素...');
        const loginContainer = await page.$('#loginContainer');
        const usernameInput = await page.$('#username');
        const loginBtn = await page.$('#loginBtn');
        
        if (!loginContainer || !usernameInput || !loginBtn) {
            throw new Error('页面元素未找到!');
        }
        console.log('   ✓ 登录容器、用户名输入框、登录按钮均已找到\n');
        
        // 输入测试用户名
        console.log('5. 输入测试用户名 "安诺涅"...');
        await page.type('#username', '安诺涅', { delay: 50 });
        await page.type('#password', 'test123', { delay: 50 });
        const usernameValue = await page.$eval('#username', el => el.value);
        console.log('   ✓ 用户名已输入:', usernameValue, '\n');
        
        // 点击登录按钮
        console.log('6. 点击登录按钮...');
        await page.click('#loginBtn');
        console.log('   ✓ 登录按钮已点击\n');
        
        // 等待 3 秒
        console.log('7. 等待 3 秒...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('   ✓ 等待完成\n');
        
        // 检查登录界面是否隐藏
        console.log('8. 检查登录界面状态...');
        const loginContainerVisible = await page.$eval('#loginContainer', el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden';
        });
        console.log('   登录容器可见:', loginContainerVisible);
        
        if (loginContainerVisible) {
            console.log('   ⚠ 警告：登录界面应该隐藏但未隐藏\n');
        } else {
            console.log('   ✓ 登录界面已隐藏\n');
        }
        
        // 检查主界面是否显示
        console.log('9. 检查主界面状态...');
        const mainContainerVisible = await page.$eval('#mainContainer', el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden';
        });
        console.log('   主容器可见:', mainContainerVisible);
        
        if (mainContainerVisible) {
            console.log('   ✓ 主界面已显示\n');
        } else {
            console.log('   ⚠ 警告：主界面应该显示但未显示\n');
        }
        
        // 获取欢迎信息
        const welcomeText = await page.$eval('#welcomeUser', el => el.textContent);
        console.log('   欢迎信息:', welcomeText, '\n');
        
        // 截图保存
        console.log('10. 保存截图...');
        const screenshotPath = path.join(__dirname, 'puppeteer-login-test.png');
        await page.screenshot({ 
            path: screenshotPath, 
            fullPage: true,
            type: 'png'
        });
        console.log('   ✓ 截图已保存:', screenshotPath, '\n');
        
        // 测试结果总结
        console.log('═══════════════════════════════════════════════');
        console.log('📊 测试结果总结');
        console.log('═══════════════════════════════════════════════');
        console.log('✓ 页面加载成功');
        console.log('✓ 元素定位成功');
        console.log('✓ 用户名输入成功:', usernameValue);
        console.log('✓ 登录按钮点击成功');
        console.log('✓ 等待时间完成 (3 秒)');
        console.log(loginContainerVisible ? '✗ 登录界面隐藏检查失败' : '✓ 登录界面隐藏检查通过');
        console.log(mainContainerVisible ? '✓ 主界面显示检查通过' : '✗ 主界面显示检查失败');
        console.log('✓ 截图保存成功');
        console.log('═══════════════════════════════════════════════');
        console.log('\n🎉 测试完成!\n');
        
    } catch (error) {
        console.error('\n❌ 测试失败:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        if (browser) {
            console.log('关闭浏览器...');
            await browser.close();
            console.log('✓ 浏览器已关闭\n');
        }
    }
}

runLoginTest();
