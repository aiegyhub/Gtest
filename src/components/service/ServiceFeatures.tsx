
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Shield, Award } from "lucide-react";
import { Service } from "@/types/services";

interface ServiceFeaturesProps {
  service: Service;
}

const ServiceFeatures = ({ service }: ServiceFeaturesProps) => {
  const features = [
    {
      icon: CheckCircle,
      title: "خدمة معتمدة",
      description: "جميع مقدمي الخدمة معتمدين ومؤهلين"
    },
    {
      icon: Clock,
      title: service.availability.available24x7 ? "متاح 24/7" : "خدمة سريعة",
      description: service.availability.available24x7 ? "خدمة متاحة على مدار الساعة" : "استجابة سريعة لطلبات الخدمة"
    },
    {
      icon: Shield,
      title: "ضمان شامل",
      description: "ضمان على جودة الخدمة والقطع المستخدمة"
    },
    {
      icon: Award,
      title: `تقييم ${service.metadata.rating}/5`,
      description: `بناءً على ${service.metadata.reviewCount} تقييم من العملاء`
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">مميزات الخدمة</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {service.metadata.tags.map((tag, index) => (
          <Badge key={index} variant="outline">{tag}</Badge>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;
