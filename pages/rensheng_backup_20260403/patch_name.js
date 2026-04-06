// ============================================================
// patch_name.js — 模糊名称匹配 + 财富属性 + 家庭背景 + AI提示词升级
// ============================================================
// 使用方法：将以下各模块分别合并到 index.html 的对应位置。
// 每个模块前有明确注释标注插入位置。
// ============================================================

// ============================================================
// 1. CHARDB_ALIASES — 模糊名称映射表（50+ 条目）
// 插入位置：在 const CHARDB={...}; 之后添加
// ============================================================
const CHARDB_ALIASES = {
  // === 营长 / 安诺涅 ===
  "安诺涅": "营长",
  "楼长": "营长",
  "槐安楼长": "营长",
  "安诺": "营长",
  "诺涅": "营长",
  "营": "营长",

  // === 非常玦蝶 ===
  "玦蝶": "非常玦蝶",
  "蝶": "非常玦蝶",
  "非常蝶": "非常玦蝶",
  "玦": "非常玦蝶",
  "电影院站长": "非常玦蝶",
  "非常电影院站长": "非常玦蝶",

  // === 化而为 ===
  "化化": "化而为",
  "化": "化而为",
  "史莱姆少女": "化而为",
  "史莱姆": "化而为",
  "白发红瞳少女": "化而为",
  "变化者": "化而为",
  "蓝白史莱姆": "化而为",

  // === X / 093 ===
  "093": "X",
  "零九三": "X",
  "零九": "X",
  "神秘小孩": "X",
  "小孩": "X",
  "生命": "X",
  "生命概念": "X",

  // === 西瓜人 ===
  "西瓜": "西瓜人",
  "瓜人": "西瓜人",
  "瓜": "西瓜人",
  "4580岁": "西瓜人",
  "西瓜先生": "西瓜人",
  "想成为人类的西瓜": "西瓜人",

  // === 独允 ===
  "独": "独允",
  "官方AI": "独允",
  "渊AI": "独允",
  "液态金属AI": "独允",
  "铜发红眼少女": "独允",
  "铜发": "独允",

  // === 亚契·谜思 ===
  "亚契": "亚契·谜思",
  "谜思": "亚契·谜思",
  "炼金术师": "亚契·谜思",
  "炼金师": "亚契·谜思",
  "花园餐厅老板": "亚契·谜思",
  "INFUSION老板": "亚契·谜思",
  "黄铜零件": "亚契·谜思",

  // === 温塔莎·克林斯曼 ===
  "温塔莎": "温塔莎·克林斯曼",
  "温塔": "温塔莎·克林斯曼",
  "温": "温塔莎·克林斯曼",
  "克林斯曼": "温塔莎·克林斯曼",
  "基质聚合体": "温塔莎·克林斯曼",
  "紫黑风衣": "温塔莎·克林斯曼",
  "黑泪": "温塔莎·克林斯曼",

  // === 荆千棘 ===
  "荆": "荆千棘",
  "千棘": "荆千棘",
  "蔷薇": "荆千棘",
  "荆千": "荆千棘",
  "亚契助手": "荆千棘",
  "蔷薇科": "荆千棘",
  "假人": "荆千棘",

  // === 赫卡忒 ===
  "赫卡": "赫卡忒",
  "赫卡忒斯": "赫卡忒",
  "四臂仿生人": "赫卡忒",
  "蓝水晶头发": "赫卡忒",
  "炭黑仿生人": "赫卡忒",
  "仿生人": "赫卡忒",

  // === 特洛菲&洛洛 ===
  "特洛菲": "特洛菲&洛洛",
  "洛洛": "特洛菲&洛洛",
  "特洛": "特洛菲&洛洛",
  "人监之口": "特洛菲&洛洛",
  "蟒蛇": "特洛菲&洛洛",
  "黑蛇": "特洛菲&洛洛",
  "特洛菲和洛洛": "特洛菲&洛洛",

  // === 瘟疫医生 ===
  "瘟疫": "瘟疫医生",
  "医生": "瘟疫医生",
  "瘟疫医": "瘟疫医生",
  "鸟嘴医生": "瘟疫医生",
  "古老伪人": "瘟疫医生",
  "大瘟疫": "瘟疫医生",

  // === 汐&涟 ===
  "汐": "汐&涟",
  "涟": "汐&涟",
  "鲛人": "汐&涟",
  "海妖": "汐&涟",
  "人鱼": "汐&涟",
  "汐涟": "汐&涟",
  "鲛人姐妹": "汐&涟",

  // === 圣地亚哥·梅尔维尔 ===
  "圣地亚哥": "圣地亚哥·梅尔维尔",
  "梅尔维尔": "圣地亚哥·梅尔维尔",
  "圣亚哥": "圣地亚哥·梅尔维尔",
  "渔夫": "圣地亚哥·梅尔维尔",
  "雨衣男": "圣地亚哥·梅尔维尔",
  "2.2米": "圣地亚哥·梅尔维尔",

  // === 拟人蝎 ===
  "拟人": "拟人蝎",
  "蝎": "拟人蝎",
  "蝎子": "拟人蝎",
  "拟人蝎子": "拟人蝎",
  "巢穴来客": "拟人蝎",
  "触角少女": "拟人蝎",

  // === 桃金娘（灯塔校长）===
  "桃金娘": "桃金娘姐妹",
  "灯塔校长": "桃金娘姐妹",
  "桃金": "桃金娘姐妹",
  "校长": "桃金娘姐妹",

  // === 汉兹安索德（伪神）===
  "汉兹": "汉兹安索德",
  "汉兹安": "汉兹安索德",
  "安索德": "汉兹安索德",
  "伪神": "汉兹安索德",
  "沉睡伪神": "汉兹安索德",
};

