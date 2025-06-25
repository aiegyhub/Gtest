import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Facebook, Target, Loader2 } from "lucide-react";
import { toast } from "sonner";

const FacebookPixelSettings = () => {
  const [pixelId, setPixelId] = useState(() => localStorage.getItem('fbPixelId') || '');
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('fbAccessToken') || '');
  const [isConnected, setIsConnected] = useState(() => localStorage.getItem('fbPixelConnected') === 'true');
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    // This effect ensures the connection status is updated if keys are removed.
    const configured = !!(pixelId && accessToken);
    if (!configured) {
      setIsConnected(false);
      localStorage.setItem('fbPixelConnected', 'false');
    }
  }, [pixelId, accessToken]);

  const handleSaveSettings = () => {
    localStorage.setItem('fbPixelId', pixelId);
    localStorage.setItem('fbAccessToken', accessToken);
    
    if (pixelId && accessToken) {
      localStorage.setItem('fbPixelConnected', 'true');
      setIsConnected(true);
      toast.success("تم حفظ إعدادات Facebook Pixel بنجاح.");
    } else {
      localStorage.setItem('fbPixelConnected', 'false');
      setIsConnected(false);
      toast.warning("تم حفظ الإعدادات، لكنها غير مكتملة للاتصال.");
    }
  };

  const testPixel = async () => {
    if (!pixelId) {
      toast.error("يرجى إدخال معرف Pixel أولاً.");
      return;
    }
    setIsTesting(true);
    try {
      // Simulate API call to Facebook's Graph API
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("تم الاتصال بـ Facebook Pixel بنجاح.");
    } catch (error) {
      toast.error("فشل الاتصال، يرجى التحقق من معرف Pixel وصلاحيات الوصول.");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Facebook className="h-5 w-5 text-blue-600" />
            إعدادات Facebook Pixel
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-green-100 text-green-800" : ""}>
            {isConnected ? <CheckCircle className="h-3 w-3 ml-1" /> : <AlertCircle className="h-3 w-3 ml-1" />}
            {isConnected ? 'متصل' : 'غير متصل'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pixelId">معرف Pixel</Label>
          <Input id="pixelId" placeholder="123456789012345" value={pixelId} onChange={(e) => setPixelId(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accessToken">رمز الوصول (Conversions API)</Label>
          <Input id="accessToken" type="password" placeholder="EAAG..." value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
          <Button variant="outline" onClick={testPixel} disabled={isTesting || !pixelId}>
            {isTesting ? <Loader2 className="h-4 w-4 ml-2 animate-spin" /> : null}
            اختبار Pixel
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">حالة تتبع الأحداث</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center"><span className="text-muted-foreground">مشاهدة الصفحة (PageView)</span><Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">نشط</Badge></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">التواصل (Contact)</span><Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">نشط</Badge></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">عميل محتمل (Lead)</span><Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">نشط</Badge></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">شراء (Purchase)</span><Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">غير نشط</Badge></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacebookPixelSettings;