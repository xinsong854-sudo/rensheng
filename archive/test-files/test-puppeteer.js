const puppeteer = require('puppeteer');

async function test() {
    console.log('🎮 开始测试...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('  [Console]', msg.text()));
    page.on('pageerror', err => console.error('  [Error]', err.message));
    
    console.log('1. 打开页面...');
    await page.goto('https://xinsong854-sudo.github.io/wenyou/', { waitUntil: 'networkidle0', timeout: 30000 });
    
    console.log('2. 检查标题屏幕...');
    const titleScreen = await page.$('#title-screen');
    console.log('   标题屏幕:', titleScreen ? '✅' : '❌');
    
    console.log('3. 检查开始按钮...');
    const startBtn = await page.$('#start-btn');
    console.log('   开始按钮:', startBtn ? '✅' : '❌');
    
    console.log('4. 点击开始游戏...');
    await page.click('#start-btn');
    await new Promise(r => setTimeout(r, 1000));
    
    console.log('5. 检查输入框...');
    const containerDisplay = await page.evaluate(() => {
        const el = document.getElementById('name-input-container');
        return el ? el.style.display : 'none';
    });
    console.log('   输入框显示:', containerDisplay);
    
    console.log('6. 输入名字...');
    await page.type('#player-name-input', '测试');
    
    console.log('7. 点击确认...');
    await page.click('#name-input-container button');
    await new Promise(r => setTimeout(r, 1000));
    
    console.log('8. 检查游戏启动...');
    const dialogueDisplay = await page.evaluate(() => {
        const el = document.getElementById('dialogue-box');
        return el ? el.style.display : 'none';
    });
    console.log('   对话框显示:', dialogueDisplay);
    
    const dialogueText = await page.evaluate(() => {
        const el = document.getElementById('dialogue-text');
        return el ? el.textContent.substring(0, 50) : '';
    });
    console.log('   对话内容:', dialogueText);
    
    await browser.close();
    console.log('\n✅ 测试完成！');
}

test().catch(err => {
    console.error('❌ 测试失败:', err.message);
    process.exit(1);
});
