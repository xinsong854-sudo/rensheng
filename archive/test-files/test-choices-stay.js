const puppeteer = require('puppeteer');

async function test() {
    console.log('🎮 测试选项是否保持显示...\n');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.goto('https://xinsong854-sudo.github.io/wenyou/', { waitUntil: 'networkidle0', timeout: 30000 });
    await page.click('#start-btn');
    await new Promise(r => setTimeout(r, 300));
    
    // 输入名字并确认
    await page.type('#player-name-input', '测试');
    await page.click('#name-input-container button');
    await new Promise(r => setTimeout(r, 500));
    
    // 点击继续播放对话
    await page.click('#dialogue-box');
    await new Promise(r => setTimeout(r, 300));
    await page.click('#dialogue-box');
    await new Promise(r => setTimeout(r, 300));
    await page.click('#dialogue-box');
    await new Promise(r => setTimeout(r, 500));
    
    // 检查选项是否显示
    const choicesVisible = await page.evaluate(() => {
        const el = document.getElementById('choices-container');
        return el && el.style.display === 'flex';
    });
    console.log('1. 选项显示:', choicesVisible ? '✅' : '❌');
    
    // 等待 5 秒，检查选项是否还显示
    await new Promise(r => setTimeout(r, 5000));
    
    const choicesStillVisible = await page.evaluate(() => {
        const el = document.getElementById('choices-container');
        return el && el.style.display === 'flex';
    });
    console.log('2. 5 秒后选项还显示:', choicesStillVisible ? '✅' : '❌');
    
    // 点击选项
    if (choicesStillVisible) {
        await page.click('.choice-btn');
        await new Promise(r => setTimeout(r, 500));
        
        const newScene = await page.evaluate(() => {
            const el = document.getElementById('dialogue-text');
            return el ? el.textContent.substring(0, 30) : '';
        });
        console.log('3. 点击选项后进入新场景:', newScene ? '✅' : '❌');
        console.log('   内容:', newScene);
    }
    
    await browser.close();
    console.log('\n✅ 测试完成！');
}

test().catch(err => {
    console.error('❌ 测试失败:', err.message);
    process.exit(1);
});
