import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Key, Settings, Bot, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface GeminiApiKey {
  id: string;
  name: string;
  key: string;
  isActive: boolean;
  status: 'working' | 'error' | 'untested';
}

interface GeminiConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

const GeminiSettings = () => {
  const [apiKeys, setApiKeys] = useState<GeminiApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const [config, setConfig] = useState<GeminiConfig>({
    model: "gemini-pro",
    temperature: 0.7,
    maxTokens: 1500,
    systemPrompt: "",
  });
  const [isTesting, setIsTesting] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('gemini_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setApiKeys(settings.apiKeys || []);
      setConfig(settings.config || config);
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('gemini_settings', JSON.stringify({ apiKeys, config }));
    toast.success("تم حفظ إعدادات Gemini بنجاح.");
  };

  const addApiKey = () => {
    if (!newKeyName.trim() || !newApiKey.trim()) {
      toast.error("يرجى إدخال اسم المفتاح والمفتاح.");
      return;
    }
    const newKey: GeminiApiKey = { id: Date.now().toString(), name: newKeyName, key: newApiKey, isActive: apiKeys.length === 0, status: 'untested' };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    setNewApiKey("");
  };

  const removeApiKey = (id: string) => setApiKeys(apiKeys.filter(key => key.id !== id));
  
  const toggleKeyActive = (id: string) => setApiKeys(apiKeys.map(key => ({ ...key, isActive: key.id === id })));

  const testKey = async (keyToTest: GeminiApiKey) => {
    setIsTesting(keyToTest.id);
    try {
      // This is a mock test. A real implementation would call the Gemini API.
      await new Promise(res => setTimeout(res, 1500));
      const success = Math.random() > 0.2; // 80% success rate for demo
      if (!success) throw new Error("Invalid API Key");

      setApiKeys(prev => prev.map(k => k.id === keyToTest.id ? { ...k, status: 'working' } : k));
      toast.success(`المفتاح "${keyToTest.name}" يعمل بنجاح.`);
    } catch (error) {
      setApiKeys(prev => prev.map(k => k.id === keyToTest.id ? { ...k, status: 'error' } : k));
      toast.error(`فشل اختبار المفتاح "${keyToTest.name}".`);
    } finally {
      setIsTesting(null);
    }
  };
  
  const getStatusIcon = (status: GeminiApiKey['status']) => {
    if (status === 'working') return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (status === 'error') return <AlertCircle className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Key />إدارة مفاتيح Gemini API</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="اسم المفتاح (مثال: مفتاح رئيسي)" />
            <Input type="password" value={newApiKey} onChange={(e) => setNewApiKey(e.target.value)} placeholder="AIzaSy..." />
          </div>
          <Button onClick={addApiKey} className="w-full"><Plus className="h-4 w-4 ml-2" />إضافة مفتاح</Button>
          <div className="space-y-2">
            {apiKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Switch checked={key.isActive} onCheckedChange={() => toggleKeyActive(key.id)} aria-label={`Activate ${key.name}`} />
                  {getStatusIcon(key.status)}
                  <div><div className="font-medium">{key.name}</div><div className="text-sm text-muted-foreground">{key.key.substring(0, 10)}...</div></div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => testKey(key)} disabled={!!isTesting}>{isTesting === key.id ? <Loader2 className="h-4 w-4 animate-spin"/> : 'اختبار'}</Button>
                  <Button size="sm" variant="destructive" onClick={() => removeApiKey(key.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Settings />إعدادات النموذج</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label htmlFor="model">النموذج</Label><Input id="model" value={config.model} onChange={(e) => setConfig({ ...config, model: e.target.value })} /></div>
            <div><Label htmlFor="temperature">درجة الإبداع</Label><Input id="temperature" type="number" min="0" max="1" step="0.1" value={config.temperature} onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })} /></div>
            <div><Label htmlFor="maxTokens">الحد الأقصى للكلمات</Label><Input id="maxTokens" type="number" value={config.maxTokens} onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })} /></div>
          </div>
          <div><Label htmlFor="systemPrompt">System Prompt</Label><Textarea id="systemPrompt" value={config.systemPrompt} onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })} placeholder="أنت خبير في..." rows={3} /></div>
        </CardContent>
      </Card>
      
      <Button onClick={saveSettings} className="w-full">حفظ جميع الإعدادات</Button>
    </div>
  );
};

export default GeminiSettings;