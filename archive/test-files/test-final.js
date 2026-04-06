const puppeteer = require('puppeteer');

async function test() {
    console.log('🎮 最终验证测试...\n');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    
    await page.goto('https://xinsong854-sudo.github.io/wenyou/?t=' + Date.now(), { 
        waitUntil: 'networkidle0', timeout: 30000 
    });
    
    console.log('1. 点击开始...');
    await page.click('#start-btn');
    await new Promise(r => setTimeout(r, 300));
    
    console.log('2. 输入名字"安诺涅"...');
    await page.type('#player-name-input', '安诺涅');
    await page.click('#name-input-container button');
    await new Promise(r => setTimeout(r, 500));
    
    console.log('3. 检查名字显示...');
    const dialogue2 = await page.evaluate(() => {
        return document.getElementById('dialogue-text')?.textContent;
    });
    console.log('   对话 2:', dialogue2.substring(0, 30) + '...');
    const hasName = dialogue2.includes('安诺涅');
    console.log('   名字显示:', hasName ? '✅' : '❌');
    
    console.log('4. 播放对话并检查选项...');
    for (let i = 0; i < 5; i++) {
        await page.click('#dialogue-box');
        await new Promise(r => setTimeout(r, 300));
    }
    
    const choicesVisible = await page.evaluate(() => {
        const el = document.getElementById('choices-container');
        return el && el.style.display === 'flex';
    });
    console.log('   选项显示:', choicesVisible ? '✅' : '❌');
    
    const choiceText = await page.evaluate(() => {
        const btn = document.querySelector('.choice-btn');
        return btn ? btn.textContent : '';
    });
    console.log('   选项内容:', choiceText);
    
    console.log('5. 点击选项...');
    await page.click('.choice-btn');
    await new Promise(r => setTimeout(r, 500));
    
    const readNoteText = await page.evaluate(() => {
        return document.getElementById('dialogue-text')?.textContent;
    });
    console.log('   read_note 对话:', readNoteText.substring(0, 20) + '...');
    
    console.log('6. 播放 read_note 对话...');
    for (let i = 0; i < 20; i++) {
        const hasChoices = await page.evaluate(() => {
            const el = document.getElementById('choices-container');
            return el && el.style.display === 'flex';
        });
        if (hasChoices) break;
        await page.click('#dialogue-box');
        await new Promise(r => setTimeout(r, 200));
    }
    
    const finalChoices = await page.evaluate(() => {
        const btns = document.querySelectorAll('.choice-btn');
        return Array.from(btns).map(b => b.textContent);
    });
    console.log('   read_note 选项:', finalChoices);
    
    await browser.close();
    
    console.log('\n' + '='.repeat(40));
    if (hasName && choicesVisible && finalChoices.length > 0) {
        console.log('✅ 所有测试通过！');
    } else {
        console.log('❌ 部分测试失败');
    }
    console.log('='.repeat(40));
}

test().catch(err => {
    console.error('测试失败:', err.message);
    process.exit(1);
});
