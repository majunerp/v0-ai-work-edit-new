# Creem 支付集成设置指南

## 📋 概述

本项目已集成 Creem 支付系统，支持订阅制会员和一次性支付。

## 🚀 快速开始

### 1. 注册 Creem 账户

1. 访问 [Creem Dashboard](https://dashboard.creem.io)
2. 注册账户
3. 完成身份验证

### 2. 获取 API 密钥

1. 登录 Creem Dashboard
2. 前往 **Settings** → **API Keys**
3. 创建新的 API 密钥
4. 复制密钥并添加到 `.env.local`：
   ```env
   CREEM_API_KEY=creem_your_actual_api_key
   ```

### 3. 创建产品和价格

在 Creem Dashboard 中创建以下产品：

#### Pro Plan - Monthly
- 名称：AI Work Editprotips Pro (Monthly)
- 价格：$7.99/月
- 类型：Recurring Subscription
- 记录 Price ID（例如：`price_monthly_pro`）

#### Pro Plan - Yearly
- 名称：AI Work Editprotips Pro (Yearly)
- 价格：$79.99/年
- 类型：Recurring Subscription
- 记录 Price ID（例如：`price_yearly_pro`）

### 4. 更新价格 ID

编辑 `app/pricing/page.tsx`，更新 `priceId` 为你的实际 Price ID：

```typescript
priceId: {
  monthly: "price_your_actual_monthly_id",  // 替换为你的真实 Price ID
  yearly: "price_your_actual_yearly_id"      // 替换为你的真实 Price ID
}
```

### 5. 配置 Webhook

1. 在 Creem Dashboard 中前往 **Webhooks**
2. 创建新的 Webhook 端点
3. URL：`https://your-domain.com/api/creem/webhook`
4. 选择以下事件：
   - `checkout.session.completed`
   - `subscription.created`
   - `subscription.updated`
   - `subscription.cancelled`
   - `payment.succeeded`
   - `payment.failed`
5. 保存 Webhook 密钥（如果提供）

### 6. 运行数据库迁移

在 Supabase SQL Editor 中运行迁移文件：

```bash
# 在 Supabase Dashboard 的 SQL Editor 中
# 复制并执行 supabase/migrations/001_create_subscriptions.sql
```

或使用 Supabase CLI：

```bash
supabase db push
```

## 📁 项目结构

```
app/
├── pricing/
│   └── page.tsx                          # 价格页面
├── payment/
│   └── success/
│       └── page.tsx                      # 支付成功页面
└── api/
    └── creem/
        ├── create-checkout/
        │   └── route.ts                  # 创建支付会话 API
        └── webhook/
            └── route.ts                  # Webhook 处理

supabase/
└── migrations/
    └── 001_create_subscriptions.sql      # 数据库迁移
```

## 💾 数据库表结构

### subscriptions
存储用户订阅信息

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 用户 ID（外键） |
| creem_customer_id | TEXT | Creem 客户 ID |
| creem_subscription_id | TEXT | Creem 订阅 ID |
| status | TEXT | 订阅状态（active/cancelled/inactive） |
| plan_type | TEXT | 计划类型（monthly/yearly） |
| current_period_start | TIMESTAMPTZ | 当前周期开始时间 |
| current_period_end | TIMESTAMPTZ | 当前周期结束时间 |

### user_credits
存储用户积分（免费用户）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 用户 ID |
| credits_remaining | INTEGER | 剩余积分 |
| total_credits_purchased | INTEGER | 总购买积分 |

### payment_history
支付历史记录

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 用户 ID |
| creem_payment_id | TEXT | Creem 支付 ID |
| amount | DECIMAL | 金额 |
| status | TEXT | 支付状态 |

## 🔄 支付流程

### 订阅流程

1. 用户访问 `/pricing` 页面
2. 选择计划（月付/年付）
3. 点击 "Start 7-Day Trial"
4. 系统检查用户登录状态
5. 调用 `/api/creem/create-checkout` 创建支付会话
6. 重定向到 Creem Checkout 页面
7. 用户完成支付
8. Creem 发送 Webhook 到 `/api/creem/webhook`
9. 系统更新数据库中的订阅状态
10. 重定向到 `/payment/success`

## 🧪 测试

### 本地测试

1. 启动开发服务器：
   ```bash
   pnpm dev
   ```

2. 访问价格页面：
   ```
   http://localhost:3000/pricing
   ```

3. 使用 Creem 测试模式进行支付测试

### Webhook 测试

使用 Creem CLI 或工具（如 ngrok）将本地 webhook 暴露给 Creem：

```bash
# 使用 ngrok
ngrok http 3000

# Webhook URL 将是:
# https://your-ngrok-url.ngrok.io/api/creem/webhook
```

## 🔐 安全考虑

1. **API 密钥保护**
   - 永远不要在客户端代码中暴露 `CREEM_API_KEY`
   - 使用环境变量存储

2. **Webhook 验证**
   - 实施 webhook 签名验证（当 Creem 提供时）
   - 仅接受来自 Creem 的请求

3. **用户验证**
   - 在创建支付会话前验证用户身份
   - 使用 Supabase RLS 保护数据

## 📊 Vercel 环境变量配置

在 Vercel Dashboard 中添加：

```env
CREEM_API_KEY=creem_live_your_production_key
NEXT_PUBLIC_SITE_URL=https://www.aiworkeditprotips.net
```

## 🎯 功能清单

- [x] 价格页面 UI
- [x] 月付/年付切换
- [x] Creem 支付集成
- [x] Webhook 处理
- [x] 数据库架构
- [x] 支付成功页面
- [ ] 账户管理页面
- [ ] 取消订阅功能
- [ ] 积分系统集成到生成流程
- [ ] 订阅状态检查中间件

## 📞 支持

如有问题，请参考：
- [Creem 文档](https://docs.creem.io)
- [Supabase 文档](https://supabase.com/docs)

## 🔄 下一步

1. 将数据库迁移应用到 Supabase
2. 在 Creem Dashboard 中配置产品和价格
3. 配置 Webhook 端点
4. 在 Vercel 中设置环境变量
5. 测试完整支付流程
