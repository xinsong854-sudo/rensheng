const puppeteer = require('puppeteer');

async function test() {
    console.log('🎮 测试名字输入流程...\n');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('  [Console]', msg.text()));
    
    console.log('1. 打开页面...');
    await page.goto('https://xinsong854-sudo.github.io/wenyou/', { waitUntil: 'networkidle0', timeout: 30000 });
    
    console.log('2. 检查输入框初始状态...');
    const initialDisplay = await page.evaluate(() => {
        const el = document.getElementById('name-input-container');
        return el ? el.style.display : 'none';
    });
    console.log('   初始显示:', initialDisplay, initialDisplay === 'none' ? '✅' : '❌');
    
    console.log('3. 点击开始游戏...');
    await page.click('#start-btn');
    await new Promise(r => setTimeout(r, 500));
    
    console.log('4. 检查输入框显示...');
    const afterClickDisplay = await page.evaluate(() => {
        const el = document.getElementById('name-input-container');
        return el ? el.style.display : 'none';
    });
    console.log('   点击后显示:', afterClickDisplay, afterClickDisplay === 'flex' ? '✅' : '❌');
    
    console.log('5. 测试空名字确认（应该提示错误）...');
    let alertMsg = null;
    page.on('dialog', async dialog => {
        alertMsg = dialog.message();
        await dialog.accept();
    });
    await page.click('#name-input-container button');
    await new Promise(r => setTimeout(r, 300));
    console.log('   提示信息:', alertMsg, alertMsg === '请输入你的名字！' ? '✅' : '❌');
    
    console.log('6. 输入彩蛋名字"张明"...');
    await page.type('#player-name-input', '张明');
    await page.click('#name-input-container button');
    await new Promise(r => setTimeout(r, 500));
    
    console.log('7. 检查彩蛋提示...');
    console.log('   彩蛋提示:', alertMsg ? '✅' : '❌');
    if (alertMsg) console.log('   内容:', alertMsg.substring(0, 50));
    
    console.log('8. 检查游戏启动...');
    const dialogueDisplay = await page.evaluate(() => {
        const el = document.getElementById('dialogue-box');
        return el ? el.style.display : 'none';
    });
    console.log('   对话框显示:', dialogueDisplay, dialogueDisplay === 'block' ? '✅' : '❌');
    
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
