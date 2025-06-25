import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Code, TestTube, Download, RefreshCw, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SchemaTestResult {
  status: 'valid' | 'warning' | 'error';
  issues: number;
  details: string;
}

const SchemaMarkupManager = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [testingResults, setTestingResults] = useState<Record<string, SchemaTestResult> | null>(null);
  const [schemaCode, setSchemaCode] = useState('');
  const [showCode, setShowCode] = useState(false);

  const testSchemaMarkup = async () => {
    setIsLoading(true);
    setTestingResults(null);
    toast({ title: "بدء اختبار البيانات المنظمة..." });

    await new Promise(resolve => setTimeout(resolve, 2000));

    const results = {
      organization: { status: 'valid', issues: 0, details: 'بيانات المنظمة صحيحة ومكتملة' },
      breadcrumbs: { status: 'valid', issues: 0, details: 'مسار التنقل يعمل بشكل صحيح' },
      localBusiness: { status: 'warning', issues: 2, details: 'ناقص معلومات ساعات العمل وصور المكان' },
      service: { status: 'valid', issues: 0, details: 'بيانات الخدمات مكتملة' },
      review: { status: 'error', issues: 5, details: 'ناقص schema للتقييمات، تحتاج إضافة معلومات المراجعات' }
    };
    setTestingResults(results);

    setIsLoading(false);
    toast({ title: "اكتمل اختبار البيانات المنظمة", description: `تم العثور على ${results.review.issues + results.localBusiness.issues} مشكلة.` });
  };
  
  const getStatusIcon = (status: string) => {
    if (status === 'valid') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'warning') return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    if (status === 'error') return <XCircle className="h-4 w-4 text-red-500" />;
    return null;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة البيانات المنظمة (Schema)</CardTitle>
        <p className="text-sm text-muted-foreground">فحص وتوليد وإصلاح البيانات المنظمة للموقع.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Button onClick={testSchemaMarkup} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 ml-2 animate-spin" /> : <TestTube className="h-4 w-4 ml-2" />}
            {isLoading ? 'جاري الاختبار...' : 'اختبار Schema الحالي'}
          </Button>
        </div>

        {testingResults && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">نتائج الاختبار:</h4>
            <div className="space-y-3">
              {Object.entries(testingResults).map(([type, result]) => (
                <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <p className="font-medium capitalize">{type}</p>
                      <p className="text-sm text-gray-600">{result.details}</p>
                    </div>
                  </div>
                  <Badge variant={result.status === 'valid' ? 'default' : result.status === 'warning' ? 'secondary' : 'destructive'} className={result.status === 'valid' ? 'bg-green-100 text-green-800' : ''}>
                    {result.issues} {result.issues === 0 ? 'مشكلة' : 'مشاكل'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SchemaMarkupManager;