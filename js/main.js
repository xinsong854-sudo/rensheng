/**
 * 主逻辑模块 - Main Application
 * 处理分类渲染、标签复制、随机生成等功能
 */

// 标签数据（从全局 tagData 和 tagIndex 获取）
let tagData = window.tagData || [];
let tagIndex = window.tagIndex || {};

/**
 * 渲染分类列表
 */
function renderCategories() {
    const container = document.getElementById('categories');
    if (!container) return;
    
    let html = '';
    tagData.forEach((category, catIndex) => {
        let subcategoryHtml = '';
        category.subcategories.forEach((subcat, subcatIndex) => {
            if (!subcat.tags || subcat.tags.length === 0) return;
            let tagsHtml = '';
            subcat.tags.forEach(tag => {
                tagsHtml += `<div class="tag" onclick="copyTag('${tag[0]}', this)"><span class="tag-cn">${tag[1]}</span><span class="tag-en">${tag[0]}</span></div>`;
            });
            subcategoryHtml += `<div class="subcategory-item"><div class="subcategory" onclick="toggleSubcategory(this)"><span class="subcategory-icon">▶</span><span>${subcat.name}</span><span class="subcategory-count">(${subcat.tags.length})</span></div><div class="tags-container">${tagsHtml}</div></div>`;
        });
        const catTagCount = category.subcategories.reduce((sum, s) => sum + (s.tags ? s.tags.length : 0), 0);
        html += `<div class="category" data-category="${catIndex}"><div class="category-header" onclick="toggleCategory(this)"><div><span class="category-title">${category.name}</span><span class="category-count">(${catTagCount} 标签)</span></div><span class="category-icon">▶</span></div><div class="subcategory-container">${subcategoryHtml}</div></div>`;
    });
    container.innerHTML = html;
}

/**
 * 切换分类展开/折叠
 * @param {HTMLElement} header - 分类标题元素
 */
function toggleCategory(header) {
    const category = header.parentElement;
    category.classList.toggle('expanded');
}

/**
 * 切换子分类展开/折叠
 * @param {HTMLElement} element - 子分类元素
 */
function toggleSubcategory(element) {
    element.classList.toggle('expanded');
}

/**
 * 复制标签到剪贴板
 * @param {string} tag - 要复制的标签
 * @param {HTMLElement} element - 点击的元素
 */
function copyTag(tag, element) {
    navigator.clipboard.writeText(tag).then(() => {
        element.classList.add('tag-copied');
        showToast('已复制：' + tag);
        setTimeout(() => { element.classList.remove('tag-copied'); }, 1000);
    });
}

/**
 * 显示提示消息
 * @param {string} message - 消息内容
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

/**
 * 从标签数组中随机获取一个标签
 * @param {Array} tags - 标签数组
 * @returns {Array|null} 随机标签或 null
 */
function getRandomTag(tags) {
    if (!tags || tags.length === 0) return null;
    return tags[Math.floor(Math.random() * tags.length)];
}

/**
 * 生成随机角色
 */
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
    
    const useFull = Math.random() > 0.4 && tagIndex.clothesFull && tagIndex.clothesFull.length > 0;
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
    if (!resultDiv) return;
    
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
    html += '<button class="copy-btn" onclick="copyAll(\'' + tagString.replace(/'/g, "\\'") + '\')">📋 复制全部标签</button>';
    
    resultDiv.innerHTML = html;
}

/**
 * 复制全部标签
 * @param {string} text - 要复制的文本
 */
function copyAll(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('已复制全部标签！');
    });
}

/**
 * 显示物品/神器弹窗（集成辛秘系统）
 * @param {Object} artifact - 物品数据
 */
function showArtifactModal(artifact) {
    // 创建或获取弹窗元素
    let modalOverlay = document.getElementById('artifactModalOverlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'artifactModalOverlay';
        modalOverlay.className = 'lore-modal-overlay';
        modalOverlay.onclick = function(e) {
            if (e.target === e.currentTarget) {
                this.classList.remove('show');
            }
        };
        modalOverlay.innerHTML = `
            <div class="lore-modal">
                <button class="lore-modal-close" onclick="closeArtifactModal()">×</button>
                <div class="lore-modal-body">
                    <div class="lore-modal-title" id="artifactModalTitle"></div>
                    <div class="secret-section" id="artifactSecretSection" style="display:none;">
                        <div class="secret-title">📜 物品辛秘</div>
                        <div class="secret-content" id="artifactSecretContent"></div>
                    </div>
                    <div class="lore-modal-content" id="artifactModalContent"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modalOverlay);
    }
    
    const modalTitle = document.getElementById('artifactModalTitle');
    const modalContent = document.getElementById('artifactModalContent');
    const secretSection = document.getElementById('artifactSecretSection');
    const secretContent = document.getElementById('artifactSecretContent');
    
    if (!modalTitle || !modalContent) return;
    
    // 设置物品信息
    modalTitle.textContent = artifact.name || '物品详情';
    modalContent.innerHTML = artifact.description || '暂无描述';
    
    // 根据权限显示/隐藏辛秘区域
    const userPermission = typeof getUserPermission === 'function' ? getUserPermission() : 'low';
    if (userPermission === 'high' || userPermission === 'max') {
        if (artifact.secrets && artifact.secrets.length > 0) {
            secretSection.style.display = 'block';
            secretContent.innerHTML = artifact.secrets.map(s => `<p>${s}</p>`).join('');
        } else {
            secretSection.style.display = 'none';
        }
    } else {
        secretSection.style.display = 'none';
    }
    
    // 显示弹窗
    modalOverlay.classList.add('show');
}

/**
 * 关闭物品弹窗
 */
function closeArtifactModal() {
    const modalOverlay = document.getElementById('artifactModalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
    }
}

// 导出函数（供外部模块使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderCategories,
        toggleCategory,
        toggleSubcategory,
        copyTag,
        showToast,
        getRandomTag,
        generateRandom,
        copyAll,
        showArtifactModal,
        closeArtifactModal
    };
}

// 自动初始化（当 DOM 加载完成后）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        renderCategories();
    });
} else {
    renderCategories();
}
