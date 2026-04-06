const puppeteer = require('puppeteer');

async function test() {
    console.log('🎮 最终检查...\n');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.goto('https://xinsong854-sudo.github.io/wenyou/', { waitUntil: 'networkidle0', timeout: 30000 });
    await page.click('#start-btn');
    await new Promise(r => setTimeout(r, 300));
    
    await page.type('#player-name-input', '测试');
    await page.click('#name-input-container button');
    await new Promise(r => setTimeout(r, 500));
    
    // 播放完 start 场景对话
    for (let i = 0; i < 5; i++) {
        await page.click('#dialogue-box');
        await new Promise(r => setTimeout(r, 300));
    }
    
    console.log('start 场景选项:');
    const startChoices = await page.evaluate(() => {
        const btns = document.querySelectorAll('.choice-btn');
        return Array.from(btns).map(b => b.textContent);
    });
    console.log(' ', startChoices);
    
    // 点击第一个选项
    await page.click('.choice-btn');
    await new Promise(r => setTimeout(r, 500));
    
    console.log('\nread_note 场景对话:');
    const dialogueText = await page.evaluate(() => {
        const el = document.getElementById('dialogue-text');
        return el ? el.textContent.substring(0, 20) : '';
    });
    console.log(' ', dialogueText);
    
    // 播放完 read_note 场景对话（17 句）
    for (let i = 0; i < 20; i++) {
        const hasChoices = await page.evaluate(() => {
            const el = document.getElementById('choices-container');
            return el && el.style.display === 'flex';
        });
        if (hasChoices) break;
        await page.click('#dialogue-box');
        await new Promise(r => setTimeout(r, 200));
    }
    
    console.log('\nread_note 场景选项:');
    const readNoteChoices = await page.evaluate(() => {
        const btns = document.querySelectorAll('.choice-btn');
        return Array.from(btns).map(b => b.textContent);
    });
    console.log(' ', readNoteChoices);
    
    if (readNoteChoices.length > 0 && readNoteChoices[0].includes('工作文件')) {
        console.log('\n✅ 选项正确！');
    } else {
        console.log('\n❌ 选项不正确！');
    }
    
    await browser.close();
    console.log('\n测试完成！');
}

test().catch(err => {
    console.error('测试失败:', err.message);
    process.exit(1);
});
