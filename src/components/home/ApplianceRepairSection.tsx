
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Refrigerator, Waves, Settings, Star, Phone } from "lucide-react";

interface ApplianceRepairSectionProps {
  onBookService: (serviceName: string) => void;
}

const ApplianceRepairSection = ({ onBookService }: ApplianceRepairSectionProps) => {
  const applianceServices = [
    {
      id: "dryer-repair",
      name: "صيانة النشافات والعصرات",
      description: "إصلاح شامل لجميع أنواع النشافات ومشاكل التجفيف",
      icon: Waves,
      pricing: "يبدأ من 120 ريال",
      features: ["تشخيص دقيق", "قطع غيار أصلية", "ضمان 6 أشهر", "خدمة منزلية"],
      rating: 4.8,
      keywords: ["نشافة لا تسخن", "تصليح نشافة", "عطل نشافة"],
      availability: "متاح يومياً"
    },
    {
      id: "commercial-fridge",
      name: "صيانة ثلاجات العرض التجارية",
      description: "صيانة متخصصة لثلاجات السوبر ماركت ومحلات العرض",
      icon: Refrigerator,
      pricing: "يبدأ من 200 ريال",
      features: ["صيانة فورية", "شحن فريون", "تغيير كمبروسور", "صيانة دورية"],
      rating: 4.9,
      keywords: ["تصليح ثلاجة سوبرماركت", "فريون ثلاجات عرض", "ثلاجة عرض معطلة"],
      availability: "طوارئ 24/7",
      commercial: true
    },
    {
      id: "fridge-seal",
      name: "تركيب غروف التبريد والعوازل",
      description: "تبديل جوانات الثلاجة وإصلاح مشاكل الإغلاق",
      icon: Settings,
      pricing: "يبدأ من 80 ريال",
      features: ["جوانات أصلية", "إحكام كامل", "توفير الطاقة", "ضمان سنة"],
      rating: 4.7,
      keywords: ["باب الثلاجة مش بيقفل", "تبديل عازل", "جوانة ثلاجة"],
      availability: "حجز مسبق"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            صيانة الأجهزة المنزلية
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            خبراء صيانة الأجهزة الكهربائية
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            فريق متخصص في صيانة جميع الأجهزة المنزلية والتجارية بضمان الجودة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applianceServices.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200 bg-white">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-600 to-purple-600 opacity-10 rounded-bl-full"></div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
                      <ServiceIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    {service.commercial && (
                      <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                        تجاري
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 mr-1">{service.rating}</span>
                    </div>
                    <span className="text-sm font-medium text-indigo-600">{service.pricing}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{service.availability}</span>
                    </div>
                    
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Wrench className="h-3 w-3 text-indigo-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => onBookService(service.name)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    size="sm"
                  >
                    احجز الصيانة
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-4">
            🔧 صيانة موثوقة بقطع غيار أصلية وضمان شامل
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>✅ تشخيص مجاني</span>
            <span>✅ قطع غيار أ��لية</span>
            <span>✅ ضمان معتمد</span>
            <span>✅ خدمة منزلية</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplianceRepairSection;
