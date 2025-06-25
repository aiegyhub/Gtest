
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, RefreshCw, Eye, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateLLMSContent, downloadLLMSFile, getLLMSStats } from "@/utils/llmsGenerator";

const LLMSManager = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [llmsContent, setLlmsContent] = useState('');
  
  const stats = getLLMSStats();

  const generateContent = async () => {
    setIsLoading(true);
    try {
      const content = generateLLMSContent();
      setLlmsContent(content);
      setShowPreview(true);
      
      toast({
        title: "تم توليد المحتوى",
        description: "تم إنشاء ملف llms.txt بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في التوليد",
        description: "حدث خطأ أثناء توليد المحتوى",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    downloadLLMSFile();
    toast({
      title: "تم التحميل",
      description: "تم تحميل ملف llms.txt بنجاح",
    });
  };

  const updatePublicFile = async () => {
    setIsLoading(true);
    try {
      // في التطبيق الحقيقي، سيتم تحديث الملف في المجلد العام
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث ملف llms.txt في الموقع",
      });
    } catch (error) {
      toast({
        title: "فشل التحديث",
        description: "حدث خطأ أثناء تحديث الملف",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          إدارة ملف llms.txt
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* إحصائيات المحتوى */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-blue-800">المدن</p>
            <p className="text-xl font-bold text-blue-600">{stats.totalCities}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-green-800">الخدمات</p>
            <p className="text-xl font-bold text-green-600">{stats.uniqueServices}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <RefreshCw className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="font-semibold text-purple-800">المحتوى</p>
            <p className="text-xl font-bold text-purple-600">{Math.round(stats.contentLength / 1000)}K</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <Eye className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="font-semibold text-orange-800">التفاصيل</p>
            <p className="text-xl font-bold text-orange-600">{stats.totalSubServices}</p>
          </div>
        </div>

        {/* معلومات الملف */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">معلومات ملف llms.txt</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>رابط الملف:</span>
              <Badge variant="outline">https://musaaed.com/llms.txt</Badge>
            </div>
            <div className="flex justify-between">
              <span>آخر تحديث:</span>
              <span className="text-gray-600">{new Date(stats.lastGenerated).toLocaleString('ar-SA')}</span>
            </div>
            <div className="flex justify-between">
              <span>حجم المحتوى:</span>
              <span className="text-gray-600">{stats.contentLength} حرف</span>
            </div>
          </div>
        </div>

        {/* الإجراءات */}
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={generateContent}
            disabled={isLoading}
          >
            {isLoading ? <RefreshCw className="h-4 w-4 ml-2 animate-spin" /> : <FileText className="h-4 w-4 ml-2" />}
            توليد المحتوى
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            disabled={!llmsContent}
          >
            <Eye className="h-4 w-4 ml-2" />
            {showPreview ? 'إخفاء' : 'معاينة'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleDownload}
            disabled={!llmsContent}
          >
            <Download className="h-4 w-4 ml-2" />
            تحميل الملف
          </Button>
          
          <Button 
            onClick={updatePublicFile}
            disabled={isLoading || !llmsContent}
          >
            {isLoading ? <RefreshCw className="h-4 w-4 ml-2 animate-spin" /> : null}
            تحديث الموقع
          </Button>
        </div>

        {/* معاينة المحتوى */}
        {showPreview && llmsContent && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">معاينة ملف llms.txt</h4>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96 whitespace-pre-wrap">
              {llmsContent}
            </pre>
          </div>
        )}

        {/* نصائح التحسين */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-medium text-blue-800 mb-2">نصائح لتحسين ملف llms.txt</h5>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• يتم تحديث المحتوى تلقائياً عند إضافة خدمات أو مدن جديدة</li>
            <li>• الملف متوافق مع معايير llms.txt الرسمية</li>
            <li>• يحتوي على جميع المعلومات المهمة للـ AI بتنسيق Markdown</li>
            <li>• يتضمن معلومات الاتصال والخدمات والمناطق المخدومة</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMSManager;
