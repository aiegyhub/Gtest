import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Globe, Zap, CheckCircle, AlertTriangle, Loader2, RefreshCw, Settings, FileCode } from "lucide-react";
import { toast } from "sonner";

interface PreloadRule {
  path: string;
  priority: 'high' | 'medium' | 'low';
  enabled: boolean;
  lastPreloaded: string;
  cacheHit: number;
  loadTime: number;
}

interface SEOPreloadConfig {
  enableImagePreloading: boolean;
  enableCriticalCSS: boolean;
  enablePrefetchLinks: boolean;
  enableServiceWorker: boolean;
  cacheStrategy: 'aggressive' | 'moderate' | 'conservative';
}

const PreloadedSEOData = () => {
  const [preloadRules, setPreloadRules] = useState<PreloadRule[]>([]);
  const [config, setConfig] = useState<SEOPreloadConfig>({
    enableImagePreloading: true,
    enableCriticalCSS: true,
    enablePrefetchLinks: true,
    enableServiceWorker: false,
    cacheStrategy: 'moderate'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPreloadData();
  }, []);

  const loadPreloadData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockRules: PreloadRule[] = [
      { path: '/sa/riyadh/home-cleaning', priority: 'high', enabled: true, lastPreloaded: '2024-01-15 14:30', cacheHit: 89, loadTime: 1.2 },
      { path: '/sa/jeddah/home-cleaning', priority: 'high', enabled: true, lastPreloaded: '2024-01-15 14:25', cacheHit: 76, loadTime: 1.4 },
      { path: '/services/pest-control', priority: 'medium', enabled: true, lastPreloaded: '2024-01-15 14:20', cacheHit: 54, loadTime: 1.8 },
      { path: '/sa/riyadh/ac-maintenance', priority: 'medium', enabled: false, lastPreloaded: '2024-01-15 13:45', cacheHit: 32, loadTime: 2.1 }
    ];
    setPreloadRules(mockRules);
    
    setIsLoading(false);
  };

  const toggleRule = (index: number) => {
    setPreloadRules(prev => prev.map((rule, i) => i === index ? { ...rule, enabled: !rule.enabled } : rule));
    toast.success('تم تحديث قاعدة التحميل المسبق.');
  };

  const updateConfig = (key: keyof SEOPreloadConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    toast.success('تم تحديث الإعدادات.');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileCode className="h-5 w-5" />التحميل المسبق لـ SEO</CardTitle>
        <p className="text-sm text-muted-foreground">إدارة التحميل المسبق للموارد لتحسين سرعة الصفحة وتجربة المستخدم.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">الإعدادات العامة</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><Label htmlFor="prefetchLinks">تفعيل Prefetch</Label><Switch id="prefetchLinks" checked={config.enablePrefetchLinks} onCheckedChange={(c) => updateConfig('enablePrefetchLinks', c)} /></div>
              <div className="flex items-center justify-between"><Label htmlFor="criticalCSS">استخلاص CSS الحرج</Label><Switch id="criticalCSS" checked={config.enableCriticalCSS} onCheckedChange={(c) => updateConfig('enableCriticalCSS', c)} /></div>
              <div className="flex items-center justify-between"><Label htmlFor="imagePreload">تحميل الصور الهامة مسبقاً</Label><Switch id="imagePreload" checked={config.enableImagePreloading} onCheckedChange={(c) => updateConfig('enableImagePreloading', c)} /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">استراتيجية الـ Cache</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['conservative', 'moderate', 'aggressive'].map((strategy) => (
                  <div key={strategy} className="flex items-center gap-2">
                    <input type="radio" id={strategy} name="cacheStrategy" checked={config.cacheStrategy === strategy} onChange={() => updateConfig('cacheStrategy', strategy)} />
                    <Label htmlFor={strategy} className="capitalize">{strategy === 'conservative' ? 'محافظة' : strategy === 'moderate' ? 'متوازنة' : 'قوية'}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">قواعد التحميل المسبق للصفحات</h4>
          <div className="space-y-3">
            {preloadRules.map((rule, index) => (
              <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(index)} />
                  <div>
                    <p className="font-medium text-sm">{rule.path}</p>
                    <p className="text-xs text-gray-500">آخر تحميل: {rule.lastPreloaded}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getPriorityColor(rule.priority)}>أولوية {rule.priority === 'high' ? 'عالية' : rule.priority === 'medium' ? 'متوسطة' : 'منخفضة'}</Badge>
                  <Badge variant="secondary">{rule.cacheHit}% نجاح</Badge>
                  <Badge variant="outline">{rule.loadTime}s</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreloadedSEOData;