const puppeteer = require('puppeteer');

async function test() {
    console.log('🎮 带日志测试...\n');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('nextDialogue') || text.includes('选项') || text.includes('显示')) {
            console.log('  [Log]', text);
        }
    });
    
    await page.goto('https://xinsong854-sudo.github.io/wenyou/', { waitUntil: 'networkidle0', timeout: 30000 });
    await page.click('#start-btn');
    await new Promise(r => setTimeout(r, 300));
    
    await page.type('#player-name-input', '测试');
    await page.click('#name-input-container button');
    await new Promise(r => setTimeout(r, 500));
    
    console.log('开始点击对话框...\n');
    
    for (let i = 0; i < 6; i++) {
        await page.click('#dialogue-box');
        await new Promise(r => setTimeout(r, 400));
        
        const choicesVisible = await page.evaluate(() => {
            const el = document.getElementById('choices-container');
            return el ? el.style.display : 'none';
        });
        console.log(`点击 ${i+1} 次后：选项=${choicesVisible}\n`);
    }
    
    await browser.close();
    console.log('✅ 测试完成！');
}

test().catch(err => {
    console.error('❌ 测试失败:', err.message);
    process.exit(1);
});
