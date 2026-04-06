// Lore Data Objects - 伪人宇宙设定资料
// 导出到 window 对象供前端使用
// 数据来源：Excel 世界观文档导入 + 现有数据合并

// ==================== 组织数据 ====================
window.LORE_ORGANIZATIONS = [
  // === 来自主世界观 ===
  {
    name: "黎守调查局",
    alias: "Dawn Guard",
    description: "名字意为'黎明前的守护'，人类一方执法部门，负责调查并收容里界和伪人",
    duties: "调查异常事件、收容登记伪人、收缴伪物、配合对伪课行动",
    features: "对伪人持中立态度，无危险性伪人可获得'公民'身份，职责是维护平衡而非消灭伪人",
    knownMembers: "白桦（对伪课副课长）",
    location: "总部设于渊，各地区设有分局",
    source: "黎守调查局"
  },
  {
    name: "对伪课",
    alias: "Anti-Pseudo Division",
    description: "黎守下属特别武装单位，配备重火力武器，镇压高危伪人",
    duties: "处理高危伪人事件、配合黎守行动、特殊武力镇压",
    features: "精英化编制、重火力装备、特殊武装单位",
    knownMembers: "白桦（副课长）",
    location: "分布于各大城市",
    source: "黎守调查局"
  },
  {
    name: "猎人公会",
    alias: "Hunter's Guild",
    description: "民间武装团体，以公会为基本形式，汇集民间人士处理伪人事件",
    duties: "接取民间委托、镇压高危伪人、处理门、寻猎伪物",
    features: "利益导向、使用伪物对抗伪人、处于灰色地带、民间复仇者聚集",
    knownMembers: "多位民间猎人",
    location: "据点遍布各地",
    source: "猎人公会"
  },
  {
    name: "绿洲",
    alias: "OASIS",
    description: "致力于研究世界异象、开发里界的神秘学科研组织，以世界存续为目标",
    duties: "探索里界、保障伪人权益、让伪人与人类社会建立联系",
    features: "绝对中立、成员地位平等、实验室称'花园'、成员称'园丁'以花名代称",
    knownMembers: "亚契·谜思（炼金术师）、荆千棘（助手）",
    location: "总部位于西陆联盟、渊和赤星交界的沙漠绿洲中",
    source: "伪人大本营"
  },
  {
    name: "ABSC",
    alias: "Albert Interdimensional Survey Committee",
    description: "艾尔伯特里界调查委员会，专业情报搜集机构，分享里界资料",
    duties: "搜集调查整理里界资料、通过 IRASP 分享给其他组织",
    features: "总部位于 SAFE 级里界内、专业情报机构、创始人已故",
    knownMembers: "艾尔伯特·帕拉索（创始人，已故）、斯汀先生（职员）",
    location: "总部西陆联盟",
    source: "表界地名与组织"
  },
  {
    name: "槐安公寓",
    alias: "Huai'an Apartments",
    description: "渊境内最大伪人聚落，官方设立的伪人住宿/社会化教育机构，里界最大出入口所在地",
    duties: "伪人住宿管理、社会化教育、督察伪人适应情况",
    features: "住户身份神秘、空间结构异常、里界出入口、营长是楼长",
    knownMembers: "营长（楼长）、化而为、西瓜人、X、亚契·谜思等多位神秘住户",
    location: "渊境内",
    source: "伪人大本营"
  },
  {
    name: "非常电影院",
    alias: "Extraordinary Cinema",
    description: "渊境内最大'哨站'，兼具伪人生活与委托处理的综合机构",
    duties: "提供伪人生活服务、交付人类特殊委托给伪人、放映里界影像",
    features: "哨站的一种、面向伪人和人类两界、信息交换灰色地带",
    knownMembers: "非常玦蝶（站长）、单先生（院长）、虫者（售票员/放映员）、长喙（说书人）",
    location: "渊境内，最大出入口公寓附近",
    source: "表界地名与组织"
  },
  {
    name: "灯塔",
    alias: "The Lighthouse",
    description: "由公寓组建、各国承认的伪人教育组织，帮助伪人融入人类社会",
    duties: "教授伪人化形、控制能力、使用四肢等课程",
    features: "分六个年级（伪人/半伪人/半智人/智人/半人/人）、有定级考试、引导员运送学生",
    knownMembers: "桃金娘姐妹（校长）",
    location: "只在渊以及赤星设有校区",
    source: "伪人大本营"
  },
  {
    name: "教廷",
    alias: "The Papal Court",
    description: "存在于西陆联盟的特殊机构，服务于西陆联盟的宗教，协调不同伪神派系关系",
    duties: "协调伪神派系、维护伪神派系秩序、监督审查各派系",
    features: "中立机构、现代已转变为协调机构、确保派系遵纪守法",
    knownMembers: "未知",
    location: "西陆联盟",
    source: "西陆联盟"
  },
  {
    name: "茶居公寓",
    alias: "Tea Residence",
    description: "位于渊南部湾龙市的伪人聚落，二楼茶餐厅，一楼不住人，共 9 层",
    duties: "提供住宿、水电管理、魑魅管理、社会化教育",
    features: "传闻有 -9 楼无人层、表面管水电暗地管魑魅",
    knownMembers: "兔仙（楼长）",
    location: "渊南部湾龙市",
    source: "表界地名与组织"
  },
  {
    name: "花园餐厅 INFUSION",
    alias: "Garden Restaurant INFUSION",
    description: "由亚契·谜思开设的哨站，提供餐饮、栽培、宠物等多项服务",
    duties: "提供餐饮服务、栽培植物、宠物服务、博物馆性质陈列",
    features: "绿洲分部之一、陈列个人藏品、蒸汽朋克风格",
    knownMembers: "亚契·谜思、荆千棘",
    location: "渊",
    source: "表界地名与组织"
  },
  {
    name: "黎守治安警署（分部）",
    alias: "Dawn Guard Police Station (Branch)",
    description: "靠近槐安公寓社区的黎守警署，主要由一个四人小队负责管理",
    duties: "治安管理、伪人事务处理",
    features: "四人小队编制、靠近槐安公寓",
    knownMembers: "未知",
    location: "渊，槐安公寓附近",
    source: "表界地名与组织"
  },
  {
    name: "天风阁",
    alias: "Tianfeng Pavilion",
    description: "位于渊南部某城市湖边的居民楼，实际上是连接里界的中转站",
    duties: "里界中转、秘密合作工作",
    features: "安全等级 SAFE、天台有凉亭和微型中式花园、地下室通往槐安公寓",
    knownMembers: "春山抚子（首席执事兼看板娘）",
    location: "渊南部某城市湖边",
    source: "表界地名与组织"
  },
  {
    name: "手与剑之乡",
    alias: "Land of Hand and Sword",
    description: "西陆某小城镇的地下组织，收集汉兹安索德相关典故的信徒组建",
    duties: "为信奉汉兹安索德的人提供安身之处、期待唤醒汉兹安索德",
    features: "表面是铁匠铺/西餐厅、不强迫不排外、转为暗中行动",
    knownMembers: "多位信徒",
    location: "西陆某小城镇",
    source: "表界地名与组织"
  },
  {
    name: "静谧织命者",
    alias: "Silent Fate Weavers",
    description: "西陆联盟历史悠久的派系，由三位伪神结盟共同巩固势力",
    duties: "支配势力范围、巩固同盟势力",
    features: "三位伪神性格各异但不妨碍共事、影响力可观",
    knownMembers: "安布罗斯、约斯密特、卡芙涅",
    location: "西陆联盟",
    source: "西陆联盟派系",
    faction: true
  },
  {
    name: "圣使教",
    alias: "Holy Envoy Church",
    description: "西陆新兴派系，历史很短，以奇迹为理念",
    duties: "传播奇迹、赐予信徒奇迹",
    features: "艾尔伯特为第二代圣使、奇迹平等赐予忠实信徒",
    knownMembers: "艾尔伯特（第二代圣使）、AT（奇迹伪神）",
    location: "西陆联盟",
    source: "西陆联盟派系",
    faction: true
  },
  {
    name: "梦之圣庭",
    alias: "Dream Sanctuary",
    description: "与梦境有关的特别派系，维拉莉娅会潜入人们梦境窥探欲望或恐惧",
    duties: "窥探梦境、使人们在梦境中提前体验欲望或恐惧",
    features: "危险而扭曲的共生关系、关于伪装与共鸣的神话",
    knownMembers: "维拉莉娅（派系首领）",
    location: "西陆联盟",
    source: "西陆联盟派系",
    faction: true
  },
  {
    name: "济世者",
    alias: "World Saviors",
    description: "以慈悲救济为理念的派系，由伪神福音领导",
    duties: "慈悲救济、安抚民众情绪、外交",
    features: "福音带来幸福、母爱具象化",
    knownMembers: "Evangelium.福音（派系首领）",
    location: "西陆和赤星边境线",
    source: "西陆联盟派系",
    faction: true
  }
];

// ==================== 地区数据 ====================
window.LORE_REGIONS = [
  // === 表界地区 ===
  {
    name: "渊",
    alias: "The Abyss",
    type: "表界",
    description: "表界核心区域，伪人渗透最深的区域之一，里界最大出入口所在地",
    features: "科技发达、人口密集、异常事件频发但被官方管控掩盖、伪人现象复杂、中式现代风格",
    knownLocations: "槐安公寓、黎守调查局总部、各大城市、非常电影院、天风阁",
    notes: "表面平静的现代社会，暗流涌动，伪人聚落集中",
    source: "表界地名与组织"
  },
  {
    name: "西陆联盟",
    alias: "Western Continent Alliance",
    type: "表界",
    description: "政教合一的联邦体制，教皇与议会共同执政，魔法与科技并存",
    features: "宗教西幻风格、魔导技术发达、对伪人采取信仰供奉态度、认证八位伪神",
    knownLocations: "教廷、西陆伪神教派、圣使教、梦之圣庭、静谧织命者、济世者",
    notes: "伪神信仰盛行，强大伪人被视作神明供奉",
    source: "表界地名与组织"
  },
  {
    name: "赤红新星",
    alias: "Crimson New Star",
    type: "表界",
    description: "社会主义国家，强调集体主义与人民至上，计划经济与配给制度",
    features: "社会福利完善、对伪人采取研究 - 整合政策、设立伪人研究院、定义为特殊人类变体",
    knownLocations: "伪人研究院、配给站、集体社区",
    notes: "官方宣传将伪人纳入科学整合范畴，与渊保持深度战略合作",
    source: "表界地名与组织"
  },
  {
    name: "渊东共和国",
    alias: "Abyss East Republic",
    type: "表界",
    description: "从渊分裂出来的军事独裁政权，群岛国家，以航运和轻工业见长",
    features: "全民兵役制（16 岁以上必须服役）、严格边境管控与身份核查、对伪人态度平和",
    knownLocations: "边境检查站、军事基地、渊合作项目区",
    notes: "与渊是合作伙伴关系，是重要的节点和中转站",
    source: "表界地名与组织"
  },
  {
    name: "湾龙市",
    alias: "Wanlong City",
    type: "表界",
    description: "渊南部的城市，茶居公寓所在地",
    features: "茶居公寓位于此地",
    knownLocations: "茶居公寓",
    notes: "渊南部城市",
    source: "表界地名与组织"
  },
  
  // === 里界地区 ===
  {
    name: "表界/里界",
    alias: "Surface/Deep Realm",
    type: "维度",
    description: "表界是人类世界，里界是伪人与异常的领域，两界通过【门】连接",
    features: "表界正常物理法则，里界规则扭曲、时空异常，【门】出现在空间交界处（门窗、抽屉、显示屏等）",
    knownLocations: "表界：各大城市；里界：白墟之地、错位花园、疫病区等",
    notes: "重叠维度，通过【门】连接，非简单边界",
    source: "世界观"
  },
  {
    name: "人监",
    alias: "Organ Prison",
    type: "里界",
    description: "一个器官监狱风格的里界，营长、特洛菲&洛洛的来源",
    features: "器官监狱风格",
    knownLocations: "未知",
    notes: "营长、特洛菲&洛洛的来源地",
    source: "里界档案"
  },
  {
    name: "错位花园",
    alias: "Displaced Garden",
    type: "里界",
    description: "一个植物实验室风格的里界，亚契·谜思、赫卡忒、荆千棘的来源",
    features: "植物实验室风格",
    knownLocations: "未知",
    notes: "亚契·谜思、赫卡忒、荆千棘的来源地",
    source: "里界档案"
  },
  {
    name: "疫病区",
    alias: "Plague Zone",
    type: "里界",
    description: "【瘟疫】的里界，几乎任何物质投入其中都可能会发生【病变】",
    features: "死寂荒野、建筑废墟、物质投入会发生病变、可成为伪物载体",
    knownLocations: "未知",
    notes: "危险等级🟧CAUTION，【医生？】对此里界有极大支配权",
    source: "里界档案"
  },
  {
    name: "风暴海",
    alias: "Storm Sea",
    type: "里界",
    description: "与现实世界公海存在低概率空间连接点的海域，【渔夫】的栖息地",
    features: "无海岸线岛屿、恒定暴雨、极端寂静、存在畸形海洋生物",
    knownLocations: "与现实公海连接点",
    notes: "人类船只可通过空间跃迁进入，【渔夫】会将友好者送出",
    source: "里界档案"
  },
  {
    name: "童话国",
    alias: "Fairy Tale Kingdom",
    type: "里界",
    description: "不属于这个世界的地方，包含很多大大小小的王国",
    features: "多个王国组成（伊克罗、撒迪兰、神奇动物王国等）",
    knownLocations: "伊克罗、撒迪兰、大森林",
    notes: "由'好心肠先生'口述整合",
    source: "里界档案"
  },
  {
    name: "心湖",
    alias: "Heart Lake / Sea of Time",
    type: "里界",
    description: "人类集体潜意识深处的梦境之域，由童年纯粹情感凝聚而成的能量之海",
    features: "液态月光般光泽、淡金色太阳、编钟清响、春芽游弋、苦情树",
    knownLocations: "湖中心绿岛、苦情树",
    notes: "春芽可带走负面情绪，苦情树收纳淡淡遗憾",
    source: "里界档案"
  },
  {
    name: "随心",
    alias: "Whimsy",
    type: "里界",
    description: "数量未知的'史莱姆'群居的高可塑性里界，化而为的来源",
    features: "高可塑性、史莱姆群居",
    knownLocations: "未知",
    notes: "化而为的来源地",
    source: "里界档案"
  },
  {
    name: "永远的家",
    alias: "Eternal Home",
    type: "里界",
    description: "AT 的专属里界，先前是艾尔伯特·帕拉索的自尽之地，后被 AT 用奇迹改造",
    features: "一望无际金黄麦田、西陆经典风格三层房屋、空气中弥漫治愈奇迹",
    knownLocations: "麦田、三层房屋、黑橡树林（坐标约 -50000, -130000）",
    notes: "安全等级 Safe，奇迹对伤口有治愈作用但无法复活死者",
    source: "里界档案"
  },
  {
    name: "白墟之地",
    alias: "White Ruins",
    type: "里界",
    description: "因规则污染形成的持续扩张纯白地貌，古代巴比伦文明被规则反噬后的废墟",
    features: "HAZARD 级风险、每日扩张 1.7 米、规则事故现场、信息态结构复杂",
    knownLocations: "浮城、永寂之湖、巨龙坟墓、边境带",
    notes: "Cipher 是其勘测者与规则研究者",
    source: "里界档案"
  },
  {
    name: "黑海",
    alias: "The Black Sea",
    type: "里界",
    description: "资料被赤红新星严密把控的神秘里界，魇龍伪人的来源",
    features: "等级未知、漆黑一片但不能被黑色形容、不可化解之核",
    knownLocations: "赤星境内中西伯利亚省北地群岛的北极角附近（'极光'-10 科考站）",
    notes: "档案 BSHZ17.3，记录已损坏",
    source: "里界档案"
  },
  {
    name: "第 x 号医院",
    alias: "Hospital No.X",
    type: "里界",
    description: "X（生骸·X）的专属里界",
    features: "未知",
    knownLocations: "未知",
    notes: "X 的原栖息地",
    source: "里界档案"
  },
  {
    name: "骰子回廊",
    alias: "Dice Corridor",
    type: "里界",
    description: "来源未知的里界",
    features: "未知",
    knownLocations: "未知",
    notes: "来源：？？？",
    source: "里界档案"
  },
  {
    name: "巢穴",
    alias: "The Nest",
    type: "里界",
    description: "多虫、拟人蝎等种群的来源地",
    features: "未知",
    knownLocations: "未知",
    notes: "多虫、拟人蝎的来源",
    source: "伪人档案"
  },
  {
    name: "怪原",
    alias: "Monster Origin",
    type: "里界",
    description: "人魈种群的来源地",
    features: "未知",
    knownLocations: "未知",
    notes: "人魈的来源",
    source: "伪人档案"
  },
  {
    name: "若迷界",
    alias: "Ruomi Realm",
    type: "里界",
    description: "非常玦蝶的来源地",
    features: "未知",
    knownLocations: "未知",
    notes: "非常玦蝶是来自若迷界的幸存者",
    source: "伪人档案"
  },
  {
    name: "白卷",
    alias: "White Scroll",
    type: "里界",
    description: "涂改的来源里界，一个只有白色、没有任何内容的焦虑空间",
    features: "只有白色、无内容、以人类焦虑为主要熵减能量",
    knownLocations: "未知",
    notes: "涂改用抹平和消解来解决一切焦虑",
    source: "伪人档案"
  }
];

