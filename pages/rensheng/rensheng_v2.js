
// ==============================
// INTEGRATED: char_db.js
// ==============================
// ===== 角色数据库 (CHARDB) =====
// 从 worlddata.json「伪人档案」+「人物档案」提取
// 格式: { "规范名称": { desc, region, type } }
const CHARDB = {

// ---------- 伪人档案 ----------
"营长": {
  desc: "伪人大本营管理者，槐安公寓楼长，疑似来自「人监」，兼职清劣者，有很多双眼睛。",
  region: "渊",
  type: "伪人"
},
"非常玦蝶": {
  desc: "非常电影院站长，渊境内顶尖清劣者，来自「若迷界」幸存者，营长的得力助手。",
  region: "渊",
  type: "伪人"
},
"化而为": {
  desc: "蓝白色史莱姆状生命变化而来的白发红瞳少女，可随时变成任何见过的模样。",
  region: "渊",
  type: "伪人"
},
"温塔莎·克林斯曼": {
  desc: "基质-0聚合体，拟态为紫黑风衣的高大女性，本体为狰狞龙型巨兽，情感缺失。",
  region: "行踪不明",
  type: "伪人"
},
"独允": {
  desc: "渊官方自研AI大模型，液态金属与光导纤维构成，投影为铜发红眼少女。",
  region: "渊",
  type: "伪人"
},
"西瓜人": {
  desc: "4580岁，对成为人类有深深执念，西瓜公司董事长，赠予人类西瓜汁。",
  region: "渊",
  type: "伪人"
},
"X": {
  desc: "神秘小孩，代号生骸·X，推测为「生命」概念人格化，白发红瞳，核心能力嬗变。",
  region: "渊",
  type: "伪人"
},
"亚契·谜思": {
  desc: "来自错位花园的炼金术师，本质为黄铜零件与植物复合物，开设花园餐厅INFUSION。",
  region: "绿洲",
  type: "伪人"
},
"荆千棘": {
  desc: "亚契助手，蔷薇科植物本体，蔷薇藤、假人、LED屏幕的集合体，绿洲的「蔷薇」。",
  region: "绿洲",
  type: "伪人"
},
"赫卡忒": {
  desc: "亚契创造的仿生人，炭黑色皮肤，蓝色水晶头发，四臂无眼，持有「锁与钥」。",
  region: "渊",
  type: "伪人"
},
"特洛菲&洛洛": {
  desc: "人监之口，腹部有巨口的异种，洛洛为黑色蟒蛇状怪物，共享循环系统。",
  region: "渊",
  type: "伪人"
},
"【瘟疫的病主】医生？": {
  desc: "古老伪人，形象近似中世纪瘟疫医生，与「大瘟疫」事件密切相关，几乎不交流。",
  region: "渊",
  type: "伪人"
},
"种群档案：多虫": {
  desc: "诞生于「巢穴」的敌对种群，米粒大小，蜈蚣蟑螂结合体，会寄生活体生物。",
  region: "巢穴",
  type: "伪人"
},
"种群档案：人魈": {
  desc: "诞生于「怪原」的敌对种群，类人形灰白皮肤，穿戴粗布袍遮掩，具有一定智慧。",
  region: "怪原",
  type: "伪人"
},
"种群档案：凝胶": {
  desc: "诞生于「随心」的凝胶状种群，具腐蚀性，可通过透明化扑向猎物控制行动。",
  region: "随心",
  type: "伪人"
},
"汐&涟": {
  desc: "出没于渊附近海域的鲛人双子，汐好奇，涟谨慎，歌声令人短暂失去时空概念。",
  region: "渊",
  type: "伪人"
},
"圣地亚哥·梅尔维尔": {
  desc: "代号「渔夫」，2.2米高男性，深蓝雨衣兜帽遮面，持鱼叉枪与巨型猎鱼矛。",
  region: "无所属",
  type: "伪人"
},
"拟人蝎": {
  desc: "来自「巢穴」的独居雌性与种，人类少女外观，四臂螯足，蝎尾含神经毒素。",
  region: "巢穴",
  type: "伪人"
},
"『我深深的破碎』": {
  desc: "由无数方块构成的女孩，绝对穿透性，免疫物理伤害，常低语「失其路，失其度」。",
  region: "无所属",
  type: "伪人"
},
"Ιππότης": {
  desc: "希庇安，Αθάνατο最坚定的信徒，西陆视为「神裔」，平时骑士形态无攻击性。",
  region: "西陆联盟",
  type: "伪人"
},
"Αθάνατο": {
  desc: "安布罗斯，西陆伪神，被教廷视为「神裔」，如神明般高高在上，被激怒会降下天罚。",
  region: "西陆联盟",
  type: "伪人"
},
"「无名卿」": {
  desc: "外来者，沉默寡言，蓝色花朵盛开为常态，混乱状态时眼睛四散搜寻，真名「因法勒」。",
  region: "渊",
  type: "伪人"
},
"伊露": {
  desc: "无感情的伪人，喜欢学习人类，游走人间剥夺人类表情制作面具。",
  region: "渊",
  type: "伪人"
},
"春山抚子": {
  desc: "本体为美短虎斑猫，天风阁首席执事兼看板娘，行为与人类基本无异但保留猫咪习性。",
  region: "渊",
  type: "伪人"
},
"小赤帽": {
  desc: "狼影赤帽，黑暗童话风格的小红帽，破红斗篷扭曲狼形影，负责槐安公寓卫生清洁。",
  region: "渊",
  type: "伪人"
},
"虫者": {
  desc: "原名林虫，化名虫者外号翡影，非常电影院售票员，喜欢看电影的虫子。",
  region: "渊",
  type: "伪人"
},
"单先生": {
  desc: "非常电影院院长，算命先生，闲云野鹤不与世争，为还二营长因果来经营电影院。",
  region: "渊",
  type: "伪人"
},
"笑颜": {
  desc: "居住在槐安公寓909号的嬉皮笑脸诡异人偶，会做恶作剧，待久了你也会嬉皮笑脸。",
  region: "渊",
  type: "伪人"
},
"无人存在": {
  desc: "似乎曾经有人在这里，但现在无人存在，神秘的空无存在。",
  region: "未知",
  type: "伪人"
},
"陆玖": {
  desc: "5003室新入住的多面孔伪人小姐，性格多变，伪人特征极不稳定，真实面貌不可知。",
  region: "渊",
  type: "伪人"
},
"长喙": {
  desc: "原名瀚羽，鹰伪人说书人，外号长碎嘴，开设长喙茶馆，将非常电影院视为家。",
  region: "自由",
  type: "伪人"
},
"AT": {
  desc: "掌管「奇迹」的西陆伪神，与先驱艾尔伯特同名，缺失大部分人类记忆，能驱动奇迹粒子。",
  region: "西陆",
  type: "伪人"
},
"墨水夜": {
  desc: "槐安公寓水池中的水制伪人，以史莱姆为食，喜欢泡在水中，偶尔偷窥居民生活。",
  region: "渊",
  type: "伪人"
},
"冷寂": {
  desc: "上古存在，静静呆在海域上注视人类生活，呆傻但实力未知，偶尔去墨水夜处串门。",
  region: "自由",
  type: "伪人"
},
"石测": {
  desc: "渊成员，喜欢吃石头，危害极低，带口罩融入人类打工，总想给自己买大房子。",
  region: "渊",
  type: "伪人"
},
"阴暗邪恶大夜夜": {
  desc: "诞生于幻想的存在，做高定服装和珠宝生意，房间衣柜联通里界，性格毒舌爱看热闹。",
  region: "渊",
  type: "伪人"
},
"伽纳罗丝": {
  desc: "本质为猩红色血液的神秘生物，拟态为赤角龙尾美女，吸收血液强化自身。",
  region: "渊",
  type: "伪人"
},
"Evangelium.福音": {
  desc: "西陆伪神，人鹿角耳羽鱼尾组成，亲和力磁场消解负面情绪，济世者派系领袖。",
  region: "西陆",
  type: "伪人"
},
"涂改": {
  desc: "Tipp-Ex，苍白少年，手指触碰之处错误字迹消失，能力「归白」将物质抹为白平面。",
  region: "渊",
  type: "伪人"
},
"阿秋": {
  desc: "12岁人监成员，渴望被认可，能力为气味图书馆和危险预警，依赖伙伴如城堡。",
  region: "人监",
  type: "伪人"
},
"鸿": {
  desc: "114514岁的编辑记者，代号即真名，能力为在任何时空开门，嗜苦嗜烈酒。",
  region: "自由",
  type: "伪人"
},
"梦城寺绫希": {
  desc: "不知从何而生的伪人，银发异瞳防毒面具巫师帽，帽子是活的，能潜入意识世界。",
  region: "未知",
  type: "伪人"
},
"云蓝": {
  desc: "悲惨过去的少女，曾戴三个手偶扮演三种声音，经历杀母后撕碎手偶告别过去。",
  region: "渊",
  type: "伪人"
},
"Joschmitt.": {
  desc: "约斯米特，西陆伪神，白长发骨角独眼覆玫瑰，本体为巨兽残骸，通过傀儡与外界交流。",
  region: "西陆",
  type: "伪人"
},
"瓦莉奥尔·阿亚奇": {
  desc: "平和的战斗者，西陆伪神，能将想象中武器实体化，银发红白异瞳，厌倦了征战。",
  region: "西陆",
  type: "伪人"
},
"折纸簌鸟": {
  desc: "活跃表界两百年的鸟姐大排档老板，能创造五个纸鸟分身，已完全融入人类社会。",
  region: "渊",
  type: "伪人"
},
"红缇香": {
  desc: "清末孤鸾入命女子，被配阴婚生葬于乱葬岗，阴月阴日生，充满怨气的存在。",
  region: "未知",
  type: "伪人"
},
"牺牲": {
  desc: "古祭之牺，三牲与巫童合埋诞生的伪人，既是祭品也是祭司和屠刀，用过去式说话。",
  region: "未知",
  type: "伪人"
},
"兔仙": {
  desc: "茶居公寓楼长，山脚镇昔日兔仙，赤瞳白发冷白肤，社恐白天话痨夜晚。",
  region: "未知",
  type: "伪人"
},
"Эдельвейс": {
  desc: "高山雪绒花，68岁男性伪人，赤红新星灾害应急高层，掌管全国重大灾害救援。",
  region: "赤红新星",
  type: "伪人"
},
"Cipher": {
  desc: "无性别，白墟之地勘测者，擅长捕捉规则波动解析信息态结构，编号RSW-07月蚀鸢尾。",
  region: "渊",
  type: "伪人"
},
"松下·拉尔": {
  desc: "143cm白色猫耳猫尾少女，温和好猫，能力为哈气挠人和猫一般灵活身法。",
  region: "渊",
  type: "伪人"
},
"江安": {
  desc: "温柔到近乎虚无的伪人，能力「从前我死去的家」剥夺痛苦感知，温柔是表皮。",
  region: "渊",
  type: "伪人"
},
"C.": {
  desc: "居住229室，书面化说话，本体夜晚出现喻体白天模拟白化病患者，有凝血功能障碍。",
  region: "渊",
  type: "伪人"
},
"海德拉": {
  desc: "水银聚合体无性别，吸收亡者思维碎片模仿他人，入戏过深把自己当被模仿者。",
  region: "无所属",
  type: "伪人"
},
"菲洛维尔": {
  desc: "猫猫章鱼，实验失败品042号，自由主义傲娇，能力为变色隐身融入环境。",
  region: "渊",
  type: "伪人"
},

// ---------- 人物档案 ----------
"「烛灯」": {
  desc: "揭秘人最后成员，在伪人大本营发布四篇帖子帮助人类与伪人打交道，后失去音讯。",
  region: "揭秘人",
  type: "人类"
},
"绫份": {
  desc: "代号白夜叉，17岁格斗术大师，精通多种流派自创绫流体术，惯用长刀。",
  region: "渊",
  type: "人类"
},
"灼玥": {
  desc: "27岁金发金瞳男性独立调查员，持伪物长剑「反叛」与高韧性外衣「静心」。",
  region: "自由",
  type: "人类"
},
"白桦": {
  desc: "对伪课副课长，实力强悍，总一副睡不醒的样子，使用重型长柄锤。",
  region: "渊",
  type: "人类"
},
"斯汀先生": {
  desc: "ABSC人类职员，接触伪人最多，自称因犯家族规定不报姓氏，年龄超限。",
  region: "西陆",
  type: "人类"
},
"艾尔伯特·帕拉索": {
  desc: "首位多次自主进入里界的人类先驱，建立ABSC，发明普罗米修斯提灯，后自杀。",
  region: "西陆",
  type: "人类"
}
};

// ===== 别名映射 (CHARDB_ALIASES) =====
// 格式: { "别名": ["规范名称", "简介片段"] }
// 只收录明确唯一指向的别名，排除泛称（如站长、楼长、炼金术师等）
const CHARDB_ALIASES = {
  // 营长
  "楼长": ["营长", "伪人大本营管理者，槐安公寓楼长，疑似来自「人监」。"],
  "Anonymous": ["营长", "伪人大本营管理者，槐安公寓楼长，疑似来自「人监」。"],
  "anonymous": ["营长", "伪人大本营管理者，槐安公寓楼长，疑似来自「人监」。"],

  // 非常玦蝶
  "玦蝶": ["非常玦蝶", "非常电影院站长，渊境内顶尖清劣者。"],
  "二营长": ["非常玦蝶", "非常电影院站长，渊境内顶尖清劣者。"],

  // 化而为
  "化化": ["化而为", "蓝白色史莱姆状生命变化而来的白发红瞳少女。"],

  // X
  "093": ["X", "神秘小孩，代号生骸·X，推测为「生命」概念人格化。"],
  "生骸": ["X", "神秘小孩，代号生骸·X，推测为「生命」概念人格化。"],
  "深破": ["『我深深的破碎』", "由无数方块构成的女孩，绝对穿透性，免疫物理伤害。"],

  // 独允
  "独独": ["独允", "渊官方AI大模型，液态金属构成，铜发红眼少女投影。"],

  // 亚契·谜思
  "咔哒小姐": ["亚契·谜思", "来自错位花园的炼金术师，人类面前使用咔哒小姐外表示人。"],
  "AcheMist": ["亚契·谜思", "来自错位花园的炼金术师，黄铜零件与植物复合物。"],

  // 温塔莎·克林斯曼
  "温塔莎": ["温塔莎·克林斯曼", "基质-0聚合体，紫黑风衣高大女性，本体为龙型巨兽。"],
  "基质-0": ["温塔莎·克林斯曼", "基质-0聚合体，紫黑风衣高大女性，本体为龙型巨兽。"],

  // 圣地亚哥·梅尔维尔
  "渔夫": ["圣地亚哥·梅尔维尔", "2.2米高男性，深蓝雨衣兜帽遮面，持鱼叉枪。"],
  "利维坦": ["圣地亚哥·梅尔维尔", "2.2米高男性，深蓝雨衣兜帽遮面，持鱼叉枪。"],

  // 希庇安
  "希庇安": ["Ιππότης", "Αθάνατο最坚定的信徒，西陆视为「神裔」的骑士。"],

  // 安布罗斯
  "安布罗斯": ["Αθάνατο", "西陆伪神，被教廷视为「神裔」，如神明般高高在上。"],

  // 无名卿
  "因法勒": ["「无名卿」", "外来者，沉默寡言，混乱状态下真名为因法勒。"],

  // 长喙
  "长碎嘴": ["长喙", "鹰伪人说书人，原名瀚羽，开设长喙茶馆。"],
  "瀚羽": ["长喙", "鹰伪人说书人，原名瀚羽，开设长喙茶馆。"],

  // AT
  "Albert": ["AT", "掌管「奇迹」的西陆伪神，与先驱艾尔伯特同名。"],
  "Albert Palazzo": ["AT", "掌管「奇迹」的西陆伪神，与先驱艾尔伯特同名。"],

  // 阴暗邪恶大夜夜
  "大夜夜": ["阴暗邪恶大夜夜", "诞生于幻想，做高定服装生意，衣柜联通里界。"],

  // Evangelium
  "福音": ["Evangelium.福音", "西陆伪神，亲和力磁场消解负面情绪，济世者领袖。"],

  // 涂改
  "涂改": ["涂改", "Tipp-Ex，苍白少年，能力归白将物质抹为白平面。"],
  "Tipp-Ex": ["涂改", "Tipp-Ex，苍白少年，能力归白将物质抹为白平面。"],

  // Joschmitt
  "约斯米特": ["Joschmitt.", "西陆伪神，白长发骨角独眼覆玫瑰，通过傀儡交流。"],
  "Josselin": ["Joschmitt.", "Joschmitt的傀儡之一，居槐安公寓510，温柔礼貌优雅。"],
  "若斯兰": ["Joschmitt.", "Joschmitt的傀儡之一，居槐安公寓510，温柔礼貌优雅。"],

  // Joschmitt 的傀儡 013
  "013": ["Joschmitt.", "Joschmitt的西陆教会修女傀儡。"],

  // 特洛菲&洛洛
  "特洛菲": ["特洛菲&洛洛", "人监之口，腹部巨口异种，与洛洛共享循环系统。"],
  "洛洛": ["特洛菲&洛洛", "特洛菲的黑色蟒蛇状伙伴，共享知觉和思维。"],

  // 汐&涟
  "汐": ["汐&涟", "鲛人双子中的妹妹，蓝发蓝眼橙色耳鳍，好奇心强。"],
  "涟": ["汐&涟", "鲛人双子中的姐姐，青发橙眼，织鲛绡手艺一流。"],
  "鲛人": ["汐&涟", "出没于渊附近海域的双子，歌声令人失去时空概念。"],

  // C.
  "C": ["C.", "居住229室，书面化说话，本体喻体昼夜交替。"],

  // Joschmitt 别名
  "Joschmitt": ["Joschmitt.", "西陆伪神，白长发骨角独眼覆玫瑰，通过傀儡交流。"],

  // 荆千棘
  "荆千棘": ["荆千棘", "亚契助手，蔷薇科植物本体，绿洲的「蔷薇」。"],

  // 长喙的茶馆
  "长喙茶馆": ["长喙", "鹰伪人说书人，原名瀚羽，开设长喙茶馆。"],

  // 埃德尔维斯（高山雪绒花）
  "雪绒花": ["Эдельвейс", "高山雪绒花，68岁男性伪人，赤红新星灾害高层。"],
  "Edelweiss": ["Эдельвейс", "高山雪绒花，68岁男性伪人，赤红新星灾害高层。"],

  // 菲洛维尔
  "菲洛维尔": ["菲洛维尔", "猫猫章鱼实验042号，自由主义傲娇，能变色隐身。"],
  "Felovyre": ["菲洛维尔", "猫猫章鱼实验042号，自由主义傲娇，能变色隐身。"],
  "猫猫章鱼": ["菲洛维尔", "猫猫章鱼实验042号，自由主义傲娇，能变色隐身。"],

  // 菲洛维尔 042号
  "042号": ["菲洛维尔", "猫猫章鱼实验042号，自由主义傲娇，能变色隐身。"],

  // 海德拉
  "海德拉": ["海德拉", "水银聚合体无性别，吸收亡者思维碎片模仿他人。"],
  "Hydra": ["海德拉", "水银聚合体无性别，吸收亡者思维碎片模仿他人。"],

  // 云蓝
  "云蓝": ["云蓝", "悲惨少女，曾戴三手偶扮演三种声音，撕碎手偶告别过去。"],

  // 红缇香
  "红缇香": ["红缇香", "清末孤鸾入命女子，被配阴婚生葬乱葬岗。"],

  // 牺牲
  "牺牲": ["牺牲", "古祭之牺，三牲与巫童合埋诞生，既是祭品也是祭司。"],

  // 兔仙
  "兔仙": ["兔仙", "茶居公寓楼长，山脚镇昔日兔仙，赤瞳白发冷白肤。"],

  // 松下
  "松下": ["松下·拉尔", "143cm白色猫耳猫尾少女，温和好猫。"],
  "松下·拉尔": ["松下·拉尔", "143cm白色猫耳猫尾少女，温和好猫。"],

  // 江安
  "江安": ["江安", "温柔到近乎虚无，能力剥夺痛苦感知，温柔是表皮。"],

  // 冷寂
  "冷寂": ["冷寂", "上古存在，静静呆在海域注视人类，偶尔去墨水夜处串门。"],

  // 石测
  "石测": ["石测", "渊成员，喜欢吃石头，带口罩融入人类打工。"],

  // 伽纳罗丝
  "伽纳罗丝": ["伽纳罗丝", "本质为猩红色血液的神秘生物，拟态为赤角龙尾美女。"],

  // 折纸簌鸟
  "折纸簌鸟": ["折纸簌鸟", "活跃表界两百年的鸟姐大排档老板，能创造五个纸鸟分身。"],
  "鸟姐": ["折纸簌鸟", "活跃表界两百年的鸟姐大排档老板，能创造五个纸鸟分身。"],

  // 小赤帽
  "小赤帽": ["小赤帽", "狼影赤帽，黑暗童话风格小红帽，负责公寓卫生清洁。"],

  // 笑颜
  "笑颜": ["笑颜", "槐安公寓909号的嬉皮笑脸诡异人偶，待久了你也会嬉皮笑脸。"],

  // 虫者
  "虫者": ["虫者", "原名林虫外号翡影，非常电影院售票员，喜欢看电影的虫子。"],
  "林虫": ["虫者", "原名林虫外号翡影，非常电影院售票员，喜欢看电影的虫子。"],
  "翡影": ["虫者", "原名林虫外号翡影，非常电影院售票员，喜欢看电影的虫子。"],

  // 单先生
  "单先生": ["单先生", "非常电影院院长，算命先生，闲云野鹤不与世争。"],

  // 陆玖
  "陆玖": ["陆玖", "5003室多面孔伪人小姐，性格多变，真实面貌不可知。"],

  // 墨水夜
  "墨水夜": ["墨水夜", "槐安公寓水池中的水制伪人，以史莱姆为食。"],

  // 多虫种群
  "多虫": ["种群档案：多虫", "诞生于「巢穴」的敌对种群，会寄生活体生物。"],

  // 人魈种群
  "人魈": ["种群档案：人魈", "诞生于「怪原」的敌对种群，类人形穿戴粗布袍。"],

  // 凝胶种群
  "凝胶": ["种群档案：凝胶", "诞生于「随心」的凝胶状种群，具腐蚀性。"],

  // 烛灯
  "烛灯": ["「烛灯」", "揭秘人最后成员，在论坛发帖帮助人类与伪人打交道。"],

  // 绫份
  "绫份": ["绫份", "代号白夜叉，17岁格斗术大师，精通多种流派。"],
  "白夜叉": ["绫份", "代号白夜叉，17岁格斗术大师，精通多种流派。"],

  // 灼玥
  "灼玥": ["灼玥", "27岁金发金瞳独立调查员，持伪物长剑「反叛」。"],

  // 白桦
  "白桦": ["白桦", "对伪课副课长，实力强悍，使用重型长柄锤。"],

  // 斯汀
  "斯汀": ["斯汀先生", "ABSC人类职员，接触伪人最多，年龄超限。"],
  "斯汀先生": ["斯汀先生", "ABSC人类职员，接触伪人最多，年龄超限。"],

  // 艾尔伯特
  "艾尔伯特": ["艾尔伯特·帕拉索", "首位多次自主进入里界的人类先驱，建立ABSC。"],
  "艾尔伯特·帕拉索": ["艾尔伯特·帕拉索", "首位多次自主进入里界的人类先驱，建立ABSC。"],

  // 西瓜人
  "西瓜人": ["西瓜人", "4580岁，对成为人类有执念，西瓜公司董事长。"],
  "西瓜公司": ["西瓜人", "4580岁，对成为人类有执念，西瓜公司董事长。"],

  // 赫卡忒
  "赫卡忒": ["赫卡忒", "亚契创造的仿生人，炭黑色皮肤四臂无眼。"],
  "Hecate": ["赫卡忒", "亚契创造的仿生人，炭黑色皮肤四臂无眼。"],

  // Cipher
  "Cipher": ["Cipher", "白墟之地勘测者，擅长捕捉规则波动，编号RSW-07。"],
  "月蚀鸢尾": ["Cipher", "白墟之地勘测者，编号RSW-07月蚀鸢尾。"],

  // 阿秋
  "阿秋": ["阿秋", "12岁人监成员，能力为气味图书馆和危险预警。"],
  "啊秋": ["阿秋", "12岁人监成员，能力为气味图书馆和危险预警。"],

  // 鸿
  "鸿": ["鸿", "114514岁编辑记者，能力为在任何时空开门。"],

  // 梦城寺
  "梦城寺": ["梦城寺绫希", "不知从何而生的伪人，能潜入意识世界。"],
  "梦城寺绫希": ["梦城寺绫希", "不知从何而生的伪人，能潜入意识世界。"],
  "Ayaki": ["梦城寺绫希", "不知从何而生的伪人，能潜入意识世界。"],
  "Mushiroji": ["梦城寺绫希", "不知从何而生的伪人，能潜入意识世界。"],

  // 瓦莉奥尔
  "瓦莉奥尔": ["瓦莉奥尔·阿亚奇", "平和的战斗者，西陆伪神，能将想象武器实体化。"],
  "瓦莉奥尔·阿亚奇": ["瓦莉奥尔·阿亚奇", "平和的战斗者，西陆伪神，能将想象武器实体化。"],
  "Walior": ["瓦莉奥尔·阿亚奇", "平和的战斗者，西陆伪神，能将想象武器实体化。"],

  // 瘟疫医生
  "瘟疫医生": ["【瘟疫的病主】医生？", "古老伪人，形象近似中世纪瘟疫医生。"],
  "医生": ["【瘟疫的病主】医生？", "古老伪人，形象近似中世纪瘟疫医生。"],
  "疫病区": ["【瘟疫的病主】医生？", "古老伪人，与「大瘟疫」事件密切相关。"],
};

// ===== 精确匹配函数 =====
// resolveName(input) → { canonicalName, info, region, type, match } | null
function resolveName(input) {
  if (!input || !input.trim()) return null;
  const q = input.trim();

  // 1. 精确匹配 CHARDB 中的规范名称
  if (CHARDB[q]) {
    const c = CHARDB[q];
    return { canonicalName: q, info: c.desc, region: c.region, type: c.type, match: 'exact' };
  }

  // 2. 精确匹配别名
  if (CHARDB_ALIASES[q]) {
    const [name, desc] = CHARDB_ALIASES[q];
    const c = CHARDB[name];
    return { canonicalName: name, info: c ? c.desc : desc, region: c ? c.region : '未知', type: c ? c.type : '未知', match: 'alias' };
  }

  // 3. 模糊匹配别名（输入包含别名 或 别名包含输入）
  for (const alias in CHARDB_ALIASES) {
    if (alias.includes(q) || q.includes(alias)) {
      const [name, desc] = CHARDB_ALIASES[alias];
      const c = CHARDB[name];
      return { canonicalName: name, info: c ? c.desc : desc, region: c ? c.region : '未知', type: c ? c.type : '未知', match: 'fuzzy', alias: alias };
    }
  }

  // 4. 模糊匹配规范名称
  for (const name in CHARDB) {
    if (name.includes(q) || q.includes(name)) {
      const c = CHARDB[name];
      return { canonicalName: name, info: c.desc, region: c.region, type: c.type, match: 'fuzzy' };
    }
  }

  return null;
}


// ==============================
// INTEGRATED: geo_system.js
// ==============================
/**
 * 里界人生模拟器 — 地域系统与角色分布表
 * ==========================================
 * 用途：为AI推演引擎提供地域划分、角色归属、地理约束等信息
 *
 * 地域说明：
 *   - 地域名对用户可见（如「渊」），原型仅为内部参考
 *   - 角色根据 worlddata.json 中「所属」字段归入对应地域
 *   - 「所属」为 null 或模糊的角色标记为 'unassigned'
 *   - 自由联盟为新增地域，包含原创美式恐怖风格角色
 */

// ============================================================
// 地域定义
// ============================================================
const REGIONS = {

  // ---------- 渊（原型：上海）—— 中式现代都市 ----------
  '渊': {
    proto: '上海',
    desc: '中式现代都市，灯火辉煌的不夜之城。这里是里界与表界交汇最为频繁的区域，槐安公寓、非常电影院等哨站均坐落于此。人类与伪人在此微妙共存，黎守治安警署维持着脆弱的秩序。',
    vibe: '中式现代都市',
    locations: [
      '槐安公寓',       // 最大里界出入口，伪人聚落核心
      '非常电影院',     // 最大哨站，特殊调查业务
      '花园餐厅INFUSION', // 绿洲分部，餐饮+栽培+博物馆
      '黎守治安警署（分部）',
      '天风阁',         // 里界中转站，地下室通往槐安公寓
      '茶居公寓',       // 渊南部湾龙市，传闻有-9楼无人层
      '鸟姐大排档',     // 折纸簌鸟经营的哨站
      '黑市',
      '地下溶洞',       // 已知世界最大里界入口（宽40m，高9m）
      '普通社区',
      '学校',
      '街道',
      '海岸线',         // 汐&涟出没的海域
    ],
    characters: [
      // 槐安公寓核心
      '营长',
      '非常玦蝶 （二营长）',
      '化而为',
      '独允',
      '西瓜人',
      'X',
      '小赤帽',
      '笑颜',
      '陆玖（只是个编号）',
      '石测',
      '松下·拉尔',
      '江安',
      'C.',
      '菲洛维尔（Felovyre）',
      '涂改（Tipp-Ex）',
      '云蓝',
      '墨水夜',
      '阴暗邪恶大夜夜',
      '伽纳罗丝',
      // 非常电影院
      '单先生',
      '虫者',
      // 花园餐厅 INFUSION
      '亚契·谜思/咔哒小姐',
      '荆千棘',
      '赫卡忒（Hecate）',
      // 其他哨站
      '折纸簌鸟',
      // 特殊存在
      '特洛菲&洛洛',
      '【瘟疫的病主】医生？',
      '汐&涟',
      'Cipher',
      // 公寓内游离角色
      '无名卿',
      '伊露',
      '春山抚子（伪抚）',
      // "烛灯"——揭秘人最后成员，论坛活跃于渊
      '烛灯',
    ],
    geoConstraint: '渊是故事的主舞台。绝大多数核心角色常驻于此，事件应优先在渊的地点中展开。渊的角色一般不离开渊，除非有明确的跨地域任务（如ABSC调查、灯塔交流等）。',
  },

  // ---------- 渊东共和国（原型：日本）—— 群岛国家 ----------
  '渊东共和国': {
    proto: '日本',
    desc: '由多个岛屿组成的群岛国家，以航运和轻工业见长。与渊关系密切，是重要的贸易伙伴和里界探索中转站。境内建有多个哨站和官方/非官方机构，对伪人采取相对宽容的政策。',
    vibe: '群岛国家·和风现代',
    locations: [
      '鸣神群岛',         // 首都圈，政治经济中心
      '神隐车站',         // 著名哨站，里界探索者集散地
      '灯塔渊东分校',     // 伪人社会化教育分校
      '渊东边境哨站',     // 与渊接壤的联合哨站
      '沉船湾',           // 航运枢纽，也是里界入口高发区
      '轻工业带',         // 渊东制造业核心区
      '海渊研究所',       // 民间里界研究机构
    ],
    characters: [
      // 以下为原创角色（填充渊东共和国地域空白）
      '雾隐千夏',
      '海坊主',
      '月读命',
    ],
    geoConstraint: '渊东共和国的角色主要活跃于群岛地区。与渊有频繁的贸易和人员往来，但渊东本地角色不会无故出现在渊的日常事件中。跨地域事件需通过新闻、委托或角色移动来合理化。',
  },

  // ---------- 西陆联盟（原型：中世纪欧盟）—— 宗教国度 ----------
  '西陆联盟': {
    proto: '中世纪欧盟',
    desc: '西幻宗教风格的国度，由教会为基础组建。伪神与人类"和平共处"，足够强大的伪人会被教廷供奉为"神明"。教廷是协调各伪神派系的中立机构，暗地里伪神与教廷的博弈从未停止。在普通人眼中，西陆只是一个风景优美的旅游联盟。',
    vibe: '西幻宗教国度·中世纪遗风',
    locations: [
      '教廷总部',         // 伪神派系协调中枢
      '圣使教大教堂',     // AT掌管"奇迹"的教派总部
      '圣都梵蒂冈尼亚',   // 教廷所在地
      '济世者派系驻地',   // 福音的派系
      '静谧织命者神殿',   // Joschmitt的派系
      '手与剑之乡',       // 汉兹安索德信徒的地下组织
      '西陆边境线',       // 与赤红新星对峙的军事防线
      '中世纪古城群',     // 旅游业发达的历史名城
    ],
    characters: [
      'Ιππότης(希庇安)',
      'Αθάνατο(安布罗斯)',
      'AT(Albert Palazzo)',
      'Evangelium.福音',
      'Joschmitt.（约斯米特）',
      '瓦莉奥尔·阿亚奇',
    ],
    geoConstraint: '西陆联盟的角色几乎全部与伪神、教廷或派系相关。他们的活动范围局限于西陆联盟境内，尤其是教廷总部和各大神殿。与赤红新星处于对立状态，边境常年驻军。西陆角色不会出现在渊的日常事件中，除非涉及跨国外交（如福音驻扎西陆-赤星边境线进行外交）。',
  },

  // ---------- 赤红新星（原型：苏联）—— 工业强国 ----------
  '赤红新星': {
    proto: '苏联',
    desc: '社会主义工业强国，拥有世界顶尖的重工业体系和军事力量。与渊保持深度战略合作，与西陆联盟处于对立状态。全民高中教育全覆盖，文化以共产主义教育和苏式先锋派艺术为主。边境常年驻守至少4个集团军。',
    vibe: '苏式工业强国·硬核科幻',
    locations: [
      '赤共中央大楼',       // 政治权力中心
      '重工业带',           // 世界顶级军工生产线
      '边境防线',           // 与西陆联盟对峙的军事屏障
      '太空截击系统基地',   // 战略防御设施
      '灯塔赤星校区',       // 伪人教育分校
      'ОАЗИС沙漠总部',     // 绿洲总部（位于赤星与渊交界的沙漠绿洲中）
      '先锋艺术中心',       // 苏式结构主义艺术展示
    ],
    characters: [
      'Эдельвейс',
    ],
    geoConstraint: '赤红新星的角色主要活动于本国境内。与渊有战略合作关系，因此赤星角色可能与渊角色有联合行动。与西陆联盟对立，绝不与西陆角色和平接触。ОАЗИС沙漠总部位于赤星与渊交界处，是一个跨地域的中立地带。',
  },

  // ---------- 自由联盟（原型：哥谭/美国）—— 美式恐怖 ----------
  '自由联盟': {
    proto: '哥谭/美国',
    desc: 'NEW！自由联盟是一个风格类似哥谭市的美式恐怖地域。霓虹灯与阴影交织的都市中，伪人的威胁更加隐蔽而恐怖——它们不一定是怪物，可能是你的邻居、邮递员、甚至镜子里的倒影。这里是独立调查员、自由猎人和无归属者的聚集地。伪人是美式恐怖原型：瘦长人形、电波异象、剥皮模仿者……',
    vibe: '哥谭式美式恐怖·霓虹与阴影',
    locations: [
      '鸿的报社',           // 自由情报中心
      '霓虹大道',           // 繁华而危险的市中心
      '阿卡姆疯人院遗址',   // 废弃的精神病院，里界高发区
      '第13号公路',         // 传说中的闹鬼公路
      '黑水镇',             // 边境小镇，猎人公会分部
      '暗影剧院',           // 独立伪人表演场所
      '无人街',             // 午夜后空无一人的商业街
      '废弃游乐园',         // 里界入口，传说有不可名状之物
    ],
    characters: [
      // 来自worlddata.json中"所属"为"自由"的角色
      '绫份',
      '灼玥',
      '长喙',
      '冷寂',
      // 原创美式恐怖角色
      '瘦长先生',
      '电波头',
      '剥皮人',
    ],
    geoConstraint: '自由联盟是独立者和流浪者的家园。这里的角色通常不属于任何官方组织，行动更加自由但也更加危险。自由联盟的美式恐怖风格使其事件更加个人化和心理化。自由联盟角色不会无故出现在其他地域，但猎人绫份和调查员灼玥可能接受跨地域委托。',
  },
};