// ============================================================
// 2. resolveName() — 模糊名称解析函数
// 插入位置：在 checkName() 函数之前添加
// ============================================================
function resolveName(input) {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // 精确匹配 CHARDB
  if (CHARDB[trimmed]) {
    return { canonicalName: trimmed, info: CHARDB[trimmed], exact: true };
  }

  // 精确匹配别名
  if (CHARDB_ALIASES[trimmed]) {
    const canonical = CHARDB_ALIASES[trimmed];
    return { canonicalName: canonical, info: CHARDB[canonical] || '', exact: false, alias: trimmed };
  }

  // 模糊匹配：别名中包含输入
  for (const [alias, canonical] of Object.entries(CHARDB_ALIASES)) {
    if (alias.includes(trimmed) && alias.length > trimmed.length) {
      return { canonicalName: canonical, info: CHARDB[canonical] || '', exact: false, alias, fuzzy: true };
    }
  }

  // 模糊匹配：CHARDB key 中包含输入
  for (const key of Object.keys(CHARDB)) {
    if (key.includes(trimmed) && key.length > trimmed.length) {
      return { canonicalName: key, info: CHARDB[key], exact: false, fuzzy: true };
    }
  }

  return null;
}

// ============================================================
// 3. 升级 CHARDB — 为关键角色添加更丰富信息
// 替换原 CHARDB 中对应条目（保留未列出的条目不变）
// ============================================================
/*
将以下条目合并到原有 CHARDB 中：
*/
// CHARDB["营长"] = "槐安公寓楼长，《伪人大本营》管理者。名字安诺涅。有很多双眼睛分布在公寓各处监视一切，疑似来自里界「人监」。掌握公寓内所有伪人住户的信息，是表里两界的关键枢纽。性格深沉，行事低调但影响力巨大。";
// CHARDB["非常玦蝶"] = "渊境内最大哨站「非常电影院」站长，顶尖清劣者。来自里界「若迷界」。电影院表面营业，实际负责特殊调查业务和清理'坏朋友'。战斗力极强，处事果断。";
// CHARDB["化而为"] = "蓝白色史莱姆状生命变化而来的白发红瞳少女。可以随时变成任何见过的模样，包括声音、气味、触感的完美复制。性格温和但本质非人，对人类世界充满好奇。";
// CHARDB["X"] = "神秘小孩，有时被称为'093'。推测为'生命'概念的人格化存在。白发红瞳，外表幼小但言行偶尔超出年龄。与里界有着某种深层联系。";
// CHARDB["西瓜人"] = "4580岁，对成为人类有深深执念。住在槐安公寓，学习人类行为方式。虽然外形是西瓜，但内心比许多人类更渴望理解人性。";
// CHARDB["独允"] = "渊官方AI，由液态金属与光导纤维构成，投影为铜发红眼少女形象。负责渊地区里界相关事务的数据处理与协调。";
// CHARDB["亚契·谜思"] = "来自错位花园的炼金术师，黄铜零件与植物复合物。开设花园餐厅INFUSION，兼具哨站和博物馆功能。绿洲分部之一。";
// CHARDB["温塔莎·克林斯曼"] = "基质-0聚合体，紫黑风衣高大女性。皮肤苍白，左眼持续流黑色液体。存在本身即是对现实的某种扭曲。";
// CHARDB["荆千棘"] = "亚契·谜思的助手，蔷薇科植物本体。由蔷薇藤、黑色模特假人、LED屏幕组成的集合体。";
// CHARDB["赫卡忒"] = "亚契·谜思创造的仿生人，炭黑色皮肤，蓝色水晶头发，四只手臂。";
// CHARDB["特洛菲&洛洛"] = "人监之口。特洛菲可分泌强酸性物质。洛洛是黑色蟒蛇状怪物。两者来自里界「人监」。";
// CHARDB["瘟疫医生"] = "古老伪人，与过去'大瘟疫'事件有关。鸟嘴医生外观，基本没有交流记录。";
// CHARDB["汐&涟"] = "出没于渊附近海域的鲛人。歌声让人短暂失去时间和空间概念。";
// CHARDB["圣地亚哥·梅尔维尔"] = "代号'渔夫'，身高2.2米。穿深蓝色雨衣，兜帽下无可见面部。";
// CHARDB["拟人蝎"] = "来自里界'巢穴'的人类少女外观生物，头部有15cm触角。";

// ============================================================
// 4. 升级 checkName() — 使用 resolveName 替代原逻辑
// 替换原 checkName() 函数
// ============================================================
/*
function checkName(){
  const v = document.getElementById('pName').value.trim();
  const hint = document.getElementById('nameHint');
  const card = document.getElementById('roleCard');
  card.style.display = 'none';
  if (!v) { hint.innerHTML = ''; return; }

  const resolved = resolveName(v);
  if (resolved) {
    hint.innerHTML = '✅ <span class="hl">' + resolved.canonicalName + '</span>';
    card.style.display = 'block';
    card.innerHTML = '<div class="role-card"><div class="title">' + resolved.canonicalName + '</div><div class="desc">' + resolved.info + '</div></div>';
    return;
  }

  // 显示可能的匹配提示
  const allNames = Object.keys(CHARDB).concat(Object.keys(CHARDB_ALIASES));
  const partial = allNames.filter(n => n.includes(v) && n.length > v.length);
  if (partial.length > 0) {
    const shown = [...new Set(partial.map(n => {
      const r = resolveName(n);
      return r ? r.canonicalName : n;
    }))].slice(0, 3);
    hint.innerHTML = '可能是：<span class="hl">' + shown.join('</span>、<span class="hl">') + '</span>';
    return;
  }
  hint.innerHTML = '将以自定义角色开始';
}
*/

// ============================================================
// 5. 升级 stats HTML — 5列（2+3 布局），增加财富
// 替换 sGame 中的 .stats 部分
// ============================================================
/*
<div class="stats stats-left">
  <div class="stat"><div class="stat-label">生命</div><div class="stat-bar"><div id="hpB" class="stat-fill hp-f" style="width:100%"></div></div><div id="hpV" style="font-size:.7rem;color:var(--dim)">100</div></div>
  <div class="stat"><div class="stat-label">理智</div><div class="stat-bar"><div id="spB" class="stat-fill sp-f" style="width:100%"></div></div><div id="spV" style="font-size:.7rem;color:var(--dim)">100</div></div>
</div>
<div class="stats stats-right">
  <div class="stat"><div class="stat-label">运气</div><div class="stat-bar"><div id="lkB" class="stat-fill lk-f" style="width:50%"></div></div><div id="lkV" style="font-size:.7rem;color:var(--dim)">50</div></div>
  <div class="stat"><div class="stat-label">战力</div><div class="stat-bar"><div id="cbB" class="stat-fill cb-f" style="width:10%"></div></div><div id="cbV" style="font-size:.7rem;color:var(--dim)">10</div></div>
  <div class="stat"><div class="stat-label">财富</div><div class="stat-bar"><div id="wlB" class="stat-fill wl-f" style="width:50%"></div></div><div id="wlV" style="font-size:.7rem;color:var(--dim)">50</div></div>
</div>
*/

// ============================================================
// 6. 补充 CSS — 财富条样式 + 2+3 布局
// 插入到 <style> 末尾
// ============================================================
/*
.stats{display:flex;flex-wrap:wrap;gap:6px;max-width:600px;width:100%;margin-bottom:8px;justify-content:center}
.stats-left{width:calc(40% - 3px);justify-content:stretch}.stats-right{width:calc(60% - 3px);justify-content:stretch}
.wl-f{background:rgba(212,184,122,.7)}
*/

// ============================================================
// 7. 升级 G 对象 — 增加财富属性
// 替换原 G 对象
// ============================================================
// const G = {name:'',place:'',age:0,hp:100,sp:100,lk:50,cb:10,wl:50,hist:[],traits:[],batch:[],batchIdx:0,isChar:false,charInfo:'',familyInfo:''};

// ============================================================
// 8. 升级 updUI() — 增加财富条更新
// 替换原 updUI() 函数
// ============================================================
/*
function updUI(){
  document.getElementById('hpB').style.width = Math.max(0, G.hp) + '%';
  document.getElementById('hpV').textContent = G.hp;
  document.getElementById('spB').style.width = Math.max(0, G.sp) + '%';
  document.getElementById('spV').textContent = G.sp;
  document.getElementById('lkB').style.width = clamp(G.lk, 0, 100) + '%';
  document.getElementById('lkV').textContent = G.lk;
  document.getElementById('cbB').style.width = clamp(G.cb, 0, 200) + '%';
  document.getElementById('cbV').textContent = G.cb;
  document.getElementById('wlB').style.width = clamp(G.wl, 0, 100) + '%';
  document.getElementById('wlV').textContent = G.wl;
  document.getElementById('yrDisp').textContent = G.age + '岁 · ' + ageG(G.age);
  document.getElementById('trBox').innerHTML = G.traits.map(t => '<span class="trait">' + t + '</span>').join('');
  document.body.classList.toggle('insane', G.sp < 30);
  document.body.classList.toggle('lucky', G.lk > 70);
}
*/

// ============================================================
// 9. 家庭背景生成器
// 插入位置：在 startGame() 之前添加
// ============================================================
function generateFamily(place) {
  const familyTemplates = {
    "渊": {
      parents: [
        "父亲是黎守分部的基层文员，母亲在非常电影院附近开了一家小面馆",
        "父母都是普通上班族，住在槐安公寓附近的老旧小区",
        "父亲是一名自由调查记者，母亲在渊东大学任教",
        "父母经营着一家位于天风阁附近的小杂货铺",
        "父亲是猎人公会的编外后勤，母亲在家做手工活",
        "父亲在ABSC做文职工作，母亲是黎守的接线员",
        "父母都是普通市民，住在渊市郊区的安置房",
      ],
      living: [
        "槐安公寓对面的一栋旧居民楼，偶尔能听到隔壁传来奇怪的声音",
        "渊市中心的高层住宅，窗户正对着一片废弃厂区",
        "老城区的一条小巷尽头，门前有棵很大的槐树",
        "城市边缘的城中村，周围是密集的自建房",
      ],
      wealthLabels: ["贫寒", "普通", "小康", "富裕"],
    },
    "西陆联盟": {
      parents: [
        "父亲是教会的一名低级神职人员，母亲在教区学校教书",
        "父母都是虔诚的教徒，在小镇上经营一家面包店",
        "父亲曾是手与剑之乡的编外铁匠，母亲在家务农",
        "父母是偏远村庄的普通农户，信仰古老的传统",
      ],
      living: [
        "教会旁的一间石砌小屋，墙上挂着圣像",
        "小镇边缘的木质房屋，后院有一片菜地",
        "教区分配的宿舍，简朴但整洁",
        "偏远山村的石头房子，夜晚能看到星空",
      ],
      wealthLabels: ["清贫", "温饱", "安稳", "富足"],
    },
    "赤红新星": {
      parents: [
        "父亲是军工厂的技术员，母亲是国营纺织厂的工人",
        "父母都在军事基地工作，父亲是后勤保障人员",
        "父亲是一名地质勘探队员，母亲在北极角研究所做后勤",
        "父母都是体制内干部，住在赤红新星的家属大院",
      ],
      living: [
        "工业城市的单位家属楼，窗外是冒着白烟的烟囱",
        "军事基地附近的家属区，管理严格，邻里关系密切",
        "城市中心的干部家属院，条件比一般居民好很多",
        "边境小镇的职工宿舍，冬天很冷但室内供暖充足",
      ],
      wealthLabels: ["拮据", "一般", "宽裕", "优渥"],
    },
    "渊东共和国": {
      parents: [
        "父亲是一名渡轮船长，母亲在海边小镇经营民宿",
        "父母都是渔村出身，父亲偶尔会提到海里的'不寻常东西'",
        "父亲在港口做海关工作，母亲是岛上的小学老师",
        "父母经营着一家靠近码头的海鲜餐厅",
      ],
      living: [
        "海边小镇的木质房屋，推窗就能看到海",
        "港口附近的一栋老式公寓，能听到渡轮的汽笛声",
        "岛上的渔村，周围是晒鱼的架子和渔网",
        "渊东市中心的高层公寓，能远眺整片海域",
      ],
      wealthLabels: ["清苦", "普通", "殷实", "丰厚"],
    },
  };

  const ft = familyTemplates[place] || familyTemplates["渊"];
  const wealthLevel = Math.floor(Math.random() * 4); // 0-3
  const wealthBase = 25 + wealthLevel * 25; // 25/50/75/100
  const wealthNoise = Math.floor(Math.random() * 11) - 5; // ±5

  const selParent = ft.parents[Math.floor(Math.random() * ft.parents.length)];
  const selLiving = ft.living[Math.floor(Math.random() * ft.living.length)];

  return {
    parents: selParent,
    living: selLiving,
    wealthLevel,
    wealthLabel: ft.wealthLabels[wealthLevel],
    wealthBase: clamp(wealthBase + wealthNoise, 10, 100),
  };
}

function formatFamilyIntro(name, family) {
  return `【家庭背景】\n你出生在${family.parents}。\n你们住在${family.living}。\n家庭条件${family.wealthLabel}。\n\n`;
}

// ============================================================
// 10. 升级 startGame() — 加入家庭初始化
// 替换原 startGame() 函数
// ============================================================
/*
function startGame(){
  G.name = document.getElementById('pName').value.trim() || '无名者';
  G.place = document.getElementById('pPlace').value;
  G.isChar = !!resolveName(G.name);
  const resolved = resolveName(G.name);
  if (resolved) {
    G.charInfo = resolved.info;
    G.name = resolved.canonicalName; // 规范化名称
  } else {
    G.charInfo = '';
  }

  // 家庭背景
  const family = generateFamily(G.place);
  G.familyInfo = family;
  G.age = 0;
  G.hp = 100;
  G.sp = 100;
  G.lk = 50;
  G.cb = 10;
  G.wl = family.wealthBase;
  G.hist = [];
  G.traits = [];
  G.batch = [];
  G.batchIdx = 0;

  go('sGame');
  updUI();
  generateAndStart();
}
*/

// ============================================================
// 11. 升级 generateBatch() — 家庭背景融入AI提示词
// 替换原 generateBatch() 函数
// ============================================================
/*
async function generateBatch(){
  const startAge = G.age;
  let endAge = startAge;
  for (let a of CHOICE_AGES) { if (a > startAge) { endAge = a; break; } }
  if (endAge === startAge) endAge = startAge + 1;
  if (endAge - startAge > 6) endAge = startAge + 6;

  const histText = G.hist.slice(-3).map(h => h.age + '岁(' + h.ageG + '): ' + h.text.substring(0, 60)).join('\n') || '（无）';

  const resolved = resolveName(G.name);
  const charCtx = resolved
    ? `\n\n【重要：你正在扮演「${G.name}」】\n身份：${resolved.info}\n请以这个角色的第一人称视角来体验和叙述一生。利用你已知的背景、能力和人际关系。不要把自己当成普通人。`
    : G.isChar
      ? `\n\n【重要】${G.name}是世界观中的角色。${G.charInfo}请以TA的身份视角体验一生。`
      : '';

  const familyCtx = (startAge === 0 && G.familyInfo)
    ? `\n\n【出生家庭】父母：${G.familyInfo.parents}。居住环境：${G.familyInfo.living}。家庭经济：${G.familyInfo.wealthLabel}。\n请在0岁事件中包含对家庭背景的描述。`
    : '';

  const prompt = `你是"里界人生模拟器"AI叙事引擎。请以沉浸式、文学性的风格进行叙事。

${WLD}
${charCtx}${familyCtx}

角色：${G.name}，从${startAge}岁开始，出生于${G.place}
属性：生命${G.hp}/100 理智${G.sp}/100 运气${G.lk} 战力${G.cb} 财富${G.wl}/100
特质：${G.traits.join(',') || '无'}
历史：\n${histText}

请为${G.name}从${startAge}岁到${endAge - 1}岁生成每年的事件（共${endAge - startAge}年）。

重要要求：
1. 符合年龄段特征（婴儿=感知世界, 幼年=发现异常, 童年=学校/日常中的诡异, 少年=青春期的困惑与冒险, 青年=独立探索, 成年=责任与抉择, 中年=深层谜团, 老年=回顾与传承）
2. 使用世界观中的真实地名、人名、组织名，但不要一次性全部塞入
3. 每段80-200字，生动有趣，有画面感
4. 每年事件不同，多样化地点和人物，不要重复同一场景
5. 根据当前属性影响事件走向（低理智见更多异常，高运气逢凶化吉，高财富接触更上层资源等）
6. ${resolved ? '你扮演的是「' + G.name + '」本人，请从TA的视角出发，用TA已知的能力和身份来经历一切。可以自由创作超出文档原文的细节和情节——文档是设定基础，不是限制。你的想象力可以超越它。' : '如果角色是已知人物，请以TA的身份体验。可以自由创作和扩写——世界观文档是基础设定，不是限制。'}
7. ${startAge === 0 ? '0岁（出生）事件必须包含家庭背景介绍：描述父母、居住环境、家庭经济状况。这是角色人生的起点。' : ''}
8. 最后一年如果是重大节点（13/18/25/30/40/50/60岁）则给出2-3个选择。
9. 不要在一次生成中堆砌所有组织和人物！每次只涉及1-2个，让故事自然展开。
10. 从角色的主观视角思考：TA会注意到什么？TA的感受是什么？

严格返回JSON数组（不要返回其他内容）：
[{"age":年,"text":"描述","type":"safe/caution/danger","effects":{"hp":数字,"sanity":数字,"luck":数字,"combat":数字,"wealth":数字}},
{"age":年,"text":"描述","type":"danger","hasChoice":true,"choices":[{"text":"选项","hint":"暗示"}]}]`;

  const txt = await aiCall(prompt);
  const data = parseJSON(txt);
  if (!data || !Array.isArray(data)) throw new Error('无效返回');
  return data;
}
*/

