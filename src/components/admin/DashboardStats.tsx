import { Card, CardContent } from "@/components/ui/card";
import { Users, Phone, FileText, TrendingUp, Search, Link } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "إجمالي العملاء",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
      icon: Users,
      color: "blue"
    },
    {
      title: "المكالمات اليوم",
      value: "127",
      change: "+23%",
      changeType: "increase",
      icon: Phone,
      color: "green"
    },
    {
      title: "معدل التحويل",
      value: "8.3%",
      change: "+1.2%",
      changeType: "increase",
      icon: TrendingUp,
      color: "purple"
    },
    {
      title: "الصفحات المفهرسة",
      value: "148 / 156",
      change: "+5",
      changeType: "increase",
      icon: Search,
      color: "orange"
    }
  ];

  const colors = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      gradient: 'from-blue-50 to-blue-100'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      gradient: 'from-green-50 to-green-100'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      gradient: 'from-purple-50 to-purple-100'
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
      gradient: 'from-orange-50 to-orange-100'
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const theme = colors[stat.color as keyof typeof colors];
        
        return (
          <Card key={index} className={`border-0 bg-gradient-to-br ${theme.gradient}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${theme.bg}`}>
                  <Icon className={`h-6 w-6 ${theme.text}`} />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;