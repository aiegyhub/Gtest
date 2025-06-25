import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, DollarSign, Users, Calendar, MapPin, Star, Lightbulb } from "lucide-react";

const BusinessIntelligence = () => {
  const revenueData = [
    { month: "يناير", revenue: 45000, leads: 234 },
    { month: "فبراير", revenue: 52000, leads: 267 },
    { month: "مارس", revenue: 48000, leads: 245 },
    { month: "أبريل", revenue: 58000, leads: 289 },
    { month: "مايو", revenue: 62000, leads: 312 },
    { month: "يونيو", revenue: 67000, leads: 334 }
  ];

  const serviceRevenue = [
    { service: "صيانة المكيفات", revenue: 156000, growth: 22.1, margin: 38 },
    { service: "تنظيف المنازل", revenue: 125000, growth: 15.2, margin: 32 },
    { service: "خدمات الكهرباء", revenue: 94000, growth: 18.9, margin: 36 },
    { service: "مكافحة الحشرات", revenue: 89000, growth: 8.7, margin: 45 },
    { service: "خدمات السباكة", revenue: 78000, growth: 12.4, margin: 41 }
  ];

  const cityPerformance = [
    { city: "الرياض", revenue: 189000, customers: 456, satisfaction: 4.7 },
    { city: "جدة", revenue: 156000, customers: 389, satisfaction: 4.6 },
    { city: "الدمام", revenue: 134000, customers: 312, satisfaction: 4.5 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>ذكاء الأعمال (BI)</CardTitle>
        <p className="text-sm text-muted-foreground">تحليلات معمقة لدعم اتخاذ القرار.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg"><div className="flex items-center gap-2 mb-2"><DollarSign className="h-4 w-4 text-green-600" /><span className="font-medium">الإيرادات الشهرية</span></div><p className="text-2xl font-bold text-green-600">67,000 ر.س</p><p className="text-sm text-green-600">+8.1%</p></div>
          <div className="bg-blue-50 p-4 rounded-lg"><div className="flex items-center gap-2 mb-2"><Users className="h-4 w-4 text-blue-600" /><span className="font-medium">عملاء جدد</span></div><p className="text-2xl font-bold text-blue-600">334</p><p className="text-sm text-blue-600">+12.3%</p></div>
          <div className="bg-purple-50 p-4 rounded-lg"><div className="flex items-center gap-2 mb-2"><Calendar className="h-4 w-4 text-purple-600" /><span className="font-medium">قيمة العميل</span></div><p className="text-2xl font-bold text-purple-600">200 ر.س</p><p className="text-sm text-purple-600">متوسط الطلب</p></div>
          <div className="bg-orange-50 p-4 rounded-lg"><div className="flex items-center gap-2 mb-2"><Star className="h-4 w-4 text-orange-600" /><span className="font-medium">رضا العملاء</span></div><p className="text-2xl font-bold text-orange-600">4.6/5</p><p className="text-sm text-orange-600">من 1,234 تقييم</p></div>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">اتجاه الإيرادات والعملاء الجدد</CardTitle></CardHeader>
          <CardContent><ResponsiveContainer width="100%" height={250}><LineChart data={revenueData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Legend /><Line type="monotone" dataKey="revenue" name="الإيرادات" stroke="#10b981" strokeWidth={2} /><Line type="monotone" dataKey="leads" name="العملاء الجدد" stroke="#3b82f6" strokeWidth={2} /></LineChart></ResponsiveContainer></CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">أداء الخدمات المالي</h4>
            <div className="space-y-3">
              {serviceRevenue.map((service, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-medium text-sm">{service.service}</h5>
                    <p className="font-bold text-green-600 text-sm">{service.revenue.toLocaleString()} ر.س</p>
                  </div>
                  <Progress value={service.growth * 3} className="h-1" />
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-1"><span>هامش ربح {service.margin}%</span><div className="flex items-center gap-1 text-green-500"><TrendingUp className="h-3 w-3" /><span>+{service.growth}%</span></div></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">أداء المدن</h4>
            <div className="space-y-3">
              {cityPerformance.map((city, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-500" /><span className="font-medium">{city.city}</span></div>
                    <div className="flex items-center gap-1 text-sm"><Star className="h-3 w-3 text-yellow-500 fill-current" /><span>{city.satisfaction}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h5 className="font-medium text-blue-800 mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4"/>رؤى الأعمال الذكية</h5>
          <ul className="text-sm text-blue-700 space-y-1 list-disc mr-4">
            <li>خدمات التكييف تظهر أعلى نمو (+22.1%) - فرصة للتوسع.</li>
            <li>الرياض تحقق أعلى الإيرادات - يُنصح بزيادة الاستثمار التسويقي.</li>
            <li>ذروة الطلب في الفترة من 10 صباحاً إلى 4 عصراً.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessIntelligence;