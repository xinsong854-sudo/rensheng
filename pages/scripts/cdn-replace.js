#!/usr/bin/env node

/**
 * CDN 链接替换脚本
 * 将本地资源引用替换为 jsDelivr CDN 链接
 * 
 * 使用方法:
 * node cdn-replace.js [--dry-run]
 * 
 * 选项:
 * --dry-run  仅显示将要做的更改，不实际修改文件
 */

const fs = require('fs');
const path = require('path');

// 配置
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@main/';
const PAGES_DIR = '/home/node/.openclaw/workspace/pages/';
const BACKUP_DIR = path.join(PAGES_DIR, 'backups/');

// 要处理的文件
const HTML_FILES = [
    'index.html',
    'wiki-org.html',
    'wiki-region.html',
    'upload.html'
];

// 检查参数
const DRY_RUN = process.argv.includes('--dry-run');

/**
 * 创建备份目录
 */
function ensureBackupDir() {
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
        console.log(`📁 创建备份目录：${BACKUP_DIR}`);
    }
}

/**
 * 备份文件
 */
function backupFile(filePath) {
    const filename = path.basename(filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, `${filename}.${timestamp}.backup`);
    fs.copyFileSync(filePath, backupPath);
    console.log(`💾 已备份：${backupPath}`);
    return backupPath;
}

/**
 * 替换 CDN 链接
 */
function replaceWithCDN(content, filePath) {
    let newContent = content;
    let replacements = 0;
    
    // 替换 CSS 链接（排除外部链接）
    const cssPattern = /href=["']((?!https?:\/\/)[^"']*\.(css|ico))["']/g;
    newContent = newContent.replace(cssPattern, (match, p1) => {
        // 跳过已经是 CDN 的链接
        if (p1.startsWith('http') || p1.startsWith('//')) {
            return match;
        }
        replacements++;
        return `href="${CDN_BASE}${p1}"`;
    });
    
    // 替换 JS 链接（排除外部链接）
    const jsPattern = /src=["']((?!https?:\/\/)[^"']*\.(js))["']/g;
    newContent = newContent.replace(jsPattern, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('//')) {
            return match;
        }
        replacements++;
        return `src="${CDN_BASE}${p1}"`;
    });
    
    // 替换图片链接（排除外部链接和数据 URI）
    const imgPattern = /src=["']((?!https?:\/\/)(?!data:)[^"']*\.(jpg|jpeg|png|gif|webp|svg))["']/g;
    newContent = newContent.replace(imgPattern, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('//') || p1.startsWith('data:')) {
            return match;
        }
        replacements++;
        return `src="${CDN_BASE}${p1}"`;
    });
    
    // 替换背景图片（在 style 属性中）
    const bgPattern = /url\(["']?((?!https?:\/\/)[^"')]*\.(jpg|jpeg|png|gif|webp|svg))["']?\)/g;
    newContent = newContent.replace(bgPattern, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('//')) {
            return match;
        }
        replacements++;
        return `url("${CDN_BASE}${p1}")`;
    });
    
    return { content: newContent, replacements };
}

/**
 * 处理单个文件
 */
function processFile(filename) {
    const filePath = path.join(PAGES_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  文件不存在：${filePath}`);
        return;
    }
    
    console.log(`\n📄 处理文件：${filename}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: newContent, replacements } = replaceWithCDN(content, filePath);
    
    if (replacements === 0) {
        console.log(`   ✓ 无需更改`);
        return;
    }
    
    console.log(`   🔄 找到 ${replacements} 处需要替换的链接`);
    
    if (DRY_RUN) {
        console.log(`   [DRY RUN] 将替换但不实际修改文件`);
        // 显示前 5 个替换示例
        const diff = content.split('\n').map((line, i) => {
            const newLine = newContent.split('\n')[i];
            if (line !== newLine) {
                return `     - ${line.trim()}\n     + ${newLine.trim()}`;
            }
            return null;
        }).filter(Boolean).slice(0, 5).join('\n');
        console.log(diff);
        if (replacements > 5) {
            console.log(`     ... 还有 ${replacements - 5} 处更改`);
        }
    } else {
        // 备份并写入
        backupFile(filePath);
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`   ✅ 已更新为 CDN 链接`);
    }
}

/**
 * 主函数
 */
function main() {
    console.log('🚀 CDN 链接替换脚本');
    console.log('==================');
    console.log(`CDN 基础路径：${CDN_BASE}`);
    console.log(`模式：${DRY_RUN ? '🔍 干运行（不修改文件）' : '✏️  实际修改'}`);
    console.log('');
    
    if (!DRY_RUN) {
        ensureBackupDir();
    }
    
    // 处理所有 HTML 文件
    HTML_FILES.forEach(processFile);
    
    console.log('\n==================');
    if (DRY_RUN) {
        console.log('✅ 干运行完成。移除 --dry-run 参数以实际修改文件。');
    } else {
        console.log('✅ 所有文件已处理完成！');
        console.log('\n下一步：');
        console.log('1. 检查更改是否正确');
        console.log('2. 提交到 Git: git add . && git commit -m "feat: 使用 jsDelivr CDN 加速"');
        console.log('3. 推送到仓库：git push origin main');
        console.log('4. 等待 1-5 分钟部署生效');
    }
}

// 运行
main();