// ==================== 角色数据 ====================
window.LORE_CHARACTERS = [
  // === 来自伪人档案 ===
  {
    name: "营长",
    alias: "Captain/安诺涅/楼长",
    description: "伪人论坛《伪人大本营》管理者，槐安公寓楼长，负责督察进入现实的伪人适应情况，兼职清劣者",
    role: "论坛管理者/公寓楼长/清劣者",
    features: "真名不详，官方成员，管理最大出入口公寓，有很多眼睛，疑似来自【人监】",
    knownAssociates: "非常玦蝶（助手/二营长）、斯汀先生、灼玥",
    status: "活跃",
    location: "渊/槐安公寓",
    source: "伪人档案"
  },
  {
    name: "非常玦蝶",
    alias: "二营长",
    description: "渊境内最大'哨站'站长，非常电影院站长，伪人论坛二营长，营长的得力助手，渊境内顶尖清劣者",
    role: "哨站站长/电影院站长/清劣者",
    features: "来自【若迷界】的幸存者，营长的得力助手，管理非常电影院和哨站",
    knownAssociates: "营长（上级）、单先生、长喙",
    status: "活跃",
    location: "渊/非常电影院",
    source: "伪人档案"
  },
  {
    name: "化而为",
    alias: "Hua Er Wei",
    description: "由蓝白色'史莱姆'状生命变化而来的白发红瞳少女，可随时变成任何模样",
    role: "槐安公寓居民",
    features: "蓝白色史莱姆形态，可变形为少女，白发红瞳，极强可塑性，可分解为分子大小穿越阻挡物",
    knownAssociates: "槐安公寓",
    status: "活跃",
    location: "渊/槐安公寓 302 室",
    source: "伪人档案"
  },
  {
    name: "温塔莎·克林斯曼",
    alias: "Ventsa Klinsmann/基质 -0",
    description: "'拟态'为人类的'基质 -0'聚合体，本质是一团变化不定的黑色流体",
    role: "行踪不明",
    features: "1.9m 以上高大女性，紫黑色风衣，苍白皮肤，左眼流出黑色液体，本体为 84 米龙型巨兽",
    knownAssociates: "暂无所属",
    status: "行踪不明",
    location: "未知",
    source: "伪人档案"
  },
  {
    name: "独允",
    alias: "Duyun",
    description: "渊官方自研数据网络核心 AI，方舟数据网智能 AI 大模型",
    role: "AI/数据网络核心",
    features: "本体为液态金属与光导纤维构成的半透明球状，投影为铜发红眼少女，机械体身高 156cm",
    knownAssociates: "渊官方、方舟数据网",
    status: "活跃",
    location: "渊",
    source: "伪人档案"
  },
  {
    name: "西瓜人",
    alias: "Watermelon Man",
    description: "4580 岁古老存在，执念成为人类，赠予西瓜汁，西瓜公司董事长",
    role: "槐安公寓居民/企业家",
    features: "西瓜外形，4580 岁，渴望成为人类，已开到全世界第三的西瓜公司",
    knownAssociates: "槐安公寓",
    status: "活跃",
    location: "渊/槐安公寓 606 室",
    source: "伪人档案"
  },
  {
    name: "X",
    alias: "生骸·X/093",
    description: "神秘小孩，'生命'概念的人格化，核心能力为'嬗变'",
    role: "槐安公寓居民",
    features: "幼年男性，白发红瞳，右眼覆绷带，全身缝合痕迹，能力为微观粒子级重构",
    knownAssociates: "槐安公寓",
    status: "收容",
    location: "渊/槐安公寓后巷共生花坛",
    dangerLevel: "🟧DANGER",
    source: "伪人档案"
  },
  {
    name: "亚契·谜思",
    alias: "ArcheMist/茉莉",
    description: "非人形存在，黄铜零件与植物复合物，炼金术师，绿洲外派员工",
    role: "炼金术师/研究员",
    features: "黄铜零件与植物构成的复合体，非人形，擅长激发植物潜在意识创造智能生命体",
    knownAssociates: "咔哒小姐、赫卡忒（创造）、荆千棘（助手）",
    status: "活跃",
    location: "绿洲/花园餐厅 INFUSION/槐安公寓",
    dangerLevel: "🟨CAUTION",
    source: "伪人档案"
  },
  {
    name: "咔哒小姐",
    alias: "Miss Click",
    description: "亚契·谜思在人类面前使用的外表示人",
    role: "亚契的人类形态",
    features: "亚契·谜思的人类伪装形态",
    knownAssociates: "亚契·谜思",
    status: "活跃",
    location: "花园餐厅 INFUSION",
    source: "伪人档案"
  },
  {
    name: "荆千棘",
    alias: "Thorns For Me/蔷薇",
    description: "亚契·谜思的助手，本体为蔷薇科植物",
    role: "助手/研究员",
    features: "包含蔷薇藤、黑色模特假人、LED 屏幕、泥土等的人形集合，通过 LED 屏幕交流",
    knownAssociates: "亚契·谜思",
    status: "活跃",
    location: "绿洲/花园餐厅 INFUSION/槐安公寓",
    dangerLevel: "🟩SAFE",
    source: "伪人档案"
  },
  {
    name: "赫卡忒",
    alias: "Hecate",
    description: "亚契创造的仿生人，炭黑色皮肤，蓝色水晶头发",
    role: "仿生人/槐安公寓居民",
    features: "炭黑色皮肤，蓝色水晶状头发，四手臂，无眼但有视觉，携带'锁与钥'",
    knownAssociates: "亚契·谜思（创造者）",
    status: "活跃",
    location: "槐安公寓",
    dangerLevel: "🟩SAFE",
    source: "伪人档案"
  },
  {
    name: "特洛菲&洛洛",
    alias: "Trophy & Lolo",
    description: "人监之口，由'口'特化而来的异种，食量惊人",
    role: "异种/槐安公寓居民",
    features: "特洛菲肚子有真正嘴巴，可分泌强酸性物质；洛洛是黑色蟒蛇状怪物，共享循环系统",
    knownAssociates: "人监、槐安公寓、营长",
    status: "活跃",
    location: "人监/槐安公寓",
    source: "伪人档案"
  },
  {
    name: "医生",
    alias: "瘟疫病主/医生？",
    description: "来历不明的古老伪人，形象与欧洲中世纪瘟疫医生极为接近",
    role: "槐安公寓居民",
    features: "瘟疫医生装扮，来历神秘，古老存在，与【大瘟疫】事件有密切联系",
    knownAssociates: "疫病区",
    status: "活跃",
    location: "槐安公寓/疫病区",
    source: "伪人档案"
  },
  {
    name: "多虫",
    alias: "Multi-Worm",
    description: "诞生于里界'巢穴'的非人生物种群，对人类及其他种族伪人均抱有明显敌意",
    role: "敌对种群",
    features: "米粒大小棕褐色小虫，近似蜈蚣和蟑螂结合体，存在虫母与子虫的附属联系",
    knownAssociates: "巢穴",
    status: "敌对",
    location: "巢穴/表界广泛分布",
    source: "伪人档案"
  },
  {
    name: "人魈",
    alias: "Human Demon",
    description: "诞生于里界'怪原'的非人种群，对人类及其他种族伪人均抱有明显敌意",
    role: "敌对种群",
    features: "人形但具明显非人特征：灰白色皮肤、长短失调四肢、扭曲五官，穿戴粗布照袍",
    knownAssociates: "怪原",
    status: "敌对",
    location: "怪原/表界广泛分布",
    source: "伪人档案"
  },
  {
    name: "凝胶",
    alias: "Gel",
    description: "诞生于里界'随心'的非人种群，凝胶状球型生物",
    role: "敌对种群",
    features: "凝胶状球型，可变化人形，身体可塑性强，有腐蚀性，体内有核",
    knownAssociates: "随心",
    status: "敌对",
    location: "随心/表界较少分布",
    source: "伪人档案"
  },
  {
    name: "汐&涟",
    alias: "Xi & Lian",
    description: "鲛人双子，出没于渊附近海域，歌声特殊",
    role: "鲛人种群",
    features: "汐是妹妹（蓝发蓝眼，好奇心强）；涟是姐姐（青发橙眼，谨慎，织鲛绡手艺一流）",
    knownAssociates: "渊附近海域",
    status: "活跃",
    location: "渊附近海域",
    source: "伪人档案"
  },
  {
    name: "渔夫",
    alias: "圣地亚哥·梅尔维尔/Santiago Melville/利维坦",
    description: "2.2 米渔夫形象，穿雨衣，栖息于风暴海",
    role: "利维坦",
    features: "身高 2.2 米，深蓝色雨衣，面部漆黑不可见，携带鱼叉枪和巨型猎鱼矛",
    knownAssociates: "风暴海、利维坦号",
    status: "活跃",
    location: "风暴海",
    source: "伪人档案"
  },
  {
    name: "拟人蝎",
    alias: "Anthro-Scorpion",
    description: "里界'巢穴'来源，仅雌性，独居生物",
    role: "里界原生种群",
    features: "人类少女外观，四臂结构（下臂人手、上臂螯足），蝎尾长 2.3 米含神经毒素",
    knownAssociates: "巢穴",
    status: "活跃",
    location: "巢穴/表界极少分布",
    dangerLevel: "橙色",
    source: "伪人档案"
  },
  {
    name: "深破",
    alias: "我深深的破碎/My Deep Broken",
    description: "由无数方块构成的女孩，常漫无目的游荡",
    role: "异常个体",
    features: "身体由无数方块构成，绝对穿透性，免疫物理伤害，常低语'失其路，失其度，失其处'",
    knownAssociates: "未知",
    status: "活跃",
    location: "街头/槐安公寓 101 室",
    dangerLevel: "🟩SAFE",
    source: "伪人档案"
  },
  {
    name: "希庇安",
    alias: "Ιππότης/Hippotes",
    description: "神裔，与安布罗斯一同出现，最坚定的信徒",
    role: "神裔/禁卫",
    features: "希腊语名意为'骑士'，平时以骑士身份示人，受威胁时展露攻击形态",
    knownAssociates: "安布罗斯（主神）",
    status: "活跃",
    location: "西陆联盟",
    dangerLevel: "🟨CAUTION/🟧DANGER(攻击状态)",
    source: "伪人档案"
  },
  {
    name: "安布罗斯",
    alias: "Αθάνατο/Ambrose",
    description: "古老伪神，中世纪时期已有目击记录，被西陆联盟视为神裔",
    role: "伪神/神裔",
    features: "被视作神明/天使般存在，说话如神明高高在上，模仿人类情感但不真正理解",
    knownAssociates: "希庇安（信徒）、福音",
    status: "活跃",
    location: "西陆联盟",
    dangerLevel: "🟨CAUTION",
    source: "伪人档案"
  },
  {
    name: "无名卿",
    alias: "Nameless One/因法勒",
    description: "外来者，沉默寡言，声音清冷",
    role: "外来者",
    features: "常态下蓝色花朵盛开，混乱状态下眼睛四处搜寻，喜欢果茶和毛茸茸",
    knownAssociates: "xxx（联系人）",
    status: "活跃",
    location: "槐安公寓",
    source: "伪人档案"
  },
  {
    name: "伊露",
    alias: "Yilu",
    description: "无感情，喜欢学习人类的伪人，制作表情面具",
    role: "面具制作者",
    features: "无感情表达，擅长制作表情面具，游走人间剥夺人类表情",
    knownAssociates: "公寓",
    status: "活跃",
    location: "公寓",
    source: "伪人档案"
  },
  {
    name: "春山抚子",
    alias: "伪抚/False Nadeshiko",
    description: "本体为美短虎斑猫，居于天风阁，模仿人类",
    role: "伪人/模仿者/首席执事",
    features: "本体为美短虎斑猫，居于天风阁，模仿人类行为，保留猫咪习性",
    knownAssociates: "天风阁、茸白",
    status: "活跃",
    location: "天风阁",
    source: "伪人档案"
  },
  {
    name: "小赤帽",
    alias: "Little Red Cap/赤",
    description: "狼影赤帽，槐安公寓 609 住户，负责卫生清洁",
    role: "公寓住户/清洁工",
    features: "狼影赤帽身份，破旧红斗篷，扭曲狼形影，白人偶灰狼尾",
    knownAssociates: "槐安公寓",
    status: "活跃",
    location: "渊/槐安公寓 609 室",
    source: "伪人档案"
  },
  {
    name: "虫者",
    alias: "林虫/翡影",
    description: "非常电影院售票员/放映员，喜欢看电影的虫子",
    role: "售票员/放映员",
    features: "虫子形态，热爱电影，外貌伪装完美但行为有虫性习惯残留",
    knownAssociates: "非常电影院、单先生、长喙",
    status: "活跃",
    location: "渊/非常电影院",
    source: "伪人档案"
  },
  {
    name: "单先生",
    alias: "Mr. Shan",
    description: "非常电影院院长，算命先生，闲云野鹤",
    role: "电影院院长/算命先生",
    features: "性别未知，姓名未知，世人只知姓单，为还二营长因果帮忙经营电影院",
    knownAssociates: "非常玦蝶（二营长）、长喙、虫者",
    status: "活跃",
    location: "渊/非常电影院",
    source: "伪人档案"
  },
  {
    name: "笑颜",
    alias: "嬉皮笑脸人偶",
    description: "槐安公寓 909 住户，嬉皮笑脸的人偶",
    role: "公寓住户",
    features: "人偶形态，总是嬉皮笑脸，会做恶作剧骚扰其他客人",
    knownAssociates: "槐安公寓",
    status: "活跃",
    location: "渊/槐安公寓 909 室",
    source: "伪人档案"
  },
  {
    name: "陆玖",
    alias: "多面孔",
    description: "5003 室住户，拥有多面孔多性格",
    role: "公寓住户",
    features: "多面孔多性格，伪人特征十分不稳定，真实面貌无法知晓",
    knownAssociates: "槐安公寓 5003 室",
    status: "活跃",
    location: "渊/槐安公寓 5003 室",
    source: "伪人档案"
  },
  {
    name: "长喙",
    alias: "瀚羽",
    description: "鹰伪人，说书人，追随非常玦蝶",
    role: "说书人",
    features: "鹰形态伪人，说书技艺高超，改造'长喙茶馆'于里界",
    knownAssociates: "非常玦蝶、非常电影院、单先生、鸿蒙",
    status: "活跃",
    location: "自由/非常电影院",
    source: "伪人档案"
  },
  {
    name: "AT",
    alias: "Albert Palazzo/奇迹伪神",
    description: "奇迹伪神，西廷圣使教成员，艾尔伯特·帕拉索的身体复活后产生的新意识",
    role: "伪神/圣使",
    features: "蛇尾，黑色头纱，淡紫掺红发色，龙爪，紫色龙角，巨大龙翅膀，双眼紧闭",
    knownAssociates: "西廷圣使教、艾尔伯特·帕拉索（视为'女儿'）",
    status: "活跃",
    location: "西陆/ABSC（？）/永远的家",
    source: "伪人档案"
  },
  {
    name: "墨水夜",
    alias: "Ink Night",
    description: "槐安公寓水池中的存在，水做的，食物是史莱姆",
    role: "公寓住户",
    features: "水体形态，以史莱姆为食，喜欢泡在水里，很少说话",
    knownAssociates: "槐安公寓水池、冷寂",
    status: "活跃",
    location: "槐安公寓水池",
    source: "伪人档案"
  },
  {
    name: "冷寂",
    alias: "Cold Silence",
    description: "上古存在，呆傻，实力未知",
    role: "上古存在",
    features: "呆傻外表，实力深不可测，身形小，静静注视人类生活",
    knownAssociates: "墨水夜、海域",
    status: "活跃",
    location: "自由/海域",
    source: "伪人档案"
  },
  {
    name: "石测",
    alias: "Shi Ce",
    description: "渊成员，喜欢吃石头，吓唬小孩",
    role: "渊成员",
    features: "嗜石，喜欢吓唬小孩，平常戴口罩融入人类生活打工",
    knownAssociates: "渊",
    status: "活跃",
    location: "渊",
    source: "伪人档案"
  },
  {
    name: "大夜夜",
    alias: "Dark Night/夜幕高定主人",
    description: "阴暗邪恶，夜幕高定主人，做高定服装",
    role: "服装设计师",
    features: "阴暗邪恶，高定服装大师，异次元衣柜联通 NORMAL 级里界",
    knownAssociates: "夜幕高定",
    status: "活跃",
    location: "槐安公寓 808 室",
    source: "伪人档案"
  },
  {
    name: "伽纳罗丝",
    alias: "Ganaros",
    description: "神秘生物，本质是猩红色血液，可吸收血液强化",
    role: "神秘生物",
    features: "拟态为长赤色角与龙尾的美丽女性，性别随拟态而定，物理攻击无效",
    knownAssociates: "槐安公寓",
    status: "活跃",
    location: "槐安公寓 904 室",
    source: "伪人档案"
  },
  {
    name: "福音",
    alias: "Evangelium/西陆伪神",
    description: "西陆伪神，女性，人类对母亲幻想及母爱的具象化",
    role: "伪神/济世者首领",
    features: "人身、鹿角、耳羽、人腿、鱼尾组成，162cm~203cm，带来幸福",
    knownAssociates: "西陆、安布罗斯、艾尔伯特·帕拉索、济世者",
    status: "活跃",
    location: "西陆联盟 - 西陆伪神/西陆和赤星边境",
    source: "伪人档案"
  },
  {
    name: "涂改",
    alias: "Tipp-Ex/完美主义者",
    description: "槐安公寓 209 住户，完美主义者，消除错误字迹",
    role: "公寓住户",
    features: "13-14 岁人类少年外表，石膏质感苍白肤色，能力'归白'可抹除物体",
    knownAssociates: "槐安公寓 209 室",
    status: "活跃",
    location: "槐安公寓 209 室",
    source: "伪人档案"
  },
  {
    name: "阿秋",
    alias: "Ah Qiu",
    description: "12 岁，人监，渴望被认可",
    role: "人监",
    features: "12 岁，身高 142cm，能力'气息图书馆'可储存调取气味记忆",
    knownAssociates: "人监、特洛菲和洛洛",
    status: "活跃",
    location: "人监",
    source: "伪人档案"
  },
  {
    name: "鸿",
    alias: "Hong",
    description: "114514 岁，编辑/记者，热情洋溢",
    role: "编辑/记者",
    features: "114514 岁，身高 168cm，能力'门'可通往任意地方，嗜苦",
    knownAssociates: "鸿的报社",
    status: "活跃",
    location: "自由/鸿的报社",
    source: "伪人档案"
  },
  {
    name: "梦城寺绫希",
    alias: "Mushiroji Ayaki",
    description: "无性，不属于这个世界的气息",
    role: "神秘存在",
    features: "无性，银色长发蓝色内层挑染，红蓝异瞳，蝙蝠翅膀，防毒面具，巫师帽",
    knownAssociates: "未知",
    status: "活跃",
    location: "？？？/里界",
    source: "伪人档案"
  },
  {
    name: "云蓝",
    alias: "Yun Lan",
    description: "大雪纷飞的女孩，手偶",
    role: "神秘存在",
    features: "与雪相关，手偶形态，有悲惨过去，曾同时用三种声线说话",
    knownAssociates: "未知",
    status: "活跃",
    location: "槐安公寓",
    source: "伪人档案"
  },
  {
    name: "约斯米特",
    alias: "Joschmitt/傀儡师",
    description: "西陆伪神之一，制作傀儡，通过傀儡眼睛窥探学习世间",
    role: "伪神/傀儡师",
    features: "白色长发、白色骨角、一金眼一被白玫瑰覆盖眼、蝴蝶发饰、白色羽毛翅膀",
    knownAssociates: "静谧织命者、Josselin（傀儡）",
    status: "活跃",
    location: "西方大陆/西陆伪神/静谧织命者",
    dangerLevel: "🟨CAUTION",
    source: "伪人档案"
  },
  {
    name: "瓦莉奥尔·阿亚奇",
    alias: "Walior·Ayaki",
    description: "来历不明的存在，西陆伪神之一，自称'平和的战斗者'",
    role: "伪神/战斗者",
    features: "银色长发，红白异瞳，金框单片眼镜，白色军装，头顶不稳定光环，158cm/316cm 可变",
    knownAssociates: "梦城寺绫希",
    status: "活跃",
    location: "西陆伪神",
    dangerLevel: "🟨CAUTION",
    source: "伪人档案"
  },
  {
    name: "折纸簌鸟",
    alias: "鸟姐",
    description: "鸟姐大排档老板，在表界活跃两百年之久",
    role: "大排档老板/哨站经营者",
    features: "年轻女孩外表，三倍于正常人身体素质，可创造 5 个纸鸟分身",
    knownAssociates: "鸟姐大排档",
    status: "活跃",
    location: "渊/哨站 - 鸟姐大排档",
    source: "伪人档案"
  },
  {
    name: "红缇香",
    alias: "Hong Ti Xiang",
    description: "清末祝家独女，阴月阴日生，孤鸾入命",
    role: "祝家独女",
    features: "阴月阴日生，孤鸾入命，被配阴婚生葬",
    knownAssociates: "祝家",
    status: "活跃",
    location: "未知",
    source: "伪人档案"
  },
  {
    name: "牺牲",
    alias: "Sacrifice",
    description: "人间名牺牲，古祭之牺，三牲之血",
    role: "祭祀之牺/祭司/屠户",
    features: "以尾椎为权杖，用反舌音倒诵祭文，三刀分解尸体，只用过去式交谈",
    knownAssociates: "未知",
    status: "活跃",
    location: "未知",
    source: "伪人档案"
  },
  {
    name: "兔仙",
    alias: "Rabbit Immortal",
    description: "茶居公寓楼长，表面管水电，暗地管魑魅",
    role: "公寓楼长",
    features: "赤瞳、白发、冷白肤，社恐昼/话痨夜，守规矩",
    knownAssociates: "茶居公寓",
    status: "活跃",
    location: "茶居公寓",
    source: "伪人档案"
  },
  {
    name: "Эдельвейс",
    alias: "Edelweiss/绝密档案",
    description: "绝密档案，国家应急管理部常务副秘书长兼执行副部长",
    role: "国家应急管理部官员",
    features: "68 岁，168cm，男性伪人，主管全国重大灾害应急预案",
    knownAssociates: "国家应急管理部、赤红新星",
    status: "活跃",
    location: "赤红新星",
    source: "伪人档案"
  },
  {
    name: "Cipher",
    alias: "RSW-07 月蚀鸢尾",
    description: "白墟之地勘测者，规则研究者",
    role: "勘测者/研究者",
    features: "无性，专注于白墟之地勘测，记录每日 1.7 米扩张轨迹，已失联",
    knownAssociates: "白墟之地、古代巴比伦文明、绿洲组织",
    status: "失联",
    location: "白墟之地",
    source: "伪人档案"
  },
  {
    name: "松下·拉尔",
    alias: "Matsushita Lar",
    description: "槐安公寓住户，女，143cm，猫娘",
    role: "公寓住户",
    features: "女性，143cm，42kg，白色猫耳猫尾，白色连衣裙，温和是好猫",
    knownAssociates: "槐安公寓",
    status: "活跃",
    location: "槐安公寓",
    dangerLevel: "SAFE",
    source: "伪人档案"
  },
  {
    name: "江安",
    alias: "Jiang An",
    description: "治愈者，能力是剥夺情绪感知",
    role: "治愈者",
    features: "温和安静，能力'从前我死去的家'可抚平痛觉但实为剥夺感知",
    knownAssociates: "槐安公寓",
    status: "活跃",
    location: "槐安公寓",
    dangerLevel: "🟨CAUTION",
    source: "伪人档案"
  },
  {
    name: "C.",
    alias: "C",
    description: "槐安公寓 229 住户，说话书面化",
    role: "公寓住户",
    features: "说话书面化，极少口语，本体夜晚出现，喻体白天出现，白化病外表",
    knownAssociates: "槐安公寓 229 室",
    status: "活跃",
    location: "槐安公寓 229 室",
    source: "伪人档案"
  },
  
  // === 来自人物档案 ===
  {
    name: "烛灯",
    alias: "Candle",
    description: "'揭秘人'组织最后成员，论坛遗产如烛火般照亮人类",
    role: "揭秘人/信息提供者",
    features: "神秘，发布关键指导帖子后失踪，为踏入伪人领域的人类留下遗产",
    knownAssociates: "揭秘人组织（已解散）",
    status: "失踪",
    location: "未知",
    source: "人物档案"
  },
  {
    name: "绫份",
    alias: "Ling Fen/白夜叉",
    description: "代号'白夜叉'，17 岁格斗术大师，精通绫流体术",
    role: "物理清除专家/格斗大师",
    features: "17 岁，168cm，女性，精通多种流派格斗术，自创绫流体术，异常抗性极高",
    knownAssociates: "槐安公寓",
    status: "活跃",
    location: "槐安公寓/自由",
    weapons: "露（伪物长剑）、凌（普通长剑）",
    source: "人物档案"
  },
  {
    name: "灼玥",
    alias: "Zhuo Yue",
    description: "原方舟科研组小组长，辞职后成为独立调查员",
    role: "独立调查员",
    features: "27 岁金发金瞳男，有勇有谋，使用反叛长剑和静心外衣",
    knownAssociates: "方舟科研组（前）",
    status: "活跃",
    location: "自由",
    weapons: "反叛（伪物金刃长剑）、静心（高韧性外衣）",
    source: "人物档案"
  },
  {
    name: "白桦",
    alias: "Birch",
    description: "对伪课副课长，实力强悍，总是一副睡不醒的样子",
    role: "对伪课副课长",
    features: "速战速决，经常摸鱼睡觉，使用重型长柄锤，没谈过恋爱",
    knownAssociates: "黎守、对伪课",
    status: "活跃",
    location: "黎守/对伪课",
    weapons: "重型长柄锤",
    source: "人物档案"
  },
  {
    name: "斯汀先生",
    alias: "Mr. Sting",
    description: "ABSC 人类职员，与伪人接触最多，年龄超常",
    role: "ABSC 职员/联络人",
    features: "姓氏保密，身体为女性但性别为男，年龄超过正常人类上限",
    knownAssociates: "ABSC、伪人们",
    status: "活跃",
    location: "ABSC",
    source: "人物档案"
  },
  {
    name: "艾尔伯特·帕拉索",
    alias: "Albert Paraso",
    description: "ABSC 创始人，伟大人类先驱，已故，现为灵体旅者",
    role: "创始人/先驱（已故）/灵体旅者",
    features: "温柔善良，发明普罗米修斯提灯，25 岁牺牲，现为灵体状态在各世界游历",
    knownAssociates: "AT（奇迹伪神，视为'女儿'）、福音、ABSC",
    status: "已故（灵体状态）",
    location: "各世界（灵体）",
    source: "人物档案"
  }
];

