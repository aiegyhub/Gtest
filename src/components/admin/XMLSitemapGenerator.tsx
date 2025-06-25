
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, RefreshCw, Download, Globe, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getSitemapStats, downloadSitemap } from "@/utils/sitemapGenerator";
import { sitemapService } from "@/services/sitemapService";

const XMLSitemapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState(getSitemapStats());
  const [lastGenerated, setLastGenerated] = useState("غير محدد");
  const { toast } = useToast();

  useEffect(() => {
    const savedDate = localStorage.getItem('sitemap_last_update');
    if (savedDate) {
      setLastGenerated(new Date(savedDate).toLocaleString('ar-SA'));
    }
    setStats(getSitemapStats());
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const success = await sitemapService.updateSitemap();
      if (success) {
        setStats(getSitemapStats());
        setLastGenerated(new Date().toLocaleString('ar-SA'));
        toast({
          title: "تم توليد خريطة الموقع",
          description: `تم إنشاء sitemap.xml بنجاح مع ${stats.totalUrls} رابط`
        });
      }
    } catch (error) {
      toast({
        title: "خطأ في التوليد",
        description: "فشل في توليد خريطة الموقع",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitToSearchEngines = async () => {
    setIsSubmitting(true);
    try {
      const success = await sitemapService.submitToSearchEngines();
      if (success) {
        toast({
          title: "تم الإرسال",
          description: "تم إرسال خريطة الموقع لمحركات البحث بنجاح"
        });
      }
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "فشل في إرسال خريطة الموقع",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            مولد خريطة الموقع XML التلقائي
          </CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            نشط
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="font-medium">إجمالي الروابط</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.totalUrls.toLocaleString()}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-medium">صفحات المدن</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.cityPages.toLocaleString()}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span className="font-medium">صفحات الخدمات</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{stats.servicePages.toLocaleString()}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <span className="font-medium">خدمات فرعية</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.subServicePages.toLocaleString()}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">تفاصيل خريطة الموقع</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>آخر تحديث</span>
              <span className="font-medium">{lastGenerated}</span>
            </div>
            <div className="flex justify-between">
              <span>حجم الملف المتوقع</span>
              <span className="font-medium">{Math.round(stats.totalUrls * 0.2)} KB</span>
            </div>
            <div className="flex justify-between">
              <span>الحالة</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <CheckCircle className="h-3 w-3 ml-1" />
                صحي
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>الرابط</span>
              <a 
                href="https://saudiservices.sa/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                sitemap.xml
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">الإجراءات</h4>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleGenerate} disabled={isGenerating}>
              <RefreshCw className={`h-4 w-4 ml-2 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'جاري التوليد...' : 'توليد جديد'}
            </Button>
            <Button variant="outline" onClick={downloadSitemap}>
              <Download className="h-4 w-4 ml-2" />
              تحميل
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSubmitToSearchEngines}
              disabled={isSubmitting}
            >
              <ExternalLink className={`h-4 w-4 ml-2 ${isSubmitting ? 'animate-spin' : ''}`} />
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال لمحركات البحث'}
            </Button>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-green-800">ميزات التحديث التلقائي</h5>
              <ul className="text-sm text-green-700 mt-1 space-y-1">
                <li>• توليد تلقائي عند إضافة محتوى جديد</li>
                <li>• تحديث أولويات الصفحات ديناميكياً</li>
                <li>• إرسال تلقائي لمحركات البحث</li>
                <li>• مراقبة تغييرات المحتوى</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-yellow-800">توصيات التحسين</h5>
              <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                <li>• مراجعة أولويات الصفحات شهرياً</li>
                <li>• إضافة sitemap للصور منفصل</li>
                <li>• مراقبة معدل الفهرسة في Google Search Console</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default XMLSitemapGenerator;
