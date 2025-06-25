
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Wrench, Building2, Star, Clock } from "lucide-react";

interface AdvancedPlumbingSectionProps {
  onBookService: (serviceName: string) => void;
}

const AdvancedPlumbingSection = ({ onBookService }: AdvancedPlumbingSectionProps) => {
  const plumbingServices = [
    {
      id: "water-heater-filter",
      name: "تركيب السخانات والفلاتر",
      description: "تركيب وصيانة السخانات وأنظمة تنقية المياه",
      icon: Thermometer,
      pricing: "يبدأ من 180 ريال",
      features: ["سخانات كهربائية", "فلاتر تنقية", "صيانة دورية", "ضمان سنتين"],
      rating: 4.8,
      keywords: ["سخان لا يسخن", "تركيب فلتر مياه", "صيانة سخان"],
      availability: "متاح يومياً"
    },
    {
      id: "new-plumbing-system",
      name: "تمديد الشبكات الجديدة",
      description: "تصميم وتمديد شبكات المياه والصرف للمباني الجديدة",
      icon: Building2,
      pricing: "يبدأ من 15 ريال/متر",
      features: ["تصميم هندسي", "مواسير عالية الجودة", "اختبار الضغط", "ضمان 5 سنوات"],
      rating: 4.9,
      keywords: ["تأسيس سباكة", "شبكات صرف صحي", "تمديد مواسير"],
      availability: "مشاريع كبيرة",
      project: true
    },
    {
      id: "restaurant-exhaust",
      name: "صيانة شفاطات المطاعم",
      description: "صيانة وتنظيف شفاطات المطابخ التجارية",
      icon: Wrench,
      pricing: "يبدأ من 250 ريال",
      features: ["تنظيف عميق", "صيانة موتور", "تغيير فلاتر", "ضمان 6 أشهر"],
      rating: 4.7,
      keywords: ["شفاط لا يعمل", "تغيير فلاتر شفاط", "صيانة شفاط مطبخ"],
      availability: "خدمة تجارية",
      commercial: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
            السباكة المتقدمة
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            حلول سباكة شاملة ومتطورة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            من التركيبات البسيطة إلى المشاريع الكبيرة مع ضمان الجودة والمتانة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plumbingServices.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-cyan-200 bg-white">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-600 to-blue-600 opacity-10 rounded-bl-full"></div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg">
                      <ServiceIcon className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div className="flex gap-2">
                      {service.commercial && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          تجاري
                        </Badge>
                      )}
                      {service.project && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          مشاريع
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 mr-1">{service.rating}</span>
                    </div>
                    <span className="text-sm font-medium text-cyan-600">{service.pricing}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{service.availability}</span>
                    </div>
                    
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Droplets className="h-3 w-3 text-cyan-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => onBookService(service.name)}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                    size="sm"
                  >
                    احجز الخدمة
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-4">
            🚰 سباكة احترافية بمواد عالية الجودة وضمان طويل المدى
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>✅ استشارة مجانية</span>
            <span>✅ مواد معتمدة</span>
            <span>✅ تنفيذ سريع</span>
            <span>✅ ضمان ممتد</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedPlumbingSection;
