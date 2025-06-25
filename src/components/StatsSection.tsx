
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, Clock, MapPin } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "عميل راضٍ",
      description: "استفادوا من خدماتنا المميزة"
    },
    {
      icon: Star,
      number: "4.8",
      label: "تقييم العملاء",
      description: "من أصل 5 نجوم"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "خدمة مستمرة",
      description: "نعمل على مدار الساعة"
    },
    {
      icon: MapPin,
      number: "13",
      label: "منطقة تغطية",
      description: "في جميع أنحاء المملكة"
    }
  ];

  return (
    <section className="bg-blue-600 text-white rounded-lg p-8 mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-white">أرقام تتحدث عن نفسها</h2>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          ثقة عملائنا هي أهم إنجازاتنا، وهذه الأرقام تعكس التميز في خدماتنا
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-colors">
            <CardContent className="text-center p-6">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2 text-white">{stat.number}</div>
              <div className="text-lg font-semibold mb-1 text-white">{stat.label}</div>
              <div className="text-sm text-blue-100">{stat.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
