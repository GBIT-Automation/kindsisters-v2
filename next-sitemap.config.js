/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || 'https://kindsisters.org.au',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin'],
      },
    ],
  },
};
