const puppeteer = require('puppeteer');

async function test() {
    console.log('🎮 完整流程测试...\n');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('nextDialogue') || text.includes('显示') || text.includes('选项')) {
            console.log('  [Log]', text);
        }
    });
    
    await page.goto('https://xinsong854-sudo.github.io/wenyou/', { waitUntil: 'networkidle0', timeout: 30000 });
    
    console.log('1. 点击开始游戏...');
    await page.click('#start-btn');
    await new Promise(r => setTimeout(r, 300));
    
    console.log('2. 输入名字"测试玩家"...');
    await page.type('#player-name-input', '测试玩家');
    
    console.log('3. 确认名字...');
    await page.click('#name-input-container button');
    await new Promise(r => setTimeout(r, 500));
    
    console.log('4. 播放对话...');
    for (let i = 0; i < 5; i++) {
        await page.click('#dialogue-box');
        await new Promise(r => setTimeout(r, 300));
    }
    
    console.log('5. 检查选项显示...');
    const choicesVisible = await page.evaluate(() => {
        const el = document.getElementById('choices-container');
        return el && el.style.display === 'flex';
    });
    console.log('   选项显示:', choicesVisible ? '✅' : '❌');
    
    console.log('6. 点击"查看纸条内容"...');
    if (choicesVisible) {
        await page.click('.choice-btn');
        await new Promise(r => setTimeout(r, 500));
        
        console.log('7. 检查 read_note 场景...');
        const dialogueText = await page.evaluate(() => {
            const el = document.getElementById('dialogue-text');
            return el ? el.textContent.substring(0, 30) : '';
        });
        console.log('   对话内容:', dialogueText);
        
        console.log('8. 播放 read_note 对话...');
        for (let i = 0; i < 20; i++) {
            const hasChoices = await page.evaluate(() => {
                const el = document.getElementById('choices-container');
                return el && el.style.display === 'flex';
            });
            if (hasChoices) {
                console.log('   选项已显示！');
                break;
            }
            await page.click('#dialogue-box');
            await new Promise(r => setTimeout(r, 200));
        }
        
        console.log('9. 检查新选项...');
        const newChoicesVisible = await page.evaluate(() => {
            const el = document.getElementById('choices-container');
            return el && el.style.display === 'flex';
        });
        console.log('   新选项显示:', newChoicesVisible ? '✅' : '❌');
        
        if (newChoicesVisible) {
            const choiceTexts = await page.evaluate(() => {
                const btns = document.querySelectorAll('.choice-btn');
                return Array.from(btns).map(b => b.textContent);
            });
            console.log('   选项内容:', choiceTexts);
        }
    }
    
    await browser.close();
    console.log('\n✅ 测试完成！');
}

test().catch(err => {
    console.error('❌ 测试失败:', err.message);
    process.exit(1);
});
