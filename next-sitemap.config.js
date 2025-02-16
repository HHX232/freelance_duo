/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kronfort.labab.ru',
  generateRobotsTxt: false,
  changefreq: 'daily',
  priority: 0.8,
  exclude: ['/404', '/500'],
  sitemapBaseFileName: 'sitemap',
  generateIndexSitemap: false,
  additionalPaths: async (config) => {
    const paths = [];

    // Статические пути
    paths.push(
      {
        loc: '/planirovki-i-ceny',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/studii',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/lofty',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/odnokomnatnye',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/kvartiry-s-terrasoi',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/kvartiry-s-balkonom',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/kvartiry-s-kladovoi',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/kvartiry-s-razdelnym-su',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/kvartiry-s-lodzhiei',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/kvartiry-s-garderobnoi',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/dvukhkomnatnye',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/3-komnatnye',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/gallery',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/news',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    );

    // Динамические пути
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/flats/ids`);
      const apartments = await response.json();

      apartments.forEach((apartmentId) => {
        paths.push({
          loc: `/apartment-card/${apartmentId}`,
          changefreq: 'daily',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      });
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }

    try {
      const newsResponse = await fetch(`${process.env.BACKEND_URL}/api/news`);
      const newsItems = await newsResponse.json();

      newsItems.forEach((newsItem) => {
        paths.push({
          loc: `/news/${newsItem.slug}`,
          changefreq: 'daily',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      });
    } catch (error) {
      console.error("Error fetching news:", error);
    }

    return paths;
  },
  transform: async (config, path) => {
    let priority = 0.8;
    if (path === '/') {
      priority = 1.0;
    }

    return {
      loc: path, // Полный URL будет автоматически добавлен
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
