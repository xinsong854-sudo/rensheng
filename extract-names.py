import pandas as pd
import re

file_path = '/home/node/.openclaw/media/inbound/9708932a-b892-4147-954d-2a4a40f2abce.xlsx'

# Read all sheets
xl = pd.ExcelFile(file_path)

all_names = set()

# Key aliases from task description
aliases = {
    '二营长': '非常玦蝶',
    '楼长': '安诺涅',
    '营长': '安诺涅'
}

for sheet_name in xl.sheet_names:
    try:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Convert all cells to strings and search for names
        for col in df.columns:
            for val in df[col].dropna():
                val_str = str(val).strip()
                
                # Skip obvious non-name patterns
                if any(skip in val_str for skip in ['NaN', 'Unnamed', 'DISPIMG', 'http', 'www', 'ID_']):
                    continue
                
                # Look for Chinese names (2-8 characters typically)
                chinese_matches = re.findall(r'[\u4e00-\u9fff]{2,8}', val_str)
                for match in chinese_matches:
                    # Filter out common non-name patterns
                    if not any(skip in match for skip in ['公寓', '哨站', '灯塔', '教廷', '派系', '伪神', '里界', '伪人', '人类', '猎人', '调查局', '联盟', '组织', '部门', '委员会', '共和国', '国家', '安全', '等级', '评级', '档案', '简介', '能力', '身份', '来源', '现状', '备注', '危险', '收容', '类型', '项目', '概述', '本质', '特征', '描述', '说明', '事项', '规则', '方法', '应对', '划分', '标准', '定义', '概念', '理论', '猜想', '记录', '事件', '故事', '历史', '文化', '宗教', '信仰', '信徒', '神明', '神明', '教会', '圣使', '伪神', '派系', '成员', '机构', '单位', '部队', '军队', '军事', '武器', '装备', '技能', '学科', '年级', '班级', '学校', '学生', '教师', '校长', '保卫', '社团', '课程', '考试', '成绩', '毕业', '学位', '研究', '实验', '科学', '技术', '数据', '网络', '系统', '服务器', '人工', '智能', '模型', '算法', '程序', '代码', '文件', '档案', '资料', '信息', '内容', '文本', '文字', '语言', '词汇', '语法', '标点', '格式', '样式', '颜色', '形状', '大小', '重量', '高度', '长度', '宽度', '深度', '温度', '湿度', '压力', '速度', '时间', '空间', '位置', '方向', '距离', '面积', '体积', '数量', '质量', '密度', '浓度', '强度', '功率', '能量', '力量', '能力', '技能', '天赋', '才能', '特长', '爱好', '兴趣', '性格', '特点', '特征', '特性', '特质', '性质', '本质', '属性', '状态', '情况', '条件', '环境', '背景', '历史', '未来', '过去', '现在', '当前', '目前', '最新', '最近', '最终', '最初', '开始', '结束', '完成', '进行', '正在', '已经', '曾经', '将要', '将会', '可能', '也许', '大概', '似乎', '好像', '仿佛', '如同', '犹如', '类似', '相似', '相同', '不同', '一样', '同样', '一样', '某些', '一些', '全部', '所有', '每个', '各个', '各种', '各类', '各项', '各项', '各项']):
                        all_names.add(match)
        
        # Also look for specific name patterns in the sheet
        if '公寓' in sheet_name or '住户' in sheet_name or '居民' in sheet_name:
            # This sheet likely contains resident names
            for col in df.columns:
                for val in df[col].dropna():
                    val_str = str(val).strip()
                    # Extract names after room numbers
                    # Pattern like "101『我深深的破碎』" or "102 落嵛"
                    matches = re.findall(r'\d+[\s]*[『]?([\u4e00-\u9fff·&A-Za-z\-\'\"()#]{2,20})[』]?', val_str)
                    for match in matches:
                        clean_name = match.strip()
                        if clean_name and len(clean_name) >= 2:
                            all_names.add(clean_name)
                    
                    # Also try to extract names directly
                    if re.match(r'^\d', val_str):
                        # Has room number prefix
                        name_part = re.sub(r'^\d+\s*', '', val_str)
                        name_part = re.sub(r'^[『「]', '', name_part)
                        name_part = re.sub(r'[』」]$', '', name_part)
                        if name_part and len(name_part) >= 2:
                            all_names.add(name_part.strip())
                            
    except Exception as e:
        print(f'Error processing sheet {sheet_name}: {e}')

# Add known aliases
for alias, real_name in aliases.items():
    all_names.add(real_name)

print('\n=== 完整人员列表 ===\n')
sorted_names = sorted(all_names, key=lambda x: (len(x), x))
for name in sorted_names:
    print(f"  • {name}")

print(f'\n=== 总计：{len(sorted_names)} 人 ===')
