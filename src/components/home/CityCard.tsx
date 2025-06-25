import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Star, Building2 } from "lucide-react";
import { City } from "@/types/services";

interface CityCardProps {
  city: City;
}

const CityCard = ({ city }: CityCardProps) => {
  // Use the image path from the data. A fallback is good practice for robustness.
  const cityImage = city.image || "/images/cities/default.jpg";
  
  return (
    <Link to={`/sa/${city.slug}`} className="block group h-full">
      <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden border-0 shadow-lg flex flex-col">
        <div className="relative overflow-hidden">
          {/* SEO Best Practice: Images should be self-hosted, optimized (WebP), and have descriptive filenames. */}
          <img
            src={cityImage}
            alt={`خدمات منزلية احترافية في ${city.name}`}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {city.areas && city.areas.length > 0 && (
            <Badge className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white border-0">
              <Building2 className="h-3 w-3 ml-1" />
              {city.areas.length} منطقة
            </Badge>
          )}
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
              {city.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-white/90">
              <MapPin className="h-4 w-4" />
              <span>المملكة العربية السعودية</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-4 flex-grow flex flex-col">
          <p className="text-gray-600 text-sm leading-relaxed flex-grow">
            {city.description}
          </p>
          
          {city.areas && city.areas.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                المناطق التابعة
              </h4>
              <div className="flex flex-wrap gap-1">
                {city.areas.slice(0, 3).map((area, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                    {area}
                  </Badge>
                ))}
                {city.areas.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    +{city.areas.length - 3} أخرى
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{city.services.length} خدمة</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{city.rating}</span>
              </div>
            </div>
            
            <span className="text-blue-600 font-semibold group-hover:text-blue-700 text-sm flex items-center gap-1">
              استكشف الخدمات
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CityCard;