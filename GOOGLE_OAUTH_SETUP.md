# Google OAuth 登录设置指南

本项目已集成 Supabase 的 Google OAuth 登录功能，使用服务器端认证方式。

## 前置要求

1. Supabase 项目
2. Google Cloud Console 项目

## 设置步骤

### 1. 配置 Google Cloud Console

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 前往 **APIs & Services** > **Credentials**
5. 创建 OAuth 2.0 客户端 ID：
   - 应用类型：Web application
   - 授权的 JavaScript 来源：
     - 开发环境：`http://localhost:3000`
     - 生产环境：你的网站 URL
   - 授权的重定向 URI：
     - `https://<your-project-ref>.supabase.co/auth/v1/callback`
6. 保存客户端 ID 和客户端密钥

### 2. 配置 Supabase

1. 登录 [Supabase Dashboard](https://app.supabase.com/)
2. 选择你的项目
3. 前往 **Authentication** > **Providers**
4. 找到 **Google** 提供商并启用它
5. 输入你的 Google OAuth 客户端 ID 和客户端密钥
6. 保存更改

### 3. 配置环境变量

1. 复制 `.env.example` 到 `.env.local`：
   ```bash
   cp .env.example .env.local
   ```

2. 在 `.env.local` 中填写你的 Supabase 凭据：
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000  # 生产环境改为你的域名
   ```

3. 从 Supabase Dashboard 获取这些值：
   - 前往 **Settings** > **API**
   - **Project URL** = `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** > **anon/public** = `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. 配置 Google OAuth 的重定向 URL

确保在 Google Cloud Console 中配置的重定向 URI 包括：

**开发环境：**
```
http://localhost:3000/auth/callback
```

**生产环境：**
```
https://your-domain.com/auth/callback
```

### 5. 测试登录

1. 启动开发服务器：
   ```bash
   pnpm dev
   ```

2. 访问 `http://localhost:3000`
3. 点击 "Sign in with Google" 按钮
4. 完成 Google 登录流程
5. 成功后你将被重定向回应用

## 文件说明

### 核心文件

- **`lib/supabase/server.ts`** - 服务器端 Supabase 客户端
- **`lib/supabase/client.ts`** - 客户端 Supabase 客户端
- **`lib/supabase/middleware.ts`** - 中间件会话管理
- **`app/auth/callback/route.ts`** - OAuth 回调处理器
- **`app/api/auth/google/route.ts`** - Google 登录 API 路由（可选）
- **`components/GoogleSignInButton.tsx`** - Google 登录按钮组件
- **`components/UserMenu.tsx`** - 用户菜单组件

### 认证流程

1. 用户点击 "Sign in with Google" 按钮
2. `GoogleSignInButton` 组件调用 `supabase.auth.signInWithOAuth()`
3. 用户被重定向到 Google 登录页面
4. 用户授权后，Google 重定向到 `/auth/callback` 并带有授权码
5. 回调路由使用 `exchangeCodeForSession()` 交换授权码获取会话
6. 用户被重定向回应用主页
7. 客户端监听认证状态变化并更新 UI

## 安全注意事项

1. **永远不要提交 `.env.local`** - 已在 `.gitignore` 中排除
2. **使用环境变量** - 所有敏感信息都应通过环境变量配置
3. **HTTPS** - 生产环境必须使用 HTTPS
4. **Row Level Security (RLS)** - 在 Supabase 中为数据表启用 RLS

## 故障排除

### 重定向 URI 不匹配错误

确保 Google Cloud Console 中配置的重定向 URI 与 Supabase 提供的完全一致。

### 会话未持久化

检查中间件是否正确配置并且 `middleware.ts` 在项目根目录中。

### CORS 错误

确保 Supabase 项目的 CORS 设置允许你的域名。

## 更多资源

- [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
- [Supabase Server-Side Auth](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Google OAuth 文档](https://developers.google.com/identity/protocols/oauth2)
