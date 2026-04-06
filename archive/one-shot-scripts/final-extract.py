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

# Add known aliases
for alias, real_name in aliases.items():
    all_names.add(real_name)

xl = pd.ExcelFile(file_path)

# ============ 槐安公寓居民名单 ============
df = pd.read_excel(file_path, sheet_name='槐安公寓居民名单')

# Parse all cells for resident names
for col in df.columns:
    for val in df[col].dropna():
        val_str = str(val).strip()
        if not val_str or val_str.startswith('槐安公寓') or val_str.startswith('...') or val_str == '待登记住户':
            continue
        
        # Pattern: room number + name like "101『我深深的破碎』" or "102 落嵛"
        # Extract name after room number
        match = re.search(r'\d+\s*[『「「]?\s*([A-Za-z\u4e00-\u9fff·&\-\']{2,20})\s*[』」」]?', val_str)
        if match:
            name = match.group(1).strip()
            # Clean up trailing text
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
        
        # Pattern: room number + name
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
            # Clean up quotes
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
# Find the sheet with "deus false" in the name
deus_false_sheet = None
for sheet in xl.sheet_names:
    if 'deus' in sheet.lower() or 'false' in sheet.lower():
        deus_false_sheet = sheet
        break

if deus_false_sheet:
    df = pd.read_excel(file_path, sheet_name=deus_false_sheet)
else:
    df = None

if df is not None and '名讳' in df.columns:
    for val in df['名讳'].dropna():
        val_str = str(val).strip()
        if val_str and len(val_str) >= 2:
            all_names.add(val_str)

# Remove obvious non-names (places, organizations, etc.)
exclude_keywords = [
    '公寓', '哨站', '灯塔', '教廷', '派系', '伪神', '里界', '伪人', '人类', '猎人', 
    '调查局', '联盟', '组织', '部门', '委员会', '共和国', '国家', '安全', '等级', 
    '评级', '档案', '简介', '能力', '身份', '来源', '现状', '备注', '危险', '收容', 
    '类型', '项目', '概述', '本质', '特征', '描述', '说明', '事项', '规则', '方法', 
    '应对', '划分', '标准', '定义', '概念', '理论', '猜想', '记录', '事件', '故事', 
    '历史', '文化', '宗教', '信仰', '信徒', '神明', '教会', '圣使', '成员', '机构', 
    '单位', '部队', '军队', '军事', '武器', '装备', '技能', '学科', '年级', '班级', 
    '学校', '学生', '教师', '校长', '保卫', '社团', '课程', '考试', '成绩', '毕业', 
    '学位', '研究', '实验', '科学', '技术', '数据', '网络', '系统', '服务器', '人工', 
    '智能', '模型', '算法', '程序', '代码', '文件', '资料', '信息', '内容', '文本', 
    '文字', '语言', '词汇', '语法', '标点', '格式', '样式', '颜色', '形状', '大小', 
    '重量', '高度', '长度', '宽度', '深度', '温度', '湿度', '压力', '速度', '时间', 
    '空间', '位置', '方向', '距离', '面积', '体积', '数量', '质量', '密度', '浓度', 
    '强度', '功率', '能量', '力量', '天赋', '才能', '特长', '爱好', '兴趣', '性格', 
    '特点', '特性', '特质', '性质', '属性', '状态', '情况', '条件', '环境', '背景', 
    '未来', '过去', '现在', '当前', '目前', '最新', '最近', '最终', '最初', '开始', 
    '结束', '完成', '进行', '正在', '已经', '曾经', '将要', '将会', '可能', '也许', 
    '大概', '似乎', '好像', '仿佛', '如同', '犹如', '类似', '相似', '相同', '不同', 
    '一样', '同样', '某些', '一些', '全部', '所有', '每个', '各个', '各种', '各类', 
    '各项', '医院', '回廊', '实验室', '区域', '花坛', '地下室', '锅炉房', '积水池', 
    '福利院', '空地', '剧场', '影院', '餐厅', '博物馆', '旅馆', '酒店', '商场', 
    '市场', '公园', '广场', '街道', '城市', '乡村', '小镇', '省份', '地区', '大陆', 
    '海洋', '湖泊', '河流', '山脉', '森林', '沙漠', '草原', '岛屿', '半岛', '海湾', 
    '海峡', '运河', '港口', '机场', '车站', '码头', '桥梁', '隧道', '公路', '铁路', 
    '航线', '路线', '地图', '指南', '手册', '目录', '索引', '清单', '表格', '图表', 
    '图片', '照片', '视频', '音频', '文档', '报告', '论文', '书籍', '杂志', '报纸', 
    '网站', '网页', '链接', '地址', '邮箱', '电话', '传真', '邮编', '代码', '编号', 
    '序号', '日期', '时间', '星期', '月份', '年份', '季节', '节日', '假日', '假期', 
    '会议', '活动', '比赛', '竞赛', '展览', '演出', '表演', '节目', '电影', '电视', 
    '广播', '新闻', '广告', '宣传', '营销', '销售', '购买', '消费', '支付', '付款', 
    '收款', '转账', '存款', '取款', '贷款', '借款', '还款', '利息', '利率', '汇率', 
    '股票', '基金', '债券', '期货', '期权', '保险', '理财', '投资', '融资', '信贷', 
    '税务', '财务', '会计', '审计', '统计', '分析', '评估', '预测', '规划', '计划', 
    '方案', '策略', '政策', '法规', '法律', '条例', '规定', '制度', '流程', '程序', 
    '标准', '规范', '指南', '建议', '意见', '反馈', '投诉', '建议', '咨询', '服务', 
    '支持', '帮助', '解答', '回复', '回应', '确认', '通知', '公告', '声明', '通告', 
    '提示', '警告', '注意', '重要', '紧急', '优先', '普通', '一般', '特殊', '例外', 
    '常规', '正常', '异常', '错误', '故障', '问题', '缺陷', '漏洞', '风险', '隐患', 
    '事故', '灾难', '危机', '困难', '挑战', '机遇', '优势', '劣势', '机会', '威胁', 
    '目标', '目的', '意义', '价值', '作用', '功能', '用途', '效果', '结果', '成果', 
    '成就', '贡献', '影响', '责任', '义务', '权利', '权力', '利益', '好处', '坏处', 
    '优点', '缺点', '长处', '短处', '强项', '弱项', '特色', '亮点', '焦点', '重点', 
    '难点', '热点', '亮点', '看点', '卖点', '痛点', '爽点', '爆点', '泪点', '笑点', 
    '槽点', '萌点', '雷点', '禁区', '禁区', '禁区'
]

filtered_names = set()
for name in all_names:
    # Skip if contains exclude keywords
    if any(keyword in name for keyword in exclude_keywords):
        continue
    # Skip if looks like a description
    if any(skip in name for skip in ['住在', '似乎', '不常住', '有时', '通过', '来到', '找', '玩', '设立', '欢迎']):
        continue
    # Skip obvious non-names
    if name in ['花坛', '积水池', '福利院', '空地', '地下室', '锅炉房', '公寓', '待登记住户', '不提供住处', '室外区域', '永远的家', '槐安公寓', '茶居公寓', '西陆联盟', '白墟之地', '错位花园', '非常电影院', '童话国', '手与剑之乡', '梦之圣庭', '静谧织命者', '不提供住处']:
        continue
    filtered_names.add(name)

# Sort and display
print('\n' + '='*70)
print('=== 完整人员列表（高权限用户）===')
print('='*70 + '\n')

sorted_names = sorted(filtered_names, key=lambda x: (len(x), x))

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
