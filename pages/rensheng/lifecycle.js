/**
 * 里界人生模拟器 - 生命周期 & 财富 & 属性判定系统
 * ====================================================
 * 包含：
 *   1. generateLifecycle()  - 根据角色生成生命周期配置
 *   2. getInitialWealth()   - 根据角色/年龄计算初始财富
 *   3. enhanced doChoice()  - 带属性判定的选择逻辑
 *   4. 出生地覆盖逻辑
 *   5. 伪化/异化系统
 *   6. 年衰减计算
 *
 * 依赖：本模块自包含角色数据库，无需外部 resolveName。
 * 如果在HTML中使用，全局已有 resolveName/CHARDB 则可复用。
 */

// ============================================================
// 0. 内建角色数据库（自包含）
// ============================================================

const _LC_CHARDB = {
  "营长": "槐安公寓楼长，《伪人大本营》管理者，有很多双眼睛，疑似来自里界「人监」。",
  "非常玦蝶": "渊境内最大哨站「非常电影院」站长，顶尖清劣者，来自里界「若迷界」。",
  "化而为": "蓝白色史莱姆状生命变化而来的白发红瞳少女，可随时变成任何见过的模样。",
  "西瓜人": "4580岁，对成为人类有深深执念，住在槐安公寓。",
  "X": "神秘小孩，有时被称为'093'，推测为'生命'概念人格化，白发红瞳。",
  "独允": "渊官方AI，由液态金属与光导纤维构成，投影为铜发红眼少女。",
  "亚契·谜思": "来自错位花园的炼金术师，黄铜零件与植物复合物，开设花园餐厅INFUSION。",
  "温塔莎·克林斯曼": "基质-0聚合体，紫黑风衣高大女性，皮肤苍白，左眼流黑色液体。",
  "荆千棘": "亚契助手，蔷薇科植物本体，蔷薇藤、黑色模特假人、LED屏幕的集合。",
  "赫卡忒": "亚契创造的仿生人，炭黑色皮肤，蓝色水晶头发，四个手臂。",
  "特洛菲": "人监之口，可分泌强酸性物质。",
  "洛洛": "黑色蟒蛇状怪物，与特洛菲共生。",
  "瘟疫医生": "古老伪人，与过去'大瘟疫'事件有关，基本没有交流。",
  "汐": "出没于渊附近海域的鲛人，歌声让人短暂失去时间和空间概念。",
  "涟": "出没于渊附近海域的鲛人，歌声让人短暂失去时间和空间概念。",
  "圣地亚哥·梅尔维尔": "'渔夫'，2.2米，穿深蓝色雨衣，兜帽下无可见面部。",
  "拟人蝎": "来自里界'巢穴'，人类少女外观，头部有15cm触角。",
};

const _LC_ALIASES = {
  '安诺涅': ['营长'],
  '楼长': ['营长'],
  '无名': ['营长'],
  'Anonymous': ['营长'],
  'anonymous': ['营长'],
  '玦蝶': ['非常玦蝶'],
  '非常': ['非常玦蝶'],
  '二营长': ['非常玦蝶'],
  '站长': ['非常玦蝶'],
  '化化': ['化而为'],
  '史莱姆': ['化而为'],
  '093': ['X'],
  '独独': ['独允'],
  '铜发红眼': ['独允'],
  '炼金术师': ['亚契·谜思'],
  '渔夫': ['圣地亚哥·梅尔维尔'],
  '圣地亚哥': ['圣地亚哥·梅尔维尔'],
};

function _lcResolveName(input) {
  if (!input) return null;
  // 优先检查全局 resolveName（如果HTML已定义）
  if (typeof resolveName === 'function') {
    try { return resolveName(input); } catch(e) {}
  }
  // 内建解析
  if (_LC_CHARDB[input]) return { canonicalName: input, info: _LC_CHARDB[input], match: 'exact' };
  if (_LC_ALIASES[input]) { const c = _LC_ALIASES[input][0]; return { canonicalName: c, info: _LC_CHARDB[c] || '', match: 'alias' }; }
  for (const a in _LC_ALIASES) {
    if (a.includes(input) || input.includes(a)) {
      const c = _LC_ALIASES[a][0];
      return { canonicalName: c, info: _LC_CHARDB[c] || '', match: 'fuzzy', alias: a };
    }
  }
  for (const n in _LC_CHARDB) {
    if (n.includes(input) || input.includes(n)) return { canonicalName: n, info: _LC_CHARDB[n], match: 'fuzzy' };
  }
  return null;
}

// ============================================================
// 1. 生命周期阶段定义
// ============================================================

/**
 * 人类标准生命周期阶段表
 * 每个阶段：[起始年龄, 衰减倍率, 描述]
 * 衰减倍率：1.0 = 标准衰减；<1.0 衰减慢；>1.0 衰减快
 */
const HUMAN_LIFECYCLE = [
  { stage: '婴儿期', minAge: 0,  maxAge: 1,  decayRate: 0.0,  desc: '混沌初开，感知世界' },
  { stage: '幼年期', minAge: 2,  maxAge: 6,  decayRate: 0.2,  desc: '懵懂探索，异常萌芽' },
  { stage: '童年期', minAge: 7,  maxAge: 12, decayRate: 0.3,  desc: '学校与异常交织' },
  { stage: '少年期', minAge: 13, maxAge: 17, decayRate: 0.5,  desc: '青春期觉醒' },
  { stage: '青年期', minAge: 18, maxAge: 30, decayRate: 0.8,  desc: '独立自主，闯荡里界' },
  { stage: '成年期', minAge: 31, maxAge: 50, decayRate: 1.0,  desc: '承担责任，直面真相' },
  { stage: '中年期', minAge: 51, maxAge: 65, decayRate: 1.5,  desc: '身体衰退，谜团加深' },
  { stage: '老年期', minAge: 66, maxAge: 80, decayRate: 2.5,  desc: '岁月侵蚀，回光返照' },
  { stage: '暮年期', minAge: 81, maxAge: Infinity, decayRate: 4.0, desc: '生命烛火将熄' },
];

// 生命周期年龄→阶段快速映射（0-100岁）
const HUMAN_STAGE_MAP = {};
(function buildMap() {
  for (let a = 0; a <= 100; a++) {
    for (const s of HUMAN_LIFECYCLE) {
      if (a >= s.minAge && a <= s.maxAge) {
        HUMAN_STAGE_MAP[a] = s;
        break;
      }
    }
  }
})();

function getHumanStage(age) {
  if (age <= 100) return HUMAN_STAGE_MAP[age] || HUMAN_LIFECYCLE[HUMAN_LIFECYCLE.length - 1];
  return HUMAN_LIFECYCLE[HUMAN_LIFECYCLE.length - 1];
}

// ============================================================
// 2. 已知角色生命周期数据库
// ============================================================

const CHARACTER_LIFECYCLES = {
  // 西瓜人 - 4580岁，对成为人类有深深执念
  '西瓜人': {
    type: 'pseudo_immortal',
    maxAge: 4580,
    decayRate: 0.02, // 极慢衰减，几乎不朽
    stages: [
      { stage: '萌芽期', minAge: 0, maxAge: 200, decayRate: 0.01, desc: '西瓜中的意志逐渐凝聚' },
      { stage: '觉醒期', minAge: 201, maxAge: 1000, decayRate: 0.02, desc: '开始渴望成为人类' },
      { stage: '执念期', minAge: 1001, maxAge: 3000, decayRate: 0.03, desc: '对人类身份的执念深入骨髓' },
      { stage: '暮化期', minAge: 3001, maxAge: 4500, decayRate: 0.1, desc: '意志开始衰弱，执念仍在' },
      { stage: '终结期', minAge: 4501, maxAge: Infinity, decayRate: 0.5, desc: '终将归于泥土' },
    ],
    initialWealth: 95, // 公司董事长级别
    identity: '槐安公寓住户/公司董事长',
    notes: '西瓜人身份尊贵，财富极高'
  },

  // X - "生命"概念人格化
  'X': {
    type: 'conceptual',
    maxAge: Infinity, // 概念不朽
    decayRate: 0.0,
    stages: [
      { stage: '概念期', minAge: 0, maxAge: Infinity, decayRate: 0.0, desc: '生命概念的具象化' },
    ],
    initialWealth: 0, // 没有钱的概念
    identity: '生命概念人格化',
    notes: '概念存在，无寿命概念，无财富概念'
  },

  // 独允 - AI
  '独允': {
    type: 'artificial',
    maxAge: Infinity, // 只要系统存在就不朽
    decayRate: 0.0,
    stages: [
      { stage: '运行期', minAge: 0, maxAge: Infinity, decayRate: 0.0, desc: '液态金属与光导纤维中的意识' },
    ],
    initialWealth: 0, // AI不需要钱
    identity: '渊官方AI',
    notes: 'AI存在，寿命取决于硬件，无财富概念'
  },

  // 营长 - 来自里界「人监」
  '营长': {
    type: 'pseudo_long',
    maxAge: 2000,
    decayRate: 0.05,
    stages: [
      { stage: '入世期', minAge: 0, maxAge: 100, decayRate: 0.05, desc: '从人监来到表界' },
      { stage: '督察期', minAge: 101, maxAge: 800, decayRate: 0.08, desc: '担任公寓楼长，督察伪人' },
      { stage: '守望期', minAge: 801, maxAge: 1500, decayRate: 0.15, desc: '岁月漫长，职责不变' },
      { stage: '衰退期', minAge: 1501, maxAge: Infinity, decayRate: 0.3, desc: '力量衰退，但双眼依旧' },
    ],
    initialWealth: 80,
    identity: '槐安公寓楼长/人监督察者',
    notes: '多眼存在，来自人监，位高权重'
  },

  // 非常玦蝶 - 顶尖清劣者
  '非常玦蝶': {
    type: 'pseudo_long',
    maxAge: 1200,
    decayRate: 0.08,
    stages: [
      { stage: '觉醒期', minAge: 0, maxAge: 80, decayRate: 0.05, desc: '从若迷界来到表界' },
      { stage: '战斗期', minAge: 81, maxAge: 500, decayRate: 0.1, desc: '顶尖清劣者，清理坏朋友' },
      { stage: '站长期', minAge: 501, maxAge: 900, decayRate: 0.12, desc: '经营非常电影院' },
      { stage: '暮年期', minAge: 901, maxAge: Infinity, decayRate: 0.3, desc: '战力衰退但经验犹在' },
    ],
    initialWealth: 70,
    identity: '非常电影院站长/顶尖清劣者',
    notes: '来自若迷界的清劣者'
  },

  // 化而为 - 史莱姆变化而来
  '化而为': {
    type: 'pseudo_medium',
    maxAge: 600,
    decayRate: 0.1,
    stages: [
      { stage: '变形期', minAge: 0, maxAge: 50, decayRate: 0.05, desc: '从史莱姆形态逐渐稳定' },
      { stage: '模仿期', minAge: 51, maxAge: 300, decayRate: 0.12, desc: '学习模仿各种形态' },
      { stage: '成熟期', minAge: 301, maxAge: Infinity, decayRate: 0.2, desc: '形态稳定，意识成熟' },
    ],
    initialWealth: 55,
    identity: '史莱姆变化少女',
    notes: '可变成任何见过的模样'
  },

  // 亚契·谜思 - 炼金术师
  '亚契·谜思': {
    type: 'pseudo_long',
    maxAge: 1500,
    decayRate: 0.06,
    stages: [
      { stage: '炼金期', minAge: 0, maxAge: 100, decayRate: 0.05, desc: '黄铜零件与植物复合体逐渐成形' },
      { stage: '创营业', minAge: 101, maxAge: 600, decayRate: 0.08, desc: '开设花园餐厅INFUSION' },
      { stage: '沉淀期', minAge: 601, maxAge: Infinity, decayRate: 0.15, desc: '炼金术日益精深' },
    ],
    initialWealth: 85,
    identity: '炼金术师/花园餐厅老板',
    notes: '来自错位花园'
  },

  // 温塔莎 - 基质-0聚合体
  '温塔莎·克林斯曼': {
    type: 'pseudo_medium',
    maxAge: 800,
    decayRate: 0.12,
    stages: [
      { stage: '聚合期', minAge: 0, maxAge: 100, decayRate: 0.08, desc: '基质-0聚合体初成' },
      { stage: '存在期', minAge: 101, maxAge: 500, decayRate: 0.15, desc: '在表界游荡的存在' },
      { stage: '侵蚀期', minAge: 501, maxAge: Infinity, decayRate: 0.3, desc: '黑色液体不断侵蚀自身' },
    ],
    initialWealth: 60,
    identity: '基质-0聚合体',
    notes: '紫黑风衣，左眼流黑色液体'
  },

  // 瘟疫医生 - 古老伪人
  '瘟疫医生': {
    type: 'pseudo_ancient',
    maxAge: 5000,
    decayRate: 0.01,
    stages: [
      { stage: '瘟疫期', minAge: 0, maxAge: 2000, decayRate: 0.01, desc: '大瘟疫时代的遗存' },
      { stage: '沉默期', minAge: 2001, maxAge: 4000, decayRate: 0.02, desc: '沉默游荡于世间' },
      { stage: '终末期', minAge: 4001, maxAge: Infinity, decayRate: 0.1, desc: '最后的瘟疫' },
    ],
    initialWealth: 40,
    identity: '古老伪人/大瘟疫遗存',
    notes: '极其古老，基本没有交流'
  },

  // 渔夫 - 圣地亚哥
  '圣地亚哥·梅尔维尔': {
    type: 'pseudo_medium',
    maxAge: 400,
    decayRate: 0.15,
    stages: [
      { stage: '漂泊期', minAge: 0, maxAge: 100, decayRate: 0.1, desc: '穿着深蓝色雨衣的漂泊者' },
      { stage: '深海期', minAge: 101, maxAge: 300, decayRate: 0.2, desc: '在渊附近海域游荡' },
      { stage: '消逝期', minAge: 301, maxAge: Infinity, decayRate: 0.4, desc: '雨衣下的空无逐渐消散' },
    ],
    initialWealth: 35,
    identity: '渔夫/深海漂泊者',
    notes: '2.2米，兜帽下无可见面部'
  },

  // 汐 & 涟 - 鲛人
  '汐': {
    type: 'pseudo_medium',
    maxAge: 500,
    decayRate: 0.1,
    stages: [
      { stage: '深海期', minAge: 0, maxAge: 100, decayRate: 0.05, desc: '深海中苏醒' },
      { stage: '浅游期', minAge: 101, maxAge: 300, decayRate: 0.12, desc: '在渊附近海域活动' },
      { stage: '暮潮期', minAge: 301, maxAge: Infinity, decayRate: 0.25, desc: '歌声日渐微弱' },
    ],
    initialWealth: 40,
    identity: '鲛人/海域出没者',
    notes: '歌声让人失去时空概念'
  },

  '涟': {
    type: 'pseudo_medium',
    maxAge: 500,
    decayRate: 0.1,
    stages: [
      { stage: '深海期', minAge: 0, maxAge: 100, decayRate: 0.05, desc: '深海中苏醒' },
      { stage: '浅游期', minAge: 101, maxAge: 300, decayRate: 0.12, desc: '在渊附近海域活动' },
      { stage: '暮潮期', minAge: 301, maxAge: Infinity, decayRate: 0.25, desc: '歌声日渐微弱' },
    ],
    initialWealth: 40,
    identity: '鲛人/海域出没者',
    notes: '歌声让人失去时空概念'
  },

  // 拟人蝎 - 来自里界"巢穴"
  '拟人蝎': {
    type: 'pseudo_medium',
    maxAge: 350,
    decayRate: 0.15,
    stages: [
      { stage: '孵化期', minAge: 0, maxAge: 30, decayRate: 0.05, desc: '从巢穴中孵化' },
      { stage: '拟态期', minAge: 31, maxAge: 200, decayRate: 0.15, desc: '人类少女外观下的蝎之本质' },
      { stage: '衰老期', minAge: 201, maxAge: Infinity, decayRate: 0.35, desc: '触角逐渐枯萎' },
    ],
    initialWealth: 30,
    identity: '巢穴来客/拟人少女',
    notes: '头部有15cm触角'
  },

  // 荆千棘 - 蔷薇科植物
  '荆千棘': {
    type: 'pseudo_long',
    maxAge: 1000,
    decayRate: 0.08,
    stages: [
      { stage: '生长期', minAge: 0, maxAge: 100, decayRate: 0.05, desc: '蔷薇藤与假人的集合体成形' },
      { stage: '助手期', minAge: 101, maxAge: 600, decayRate: 0.1, desc: '作为亚契的助手' },
      { stage: '枯荣期', minAge: 601, maxAge: Infinity, decayRate: 0.2, desc: '植物本能的枯荣循环' },
    ],
    initialWealth: 50,
    identity: '亚契助手/蔷薇科植物',
    notes: '蔷薇藤、黑色模特假人、LED屏幕的集合'
  },

  // 赫卡忒 - 仿生人
  '赫卡忒': {
    type: 'artificial',
    maxAge: 2000,
    decayRate: 0.03,
    stages: [
      { stage: '启动期', minAge: 0, maxAge: 50, decayRate: 0.02, desc: '被亚契创造的仿生人启动' },
      { stage: '运行期', minAge: 51, maxAge: 1500, decayRate: 0.04, desc: '四臂仿生人的日常' },
      { stage: '磨损期', minAge: 1501, maxAge: Infinity, decayRate: 0.15, desc: '零件老化，需要维护' },
    ],
    initialWealth: 45,
    identity: '仿生人/亚契的创造物',
    notes: '炭黑色皮肤，蓝色水晶头发，四个手臂'
  },

  // 特洛菲 & 洛洛
  '特洛菲': {
    type: 'pseudo_ancient',
    maxAge: 3000,
    decayRate: 0.03,
    stages: [
      { stage: '深渊期', minAge: 0, maxAge: 1000, decayRate: 0.02, desc: '人监之口的深渊岁月' },
      { stage: '活跃期', minAge: 1001, maxAge: 2000, decayRate: 0.05, desc: '强酸性物质分泌旺盛期' },
      { stage: '衰竭期', minAge: 2001, maxAge: Infinity, decayRate: 0.2, desc: '酸液逐渐减少' },
    ],
    initialWealth: 55,
    identity: '人监之口',
    notes: '可分泌强酸性物质'
  },

  '洛洛': {
    type: 'pseudo_ancient',
    maxAge: 3000,
    decayRate: 0.03,
    stages: [
      { stage: '深渊期', minAge: 0, maxAge: 1000, decayRate: 0.02, desc: '黑色蟒蛇在深渊中游荡' },
      { stage: '缠绕期', minAge: 1001, maxAge: 2000, decayRate: 0.05, desc: '与特洛菲共生' },
      { stage: '蜕皮期', minAge: 2001, maxAge: Infinity, decayRate: 0.2, desc: '最后一次蜕皮何时到来' },
    ],
    initialWealth: 55,
    identity: '人监之口/黑色蟒蛇状怪物',
    notes: '与特洛菲共生'
  },
};

// ============================================================
// 3. 出生地覆盖逻辑
// ============================================================

const CHARACTER_ORIGINS = {
  // 渊阵营
  '营长': '人监→渊',
  '安诺涅': '人监→渊',
  '楼长': '人监→渊',
  '无名': '人监→渊',
  'Anonymous': '人监→渊',
  'anonymous': '人监→渊',
  '非常玦蝶': '若迷界→渊',
  '二营长': '若迷界→渊',
  '化而为': '随心→渊',
  '西瓜人': '渊',
  'X': '渊',
  '093': '渊',
  '独允': '渊',
  '亚契·谜思': '错位花园→渊',
  '荆千棘': '错位花园→渊',
  '赫卡忒': '错位花园→渊',
  '特洛菲': '人监→渊',
  '洛洛': '人监→渊',
  '【瘟疫的病主】医生？': '疫病区→渊',
  '瘟疫医生': '疫病区→渊',
  '汐': '渊(海域)',
  '涟': '渊(海域)',
  '春山抚子': '天风阁→渊',
  '小赤帽': '渊',
  '折纸簌鸟': '渊',
  '单先生': '渊',
  '虫者': '渊',
  '笑颜': '渊',
  '陆玖': '渊',
  '墨水夜': '渊',
  '石测': '渊',
  '大夜夜': '渊',
  '伽纳罗丝': '渊',
  'C.': '渊',
  '松下·拉尔': '渊',
  '江安': '渊',
  '涂改': '渊',
  '菲洛维尔': '渊',
  'Cipher': '渊',
  '无名卿': '渊',
  '伊露': '渊',
  '阿秋': '人监→渊',
  '云蓝': '渊',
  // 西陆阵营
  '温塔莎·克林斯曼': '西陆联盟',
  'Αθάνατο': '西陆联盟',
  '安布罗斯': '西陆联盟',
  'Ιππότης': '西陆联盟',
  '希庇安': '西陆联盟',
  'AT': '西陆联盟',
  'Evangelium.福音': '西陆联盟',
  '福音': '西陆联盟',
  'Joschmitt.': '西陆联盟',
  '约斯米特': '西陆联盟',
  '瓦莉奥尔·阿亚奇': '西陆联盟',
  '瓦莉奥尔': '西陆联盟',
  '卡芙涅': '西陆联盟',
  '维拉莉娅': '西陆联盟',
  '汉兹安索德': '西陆联盟',
  '艾尔伯特·帕拉索': '西陆联盟',
  '斯汀先生': '西陆联盟',
  // 赤红新星
  'Эдельвейс': '赤红新星',
  '雪绒花': '赤红新星',
  // 其他
  '圣地亚哥·梅尔维尔': '未知→各处出没',
  '渔夫': '未知→各处出没',
  '拟人蝎': '巢穴',
  '绫份': '自由联盟',
  '灼玥': '自由联盟',
  '长喙': '自由联盟',
  '冷寂': '自由联盟',
  '鸿': '自由联盟',
  '海德拉': '无所属',
  '『我深深的破碎』': '无所属',
  '牺牲': '无所属',
  '红缇香': '无所属',
  '兔仙': '茶居公寓(渊南部)',
  '梦城寺绫希': '未知',
};

