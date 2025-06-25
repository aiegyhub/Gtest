
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Utensils, Droplets, Sparkles, Star, Clock } from "lucide-react";

interface SpecializedCleaningSectionProps {
  onBookService: (serviceName: string) => void;
}

const SpecializedCleaningSection = ({ onBookService }: SpecializedCleaningSectionProps) => {
  const cleaningServices = [
    {
      id: "post-construction",
      name: "تنظيف بعد التشطيب",
      description: "تنظيف شامل للمباني الجديدة وإزالة بقايا البناء",
      icon: Building,
      pricing: "يبدأ من 5 ريال/متر",
      features: ["إزالة الأتربة", "تنظيف الدهانات", "تلميع الأرضيات", "تنظيف النوافذ"],
      rating: 4.9,
      keywords: ["تنظيف شقة جديدة", "إزالة بقايا البناء", "تنظيف بعد الدهان"]
    },
    {
      id: "restaurant-hood",
      name: "تنظيف مداخن المطاعم",
      description: "تنظيف متخصص لشفاطات ومداخن المطاعم التجارية",
      icon: Utensils,
      pricing: "يبدأ من 300 ريال",
      features: ["إزالة الدهون", "تنظيف الفلاتر", "تعقيم شامل", "صيانة دورية"],
      rating: 4.8,
      keywords: ["تنظيف شفاط مطبخ", "دهون متراكمة", "مداخن مطاعم"],
      commercial: true
    },
    {
      id: "sewage-cleaning",
      name: "تنظيف وتعقيم البيارات",
      description: "شفط وتنظيف وتعقيم البيارات والصرف الصحي",
      icon: Droplets,
      pricing: "يبدأ من 200 ريال",
      features: ["شفط آمن", "تعقيم شامل", "إزالة الروائح", "صيانة وقائية"],
      rating: 4.7,
      keywords: ["تنظيف بيارة", "شفط البيارة", "تعقيم المجاري"],
      emergency: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
            تنظيف متخصص
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            خدمات تنظيف احترافية ومتخصصة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            حلول تنظيف متقدمة للمباني الجديدة والمنشآت التجارية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cleaningServices.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200 bg-white">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-600 to-teal-600 opacity-10 rounded-bl-full"></div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-lg">
                      <ServiceIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex gap-2">
                      {service.commercial && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          تجاري
                        </Badge>
                      )}
                      {service.emergency && (
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          طوارئ
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 mr-1">{service.rating}</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">{service.pricing}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Sparkles className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => onBookService(service.name)}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                    size="sm"
                  >
                    احجز الآن
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-4">
            🧽 تنظيف متخصص بأحدث المعدات والمواد الآمنة
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>✅ معدات متطورة</span>
            <span>✅ مواد آمنة</span>
            <span>✅ فريق مدرب</span>
            <span>✅ ضمان النظافة</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializedCleaningSection;
