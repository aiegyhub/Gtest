
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Wand2, RefreshCw, Plus, Save, Eye, AlertCircle } from "lucide-react";
import { createGeminiService } from "@/services/geminiService";

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'service' | 'city' | 'general';
  status: 'generated' | 'reviewing' | 'published';
  createdAt: string;
}

const ContentManagement = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [contentLength, setContentLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [generatedContent, setGeneratedContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [geminiService, setGeminiService] = useState<any>(null);

  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'تنظيف المنازل في الرياض',
      content: 'محتوى مُولد بالذكاء الاصطناعي عن خدمات تنظيف المنازل في الرياض...',
      type: 'service',
      status: 'published',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'خدمات جدة الشاملة',
      content: 'دليل شامل لجميع الخدمات المتوفرة في مدينة جدة...',
      type: 'city',
      status: 'reviewing',
      createdAt: '2024-01-14'
    }
  ]);

  const services = [
    'تنظيف المنازل', 'مكافحة الحشرات', 'خدمات التكييف', 'خدمات السباكة', 
    'خدمات الكهرباء', 'نقل الأثاث', 'تنظيف الخزانات', 'صيانة عامة'
  ];

  const cities = [
    'الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 
    'الطائف', 'تبوك', 'بريدة', 'الخبر', 'حائل'
  ];

  useEffect(() => {
    // تحميل إعدادات Gemini من localStorage
    const geminiSettings = localStorage.getItem('gemini_settings');
    if (geminiSettings) {
      const settings = JSON.parse(geminiSettings);
      if (settings.apiKeys && settings.apiKeys.length > 0) {
        const activeKey = settings.apiKeys.find((key: any) => key.isActive)?.key || settings.apiKeys[0].key;
        if (activeKey) {
          setGeminiService(createGeminiService(activeKey));
        }
      }
    }
  }, []);

  const generateContent = async () => {
    if (!selectedService && !selectedCity && !customTopic) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار خدمة أو مدينة أو موضوع مخصص",
        variant: "destructive"
      });
      return;
    }

    if (!geminiService) {
      toast({
        title: "خطأ في الإعدادات",
        description: "يرجى تكوين إعدادات Gemini AI أولاً في صفحة الإعدادات",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const topic = customTopic || `${selectedService} في ${selectedCity}`;
      
      const content = await geminiService.generateServiceContent({
        cityName: selectedCity,
        serviceName: selectedService,
        contentType: 'page',
        targetLength: contentLength
      });

      setGeneratedContent(content);
      setShowEditor(true);

      toast({
        title: "تم توليد المحتوى",
        description: `تم إنشاء محتوى جديد عن ${topic}`,
      });

    } catch (error) {
      console.error('Content generation error:', error);
      toast({
        title: "خطأ في التوليد",
        description: "حدث خطأ أثناء توليد المحتوى. تحقق من إعدادات Gemini API.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveContent = () => {
    const topic = customTopic || `${selectedService} في ${selectedCity}`;
    const newContent: ContentItem = {
      id: Date.now().toString(),
      title: topic,
      content: generatedContent,
      type: selectedService ? 'service' : selectedCity ? 'city' : 'general',
      status: 'reviewing',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setContentItems(prev => [newContent, ...prev]);
    setShowEditor(false);
    setGeneratedContent('');
    setSelectedService('');
    setSelectedCity('');
    setCustomTopic('');

    toast({
      title: "تم حفظ المحتوى",
      description: "تم حفظ المحتوى الجديد بنجاح",
    });
  };

  const getStatusBadge = (status: ContentItem['status']) => {
    const colors = {
      generated: 'bg-blue-100 text-blue-800',
      reviewing: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800'
    };
    
    const labels = {
      generated: 'مُولد',
      reviewing: 'قيد المراجعة',
      published: 'منشور'
    };

    return (
      <Badge className={colors[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const generatedCount = contentItems.filter(item => item.status === 'generated').length;
  const reviewingCount = contentItems.filter(item => item.status === 'reviewing').length;
  const publishedCount = contentItems.filter(item => item.status === 'published').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة المحتوى المُولد بالذكاء الاصطناعي</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900">صفحات منشورة</h4>
              <p className="text-xl font-bold text-green-600">{publishedCount}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900">تحتاج مراجعة</h4>
              <p className="text-xl font-bold text-yellow-600">{reviewingCount}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900">مُولدة حديثاً</h4>
              <p className="text-xl font-bold text-blue-600">{generatedCount}</p>
            </div>
          </div>

          {/* تحذير إذا لم يتم تكوين Gemini */}
          {!geminiService && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <h4 className="font-semibold text-orange-900">تكوين Gemini AI مطلوب</h4>
                  <p className="text-orange-700">يرجى إعداد مفاتيح Gemini API في صفحة الإعدادات لتفعيل توليد المحتوى</p>
                </div>
              </div>
            </div>
          )}

          {/* مولد المحتوى */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">توليد محتوى جديد</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">اختر الخدمة</label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر خدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">اختر المدينة</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">أو اكتب موضوع مخصص</label>
              <Input
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="مثال: نصائح لصيانة المكيفات في الصيف"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">طول المحتوى</label>
              <Select value={contentLength} onValueChange={(value: 'short' | 'medium' | 'long') => setContentLength(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">قصير (300-500 كلمة)</SelectItem>
                  <SelectItem value="medium">متوسط (500-800 كلمة)</SelectItem>
                  <SelectItem value="long">طويل (800-1200 كلمة)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateContent} 
              disabled={isGenerating || !geminiService}
              className="w-full md:w-auto"
            >
              {isGenerating ? (
                <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4 ml-2" />
              )}
              {isGenerating ? 'جاري التوليد...' : 'توليد محتوى جديد'}
            </Button>
          </div>

          {/* محرر المحتوى */}
          {showEditor && (
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">تحرير المحتوى المُولد</h4>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowEditor(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={saveContent}>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ المحتوى
                  </Button>
                </div>
              </div>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-96 font-mono text-sm"
                placeholder="المحتوى المُولد سيظهر هنا..."
              />
            </div>
          )}

          {/* قائمة المحتويات */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">المحتويات المُولدة حديثاً</h4>
            <div className="space-y-3">
              {contentItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium">{item.title}</h5>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">
                        {item.type === 'service' ? 'خدمة' : item.type === 'city' ? 'مدينة' : 'عام'}
                      </span>
                      <span className="text-sm text-gray-600">{item.createdAt}</span>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      تحرير
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentManagement;