/**
 * 解析角色出生地
 * 如果名字匹配世界观角色，返回角色原本的出生地
 * 否则返回用户选择的出生地
 * @param {string} inputName - 用户输入的名字
 * @param {string} userPlace - 用户选择的出生地
 * @returns {string} 最终出生地
 */
function resolveBirthplace(inputName, userPlace) {
  const resolved = _lcResolveName(inputName);
  if (resolved) {
    const origin = CHARACTER_ORIGINS[resolved.canonicalName];
    if (origin) {
      // 用户选择的出生地总是生效，但保留原出生地供AI推演时合理化
      return {
        origin: origin,
        current: userPlace,
        display: origin + '→' + userPlace
      };
    }
    // 已知角色但无明确出生地记录
    return {
      origin: '未知',
      current: userPlace,
      display: userPlace
    };
  }
  return {
    origin: userPlace,
    current: userPlace,
    display: userPlace
  };
}

// ============================================================
// 4. generateLifecycle() - 生命周期生成器
// ============================================================

/**
 * 生成角色的生命周期配置
 * @param {string} name - 角色名
 * @param {string} place - 出生地
 * @returns {object} 生命周期配置对象
 */
function generateLifecycle(name, place) {
  const resolved = _lcResolveName(name);
  const isKnownChar = !!resolved;
  const charName = isKnownChar ? resolved.canonicalName : name;

  // 检查是否有特殊生命周期
  const charLC = CHARACTER_LIFECYCLES[charName];

  if (charLC) {
    // 已知角色 - 使用特殊生命周期
    const birthplace = resolveBirthplace(name, place);
    return {
      name: charName,
      type: 'character',
      isHuman: false,
      isKnownCharacter: true,
      lifecycleType: charLC.type,
      maxAge: charLC.maxAge,
      stages: charLC.stages,
      baseDecayRate: charLC.decayRate,
      initialWealth: charLC.initialWealth,
      identity: charLC.identity,
      birthplace: birthplace,
      charInfo: resolved ? resolved.info : '',
      notes: charLC.notes,
      canPseudoTransform: false, // 已经是伪人/特殊存在
    };
  }

  // 自定义角色 - 3:1 概率人类/伪人，推演前不告知
  const isPseudoCustom = Math.random() < 0.25;
  const pseudoTypes = ['pseudo_medium', 'pseudo_long', 'pseudo_ancient'];
  const pseudoType = pseudoTypes[Math.floor(Math.random() * pseudoTypes.length)];
  const pseudoMaxAge = pseudoType === 'pseudo_medium' ? (300 + Math.floor(Math.random() * 300)) :
                       pseudoType === 'pseudo_long' ? (800 + Math.floor(Math.random() * 700)) :
                       (2000 + Math.floor(Math.random() * 3000));
  const pseudoDecay = pseudoType === 'pseudo_medium' ? (0.1 + Math.random() * 0.1) :
                      pseudoType === 'pseudo_long' ? (0.03 + Math.random() * 0.07) :
                      (0.01 + Math.random() * 0.03);

  if (isPseudoCustom) {
    return {
      name: charName,
      type: 'pseudo_hidden',
      isHuman: false,
      isKnownCharacter: false,
      lifecycleType: pseudoType,
      maxAge: pseudoMaxAge,
      stages: [
        { stage: '潜伏期', minAge: 0, maxAge: 30, decayRate: pseudoDecay * 0.5, desc: '外表与常人无异，但隐约感觉不同' },
        { stage: '觉醒期', minAge: 31, maxAge: Math.floor(pseudoMaxAge * 0.3), decayRate: pseudoDecay, desc: '异常能力开始显现' },
        { stage: '成熟期', minAge: Math.floor(pseudoMaxAge * 0.3) + 1, maxAge: Math.floor(pseudoMaxAge * 0.7), decayRate: pseudoDecay * 1.2, desc: '非人本质逐渐显露' },
        { stage: '蜕变期', minAge: Math.floor(pseudoMaxAge * 0.7) + 1, maxAge: Math.floor(pseudoMaxAge * 0.95), decayRate: pseudoDecay * 2, desc: '人性与伪性的拉扯' },
        { stage: '终末期', minAge: Math.floor(pseudoMaxAge * 0.95) + 1, maxAge: Infinity, decayRate: pseudoDecay * 4, desc: '存在本身的消退' },
      ],
      baseDecayRate: pseudoDecay,
      initialWealth: null,
      identity: null,
      birthplace: resolveBirthplace(name, place),
      charInfo: '',
      notes: '⚠️ 伪人身份隐藏中，通过游戏事件逐步揭示',
      canPseudoTransform: false, // 已经是伪人
    };
  }

  return {
    name: charName,
    type: 'human',
    isHuman: true,
    isKnownCharacter: false,
    lifecycleType: 'human',
    maxAge: 80 + Math.floor(Math.random() * 20 - 10), // 70-90
    stages: HUMAN_LIFECYCLE,
    baseDecayRate: 1.0,
    initialWealth: null, // 由财富系统根据家庭背景计算
    identity: null,
    birthplace: resolveBirthplace(name, place),
    charInfo: '',
    notes: '',
    canPseudoTransform: true, // 人类可以伪化
  };
}

/**
 * 获取角色在指定年龄所处的生命周期阶段
 * @param {object} lifecycle - generateLifecycle 返回的对象
 * @param {number} age - 年龄
 * @returns {object} 阶段信息 {stage, minAge, maxAge, decayRate, desc}
 */
function getStageAtAge(lifecycle, age) {
  const stages = lifecycle.stages || HUMAN_LIFECYCLE;
  for (const s of stages) {
    if (age >= s.minAge && age <= s.maxAge) {
      return { ...s };
    }
  }
  return { ...stages[stages.length - 1] };
}

// ============================================================
// 5. 财富系统
// ============================================================

/**
 * 计算初始财富
 * @param {object} lifecycle - generateLifecycle 返回的对象
 * @param {number} startAge - 起始年龄
 * @param {string} place - 出生地
 * @returns {number} 初始财富值 (0-100)
 */
function getInitialWealth(lifecycle, startAge, place) {
  // 已知角色直接返回预设财富
  if (lifecycle.isKnownCharacter && lifecycle.initialWealth !== null) {
    // 婴儿/幼年角色财富大幅降低
    if (startAge <= 1) return 0;
    if (startAge <= 6) return Math.max(5, Math.floor(lifecycle.initialWealth * 0.1));
    if (startAge <= 12) return Math.max(10, Math.floor(lifecycle.initialWealth * 0.2));
    return lifecycle.initialWealth;
  }

  // 人类根据年龄段设定
  const ag = getHumanStage(startAge);
  if (!ag) return 0;

  let baseWealth = 0;
  switch (ag.stage) {
    case '婴儿期':
    case '幼年期':
      baseWealth = 0; // 没有钱的概念
      break;
    case '童年期':
      baseWealth = 10 + Math.floor(Math.random() * 11); // 10-20 零花钱
      break;
    case '少年期':
      baseWealth = 20 + Math.floor(Math.random() * 16); // 20-35
      break;
    case '青年期':
      baseWealth = 30 + Math.floor(Math.random() * 31); // 30-60
      break;
    case '成年期':
      baseWealth = 40 + Math.floor(Math.random() * 41); // 40-80
      break;
    case '中年期':
      baseWealth = 50 + Math.floor(Math.random() * 31); // 50-80
      break;
    case '老年期':
    case '暮年期':
      baseWealth = 30 + Math.floor(Math.random() * 31); // 30-60 退休金/积蓄
      break;
    default:
      baseWealth = 50;
  }

  // 家庭背景加成（使用增强版家庭生成器）
  const familyBonus = generateFamilyWealthBonus(place, ag.stage);
  baseWealth += familyBonus;

  return clamp(baseWealth, 0, 100);
}

/**
 * 增强版家庭背景财富生成器
 * 根据地域+角色类型生成不同的家庭经济背景
 * @param {string} place - 出生地
 * @param {string} ageStage - 年龄段
 * @returns {number} 财富加成 (-15 ~ +25)
 */
function generateFamilyWealthBonus(place, ageStage) {
  // 如果年龄太小，家庭背景影响力弱
  if (ageStage === '婴儿期' || ageStage === '幼年期') return 0;

  const familyWealth = {
    '渊': {
      min: -10, max: 20, avg: 5,
      descriptions: [
        '黎守基层员工家庭', '里界研究者家庭', '黑市商人家庭',
        '普通工薪阶层', '公寓管理者家庭', '哨站工作人员家庭'
      ]
    },
    '西陆联盟': {
      min: -15, max: 25, avg: 3,
      descriptions: [
        '教廷信徒家庭', '手与剑之乡铁匠家庭', '偏远村庄农户',
        '教会贵族家庭', '小镇商人家庭', '朝圣者家庭'
      ]
    },
    '赤红新星': {
      min: -10, max: 20, avg: 5,
      descriptions: [
        '军事基地军官家庭', '工厂工人家庭', '科研机构学者家庭',
        '北极角驻守人员家庭', '体制内干部家庭', '边境守卫家庭'
      ]
    },
    '渊东共和国': {
      min: -10, max: 20, avg: 4,
      descriptions: [
        '航运公司职员家庭', '渔民家庭', '哨站工作人员家庭',
        '海岛教师家庭', '港口工人家庭', '渡轮经营者家庭'
      ]
    }
  };

  const fw = familyWealth[place] || familyWealth['渊'];

  // 随机生成家庭背景偏移
  const bonus = fw.min + Math.floor(Math.random() * (fw.max - fw.min + 1));

  // 存储家庭描述供AI提示使用
  const descIndex = Math.min(
    Math.floor((bonus - fw.min) / (fw.max - fw.min + 1) * fw.descriptions.length),
    fw.descriptions.length - 1
  );
  const _familyDesc = fw.descriptions[Math.max(0, descIndex)];

  return bonus;
}

/**
 * 财富等级描述
 */
function getWealthDescription(wl) {
  if (wl <= 0) return '身无分文';
  if (wl <= 15) return '勉强温饱';
  if (wl <= 30) return '略有积蓄';
  if (wl <= 50) return '衣食无忧';
  if (wl <= 70) return '生活宽裕';
  if (wl <= 85) return '富裕';
  return '家财万贯';
}

/**
 * 财富消耗 - 某些选择需要花费财富
 * @param {number} cost - 消耗金额
 * @param {number} currentWl - 当前财富
 * @returns {boolean} 是否足够支付
 */
function canAfford(cost, currentWl) {
  return currentWl >= cost;
}

/**
 * 财富变动
 */
function modifyWealth(currentWl, amount) {
  return clamp(currentWl + amount, 0, 100);
}

// ============================================================
// 6. 年衰减计算系统
// ============================================================

/**
 * 计算年度自然衰减
 * @param {object} lifecycle - 生命周期配置
 * @param {number} age - 当前年龄
 * @param {object} currentStats - 当前属性 {hp, sp, lk, cb, wl}
 * @returns {object} 衰减量 {hp: -X, sp: -Y, ...}
 */
function calculateAnnualDecay(lifecycle, age, currentStats) {
  const stage = getStageAtAge(lifecycle, age);
  const decayRate = stage.decayRate || lifecycle.baseDecayRate || 1.0;

  // 基础衰减
  const hpDecay = -(0.3 * decayRate + Math.random() * 0.5 * decayRate);
  const spDecay = -(0.1 * decayRate + Math.random() * 0.3 * decayRate);

  // 财富自然衰减（老年更快）
  let wlDecay = 0;
  if (age > 60) {
    wlDecay = -(0.2 * decayRate + Math.random() * 0.3);
  } else if (age > 40) {
    wlDecay = -(0.1 * decayRate);
  } else if (age < 7) {
    wlDecay = 0; // 小孩不产生财富衰减
  }

  return {
    hp: Math.round(hpDecay * 10) / 10,
    sp: Math.round(spDecay * 10) / 10,
    wl: Math.round(wlDecay * 10) / 10,
    decayRate: decayRate,
    stage: stage.stage
  };
}

// ============================================================
// 7. 伪化系统
// ============================================================

/**
 * 伪化事件 - 人类被伪化，获得更长的寿命但伴随副作用
 * @param {object} lifecycle - 当前生命周期
 * @returns {object} 伪化后的生命周期
 */
function applyPseudoTransform(lifecycle) {
  const transformed = {
    ...lifecycle,
    isHuman: false,
    type: 'pseudo_transformed',
    lifecycleType: 'pseudo_transformed',
    pseudoTransformAge: -1,
    maxAge: lifecycle.maxAge * 3 + Math.floor(Math.random() * 1000), // 寿命大幅延长
    baseDecayRate: 0.1, // 衰减大幅降低
    stages: [
      { stage: '伪化初期', minAge: 0, maxAge: 50, decayRate: 0.05, desc: '身体开始异变，寿命延长' },
      { stage: '伪化中期', minAge: 51, maxAge: 300, decayRate: 0.08, desc: '异变稳定，获得非人能力' },
      { stage: '伪化晚期', minAge: 301, maxAge: 800, decayRate: 0.15, desc: '人性逐渐消退' },
      { stage: '终末期', minAge: 801, maxAge: Infinity, decayRate: 0.3, desc: '存在本身开始消散' },
    ],
  };

  // 伪化时添加特质
  if (!transformed.traits) transformed.traits = [];
  transformed.traits.push('伪化者');
  transformed.traits.push('异变体质');

  return transformed;
}

/**
 * 检查是否发生伪化（由AI事件触发，这里只提供判定框架）
 * 实际伪化判定由AI生成事件时决定
 * @param {number} sp - 当前理智
 * @param {number} age - 年龄
 * @param {array} events - 最近的事件历史
 * @returns {boolean} 是否触发伪化判定
 */
function shouldCheckPseudoTransform(sp, age, events) {
  // 理智极低时更容易伪化
  if (sp < 15) return true;
  // 接触过危险里界事件后可能伪化
  const dangerEvents = events.filter(e => e.type === 'danger').length;
  if (dangerEvents >= 3 && Math.random() < 0.15) return true;
  // 特定年龄段更脆弱
  if ((age >= 13 && age <= 17) && sp < 30 && Math.random() < 0.1) return true;
  return false;
}

// ============================================================
// 8. 属性判定系统 - 增强版 doChoice
// ============================================================

/**
 * 检查选择是否满足属性要求
 * @param {object} choice - 选择项
 * @param {object} stats - 当前属性 {hp, sp, lk, cb, wl}
 * @returns {object} { allowed: boolean, reason: string }
 */
function checkChoiceRequirements(choice, stats) {
  if (!choice || !choice.requirements) {
    return { allowed: true, reason: '' };
  }

  const req = choice.requirements;

  // 战力要求
  if (req.minCb !== undefined && stats.cb < req.minCb) {
    return {
      allowed: false,
      reason: `需要战力 ≥ ${req.minCb}（当前：${stats.cb}）`
    };
  }

  // 财富要求
  if (req.minWl !== undefined && stats.wl < req.minWl) {
    return {
      allowed: false,
      reason: `需要财富 ≥ ${req.minWl}（当前：${stats.wl}）`
    };
  }

  // 理智要求
  if (req.minSp !== undefined && stats.sp < req.minSp) {
    return {
      allowed: false,
      reason: `需要理智 ≥ ${req.minSp}（当前：${stats.sp}）`
    };
  }

  // 生命要求
  if (req.minHp !== undefined && stats.hp < req.minHp) {
    return {
      allowed: false,
      reason: `需要生命 ≥ ${req.minHp}（当前：${stats.hp}）`
    };
  }

  // 运气要求
  if (req.minLk !== undefined && stats.lk < req.minLk) {
    return {
      allowed: false,
      reason: `需要运气 ≥ ${req.minLk}（当前：${stats.lk}）`
    };
  }

  // 年龄阶段要求
  if (req.minAge !== undefined && stats.age < req.minAge) {
    return {
      allowed: false,
      reason: `需要年龄 ≥ ${req.minAge}岁（当前：${stats.age}岁）`
    };
  }

  // 特质要求
  if (req.hasTrait && stats.traits) {
    for (const trait of req.hasTrait) {
      if (!stats.traits.includes(trait)) {
        return {
          allowed: false,
          reason: `需要特质「${trait}」`
        };
      }
    }
  }

  // 特质排除
  if (req.noTrait && stats.traits) {
    for (const trait of req.noTrait) {
      if (stats.traits.includes(trait)) {
        return {
          allowed: false,
          reason: `不能有特质「${trait}」`
        };
      }
    }
  }

  return { allowed: true, reason: '' };
}

/**
 * 属性判定结果计算
 * 根据属性调整选择的成功率和效果
 * @param {string} choiceType - 选择类型: 'combat', 'bribe', 'social', 'luck', 'willpower', 'explore'
 * @param {object} stats - 当前属性
 * @returns {object} { success: boolean, score: number, modifier: number }
 */
function calcChoiceOutcome(choiceType, stats) {
  let baseScore = 50; // 基础成功率 50%
  let modifier = 0;

  switch (choiceType) {
    case 'combat':
      // 战力决定战斗成功率
      baseScore = stats.cb;
      modifier = Math.floor(stats.lk * 0.1); // 运气加成
      break;

    case 'bribe':
      // 财富决定贿赂成功率
      baseScore = stats.wl;
      modifier = Math.floor(stats.lk * 0.15);
      break;

    case 'social':
      // 理智和运气影响社交
      baseScore = (stats.sp + stats.lk) / 2;
      modifier = Math.floor(stats.cb * 0.05); // 战力带来威慑
      break;

    case 'luck':
      // 纯运气
      baseScore = stats.lk;
      break;

    case 'willpower':
      // 意志/理智
      baseScore = stats.sp;
      modifier = Math.floor(stats.cb * 0.1); // 战力带来信心
      break;

    case 'explore':
      // 探索需要平衡
      baseScore = (stats.lk + stats.sp + stats.cb) / 3;
      break;

    default:
      baseScore = 50;
  }

  const finalScore = clamp(baseScore + modifier, 0, 100);
  const success = Math.random() * 100 < finalScore;

  return {
    success: success,
    score: finalScore,
    modifier: modifier
  };
}

/**
 * 生成带属性判定的选择按钮HTML
 * @param {object} choice - 选择项数据
 * @param {object} stats - 当前属性
 * @returns {string} HTML字符串
 */
function renderChoiceButton(choice, stats) {
  const check = checkChoiceRequirements(choice, stats);
  const allowed = check.allowed;

  const text = choice.text || '';
  const hint = choice.hint || '';
  const attrHint = allowed ? '' : `<span class="choice-blocked">🔒 ${check.reason}</span>`;

  if (allowed) {
    return `<button class="cbtn" onclick="doChoice(this, ${JSON.stringify(choice).replace(/"/g, '&quot;')})">
      <div>${text}</div>
      ${hint ? `<div class="hint">${hint}</div>` : ''}
      ${choice.type ? `<div class="hint"><span class="tag ${choice.type}">${choice.type === 'combat' ? '⚔️战斗' : choice.type === 'bribe' ? '💰贿赂' : choice.type === 'social' ? '🤝社交' : choice.type === 'luck' ? '🍀运气' : choice.type === 'explore' ? '🔍探索' : choice.type}</span></div>` : ''}
    </button>`;
  } else {
    return `<button class="cbtn cbtn-disabled" disabled>
      <div style="opacity:0.4">${text}</div>
      ${hint ? `<div class="hint" style="opacity:0.3">${hint}</div>` : ''}
      ${attrHint ? `<div class="choice-blocked">${attrHint}</div>` : ''}
    </button>`;
  }
}

// ============================================================
// 9. 增强版 AI 提示词生成器
// ============================================================

/**
 * 生成包含生命周期和财富上下文的AI提示词
 * @param {object} G - 游戏状态
 * @param {object} lifecycle - 生命周期配置
 * @param {number} startAge - 起始年龄
 * @param {number} endAge - 结束年龄
 * @returns {string} AI提示词
 */
function generateBatchPrompt(G, lifecycle, startAge, endAge) {
  const stage = getStageAtAge(lifecycle, startAge);
  const wealthDesc = getWealthDescription(G.wl);
  const histText = G.hist.slice(-3).map(h =>
    `${h.age}岁(${h.ageG}): ${h.text.substring(0, 60)}`
  ).join('\n') || '（无）';

  const charCtx = G.isChar ?
    `\n\n【重要】${G.name}是世界观中的角色。${G.charInfo}请以TA的身份视角体验一生。` : '';

  const lifecycleCtx = !lifecycle.isHuman ?
    `\n\n【生命周期】${G.name}是${lifecycle.lifecycleType}类型，最大寿命${lifecycle.maxAge === Infinity ? '不朽' : lifecycle.maxAge + '岁'}。当前阶段：${stage.stage}，衰减率×${stage.decayRate}。` :
    `\n\n【生命周期】人类，当前阶段：${stage.stage}，衰减率×${stage.decayRate}。年龄增长会导致生命和理智自然衰减，老年期加速。`;

  const wealthCtx = `\n\n【财富状态】当前财富：${G.wl}/100（${wealthDesc}）。`;

  return `你是"里界人生模拟器"AI叙事引擎。
${WLD}${charCtx}${lifecycleCtx}${wealthCtx}
角色:${G.name},${startAge}岁起(${stage.stage}),出生于${G.place}
属性:生命${G.hp}/100 理智${G.sp}/100 运气${G.lk} 战力${G.cb} 财富${G.wl}/100
特质:${G.traits.join(',') || '无'}
历史:\n${histText}

请为${G.name}从${startAge}岁到${endAge - 1}岁生成每年的事件(共${endAge - startAge}年)。
要求:
1. 符合年龄段(婴儿=感知,幼年=发现,童年=学校异常,少年=青春期,青年=独立,成年=责任,中年=谜团,老年=反思)
2. 使用真实地名/人名/组织名
3. 每段80-200字,生动有趣
4. 每年不同,多样化,不要重复同一地点或人物
5. 根据属性影响倾向
6. 财富影响事件（高财富可以雇佣、购买、投资等，低财富需要节俭、冒险等）
7. 如果角色非人类，事件应符合其身份和寿命特点
${G.isChar ? '8. 事件必须符合' + G.name + '的已知设定和身份' : ''}
9. 某些事件可包含选择。选择的格式：
   {
     "text": "选项文本",
     "hint": "暗示文本",
     "type": "combat/bribe/social/luck/explore/normal",
     "requirements": { "minCb": 30, "minWl": 50, "minSp": 20 } (可选)
   }

严格返回JSON数组:
[{"age":年,"text":"描述","type":"safe/caution/danger","effects":{"hp":数字,"sanity":数字,"luck":数字,"combat":数字,"wealth":数字}},
{"age":年,"text":"描述","type":"danger","hasChoice":true,"choices":[{"text":"选项","hint":"暗示","type":"类型","requirements":{}}]}]`;
}

// ============================================================
// 10. 增强版 doChoice - 整合属性判定
// ============================================================

/**
 * 增强版 doChoice - 带属性判定的选择执行
 * 需要与游戏主逻辑整合使用
 *
 * 用法示例:
 *   // 在选择按钮渲染时：
 *   const check = checkChoiceRequirements(choice, { hp: G.hp, sp: G.sp, lk: G.lk, cb: G.cb, wl: G.wl, age: G.age, traits: G.traits });
 *   if (!check.allowed) { 按钮变灰; return; }
 *
 *   // 选择执行时：
 *   const outcome = calcChoiceOutcome(choice.type, { cb: G.cb, lk: G.lk, sp: G.sp, wl: G.wl });
 *   // outcome.success 决定是否成功，outcome.score 是成功率
 *
 * @param {object} choice - 选择数据
 * @param {string} eventText - 事件描述
 * @param {object} G - 游戏状态对象（引用）
 * @param {function} aiCall - AI调用函数
 * @param {function} parseJSON - JSON解析函数
 * @returns {Promise<object>} 选择结果
 */
async function doChoiceEnhanced(choice, eventText, G, aiCall, parseJSON) {
  // 第一步：属性要求判定
  const stats = {
    hp: G.hp, sp: G.sp, lk: G.lk, cb: G.cb, wl: G.wl,
    age: G.age, traits: G.traits
  };
  const check = checkChoiceRequirements(choice, stats);

  if (!check.allowed) {
    return {
      success: false,
      reason: check.reason,
      text: '条件不足，无法执行。' + check.reason
    };
  }

  // 第二步：属性判定（影响成功率和效果）
  const choiceType = choice.type || 'normal';
  const outcome = calcChoiceOutcome(choiceType, stats);

  // 第三步：贿赂类选择需要消耗财富
  let wealthCost = 0;
  if (choiceType === 'bribe') {
    wealthCost = Math.max(5, Math.floor(G.wl * 0.2));
    G.wl = modifyWealth(G.wl, -wealthCost);
  }

  // 第四步：AI推演结果（根据判定结果调整prompt）
  const successModifier = outcome.success ? '选择成功！' : '选择失败了。';
  const charCtx = G.isChar ? `\n\n${G.name}是世界观角色。${G.charInfo}` : '';

  const prompt = `你是"里界人生模拟器"AI推演引擎。${WLD}${charCtx}
角色:${G.name},${G.age}岁,${ageG(G.age)},出生于${G.place}
属性:生命${G.hp}/100 理智${G.sp}/100 运气${G.lk} 战力${G.cb} 财富${G.wl}/100
事件:${eventText.substring(0, 200)}
选择:"${choice.text}"
判定结果:${successModifier}（成功率${outcome.score}%）
${wealthCost > 0 ? '贿赂消耗了' + wealthCost + '财富。' : ''}
推演结果(100-200字)。JSON:{"text":"结果描述","effects":{"hp":数字,"sanity":数字,"luck":数字,"combat":数字,"wealth":数字}}`;

  try {
    const txt = await aiCall(prompt);
    const data = parseJSON(txt);

    // 应用效果
    if (data && data.effects) {
      G.hp = clamp(G.hp + (data.effects.hp || 0), 0, 100);
      G.sp = clamp(G.sp + (data.effects.sanity || 0), 0, 100);
      G.lk = clamp(G.lk + (data.effects.luck || 0), -20, 100);
      G.cb = clamp(G.cb + (data.effects.combat || 0), 0, 200);
      G.wl = clamp(G.wl + (data.effects.wealth || 0), 0, 100);
    }

    return {
      success: outcome.success,
      score: outcome.score,
      text: data ? data.text : '命运已定。',
      effects: data ? data.effects : null,
      wealthCost: wealthCost
    };
  } catch (e) {
    return {
      success: false,
      error: e.message,
      text: '推演中断。'
    };
  }
}

// ============================================================
// 11. 工具函数
// ============================================================

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function ageG(a) {
  const stage = getHumanStage(a);
  return stage ? stage.stage : '老年期';
}

/**
 * 获取角色完整生命周期状态摘要（用于AI提示）
 */
function getLifecycleSummary(lifecycle, age) {
  const stage = getStageAtAge(lifecycle, age);
  const remaining = lifecycle.maxAge === Infinity ? '不朽' : Math.max(0, lifecycle.maxAge - age);
  const pct = lifecycle.maxAge === Infinity ? 'N/A' : Math.round((age / lifecycle.maxAge) * 100) + '%';

  return `${lifecycle.name} | 年龄:${age}岁 | 阶段:${stage.stage} | 寿命:${lifecycle.maxAge === Infinity ? '不朽' : lifecycle.maxAge + '岁'} | 剩余:${remaining}岁(${pct}) | 衰减率:×${stage.decayRate} | 类型:${lifecycle.lifecycleType}`;
}

// ============================================================
// 12. 导出
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // 生命周期
    HUMAN_LIFECYCLE,
    CHARACTER_LIFECYCLES,
    generateLifecycle,
    getStageAtAge,
    getHumanStage,
    getLifecycleSummary,
    ageG,

    // 财富
    getInitialWealth,
    generateFamilyWealthBonus,
    getWealthDescription,
    canAfford,
    modifyWealth,

    // 衰减
    calculateAnnualDecay,

    // 伪化
    applyPseudoTransform,
    shouldCheckPseudoTransform,

    // 属性判定
    checkChoiceRequirements,
    calcChoiceOutcome,
    renderChoiceButton,
    doChoiceEnhanced,

    // 出生地
    resolveBirthplace,
    CHARACTER_ORIGINS,

    // AI提示词
    generateBatchPrompt,

    // 工具
    clamp,
  };
}
