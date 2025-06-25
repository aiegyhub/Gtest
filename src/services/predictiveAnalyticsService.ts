interface PredictiveInsight {
  id: string;
  type: 'growth' | 'optimization' | 'warning' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  actionable: boolean;
  recommendations?: string[];
}

interface SeasonalTrend {
  service: string;
  month: string;
  expectedDemand: number; // Represents percentage increase
  confidenceLevel: number;
  factors: string[];
}

interface CustomerBehaviorPattern {
  segment: string;
  behavior: string;
  frequency: number;
  value: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export class PredictiveAnalyticsService {
  
  async generatePredictiveInsights(): Promise<PredictiveInsight[]> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return [
      {
        id: '1',
        type: 'growth',
        title: 'نمو متوقع في خدمات العزل',
        description: 'بناءً على بيانات الطقس، نتوقع زيادة 40% في طلبات العزل المائي والحراري في منطقة عسير خلال الأشهر الثلاثة القادمة.',
        confidence: 91,
        impact: 'high',
        timeframe: '3 أشهر',
        actionable: true,
        recommendations: ['زيادة فرق العزل في أبها وخميس مشيط', 'إطلاق حملة تسويقية عن أهمية العزل قبل موسم الأمطار']
      },
      {
        id: '2',
        type: 'optimization',
        title: 'تحسين معدل التحويل لخدمة "رش الدفان"',
        description: 'صفحة "رش الدفان" لديها معدل مشاهدة عالٍ ولكن معدل تحويل منخفض. يمكن تحسينه بنسبة 25% بإضافة فيديو توضيحي.',
        confidence: 88,
        impact: 'medium',
        timeframe: 'خلال شهر',
        actionable: true,
        recommendations: ['إنشاء فيديو يشرح عملية رش الدفان', 'إضافة قسم شهادات العملاء لهذه الخدمة تحديداً']
      },
      {
        id: '3',
        type: 'warning',
        title: 'منافسة متزايدة في خدمات الكهرباء بحفر الباطن',
        description: 'ظهور منافسين جدد قد يؤثر على حصتنا السوقية بنسبة 10-15%.',
        confidence: 75,
        impact: 'medium',
        timeframe: '6 أشهر',
        actionable: true,
        recommendations: ['إطلاق عروض أسعار تنافسية', 'تعزيز برنامج الولاء للعملاء الحاليين في حفر الباطن']
      },
      {
        id: '4',
        type: 'opportunity',
        title: 'فرصة لخدمات "كشف تسريبات المسابح" في جدة',
        description: 'بيانات البحث تشير إلى طلب متزايد على خدمة كشف تسريبات المسابح في جدة مع نقص في مقدمي الخدمة الموثوقين.',
        confidence: 85,
        impact: 'high',
        timeframe: 'الشهر القادم',
        actionable: true,
        recommendations: ['إطلاق حملة إعلانية مستهدفة في جدة', 'تدريب فريق متخصص لهذه الخدمة في فرع جدة']
      }
    ];
  }

  async getSeasonalTrends(): Promise<SeasonalTrend[]> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return [
      {
        service: 'صيانة المكيفات',
        month: 'مايو - أغسطس',
        expectedDemand: 180,
        confidenceLevel: 96,
        factors: ['ارتفاع درجات الحرارة', 'زيادة الاستخدام', 'أعطال متكررة']
      },
      {
        service: 'خدمات العزل',
        month: 'سبتمبر - نوفمبر',
        expectedDemand: 160,
        confidenceLevel: 91,
        factors: ['الاستعداد لموسم الأمطار', 'الرغبة في توفير الطاقة شتاءً']
      },
      {
        service: 'مكافحة الحشرات',
        month: 'مارس - يونيو',
        expectedDemand: 140,
        confidenceLevel: 89,
        factors: ['تكاثر الحشرات مع اعتدال الجو', 'زيادة الأنشطة الخارجية']
      },
      {
        service: 'نقل الأثاث',
        month: 'يوليو - أغسطس',
        expectedDemand: 120,
        confidenceLevel: 85,
        factors: ['إجازات الصيف', 'الانتقال للمدارس الجديدة', 'انتهاء عقود الإيجار']
      }
    ];
  }

  async getCustomerBehaviorPatterns(): Promise<CustomerBehaviorPattern[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      { segment: 'العملاء المتكررون', behavior: 'حجز باقات صيانة دورية', frequency: 2.5, value: 950, trend: 'increasing' },
      { segment: 'العملاء الجدد', behavior: 'البدء بخدمة طوارئ (تسريب/كهرباء)', frequency: 1.2, value: 350, trend: 'stable' },
      { segment: 'العملاء التجاريون', behavior: 'طلب خدمات تنظيف وعزل للمشاريع', frequency: 1.8, value: 4500, trend: 'increasing' },
      { segment: 'عملاء الفلل', behavior: 'طلب باقات خدمات متكاملة', frequency: 2.1, value: 1800, trend: 'stable' },
    ];
  }

  async generateMarketForecast(timeframe: '30d' | '90d' | '180d'): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const baseData = { totalRevenue: 550000, bookingsCount: 2100, customerGrowth: 15, marketShare: 28 };
    const multipliers = { '30d': { revenue: 1.1, bookings: 1.08, growth: 1.03 }, '90d': { revenue: 1.25, bookings: 1.2, growth: 1.1 }, '180d': { revenue: 1.5, bookings: 1.4, growth: 1.2 }};
    const multiplier = multipliers[timeframe];

    return {
      timeframe,
      forecast: {
        expectedRevenue: Math.round(baseData.totalRevenue * multiplier.revenue),
        expectedBookings: Math.round(baseData.bookingsCount * multiplier.bookings),
        expectedCustomerGrowth: Math.round(baseData.customerGrowth * multiplier.growth * 10) / 10,
        expectedMarketShare: Math.round(baseData.marketShare * 1.1 * 10) / 10
      },
      confidence: timeframe === '30d' ? 93 : timeframe === '90d' ? 87 : 81,
      riskFactors: ['تغيرات في أسعار المواد الخام', 'دخول منافسين جدد للسوق', 'تقلبات اقتصادية إقليمية']
    };
  }
}

export const predictiveAnalyticsService = new PredictiveAnalyticsService();