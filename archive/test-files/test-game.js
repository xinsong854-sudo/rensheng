const puppeteer = require('puppeteer');

async function testGame() {
    console.log('🎮 开始测试游戏...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // 捕获控制台消息
    page.on('console', msg => console.log('  [Console]', msg.text()));
    page.on('pageerror', err => console.error('  [Page Error]', err.message));
    
    // 访问游戏页面
    console.log('1️⃣ 打开页面...');
    await page.goto('https://xinsong854-sudo.github.io/wenyou/', { waitUntil: 'networkidle0', timeout: 30000 });
    
    // 检查标题屏幕
    console.log('2️⃣ 检查标题屏幕...');
    const titleScreen = await page.$('#title-screen');
    console.log('   标题屏幕:', titleScreen ? '✅ 存在' : '❌ 缺失');
    
    // 检查开始按钮
    console.log('3️⃣ 检查开始按钮...');
    const startBtn = await page.$('#start-btn');
    console.log('   开始按钮:', startBtn ? '✅ 存在' : '❌ 缺失');
    
    // 点击开始游戏
    console.log('4️⃣ 点击"开始游戏"...');
    await page.click('#start-btn');
    await page.waitForTimeout(500);
    
    // 检查输入框是否显示
    console.log('5️⃣ 检查输入框...');
    const inputContainer = await page.$('#name-input-container');
    const containerStyle = await page.evaluate(() => {
        const el = document.getElementById('name-input-container');
        return el ? el.style.display : 'none';
    });
    console.log('   输入框显示状态:', containerStyle);
    
    // 输入名字
    console.log('6️⃣ 输入名字...');
    await page.type('#player-name-input', '测试玩家');
    
    // 点击确认
    console.log('7️⃣ 点击确认...');
    await page.click('#name-input-container button');
    await page.waitForTimeout(1000);
    
    // 检查游戏是否启动
    console.log('8️⃣ 检查游戏启动...');
    const dialogueBox = await page.$('#dialogue-box');
    const dialogueStyle = await page.evaluate(() => {
        const el = document.getElementById('dialogue-box');
        return el ? el.style.display : 'none';
    });
    console.log('   对话框显示状态:', dialogueStyle);
    
    // 检查对话内容
    const dialogueText = await page.evaluate(() => {
        const el = document.getElementById('dialogue-text');
        return el ? el.textContent : '';
    });
    console.log('   对话内容:', dialogueText.substring(0, 50));
    
    await browser.close();
    console.log('\n✅ 测试完成！');
}

testGame().catch(err => {
    console.error('❌ 测试失败:', err.message);
    process.exit(1);
});
