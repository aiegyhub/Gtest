import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Image, Zap, FileImage, Settings, RefreshCw, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ImageOptimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const imageStats = {
    totalImages: 1543,
    optimizedImages: 1298,
    sizeSaved: "3.2 GB",
    originalSize: "8.7 GB",
    currentSize: "5.5 GB",
    compressionRate: 37
  };

  const optimizationQueue = [
    { name: "hero-banner.jpg", size: "2.4 MB", estimated: "850 KB", savings: "65%" },
    { name: "service-gallery.png", size: "1.8 MB", estimated: "420 KB", savings: "77%" },
    { name: "testimonial-bg.jpg", size: "1.2 MB", estimated: "380 KB", savings: "68%" }
  ];

  const handleOptimize = async () => {
    setIsOptimizing(true);
    toast.info("بدء عملية تحسين الصور...", { duration: 3000 });
    await new Promise(resolve => setTimeout(resolve, 3000));
    toast.success("اكتملت عملية تحسين الصور بنجاح!");
    setIsOptimizing(false);
  };

  const optimizationPercentage = Math.round((imageStats.optimizedImages / imageStats.totalImages) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2"><Image className="h-5 w-5" />تحسين الصور</CardTitle>
          <Badge variant={optimizationPercentage > 80 ? "default" : "secondary"} className={optimizationPercentage > 80 ? "bg-green-600" : ""}>
            {optimizationPercentage}% محسن
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="font-medium">توفير في الحجم</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{imageStats.sizeSaved}</p>
            <p className="text-sm text-gray-600">{imageStats.compressionRate}% معدل ضغط</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileImage className="h-4 w-4 text-blue-600" />
              <span className="font-medium">الصور المحسنة</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{imageStats.optimizedImages.toLocaleString()}</p>
            <p className="text-sm text-gray-600">من أصل {imageStats.totalImages.toLocaleString()} صورة</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>تقدم التحسين</span>
            <span>{optimizationPercentage}%</span>
          </div>
          <Progress value={optimizationPercentage} className="h-2" />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">قائمة انتظار التحسين ({optimizationQueue.length})</h4>
          <div className="space-y-2">
            {optimizationQueue.map((image, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Image className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="font-medium text-sm">{image.name}</p>
                    <p className="text-xs text-gray-600">{image.size} → {image.estimated}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {image.savings} توفير
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex gap-2">
            <Button onClick={handleOptimize} disabled={isOptimizing}>
              {isOptimizing ? <Loader2 className="h-4 w-4 ml-2 animate-spin" /> : <RefreshCw className="h-4 w-4 ml-2" />}
              {isOptimizing ? 'جاري التحسين...' : 'تحسين الصور المتبقية'}
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 ml-2" />
              إعدادات
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageOptimization;