// 书架功能核心代码 - 通用库
const BOOKSHELF_STORAGE_KEY = 'annuonie_bookshelf';

// 书籍到第一章节的映射（用于书架点击直接阅读）
const BOOK_CHAPTER_MAP = {
    'lingfen': 'chapters/huai_an/lingfen_ch1.html',
    'zhudeng': 'chapters/yuan/zhudeng_ch1.html',
    'huaerwei': 'chapters/yuan/huaerwei_ch1.html'
};

// 获取书籍对应的第一章节链接
function getFirstChapterUrl(book) {
    // 如果有映射的章节，返回章节链接
    if (BOOK_CHAPTER_MAP[book.id]) {
        return BOOK_CHAPTER_MAP[book.id];
    }
    // 否则返回章节索引页
    return 'chapters/index.html';
}

// 默认书籍数据（用于匹配）
const DEFAULT_BOOKS = [
    { id: 'zhudeng', title: '烛灯', subtitle: '揭秘人最后成员', emoji: '🕯️', color: 'linear-gradient(135deg, #ff9a76 0%, #ff6b35 100%)', url: 'books/characters/烛灯.html' },
    { id: 'lingfen', title: '绫份', subtitle: '白夜叉', emoji: '⚔️', color: 'linear-gradient(135deg, #f8b4b0 0%, #e85a71 100%)', url: 'books/characters/绫份.html' },
    { id: 'zhuoyue', title: '灼玥', subtitle: '独立调查员', emoji: '🔥', color: 'linear-gradient(135deg, #ff8c61 0%, #ffb347 100%)', url: 'books/characters/灼玥.html' },
    { id: 'baihua', title: '白桦', subtitle: '对伪课副课长', emoji: '🌲', color: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)', url: 'books/characters/白桦.html' },
    { id: 'siting', title: '斯汀先生', subtitle: 'ABSC 职员', emoji: '🎩', color: 'linear-gradient(135deg, #e0c3fc 0%, #f8e9d8 100%)', url: 'books/characters/斯汀先生.html' },
    { id: 'aierbote', title: '艾尔伯特', subtitle: '人类先驱', emoji: '✨', color: 'linear-gradient(135deg, #a5dee5 0%, #d4b5e8 100%)', url: 'books/characters/艾尔伯特·帕拉索.html' },
    { id: 'yingzhang', title: '营长', subtitle: '论坛管理者', emoji: '👁️', color: 'linear-gradient(135deg, #d4b5e8 0%, #e8d5f2 100%)', url: 'books/pseudohumans/营长.html' },
    { id: 'feichangjuedie', title: '非常玦蝶', subtitle: '二营长', emoji: '🦋', color: 'linear-gradient(135deg, #c3f0db 0%, #f5f5a8 100%)', url: 'books/pseudohumans/非常玦蝶.html' },
    { id: 'huaerwei', title: '化而为', subtitle: '变形者', emoji: '💧', color: 'linear-gradient(135deg, #a8e6cf 0%, #b5d8e8 100%)', url: 'books/pseudohumans/化而为.html' },
    { id: 'wentasha', title: '温塔莎', subtitle: '基质 -0 聚合体', emoji: '🐉', color: 'linear-gradient(135deg, #d4a5e8 0%, #e87ba0 100%)', url: 'books/pseudohumans/温塔莎.html' },
    { id: 'duyun', title: '独允', subtitle: '渊核心 AI', emoji: '🤖', color: 'linear-gradient(135deg, #b5d8e8 0%, #a5c4e8 100%)', url: 'books/pseudohumans/独允.html' },
    { id: 'xiguaren', title: '西瓜人', subtitle: '西瓜公司董事长', emoji: '🍉', color: 'linear-gradient(135deg, #88d8b0 0%, #a8e6cf 100%)', url: 'books/pseudohumans/西瓜人.html' },
    { id: 'x', title: 'X', subtitle: '生骸·X', emoji: '❌', color: 'linear-gradient(135deg, #e85a71 0%, #ff8c61 100%)', url: 'books/pseudohumans/X.html' },
    { id: 'renjian', title: '人监', subtitle: '器官监狱', emoji: '🏛️', color: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)', url: 'books/realms/人监.html' },
    { id: 'cuoweihuayuan', title: '错位花园', subtitle: '植物实验室', emoji: '🌺', color: 'linear-gradient(135deg, #88d8b0 0%, #a8e6cf 100%)', url: 'books/realms/错位花园.html' },
    { id: 'yibingqu', title: '疫病区', subtitle: '瘟疫领域', emoji: '☣️', color: 'linear-gradient(135deg, #7a8b99 0%, #5a6b7c 100%)', url: 'books/realms/疫病区.html' },
    { id: 'fengbaohai', title: '风暴海', subtitle: '无尽海域', emoji: '🌊', color: 'linear-gradient(135deg, #a5dee5 0%, #b5e8f0 100%)', url: 'books/realms/风暴海.html' },
    { id: 'tonghuaguo', title: '童话国', subtitle: '奇幻王国', emoji: '🏰', color: 'linear-gradient(135deg, #e8a5c8 0%, #f5b8d4 100%)', url: 'books/realms/童话国.html' },
    { id: 'xinhu', title: '心湖', subtitle: '时之海', emoji: '💫', color: 'linear-gradient(135deg, #c8b5e8 0%, #e0d5f0 100%)', url: 'books/realms/心湖.html' },
    { id: 'tianfengge', title: '天风阁', subtitle: '里界中转站', emoji: '🏮', color: 'linear-gradient(135deg, #ffb347 0%, #ff8c61 100%)', url: 'books/realms/天风阁.html' },
    { id: 'yongyuandejia', title: '永远的家', subtitle: 'AT 专属里界', emoji: '🏠', color: 'linear-gradient(135deg, #ffd8a8 0%, #ffb385 100%)', url: 'books/realms/永远的家.html' },
    { id: 'yuan', title: '渊', subtitle: '公寓&哨站', emoji: '🏙️', color: 'linear-gradient(135deg, #a5c4e8 0%, #b5d8e8 100%)', url: 'books/organizations/渊.html' },
    { id: 'huaiangongyu', title: '槐安公寓', subtitle: '伪人住所', emoji: '🏢', color: 'linear-gradient(135deg, #dcedc1 0%, #e8f5d8 100%)', url: 'books/organizations/槐安公寓.html' },
    { id: 'lvzhou', title: '绿洲', subtitle: '科研组织', emoji: '🌵', color: 'linear-gradient(135deg, #a8e6cf 0%, #b5e8a5 100%)', url: 'books/organizations/绿洲.html' },
    { id: 'xilulianmeng', title: '西陆联盟', subtitle: '宗教国度', emoji: '⛪', color: 'linear-gradient(135deg, #e8a5c8 0%, #f5b8d4 100%)', url: 'books/organizations/西陆联盟.html' },
    { id: 'absc', title: 'ABSC', subtitle: '调查委员会', emoji: '🔬', color: 'linear-gradient(135deg, #a5dee5 0%, #b5e8f0 100%)', url: 'books/organizations/ABSC.html' }
];

// 获取收藏的书籍
function getBookshelf() {
    const data = localStorage.getItem(BOOKSHELF_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// 保存收藏的书籍
function saveBookshelf(books) {
    localStorage.setItem(BOOKSHELF_STORAGE_KEY, JSON.stringify(books));
}

// 添加书籍到书架
function addToBookshelf(book) {
    const books = getBookshelf();
    const exists = books.some(b => b.id === book.id);
    if (!exists) {
        books.push(book);
        saveBookshelf(books);
        return true;
    }
    return false;
}

// 从书架移除书籍
function removeFromBookshelf(bookId) {
    const books = getBookshelf();
    const filtered = books.filter(b => b.id !== bookId);
    saveBookshelf(filtered);
}

// 检查书籍是否在书架中
function isInBookshelf(bookId) {
    const books = getBookshelf();
    return books.some(b => b.id === bookId);
}

// 根据 ID 查找默认书籍数据
function findBookById(bookId) {
    return DEFAULT_BOOKS.find(b => b.id === bookId);
}

// 切换收藏状态（用于列表页卡片按钮）
function toggleFavorite(btn, id, title, subtitle, icon, url) {
    const books = getBookshelf();
    const index = books.findIndex(b => b.id === id);
    
    if (index === -1) {
        // 添加收藏
        const bookData = findBookById(id) || { id, title, subtitle, emoji: icon, url };
        books.push(bookData);
        saveBookshelf(books);
        btn.textContent = '♥';
        btn.classList.add('active');
        btn.title = '已收藏';
    } else {
        // 取消收藏
        books.splice(index, 1);
        saveBookshelf(books);
        btn.textContent = '♡';
        btn.classList.remove('active');
        btn.title = '加入书架';
    }
}

// 初始化详情页收藏按钮（页面加载时调用）
function initDetailPageFavorite(bookId, bookData) {
    document.addEventListener('DOMContentLoaded', function() {
        const books = getBookshelf();
        const isFavorite = books.some(b => b.id === bookId);
        const btn = document.getElementById('favoriteBtn');
        const icon = document.getElementById('favoriteIcon');
        const text = document.getElementById('favoriteText');
        
        if (isFavorite && btn && icon && text) {
            icon.textContent = '♥';
            text.textContent = '已收藏';
            if (btn) btn.classList.add('active');
        }
        
        // 绑定全局 toggle 函数
        window.toggleFavorite = function() {
            const index = books.findIndex(b => b.id === bookId);
            
            if (index === -1) {
                books.push(bookData);
                saveBookshelf(books);
                if (icon && text) {
                    icon.textContent = '♥';
                    text.textContent = '已收藏';
                }
                if (btn) btn.classList.add('active');
            } else {
                books.splice(index, 1);
                saveBookshelf(books);
                if (icon && text) {
                    icon.textContent = '♡';
                    text.textContent = '加入书架';
                }
                if (btn) btn.classList.remove('active');
            }
        };
    });
}

// 初始化列表页收藏按钮状态（页面加载时调用）
function initListPageFavorites() {
    document.addEventListener('DOMContentLoaded', function() {
        const books = getBookshelf();
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const card = btn.closest('.card');
            const bookData = card.dataset.book;
            if (bookData) {
                const book = JSON.parse(bookData);
                const isFavorite = books.some(b => b.id === book.id);
                if (isFavorite) {
                    btn.textContent = '♥';
                    btn.classList.add('active');
                    btn.title = '已收藏';
                }
            }
        });
    });
}
