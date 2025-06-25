
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { gscService } from "@/services/gscService";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import GSCConfigForm from "./gsc/GSCConfigForm";
import GSCConnectionStatus from "./gsc/GSCConnectionStatus";
import GSCSetupInstructions from "./gsc/GSCSetupInstructions";

const GSCSettings = () => {
  const [settings, setSettings] = useState({
    apiKey: '',
    siteUrl: '',
    accessToken: ''
  });
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'success' | 'error' | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadCurrentSettings();
  }, []);

  const loadCurrentSettings = () => {
    const currentSettings = gscService.getSettings();
    setSettings({
      apiKey: currentSettings.apiKey || '',
      siteUrl: currentSettings.siteUrl || '',
      accessToken: currentSettings.accessToken || ''
    });
    setIsConfigured(currentSettings.isConfigured);
  };

  const handleSaveSettings = async () => {
    if (!settings.apiKey || !settings.siteUrl || !settings.accessToken) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsSaving(true);
    try {
      gscService.saveSettings(settings.apiKey, settings.siteUrl, settings.accessToken);
      setIsConfigured(true);
      setConnectionStatus(null);
      toast.success('تم حفظ الإعدادات بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    if (!isConfigured) {
      toast.error('يرجى حفظ الإعدادات أولاً');
      return;
    }

    setIsTestingConnection(true);
    try {
      const result = await gscService.testConnection();
      setConnectionStatus(result ? 'success' : 'error');
      
      if (result) {
        toast.success('تم الاتصال بـ Google Search Console بنجاح');
      } else {
        toast.error('فشل في الاتصال بـ Google Search Console');
      }
    } catch (error) {
      setConnectionStatus('error');
      toast.error('حدث خطأ أثناء اختبار الاتصال');
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle>إعدادات Google Search Console</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                قم بتكوين الاتصال مع Google Search Console لجلب بيانات الأداء
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GSCConfigForm
              settings={settings}
              onSettingsChange={setSettings}
              onSave={handleSaveSettings}
              onTest={handleTestConnection}
              isSaving={isSaving}
              isTestingConnection={isTestingConnection}
              isConfigured={isConfigured}
            />

            <div className="space-y-4">
              <GSCConnectionStatus
                isConfigured={isConfigured}
                connectionStatus={connectionStatus}
              />
              <GSCSetupInstructions />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GSCSettings;
