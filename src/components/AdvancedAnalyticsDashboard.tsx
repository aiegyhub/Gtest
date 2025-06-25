
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { Star, MapPin } from "lucide-react";
import RealTimeMetrics from "./analytics/RealTimeMetrics";

interface AnalyticsData {
  bookings: any[];
  revenue: any[];
  customerSatisfaction: any[];
  servicePerformance: any[];
  geographicData: any[];
  realTimeMetrics: any;
}

const AdvancedAnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    bookings: [],
    revenue: [],
    customerSatisfaction: [],
    servicePerformance: [],
    geographicData: [],
    realTimeMetrics: {}
  });
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = () => {
      const bookingsData = [
        { name: 'السبت', bookings: 45, revenue: 12500 },
        { name: 'الأحد', bookings: 52, revenue: 15200 },
        { name: 'الاثنين', bookings: 38, revenue: 11800 },
        { name: 'الثلاثاء', bookings: 61, revenue: 18400 },
        { name: 'الأربعاء', bookings: 48, revenue: 14200 },
        { name: 'الخميس', bookings: 55, revenue: 16800 },
        { name: 'الجمعة', bookings: 42, revenue: 13600 }
      ];

      const servicePerformance = [
        { service: 'تنظيف المنازل', bookings: 125, satisfaction: 4.8, revenue: 35000 },
        { service: 'خدمات التكييف', bookings: 95, satisfaction: 4.6, revenue: 28500 },
        { service: 'مكافحة الحشرات', bookings: 78, satisfaction: 4.7, revenue: 22100 },
        { service: 'خدمات السباكة', bookings: 65, satisfaction: 4.5, revenue: 19800 },
        { service: 'نقل الأثاث', bookings: 45, satisfaction: 4.4, revenue: 15600 }
      ];

      const geographicData = [
        { city: 'الرياض', bookings: 180, percentage: 35 },
        { city: 'جدة', bookings: 145, percentage: 28 },
        { city: 'الدمام', bookings: 95, percentage: 18 },
        { city: 'مكة المكرمة', bookings: 65, percentage: 12 },
        { city: 'المدينة المنورة', bookings: 35, percentage: 7 }
      ];

      const realTimeMetrics = {
        activeBookings: 23,
        onlineCustomers: 156,
        avgResponseTime: '2.5 دقيقة',
        conversionRate: '8.2%',
        customerSatisfaction: 4.7,
        monthlyGrowth: '+15.3%'
      };

      setAnalyticsData({
        bookings: bookingsData,
        revenue: bookingsData,
        customerSatisfaction: servicePerformance,
        servicePerformance,
        geographicData,
        realTimeMetrics
      });
    };

    generateMockData();
    
    // Update data every 30 seconds
    const interval = setInterval(generateMockData, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Real-time Metrics */}
      <RealTimeMetrics metrics={analyticsData.realTimeMetrics} />

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['1d', '7d', '30d', '90d'].map((range) => (
          <Button
            key={range}
            size="sm"
            variant={timeRange === range ? 'default' : 'outline'}
            onClick={() => setTimeRange(range)}
          >
            {range === '1d' ? 'اليوم' : 
             range === '7d' ? '7 أيام' :
             range === '30d' ? '30 يوم' : '90 يوم'}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="services">أداء الخدمات</TabsTrigger>
          <TabsTrigger value="geographic">التوزيع الجغرافي</TabsTrigger>
          <TabsTrigger value="ai-insights">الرؤى الذكية</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الحجوزات اليومية</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.bookings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الإيرادات اليومية</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>أداء الخدمات المفصل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.servicePerformance.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{service.service}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">{service.bookings} حجز</Badge>
                        <Badge variant="outline" className="text-green-600">
                          <Star className="h-3 w-3 ml-1" />
                          {service.satisfaction}
                        </Badge>
                        <Badge variant="outline" className="text-blue-600">
                          {service.revenue.toLocaleString()} ريال
                        </Badge>
                      </div>
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-blue-500 rounded"
                        style={{ width: `${(service.bookings / 125) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>التوزيع الجغرافي للحجوزات</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.geographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ city, percentage }) => `${city} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="bookings"
                    >
                      {analyticsData.geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء المدن</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.geographicData.map((city, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{city.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div 
                            className="h-full bg-blue-500 rounded"
                            style={{ width: `${city.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{city.bookings}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-purple-800">توقعات الذكي الاصطناعي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-green-700 mb-2">📈 نمو متوقع</h4>
                    <p className="text-sm text-gray-600">
                      بناءً على الاتجاهات الحالية، نتوقع زيادة 23% في الحجوزات خلال الشهر القادم
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-blue-700 mb-2">🎯 توصيات التحسين</h4>
                    <p className="text-sm text-gray-600">
                      ركز على خدمات التنظيف في الرياض وجدة لتحقيق أقصى عائد
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-orange-700 mb-2">⚠️ تحذيرات مبكرة</h4>
                    <p className="text-sm text-gray-600">
                      انخفاض طفيف في رضا العملاء لخدمات السباكة - يحتاج مراجعة
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">معدل إتمام الحجوزات</span>
                    <Badge className="bg-green-100 text-green-800">94.5%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">متوسط قيمة الحجز</span>
                    <Badge className="bg-blue-100 text-blue-800">285 ريال</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">معدل العملاء المتكررين</span>
                    <Badge className="bg-yellow-100 text-yellow-800">67%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">سرعة الاستجابة</span>
                    <Badge className="bg-purple-100 text-purple-800">98.2%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
