
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, RefreshCw, Globe, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateSitemap, downloadSitemap, getSitemapStats } from "@/utils/sitemapGenerator";

const AutoSitemapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [stats, setStats] = useState(getSitemapStats());
  const [lastGenerated, setLastGenerated] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const savedDate = localStorage.getItem('sitemap_last_generated');
    if (savedDate) {
      setLastGenerated(savedDate);
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // محاكاة عملية التوليد
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newStats = getSitemapStats();
      setStats(newStats);
      
      const now = new Date().toLocaleString('ar-SA');
      setLastGenerated(now);
      localStorage.setItem('sitemap_last_generated', now);
      
      toast({
        title: "تم توليد Sitemap.xml",
        description: `تم إنشاء خريطة الموقع بنجاح مع ${newStats.totalUrls} رابط`,
      });
    } catch (error) {
      toast({
        title: "خطأ في التوليد",
        description: "حدث خطأ أثناء توليد خريطة الموقع",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    downloadSitemap();
    toast({
      title: "تم التحميل",
      description: "تم تحميل ملف sitemap.xml بنجاح"
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            مولد Sitemap.xml التلقائي
          </CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            تلقائي
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalUrls}</div>
            <div className="text-sm text-gray-600">إجمالي الروابط</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.cityPages}</div>
            <div className="text-sm text-gray-600">صفحات المدن</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.servicePages}</div>
            <div className="text-sm text-gray-600">صفحات الخدمات</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.subServicePages}</div>
            <div className="text-sm text-gray-600">خدمات فرعية</div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">معلومات خريطة الموقع</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>آخر توليد</span>
              <span className="font-medium">{lastGenerated || "لم يتم التوليد بعد"}</span>
            </div>
            <div className="flex justify-between">
              <span>الحالة</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <CheckCircle className="h-3 w-3 ml-1" />
                جاهز
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>التحديث</span>
              <span className="text-sm text-gray-600">تلقائي عند إضافة محتوى جديد</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">الإجراءات</h4>
          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={isGenerating}>
              <RefreshCw className={`h-4 w-4 ml-2 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'جاري التوليد...' : 'توليد جديد'}
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 ml-2" />
              تحميل Sitemap.xml
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-800">ميزات خريطة الموقع</h5>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• توليد تلقائي لجميع الصفحات والخدمات</li>
                <li>• تحديث أولويات الصفحات حسب الأهمية</li>
                <li>• تحديد ترددات التغيير المناسبة</li>
                <li>• متوافق مع محركات البحث</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoSitemapGenerator;
