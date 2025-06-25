import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Service, City } from "@/types/services";

// Define a strong, explicit type for the search results
type SearchResultItem = (Service & { type: 'service' }) | (City & { type: 'city' });

interface SearchResultsProps {
  results: SearchResultItem[];
  query: string;
  onClose: () => void;
}

const SearchResults = ({ results, query, onClose }: SearchResultsProps) => {
  if (results.length === 0 && query) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-2 shadow-lg border-2 border-blue-200 z-50 bg-white">
        <CardContent className="p-4">
          <p className="text-gray-500 text-center">لم يتم العثور على نتائج لـ "{query}"</p>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) return null;

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 shadow-lg border-2 border-blue-200 z-50 bg-white max-h-96 overflow-y-auto">
      <CardContent className="p-0">
        <div className="p-3 border-b bg-blue-50">
          <p className="text-sm font-medium text-blue-900">
            نتائج البحث ({results.length})
          </p>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {results.map((result) => (
            <Link
              key={`${result.type}-${result.slug}`}
              to={result.type === 'service' ? `/services/${result.slug}` : `/sa/${result.slug}`}
              onClick={onClose}
              className="block hover:bg-blue-50 transition-colors"
            >
              <div className="p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {result.type === 'service' ? (
                      <Wrench className="h-5 w-5 text-blue-600" />
                    ) : (
                      <MapPin className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 truncate">
                        {result.name}
                      </h4>
                      <Badge 
                        variant={result.type === 'service' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {result.type === 'service' ? 'خدمة' : 'مدينة'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {result.description}
                    </p>
                    
                    {/* Type guard to safely access city-specific properties */}
                    {result.type === 'city' && result.neighborhoods && (
                      <p className="text-xs text-gray-500 mt-1">
                        {result.neighborhoods.length} منطقة متاحة
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="p-3 border-t bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            اضغط على النتيجة للانتقال إليها
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResults;