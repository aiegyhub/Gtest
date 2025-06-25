import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench } from "lucide-react";
import { Service } from "@/types/services";

interface ServiceSubServicesProps {
  service: Service;
  title?: string; // New optional title prop
  onBookService: (serviceName: string) => void;
}

const ServiceSubServices = ({ 
  service, 
  title = "خدماتنا التفصيلية", // Default title for backward compatibility
  onBookService 
}: ServiceSubServicesProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {service.subServices.map((subService) => (
          <Card key={subService.slug} className="hover:shadow-lg transition-shadow bg-white border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Wrench className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-base font-semibold">{subService.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 h-16">
                {subService.description}
              </p>
              <div className="flex justify-between items-center">
                {subService.estimatedDuration && (
                  <Badge variant="outline" className="text-xs">
                    ~ {subService.estimatedDuration}
                  </Badge>
                )}
                <Button 
                  size="sm" 
                  onClick={() => onBookService(subService.name)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  طلب الخدمة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServiceSubServices;