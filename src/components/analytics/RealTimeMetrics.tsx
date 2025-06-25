
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Clock, 
  Target, 
  Star, 
  TrendingUp 
} from "lucide-react";

interface RealTimeMetricsProps {
  metrics: {
    activeBookings: number;
    onlineCustomers: number;
    avgResponseTime: string;
    conversionRate: string;
    customerSatisfaction: number;
    monthlyGrowth: string;
  };
}

const RealTimeMetrics = ({ metrics }: RealTimeMetricsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <div>
              <p className="text-xs opacity-90">الحجوزات النشطة</p>
              <p className="text-lg font-bold">{metrics.activeBookings}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <div>
              <p className="text-xs opacity-90">العملاء المتصلين</p>
              <p className="text-lg font-bold">{metrics.onlineCustomers}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <div>
              <p className="text-xs opacity-90">متوسط الاستجابة</p>
              <p className="text-lg font-bold">{metrics.avgResponseTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            <div>
              <p className="text-xs opacity-90">معدل التحويل</p>
              <p className="text-lg font-bold">{metrics.conversionRate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            <div>
              <p className="text-xs opacity-90">رضا العملاء</p>
              <p className="text-lg font-bold">{metrics.customerSatisfaction}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <div>
              <p className="text-xs opacity-90">النمو الشهري</p>
              <p className="text-lg font-bold">{metrics.monthlyGrowth}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeMetrics;
