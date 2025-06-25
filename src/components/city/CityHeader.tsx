
import { MapPin, Star, Users } from "lucide-react";
import { City } from "@/types/services";

interface CityHeaderProps {
  city: City;
}

const CityHeader = ({ city }: CityHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 right-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{city.name}</h1>
          <div className="flex items-center gap-4 text-lg">
            <div className="flex items-center gap-1">
              <MapPin className="h-5 w-5" />
              <span>المملكة العربية السعودية</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-5 w-5" />
              <span>{city.population}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{city.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityHeader;
