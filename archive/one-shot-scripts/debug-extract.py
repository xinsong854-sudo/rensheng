import pandas as pd
import re

file_path = '/home/node/.openclaw/media/inbound/9708932a-b892-4147-954d-2a4a40f2abce.xlsx'

# Key aliases from task description
aliases = {
    '二营长': '非常玦蝶',
    '楼长': '安诺涅', 
    '营长': '安诺涅'
}

all_names = set()

# Add known aliases (use real names, not aliases)
for alias, real_name in aliases.items():
    all_names.add(real_name)

xl = pd.ExcelFile(file_path)

# ============ 槐安公寓居民名单 ============
print('=== 槐安公寓居民名单 ===')
df = pd.read_excel(file_path, sheet_name='槐安公寓居民名单')

for col in df.columns:
    for val in df[col].dropna():
        val_str = str(val).strip()
        if not val_str or val_str.startswith('槐安公寓') or val_str.startswith('...') or val_str == '待登记住户':
            continue
        
        # Pattern: room number + name
        match = re.search(r'\d+\s*[『「「]?\s*([A-Za-z\u4e00-\u9fff·&\-\']{2,20})\s*[』」」]?', val_str)
        if match:
            name = match.group(1).strip()
            name = re.sub(r'\s+.*$', '', name)  # Remove anything after space
            print(f'  Found: {name} (from: {val_str})')
            if name and len(name) >= 2:
                all_names.add(name)

# ============ 茶居公寓住户登记表 ============
print('\n=== 茶居公寓住户登记表 ===')
df = pd.read_excel(file_path, sheet_name='茶居公寓住户登记表')

for col in df.columns:
    for val in df[col].dropna():
        val_str = str(val).strip()
        if not val_str or val_str.startswith('茶居公寓') or val_str.startswith('不提供'):
            continue
        
        match = re.search(r'\d+\s*([A-Za-z\u4e00-\u9fff·&\-\']{2,20})', val_str)
        if match:
            name = match.group(1).strip()
            print(f'  Found: {name} (from: {val_str})')
            if name and len(name) >= 2:
                all_names.add(name)

# ============ 人物档案 ============
print('\n=== 人物档案 ===')
df = pd.read_excel(file_path, sheet_name='人物档案')

if '名称' in df.columns:
    for val in df['名称'].dropna():
        val_str = str(val).strip()
        if val_str and len(val_str) >= 2:
            val_str = val_str.strip('"「「』』')
            print(f'  Found: {val_str}')
            all_names.add(val_str)

# ============ 西陆联盟派系 - 派系首领 ============
print('\n=== 西陆联盟派系 ===')
df = pd.read_excel(file_path, sheet_name='西陆联盟派系')

if '派系首领' in df.columns:
    for val in df['派系首领'].dropna():
        val_str = str(val).strip()
        print(f'  Raw: {val_str}')
        # Split by commas and Chinese punctuation
        names = re.split(r'[,,]', val_str)
        for name in names:
            name = name.strip()
            if name and len(name) >= 2:
                print(f'  Found: {name}')
                all_names.add(name)

# ============ "deus false" - 名讳 ============
print('\n=== deus false ===')
deus_false_sheet = None
for sheet in xl.sheet_names:
    if 'deus' in sheet.lower() or 'false' in sheet.lower():
        deus_false_sheet = sheet
        break

if deus_false_sheet:
    df = pd.read_excel(file_path, sheet_name=deus_false_sheet)
    if '名讳' in df.columns:
        for val in df['名讳'].dropna():
            val_str = str(val).strip()
            if val_str and len(val_str) >= 2:
                print(f'  Found: {val_str}')
                all_names.add(val_str)

print(f'\n=== 总计：{len(all_names)} 人 ===')
print('\n完整列表:')
for name in sorted(all_names, key=lambda x: (len(x), x)):
    print(f'  {name}')
