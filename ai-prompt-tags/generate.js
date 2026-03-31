const fs = require('fs');

const source = fs.readFileSync('../memory/ai-prompt-tags.txt', 'utf8');
const lines = source.split('\n');

const categories = [];
let currentCategory = null;
let currentSubcategory = null;

for (const line of lines) {
    if (!line.trim() || line.startsWith('===') || line.startsWith('[') || line.startsWith('格式') || line.startsWith('整理')) continue;
    
    const catMatch = line.match(/【([零一二三四五六七八九十]+)、(.+?)篇】/);
    if (catMatch) {
        currentCategory = { name: `${catMatch[1]}、${catMatch[2]}篇`, subcategories: [] };
        categories.push(currentCategory);
        currentSubcategory = null;
        continue;
    }
    
    const subMatch = line.match(/---\s*(.+?)\s*---/);
    if (subMatch) {
        if (currentCategory) {
            currentSubcategory = { name: subMatch[1].trim(), tags: [] };
            currentCategory.subcategories.push(currentSubcategory);
        }
        continue;
    }
    
    const tagMatch = line.match(/^([a-z0-9_-]+)\s+(.+)$/);
    if (tagMatch && currentSubcategory) {
        const en = tagMatch[1];
        const cn = tagMatch[2].trim();
        if (currentCategory && !currentCategory.name.includes('颜色')) {
            if (/(red|blue|green|yellow|orange|purple|pink|brown|black|white|gray|grey|color|colour)/i.test(en)) continue;
        }
        currentSubcategory.tags.push([en, cn]);
    }
}

