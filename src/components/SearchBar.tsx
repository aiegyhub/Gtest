import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { citiesData } from "@/data/citiesData";
import { Service, City } from "@/types/services";
import SearchResults from "./SearchResults";

// Define a strong type for the search results, eliminating `any[]`
export type SearchResultItem = (Service & { type: 'service' }) | (City & { type: 'city' });

interface SearchBarProps {
  onSearchResults?: (results: SearchResultItem[]) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ 
  onSearchResults, 
  placeholder = "ابحث عن الخدمة أو المدينة...", 
  className = "" 
}: SearchBarProps) => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResultItem[]>([]);
  const [showResults, setShowResults] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();

      const serviceResults = servicesData
        .filter(service =>
          service.name.toLowerCase().includes(lowerCaseQuery) ||
          service.description.toLowerCase().includes(lowerCaseQuery) ||
          service.subServices.some(sub => sub.name.toLowerCase().includes(lowerCaseQuery))
        )
        .map(s => ({ ...s, type: 'service' as const }));
      
      const cityResults = citiesData
        .filter((city: City) =>
          city.name.toLowerCase().includes(lowerCaseQuery) ||
          (city.areas && city.areas.some(area => area.toLowerCase().includes(lowerCaseQuery)))
        )
        .map(c => ({ ...c, type: 'city' as const }));
      
      const searchResults: SearchResultItem[] = [...serviceResults, ...cityResults];
      
      setResults(searchResults);
      setShowResults(true);
      onSearchResults?.(searchResults);
    } else {
      setResults([]);
      setShowResults(false);
      onSearchResults?.([]);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    onSearchResults?.([]);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={searchRef} role="search">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          className="pl-4 pr-12 py-3 text-base rounded-full border-2 border-blue-200 focus:border-blue-500 transition-all duration-200"
          icon={<Search />}
          iconPosition="right"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {showResults && (
        <SearchResults 
          results={results} 
          query={query}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;