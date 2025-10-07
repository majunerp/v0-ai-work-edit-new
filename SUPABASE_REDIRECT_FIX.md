# Supabase 重定向 URL 配置指南

## 🚨 问题诊断

如果 Google OAuth 登录后跳转到 `localhost:3000` 而不是生产域名，问题在于 **Supabase 项目设置**，而不是代码。

## 📋 解决步骤

### 1. 更新 Supabase Site URL

这是最重要的配置！

1. 访问 Supabase Dashboard
2. 选择项目：`hzbewyqfutillqvbfbji`
3. 进入 **Settings** → **General**
4. 找到 **Site URL** 配置
5. 当前值可能是：`http://localhost:3000`
6. 更改为生产域名：
   ```
   https://www.aiworkeditprotips.net
   ```
7. 点击 **Save**

**直接访问链接：**
```
https://app.supabase.com/project/hzbewyqfutillqvbfbji/settings/general
```

### 2. 配置 Redirect URLs

1. 进入 **Authentication** → **URL Configuration**
2. 找到 **Redirect URLs** 配置
3. 添加以下 URL（一行一个）：

```
https://www.aiworkeditprotips.net/**
http://localhost:3000/**
```

或者更具体：

```
https://www.aiworkeditprotips.net/auth/callback
http://localhost:3000/auth/callback
```

4. 点击 **Save**

**直接访问链接：**
```
https://app.supabase.com/project/hzbewyqfutillqvbfbji/auth/url-configuration
```

### 3. 检查 Google Provider 配置

1. 进入 **Authentication** → **Providers**
2. 找到 **Google** 提供商
3. 确认状态：**Enabled** ✅
4. 检查显示的回调 URL（应该是）：
   ```
   https://hzbewyqfutillqvbfbji.supabase.co/auth/v1/callback
   ```

**直接访问链接：**
```
https://app.supabase.com/project/hzbewyqfutillqvbfbji/auth/providers
```

## 🔍 为什么会这样？

Supabase 的 OAuth 流程：

1. 用户点击 "Sign in with Google"
2. 重定向到 Google OAuth
3. 用户授权
4. Google 回调到 Supabase: `https://xxx.supabase.co/auth/v1/callback`
5. **Supabase 使用 Site URL 配置决定最终重定向到哪里** ⚠️
6. 如果 Site URL 是 `localhost:3000`，就会跳回 localhost

## ✅ 配置检查清单

完成配置后，检查以下内容：

- [ ] Supabase Site URL = `https://www.aiworkeditprotips.net`
- [ ] Redirect URLs 包含生产域名
- [ ] Google Provider 已启用
- [ ] Vercel 环境变量已设置（已完成）
- [ ] Google Cloud Console 重定向 URI 正确

## 🧪 测试步骤

配置更新后（无需重新部署）：

1. 清除浏览器缓存
2. 访问：`https://www.aiworkeditprotips.net`
3. 点击 "Sign in with Google"
4. 选择 Google 账号
5. 授权后应该重定向到：
   ```
   https://www.aiworkeditprotips.net/auth/callback?code=...
   ```

## 📸 配置截图参考

### Site URL 配置位置
```
Supabase Dashboard
└── Settings
    └── General
        └── Site URL: [输入生产域名]
```

### Redirect URLs 配置位置
```
Supabase Dashboard
└── Authentication
    └── URL Configuration
        └── Redirect URLs: [添加生产域名通配符]
```

## 🆘 常见问题

### Q: 修改后还是跳转到 localhost？
A: 清除浏览器缓存，或使用隐身模式测试

### Q: 需要重新部署 Vercel 吗？
A: 不需要！Supabase 配置是服务器端的，立即生效

### Q: 本地开发会受影响吗？
A: 不会！只要 Redirect URLs 中保留 `localhost:3000/**`

### Q: Site URL 可以设置多个吗？
A: 不可以，只能设置一个。生产环境应设置为生产域名，本地开发时使用 Redirect URLs 的白名单

## 🔗 相关链接

- [Supabase 项目设置](https://app.supabase.com/project/hzbewyqfutillqvbfbji/settings/general)
- [Supabase URL 配置](https://app.supabase.com/project/hzbewyqfutillqvbfbji/auth/url-configuration)
- [Supabase Providers](https://app.supabase.com/project/hzbewyqfutillqvbfbji/auth/providers)
- [Supabase Auth 文档](https://supabase.com/docs/guides/auth/redirect-urls)
