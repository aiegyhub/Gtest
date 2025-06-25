
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, TestTube, Users, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

const ConversionOptimizer = () => {
  const [abTests, setAbTests] = useState([
    {
      name: "تصميم زر الاتصال",
      status: "running",
      variants: 2,
      conversions: { a: 4.2, b: 5.8 },
      confidence: 85,
      traffic: 1240
    },
    {
      name: "نموذج طلب الخدمة",
      status: "completed",
      variants: 2,
      conversions: { a: 3.1, b: 4.5 },
      confidence: 95,
      traffic: 2150
    },
    {
      name: "عرض الأسعار",
      status: "draft",
      variants: 3,
      conversions: { a: 0, b: 0 },
      confidence: 0,
      traffic: 0
    }
  ]);

  const conversionFunnels = [
    { step: "زيارة الصفحة", visitors: 10000, rate: 100 },
    { step: "عرض الخدمة", visitors: 6500, rate: 65 },
    { step: "النقر على CTA", visitors: 520, rate: 8 },
    { step: "إكمال النموذج", visitors: 312, rate: 60 },
    { step: "تأكيد الطلب", visitors: 187, rate: 60 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-50 text-blue-700';
      case 'completed': return 'bg-green-50 text-green-700';
      case 'draft': return 'bg-gray-50 text-gray-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>محسن التحويلات (CRO)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Conversion Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="font-medium">معدل التحويل</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">7.2%</p>
            <p className="text-sm text-blue-600">+1.5% من الشهر الماضي</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-green-600" />
              <span className="font-medium">مكالمات هاتفية</span>
            </div>
            <p className="text-2xl font-bold text-green-600">342</p>
            <p className="text-sm text-green-600">+28 هذا الأسبوع</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-4 w-4 text-purple-600" />
              <span className="font-medium">رسائل واتساب</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">189</p>
            <p className="text-sm text-purple-600">+15 هذا الأسبوع</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-orange-600" />
              <span className="font-medium">طلبات النماذج</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">127</p>
            <p className="text-sm text-orange-600">+8 هذا الأسبوع</p>
          </div>
        </div>

        {/* A/B Tests */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">اختبارات A/B النشطة</h4>
            <Button size="sm">
              <TestTube className="h-4 w-4 ml-2" />
              اختبار جديد
            </Button>
          </div>
          <div className="space-y-3">
            {abTests.map((test, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-medium">{test.name}</h5>
                    <p className="text-sm text-gray-600">{test.traffic.toLocaleString()} زائر</p>
                  </div>
                  <Badge className={getStatusColor(test.status)}>
                    {test.status === 'running' && 'جاري'}
                    {test.status === 'completed' && 'مكتمل'}
                    {test.status === 'draft' && 'مسودة'}
                  </Badge>
                </div>
                {test.status !== 'draft' && (
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">النسخة A</p>
                      <p className="text-lg font-bold">{test.conversions.a}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">النسخة B</p>
                      <p className="text-lg font-bold text-green-600">{test.conversions.b}%</p>
                    </div>
                  </div>
                )}
                {test.confidence > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>مستوى الثقة</span>
                      <span>{test.confidence}%</span>
                    </div>
                    <Progress value={test.confidence} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">قمع التحويل</h4>
          <div className="space-y-3">
            {conversionFunnels.map((step, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{step.step}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">{step.visitors.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{step.rate}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*推荐优化 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-medium text-blue-800 mb-2">توصيات التحسين</h5>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• تحسين زر الاتصال في الصفحة الرئيسية (+15% تحويل متوقع)</li>
            <li>• تبسيط نموذج طلب الخدمة (+12% إكمال متوقع)</li>
            <li>• إضافة مراجعات العملاء في صفحات الخدمات</li>
            <li>• تحسين أوقات تحميل الصفحة للجوال</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionOptimizer;
