
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Lightbulb, Shield, Clock, AlertTriangle } from "lucide-react";

interface ElectricalServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

const ElectricalServicesSection = ({ onBookService }: ElectricalServicesSectionProps) => {
  const electricalServices = [
    {
      id: "emergency-electrical",
      name: "صيانة أعطال الكهرباء الطارئة",
      description: "إصلاح فوري لأعطال الكهرباء وانقطاع التيار المفاجئ",
      icon: AlertTriangle,
      pricing: "يبدأ من 150 ريال",
      features: ["خدمة 24/7", "استجابة فورية", "فحص شامل", "ضمان الأمان"],
      urgency: "طوارئ",
      keywords: ["فصل كهرباء مفاجئ", "كهرباء تطفي وتشتغل", "عطل كهرباء"]
    },
    {
      id: "circuit-installation",
      name: "تركيب لوحات التوزيع والمفاتيح",
      description: "تركيب وصيانة لوحات الكهرباء ومفاتيح التحكم",
      icon: Zap,
      pricing: "يبدأ من 200 ريال",
      features: ["لوحات حديثة", "مفاتيح ذكية", "حماية من التحميل", "ضمان سنتين"],
      urgency: "حجز مسبق",
      keywords: ["لوحة كهرباء", "مفاتيح كهرباء", "توزيع كهربائي"]
    },
    {
      id: "garden-lighting",
      name: "إنارة الحدائق والأسقف",
      description: "تصميم وتركيب أنظمة الإنارة الداخلية والخارجية",
      icon: Lightbulb,
      pricing: "يبدأ من 180 ريال",
      features: ["LED موفر للطاقة", "تحكم ذكي", "إنارة خارجية", "تصميم جمالي"],
      urgency: "حجز مسبق",
      keywords: ["تركيب لمبات", "سبوت لايت", "إنارة خارجية", "إنارة حديقة"]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
            خدمات الكهرباء المتخصصة
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            حلول كهربائية آمنة ومضمونة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            فريق متخصص في جميع أعمال الكهرباء مع ضمان الأمان والجودة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electricalServices.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-yellow-200 bg-white">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-600 to-orange-600 opacity-10 rounded-bl-full"></div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                      <ServiceIcon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      service.urgency === 'طوارئ' 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {service.urgency}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">{service.pricing}</span>
                    </div>
                    
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => onBookService(service.name)}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
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
            ⚡ خدمات كهربائية آمنة ومضمونة مع فريق مؤهل
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>✅ فحص مجاني</span>
            <span>✅ ضمان الأمان</span>
            <span>✅ مواد عالية الجودة</span>
            <span>✅ أسعار تنافسية</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElectricalServicesSection;
