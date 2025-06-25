interface SEOMetrics {
  hasMetaDescription: boolean;
  metaDescriptionLength: number;
  isMetaDescriptionGeneric: boolean;
  hasTitleTag: boolean;
  titleLength: number;
  hasH1Tag: boolean;
  h1Count: number;
  hasCanonicalUrl: boolean;
  isCanonicalUrlCorrect: boolean;
  internalLinksCount: number;
  imagesWithoutAlt: number;
  pageLoadTime: number; // in seconds
  hasStructuredData: boolean;
}

interface SEOIssue {
  severity: 'critical' | 'warning' | 'suggestion';
  category: 'meta' | 'content' | 'technical' | 'performance';
  title: string;
  description: string;
  solution: string;
  impact: number; // A score from 1-10 representing importance
}

export interface SEOAuditResult {
  url: string;
  score: number;
  metrics: SEOMetrics;
  issues: SEOIssue[];
  recommendations: string[];
  lastAudited: string;
}

export class SEOAuditService {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://top-cleaners.net') {
    this.baseUrl = baseUrl;
  }

  async auditPage(url: string): Promise<SEOAuditResult> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    const mockMetrics: SEOMetrics = {
      hasMetaDescription: Math.random() > 0.1,
      metaDescriptionLength: Math.floor(Math.random() * 100) + 80, // 80 to 180 chars
      isMetaDescriptionGeneric: Math.random() < 0.2,
      hasTitleTag: true,
      titleLength: Math.floor(Math.random() * 30) + 40, // 40 to 70 chars
      hasH1Tag: Math.random() > 0.1,
      h1Count: Math.random() > 0.8 ? 2 : 1,
      hasCanonicalUrl: Math.random() > 0.15,
      isCanonicalUrlCorrect: Math.random() > 0.2,
      internalLinksCount: Math.floor(Math.random() * 15) + 3,
      imagesWithoutAlt: Math.floor(Math.random() * 5),
      pageLoadTime: parseFloat((Math.random() * 2.5 + 0.8).toFixed(1)), // 0.8s to 3.3s
      hasStructuredData: Math.random() > 0.2
    };

    const issues = this.generateIssues(mockMetrics, url);
    const score = this.calculateScore(issues);
    const recommendations = this.generateRecommendations(issues);

    return {
      url,
      score,
      metrics: mockMetrics,
      issues,
      recommendations,
      lastAudited: new Date().toISOString()
    };
  }

  private generateIssues(metrics: SEOMetrics, url: string): SEOIssue[] {
    const issues: SEOIssue[] = [];

    if (!metrics.hasMetaDescription) issues.push({ severity: 'critical', category: 'meta', title: 'Meta Description مفقود', description: `صفحة ${url} لا تحتوي على وصف تعريفي.`, solution: 'إضافة وصف فريد وجذاب بطول 150-160 حرفًا.', impact: 9 });
    else if (metrics.metaDescriptionLength < 120) issues.push({ severity: 'warning', category: 'meta', title: 'وصف تعريفي قصير جدًا', description: `الوصف بطول ${metrics.metaDescriptionLength} حرفًا فقط.`, solution: 'زيادة طول الوصف ليشمل المزيد من التفاصيل والكلمات المفتاحية.', impact: 6 });
    else if (metrics.isMetaDescriptionGeneric) issues.push({ severity: 'warning', category: 'meta', title: 'وصف تعريفي عام', description: `الوصف قد يكون عامًا وغير مخصص لمحتوى الصفحة.`, solution: 'تخصيص الوصف ليعكس محتوى الصفحة بدقة ويشجع على النقر.', impact: 5 });

    if (metrics.titleLength > 65) issues.push({ severity: 'warning', category: 'meta', title: 'عنوان الصفحة طويل', description: `العنوان بطول ${metrics.titleLength} حرفًا، وقد يتم قطعه في نتائج البحث.`, solution: 'تقصير العنوان ليكون بين 50-60 حرفًا.', impact: 7 });
    
    if (!metrics.hasH1Tag) issues.push({ severity: 'critical', category: 'content', title: 'عنوان H1 مفقود', description: `الصفحة لا تحتوي على عنوان H1 أساسي.`, solution: 'إضافة عنوان H1 فريد لكل صفحة يصف محتواها الرئيسي.', impact: 8 });
    else if (metrics.h1Count > 1) issues.push({ severity: 'warning', category: 'content', title: 'عدة عناوين H1', description: `تم العثور على ${metrics.h1Count} عناوين H1.`, solution: 'يجب استخدام عنوان H1 واحد فقط في كل صفحة.', impact: 6 });

    if (!metrics.hasCanonicalUrl) issues.push({ severity: 'critical', category: 'technical', title: 'Canonical URL مفقود', description: 'الصفحة لا تحتوي على وسم canonical URL.', solution: 'إضافة وسم canonical URL ذاتي الإشارة لتجنب المحتوى المكرر.', impact: 9 });
    else if (!metrics.isCanonicalUrlCorrect) issues.push({ severity: 'critical', category: 'technical', title: 'Canonical URL غير صحيح', description: 'وسم canonical URL يشير إلى صفحة مختلفة.', solution: 'التأكد من أن وسم canonical URL يشير إلى عنوان URL الصحيح للصفحة.', impact: 10 });
    
    if (metrics.imagesWithoutAlt > 0) issues.push({ severity: 'warning', category: 'content', title: 'صور بدون نص بديل (Alt Text)', description: `تم العثور على ${metrics.imagesWithoutAlt} صورة بدون نص بديل.`, solution: 'إضافة نصوص بديلة وصفية لجميع الصور لتحسين إمكانية الوصول و SEO للصور.', impact: 4 });
    
    if (metrics.pageLoadTime > 2.5) issues.push({ severity: 'warning', category: 'performance', title: 'أكبر محتوى مرئي (LCP) بطيء', description: `وقت تحميل الصفحة هو ${metrics.pageLoadTime} ثانية.`, solution: 'تحسين سرعة التحميل عن طريق ضغط الصور، وتحسين الشيفرة، واستخدام التخزين المؤقت.', impact: 8 });

    return issues;
  }

  private calculateScore(issues: SEOIssue[]): number {
    let score = 100;
    issues.forEach(issue => {
      if (issue.severity === 'critical') score -= issue.impact;
      else if (issue.severity === 'warning') score -= issue.impact * 0.5;
      else score -= issue.impact * 0.2;
    });
    return Math.max(0, Math.round(score));
  }

  private generateRecommendations(issues: SEOIssue[]): string[] {
    return issues
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 3)
      .map(issue => issue.solution);
  }
}

export const seoAuditService = new SEOAuditService();