import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, FileText } from "lucide-react";

const LeadsStats = () => {
  const stats = [
    {
      title: "مكالمات اليوم",
      value: "89",
      change: "+15%",
      icon: Phone,
      color: "blue"
    },
    {
      title: "رسائل واتساب",
      value: "56",
      change: "+8%",
      icon: MessageCircle,
      color: "green"
    },
    {
      title: "طلبات النماذج",
      value: "23",
      change: "+3%",
      icon: FileText,
      color: "purple"
    }
  ];

  const topServices = [
    { name: "تنظيف المنازل", requests: 32 },
    { name: "مكافحة الحشرات", requests: 28 },
    { name: "صيانة التكييف", requests: 21 },
  ];

  const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إحصائيات العملاء المحتملين (اليوم)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const theme = colors[stat.color as keyof typeof colors];
              return (
                <div key={index} className={`p-4 rounded-lg ${theme.bg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-4 w-4 ${theme.text}`} />
                    <h3 className="font-semibold">{stat.title}</h3>
                  </div>
                  <p className={`text-2xl font-bold ${theme.text}`}>{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} من أمس</p>
                </div>
              );
            })}
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">أهم الخدمات المطلوبة</h4>
            <div className="space-y-3">
              {topServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                  <span className="font-medium text-gray-800">{service.name}</span>
                  <span className="font-semibold text-blue-600">{service.requests} طلب</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsStats;