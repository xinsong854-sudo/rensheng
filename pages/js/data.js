// 伪物数据 - 捏 Ta 世界观设定
// 分级规则：SAFE 最多最鸡肋 → HAZARD 最少最危险

// ========== 身份关键词映射 ==========
// 使用 window 对象全局导出，确保跨文件可访问
window.IDENTITY_KEYWORDS = {
    // 人类档案
    "烛灯": "揭秘人",
    "绫份": "猎人",
    "灼玥": "调查员",
    "白桦": "对伪课",
    "斯汀先生": "ABSC",
    "艾尔伯特·帕拉索": "先驱",
    // 伪人档案
    "营长": "楼长",
    "非常玦蝶": "清劣者",
    "化而为": "居民",
    "独允": "AI",
    "西瓜人": "董事长",
    "X": "生骸",
    "亚契·谜思": "研究员",
    "荆千棘": "助手",
    "赫卡忒": "仿生人",
    "特洛菲": "人监之口",
    "洛洛": "人监之口",
    // 伪人档案续（第 2 批次）
    "医生": "瘟疫医生",
    "汐": "鲛人",
    "涟": "鲛人",
    "渔夫": "利维坦",
    "希庇安": "神裔",
    "安布罗斯": "伪神",
    "无名卿": "外来者",
    "因法勒": "观测者",
    "伊露": "面具师",
    "春山抚子": "执事",
    "小赤帽": "清洁员",
    "虫者": "售票员",
    "单先生": "院长",
    "笑颜": "人偶",
    "长喙": "说书人",
    "AT": "奇迹伪神",
    "墨水夜": "水体",
    "冷寂": "上古存在",
    "石测": "居民",
    "大夜夜": "店主",
    "伽纳罗丝": "血族",
    "福音": "伪神",
    "涂改": "学生",
    "阿秋": "人监",
    "鸿": "记者",
    "梦城寺绫希": "旅者",
    "云蓝": "幸存者",
    "约斯米特": "织命者",
    "瓦莉奥尔·阿亚奇": "政府军",
    "折纸簌鸟": "店主",
    "松下·拉尔": "猫娘",
    "江安": "虚无",
    "C.": "双子",
    // 特殊关键词用户
    "奈塔": "土豆服务器持有者",
    "小雨": "再说封你号",
    "暮笙笙": "紫色大喷菇",
    "夕月": "鲤鱼王",
    "xh": "阳光开朗的站长",
    // 更多身份关键词
    "西西": "恶魔修女",
    "伪人西": "恶魔修女",
    "桃花": "桃花堂堂主",
    "桃花不换酒": "桃花堂堂主",
    "卜焕汣": "桃花堂堂主",
    // 新增身份关键词
    "温塔莎": "泥头车",
    "泥头车": "泥头车"
};

// ========== 权限配置 ==========
// 高权限用户名单（可看 SAFE + CAUTION + DANGER）
window.HIGH_PERMISSION_USERS = [
    // 人类档案
    '烛灯', '绫份', '灼玥', '白桦', '斯汀先生', '艾尔伯特·帕拉索',
    // 伪人档案
    '营长', '非常玦蝶', '化而为', '独允', '西瓜人',
    'X', '亚契·谜思', '荆千棘', '赫卡忒', '特洛菲', '洛洛',
    '医生', '汐', '涟', '渔夫', '希庇安', '安布罗斯', '无名卿', '因法勒', '伊露',
    '春山抚子', '小赤帽', '虫者', '单先生', '笑颜',
    '长喙', 'AT', '墨水夜', '冷寂', '石测', '大夜夜', '伽纳罗丝',
    '福音', '涂改', '阿秋', '鸿', '梦城寺绫希', '云蓝', '约斯米特', '瓦莉奥尔·阿亚奇',
    '折纸簌鸟', '松下·拉尔', '江安', 'C.',
    // 特殊关键词用户（关键词身份）
    '土豆服务器持有者', '再说封你号', '紫色大喷菇', '鲤鱼王', '阳光开朗的站长',
    '恶魔修女', '桃花堂堂主',
    // 特殊关键词用户（用户名，用于模糊匹配）
    '奈塔', '小雨', '暮笙笙', '夕月', 'xh',
    '西西', '伪人西', '桃花', '桃花不换酒', '卜焕汣',
    // 新增用户
    '温塔莎', '泥头车'
];

// 最高权限用户（可查看所有内容）
window.MAX_PERMISSION_USERS = ['营长'];

// 权限等级定义
window.PERMISSION_LEVELS = {
    low: { name: '受限访问', canView: ['safe'] },
    normal: { name: '标准访问', canView: ['safe', 'caution'] },
    high: { name: '高级访问', canView: ['safe', 'caution', 'danger', 'hazard'] },
    max: { name: '最高权限', canView: ['safe', 'caution', 'danger', 'hazard'] }
};

// 分级权限映射
window.CLASS_PERMISSION_MAP = {
    safe: 'low',
    caution: 'normal',
    danger: 'high',
    hazard: 'high'
};

// ========== 伪物数据 ==========
window.artifacts = [
    // ========== 🟩 SAFE 级（17 个）- 无害但鸡肋 ==========
    {
        id: "SA-001",
        name: "永动电视",
        class: "safe",
        location: "渊某二手市场",
        containment: "无需特殊收容，正常存放即可",
        description: "一台老式显像管电视，只有持续拍打侧面才能正常播放，且只能收到 3 个频道，其中 2 个是雪花屏。",
        effect: "拍打后可观看 15 分钟，停止拍打立即黑屏",
        image: "images/sa-001.jpg",
        secret: "[非常电影院] 深夜放映时，[单先生] 总坐在最后一排。有次散场后电视没关，他回头发现屏幕上播的竟是自己在影院里的背影——而画面里的'单先生'正缓缓转头，对屏幕外的他比了个'嘘'的手势。从此 [非常电影院] 规定：最后一场必须双人清场。"
    },
    {
        id: "SA-002",
        name: "恒温水杯",
        class: "safe",
        location: "槐安公寓 302 室",
        containment: "无需特殊收容",
        description: "普通玻璃水杯，无论倒入什么温度的液体，都会变成温的——不冷不热，刚刚好让人失去喝它的欲望。",
        effect: "强制恒温 37℃，无法改变",
        image: "images/sa-002.jpg"
    },
    {
        id: "SA-003",
        name: "单向圆珠笔",
        class: "safe",
        location: "黎守档案室",
        containment: "无需特殊收容",
        description: "一支蓝色圆珠笔，只能写字不能擦除，但写出来的字只有倒着看才能辨认。",
        effect: "文字镜像显示，需反向阅读",
        image: "images/sa-003.jpg"
    },
    {
        id: "SA-004",
        name: "无限火柴",
        class: "safe",
        location: "猎人公会黑市",
        containment: "无需特殊收容",
        description: "一盒永远用不完的火柴，但每根只能燃烧 3 秒，且必须在无风环境下才能点燃。",
        effect: "无限数量，但燃烧时间极短",
        image: "images/sa-004.jpg"
    },
    {
        id: "SA-005",
        name: "回声哨子",
        class: "safe",
        location: "渊东共和国某学校",
        containment: "无需特殊收容",
        description: "一个银色哨子，吹响后会产生回声，但回声比原声晚 5 分钟才出现。",
        effect: "延迟 5 分钟产生回声",
        image: "images/sa-005.jpg"
    },
    {
        id: "SA-006",
        name: "自洁抹布",
        class: "safe",
        location: "茶居公寓厨房",
        containment: "无需特殊收容",
        description: "一块灰色抹布，可以自动清洁自身污渍，但清洁过程中会散发出强烈的鱼腥味。",
        effect: "自洁但产生异味",
        image: "images/sa-006.jpg"
    },
    {
        id: "SA-007",
        name: "平衡筷子",
        class: "safe",
        location: "鸟姐大排档",
        containment: "无需特殊收容",
        description: "一双竹筷，无论夹什么食物都不会掉落，但使用者会不由自主地发出咀嚼声。",
        effect: "防掉落但强制发声",
        image: "images/sa-007.jpg"
    },
    {
        id: "SA-008",
        name: "准时闹钟",
        class: "safe",
        location: "槐安公寓管理处",
        containment: "无需特殊收容",
        description: "一个电子闹钟，永远准时，但闹铃声音是播放使用者 5 分钟前说过的话。",
        effect: "录音回放式闹铃",
        image: "images/sa-008.jpg"
    },
    {
        id: "SA-009",
        name: "防潮饼干盒",
        class: "safe",
        location: "非常电影院小卖部",
        containment: "无需特殊收容",
        description: "一个铁皮饼干盒，内部永远保持干燥，但打开时会发出类似叹息的声音。",
        effect: "完美防潮但有怪声",
        image: "images/sa-009.jpg"
    },
    {
        id: "SA-010",
        name: "认路指南针",
        class: "safe",
        location: "渊某户外用品店",
        containment: "无需特殊收容",
        description: "一个指南针，永远指向北方，但指针会轻微颤抖，让人难以精确读数。",
        effect: "指向准确但难以读取",
        image: "images/sa-010.jpg"
    },
    {
        id: "SA-011",
        name: "保温饭盒",
        class: "safe",
        location: "黎守食堂",
        containment: "无需特殊收容",
        description: "一个不锈钢饭盒，保温效果极好，但打开后食物会排列成奇怪的表情图案。",
        effect: "超强保温但食物摆成表情",
        image: "images/sa-011.jpg"
    },
    {
        id: "SA-012",
        name: "静音拖鞋",
        class: "safe",
        location: "槐安公寓 606 室",
        containment: "无需特殊收容",
        description: "一双粉色拖鞋，走路完全无声，但每走 10 步会发出一次放屁声。",
        effect: "静音但间歇性尴尬发声",
        image: "images/sa-012.jpg"
    },
    {
        id: "SA-013",
        name: "延迟水性笔",
        class: "safe",
        location: "天风阁",
        containment: "正常保管",
        description: "不知道什么时候才能写出字的水性笔",
        effect: "书写延迟，可能几分钟到几小时后才出水",
        image: "images/sa-013.jpg"
    },
    {
        id: "SA-014",
        name: "万能耳机",
        class: "safe",
        location: "未公开",
        containment: "正常保管",
        description: "可以插进任何电子产品的耳机",
        effect: "兼容所有接口",
        image: "images/sa-014.jpg"
    },
    {
        id: "SA-015",
        name: "熊猫挂件",
        class: "safe",
        location: "未公开",
        containment: "正常保管",
        description: "一个熊猫造型的挂件，时不时会扎人",
        effect: "间歇性扎人",
        image: "images/sa-015.jpg"
    },
    {
        id: "SA-016",
        name: "变形冰箱贴",
        class: "safe",
        location: "未公开",
        containment: "正常保管",
        description: "一个可以变形的冰箱贴",
        effect: "可以变形",
        image: "images/sa-016.jpg"
    },
    {
        id: "SA-017",
        name: "永远装不满的杯子",
        class: "safe",
        location: "未公开",
        containment: "正常保管",
        description: "一个永远装不满的杯子",
        effect: "装不满",
        image: "images/sa-017.jpg"
    },
    {
        id: "SA-018",
        name: "安诺涅的柠檬茶",
        class: "safe",
        location: "营长处",
        containment: "由营长保管",
        description: "营长的专属饮品",
        effect: "营长专属",
        image: "images/sa-018.jpg"
    },
    
    // ========== 🟨 CAUTION 级（8 个）- 有一定危险性 ==========
    {
        id: "CA-001",
        name: "记忆相机",
        class: "caution",
        location: "绿洲研究所",
        containment: "需存放于屏蔽袋中，禁止对人拍摄",
        description: "一台老式拍立得，拍摄后照片会显示被摄物体 5 秒后的状态。拍摄人类时会短暂抽取其记忆。",
        effect: "预知 5 秒未来，拍摄人类会抽取记忆",
        image: "images/ca-001.jpg"
    },
    {
        id: "CA-002",
        name: "共感手套",
        class: "caution",
        location: "对伪课装备库",
        containment: "需成对存放，禁止同时佩戴两只",
        description: "一双黑色皮手套，佩戴后触摸物体会感受到该物体曾经历的情感。长时间佩戴会导致情感混乱。",
        effect: "读取物体情感残留，有精神污染风险",
        image: "images/ca-002.jpg"
    },
    {
        id: "CA-003",
        name: "回响录音机",
        class: "caution",
        location: "非常电影院档案室",
        containment: "存放于隔音箱，每周需播放一次空白磁带",
        description: "一台磁带录音机，录制的声音会在录制地点反复回响，持续 7 天。回响可能被其他存在听见。",
        effect: "声音实体化回响 7 天",
        image: "images/ca-003.jpg"
    },
    {
        id: "CA-004",
        name: "影线剪刀",
        class: "caution",
        location: "猎人公会武器库",
        containment: "刀刃需包裹黑布，禁止剪断活物影子",
        description: "一把银色剪刀，可以剪断物体的影子。被剪断影子的物体会在 24 小时内逐渐失去存在感。",
        effect: "剪断影子使目标存在感消失",
        image: "images/ca-004.jpg"
    },
    {
        id: "CA-005",
        name: "梦境笔记本",
        class: "caution",
        location: "灯塔图书馆",
        containment: "需锁入保险柜，禁止连续阅读超过 3 页",
        description: "一本空白笔记本，睡前放在枕边会记录当晚梦境。但阅读后可能将梦境内容带入现实。",
        effect: "记录梦境，阅读后可能混淆梦与现实",
        image: "images/ca-005.jpg"
    },
    {
        id: "CA-006",
        name: "时间沙漏",
        class: "caution",
        location: "渊某古董店",
        containment: "需水平放置，禁止翻转超过 3 次/日",
        description: "一个木制沙漏，翻转后周围 1 米内时间流速变为正常的 90%。过度使用会导致局部时间紊乱。",
        effect: "减缓 10% 时间流速，过度使用有风险",
        image: "images/ca-006.jpg"
    },
    {
        id: "CA-007",
        name: "二营长的任意门",
        class: "caution",
        location: "二营长处",
        containment: "由二营长保管",
        description: "可以通往任何地方的门",
        effect: "空间传送",
        image: "images/ca-007.jpg",
        related: "非常玦蝶（二营长）"
    },
    {
        id: "CA-008",
        name: "薛定谔盲盒",
        class: "caution",
        location: "未公开",
        containment: "正常保管，禁止擅自开启",
        description: "内容未知的盲盒",
        effect: "内容未知",
        image: "images/ca-008.jpg"
    },
    {
        id: "CA-009",
        name: "扇形门",
        class: "caution",
        location: "未公开",
        containment: "标注正确开启方式",
        description: "看似扇形拉开，实际是左右滑动的门",
        effect: "开错方式会受到神秘小惩罚",
        image: "images/ca-009.jpg"
    },
    
    // ========== 🟧 DANGER 级（3 个）- 高度危险 ==========
    {
        id: "DA-001",
        name: "噬忆怀表",
        class: "danger",
        location: "西陆联盟某废弃教堂",
        containment: "存放于铅衬容器，禁止在人群附近开启",
        description: "一块 19 世纪金色怀表，运行时会吸收周围人类的记忆。影响范围 50 米，已导致多起集体失忆事件。",
        effect: "吸收 50 米范围内人类记忆",
        image: "images/da-001.jpg"
    },
    {
        id: "DA-002",
        name: "虚空之钥",
        class: "danger",
        location: "白墟之地核心区域",
        containment: "存放于反物质隔离舱，禁止任何形式的激活测试",
        description: "一把古代巴比伦风格的金属钥匙，可开启任何「门」，包括已关闭的里界入口。已导致 3 次里界泄露事件。",
        effect: "开启任意里界之门",
        image: "images/da-002.jpg"
    },
    {
        id: "DA-003",
        name: "痛苦面具",
        class: "danger",
        location: "赤红新星某地下设施",
        containment: "必须存放于铅衬容器中，禁止任何人佩戴或直视",
        description: "一个人形面具，材质未知。佩戴者会永久失去所有痛觉和情感，成为绝对理性的存在。已有 12 名志愿者佩戴后失踪。",
        effect: "剥夺痛觉与情感，佩戴者失踪",
        image: "images/da-003.jpg"
    },
    {
        id: "DA-004",
        name: "福音的极光",
        class: "danger",
        location: "西陆伪神活动区域",
        containment: "难以收容",
        description: "福音（西陆伪神）散发的极光。关联：福音（角色）。",
        effect: "精神影响/幸福感知",
        image: "images/da-004.jpg"
    },
    {
        id: "DA-005",
        name: "血管长剑",
        class: "danger",
        location: "未公开",
        containment: "小心保管，避免接触血液",
        description: "通体白色，剑身有微小凸起和交错纹路",
        effect: "砍伤人时液体会留在纹路里，和绫份的血混在一起像血管",
        image: "images/da-005.jpg",
        related: "绫份"
    },
    
    // ========== 🟥 HAZARD 级（2 个）- 灾难级 ==========
    {
        id: "HA-001",
        name: "终焉之匣",
        class: "hazard",
        location: "深度 3000 米地下掩体",
        containment: "永久封存，禁止开启，禁止任何形式的研究",
        description: "一个黑色金属立方体，表面没有任何接缝。根据破译的古代文献，该物品被描述为「世界的终点」。任何尝试开启的行为都可能导致现实结构崩溃。",
        effect: "未知，推测可终结现实",
        image: "images/ha-001.jpg"
    },
    {
        id: "HA-002",
        name: "夜鹭",
        class: "hazard",
        location: "未公开",
        containment: "因营长个人喜好而特殊保管",
        description: "因为营长喜欢所以放在了这里",
        effect: "未知",
        image: "images/ha-002.jpg"
    }
];
