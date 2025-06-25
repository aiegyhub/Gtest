
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { Neighborhood } from "@/data/neighborhoodsData";

interface NeighborhoodsListProps {
  title?: string;
  neighborhoods: Neighborhood[];
  citySlug: string;
  serviceSlug?: string;
}

const NeighborhoodsList = ({ 
  title = "مناطق التغطية",
  neighborhoods,
  citySlug,
  serviceSlug
}: NeighborhoodsListProps) => {
  const generateLink = (neighborhoodSlug: string) => {
    if (serviceSlug) {
      return `/sa/${citySlug}/${serviceSlug}/${neighborhoodSlug}`;
    }
    return `/sa/${citySlug}/${neighborhoodSlug}`;
  };

  return (
    <section className="bg-white rounded-lg shadow p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link 
          to={`/sa/${citySlug}`} 
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center transition-colors"
        >
          عرض جميع الخدمات
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {neighborhoods.map((neighborhood, index) => (
          <Link key={index} to={generateLink(neighborhood.slug)}>
            <Card className="hover:shadow-md transition-shadow group cursor-pointer h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {neighborhood.name}
                  </CardTitle>
                  <MapPin className="h-5 w-5 text-blue-600 group-hover:text-blue-800 transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {neighborhood.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    {neighborhood.serviceCount} خدمة متاحة
                  </Badge>
                  <span className="text-xs text-gray-500">متوفر 24/7</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NeighborhoodsList;
