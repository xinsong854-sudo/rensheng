import pandas as pd

file_path = '/home/node/.openclaw/media/inbound/9708932a-b892-4147-954d-2a4a40f2abce.xlsx'

# Read all sheets
xl = pd.ExcelFile(file_path)

print('=== 所有工作表 ===')
for i, sheet_name in enumerate(xl.sheet_names, 1):
    print(f'{i}. {sheet_name}')

print('\n\n')

# Show detailed data from each sheet
for sheet_name in xl.sheet_names:
    print(f'\n{"="*80}')
    print(f'工作表：【{sheet_name}】')
    print('='*80)
    
    df = pd.read_excel(file_path, sheet_name=sheet_name)
    
    # Show column names
    print(f'列名：{list(df.columns)}')
    print()
    
    # Show all rows
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    pd.set_option('display.max_colwidth', 100)
    
    for idx, row in df.iterrows():
        print(f'行{idx+1}:')
        for col in df.columns:
            val = row[col]
            if pd.notna(val) and str(val).strip():
                print(f'  {col}: {val}')
        print()
