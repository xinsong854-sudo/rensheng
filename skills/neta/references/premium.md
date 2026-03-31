# Premium / Subscriptions Reference

> **用途：** 捏 Ta 高级会员/订阅相关操作的工作流指南  
> **适用技能：** neta-creative  
> **API 环境：** 全局 API（不限捏 Ta 账户）

---

## 命令列表

| 命令 | 描述 |
|------|------|
| `list_premium_plans` | 列出所有可用的会员计划 |
| `get_current_premium_plan` | 获取当前用户的会员状态 |
| `create_premium_order` | 创建会员订单 |
| `get_premium_order` | 查询订单详情 |
| `list_premium_orders` | 列出所有订单 |
| `pay_premium_order` | 支付订单（启动 Stripe 结账） |

---

## 典型工作流

### 1. 查看当前会员状态
```bash
npx -y @talesofai/neta-skills@latest get_current_premium_plan
```

**返回示例：**
```json
{
  "tier": "premium",
  "expires_at": "2026-04-16T23:36:28Z",
  "ap_limit_bonuses": {...}
}
```

### 2. 查看可用会员计划
```bash
npx -y @talesofai/neta-skills@latest list_premium_plans
```

### 3. 创建并支付订单
```bash
# 创建订单
npx -y @talesofai/neta-skills@latest create_premium_order --spu_uuid "<spu_uuid>"

# 支付订单（会返回 Stripe 结账链接）
npx -y @talesofai/neta-skills@latest pay_premium_order --order_uuid "<order_uuid>"
```

---

## 环境变量

| 变量 | 必需 | 说明 |
|------|------|------|
| `NETA_TOKEN` | ✅ | 捏 Ta API 访问令牌 |
| `NETA_API_BASE_URL` | ❌ | API 基础 URL（默认自动检测） |

---

## 注意事项

1. **会员权益** 全局有效（不限捏 Ta 账户）
2. **AP 奖励** 会员每月有额外 AP 奖励
3. **Stripe 支付** 需要有效的国际支付方式

---

_最后更新：2026-03-30_
