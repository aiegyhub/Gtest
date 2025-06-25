
interface GSCQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCPage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCPerformanceData {
  queries: GSCQuery[];
  pages: GSCPage[];
  totalClicks: number;
  totalImpressions: number;
  averageCTR: number;
  averagePosition: number;
}

interface GSCSearchAppearance {
  searchAppearanceType: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export class GSCService {
  private apiKey: string | null = null;
  private siteUrl: string | null = null;
  private accessToken: string | null = null;

  constructor() {
    // Load settings from localStorage
    this.loadSettings();
  }

  private loadSettings() {
    this.apiKey = localStorage.getItem('gsc_api_key');
    this.siteUrl = localStorage.getItem('gsc_site_url');
    this.accessToken = localStorage.getItem('gsc_access_token');
  }

  public saveSettings(apiKey: string, siteUrl: string, accessToken: string) {
    this.apiKey = apiKey;
    this.siteUrl = siteUrl;
    this.accessToken = accessToken;
    
    localStorage.setItem('gsc_api_key', apiKey);
    localStorage.setItem('gsc_site_url', siteUrl);
    localStorage.setItem('gsc_access_token', accessToken);
  }

  public getSettings() {
    return {
      apiKey: this.apiKey,
      siteUrl: this.siteUrl,
      accessToken: this.accessToken,
      isConfigured: !!(this.apiKey && this.siteUrl && this.accessToken)
    };
  }

  public async testConnection(): Promise<boolean> {
    if (!this.isConfigured()) {
      throw new Error('GSC غير مُكوَّن بشكل صحيح');
    }

    try {
      // Simulate API call - in real implementation, this would call GSC API
      console.log('Testing GSC connection...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('GSC connection test failed:', error);
      return false;
    }
  }

  public async getPerformanceData(
    startDate: string,
    endDate: string,
    dimensions: string[] = ['query', 'page']
  ): Promise<GSCPerformanceData> {
    if (!this.isConfigured()) {
      throw new Error('GSC غير مُكوَّن بشكل صحيح');
    }

    try {
      // Simulate API call - in real implementation, this would call GSC API
      console.log(`Fetching GSC data from ${startDate} to ${endDate}`);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Return mock data for demonstration
      return this.getMockPerformanceData();
    } catch (error) {
      console.error('Failed to fetch GSC performance data:', error);
      throw error;
    }
  }

  public async getTopQueriesForPage(page: string, limit: number = 10): Promise<GSCQuery[]> {
    if (!this.isConfigured()) {
      throw new Error('GSC غير مُكوَّن بشكل صحيح');
    }

    try {
      console.log(`Fetching top queries for page: ${page}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return mock data - in real implementation, filter by specific page
      return this.getMockQueriesForPage(page, limit);
    } catch (error) {
      console.error('Failed to fetch queries for page:', error);
      throw error;
    }
  }

  public async getSearchAppearanceData(): Promise<GSCSearchAppearance[]> {
    if (!this.isConfigured()) {
      throw new Error('GSC غير مُكوَّن بشكل صحيح');
    }

    try {
      console.log('Fetching search appearance data...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      return [
        {
          searchAppearanceType: 'Web Results',
          clicks: 1250,
          impressions: 15600,
          ctr: 8.01,
          position: 12.5
        },
        {
          searchAppearanceType: 'Image Results',
          clicks: 85,
          impressions: 2100,
          ctr: 4.05,
          position: 18.2
        }
      ];
    } catch (error) {
      console.error('Failed to fetch search appearance data:', error);
      throw error;
    }
  }

  private isConfigured(): boolean {
    return !!(this.apiKey && this.siteUrl && this.accessToken);
  }

  private getMockPerformanceData(): GSCPerformanceData {
    const mockQueries: GSCQuery[] = [
      { query: 'تنظيف منازل الرياض', clicks: 145, impressions: 2800, ctr: 5.18, position: 8.2 },
      { query: 'شركة تنظيف بجدة', clicks: 98, impressions: 1950, ctr: 5.03, position: 12.1 },
      { query: 'مكافحة حشرات الدمام', clicks: 87, impressions: 1650, ctr: 5.27, position: 9.8 },
      { query: 'صيانة مكيفات مكة', clicks: 76, impressions: 1420, ctr: 5.35, position: 11.5 },
      { query: 'خدمات سباكة الرياض', clicks: 65, impressions: 1280, ctr: 5.08, position: 13.2 },
      { query: 'نقل اثاث جدة', clicks: 54, impressions: 1150, ctr: 4.70, position: 15.8 },
      { query: 'تنظيف خزانات المياه', clicks: 43, impressions: 980, ctr: 4.39, position: 18.3 },
      { query: 'خدمات كهرباء منزلية', clicks: 38, impressions: 850, ctr: 4.47, position: 16.9 },
      { query: 'تنظيف مجالس الرياض', clicks: 32, impressions: 720, ctr: 4.44, position: 19.2 },
      { query: 'شركة تنظيف سجاد', clicks: 28, impressions: 650, ctr: 4.31, position: 21.5 }
    ];

    const mockPages: GSCPage[] = [
      { page: 'https://musaaed.com/sa/riyadh/home-cleaning', clicks: 245, impressions: 3200, ctr: 7.66, position: 8.5 },
      { page: 'https://musaaed.com/sa/jeddah/home-cleaning', clicks: 198, impressions: 2800, ctr: 7.07, position: 9.2 },
      { page: 'https://musaaed.com/services/pest-control', clicks: 167, impressions: 2400, ctr: 6.96, position: 10.1 },
      { page: 'https://musaaed.com/sa/riyadh/ac-maintenance', clicks: 134, impressions: 2100, ctr: 6.38, position: 11.8 },
      { page: 'https://musaaed.com/sa/dammam/pest-control', clicks: 112, impressions: 1850, ctr: 6.05, position: 12.9 }
    ];

    return {
      queries: mockQueries,
      pages: mockPages,
      totalClicks: mockQueries.reduce((sum, q) => sum + q.clicks, 0),
      totalImpressions: mockQueries.reduce((sum, q) => sum + q.impressions, 0),
      averageCTR: 5.12,
      averagePosition: 13.8
    };
  }

  private getMockQueriesForPage(page: string, limit: number): GSCQuery[] {
    // Mock queries specific to a page
    const allQueries = this.getMockPerformanceData().queries;
    return allQueries.slice(0, limit);
  }
}

export const gscService = new GSCService();
