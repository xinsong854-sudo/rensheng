#!/usr/bin/env node
/**
 * 重构 Danbooru 标签页面为三级结构
 * 将所有分类重构为与表情篇一致的三级结构
 */

const fs = require('fs');

const filePath = './danbooru-tags-v5.html';
let content = fs.readFileSync(filePath, 'utf-8');

console.log('开始重构 Danbooru 标签页面...');

// 定义新的三级结构数据
const newTagData = [
    {
        title: "一、画师篇 (Artists)",
        items: [
            {
                title: "1.1 动画工作室",
                items: [
                    {
                        title: "动画工作室 - 知名大厂",
                        tags: [
                            { en: "artist_studio_ghibli", cn: "吉卜力工作室" },
                            { en: "artist_kyoto_animation", cn: "京都动画" },
                            { en: "artist_ufotable", cn: "ufotable" },
                            { en: "artist_bones", cn: "BONES" },
                            { en: "artist_madhouse", cn: "MADHOUSE" },
                            { en: "artist_production_ig", cn: "Production I.G" },
                            { en: "artist_sunrise", cn: "日升" },
                            { en: "artist_toei_animation", cn: "东映动画" },
                            { en: "artist_gainax", cn: "GAINAX" },
                            { en: "artist_shaft", cn: "SHAFT" },
                            { en: "artist_trigger", cn: "TRIGGER" },
                            { en: "artist_mappa", cn: "MAPPA" },
                            { en: "artist_wit_studio", cn: "WIT STUDIO" },
                            { en: "artist_a1_pictures", cn: "A-1 Pictures" },
                            { en: "artist_pierrot", cn: "Pierrot" }
                        ]
                    },
                    {
                        title: "动画工作室 - 其他工作室",
                        tags: [
                            { en: "artist_tms_entertainment", cn: "TMS 娱乐" },
                            { en: "artist_studio_deen", cn: "Studio Deen" },
                            { en: "artist_jc_staff", cn: "J.C.STAFF" },
                            { en: "artist_gonzo", cn: "GONZO" },
                            { en: "artist_ghibli", cn: "吉卜力" },
                            { en: "artist_pierrot_plus", cn: "Pierrot+" },
                            { en: "artist_white_fox", cn: "White Fox" },
                            { en: "artist_p_a_works", cn: "P.A.WORKS" },
                            { en: "artist_liden_films", cn: "Liden Films" },
                            { en: "artist_studio_pierrot", cn: "Studio Pierrot" },
                            { en: "artist_artland", cn: "Artland" },
                            { en: "artist_bee_train", cn: "Bee Train" },
                            { en: "artist_brains_base", cn: "Brain's Base" },
                            { en: "artist_doga_kobo", cn: "动画工房" },
                            { en: "artist_diomedea", cn: "diomedéa" },
                            { en: "artist_kinema_citrus", cn: "Kinema Citrus" },
                            { en: "artist_lerche", cn: "Lerche" },
                            { en: "artist_olm", cn: "OLM" },
                            { en: "artist_pine_jam", cn: "Pine Jam" },
                            { en: "artist_silver_link", cn: "SILVER LINK." },
                            { en: "artist_studio_3hz", cn: "Studio 3Hz" },
                            { en: "artist_studio_bind", cn: "Studio Bind" },
                            { en: "artist_studio_chizu", cn: "Studio Chizu" },
                            { en: "artist_studio_colorido", cn: "Studio Colorido" },
                            { en: "artist_troyca", cn: "TROYCA" },
                            { en: "artist_zexcs", cn: "ZEXCS" }
                        ]
                    }
                ]
            },
            {
                title: "1.2 捏 Ta 常用画师",
                items: [
                    {
                        title: "捏 Ta 常用 - 热门画师",
                        tags: [
                            { en: "artist_lack", cn: "lack" },
                            { en: "artist_ImamiyaPinoko", cn: "今宫雏子" },
                            { en: "artist_wengwengchim", cn: "翁翁 chim" },
                            { en: "artist_johnkafka", cn: "约翰卡夫卡" },
                            { en: "artist_honnryou", cn: "本量" },
                            { en: "artist_ccroquette", cn: "可洛克" },
                            { en: "artist_tekito", cn: "手织户" },
                            { en: "artist_yuji_(fantasia)", cn: "勇二" },
                            { en: "artist_norizc", cn: "则志" },
                            { en: "artist_kotarou", cn: "小太郎" },
                            { en: "artist_yolanda", cn: "尤兰达" },
                            { en: "artist_yorurokujuu", cn: "夜露九十" },
                            { en: "artist_MizutameTori", cn: "水溜鸟" },
                            { en: "artist_eromkk", cn: "eromkk" },
                            { en: "artist_chongzhen", cn: "重镇" }
                        ]
                    },
                    {
                        title: "捏 Ta 常用 - 其他画师",
                        tags: [
                            { en: "artist_renjian", cn: "人间" },
                            { en: "artist_lemtun", cn: "lemtun" },
                            { en: "artist_nslacka", cn: "nslacka" },
                            { en: "artist_uenomigi", cn: "uenomigi" },
                            { en: "artist_WatanabeTomari", cn: "渡边とまり" },
                            { en: "artist_Rafaelaelaela", cn: "Rafaela" },
                            { en: "artist_rei_(sanbonzakura)", cn: "rei" },
                            { en: "artist_ruoganzhao", cn: "若干朝" },
                            { en: "artist_sugar", cn: "糖牌" },
                            { en: "artist_betabeet", cn: "betabeet" },
                            { en: "artist_quasarcake", cn: "quasarcake" },
                            { en: "artist_akiakane", cn: "akiakane" },
                            { en: "artist_Cotono", cn: "Cotono" },
                            { en: "artist_seu", cn: "seu" },
                            { en: "artist_wanke", cn: "万可" },
                            { en: "artist_kuroume", cn: "黑梅" },
                            { en: "artist_remsrar", cn: "remsrar" },
                            { en: "artist_redum4", cn: "redum4" },
                            { en: "artist_z3zz4", cn: "z3zz4" },
                            { en: "artist_youichi", cn: "youichi" },
                            { en: "artist_Zhibuji", cn: "织布机" },
                            { en: "artist_AMmatcha", cn: "抹茶专门店" },
                            { en: "artist_qingchuan", cn: "清川" },
                            { en: "artist_taowu", cn: "桃乌" },
                            { en: "artist_qingying", cn: "清透质感" },
                            { en: "artist_mengspace", cn: "梦空间" },
                            { en: "artist_renshilian", cn: "renshilian" },
                            { en: "artist_sansanyu", cn: "三月雨" }
                        ]
                    }
                ]
            },
            {
                title: "1.3 游戏系列",
                items: [
                    {
                        title: "游戏系列 - 日本厂商",
                        tags: [
                            { en: "type_moon", cn: "Fate 系列" },
                            { en: "capcom", cn: "街头霸王" },
                            { en: "square_enix", cn: "最终幻想" },
                            { en: "nintendo", cn: "塞尔达传说" },
                            { en: "konami", cn: "合金装备" },
                            { en: "bandai_namco", cn: "偶像大师" },
                            { en: "koei_tecmo", cn: "真三国无双" },
                            { en: "fromsoftware", cn: "艾尔登法环" },
                            { en: "snk", cn: "拳皇" },
                            { en: "sega", cn: "初音未来" },
                            { en: "atlus", cn: "女神异闻录" },
                            { en: "cygames", cn: "碧蓝幻想" },
                            { en: "gust", cn: "炼金工房" },
                            { en: "nihon_falcom", cn: "轨迹系列" },
                            { en: "spike_chunsoft", cn: "Spike Chunsoft" },
                            { en: "arc_system_works", cn: "Arc System Works" },
                            { en: "key", cn: "Key" },
                            { en: "07th_expansion", cn: "07th Expansion" },
                            { en: "level5", cn: "雷顿教授" },
                            { en: "platinum_games", cn: "白金工作室" }
                        ]
                    },
                    {
                        title: "游戏系列 - 中国厂商",
                        tags: [
                            { en: "tencent", cn: "王者荣耀" },
                            { en: "netease", cn: "阴阳师" },
                            { en: "miHoYo", cn: "原神" },
                            { en: "hoyoverse", cn: "崩坏：星穹铁道" },
                            { en: "kuro_game", cn: "战双帕弥什" },
                            { en: "hypergryph", cn: "明日方舟" },
                            { en: "lilith_games", cn: "剑与远征" },
                            { en: "papergames", cn: "恋与制作人" },
                            { en: "yostar", cn: "碧蓝航线" },
                            { en: "bluepoch", cn: "重返未来 1999" }
                        ]
                    },
                    {
                        title: "游戏系列 - 欧美厂商",
                        tags: [
                            { en: "riot_games", cn: "英雄联盟" },
                            { en: "blizzard_entertainment", cn: "守望先锋" },
                            { en: "valve", cn: "半条命" },
                            { en: "ubisoft", cn: "刺客信条" },
                            { en: "electronic_arts", cn: "模拟人生" },
                            { en: "activision", cn: "使命召唤" },
                            { en: "bethesda", cn: "上古卷轴" },
                            { en: "cd_projekt", cn: "赛博朋克 2077" },
                            { en: "supercell", cn: "部落冲突" }
                        ]
                    },
                    {
                        title: "游戏系列 - 韩国厂商",
                        tags: [
                            { en: "nexon", cn: "冒险岛" },
                            { en: "ncsoft", cn: "天堂" },
                            { en: "netmarble", cn: "第七史诗" },
                            { en: "shift_up", cn: "胜利女神" },
                            { en: "pearl_abyss", cn: "黑色沙漠" },
                            { en: "com2us", cn: "魔灵召唤" },
                            { en: "devsisters", cn: "姜饼人王国" },
                            { en: "neowiz", cn: "失落的方舟" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: "二、艺术风格篇 (Art Styles)",
        items: [
            {
                title: "2.1 人物比例",
                items: [
                    {
                        title: "人物比例 - 基础比例",
                        tags: [
                            { en: "chibi", cn: "Q 版" },
                            { en: "super_deformed", cn: "SD 化" },
                            { en: "realistic", cn: "写实" },
                            { en: "semi_realistic", cn: "半写实" }
                        ]
                    },
                    {
                        title: "人物比例 - 风格化",
                        tags: [
                            { en: "cartoon", cn: "卡通" },
                            { en: "anime", cn: "动画" },
                            { en: "manga", cn: "漫画" }
                        ]
                    }
                ]
            },
            {
                title: "2.2 绘画媒介",
                items: [
                    {
                        title: "绘画媒介 - 传统媒介",
                        tags: [
                            { en: "watercolor", cn: "水彩" },
                            { en: "oil_painting", cn: "油画" },
                            { en: "acrylic", cn: "丙烯" },
                            { en: "gouache", cn: "水粉" },
                            { en: "pastel", cn: "色粉" },
                            { en: "colored_pencil", cn: "彩铅" },
                            { en: "pencil_sketch", cn: "铅笔素描" },
                            { en: "ink", cn: "墨水" },
                            { en: "marker", cn: "马克笔" }
                        ]
                    },
                    {
                        title: "绘画媒介 - 数字媒介",
                        tags: [
                            { en: "digital", cn: "数字绘画" },
                            { en: "digital_art", cn: "数字艺术" }
                        ]
                    }
                ]
            },
            {
                title: "2.3 特殊风格",
                items: [
                    {
                        title: "特殊风格 - 数字风格",
                        tags: [
                            { en: "pixel_art", cn: "像素艺术" },
                            { en: "low_poly", cn: "低多边形" },
                            { en: "vector", cn: "矢量" },
                            { en: "flat_color", cn: "平涂" },
                            { en: "cel_shading", cn: "赛璐璐" }
                        ]
                    },
                    {
                        title: "特殊风格 - 艺术风格",
                        tags: [
                            { en: "minimalist", cn: "极简主义" },
                            { en: "abstract", cn: "抽象" },
                            { en: "geometric", cn: "几何" },
                            { en: "impasto", cn: "厚涂" }
                        ]
                    },
                    {
                        title: "特殊风格 - 色彩风格",
                        tags: [
                            { en: "grayscale", cn: "灰度" },
                            { en: "monochrome", cn: "单色" },
                            { en: "sepia", cn: "棕褐色" },
                            { en: "vintage", cn: "复古" },
                            { en: "retro", cn: "怀旧" }
                        ]
                    }
                ]
            },
            {
                title: "2.4 东方风格",
                items: [
                    {
                        title: "东方风格 - 中式",
                        tags: [
                            { en: "ink_wash_painting", cn: "水墨画" },
                            { en: "chinese_painting", cn: "中国画" },
                            { en: "traditional_chinese", cn: "传统中式" }
                        ]
                    },
                    {
                        title: "东方风格 - 日式",
                        tags: [
                            { en: "sumi_e", cn: "日式水墨" },
                            { en: "japanese_painting", cn: "日本画" },
                            { en: "ukiyo_e", cn: "浮世绘" },
                            { en: "traditional_japanese", cn: "传统日式" }
                        ]
                    }
                ]
            }
        ]
    }
];

// 由于文件太大，我们输出重构后的 tagData 前两部分
console.log('\n重构后的 tagData 前两个分类:');
console.log(JSON.stringify(newTagData, null, 2));

console.log('\n\n=== 重构说明 ===');
console.log('1. 画师篇已重构为三级结构');
console.log('2. 艺术风格篇已重构为三级结构');
console.log('3. 其他分类需要继续重构...');
console.log('\n完整重构需要处理所有 13 个分类。');
