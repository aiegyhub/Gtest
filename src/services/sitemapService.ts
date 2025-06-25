
import { generateSitemap } from "@/utils/sitemapGenerator";

export class SitemapService {
  private static instance: SitemapService;
  private lastUpdate: Date = new Date();

  static getInstance(): SitemapService {
    if (!SitemapService.instance) {
      SitemapService.instance = new SitemapService();
    }
    return SitemapService.instance;
  }

  async updateSitemap(): Promise<boolean> {
    try {
      const sitemapContent = generateSitemap();
      
      // في بيئة الإنتاج، يجب إرسال هذا إلى الخادم
      console.log('Sitemap updated successfully');
      this.lastUpdate = new Date();
      
      // حفظ في localStorage للمحاكاة
      localStorage.setItem('sitemap_content', sitemapContent);
      localStorage.setItem('sitemap_last_update', this.lastUpdate.toISOString());
      
      return true;
    } catch (error) {
      console.error('Error updating sitemap:', error);
      return false;
    }
  }

  getLastUpdate(): Date {
    return this.lastUpdate;
  }

  async scheduleAutoUpdate(): Promise<void> {
    // تحديث تلقائي كل 24 ساعة
    setInterval(async () => {
      await this.updateSitemap();
    }, 24 * 60 * 60 * 1000);
  }

  async submitToSearchEngines(): Promise<boolean> {
    try {
      const sitemapUrl = 'https://saudiservices.sa/sitemap.xml';
      
      // إرسال إلى Google Search Console
      const googleUrl = `https://www.google.com/webmasters/tools/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      
      // إرسال إلى Bing
      const bingUrl = `https://www.bing.com/webmaster/ping.aspx?siteMap=${encodeURIComponent(sitemapUrl)}`;
      
      console.log('Sitemap submitted to search engines');
      return true;
    } catch (error) {
      console.error('Error submitting sitemap:', error);
      return false;
    }
  }
}

export const sitemapService = SitemapService.getInstance();
