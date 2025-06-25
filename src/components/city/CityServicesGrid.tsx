import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Eye } from "lucide-react";
import { City } from "@/types/services"; // Corrected: Import canonical City type

interface CityServicesGridProps {
  city: City; // Corrected: Use canonical City type
  citySlug: string;
  onBookService: (serviceName: string) => void;
}

const CityServicesGrid = ({ city, citySlug, onBookService }: CityServicesGridProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        الخدمات المتاحة في {city.name} ({city.services.length} خدمة)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Corrected Logic: Iterate over city.services instead of global servicesData */}
        {city.services.map((service) => {
          const ServiceIcon = service.icon;
          return (
            <Card key={service.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ServiceIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        يبدأ من {service.pricing.startingPrice} {service.pricing.currency}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{service.metadata.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => onBookService(service.name)}
                    className="flex-1"
                    size="sm"
                  >
                    احجز الآن
                  </Button>
                  <Link to={`/sa/${citySlug}/${service.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      التفاصيل
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CityServicesGrid;