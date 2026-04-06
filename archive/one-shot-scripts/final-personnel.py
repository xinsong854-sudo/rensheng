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
            if name and len(name) >= 2:
                all_names.add(name)

# ============ 茶居公寓住户登记表 ============
df = pd.read_excel(file_path, sheet_name='茶居公寓住户登记表')

for col in df.columns:
    for val in df[col].dropna():
        val_str = str(val).strip()
        if not val_str or val_str.startswith('茶居公寓') or val_str.startswith('不提供'):
            continue
        
        match = re.search(r'\d+\s*([A-Za-z\u4e00-\u9fff·&\-\']{2,20})', val_str)
        if match:
            name = match.group(1).strip()
            if name and len(name) >= 2:
                all_names.add(name)

# ============ 人物档案 ============
df = pd.read_excel(file_path, sheet_name='人物档案')

if '名称' in df.columns:
    for val in df['名称'].dropna():
        val_str = str(val).strip()
        if val_str and len(val_str) >= 2:
            val_str = val_str.strip('"「「』』')
            all_names.add(val_str)

# ============ 西陆联盟派系 - 派系首领 ============
df = pd.read_excel(file_path, sheet_name='西陆联盟派系')

if '派系首领' in df.columns:
    for val in df['派系首领'].dropna():
        val_str = str(val).strip()
        # Split by commas and Chinese punctuation
        names = re.split(r'[,,]', val_str)
        for name in names:
            name = name.strip()
            if name and len(name) >= 2:
                all_names.add(name)

# ============ "deus false" - 名讳 ============
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
                all_names.add(val_str)

# Clean up names - remove non-person entries
exclude_list = [
    '复合实验室',  # Laboratory, not a person
    '瘟疫医生',    # Plague Doctor (title/role, but keeping as it appears to be a character)
    '日出西方',    # Location name
    '覆水织诗',    # Poem title
]

# Remove aliases (they're already added as real names)
for alias in aliases.keys():
    all_names.discard(alias)

# Remove excluded items
for item in exclude_list:
    all_names.discard(item)

# Remove items that contain descriptive text
cleaned_names = set()
for name in all_names:
    # Skip if contains descriptive text
    if any(skip in name for skip in ['住在', '似乎', '不常住', '有时', '通过', '来到', '找', '玩', 
                                      '设立', '欢迎', '似乎不常住']):
        continue
    # Skip combined entries with commas (already processed individually)
    if ',' in name or '，' in name:
        continue
    # Remove quotes
    name = name.strip('"「「』』')
    if name and len(name) >= 2:
        cleaned_names.add(name)

# Sort and display
print('\n' + '='*70)
print('=== 完整人员列表（高权限用户）===')
print('='*70 + '\n')

sorted_names = sorted(cleaned_names, key=lambda x: (len(x), x))

for i, name in enumerate(sorted_names, 1):
    print(f"{i:3d}. {name}")

print(f'\n{"="*70}')
print(f'总计：{len(sorted_names)} 人')
print(f'{"="*70}')

# Print alias mappings
print('\n=== 别名映射（特别注意）===')
for alias, real_name in aliases.items():
    print(f"  {alias} = {real_name}")

# Save to file
with open('/home/node/.openclaw/workspace/personnel-list.txt', 'w', encoding='utf-8') as f:
    f.write('=== 完整人员列表（高权限用户）===\n\n')
    for i, name in enumerate(sorted_names, 1):
        f.write(f"{i:3d}. {name}\n")
    f.write(f'\n总计：{len(sorted_names)} 人\n')
    f.write('\n=== 别名映射（特别注意）===\n')
    for alias, real_name in aliases.items():
        f.write(f"  {alias} = {real_name}\n")

print('\n列表已保存到：/home/node/.openclaw/workspace/personnel-list.txt')
