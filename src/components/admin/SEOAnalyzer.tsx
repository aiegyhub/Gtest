import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { seoAuditService, SEOIssue } from "@/services/seoAuditService";

const SEOAnalyzer = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [seoIssues, setSeoIssues] = useState<SEOIssue[]>([]);
  const [seoScore, setSeoScore] = useState(0);

  const runSEOAnalysis = async () => {
    setIsAnalyzing(true);
    toast({ title: "بدء فحص SEO الشامل...", description: "قد تستغرق هذه العملية بضع دقائق." });
    try {
      const pageToAudit = '/sa/riyadh/home-cleaning'; // Example page
      const result = await seoAuditService.auditPage(pageToAudit);
      
      setSeoScore(result.score);
      setSeoIssues(result.issues);
      
      toast({
        title: "اكتمل فحص SEO",
        description: `تم فحص الموقع. النتيجة الإجمالية: ${result.score}/100`,
      });

    } catch (error) {
      toast({ title: "خطأ في التحليل", description: "حدث خطأ أثناء تحليل SEO", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getIssueIcon = (type: string) => {
    if (type === 'critical') return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
    if (type === 'warning') return <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />;
    return <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />;
  };

  const getIssueColor = (type: string) => {
    if (type === 'critical') return 'bg-red-50 border-red-200';
    if (type === 'warning') return 'bg-yellow-50 border-yellow-200';
    return 'bg-blue-50 border-blue-200';
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderIssues = (issues: SEOIssue[]) => {
    if (issues.length === 0) {
      return <div className="text-center p-6 text-green-600 flex items-center justify-center gap-2"><CheckCircle/>لا توجد مشاكل من هذا النوع.</div>
    }
    return issues.map((issue, index) => (
      <div key={index} className={`p-4 rounded-lg border ${getIssueColor(issue.severity)}`}>
        <div className="flex items-start gap-3">
          {getIssueIcon(issue.severity)}
          <div className="flex-1"><h4 className="font-semibold">{issue.title}</h4><p className="text-sm text-gray-700 mt-1">{issue.description}</p><div className="mt-2 p-2 bg-white/50 rounded"><p className="text-xs font-medium">الحل المقترح: <span className="font-normal">{issue.solution}</span></p></div></div>
        </div>
      </div>
    ));
  };

  return (
    <Card>
      <CardHeader><CardTitle>فحص SEO الشامل</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(seoScore)}`}>{seoScore}<span className="text-3xl">/100</span></div>
          <Progress value={seoScore} className="w-full h-2 mb-4" />
          <Button onClick={runSEOAnalysis} disabled={isAnalyzing}>
            {isAnalyzing ? <Loader2 className="h-4 w-4 ml-2 animate-spin" /> : <RefreshCw className="h-4 w-4 ml-2" />}
            {isAnalyzing ? 'جاري التحليل...' : 'تشغيل فحص جديد'}
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">الكل ({seoIssues.length})</TabsTrigger>
            <TabsTrigger value="errors">أخطاء حرجة ({seoIssues.filter(i => i.severity === 'critical').length})</TabsTrigger>
            <TabsTrigger value="warnings">تحذيرات ({seoIssues.filter(i => i.severity === 'warning').length})</TabsTrigger>
            <TabsTrigger value="info">اقتراحات ({seoIssues.filter(i => i.severity === 'suggestion').length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-3 mt-4">{renderIssues(seoIssues)}</TabsContent>
          <TabsContent value="errors" className="space-y-3 mt-4">{renderIssues(seoIssues.filter(i => i.severity === 'critical'))}</TabsContent>
          <TabsContent value="warnings" className="space-y-3 mt-4">{renderIssues(seoIssues.filter(i => i.severity === 'warning'))}</TabsContent>
          <TabsContent value="info" className="space-y-3 mt-4">{renderIssues(seoIssues.filter(i => i.severity === 'suggestion'))}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SEOAnalyzer;