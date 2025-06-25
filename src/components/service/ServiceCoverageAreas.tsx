import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { City, Neighborhood } from "@/types/services";

// Define a more explicit props interface using a union type
interface ServiceCoverageAreasProps {
  data: City | City[]; // The component accepts either a single city or an array of cities
  serviceSlug?: string;
}

const ServiceCoverageAreas = ({ data, serviceSlug }: ServiceCoverageAreasProps) => {
  // Renders the list of neighborhoods for a single city
  const renderNeighborhoods = (city: City) => (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MapPin className="h-5 w-5 text-blue-600" />
          المناطق التي نخدمها في {city.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {city.neighborhoods.length > 0 ? (
            city.neighborhoods.map((neighborhood: Neighborhood) => (
              <div key={neighborhood.slug} className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900">{neighborhood.name}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-full">لا توجد أحياء محددة لهذه المدينة حالياً.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Renders the list of all service cities
  const renderAllCities = (cities: City[]) => (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MapPin className="h-5 w-5 text-blue-600" />
          المدن التي نخدمها
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cities.map((cityItem) => (
            <Link 
              key={cityItem.slug} 
              to={serviceSlug ? `/sa/${cityItem.slug}/${serviceSlug}` : `/sa/${cityItem.slug}`}
              className="block"
            >
              <div className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900">{cityItem.name}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 mr-6">
                  {cityItem.neighborhoods?.length || 0} منطقة
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Type guard to determine which component to render
  if (Array.isArray(data)) {
    return renderAllCities(data);
  } else {
    return renderNeighborhoods(data);
  }
};

export default ServiceCoverageAreas;