import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Zap, 
  RotateCcw, 
  HardDrive,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Image as ImageIcon,
  Trash2 // Corrected: Added missing import
} from "lucide-react";
import { toast } from "sonner";

interface CacheItem {
  key: string;
  size: string;
  lastAccessed: string;
  hitCount: number;
  type: 'page' | 'api' | 'image' | 'static';
}

interface CacheStats {
  totalSize: string;
  hitRate: number;
  missRate: number;
  totalRequests: number;
  cacheEfficiency: number;
}

const SmartCaching = () => {
  const [cacheItems, setCacheItems] = useState<CacheItem[]>([]);
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    loadCacheData();
  }, []);

  const loadCacheData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCacheItems([
      { key: '/sa/riyadh/home-cleaning', size: '2.4 MB', lastAccessed: '2024-01-15 14:30', hitCount: 156, type: 'page' },
      { key: '/api/services/cleaning', size: '845 KB', lastAccessed: '2024-01-15 14:25', hitCount: 89, type: 'api' },
      { key: '/images/hero-cleaning.jpg', size: '1.2 MB', lastAccessed: '2024-01-15 14:20', hitCount: 234, type: 'image' },
    ]);
    setCacheStats({ totalSize: '12.8 MB', hitRate: 78.5, missRate: 21.5, totalRequests: 2340, cacheEfficiency: 85.2 });
    
    setIsLoading(false);
  };

  const clearCache = async (type?: string) => {
    setIsClearing(true);
    const message = type ? `جاري تنظيف cache الـ${type}...` : "جاري تنظيف جميع أنواع الـ Cache...";
    toast.info(message);

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (type) setCacheItems(prev => prev.filter(item => item.type !== type));
    else setCacheItems([]);
    
    setIsClearing(false);
    toast.success("اكتملت عملية التنظيف بنجاح!");
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'page': return { icon: HardDrive, color: 'text-blue-600', label: 'الصفحات' };
      case 'api': return { icon: Database, color: 'text-green-600', label: 'API' };
      case 'image': return { icon: ImageIcon, color: 'text-purple-600', label: 'الصور' };
      default: return { icon: HardDrive, color: 'text-gray-600', label: 'غير محدد' };
    }
  };

  if (isLoading) return <Card><CardContent className="p-8 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></CardContent></Card>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>إدارة Cache الذكية</span>
          <Button variant="outline" size="sm" onClick={loadCacheData} disabled={isLoading}><RotateCcw className="h-4 w-4 ml-2" />تحديث</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {cacheStats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">الحجم الإجمالي</p><p className="text-2xl font-bold">{cacheStats.totalSize}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">معدل النجاح (Hit)</p><p className="text-2xl font-bold text-green-600">{cacheStats.hitRate}%</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">الكفاءة</p><p className="text-2xl font-bold">{cacheStats.cacheEfficiency}%</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">الطلبات</p><p className="text-2xl font-bold">{cacheStats.totalRequests.toLocaleString()}</p></CardContent></Card>
          </div>
        )}
        
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">أنواع التخزين المؤقت</h4>
          <div className="space-y-3">
            {Object.entries(
              cacheItems.reduce((acc, item) => {
                if (!acc[item.type]) acc[item.type] = { count: 0, size: 0 };
                acc[item.type].count++;
                return acc;
              }, {} as Record<string, { count: number; size: number }>)
            ).map(([type, stats], index) => {
              const { icon: Icon, color, label } = getTypeInfo(type);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3"><Icon className={`h-5 w-5 ${color}`} /><div><h5 className="font-medium">{label}</h5><p className="text-sm text-gray-600">{stats.count} عنصر</p></div></div>
                  <Button variant="destructive" size="sm" onClick={() => clearCache(type)} disabled={isClearing}><Trash2 className="h-4 w-4 ml-1" />تنظيف</Button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t pt-4">
          <Button onClick={() => clearCache()} disabled={isClearing} className="w-full" variant="destructive">
            {isClearing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
            {isClearing ? 'جاري التنظيف...' : 'تنظيف جميع أنواع الـ Cache'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartCaching;