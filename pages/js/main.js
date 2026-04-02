// 伪物图鉴主脚本
// 引入辛秘数据和全局变量
const ARTIFACT_SECRETS = window.ARTIFACT_SECRETS || {};
const IDENTITY_KEYWORDS = window.IDENTITY_KEYWORDS || {};
const HIGH_PERMISSION_USERS = window.HIGH_PERMISSION_USERS || [];
const MAX_PERMISSION_USERS = window.MAX_PERMISSION_USERS || [];
const PERMISSION_LEVELS = window.PERMISSION_LEVELS || {};
const CLASS_PERMISSION_MAP = window.CLASS_PERMISSION_MAP || {};
const artifacts = window.artifacts || [];

// 引入资料数据（组织/地区/角色）
const LORE_ORGANIZATIONS = window.LORE_ORGANIZATIONS || {};
const LORE_REGIONS = window.LORE_REGIONS || {};
const LORE_CHARACTERS = window.LORE_CHARACTERS || {};

let currentUser = null;
let currentUserLevel = 'low';
let currentFilter = null;

// 初始化 - 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，开始初始化...');
    
    // 绑定回车键事件
    const usernameInput = document.getElementById('username-input');
    if (usernameInput) {
        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verifyUser();
            }
        });
        // 自动聚焦输入框
        setTimeout(() => usernameInput.focus(), 100);
        console.log('输入框已绑定回车事件');
    }
    
    // 绑定权限验证码输入框的回车事件
    const permissionCodeInput = document.getElementById('permission-code-input');
    if (permissionCodeInput) {
        permissionCodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verifyPermissionCode();
            }
        });
        console.log('权限验证码输入框已绑定回车事件');
    }
    
    // 检查是否已登录（有缓存）
    const savedUser = localStorage.getItem('pseudoArtifactsUser');
    if (savedUser) {
        try {
            const userData = JSON.parse(savedUser);
            currentUser = userData.name;
            currentUserLevel = userData.level;
            console.log('检测到已登录用户:', currentUser, '权限:', currentUserLevel);
            showMainInterface();
        } catch (e) {
            console.error('解析用户数据失败:', e);
            localStorage.removeItem('pseudoArtifactsUser');
        }
    } else {
        console.log('未检测到已登录用户，显示登录界面');
    }
});

// 验证用户身份
function verifyUser() {
    console.log('开始验证用户身份...');
    
    const usernameInput = document.getElementById('username-input');
    if (!usernameInput) {
        console.error('找不到用户名输入框！');
        alert('系统错误：找不到输入框');
        return;
    }
    
    const username = usernameInput.value.trim();
    console.log('输入的用户名:', username);
    
    if (!username) {
        alert('请输入用户名');
        return;
    }
    
    // 别名映射：二营长 = 非常玦蝶
    const normalizedUsername = username === '二营长' ? '非常玦蝶' : username;
    
    // 档案中提到的人名（从 SPECIAL_LINK_PATTERNS.character 提取）
    const archiveCharacters = [
        '安诺涅', '营长', '单先生', '虫者', '长喙', '化而为', '西瓜人', '兔仙', 
        '折纸簌鸟', '白桦', '灼玥', '绫份', '斯汀先生', '亚契·谜思', 
        '梦城寺绫希', '艾尔伯特·帕拉索', '安布罗斯', '希庇安', '福音', 'AT', 
        '无名卿', '因法勒', '云蓝', '约斯米特', '瓦莉奥尔·阿亚奇', '松下·拉尔', 
        '江安', 'C.', 'Эдельвейс', 'Cipher', '非常玦蝶'
    ];
    
    // 楼长 = 营长 = 安诺涅 (同一人，max 权限)
    const maxPermissionAliases = ['楼长', '营长', '安诺涅'];
    
    // 判断权限等级
    let level = 'low';
    
    // 检查 max 权限（模糊匹配：包含即匹配）
    for (const alias of maxPermissionAliases) {
        if (normalizedUsername.includes(alias) || alias.includes(normalizedUsername)) {
            level = 'max';
            console.log('识别为最高权限用户 (匹配:', alias + ')');
            break;
        }
    }
    
    // 检查 high 权限（模糊匹配：包含即匹配）
    if (level !== 'max') {
        // 先检查 MAX_PERMISSION_USERS 和 HIGH_PERMISSION_USERS 数组（模糊匹配）
        for (const maxUser of MAX_PERMISSION_USERS) {
            if (normalizedUsername.includes(maxUser) || maxUser.includes(normalizedUsername)) {
                level = 'max';
                console.log('识别为最高权限用户 (数组匹配:', maxUser + ')');
                break;
            }
        }
        
        if (level !== 'max') {
            for (const highUser of HIGH_PERMISSION_USERS) {
                if (normalizedUsername.includes(highUser) || highUser.includes(normalizedUsername)) {
                    level = 'high';
                    console.log('识别为高权限用户 (数组匹配:', highUser + ')');
                    break;
                }
            }
        }
        
        // 检查档案人物（模糊匹配）
        if (level === 'low') {
            for (const character of archiveCharacters) {
                if (normalizedUsername.includes(character) || character.includes(normalizedUsername)) {
                    level = 'high';
                    console.log('识别为高权限用户 (档案人物:', character + ')');
                    break;
                }
            }
        }
    }
    
    // 默认：普通用户
    if (level === 'low' && username.length > 0) {
        level = 'normal';
        console.log('识别为普通用户');
    }
    
    // 保存用户信息
    currentUser = username;
    currentUserLevel = level;
    localStorage.setItem('pseudoArtifactsUser', JSON.stringify({ name: username, level: level }));
    console.log('用户信息已保存，权限等级:', level);
    
    // 显示主界面
    showMainInterface();
}

// 获取用户身份关键词
function getUserIdentity(username) {
    // 别名映射：二营长 = 非常玦蝶
    const normalizedUsername = username === '二营长' ? '非常玦蝶' : username;
    
    // 检查是否为安诺涅/营长/楼长（管理者）
    const maxPermissionAliases = ['楼长', '营长', '安诺涅'];
    for (const alias of maxPermissionAliases) {
        if (normalizedUsername.includes(alias) || alias.includes(normalizedUsername)) {
            return '管理者';
        }
    }
    
    // 检查 MAX_PERMISSION_USERS 数组（模糊匹配）
    for (const maxUser of MAX_PERMISSION_USERS) {
        if (normalizedUsername.includes(maxUser) || maxUser.includes(normalizedUsername)) {
            return '管理者';
        }
    }
    
    // 检查身份关键词映射（档案人物，模糊匹配）
    for (const [key, identity] of Object.entries(IDENTITY_KEYWORDS)) {
        if (normalizedUsername.includes(key) || key.includes(normalizedUsername)) {
            return identity;
        }
    }
    // 默认身份：未识别用户 → 表界公民
    return '表界公民';
}

// 显示主界面
function showMainInterface() {
    console.log('显示主界面...');
    
    const loginOverlay = document.getElementById('login-overlay');
    const mainContainer = document.getElementById('main-container');
    
    if (!loginOverlay || !mainContainer) {
        console.error('找不到登录界面或主容器！');
        return;
    }
    
    loginOverlay.style.display = 'none';
    mainContainer.style.display = 'block';
    console.log('登录界面已隐藏，主界面已显示');
    
    // 获取用户身份
    const userIdentity = getUserIdentity(currentUser);
    
    // 更新用户信息显示
    const userNameDisplay = document.getElementById('user-name-display');
    const userIdentityDisplay = document.getElementById('user-identity-display');
    const userLevelDisplay = document.getElementById('user-level-display');
    const temporaryBoostBadge = document.getElementById('temporary-boost-badge');
    
    if (userNameDisplay && userIdentityDisplay && userLevelDisplay) {
        userNameDisplay.textContent = currentUser;
        userIdentityDisplay.textContent = `身份：${userIdentity}`;
        const levelInfo = PERMISSION_LEVELS[currentUserLevel];
        userLevelDisplay.textContent = `权限等级：${levelInfo.name}`;
        userLevelDisplay.className = `user-level ${currentUserLevel}`;
        console.log('用户信息显示:', currentUser, '| 身份:', userIdentity, '| 权限:', levelInfo.name);
    }
    
    // 检查是否为临时权限
    const isTemporary = currentUserLevel === 'max' && localStorage.getItem('pseudoArtifactsUser')?.includes('isTemporary');
    
    // 显示/隐藏临时权限标识
    if (temporaryBoostBadge) {
        if (isTemporary) {
            temporaryBoostBadge.style.display = 'inline-block';
            temporaryBoostBadge.textContent = '🔑 临时最高权限';
            console.log('显示临时最高权限标识');
        } else {
            temporaryBoostBadge.style.display = 'none';
        }
    }
    
    // 显示/隐藏权限提升入口
    const permissionBoostEntry = document.getElementById('permission-boost-entry');
    const permissionBoostSection = document.getElementById('permission-boost-section');
    
    // 只有 low 和 normal 权限才显示权限提升入口
    // high 和 max 权限（档案角色）不显示
    if (permissionBoostEntry) {
        if (currentUserLevel === 'low' || currentUserLevel === 'normal') {
            permissionBoostEntry.style.display = 'block';
            if (permissionBoostSection) {
                permissionBoostSection.style.display = 'block';
            }
            console.log('显示权限提升入口');
        } else {
            permissionBoostEntry.style.display = 'none';
            if (permissionBoostSection) {
                permissionBoostSection.style.display = 'none';
            }
        }
    }
    
    // 初始化标签页点击事件
    initTabs();
    console.log('标签页事件已初始化');
}

// 更新分级数量显示
function updateCountDisplay() {
    const counts = {
        safe: artifacts.filter(a => a.class === 'safe').length,
        caution: artifacts.filter(a => a.class === 'caution').length,
        danger: artifacts.filter(a => a.class === 'danger').length,
        hazard: artifacts.filter(a => a.class === 'hazard').length
    };
    
    for (const [cls, count] of Object.entries(counts)) {
        const el = document.getElementById(`count-${cls}`);
        if (el) {
            el.textContent = `(${count})`;
        }
    }
    console.log('分级数量已更新:', counts);
}

// 初始化标签页
function initTabs() {
    // 先更新数量显示
    updateCountDisplay();
    
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;
            const requiredPermission = tab.dataset.permission;
            
            // 检查权限
            if (!hasPermission(requiredPermission)) {
                showPermissionDenied();
                return;
            }
            
            // 切换激活状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 渲染物品
            currentFilter = filter;
            renderArtifacts(filter);
        });
    });
}

// 检查权限
function hasPermission(requiredLevel) {
    const permissionOrder = ['low', 'normal', 'high', 'max'];
    const userIndex = permissionOrder.indexOf(currentUserLevel);
    const requiredIndex = permissionOrder.indexOf(requiredLevel);
    
    return userIndex >= requiredIndex;
}

// 显示权限不足提示
function showPermissionDenied() {
    document.getElementById('permission-denied').style.display = 'flex';
}

// 关闭权限不足提示
function closePermissionDenied() {
    document.getElementById('permission-denied').style.display = 'none';
}

// 显示权限验证弹窗
function showPermissionModal() {
    console.log('显示权限验证弹窗...');
    const modalOverlay = document.getElementById('permission-modal-overlay');
    const codeInput = document.getElementById('permission-code-input');
    const messageDiv = document.getElementById('permission-message');
    
    if (modalOverlay) {
        modalOverlay.style.display = 'flex';
        // 清空之前的消息和输入
        if (messageDiv) {
            messageDiv.className = 'permission-message';
            messageDiv.textContent = '';
        }
        if (codeInput) {
            codeInput.value = '';
            setTimeout(() => codeInput.focus(), 100);
        }
        console.log('权限验证弹窗已显示');
    }
}

// 关闭权限验证弹窗
function closePermissionModal() {
    console.log('关闭权限验证弹窗...');
    const modalOverlay = document.getElementById('permission-modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
        console.log('权限验证弹窗已关闭');
    }
}

// 验证权限代码
function verifyPermissionCode() {
    console.log('开始验证权限代码...');
    const codeInput = document.getElementById('permission-code-input');
    const messageDiv = document.getElementById('permission-message');
    
    if (!codeInput || !messageDiv) {
        console.error('找不到输入框或消息显示区域！');
        return;
    }
    
    const code = codeInput.value.trim();
    console.log('输入的验证码:', code);
    
    if (code === '1062624601') {
        // 验证成功
        console.log('验证码正确，提升权限...');
        messageDiv.className = 'permission-message success';
        messageDiv.textContent = '🔑 临时高级权限';
        
        // 更新权限等级
        currentUserLevel = 'high';
        
        // 更新 localStorage
        if (currentUser) {
            localStorage.setItem('pseudoArtifactsUser', JSON.stringify({ 
                name: currentUser, 
                level: 'high',
                isTemporary: true 
            }));
        }
        
        console.log('权限已更新为 max，localStorage 已更新');
        
        // 延迟刷新页面
        setTimeout(() => {
            console.log('刷新页面以应用新权限...');
            location.reload();
        }, 1500);
    } else {
        // 验证失败
        console.log('验证码错误');
        messageDiv.className = 'permission-message error';
        messageDiv.textContent = '验证失败，请检查输入';
        codeInput.value = '';
        setTimeout(() => codeInput.focus(), 100);
    }
}

// 渲染物品列表
function renderArtifacts(filter) {
    const grid = document.getElementById('artifact-grid');
    const filtered = artifacts.filter(a => a.class === filter);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-results">暂无该分类下的物品</div>';
        return;
    }
    
    grid.innerHTML = filtered.map((artifact, index) => `
        <div class="artifact-card fade-in" style="animation-delay: ${index * 0.05}s" onclick="showArtifact('${artifact.id}')">
            <img class="card-image" src="${artifact.image}" alt="${artifact.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlOGU4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij7mloXmnKw8L3RleHQ+PC9zdmc+'">
            <div class="card-info">
                <div class="card-number">${artifact.id}</div>
                <div class="card-name">${artifact.name}</div>
                <span class="card-class ${artifact.class}">${artifact.class.toUpperCase()}</span>
            </div>
        </div>
    `).join('');
}

// 显示物品详情
function showArtifact(id) {
    const artifact = artifacts.find(a => a.id === id);
    if (!artifact) return;
    
    // 再次检查权限
    const requiredPermission = CLASS_PERMISSION_MAP[artifact.class];
    if (!hasPermission(requiredPermission)) {
        showPermissionDenied();
        return;
    }
    
    document.getElementById('modal-title').textContent = artifact.id;
    document.getElementById('modal-name').textContent = artifact.name;
    document.getElementById('modal-class').textContent = artifact.class.toUpperCase();
    document.getElementById('modal-class').className = `modal-class ${artifact.class}`;
    document.getElementById('modal-location').textContent = artifact.location;
    document.getElementById('modal-containment').textContent = artifact.containment;
    document.getElementById('modal-effect').textContent = artifact.effect || '未知';
    document.getElementById('modal-description').textContent = artifact.description;
    document.getElementById('modal-img').src = artifact.image;
    
    // 显示辛秘（仅高权限）
    const secretSection = document.getElementById('secret-section');
    const secretLock = document.getElementById('secret-lock');
    const secretContent = document.getElementById('secret-content');
    
    if (currentUserLevel === 'high' || currentUserLevel === 'max') {
        const secret = ARTIFACT_SECRETS[artifact.id];
        if (secret) {
            secretContent.innerHTML = formatSecretWithLinks(secret);
            secretSection.style.display = 'block';
            secretLock.style.display = 'none';
        } else {
            secretSection.style.display = 'none';
            secretLock.style.display = 'block';
        }
    } else {
        secretSection.style.display = 'none';
        secretLock.style.display = 'block';
    }
    
    document.getElementById('artifact-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 关闭模态框
function closeModal() {
    document.getElementById('artifact-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 特殊链接正则模式：匹配 [组织名]、[地区名]、[角色名]
// 从 secrets.js 获取全局变量（对象格式）
const SPECIAL_LINK_PATTERNS = window.SPECIAL_LINK_PATTERNS || {};

// 格式化辛秘内容，处理特殊链接
function formatSecretWithLinks(secret) {
    if (!secret) return '';
    
    let formatted = secret;
    
    // 使用 SPECIAL_LINK_PATTERNS 正则匹配 [组织名]、[地区名]、[角色名]
    // 对象格式：{ organization: /.../g, region: /.../g, character: /.../g }
    for (const [type, regex] of Object.entries(SPECIAL_LINK_PATTERNS)) {
        formatted = formatted.replace(regex, (match, name) => {
            // 转换为带 data-type 和 data-name 属性的链接
            return `<a href="javascript:void(0)" class="secret-link lore-link" data-type="${type}" data-name="${name}">${name}</a>`;
        });
    }
    
    // 保留原有的 [[链接文本|URL]] 和 [[URL]] 格式支持
    formatted = formatted.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<a href="$2" target="_blank" class="secret-link">$1</a>')
                         .replace(/\[\[([^\]]+)\]\]/g, '<a href="$1" target="_blank" class="secret-link">$1</a>');
    
    // 添加点击事件监听（使用事件委托）
    setTimeout(() => {
        const loreLinks = document.querySelectorAll('.lore-link');
        loreLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const type = e.target.dataset.type;
                const name = e.target.dataset.name;
                if (type && name) {
                    showLoreModal(type, name);
                }
            });
        });
    }, 0);
    
    return formatted;
}

// 显示资料弹窗
function showLoreModal(type, name) {
    console.log('显示资料弹窗:', type, name);
    
    const modalOverlay = document.getElementById('lore-modal-overlay');
    const modalTitle = document.getElementById('lore-modal-title');
    const modalBody = document.getElementById('lore-modal-body');
    
    if (!modalOverlay || !modalTitle || !modalBody) {
        console.error('找不到资料弹窗元素！');
        return;
    }
    
    let loreData = null;
    let titlePrefix = '';
    
    // 根据 type 和 name 查找资料（数组格式，使用 find）
    switch (type) {
        case 'organization':
            loreData = LORE_ORGANIZATIONS.find(org => org.name === name);
            titlePrefix = '🏛️ 组织';
            break;
        case 'region':
            loreData = LORE_REGIONS.find(reg => reg.name === name);
            titlePrefix = '🌍 地区';
            break;
        case 'character':
            loreData = LORE_CHARACTERS.find(char => char.name === name);
            titlePrefix = '👤 角色';
            break;
        default:
            console.error('未知的资料类型:', type);
            return;
    }
    
    if (!loreData) {
        console.warn('未找到资料:', type, name);
        modalBody.innerHTML = `
            <div class="lore-not-found">
                <p>暂无该${titlePrefix.replace(/🏛️|🌍|👤/g, '').trim()}的详细资料</p>
                <p class="lore-hint">资料正在收集中...</p>
            </div>
        `;
        modalTitle.textContent = `${titlePrefix}：${name}`;
    } else {
        // 填充 lore-modal-body
        let content = '';
        
        if (loreData.description) {
            content += `<p class="lore-description">${loreData.description}</p>`;
        }
        
        if (loreData.details) {
            content += `<div class="lore-details">${loreData.details}</div>`;
        }
        
        if (loreData.members && Array.isArray(loreData.members)) {
            content += `<div class="lore-members"><strong>成员：</strong>${loreData.members.join('、')}</div>`;
        }
        
        if (loreData.location) {
            content += `<div class="lore-location"><strong>位置：</strong>${loreData.location}</div>`;
        }
        
        if (loreData.affiliation) {
            content += `<div class="lore-affiliation"><strong>隶属：</strong>${loreData.affiliation}</div>`;
        }
        
        modalBody.innerHTML = content;
        modalTitle.textContent = `${titlePrefix}：${name}`;
    }
    
    // 显示弹窗
    modalOverlay.style.display = 'flex';
    console.log('资料弹窗已显示');
}

// 关闭资料弹窗
function closeLoreModal() {
    console.log('关闭资料弹窗...');
    const modalOverlay = document.getElementById('lore-modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
        console.log('资料弹窗已关闭');
    }
}

// 点击遮罩层关闭资料弹窗
function closeLoreModalOnOverlay(event) {
    if (event.target === event.currentTarget) {
        closeLoreModal();
    }
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('artifact-modal');
    const denied = document.getElementById('permission-denied');
    const permissionModal = document.getElementById('permission-modal-overlay');
    if (event.target === modal) {
        closeModal();
    }
    if (event.target === denied) {
        closePermissionDenied();
    }
    if (event.target === permissionModal) {
        closePermissionModal();
    }
}

// 键盘 ESC 关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closePermissionDenied();
        closePermissionModal();
    }
});

// 登出功能
function logout() {
    console.log('========== 退出登录 ==========');
    console.log('退出前用户:', currentUser, '权限等级:', currentUserLevel);
    
    // 1. 清除 localStorage 中的用户数据
    localStorage.removeItem('pseudoArtifactsUser');
    console.log('✓ 已清除 localStorage 用户数据');
    
    // 2. 重置全局变量
    currentUser = null;
    currentUserLevel = 'low';
    currentFilter = null;
    console.log('✓ 已重置全局变量: currentUser=null, currentUserLevel=low, currentFilter=null');
    
    // 3. 刷新页面返回登录界面
    console.log('即将刷新页面返回登录界面...');
    location.reload();
}
