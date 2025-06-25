
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Search, Link, FileText } from "lucide-react";

interface SEOIssue {
  type: "error" | "warning" | "success";
  category: string;
  issue: string;
  pages: number;
  priority: "high" | "medium" | "low";
}

const SEOHealthMonitor = () => {
  const [seoScore, setSeoScore] = useState(76);
  const [isScanning, setIsScanning] = useState(false);
  
  const [seoIssues, setSeoIssues] = useState<SEOIssue[]>([
    {
      type: "error",
      category: "Meta Tags",
      issue: "صفحات بدون وصف meta",
      pages: 12,
      priority: "high"
    },
    {
      type: "warning",
      category: "Images",
      issue: "صور بدون نص بديل",
      pages: 28,
      priority: "medium"
    },
    {
      type: "error",
      category: "Internal Links",
      issue: "روابط داخلية مكسورة", 
      pages: 5,
      priority: "high"
    },
    {
      type: "warning",
      category: "Headers",
      issue: "صفحات بدون H1",
      pages: 3,
      priority: "medium"
    },
    {
      type: "success",
      category: "Schema",
      issue: "جميع الصفحات لديها schema markup",
      pages: 156,
      priority: "low"
    }
  ]);

  const [seoMetrics, setSeoMetrics] = useState({
    indexedPages: 143,
    totalPages: 156,
    avgLoadTime: 2.1,
    mobileScore: 89,
    desktopScore: 92,
    organicTraffic: 12543,
    avgPosition: 15.3,
    clickThroughRate: 4.2
  });

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setSeoScore(Math.floor(Math.random() * 20) + 70);
    }, 3000);
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error": return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* SEO Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{seoScore}</div>
            <p className="text-sm text-gray-600">نقاط SEO</p>
            <Progress value={seoScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الصفحات المفهرسة</p>
                <p className="text-2xl font-bold">{seoMetrics.indexedPages}/{seoMetrics.totalPages}</p>
              </div>
              <Search className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الزيارات العضوية</p>
                <p className="text-2xl font-bold">{seoMetrics.organicTraffic.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط الترتيب</p>
                <p className="text-2xl font-bold">{seoMetrics.avgPosition}</p>
              </div>
              <Link className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Scan */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>فحص SEO الشامل</CardTitle>
            <Button onClick={handleScan} disabled={isScanning}>
              <RefreshCw className={`h-4 w-4 ml-2 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'جاري الفحص...' : 'فحص جديد'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isScanning ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
              <p className="text-gray-600">جاري فحص جميع الصفحات...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {seoIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getIssueIcon(issue.type)}
                    <div>
                      <h4 className="font-medium">{issue.issue}</h4>
                      <p className="text-sm text-gray-600">{issue.category} - {issue.pages} صفحة</p>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(issue.priority)}>
                    {issue.priority === "high" ? "عالي" : issue.priority === "medium" ? "متوسط" : "منخفض"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>توصيات التحسين الفورية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">إصلاح فوري مطلوب</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• إضافة وصف meta للصفحات المفقودة</li>
                <li>• إصلاح الروابط المكسورة</li>
                <li>• إضافة H1 tags للصفحات</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">تحسينات مقترحة</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• إضافة نص بديل للصور</li>
                <li>• تحسين الروابط الداخلية</li>
                <li>• إضافة schema markup متقدم</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical SEO Status */}
      <Card>
        <CardHeader>
          <CardTitle>الحالة التقنية لـ SEO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">ملفات XML</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">sitemap.xml موجود</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">robots.txt محدث</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">الأداء التقني</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">TTFB يحتاج تحسين</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">ضغط GZIP مفعل</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">الأمان</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">HTTPS مفعل</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Headers الأمان محدثة</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOHealthMonitor;