// ==================== 辅助函数 ====================
// 按名称查找
window.findOrganization = function(name) {
  return window.LORE_ORGANIZATIONS.find(org => 
    org.name === name || 
    org.alias === name || 
    (org.alias && org.alias.includes(name))
  );
};

window.findRegion = function(name) {
  return window.LORE_REGIONS.find(region => 
    region.name === name || 
    region.alias === name ||
    (region.alias && region.alias.includes(name))
  );
};

window.findCharacter = function(name) {
  return window.LORE_CHARACTERS.find(char => 
    char.name === name || 
    char.alias === name ||
    (char.alias && char.alias.includes(name))
  );
};

// 按类型筛选
window.filterOrganizations = function(type) {
  if (type === 'faction') {
    return window.LORE_ORGANIZATIONS.filter(org => org.faction === true);
  }
  return window.LORE_ORGANIZATIONS.filter(org => org.faction !== true);
};

window.filterRegions = function(type) {
  if (!type) return window.LORE_REGIONS;
  return window.LORE_REGIONS.filter(region => region.type === type);
};

window.filterCharacters = function(location) {
  if (!location) return window.LORE_CHARACTERS;
  return window.LORE_CHARACTERS.filter(char => 
    char.location && char.location.includes(location)
  );
};

// 按危险等级筛选
window.filterByDangerLevel = function(level, array) {
  if (!array) return [];
  return array.filter(item => item.dangerLevel === level);
};

