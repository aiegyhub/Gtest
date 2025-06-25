import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Search,
  Eye,
  Link,
  Image,
  Zap,
  RefreshCw,
  FileText,
  Target
} from "lucide-react";
import { toast } from "sonner";

interface SEOIssue {
  type: 'critical' | 'warning' | 'suggestion';
  category: 'meta' | 'content' | 'technical' | 'performance';
  title: string;
  description: string;
  affectedPages: number;
  impact: 'high' | 'medium' | 'low';
  solution: string;
  priority: number;
}

interface PageAudit {
  url: string;
  score: number;
  issues: number;
  status: 'good' | 'warning' | 'critical';
  lastChecked: string;
}

interface AuditSummary {
  overallScore: number;
  totalIssues: number;
  criticalIssues: number;
  warningIssues: number;
  suggestions: number;
  pagesAudited: number;
}

const SEOAuditDashboard = () => {
  const [auditSummary, setAuditSummary] = useState<AuditSummary>({
    overallScore: 0,
    totalIssues: 0,
    criticalIssues: 0,
    warningIssues: 0,
    suggestions: 0,
    pagesAudited: 0
  });
  const [seoIssues, setSeoIssues] = useState<SEOIssue[]>([]);
  const [pageAudits, setPageAudits] = useState<PageAudit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    runSEOAudit();
  }, []);

  const runSEOAudit = async () => {
    setIsLoading(true);
    try {
      // محاكاة تشغيل تدقيق SEO
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockIssues: SEOIssue[] = [
        {
          type: 'critical',
          category: 'meta',
          title: 'Meta Description مفقودة',
          description: 'بعض الصفحات لا تحتوي على meta description',
          affectedPages: 12,
          impact: 'high',
          solution: 'إضافة meta description لجميع الصفحات',
          priority: 1
        },
        {
          type: 'warning',
          category: 'content',
          title: 'عناوين H1 مكررة',
          description: 'عدة صفحات تستخدم نفس عنوان H1',
          affectedPages: 8,
          impact: 'medium',
          solution: 'تخصيص عناوين H1 فريدة لكل صفحة',
          priority: 2
        },
        {
          type: 'critical',
          category: 'technical',
          title: 'صفحات بدون Canonical URL',
          description: 'صفحات لا تحتوي على canonical URL',
          affectedPages: 15,
          impact: 'high',
          solution: 'إضافة canonical URL لجميع الصفحات',
          priority: 1
        },
        {
          type: 'warning',
          category: 'performance',
          title: 'سرعة تحميل بطيئة',
          description: 'بعض الصفحات تستغرق أكثر من 3 ثوان للتحميل',
          affectedPages: 6,
          impact: 'medium',
          solution: 'تحسين الصور وضغط الملفات',
          priority: 3
        },
        {
          type: 'suggestion',
          category: 'content',
          title: 'كثافة الكلمات المفتاحية منخفضة',
          description: 'محتوى يحتاج تحسين للكلمات المفتاحية',
          affectedPages: 20,
          impact: 'low',
          solution: 'تحسين كثافة الكلمات المفتاحية في المحتوى',
          priority: 4
        }
      ];

      const mockPageAudits: PageAudit[] = [
        {
          url: '/sa/riyadh/home-cleaning',
          score: 85,
          issues: 2,
          status: 'good',
          lastChecked: '2024-01-15 10:30'
        },
        {
          url: '/sa/jeddah/home-cleaning',
          score: 72,
          issues: 4,
          status: 'warning',
          lastChecked: '2024-01-15 10:31'
        },
        {
          url: '/services/pest-control',
          score: 45,
          issues: 8,
          status: 'critical',
          lastChecked: '2024-01-15 10:32'
        },
        {
          url: '/sa/riyadh/ac-maintenance',
          score: 78,
          issues: 3,
          status: 'warning',
          lastChecked: '2024-01-15 10:33'
        }
      ];

      const summary: AuditSummary = {
        overallScore: 72,
        totalIssues: mockIssues.length,
        criticalIssues: mockIssues.filter(i => i.type === 'critical').length,
        warningIssues: mockIssues.filter(i => i.type === 'warning').length,
        suggestions: mockIssues.filter(i => i.type === 'suggestion').length,
        pagesAudited: mockPageAudits.length
      };

      setSeoIssues(mockIssues);
      setPageAudits(mockPageAudits);
      setAuditSummary(summary);
      
      toast.success('تم إكمال تدقيق SEO بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تدقيق SEO');
    } finally {
      setIsLoading(false);
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'suggestion': return <Eye className="h-5 w-5 text-blue-600" />;
      default: return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suggestion': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredIssues = selectedCategory === 'all' 
    ? seoIssues 
    : seoIssues.filter(issue => issue.category === selectedCategory);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">لوحة تدقيق SEO</h2>
          <p className="text-gray-600">تدقيق شامل لحالة SEO وتحديد المشاكل</p>
        </div>
        <Button onClick={runSEOAudit} disabled={isLoading}>
          {isLoading ? <Clock className="h-4 w-4 animate-spin ml-2" /> : <RefreshCw className="h-4 w-4 ml-2" />}
          {isLoading ? 'جاري التدقيق...' : 'تشغيل التدقيق'}
        </Button>
      </div>

      {/* ملخص النتائج */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-90">النتيجة الإجمالية</p>
                <p className="text-xl font-bold">{auditSummary.overallScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-90">مشاكل حرجة</p>
                <p className="text-xl font-bold">{auditSummary.criticalIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-90">تحذيرات</p>
                <p className="text-xl font-bold">{auditSummary.warningIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-90">اقتراحات</p>
                <p className="text-xl font-bold">{auditSummary.suggestions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-90">الصفحات المدققة</p>
                <p className="text-xl font-bold">{auditSummary.pagesAudited}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-90">إجمالي المشاكل</p>
                <p className="text-xl font-bold">{auditSummary.totalIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="issues" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="issues">المشاكل والحلول</TabsTrigger>
          <TabsTrigger value="pages">تدقيق الصفحات</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المشاكل المكتشفة</CardTitle>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                >
                  الكل
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedCategory === 'meta' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('meta')}
                >
                  Meta Tags
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedCategory === 'content' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('content')}
                >
                  المحتوى
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedCategory === 'technical' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('technical')}
                >
                  تقني
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedCategory === 'performance' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('performance')}
                >
                  الأداء
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredIssues.map((issue, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${getIssueColor(issue.type)}`}>
                    <div className="flex items-start gap-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{issue.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {issue.affectedPages} صفحة متأثرة
                            </Badge>
                            <Badge variant={issue.impact === 'high' ? 'destructive' : 
                                           issue.impact === 'medium' ? 'default' : 'secondary'}>
                              تأثير {issue.impact === 'high' ? 'عالي' : 
                                     issue.impact === 'medium' ? 'متوسط' : 'منخفض'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm mb-3 opacity-90">{issue.description}</p>
                        <div className="bg-white bg-opacity-50 p-3 rounded border">
                          <h5 className="font-medium mb-1">الحل المقترح:</h5>
                          <p className="text-sm">{issue.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تدقيق الصفحات الفردية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pageAudits.map((page, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold">{page.url}</h4>
                        <p className="text-sm text-gray-600">آخر فحص: {page.lastChecked}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(page.score)}`}>
                            {page.score}%
                          </div>
                          <div className="text-xs text-gray-600">النتيجة</div>
                        </div>
                        <Badge 
                          variant={page.status === 'good' ? 'default' : 
                                  page.status === 'warning' ? 'secondary' : 'destructive'}
                        >
                          {page.status === 'good' ? 'جيد' : 
                           page.status === 'warning' ? 'تحذير' : 'مشاكل'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 ml-4">
                        <Progress value={page.score} className="h-2" />
                      </div>
                      <span className="text-sm text-gray-600">
                        {page.issues} مشكلة مكتشفة
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOAuditDashboard;