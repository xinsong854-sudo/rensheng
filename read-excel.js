const XLSX = require('xlsx');
const path = require('path');

const filePath = '/home/node/.openclaw/media/inbound/9708932a-b892-4147-954d-2a4a40f2abce.xlsx';

try {
    // Read the workbook
    const workbook = XLSX.readFile(filePath);
    
    console.log('=== Excel 文件信息 ===');
    console.log('工作表列表:', workbook.SheetNames);
    console.log('');
    
    // Read each sheet
    workbook.SheetNames.forEach(sheetName => {
        console.log(`=== 工作表：${sheetName} ===`);
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        
        // Print all rows
        jsonData.forEach((row, index) => {
            console.log(`行 ${index + 1}:`, row);
        });
        console.log('');
    });
    
    // Extract all text content to find names
    console.log('=== 提取所有文本内容 ===');
    const allText = [];
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        jsonData.forEach(row => {
            if (Array.isArray(row)) {
                row.forEach(cell => {
                    if (cell && typeof cell === 'string') {
                        allText.push(cell);
                    }
                });
            }
        });
    });
    
    console.log('所有文本内容:', allText);
    
} catch (error) {
    console.error('读取 Excel 文件时出错:', error);
}
