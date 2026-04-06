import pandas as pd
import re

file_path = '/home/node/.openclaw/media/inbound/9708932a-b892-4147-954d-2a4a40f2abce.xlsx'

# Read all sheets
xl = pd.ExcelFile(file_path)

# Key aliases from task description
aliases = {
    '二营长': '非常玦蝶',
    '楼长': '安诺涅', 
    '营长': '安诺涅'
}

real_names = set()

# Add known aliases
for alias, real_name in aliases.items():
    real_names.add(real_name)

# Process sheets that contain resident/person data
target_sheets = ['槐安公寓居民名单', '茶居公寓住户登记表', '西陆联盟派系', 'deus false']

for sheet_name in xl.sheet_names:
    try:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Look for columns that might contain names
        for col in df.columns:
            col_str = str(col).lower()
            
            # Check if this column might contain names
            if any(keyword in col_str for keyword in ['姓名', '名字', '名称', '居民', '住户', '角色', 'name', 'character']):
                for val in df[col].dropna():
                    val_str = str(val).strip()
                    # Clean up the value
                    # Remove room numbers, quotes, special chars
                    val_str = re.sub(r'^\d+\s*', '', val_str)  # Remove leading room numbers
                    val_str = re.sub(r'^[『「「]', '', val_str)
                    val_str = re.sub(r'[』」」]$', '', val_str)
                    val_str = val_str.strip()
                    
                    # Extract Chinese names (2-6 characters typically)
                    if val_str and len(val_str) >= 2:
                        # Check if it looks like a name
                        if re.match(r'^[\u4e00-\u9fff·]{2,6}$', val_str):
                            real_names.add(val_str)
                        # Also check for names with special chars like &
                        elif re.match(r'^[\u4e00-\u9fff·&]{2,10}$', val_str):
                            real_names.add(val_str)
        
        # Also scan all cells in resident-related sheets
        if '公寓' in sheet_name or '住户' in sheet_name or '居民' in sheet_name:
            for col in df.columns:
                for val in df[col].dropna():
                    val_str = str(val).strip()
                    # Pattern: room number followed by name like "101『我深深的破碎』"
                    match = re.search(r'\d+\s*[『「「]?([\u4e00-\u9fff·]{2,8})[』」」]?', val_str)
                    if match:
                        name = match.group(1).strip()
                        if name and len(name) >= 2:
                            real_names.add(name)
                            
    except Exception as e:
        print(f'Error processing sheet {sheet_name}: {e}')

# Also check for names in other contexts
for sheet_name in xl.sheet_names:
    try:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Look for specific name patterns in the data
        for col in df.columns:
            for val in df[col].dropna():
                val_str = str(val).strip()
                
                # Look for patterns like "XXX 是..." or "XXX 的" where XXX is a name
                # Or names followed by titles
                patterns = [
                    r'^([\u4e00-\u9fff·]{2,5})(?:先生 | 小姐 | 女士 | 医生 | 老师 | 队长 | 部长 | 会长)',
                    r'^([\u4e00-\u9fff·]{2,5})(?:喜欢 | 讨厌 | 认为 | 觉得 | 说)',
                ]
                
                for pattern in patterns:
                    match = re.search(pattern, val_str)
                    if match:
                        name = match.group(1).strip()
                        if name:
                            real_names.add(name)
                            
    except Exception as e:
        pass

print('\n' + '='*60)
print('=== 完整人员列表（高权限用户）===')
print('='*60 + '\n')

# Sort names by length and alphabetically
sorted_names = sorted(real_names, key=lambda x: (len(x), x))

for i, name in enumerate(sorted_names, 1):
    print(f"{i:3d}. {name}")

print(f'\n{"="*60}')
print(f'总计：{len(sorted_names)} 人')
print(f'{"="*60}')

# Print alias mappings
print('\n=== 别名映射（特别注意）===')
for alias, real_name in aliases.items():
    print(f"  {alias} = {real_name}")
