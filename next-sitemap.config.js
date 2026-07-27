// Only the real public site gets a crawlable robots.txt and a sitemap. The
// review deploy (ks.gbit.au) and any preview must stay out of search results,
// so they emit a blanket disallow instead. See the matching X-Robots-Tag logic
// in next.config.ts — both key off the site URL so cutover flips them together.
const PRODUCTION_SITE_URL = 'https://kindsisters.org.au';

const siteUrl =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_SITE_URL;

const isProductionSite = siteUrl.replace(/\/$/, '') === PRODUCTION_SITE_URL;

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl,
  generateRobotsTxt: true,
  // No sitemap for a site that should not be indexed. Handing crawlers a map
  // of a deliberately hidden site defeats the point.
  generateIndexSitemap: isProductionSite,
  exclude: ['/api/*', '/admin', '/admin/*'],
  // Returning null drops a path from the sitemap. On a non-production build we
  // drop every path, so the emitted sitemap is empty rather than a directory of
  // a site we are trying to keep hidden. `exclude: ['*']` does not do this —
  // it is matched against routes and silently let everything through.
  transform: async (config, urlPath) => {
    if (!isProductionSite) return null;
    return {
      loc: urlPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: isProductionSite
      ? [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin'],
          },
        ]
      : [
          {
            userAgent: '*',
            disallow: '/',
          },
        ],
  },
};
