
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Service } from "@/types/services";

interface ServiceAboutSectionProps {
  service: Service;
  cityName?: string;
}

const ServiceAboutSection = ({ service, cityName }: ServiceAboutSectionProps) => {
  const serviceTitle = cityName ? `${service.name} في ${cityName}` : service.name;
  
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Info className="h-6 w-6" />
        عن خدمة {serviceTitle}
      </h2>
      <Card>
        <CardContent className="p-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              {service.description}
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              نحن نقدم خدمة {serviceTitle} بأعلى معايير الجودة والاحترافية{cityName ? ` في ${cityName}` : ' في جميع أنحاء المملكة العربية السعودية'}. 
              فريقنا مدرب ومؤهل للتعامل مع جميع أنواع التحديات المتعلقة بهذه الخدمة.
            </p>
            <p className="text-gray-600 leading-relaxed">
              نستخدم أحدث الأدوات والتقنيات لضمان تقديم خدمة متميزة تلبي توقعات عملائنا الكرام.
              كما نلتزم بالمواعيد المحددة ونقدم أسعاراً تنافسية مع ضمان شامل على جميع أعمالنا.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ServiceAboutSection;
