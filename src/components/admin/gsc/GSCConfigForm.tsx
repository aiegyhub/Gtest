
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Globe, Loader2 } from "lucide-react";

interface GSCConfigFormProps {
  settings: {
    apiKey: string;
    siteUrl: string;
    accessToken: string;
  };
  onSettingsChange: (settings: any) => void;
  onSave: () => void;
  onTest: () => void;
  isSaving: boolean;
  isTestingConnection: boolean;
  isConfigured: boolean;
}

const GSCConfigForm = ({ 
  settings, 
  onSettingsChange, 
  onSave, 
  onTest, 
  isSaving, 
  isTestingConnection, 
  isConfigured 
}: GSCConfigFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="apiKey" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          API Key
        </Label>
        <Input
          id="apiKey"
          type="password"
          value={settings.apiKey}
          onChange={(e) => onSettingsChange(prev => ({ ...prev, apiKey: e.target.value }))}
          placeholder="أدخل Google API Key"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="siteUrl" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          رابط الموقع
        </Label>
        <Input
          id="siteUrl"
          value={settings.siteUrl}
          onChange={(e) => onSettingsChange(prev => ({ ...prev, siteUrl: e.target.value }))}
          placeholder="https://musaaed.com"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="accessToken">Access Token</Label>
        <Input
          id="accessToken"
          type="password"
          value={settings.accessToken}
          onChange={(e) => onSettingsChange(prev => ({ ...prev, accessToken: e.target.value }))}
          placeholder="أدخل Access Token"
          className="mt-1"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={onSave} disabled={isSaving} className="flex-1">
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin ml-2" />
              جاري الحفظ...
            </>
          ) : (
            'حفظ الإعدادات'
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onTest}
          disabled={!isConfigured || isTestingConnection}
        >
          {isTestingConnection ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin ml-2" />
              اختبار...
            </>
          ) : (
            'اختبار الاتصال'
          )}
        </Button>
      </div>
    </div>
  );
};

export default GSCConfigForm;
