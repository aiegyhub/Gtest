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
  Tooltip,
  Legend
} from "recharts";
import { Star, MapPin, Lightbulb, TrendingUp } from "lucide-react";
import RealTimeMetrics from "../analytics/RealTimeMetrics";
import { predictiveAnalyticsService } from "@/services/predictiveAnalyticsService";

const PredictiveAnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [bookings, revenue, customerSatisfaction, servicePerformance, geographicData, realTimeMetrics] = await Promise.all([
        predictiveAnalyticsService.generateMarketForecast('30d'),
        predictiveAnalyticsService.generateMarketForecast('30d'),
        predictiveAnalyticsService.getCustomerBehaviorPatterns(),
        predictiveAnalyticsService.getSeasonalTrends(),
        predictiveAnalyticsService.generatePredictiveInsights(),
        Promise.resolve({ activeBookings: 23, onlineCustomers: 156, avgResponseTime: '2.5 دقيقة', conversionRate: '8.2%', customerSatisfaction: 4.7, monthlyGrowth: '+15.3%' })
      ]);
      setAnalyticsData({ bookings, revenue, customerSatisfaction, servicePerformance, geographicData, realTimeMetrics });
      setIsLoading(false);
    };
    fetchData();
  }, [timeRange]);
  
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (isLoading || !analyticsData) {
    return <Card><CardContent className="p-6 text-center">جاري تحميل البيانات التنبؤية...</CardContent></Card>;
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>لوحة التحليلات التنبؤية</CardTitle>
        <p className="text-sm text-muted-foreground">نظرة مستقبلية على أداء عملك بناءً على البيانات.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <RealTimeMetrics metrics={analyticsData.realTimeMetrics} />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="services">أداء الخدمات</TabsTrigger>
            <TabsTrigger value="geographic">التوزيع الجغرافي</TabsTrigger>
            <TabsTrigger value="ai-insights">الرؤى الذكية</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">التوقعات المستقبلية ({timeRange === '30d' ? '30 يوم' : timeRange})</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[{...analyticsData.bookings.forecast}, {...analyticsData.bookings.forecast, expectedRevenue: analyticsData.bookings.forecast.expectedRevenue * 1.1}]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeframe" hide />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="expectedRevenue" name="الإيرادات المتوقعة" stroke="#10B981" />
                    <Line type="monotone" dataKey="expectedBookings" name="الحجوزات المتوقعة" stroke="#3B82F6" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader><CardTitle className="text-base">الاتجاهات الموسمية للخدمات</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analyticsData.servicePerformance.map((trend: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold">{trend.service}</h4>
                      <p className="text-sm text-muted-foreground">{trend.month}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-600">زيادة متوقعة {trend.expectedDemand}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="geographic">
            <Card>
              <CardHeader><CardTitle className="text-base">فرص النمو الجغرافي</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.geographicData.filter((i: any) => i.type === 'opportunity').map((insight: any) => (
                     <div key={insight.id} className="p-3 border rounded-lg"><h4 className="font-semibold">{insight.title}</h4><p className="text-sm text-muted-foreground">{insight.description}</p></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader><CardTitle className="text-blue-800 flex items-center gap-2"><Lightbulb className="h-5 w-5"/>توصيات الذكاء الاصطناعي</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc mr-4 text-sm text-blue-700">
                   {analyticsData.geographicData.filter((i: any) => i.actionable).map((insight: any) => (
                     <li key={insight.id}><strong>{insight.title}:</strong> {insight.recommendations?.join(', ')}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalyticsDashboard;