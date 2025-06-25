import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Trash2, HardDrive, Zap, Database, Image, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CacheManagement = () => {
  const [isClearing, setIsClearing] = useState(false);
  
  const cacheStats = {
    totalSize: "2.4 GB",
    usedSize: "1.8 GB",
    usage: 75,
    items: 12847,
    hitRate: 94.2
  };

  const cacheTypes = [
    { name: "بيانات الصفحات", type: 'page', size: "1.2 GB", items: 8430, lastCleared: "منذ 3 أيام" },
    { name: "استجابات API", type: 'api', size: "450 MB", items: 3200, lastCleared: "منذ يوم" },
    { name: "ملفات الصور", type: 'image', size: "150 MB", items: 1217, lastCleared: "منذ ساعتين" }
  ];

  const handleClearCache = async (type?: string) => {
    setIsClearing(true);
    const message = type ? `جاري تنظيف cache ${type}...` : "جاري تنظيف جميع أنواع الـ cache...";
    toast.info(message);

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsClearing(false);
    toast.success("اكتملت عملية التنظيف بنجاح!");
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'page': return { icon: HardDrive, color: 'text-blue-600' };
      case 'api': return { icon: Database, color: 'text-green-600' };
      case 'image': return { icon: Image, color: 'text-purple-600' };
      default: return { icon: HardDrive, color: 'text-gray-600' };
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" />إدارة التخزين المؤقت (Cache)</CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700">نشط</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2"><HardDrive className="h-4 w-4 text-blue-600" /><span className="font-medium">الحجم المستخدم</span></div>
            <p className="text-2xl font-bold text-blue-600">{cacheStats.usedSize}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2"><Zap className="h-4 w-4 text-green-600" /><span className="font-medium">معدل النجاح (Hit Rate)</span></div>
            <p className="text-2xl font-bold text-green-600">{cacheStats.hitRate}%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2"><RefreshCw className="h-4 w-4 text-purple-600" /><span className="font-medium">العناصر المحفوظة</span></div>
            <p className="text-2xl font-bold text-purple-600">{cacheStats.items.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm"><span>استخدام التخزين المؤقت</span><span>{cacheStats.usage}%</span></div>
          <Progress value={cacheStats.usage} className="h-2" />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">أنواع التخزين المؤقت</h4>
          <div className="space-y-3">
            {cacheTypes.map((cache, index) => {
              const { icon: Icon, color } = getTypeInfo(cache.type);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${color}`} />
                    <div>
                      <h5 className="font-medium">{cache.name}</h5>
                      <p className="text-sm text-gray-600">{cache.size} • {cache.items} عنصر</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleClearCache(cache.type)} disabled={isClearing}>
                    <Trash2 className="h-4 w-4 ml-1" /> تنظيف
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t pt-4">
          <Button onClick={() => handleClearCache()} disabled={isClearing} className="w-full">
            {isClearing ? <Loader2 className="h-4 w-4 ml-2 animate-spin" /> : <Trash2 className="h-4 w-4 ml-2" />}
            {isClearing ? 'جاري التنظيف...' : 'تنظيف جميع أنواع الـ Cache'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CacheManagement;