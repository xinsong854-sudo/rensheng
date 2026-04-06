/**
 * 辛秘系统 - Secrets Module
 * 处理高权限用户的辛秘内容显示和资料弹窗
 */

// 辛秘系统配置
const SecretsConfig = {
    // 用户权限级别：low, medium, high, max
    userPermission: 'high',
    // 需要高权限才能查看辛秘
    requiredPermission: 'high'
};

// 辛秘数据
const SecretsData = [
    {
        id: 'secret1',
        title: '第一则辛秘',
        icon: '✨',
        content: '在这个世界的深处，隐藏着十二个古老的魔法阵，它们维系着元素的平衡。',
        loreType: 'magic',
        loreLabel: '魔法体系资料'
    },
    {
        id: 'secret2',
        title: '第二则辛秘',
        icon: '🌙',
        content: '每当双月重合之时，通往异界的门户将会开启，但只有被选中者才能看见。',
        loreType: 'gates',
        loreLabel: '异界之门资料'
    },
    {
        id: 'secret3',
        title: '第三则辛秘',
        icon: '⚔️',
        content: '传说中的七把圣剑散落在世界各地，每一把都蕴含着超越凡人的力量。',
        loreType: 'weapons',
        loreLabel: '圣剑资料'
    }
];

// 世界观资料数据
const LoreData = {
    'worldview': {
        title: '🌍 世界观概览',
        content: `
            <h3>世界背景</h3>
            <p>这是一个魔法与科技并存的世界，古老的文明遗迹与现代都市交相辉映。</p>
            <h3>主要势力</h3>
            <p>• 魔法议会：掌控着大陆魔法力量的神秘组织</p>
            <p>• 联邦政府：管理着主要城市的现代政权</p>
            <p>• 自由联盟：由冒险者和佣兵团组成的松散联盟</p>
            <h3>地理分布</h3>
            <p>大陆被分为五个主要区域：中央平原、北方冰原、南方群岛、东方山脉和西方荒漠。</p>
        `
    },
    'magic': {
        title: '🔮 魔法体系',
        content: `
            <h3>魔法分类</h3>
            <p>• 元素魔法：火、水、风、土四大基础元素</p>
            <p>• 神圣魔法：治疗与净化的力量</p>
            <p>• 暗影魔法：操控阴影与心灵</p>
            <p>• 时空魔法：最稀有的高阶魔法</p>
            <h3>魔法等级</h3>
            <p>学徒 → 法师 → 大法师 → 魔导师 → 圣魔导师</p>
            <h3>施法媒介</h3>
            <p>大多数法师需要借助法杖、魔导书或魔法阵来施放强力法术。</p>
        `
    },
    'gates': {
        title: '🌀 异界之门',
        content: `
            <h3>门户类型</h3>
            <p>• 稳定之门：永久存在的固定传送门</p>
            <p>• 流星之门：周期性出现的临时门户</p>
            <p>• 血脉之门：只有特定血统才能开启</p>
            <h3>已知异界</h3>
            <p>• 元素界：纯粹元素构成的位面</p>
            <p>• 幻灵界：精神与梦境的世界</p>
            <p>• 深渊界：充满危险生物的黑暗领域</p>
            <h3>穿越风险</h3>
            <p>未经训练的穿越者可能会在异界迷失，或被异界生物侵蚀心智。</p>
        `
    },
    'weapons': {
        title: '⚔️ 传说圣剑',
        content: `
            <h3>七圣剑列表</h3>
            <p>• 烈焰之剑：掌控不灭之火</p>
            <p>• 寒冰之剑：冻结万物</p>
            <p>• 雷霆之剑：召唤天雷</p>
            <p>• 大地之剑：撼动山脉</p>
            <p>• 光明之剑：驱散黑暗</p>
            <p>• 暗影之剑：隐匿无形</p>
            <p>• 生命之剑：治愈万物</p>
            <h3>获得条件</h3>
            <p>每把圣剑都有自己的意志，只有被选中者才能拔出。</p>
            <h3>圣剑力量</h3>
            <p>完全觉醒的圣剑可以改变战局，但过度使用会消耗持有者的生命力。</p>
        `
    }
};

/**
 * 检查用户权限并显示/隐藏辛秘区域
 */
function checkSecretPermission() {
    const secretSection = document.getElementById('secretSection');
    const secretLock = document.getElementById('secretLock');
    
    if (!secretSection || !secretLock) {
        console.warn('辛秘区域元素未找到');
        return;
    }
    
    const hasPermission = SecretsConfig.userPermission === 'high' || SecretsConfig.userPermission === 'max';
    
    if (hasPermission) {
        secretSection.classList.add('show');
        secretLock.style.display = 'none';
        loadSecretContent();
    } else {
        secretSection.classList.remove('show');
        secretLock.style.display = 'block';
    }
}

/**
 * 加载辛秘内容
 */
function loadSecretContent() {
    const secretContent = document.getElementById('secretContent');
    if (!secretContent) return;
    
    const randomSecret = SecretsData[Math.floor(Math.random() * SecretsData.length)];
    secretContent.innerHTML = `
        <p>${randomSecret.icon} <span class="secret-highlight">${randomSecret.title}</span>：${randomSecret.content}</p>
        <p>点击<span class="special-link" data-lore-type="${randomSecret.loreType}" onclick="showLoreModal('${randomSecret.loreType}')">${randomSecret.loreLabel}</span>了解详情。</p>
    `;
}

/**
 * 显示资料弹窗
 * @param {string} type - 资料类型
 */
function showLoreModal(type) {
    const modalOverlay = document.getElementById('loreModalOverlay');
    const modalTitle = document.getElementById('loreModalTitle');
    const modalContent = document.getElementById('loreModalContent');
    
    if (!modalOverlay || !modalTitle || !modalContent) {
        console.error('资料弹窗元素未找到');
        return;
    }
    
    const data = LoreData[type] || LoreData['worldview'];
    modalTitle.textContent = data.title;
    modalContent.innerHTML = data.content;
    modalOverlay.classList.add('show');
}

/**
 * 关闭资料弹窗（点击遮罩）
 * @param {Event} event - 点击事件
 */
function closeLoreModal(event) {
    if (event.target === event.currentTarget) {
        const modalOverlay = document.getElementById('loreModalOverlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('show');
        }
    }
}

/**
 * 关闭资料弹窗（点击关闭按钮）
 */
function closeLoreModalBtn() {
    const modalOverlay = document.getElementById('loreModalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
    }
}

/**
 * 初始化特殊链接点击处理
 */
function initSpecialLinks() {
    document.addEventListener('click', function(event) {
        const specialLink = event.target.closest('.special-link');
        if (specialLink) {
            const loreType = specialLink.getAttribute('data-lore-type');
            if (loreType) {
                event.preventDefault();
                showLoreModal(loreType);
            }
        }
    });
}

/**
 * 设置用户权限（供外部调用）
 * @param {string} permission - 权限级别
 */
function setUserPermission(permission) {
    SecretsConfig.userPermission = permission;
    checkSecretPermission();
}

/**
 * 获取当前权限级别
 * @returns {string} 权限级别
 */
function getUserPermission() {
    return SecretsConfig.userPermission;
}

/**
 * 初始化辛秘系统
 */
function initSecrets() {
    // 初始化权限检查
    checkSecretPermission();
    // 初始化特殊链接处理
    initSpecialLinks();
    // 添加 ESC 键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLoreModalBtn();
        }
    });
}

// 导出函数（供外部模块使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SecretsConfig,
        SecretsData,
        LoreData,
        checkSecretPermission,
        loadSecretContent,
        showLoreModal,
        closeLoreModal,
        closeLoreModalBtn,
        initSpecialLinks,
        setUserPermission,
        getUserPermission,
        initSecrets
    };
}

// 自动初始化（当 DOM 加载完成后）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSecrets);
} else {
    initSecrets();
}
