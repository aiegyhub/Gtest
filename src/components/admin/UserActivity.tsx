import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Phone, 
  Calendar, 
  MessageCircle, 
  Eye, 
  Clock,
  MapPin
} from "lucide-react";

interface Activity {
  id: number;
  type: 'search' | 'view' | 'call' | 'booking' | 'whatsapp';
  description: string;
  timestamp: Date;
  user: string;
  city?: string;
}

const UserActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const mockActivities: Activity[] = [
      { id: 1, type: 'search', description: 'بحث عن "تنظيف منازل"', user: 'زائر من الرياض', city: 'الرياض', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
      { id: 2, type: 'view', description: 'عرض صفحة خدمة مكافحة الحشرات', user: 'زائر من جدة', city: 'جدة', timestamp: new Date(Date.now() - 5 * 60 * 1000) },
      { id: 3, type: 'call', description: 'بدء مكالمة من صفحة كشف التسريبات', user: 'أحمد', city: 'الدمام', timestamp: new Date(Date.now() - 8 * 60 * 1000) },
      { id: 4, type: 'booking', description: 'حجز خدمة صيانة مكيفات', user: 'فاطمة', city: 'أبها', timestamp: new Date(Date.now() - 12 * 60 * 1000) },
      { id: 5, type: 'whatsapp', description: 'إرسال رسالة واتساب', user: 'سعد', city: 'خميس مشيط', timestamp: new Date(Date.now() - 15 * 60 * 1000) }
    ];
    setActivities(mockActivities);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        type: ['search', 'view', 'call', 'booking', 'whatsapp'][Math.floor(Math.random() * 5)] as Activity['type'],
        description: 'نشاط جديد تلقائي',
        user: `زائر ${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date()
      };
      setActivities(prev => [newActivity, ...prev].slice(0, 10));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getActivityInfo = (type: Activity['type']) => {
    switch (type) {
      case 'search': return { icon: Search, color: 'bg-blue-100 text-blue-800', label: 'بحث' };
      case 'view': return { icon: Eye, color: 'bg-purple-100 text-purple-800', label: 'مشاهدة' };
      case 'call': return { icon: Phone, color: 'bg-green-100 text-green-800', label: 'اتصال' };
      case 'booking': return { icon: Calendar, color: 'bg-yellow-100 text-yellow-800', label: 'حجز' };
      case 'whatsapp': return { icon: MessageCircle, color: 'bg-teal-100 text-teal-800', label: 'واتساب' };
      default: return { icon: Users, color: 'bg-gray-100 text-gray-800', label: 'نشاط' };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>مراقبة نشاط المستخدمين (مباشر)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {activities.map(activity => {
            const { icon: Icon, color, label } = getActivityInfo(activity.type);
            const timeAgo = Math.round((new Date().getTime() - activity.timestamp.getTime()) / 60000);
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{activity.description}</span>
                    <Badge variant="outline" className={`text-xs ${color}`}>{label}</Badge>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{activity.user}</span>
                    {activity.city && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{activity.city}</span>}
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />قبل {timeAgo} دقيقة</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivity;