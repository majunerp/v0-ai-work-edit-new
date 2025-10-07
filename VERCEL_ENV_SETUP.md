# Vercel 环境变量配置指南

## 🚨 重要：修复 Google OAuth 重定向问题

如果在生产环境中遇到 Google 登录后跳转到 `localhost:3000` 的问题，请按照以下步骤配置 Vercel 环境变量。

## 📋 必需的环境变量

在 Vercel Dashboard 中设置以下环境变量：

### 1. 访问 Vercel 项目设置

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 点击 **Settings** 标签
4. 在左侧菜单选择 **Environment Variables**

### 2. 添加环境变量

添加以下环境变量（**所有环境**：Production, Preview, Development）：

```env
NEXT_PUBLIC_SUPABASE_URL=https://hzbewyqfutillqvbfbji.supabase.co
```

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YmV3eXFmdXRpbGxxdmJmYmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTA2NjEsImV4cCI6MjA3NTM2NjY2MX0.3RIDM8QOZk_am_bIKWbApUiQ2_0I68mCqFuvKolpxKE
```

**🔥 最重要的：设置生产域名**

```env
NEXT_PUBLIC_SITE_URL=https://www.aiworkeditprotips.net
```

⚠️ **注意：** `NEXT_PUBLIC_SITE_URL` 必须是你的**实际生产域名**，不能是 `localhost:3000`！

### 3. 可选：OpenRouter API Key

如果使用 AI 功能：

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

## 🔄 重新部署

设置环境变量后：

1. 在 Vercel Dashboard 点击 **Deployments** 标签
2. 找到最新的部署
3. 点击右侧的 **...** 菜单
4. 选择 **Redeploy**
5. 确认重新部署

或者，直接推送新代码到 GitHub，Vercel 会自动重新部署。

## 🔍 验证配置

部署完成后，测试 Google 登录：

1. 访问你的生产网站：`https://www.aiworkeditprotips.net`
2. 点击 "Sign in with Google" 按钮
3. 完成 Google 授权
4. **应该重定向回** `https://www.aiworkeditprotips.net/auth/callback`（而不是 localhost）

## 🛠️ Google Cloud Console 配置

确保在 Google Cloud Console 中的授权重定向 URI 包括：

### Supabase 回调 URI（必需）

```
https://hzbewyqfutillqvbfbji.supabase.co/auth/v1/callback
```

### 应用回调 URI（可选，用于直接集成）

```
https://www.aiworkeditprotips.net/auth/callback
```

## 📝 环境变量说明

| 变量名 | 用途 | 示例值 |
|--------|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 公钥 | `eyJhbGci...` |
| `NEXT_PUBLIC_SITE_URL` | **生产域名** | `https://www.aiworkeditprotips.net` |
| `OPENROUTER_API_KEY` | AI 功能密钥（可选） | `sk-or-v1-...` |

## ❌ 常见错误

### 错误 1: 重定向到 localhost

**症状：** 登录后跳转到 `http://localhost:3000/...`

**解决方法：**
- 确保在 Vercel 中设置了 `NEXT_PUBLIC_SITE_URL` 环境变量
- 值必须是完整的生产域名，包括 `https://`
- 设置后必须重新部署

### 错误 2: "redirect_uri_mismatch"

**症状：** Google OAuth 显示重定向 URI 不匹配错误

**解决方法：**
- 检查 Google Cloud Console 中的授权重定向 URI
- 确保包含：`https://hzbewyqfutillqvbfbji.supabase.co/auth/v1/callback`

### 错误 3: "Invalid supabaseUrl"

**症状：** Vercel 构建失败，显示无效的 Supabase URL

**解决方法：**
- 确保环境变量名称正确（注意大小写）
- 重新部署项目

## 📚 更多资源

- [Vercel 环境变量文档](https://vercel.com/docs/environment-variables)
- [Supabase OAuth 文档](https://supabase.com/docs/guides/auth/social-login)
- [Next.js 环境变量](https://nextjs.org/docs/basic-features/environment-variables)

## 🆘 需要帮助？

如果问题仍然存在：

1. 检查 Vercel 部署日志
2. 检查浏览器开发者工具的 Network 标签
3. 确认环境变量已保存并生效
4. 尝试清除浏览器缓存并重新登录
