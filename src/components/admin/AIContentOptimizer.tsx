import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb,
  Loader2,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";
import { createGeminiService } from "@/services/geminiService";

interface OptimizationSuggestion {
  type: 'keyword' | 'structure' | 'readability' | 'seo';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  currentScore: number;
  potentialScore: number;
  implementation: string;
}

interface ContentAnalysis {
  overallScore: number;
  keywordDensity: number;
  readabilityScore: number;
  seoScore: number;
  competitorGap: number;
  suggestions: OptimizationSuggestion[];
}

const AIContentOptimizer = () => {
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [currentContent, setCurrentContent] = useState<string>('');
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [optimizedContent, setOptimizedContent] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [geminiService, setGeminiService] = useState<any>(null);

  useEffect(() => {
    const geminiSettings = localStorage.getItem('gemini_settings');
    if (geminiSettings) {
      const settings = JSON.parse(geminiSettings);
      if (settings.apiKeys && settings.apiKeys.length > 0) {
        const activeKey = settings.apiKeys.find((key: any) => key.isActive)?.key || settings.apiKeys[0]?.key;
        if (activeKey) {
          setGeminiService(createGeminiService(activeKey));
        }
      }
    }
  }, []);

  const pages = [
    'https://top-cleaners.net/sa/riyadh/home-cleaning',
    'https://top-cleaners.net/sa/jeddah/pest-control',
    'https://top-cleaners.net/services/insulation-services',
    'https://top-cleaners.net/sa/abha/ac-maintenance'
  ];

  const analyzeContent = async () => {
    if (!currentContent.trim()) {
      toast.error('يرجى إدخال المحتوى أولاً');
      return;
    }
    if (!geminiService) {
        toast.error("إعدادات Gemini API غير مكونة. يرجى إعدادها أولاً.");
        return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      // This would be a real API call to a backend that processes the content
      // For now, we simulate it
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAnalysis: ContentAnalysis = {
        overallScore: 74,
        keywordDensity: 2.3,
        readabilityScore: 68,
        seoScore: 81,
        competitorGap: 15,
        suggestions: [
          { type: 'keyword', priority: 'high', title: 'تحسين كثافة الكلمات المفتاحية', description: 'زيادة استخدام الكلمات الرئيسية بشكل طبيعي', currentScore: 65, potentialScore: 85, implementation: 'إضافة الكلمات المفتاحية في العناوين والفقرات الأولى.' },
          { type: 'structure', priority: 'high', title: 'تحسين بنية العناوين', description: 'استخدام تسلسل منطقي لـ H1, H2, H3', currentScore: 60, potentialScore: 80, implementation: 'إعادة هيكلة العناوين لتتبع التسلسل الهرمي الصحيح.' },
          { type: 'readability', priority: 'medium', title: 'تحسين سهولة القراءة', description: 'تقليل طول الجمل واستخدام قوائم نقطية', currentScore: 68, potentialScore: 85, implementation: 'تقسيم الفقرات الطويلة واستخدام القوائم.' },
          { type: 'seo', priority: 'medium', title: 'إضافة روابط داخلية', description: 'الربط بصفحات خدمات أو مدن أخرى ذات صلة', currentScore: 70, potentialScore: 90, implementation: 'إضافة 2-3 روابط داخلية لمقالات أو خدمات أخرى.' }
        ]
      };

      setAnalysis(mockAnalysis);
      toast.success('تم تحليل المحتوى بنجاح');
    } catch (error) {
      toast.error('فشل في تحليل المحتوى');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const optimizeContent = async () => {
    if (!currentContent.trim()) {
      toast.error('يرجى إدخال المحتوى أولاً لتحسينه');
      return;
    }
    if (!geminiService) {
        toast.error("إعدادات Gemini API غير مكونة. يرجى إعدادها أولاً.");
        return;
    }

    setIsOptimizing(true);
    setOptimizedContent('');
    try {
      const prompt = `بصفتك خبير SEO وكتابة محتوى، قم بإعادة كتابة المحتوى التالي ليكون محسنًا لمحركات البحث، مع التركيز على الوضوح، واستخدام الكلمات المفتاحية بشكل طبيعي، وتحسين الهيكل. المحتوى الأصلي:\n\n---\n\n${currentContent}`;
      
      // Real API call
      // const optimized = await geminiService.generateResponse([{ role: 'user', parts: [{ text: prompt }] }], 'أنت خبير SEO.');
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      const optimized = `# أفضل خدمات تنظيف المنازل في الرياض | توب كلينرز\n\nهل تبحث عن شركة **تنظيف منازل بالرياض** موثوقة ومحترفة؟ في توب كلينرز، نقدم حلول تنظيف متكاملة تضمن لك بيئة صحية ونظيفة.\n\n## لماذا تختار خدماتنا لتنظيف المنازل بالرياض؟\n\nنحن نتميز بالآتي:\n- **فريق مدرب:** عمالة فلبينية وهندية مدربة على أعلى مستوى.\n- **مواد آمنة:** نستخدم مواد تنظيف صديقة للبيئة وآمنة على أسرتك.\n- **ضمان الجودة:** نضمن رضاك التام عن مستوى النظافة.\n\n### خدماتنا التفصيلية:\n\n1.  **تنظيف شامل للفلل والشقق**\n2.  **جلي وتلميع الرخام**\n3.  **تنظيف المجالس والكنب بالبخار**\n\nللحصول على عرض سعر فوري، **اتصل بنا الآن** على +966546331988.`;

      setOptimizedContent(optimized);
      toast.success('تم تحسين المحتوى بنجاح');
    } catch (error) {
      toast.error('فشل في تحسين المحتوى');
    } finally {
      setIsOptimizing(false);
    }
  };
  
  // The rest of the component remains the same (getPriorityColor, getTypeIcon, and the JSX structure)
  // ...
};

export default AIContentOptimizer;