// 补充 Danbooru 常见标签
const extraTags = {
    clothesFull: [
        ['dress', '连衣裙'],
        ['wedding_dress', '婚纱'],
        ['evening_gown', '晚礼服'],
        ['cocktail_dress', '鸡尾酒裙'],
        ['ball_gown', '舞会礼服'],
        ['maxi_dress', '长裙'],
        ['sundress', '太阳裙'],
        ['shift_dress', '直筒裙'],
        ['bodycon_dress', '紧身裙'],
        ['wrap_dress', '裹身裙'],
        ['shirt_dress', '衬衫裙'],
        ['sweater_dress', '毛衣裙'],
        ['tunic_dress', '长衫裙'],
        ['pinafore_dress', '围裙'],
        ['sleeveless_dress', '无袖裙'],
        ['halter_dress', '挂脖裙'],
        ['strapless_dress', '无肩带裙'],
        ['off_shoulder_dress', '露肩裙'],
        ['one_piece_dress', '连衣裤'],
        ['maid_dress', '女仆装'],
        ['chinese_dress', '旗袍'],
        ['kimono', '和服'],
        ['yukata', '浴衣'],
        ['hanfu', '汉服'],
        ['school_uniform', '校服'],
        ['sailor_suit', '水手服'],
        ['pilot_suit', '飞行员服'],
        ['racing_miku', '赛车初音'],
        ['bunny_suit', '兔女郎装'],
        ['nurse', '护士服'],
        ['police_uniform', '警服'],
        ['military_uniform', '军装'],
        ['cheerleader', '啦啦队服'],
        ['gym_uniform', '体操服'],
        ['swimsuit', '泳装'],
        ['bikini', '比基尼'],
        ['one_piece_swimsuit', '连体泳衣'],
        ['school_swimsuit', '学校泳衣'],
        ['pajamas', '睡衣'],
        ['nightgown', '睡裙'],
        ['robe', '长袍'],
        ['cloak', '斗篷'],
        ['cape', '披风'],
        ['coat', '大衣'],
        ['trench_coat', '风衣'],
        ['peacoat', '海军大衣'],
        ['parka', '派克大衣'],
        ['poncho', '斗篷'],
        ['overalls', '背带裤'],
        ['jumpsuit', '连体衣'],
        ['bodysuit', '紧身衣'],
        ['leotard', '紧身衣'],
        ['catsuit', '猫女装']
    ],
    background: [
        ['outdoors', '户外'],
        ['indoors', '室内'],
        ['nature', '自然'],
        ['cityscape', '城市景观'],
        ['landscape', '风景'],
        ['sky', '天空'],
        ['cloud', '云'],
        ['sunset', '日落'],
        ['sunrise', '日出'],
        ['night', '夜晚'],
        ['starry_sky', '星空'],
        ['moon', '月亮'],
        ['sun', '太阳'],
        ['rain', '雨'],
        ['snow', '雪'],
        ['beach', '海滩'],
        ['ocean', '海洋'],
        ['lake', '湖'],
        ['river', '河'],
        ['mountain', '山'],
        ['forest', '森林'],
        ['tree', '树'],
        ['flower', '花'],
        ['garden', '花园'],
        ['park', '公园'],
        ['field', '田野'],
        ['meadow', '草地'],
        ['desert', '沙漠'],
        ['street', '街道'],
        ['road', '道路'],
        ['building', '建筑'],
        ['house', '房子'],
        ['castle', '城堡'],
        ['tower', '塔'],
        ['bridge', '桥'],
        ['fence', '栅栏'],
        ['wall', '墙'],
        ['window', '窗户'],
        ['door', '门'],
        ['room', '房间'],
        ['bedroom', '卧室'],
        ['kitchen', '厨房'],
        ['bathroom', '浴室'],
        ['living_room', '客厅'],
        ['classroom', '教室'],
        ['office', '办公室'],
        ['hospital', '医院'],
        ['school', '学校'],
        ['cafe', '咖啡馆'],
        ['restaurant', '餐厅'],
        ['shop', '商店'],
        ['library', '图书馆'],
        ['museum', '博物馆'],
        ['theater', '剧院'],
        ['concert_hall', '音乐厅'],
        ['stadium', '体育场'],
        ['pool', '泳池'],
        ['hot_spring', '温泉'],
        ['shrine', '神社'],
        ['temple', '寺庙'],
        ['church', '教堂'],
        ['ruins', '遗迹'],
        ['cave', '洞穴'],
        ['waterfall', '瀑布'],
        ['cliff', '悬崖'],
        ['valley', '山谷'],
        ['hill', '小山'],
        ['island', '岛'],
        ['space', '太空'],
        ['planet', '行星'],
        ['galaxy', '银河'],
        ['nebula', '星云'],
        ['abstract', '抽象'],
        ['gradient', '渐变'],
        ['simple_background', '简单背景'],
        ['white_background', '白色背景'],
        ['black_background', '黑色背景'],
        ['transparent_background', '透明背景'],
        ['scenery', '景色'],
        ['urban', '城市'],
        ['rural', '乡村'],
        ['suburban', '郊区'],
        ['downtown', '市区'],
        ['alley', '小巷'],
        ['plaza', '广场'],
        ['station', '车站'],
        ['airport', '机场'],
        ['port', '港口'],
        ['lighthouse', '灯塔'],
        ['windmill', '风车'],
        ['fountain', '喷泉'],
        ['statue', '雕像'],
        ['monument', '纪念碑'],
        ['graveyard', '墓地'],
        ['cemetery', '公墓'],
        ['mansion', '豪宅'],
        ['apartment', '公寓'],
        ['skyscraper', '摩天大楼'],
        ['factory', '工厂'],
        ['warehouse', '仓库'],
        ['barn', '谷仓'],
        ['farm', '农场'],
        ['greenhouse', '温室'],
        ['tent', '帐篷'],
        ['campsite', '露营地'],
        ['picnic', '野餐'],
        ['bbq', '烧烤'],
        ['fireplace', '壁炉'],
        ['balcony', '阳台'],
        ['rooftop', '屋顶'],
        ['attic', '阁楼'],
        ['basement', '地下室'],
        ['hallway', '走廊'],
        ['staircase', '楼梯'],
        ['elevator', '电梯'],
        ['escalator', '自动扶梯']
    ]
};

// 构建标签索引
const tagIndex = {
    gender: [['female', '女性'], ['male', '男性']],
    eyes: [],
    colors: [],
    hair: [],
    clothesFull: [...extraTags.clothesFull],
    clothesTop: [],
    clothesBottom: [],
    accessories: [],
    expression: [],
    pose: [],
    background: [...extraTags.background]
};