// ==================== 特殊链接模式 ====================
// 用于匹配 lore 中的特殊链接
window.SPECIAL_LINK_PATTERNS = [
  // 组织链接
  { pattern: /@org:([^@\s]+)/g, type: 'organization', extract: (match) => match[1] },
  // 地区链接
  { pattern: /@region:([^@\s]+)/g, type: 'region', extract: (match) => match[1] },
  // 角色链接
  { pattern: /@char:([^@\s]+)/g, type: 'character', extract: (match) => match[1] },
  // 通用搜索链接
  { pattern: /@lore:([^@\s]+)/g, type: 'search', extract: (match) => match[1] },
  // 里界链接
  { pattern: /@realm:([^@\s]+)/g, type: 'region', extract: (match) => match[1] },
  // 伪人链接
  { pattern: /@pseudo:([^@\s]+)/g, type: 'character', extract: (match) => match[1] }
];

// 解析文本中的特殊链接
window.parseLoreLinks = function(text) {
  const links = [];
  window.SPECIAL_LINK_PATTERNS.forEach(({ pattern, type, extract }) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const searchTerm = extract(match);
      links.push({ type, searchTerm, original: match[0] });
    }
  });
  return links;
};

// 查找链接对应的数据
window.resolveLoreLink = function(link) {
  const { type, searchTerm } = link;
  switch (type) {
    case 'organization':
      return findOrganization(searchTerm);
    case 'region':
      return findRegion(searchTerm);
    case 'character':
      return findCharacter(searchTerm);
    case 'search':
      // 在所有数据中搜索
      const orgResult = findOrganization(searchTerm);
      if (orgResult) return { type: 'organization', data: orgResult };
      const regionResult = findRegion(searchTerm);
      if (regionResult) return { type: 'region', data: regionResult };
      const charResult = findCharacter(searchTerm);
      if (charResult) return { type: 'character', data: charResult };
      return null;
    default:
      return null;
  }
};

// ==================== 统计信息 ====================
window.LORE_STATS = {
  organizations: window.LORE_ORGANIZATIONS.length,
  regions: window.LORE_REGIONS.length,
  characters: window.LORE_CHARACTERS.length,
  factions: window.LORE_ORGANIZATIONS.filter(org => org.faction === true).length,
  realWorldRegions: window.LORE_REGIONS.filter(r => r.type === '表界').length,
  innerRealms: window.LORE_REGIONS.filter(r => r.type === '里界').length,
  lastUpdated: new Date().toISOString(),
  dataSource: 'Excel 世界观文档导入 + 现有数据合并'
};

// ==================== 导出数据 ====================
// 用于调试和导出
window.exportLoreData = function() {
  return {
    organizations: window.LORE_ORGANIZATIONS,
    regions: window.LORE_REGIONS,
    characters: window.LORE_CHARACTERS,
    stats: window.LORE_STATS
  };
};

// 打印加载信息
console.log('[Lore Data] 已加载:', window.LORE_STATS);
