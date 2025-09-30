/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // 用你的网站主域，注意 https 和 www 与线上一致
  siteUrl: 'https://www.aiworkeditprotips.net',
  generateRobotsTxt: true,      // 自动生成 robots.txt
  outDir: 'public',             // 生成到 public/，构建后可直接访问
  sitemapSize: 45000,           // 大站拆分（可保留默认）
  exclude: ['/admin/*', '/api/*'], // 不想进 sitemap 的路径

  // 如有多语言或多个域，可配置 alternateRefs（可选）
  // alternateRefs: [{ href: 'https://www.aiworkeditprotips.net', hreflang: 'en' }],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin/', '/api/'] }, // 与 exclude 对应
    ],
    // 自动在 robots.txt 末尾添加 Sitemap 行（会指向 /sitemap.xml 和分片）
    additionalSitemaps: [
      // 若你有手工维护的其它 sitemap，可以在此追加
      // 'https://www.aiworkeditprotips.net/extra-sitemap.xml'
    ],
  },

  // 可选：自定义优先级/更新频率
  transform: async (config, path) => {
    const isHome = path === '/';
    return {
      loc: path,
      changefreq: isHome ? 'daily' : 'weekly',
      priority: isHome ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      ...(await config.autoLastmod) // 默认会写 lastmod
    };
  },
};