categories.forEach(cat => {
    cat.subcategories.forEach(sub => {
        if (!sub.tags || sub.tags.length === 0) return;
        const key = sub.name.toLowerCase();
        const catName = cat.name.toLowerCase();
        
        if (catName.includes('颜色')) {
            tagIndex.colors.push(...sub.tags);
            return;
        }
        
        if (key.includes('眼型') || (key.includes('眼睛') && !key.includes('瞳孔'))) {
            tagIndex.eyes.push(...sub.tags);
        } else if (key.includes('发型') || (key.includes('头发') && !key.includes('发色'))) {
            tagIndex.hair.push(...sub.tags);
        } else if (key.includes('全身') || key.includes('连衣裙') || key.includes('礼服') || key.includes('连衣')) {
            tagIndex.clothesFull.push(...sub.tags);
        } else if (key.includes('上装') || key.includes('上衣') || key.includes('衬衫') || key.includes('t 恤') || key.includes('外套')) {
            tagIndex.clothesTop.push(...sub.tags);
        } else if (key.includes('下装') || key.includes('裙子') || key.includes('裤子') || key.includes('短裤') || key.includes('短裙')) {
            tagIndex.clothesBottom.push(...sub.tags);
        } else if (key.includes('配件') || key.includes('首饰') || key.includes('饰品') || key.includes('袜子') || key.includes('鞋子') || key.includes('手套') || key.includes('帽子')) {
            tagIndex.accessories.push(...sub.tags);
        } else if (key.includes('表情')) {
            tagIndex.expression.push(...sub.tags);
        } else if (key.includes('姿势') || key.includes('动作')) {
            tagIndex.pose.push(...sub.tags);
        } else if (key.includes('背景')) {
            tagIndex.background.push(...sub.tags);
        }
    });
});

