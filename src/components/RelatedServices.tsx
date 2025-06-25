
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft } from "lucide-react";
import { Service } from "@/types/services";

interface RelatedServicesProps {
  services: Service[];
  onBookService: (serviceName: string) => void;
  cityName?: string;
}

const RelatedServices = ({ services, onBookService, cityName }: RelatedServicesProps) => {
  if (services.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        خدمات ذات صلة{cityName ? ` في ${cityName}` : ''}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => {
          const serviceTitle = cityName ? `${service.name} في ${cityName}` : service.name;
          
          return (
            <Card key={service.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <service.icon className="h-5 w-5 text-blue-600" />
                  <span className="text-lg">{service.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{service.metadata.rating}</span>
                  <span className="text-sm text-gray-500">({service.metadata.reviewCount})</span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    onClick={() => onBookService(serviceTitle)}
                    className="w-full"
                    size="sm"
                  >
                    احجز الآن
                  </Button>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {service.pricing.priceRange}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedServices;