// ============================================================
// 角色 → 地域映射表
// ============================================================
const CHAR_REGIONS = {
  // —— 渊 ——
  '营长': '渊',
  '非常玦蝶 （二营长）': '渊',
  '化而为': '渊',
  '独允': '渊',
  '西瓜人': '渊',
  'X': '渊',
  '小赤帽': '渊',
  '笑颜': '渊',
  '陆玖（只是个编号）': '渊',
  '石测': '渊',
  '松下·拉尔': '渊',
  '江安': '渊',
  'C.': '渊',
  '菲洛维尔（Felovyre）': '渊',
  '涂改（Tipp-Ex）': '渊',
  '云蓝': '渊',
  '墨水夜': '渊',
  '阴暗邪恶大夜夜': '渊',
  '伽纳罗丝': '渊',
  '单先生': '渊',
  '虫者': '渊',
  '亚契·谜思/咔哒小姐': '渊',
  '荆千棘': '渊',
  '赫卡忒（Hecate）': '渊',
  '折纸簌鸟': '渊',
  '特洛菲&洛洛': '渊',
  '【瘟疫的病主】医生？': '渊',
  '汐&涟': '渊',
  'Cipher': '渊',
  '无名卿': '渊',
  '伊露': '渊',
  '春山抚子（伪抚）': '渊',
  '烛灯': '渊',

  // —— 渊东共和国（原创角色） ——
  '雾隐千夏': '渊东共和国',
  '海坊主': '渊东共和国',
  '月读命': '渊东共和国',

  // —— 西陆联盟 ——
  'Ιππότης(希庇安)': '西陆联盟',
  'Αθάνατο(安布罗斯)': '西陆联盟',
  'AT(Albert Palazzo)': '西陆联盟',
  'Evangelium.福音': '西陆联盟',
  'Joschmitt.（约斯米特）': '西陆联盟',
  '瓦莉奥尔·阿亚奇': '西陆联盟',

  // —— 赤红新星 ——
  'Эдельвейс': '赤红新星',

  // —— 自由联盟 ——
  '绫份': '自由联盟',
  '灼玥': '自由联盟',
  '长喙': '自由联盟',
  '冷寂': '自由联盟',
  '瘦长先生': '自由联盟',
  '电波头': '自由联盟',
  '剥皮人': '自由联盟',
};

// ============================================================
// 无归属 / 跨地域 / 特殊角色（供AI推演参考）
// ============================================================
const UNASSIGNED_OR_SPECIAL = {
  // 所属为 null 或模糊的角色
  '温塔莎▪克林斯曼': '暂无所属/行踪不明 —— 基质-0聚合体，行踪不定，可能出现在任何地域',
  '圣地亚哥▪梅尔维尔\n"渔夫"': '无所属 —— 渔夫形象，出没于风暴海等海域，不受地域限制',
  '『我深深的破碎』': '无所属 —— 方块构成的女孩，漫无目的游荡，可能出现在任何街道',
  '拟人蝎': '巢穴/在表界极少分布 —— 广泛但稀少的种群，可出现在任何地域的废弃建筑中',
  '种群档案：多虫': '巢穴/在表界广泛分布 —— 主要敌对种群，可出现在任何地域',
  '种群档案：人魈': '怪原/在表界广泛分布 —— 主要敌对种群，可出现在任何地域',
  '种群档案：凝胶': '随心/在表界较少分布 —— 敌对种群，多在污染区域出没',
  '阿秋': '人监 —— 人监之口的成员，可能随特洛菲&洛洛出现在任何地域',
  '梦城寺绫希': '？？？ —— 游走在里界的神秘伪人，不受地域约束',
  '海德拉（Hydra）': '无所属 —— 水银聚合体，可能出现在任何有化工设施的地方',
  '兔仙': '无所属 —— 茶居公寓楼长，位于渊南部湾龙市',
  '红缇香': '无所属 —— 清末配阴婚的伪人，中式背景，可能出现在渊',
  '牺牲': '无所属 —— 古祭之"牺"，祭司/屠户相，可能在任何有祭祀传统的地方',
  '绫份': '自由联盟（原属槐安公寓/自由，现归入自由联盟）',
};

// ============================================================
// 跨地域关系（用于AI推演时的合理性判断）
// ============================================================
const REGION_RELATIONS = {
  '渊-渊东共和国': { relation: '盟友', desc: '贸易伙伴，人员往来频繁，联合里界探索' },
  '渊-赤红新星':   { relation: '战略合作', desc: '深度战略合作，灯塔双校区驻军' },
  '渊-西陆联盟':   { relation: '中立', desc: '外交关系正常，但意识形态差异大' },
  '渊-自由联盟':   { relation: '松散', desc: '独立者往来，无官方关系' },
  '渊东共和国-西陆联盟': { relation: '中立', desc: '有贸易往来，无特殊关系' },
  '渊东共和国-赤红新星': { relation: '中立', desc: '有限的贸易关系' },
  '渊东共和国-自由联盟': { relation: '无', desc: '几乎无往来' },
  '西陆联盟-赤红新星':   { relation: '敌对', desc: '边境常年驻军4个集团军，意识形态对立' },
  '西陆联盟-自由联盟':   { relation: '无', desc: '几乎无往来' },
  '赤红新星-自由联盟':   { relation: '无', desc: '几乎无往来' },
};

// ============================================================
// 辅助函数
// ============================================================

/**
 * 根据角色名获取其所属地域
 */
function getCharacterRegion(name) {
  return CHAR_REGIONS[name] || 'unassigned';
}

/**
 * 获取某地域的所有角色
 */
function getRegionCharacters(regionName) {
  const region = REGIONS[regionName];
  return region ? region.characters : [];
}

/**
 * 获取某地域的所有地点
 */
function getRegionLocations(regionName) {
  const region = REGIONS[regionName];
  return region ? region.locations : [];
}

/**
 * 判断两个地域之间的关系
 */
function getRegionRelation(regionA, regionB) {
  const key1 = `${regionA}-${regionB}`;
  const key2 = `${regionB}-${regionA}`;
  return REGION_RELATIONS[key1] || REGION_RELATIONS[key2] || { relation: '未知', desc: '无已知关系' };
}

/**
 * 判断角色出现在某地域是否合理
 * @returns {object} { reasonable: boolean, reason: string }
 */
function isCharacterInRegionReasonable(charName, regionName) {
  const charRegion = CHAR_REGIONS[charName];

  if (!charRegion || charRegion === 'unassigned') {
    return { reasonable: true, reason: `${charName} 无固定归属，可出现在任何地域` };
  }

  if (charRegion === regionName) {
    return { reasonable: true, reason: `${charName} 常驻${charRegion}` };
  }

  const rel = getRegionRelation(charRegion, regionName);
  if (rel.relation === '盟友' || rel.relation === '战略合作') {
    return { reasonable: true, reason: `${charRegion}与${regionName}为${rel.relation}关系，${charName}可能因任务/交流出现在${regionName}` };
  }

  if (rel.relation === '敌对') {
    return { reasonable: false, reason: `${charRegion}与${regionName}处于敌对状态，${charName}出现在${regionName}需要特殊理由（如秘密潜入）` };
  }

  return {
    reasonable: false,
    reason: `${charName} 常驻${charRegion}，出现在${regionName}需要通过新闻、小道消息、委托或角色移动来合理化`
  };
}


// ==============================
// INTEGRATED: lifecycle.js
// ==============================
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
  '营长': '渊',
  '安诺涅': '渊',
  '楼长': '渊',
  '无名': '渊',
  'Anonymous': '渊',
  'anonymous': '渊',
  '非常玦蝶': '渊',
  '站长': '渊',
  '二营长': '渊',
  '化而为': '渊',
  '史莱姆': '渊',
  '西瓜人': '渊',
  'X': '渊',
  '093': '渊',
  '独允': '渊',
  '铜发红眼': '渊',
  '亚契·谜思': '错位花园→渊',
  '炼金术师': '错位花园→渊',
  '温塔莎·克林斯曼': '西陆联盟',
  '荆千棘': '错位花园→渊',
  '赫卡忒': '错位花园→渊',
  '特洛菲': '人监→渊',
  '洛洛': '人监→渊',
  '瘟疫医生': '未知→渊',
  '汐': '渊(海域)',
  '涟': '渊(海域)',
  '圣地亚哥·梅尔维尔': '未知→渊',
  '渔夫': '未知→渊',
  '拟人蝎': '巢穴→未知',
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
      // 如果包含"→"说明是从某地迁移到渊
      if (origin.includes('→')) {
        const parts = origin.split('→');
        return {
          origin: parts[0].trim(),
          current: parts[1].trim(),
          display: origin
        };
      }
      return {
        origin: origin,
        current: origin,
        display: origin
      };
    }
    // 已知角色但无明确出生地记录，默认渊
    return {
      origin: '渊',
      current: '渊',
      display: '渊（角色默认）'
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

  // 自定义角色 - 使用人类生命周期
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