let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 生图描述词分类大全</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f5f6fa; color: #333; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { text-align: center; color: #2c3e50; margin-bottom: 10px; font-size: 1.6em; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .subtitle { text-align: center; color: #7f8c8d; margin-bottom: 20px; font-size: 0.85em; }
        .random-section { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(102,126,234,0.3); }
        .random-title { color: white; font-size: 1.2em; font-weight: 600; margin-bottom: 15px; text-align: center; }
        .random-result { background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px; min-height: 80px; }
        .random-label { color: #95a5a6; font-size: 0.8em; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .random-label .icon { font-size: 1.2em; }
        .random-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .random-tag { display: inline-flex; flex-direction: column; padding: 6px 12px; background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 0.8em; }
        .random-tag .en { font-family: Consolas, Monaco, monospace; color: #1976d2; font-weight: 600; }
        .random-tag .cn { color: #95a5a6; font-size: 0.85em; margin-top: 2px; }
        .generate-btn { width: 100%; padding: 14px; background: white; color: #667eea; border: none; border-radius: 8px; font-size: 1em; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .generate-btn:hover { background: #f8f9fa; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102,126,234,0.3); }
        .copy-btn { padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 6px; font-size: 0.9em; cursor: pointer; margin-top: 15px; transition: all 0.2s; display: block; margin-left: auto; margin-right: auto; }
        .copy-btn:hover { background: #43a047; }
        .category { margin-bottom: 12px; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .category-header { padding: 16px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; transition: background 0.2s; }
        .category-header:hover { background: #f8f9fa; }
        .category-title { font-weight: 600; color: #2c3e50; font-size: 1.05em; }
        .category-count { color: #95a5a6; font-size: 0.85em; margin-left: 10px; }
        .category-icon { font-size: 0.8em; color: #95a5a6; transition: transform 0.3s; }
        .category.expanded .category-icon { transform: rotate(90deg); }
        .subcategory-container { display: none; border-top: 1px solid #f0f0f0; }
        .category.expanded > .subcategory-container { display: block; }
        .subcategory { padding: 12px 20px 12px 35px; cursor: pointer; font-weight: 500; color: #34495e; display: flex; justify-content: space-between; align-items: center; user-select: none; transition: background 0.2s; }
        .subcategory:hover { background: #fafafa; }
        .subcategory-count { color: #bdc3c7; font-size: 0.8em; margin-left: 10px; font-weight: normal; }
        .subcategory-icon { font-size: 0.7em; color: #bdc3c7; transition: transform 0.3s; margin-right: 8px; }
        .subcategory.expanded .subcategory-icon { transform: rotate(90deg); }
        .subcategory.expanded { background: #f0f4ff; }
        .tags-container { display: none; padding: 12px 20px 12px 50px; flex-wrap: wrap; gap: 6px; background: #fafafa; }
        .subcategory.expanded + .tags-container { display: flex; }
        .tag { display: inline-flex; flex-direction: column; align-items: flex-start; padding: 5px 10px; background: white; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 0.8em; cursor: pointer; transition: all 0.2s; user-select: none; min-width: 90px; }
        .tag:hover { background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-color: #667eea; transform: translateY(-2px); box-shadow: 0 3px 8px rgba(102,126,234,0.2); }
        .tag-copied { background: #4caf50 !important; color: white !important; border-color: #4caf50 !important; }
        .tag-en { font-family: Consolas, Monaco, monospace; color: #1976d2; margin-bottom: 2px; font-size: 0.9em; word-break: break-all; }
        .tag-cn { color: #95a5a6; font-size: 0.75em; }
        .disclaimer { position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 20px; border-radius: 10px; font-size: 0.75em; max-width: 280px; box-shadow: 0 6px 20px rgba(102,126,234,0.3); z-index: 1000; line-height: 1.5; animation: slideIn 0.5s ease-out, fadeOut 0.5s ease-in 2.5s forwards; }
        @keyframes slideIn { from { transform: translateX(350px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(350px); opacity: 0; } }
        .disclaimer strong { color: #ffd700; font-weight: 600; }
        .toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px); background: #333; color: white; padding: 10px 20px; border-radius: 8px; opacity: 0; transition: all 0.3s; z-index: 1000; font-size: 0.85em; }
        .toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
    </style>
</head>
<body>
    <div class="container">
        <h1>AI 生图描述词分类大全</h1>
        <p class="subtitle">Danbooru 风格标签库 · 点击复制英文</p>
        
        <div class="random-section">
            <div class="random-title">🎲 随机组合生成角色</div>
            <div class="random-result" id="randomResult">
                <div class="random-label">点击"生成角色"按钮，随机组合标签创建角色描述</div>
            </div>
            <button class="generate-btn" onclick="generateRandom()">
                <span>✨ 生成角色</span>
            </button>
        </div>
        
        <div id="categories"></div>
    </div>
    <div class="disclaimer"><strong>⚠️ 免责声明</strong><br>所有内容均为<strong>一只小眼睛</strong>编的，如有疑问请<strong>勿找安诺涅</strong>。</div>
    <div class="toast" id="toast">已复制！</div>
    <script>
        const tagData = TAGDATA_PLACEHOLDER;
        const tagIndex = TAGINDEX_PLACEHOLDER;
        
        function renderCategories() {
            const container = document.getElementById('categories');
            let html = '';
            tagData.forEach((category, catIndex) => {
                let subcategoryHtml = '';
                category.subcategories.forEach((subcat, subcatIndex) => {
                    if (!subcat.tags || subcat.tags.length === 0) return;
                    let tagsHtml = '';
                    subcat.tags.forEach(tag => {
                        tagsHtml += '<div class="tag" onclick="copyTag(\\'' + tag[0] + '\\', this)"><span class="tag-cn">' + tag[1] + '</span><span class="tag-en">' + tag[0] + '</span></div>';
                    });
                    subcategoryHtml += '<div class="subcategory-item"><div class="subcategory" onclick="toggleSubcategory(this)"><span class="subcategory-icon">▶</span><span>' + subcat.name + '</span><span class="subcategory-count">(' + subcat.tags.length + ')</span></div><div class="tags-container">' + tagsHtml + '</div></div>';
                });
                const catTagCount = category.subcategories.reduce((sum, s) => sum + (s.tags ? s.tags.length : 0), 0);
                html += '<div class="category" data-category="' + catIndex + '"><div class="category-header" onclick="toggleCategory(this)"><div><span class="category-title">' + category.name + '</span><span class="category-count">(' + catTagCount + ' 标签)</span></div><span class="category-icon">▶</span></div><div class="subcategory-container">' + subcategoryHtml + '</div></div>';
            });
            container.innerHTML = html;
        }
        
        function toggleCategory(header) {
            const category = header.parentElement;
            category.classList.toggle('expanded');
        }
        
        function toggleSubcategory(element) {
            element.classList.toggle('expanded');
        }
        
        function copyTag(tag, element) {
            navigator.clipboard.writeText(tag).then(() => {
                element.classList.add('tag-copied');
                showToast('已复制：' + tag);
                setTimeout(() => { element.classList.remove('tag-copied'); }, 1000);
            });
        }
        
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 2000);
        }
        
        function getRandomTag(tags) {
            if (!tags || tags.length === 0) return null;
            return tags[Math.floor(Math.random() * tags.length)];
        }
        
        function generateRandom() {
            let result = [];
            let allTags = [];
            
            const gender = getRandomTag(tagIndex.gender);
            if (gender) {
                result.push({ label: '🚻 性别', tags: [gender] });
                allTags.push(gender);
            }
            
            const eye = getRandomTag(tagIndex.eyes);
            if (eye) {
                result.push({ label: '👁️ 眼睛', tags: [eye] });
                allTags.push(eye);
            }
            
            const eyeColor = getRandomTag(tagIndex.colors);
            if (eyeColor) {
                result.push({ label: '🎨 眼睛颜色', tags: [eyeColor] });
                allTags.push(eyeColor);
            }
            
            const hair = getRandomTag(tagIndex.hair);
            if (hair) {
                result.push({ label: '💇 头发', tags: [hair] });
                allTags.push(hair);
            }
            
            const hairColor = getRandomTag(tagIndex.colors);
            if (hairColor) {
                result.push({ label: '🎨 头发颜色', tags: [hairColor] });
                allTags.push(hairColor);
            }
            
            const useFull = Math.random() > 0.4 && tagIndex.clothesFull.length > 0;
            if (useFull) {
                const full = getRandomTag(tagIndex.clothesFull);
                if (full) {
                    result.push({ label: '👗 服装（全身）', tags: [full] });
                    allTags.push(full);
                }
            } else {
                const top = getRandomTag(tagIndex.clothesTop);
                const bottom = getRandomTag(tagIndex.clothesBottom);
                if (top || bottom) {
                    const clothes = [];
                    if (top) clothes.push(top);
                    if (bottom) clothes.push(bottom);
                    result.push({ label: '👔 服装（上下装）', tags: clothes });
                    allTags.push(...clothes);
                }
            }
            
            const accCount = Math.floor(Math.random() * 2) + 1;
            const accessories = [];
            for (let i = 0; i < accCount; i++) {
                const acc = getRandomTag(tagIndex.accessories);
                if (acc && !accessories.find(a => a[0] === acc[0])) {
                    accessories.push(acc);
                }
            }
            if (accessories.length > 0) {
                result.push({ label: '💎 配件', tags: accessories });
                allTags.push(...accessories);
            }
            
            const expr = getRandomTag(tagIndex.expression);
            if (expr) {
                result.push({ label: '🎭 表情', tags: [expr] });
                allTags.push(expr);
            }
            
            const pose = getRandomTag(tagIndex.pose);
            if (pose) {
                result.push({ label: '🧘 姿势', tags: [pose] });
                allTags.push(pose);
            }
            
            const bg = getRandomTag(tagIndex.background);
            if (bg) {
                result.push({ label: '🏔️ 背景', tags: [bg] });
                allTags.push(bg);
            }
            
            const resultDiv = document.getElementById('randomResult');
            let html = '';
            result.forEach(group => {
                html += '<div style="margin-bottom: 15px;">';
                html += '<div class="random-label"><span class="icon">' + group.label.split(' ')[0] + '</span>' + group.label.split(' ').slice(1).join(' ') + '</div>';
                html += '<div class="random-tags">';
                group.tags.forEach(tag => {
                    html += '<div class="random-tag"><span class="en">' + tag[0] + '</span><span class="cn">' + tag[1] + '</span></div>';
                });
                html += '</div></div>';
            });
            
            const tagString = allTags.map(t => t[0]).join(', ');
            html += '<button class="copy-btn" onclick="copyAll(\\'' + tagString.replace(/'/g, "\\'") + '\\')">📋 复制全部标签</button>';
            
            resultDiv.innerHTML = html;
        }
        
        function copyAll(text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('已复制全部标签！');
            });
        }
        
        renderCategories();
    </script>
</body>
</html>`;

const jsonData = JSON.stringify(categories);
const indexData = JSON.stringify(tagIndex);
html = html.replace('TAGDATA_PLACEHOLDER', jsonData);
html = html.replace('TAGINDEX_PLACEHOLDER', indexData);

fs.writeFileSync('index.html', html);
console.log('✅ index.html 已生成');
console.log('分类数:', categories.length);
console.log('总标签数:', categories.reduce((sum, cat) => sum + cat.subcategories.reduce((s, sub) => s + sub.tags.length, 0), 0));
console.log('索引统计:', JSON.stringify({
    eyes: tagIndex.eyes.length,
    colors: tagIndex.colors.length,
    hair: tagIndex.hair.length,
    clothesFull: tagIndex.clothesFull.length,
    clothesTop: tagIndex.clothesTop.length,
    clothesBottom: tagIndex.clothesBottom.length,
    accessories: tagIndex.accessories.length,
    expression: tagIndex.expression.length,
    pose: tagIndex.pose.length,
    background: tagIndex.background.length
}));