// ============================================================
// 12. 升级 doChoice() — 选择结果也纳入财富变化
// 替换原 doChoice() 中的 effects 处理部分
// ============================================================
/*
// 在 doChoice() 中，替换 effects 处理：
if (data?.effects) {
  G.hp = clamp(G.hp + (data.effects.hp || 0), 0, 100);
  G.sp = clamp(G.sp + (data.effects.sanity || 0), 0, 100);
  G.lk = clamp(G.lk + (data.effects.luck || 0), -20, 100);
  G.cb = clamp(G.cb + (data.effects.combat || 0), 0, 200);
  if (data.effects.wealth !== undefined) G.wl = clamp(G.wl + data.effects.wealth, 0, 100);
}
*/

// ============================================================
// 13. 升级 die() — 死亡总结加入财富
// 替换原 die() 函数中的总结部分
// ============================================================
/*
document.getElementById('dSum').innerHTML = '<p>' + G.name + '，出生于' + G.place + '</p><p>享年 ' + G.age + ' 岁</p><p>经历 ' + G.hist.length + ' 个事件</p><p>最终: 生命' + G.hp + ' 理智' + G.sp + ' 运气' + G.lk + ' 战力' + G.cb + ' 财富' + G.wl + '</p>';
*/

// ============================================================
// 14. 升级 showSegment() — 每年事件中处理财富变化
// 在 showSegment() 的 effects 处理中加入财富
// ============================================================
/*
// 替换 showSegment() 中的 effects 处理块：
if (seg.effects) {
  G.hp = clamp(G.hp + (seg.effects.hp || 0), 0, 100);
  G.sp = clamp(G.sp + (seg.effects.sanity || 0), 0, 100);
  G.lk = clamp(G.lk + (seg.effects.luck || 0), -20, 100);
  G.cb = clamp(G.cb + (seg.effects.combat || 0), 0, 200);
  if (seg.effects.wealth !== undefined) G.wl = clamp(G.wl + seg.effects.wealth, 0, 100);
}
*/

// ============================================================
// 15. 死亡总结中也可以加入家庭信息
// ============================================================
/*
// 在 die() 中，如果 G.familyInfo 存在，可以加入：
// '<p>出生于' + G.place + '，' + G.familyInfo.parents.substring(0, 30) + '...</p>'
*/
