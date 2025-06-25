
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { City } from "@/types/services";

interface CityNeighborhoodsProps {
  city: City;
}

const CityNeighborhoods = ({ city }: CityNeighborhoodsProps) => {
  const [showAllNeighborhoods, setShowAllNeighborhoods] = useState(false);

  const displayedNeighborhoods = showAllNeighborhoods 
    ? city.neighborhoods 
    : city.neighborhoods.slice(0, 8);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">الأحياء التي نخدمها</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {displayedNeighborhoods.map((neighborhood) => (
          <div key={neighborhood.slug} className="bg-white p-3 rounded-lg border text-center">
            <span className="text-sm font-medium">{neighborhood.name}</span>
          </div>
        ))}
        {city.neighborhoods.length > 8 && (
          <div className="bg-white p-3 rounded-lg border text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllNeighborhoods(!showAllNeighborhoods)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {showAllNeighborhoods ? 'أقل' : 'والمزيد'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityNeighborhoods;
