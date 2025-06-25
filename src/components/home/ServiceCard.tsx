
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield } from "lucide-react";
import { Service } from "@/types/services";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service: Service;
  onBookService: (serviceName: string) => void;
}

const ServiceCard = ({ service, onBookService }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <service.icon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-gray-900">{service.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600 mr-1">{service.metadata.rating}</span>
                <span className="text-xs text-gray-500">({service.metadata.reviewCount})</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {service.subServices.length} خدمة
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {service.description}
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">يبدأ من:</span>
            <span className="font-semibold text-blue-600">{service.pricing.priceRange}</span>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{service.availability.available24x7 ? '24/7' : 'حسب المواعيد'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>مضمون</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => onBookService(service.name)}
            >
              احجز الآن
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              asChild
            >
              <Link to={`/services/${service.slug}`}>
                عرض التفاصيل
              </Link>
            </Button>
          </div>
          
          {service.subServices.length > 0 && (
            <div className="text-xs text-gray-500">
              <span>يشمل: </span>
              <span>{service.subServices.slice(0, 2).map(sub => sub.name).join(', ')}</span>
              {service.subServices.length > 2 && (
                <span> و{service.subServices.length - 2} خدمات أخرى</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
