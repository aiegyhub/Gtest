
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock, CheckCircle } from "lucide-react";
import { servicesData } from "@/data/servicesData";

interface HighValueServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

const HighValueServicesSection = ({ onBookService }: HighValueServicesSectionProps) => {
  // الخدمات عالية القيمة من المرحلة الأولى
  const highValueServices = [
    {
      service: servicesData.find(s => s.slug === "pest-control"),
      highlight: "رش دفان ومكافحة الرمة",
      urgencyLevel: "طوارئ 24/7",
      valueProposition: "حماية المباني من النمل الأبيض"
    },
    {
      service: servicesData.find(s => s.slug === "leak-detection"),
      highlight: "كشف تسريبات متطور",
      urgencyLevel: "فحص فوري",
      valueProposition: "توفير فواتير المياه والكهرباء"
    },
    {
      service: servicesData.find(s => s.slug === "insulation-services"),
      highlight: "عزل فوم متخصص",
      urgencyLevel: "ضمان 5 سنوات",
      valueProposition: "حماية شاملة للأسطح والخزانات"
    },
    {
      service: servicesData.find(s => s.slug === "electrical-services"),
      highlight: "حل مشاكل الكهرباء",
      urgencyLevel: "خدمة طوارئ",
      valueProposition: "أمان وكفاءة في الاستهلاك"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            خدمات عالية القيمة
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            خدمات متخصصة بأحدث التقنيات
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            احصل على أفضل الحلول المتطورة لحماية منزلك وتوفير المال مع ضمان الجودة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highValueServices.map((item, index) => {
            if (!item.service) return null;
            
            const ServiceIcon = item.service.icon;
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 bg-white">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-600 to-purple-600 opacity-10 rounded-bl-full"></div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                      <ServiceIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      {item.urgencyLevel}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{item.service.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 mr-1">{item.service.metadata.rating}</span>
                    </div>
                    <Badge className="text-xs bg-blue-100 text-blue-800">
                      {item.service.pricing.priceRange}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{item.highlight}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-700">{item.valueProposition}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-700">
                        {item.service.availability.available24x7 ? 'متاح 24/7' : 'حجز مسبق'}
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => onBookService(item.service.name)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    size="sm"
                  >
                    احجز الآن - خصومات خاصة
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-4">
            🔥 خصومات حصرية لفترة محدودة على الخدمات المتخصصة
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>✅ فحص مجاني</span>
            <span>✅ ضمان مميز</span>
            <span>✅ تقنيات متطورة</span>
            <span>✅ فريق محترف</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighValueServicesSection;
