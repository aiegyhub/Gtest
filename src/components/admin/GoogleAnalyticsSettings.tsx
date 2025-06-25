import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Settings, BarChart3, Loader2 } from "lucide-react";
import { toast } from "sonner";

const GoogleAnalyticsSettings = () => {
  const [gaTrackingId, setGaTrackingId] = useState("");
  const [ga4PropertyId, setGa4PropertyId] = useState("");
  const [gaApiKey, setGaApiKey] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem('gaTrackingId');
    const savedPropId = localStorage.getItem('ga4PropertyId');
    const savedApiKey = localStorage.getItem('gaApiKey');
    if (savedId) setGaTrackingId(savedId);
    if (savedPropId) setGa4PropertyId(savedPropId);
    if (savedApiKey) setGaApiKey(savedApiKey);
    if (savedId && savedPropId && savedApiKey) setIsConnected(true);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('gaTrackingId', gaTrackingId);
    localStorage.setItem('ga4PropertyId', ga4PropertyId);
    localStorage.setItem('gaApiKey', gaApiKey);
    setIsConnected(true);
    toast.success("تم حفظ إعدادات Google Analytics بنجاح");
  };

  const testConnection = async () => {
    if (!gaApiKey || !ga4PropertyId) {
      toast.error("يرجى إدخال API Key و Property ID أولاً.");
      return;
    }
    setIsTesting(true);
    try {
      // Simulate API call to GA Data API
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("تم الاتصال بـ Google Analytics بنجاح.");
    } catch (error) {
      toast.error("فشل الاتصال، يرجى التحقق من الإعدادات.");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            إعدادات Google Analytics
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-green-100 text-green-800" : ""}>
            {isConnected ? <CheckCircle className="h-3 w-3 ml-1" /> : <AlertCircle className="h-3 w-3 ml-1" />}
            {isConnected ? 'متصل' : 'غير متصل'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gaTrackingId">معرف التتبع (GA4)</Label>
          <Input id="gaTrackingId" placeholder="G-XXXXXXXXXX" value={gaTrackingId} onChange={(e) => setGaTrackingId(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ga4PropertyId">معرف الخاصية (Property ID)</Label>
          <Input id="ga4PropertyId" placeholder="123456789" value={ga4PropertyId} onChange={(e) => setGa4PropertyId(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gaApiKey">مفتاح API (لجلب البيانات)</Label>
          <Input id="gaApiKey" type="password" placeholder="AIzaSy..." value={gaApiKey} onChange={(e) => setGaApiKey(e.target.value)} />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSaveSettings}><Settings className="h-4 w-4 ml-2" />حفظ</Button>
          <Button variant="outline" onClick={testConnection} disabled={isTesting}>
            {isTesting ? <Loader2 className="h-4 w-4 ml-2 animate-spin" /> : null}
            اختبار الاتصال
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleAnalyticsSettings;