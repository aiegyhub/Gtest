import { Button } from "@/components/ui/button";
import { Star, Clock, Shield, Phone, MessageCircle } from "lucide-react";
import { Service } from "@/types/services";

interface ServiceHeroProps {
  service: Service;
  cityName?: string;
  onBookService: () => void; // Corrected: Simplified prop signature
}

const ServiceHero = ({ service, cityName, onBookService }: ServiceHeroProps) => {
  const serviceTitle = cityName ? `${service.name} في ${cityName}` : service.name;
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8 mb-8 mx-4 md:mx-auto max-w-7xl">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {serviceTitle}
          </h1>
          <p className="text-lg text-blue-100 mb-6 leading-relaxed">
            {service.description} - خدمة احترافية وموثوقة على مدار الساعة
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>تقييم {service.metadata.rating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{service.availability.available24x7 ? "خدمة 24/7" : "حسب المواعيد"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>ضمان شامل</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={onBookService}>
              <Phone className="ml-2 h-5 w-5" />
              اتصل الآن - مجاناً
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={onBookService}
            >
              <MessageCircle className="ml-2 h-5 w-5" />
              واتساب
            </Button>
          </div>
        </div>
        
        <div className="hidden md:block">
          {/* This should be a dynamic image in a real application */}
          <img 
            src="/images/services/service-hero-placeholder.jpg" 
            alt={`خدمة ${serviceTitle}`}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            loading="eager" // Hero images should be loaded eagerly
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;