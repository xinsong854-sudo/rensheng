const puppeteer = require('puppeteer');

async function test() {
    console.log('🎮 测试官方彩蛋角色...\n');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('  [Console]', msg.text()));
    page.on('dialog', async dialog => {
        console.log('  [Alert]', dialog.message().substring(0, 80));
        await dialog.accept();
    });
    
    await page.goto('https://xinsong854-sudo.github.io/wenyou/', { waitUntil: 'networkidle0', timeout: 30000 });
    await page.click('#start-btn');
    await new Promise(r => setTimeout(r, 300));
    
    // 测试官方角色
    const officialRoles = ['营长', '张明', '云蓝', '赫卡忒', '独允'];
    
    for (const role of officialRoles) {
        console.log(`\n测试角色：${role}`);
        await page.type('#player-name-input', role);
        await page.click('#name-input-container button');
        await new Promise(r => setTimeout(r, 500));
        
        // 清空输入框
        await page.evaluate(() => {
            document.getElementById('player-name-input').value = '';
        });
    }
    
    await browser.close();
    console.log('\n✅ 测试完成！');
}

test().catch(err => {
    console.error('❌ 测试失败:', err.message);
    process.exit(1);
});
