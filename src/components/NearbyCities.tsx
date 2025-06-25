
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft, Users } from "lucide-react";

interface NearbyCity {
  name: string;
  slug: string;
  distance?: string;
  serviceCount?: number;
  areas?: number;
}

interface NearbyCitiesProps {
  title?: string;
  cities: NearbyCity[];
  currentServiceSlug?: string;
}

const NearbyCities = ({ 
  title = "المدن والمحافظات القريبة",
  cities,
  currentServiceSlug
}: NearbyCitiesProps) => {
  const generateLink = (citySlug: string) => {
    if (currentServiceSlug) {
      return `/sa/${citySlug}/${currentServiceSlug}`;
    }
    return `/sa/${citySlug}`;
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <Link 
          to="/sa" 
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg"
        >
          عرض جميع المحافظات
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cities.map((city, index) => (
          <Link key={index} to={generateLink(city.slug)}>
            <Card className="hover:shadow-md transition-all duration-300 group cursor-pointer hover:scale-105 border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                        {city.name}
                      </h4>
                      {city.distance && (
                        <p className="text-xs text-gray-500">{city.distance}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {city.serviceCount && (
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {city.serviceCount} خدمة متوفرة
                    </div>
                  )}
                  {city.areas && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <Users className="h-3 w-3" />
                      {city.areas} منطقة
                    </div>
                  )}
                </div>
                
                <div className="pt-2 border-t border-gray-100 mt-3">
                  <span className="text-xs text-blue-600 group-hover:text-blue-700 font-medium">
                    استكشف الخدمات ←
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NearbyCities;
