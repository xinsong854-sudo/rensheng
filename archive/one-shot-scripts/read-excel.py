import pandas as pd
import sys

file_path = '/home/node/.openclaw/media/inbound/9708932a-b892-4147-954d-2a4a40f2abce.xlsx'

try:
    # Read all sheets
    xl = pd.ExcelFile(file_path)
    sheet_names = xl.sheet_names
    
    print('=== Excel 文件信息 ===')
    print(f'工作表列表：{sheet_names}')
    print('')
    
    all_names = []
    all_text = []
    
    for sheet_name in sheet_names:
        print(f'=== 工作表：{sheet_name} ===')
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Print all data
        print(df.to_string())
        print('')
        
        # Extract all text values
        for col in df.columns:
            for val in df[col].dropna():
                val_str = str(val)
                all_text.append(val_str)
    
    print('=== 所有文本内容 ===')
    print(all_text)
    print('')
    
    # Look for potential names (Chinese characters patterns)
    import re
    chinese_pattern = re.compile(r'[\u4e00-\u9fff]+')
    
    potential_names = []
    for text in all_text:
        # Find Chinese character sequences
        matches = chinese_pattern.findall(str(text))
        for match in matches:
            if len(match) >= 2:  # At least 2 Chinese characters
                potential_names.append(match)
    
    print('=== 潜在人名（中文）===')
    print(list(set(potential_names)))
    
except Exception as e:
    print(f'读取 Excel 文件时出错：{e}')
    import traceback
    traceback.print_exc()
