const puppeteer = require('puppeteer');

async function test() {
    console.log('🎮 测试名字显示...\n');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.goto('https://xinsong854-sudo.github.io/wenyou/', { waitUntil: 'networkidle0', timeout: 30000 });
    await page.click('#start-btn');
    await new Promise(r => setTimeout(r, 300));
    
    await page.type('#player-name-input', '测试玩家');
    await page.click('#name-input-container button');
    await new Promise(r => setTimeout(r, 500));
    
    console.log('start 场景对话:');
    for (let i = 0; i < 5; i++) {
        const speaker = await page.evaluate(() => {
            return document.getElementById('speaker-name')?.textContent;
        });
        const text = await page.evaluate(() => {
            return document.getElementById('dialogue-text')?.textContent;
        });
        console.log(`  ${speaker}: ${text.substring(0, 40)}...`);
        
        await page.click('#dialogue-box');
        await new Promise(r => setTimeout(r, 300));
    }
    
    await browser.close();
    console.log('\n✅ 测试完成！');
}

test().catch(err => {
    console.error('测试失败:', err.message);
    process.exit(1);
});
