import { citiesData } from '@/data/citiesData';
import { servicesData } from '@/data/servicesData';
import { City, Service } from '@/types/services';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

class SitemapGenerator {
  private baseUrl: string;
  private lastModified: string;

  constructor(baseUrl: string = 'https://top-cleaners.net') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.lastModified = new Date().toISOString().split('T')[0];
  }

  // Generates URLs for main static pages
  private generateMainPages(): SitemapUrl[] {
    const mainPages = [
      { path: '/', priority: 1.0, changefreq: 'daily' as const },
      { path: '/sa', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/about', priority: 0.7, changefreq: 'monthly' as const },
      { path: '/contact', priority: 0.7, changefreq: 'monthly' as const },
      { path: '/sitemap', priority: 0.5, changefreq: 'weekly' as const },
      { path: '/terms', priority: 0.3, changefreq: 'yearly' as const },
      { path: '/privacy', priority: 0.3, changefreq: 'yearly' as const },
    ];

    return mainPages.map(page => ({
      loc: `${this.baseUrl}${page.path}`,
      lastmod: this.lastModified,
      changefreq: page.changefreq,
      priority: page.priority
    }));
  }

  // Generates URLs for generic service pages (e.g., /services/home-cleaning)
  private generateServicePages(): SitemapUrl[] {
    return servicesData.map(service => ({
      loc: `${this.baseUrl}/services/${service.slug}`,
      lastmod: this.lastModified,
      changefreq: 'weekly' as const,
      priority: 0.8
    }));
  }

  // Generates URLs for all city-related pages
  private generateCityPages(): SitemapUrl[] {
    const cityUrls: SitemapUrl[] = [];

    citiesData.forEach((city: City) => {
      // City landing page (e.g., /sa/riyadh)
      cityUrls.push({
        loc: `${this.baseUrl}/sa/${city.slug}`,
        lastmod: this.lastModified,
        changefreq: 'weekly' as const,
        priority: 0.9
      });

      // Hyper-local service pages (e.g., /sa/riyadh/home-cleaning)
      servicesData.forEach((service: Service) => {
        cityUrls.push({
          loc: `${this.baseUrl}/sa/${city.slug}/${service.slug}`,
          lastmod: this.lastModified,
          changefreq: 'weekly' as const,
          priority: 0.9
        });

        // Hyper-specific sub-service pages (e.g., /sa/riyadh/home-cleaning/general-cleaning)
        service.subServices.forEach(subService => {
            cityUrls.push({
                loc: `${this.baseUrl}/sa/${city.slug}/${service.slug}/${subService.slug}`,
                lastmod: this.lastModified,
                changefreq: 'monthly' as const,
                priority: 0.7
            });
        });
      });
    });

    return cityUrls;
  }

  // Generates the complete XML sitemap content
  public generateXMLSitemap(): string {
    const allUrls = [
      ...this.generateMainPages(),
      ...this.generateServicePages(),
      ...this.generateCityPages()
    ];

    const uniqueUrls = Array.from(new Set(allUrls.map(url => url.loc)))
      .map(loc => allUrls.find(url => url.loc === loc)!);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    uniqueUrls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }
  
  // Gets statistics about the sitemap content
  public getStats() {
    const mainPages = this.generateMainPages().length;
    const servicePages = this.generateServicePages().length;
    
    const cityPagesCount = citiesData.length;
    const cityServicePagesCount = citiesData.length * servicesData.length;
    const subServicePagesCount = citiesData.length * servicesData.reduce((acc, s) => acc + s.subServices.length, 0);

    const totalUrls = mainPages + servicePages + cityPagesCount + cityServicePagesCount + subServicePagesCount;

    return {
      totalUrls,
      mainPages,
      servicePages,
      cityPages: cityPagesCount,
      cityServicePages: cityServicePagesCount,
      subServicePages: subServicePagesCount,
      lastUpdated: this.lastModified
    };
  }
}

// Export a singleton instance and helper functions
export const sitemapGenerator = new SitemapGenerator();
export const generateSitemap = () => sitemapGenerator.generateXMLSitemap();
export const getSitemapStats = () => sitemapGenerator.getStats();

export const downloadSitemap = () => {
  const sitemapContent = generateSitemap();
  const blob = new Blob([sitemapContent], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};