// 伪物图鉴 - 辛秘整合脚本
// 运行此脚本将辛秘数据合并到 data.js

const fs = require('fs');
const path = require('path');

// 读取辛秘数据
const secretsBatch1 = JSON.parse(fs.readFileSync('/home/node/.openclaw/workspace/temp/secrets-batch1.json', 'utf-8'));

// 读取 data.js
const dataPath = path.join(__dirname, 'pseudo-artifacts/js/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf-8');

// 为每个物品添加 secret 字段
const secretMap = {
    'PA-001': secretsBatch1['PA-001'].secret,
    'PA-002': secretsBatch1['PA-002'].secret,
    'PA-003': secretsBatch1['PA-003'].secret,
    'PA-004': secretsBatch1['PA-004'].secret,
    'PA-005': secretsBatch1['PA-005'].secret,
    'PA-006': secretsBatch1['PA-006'].secret,
    'PA-007': secretsBatch1['PA-007'].secret,
    'PA-008': secretsBatch1['PA-008'].secret,
    'PA-009': secretsBatch1['PA-009'].secret,
    'PA-010': secretsBatch1['PA-010'].secret,
    'PA-011': secretsBatch1['PA-011'].secret,
    'PA-012': secretsBatch1['PA-012'].secret,
};

console.log('辛秘数据已加载:', Object.keys(secretMap).length, '个');
console.log('文件路径:', dataPath);
