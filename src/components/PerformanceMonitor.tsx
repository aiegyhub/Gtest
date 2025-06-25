
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

interface WebVitalsData {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

const PerformanceMonitor = () => {
  const [vitals, setVitals] = useState<WebVitalsData>({
    lcp: 2.1,
    fid: 85,
    cls: 0.15,
    fcp: 1.8,
    ttfb: 600
  });

  const [pageLoadTimes, setPageLoadTimes] = useState([
    { page: "الصفحة الرئيسية", loadTime: 1.2, trend: "up" },
    { page: "خدمات الرياض", loadTime: 1.8, trend: "down" },
    { page: "تنظيف المنازل", loadTime: 2.1, trend: "up" },
    { page: "مكافحة الحشرات", loadTime: 1.5, trend: "stable" }
  ]);

  const getVitalStatus = (metric: string, value: number) => {
    const thresholds = {
      lcp: { good: 2.5, poor: 4.0 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1.8, poor: 3.0 },
      ttfb: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (value <= threshold.good) return "good";
    if (value <= threshold.poor) return "needs-improvement";
    return "poor";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600 bg-green-100";
      case "needs-improvement": return "text-yellow-600 bg-yellow-100";
      case "poor": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getProgressValue = (metric: string, value: number) => {
    const maxValues = {
      lcp: 4.0,
      fid: 300,
      cls: 0.25,
      fcp: 3.0,
      ttfb: 1800
    };
    
    const max = maxValues[metric as keyof typeof maxValues];
    return Math.min((value / max) * 100, 100);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Core Web Vitals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Core Web Vitals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">LCP (أكبر رسم للمحتوى)</span>
                  <Badge className={getStatusColor(getVitalStatus("lcp", vitals.lcp))}>
                    {vitals.lcp}s
                  </Badge>
                </div>
                <Progress value={100 - getProgressValue("lcp", vitals.lcp)} />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">FID (تأخير الإدخال الأول)</span>
                  <Badge className={getStatusColor(getVitalStatus("fid", vitals.fid))}>
                    {vitals.fid}ms
                  </Badge>
                </div>
                <Progress value={100 - getProgressValue("fid", vitals.fid)} />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">CLS (تحول التخطيط التراكمي)</span>
                  <Badge className={getStatusColor(getVitalStatus("cls", vitals.cls))}>
                    {vitals.cls}
                  </Badge>
                </div>
                <Progress value={100 - getProgressValue("cls", vitals.cls)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Page Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">أداء الصفحات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pageLoadTimes.map((page, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{page.page}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{page.loadTime}s</span>
                    {page.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
                    {page.trend === "down" && <TrendingDown className="h-4 w-4 text-green-500" />}
                    {page.trend === "stable" && <CheckCircle className="h-4 w-4 text-gray-500" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">نقاط الأداء العامة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">85</div>
              <p className="text-sm text-gray-600 mb-4">نقاط الأداء</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>الأداء</span>
                  <span className="text-green-600">85</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>إمكانية الوصول</span>
                  <span className="text-yellow-600">78</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>أفضل الممارسات</span>
                  <span className="text-green-600">92</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>SEO</span>
                  <span className="text-yellow-600">76</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">توصيات تحسين الأداء</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">ضغط الصور</h4>
                <p className="text-sm text-yellow-700">يمكن توفير 1.2MB من خلال ضغط الصور بشكل أفضل</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">تحسين CSS</h4>
                <p className="text-sm text-blue-700">إزالة CSS غير المستخدم يمكن أن يوفر 45KB</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">التحميل المسبق للموارد</h4>
                <p className="text-sm text-green-700">تطبيق التحميل المسبق للخطوط والموارد المهمة</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
