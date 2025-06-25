
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { City } from "@/types/services";

interface CityCallToActionProps {
  city: City;
}

const CityCallToAction = ({ city }: CityCallToActionProps) => {
  const handleBookService = () => {
    // Handle booking logic
    console.log("Book service clicked");
  };

  const handleCallRequest = () => {
    // Handle call request logic  
    console.log("Call request clicked");
  };

  return (
    <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
      <h3 className="text-xl font-bold mb-2">تحتاج خدمة فورية في {city.name}؟</h3>
      <p className="mb-4">اتصل بنا الآن أو احجز عبر الموقع</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          onClick={handleBookService}
          variant="secondary"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          احجز خدمة
        </Button>
        <Button 
          onClick={handleCallRequest}
          variant="outline" 
          className="border-white text-white hover:bg-white hover:text-blue-600"
        >
          <Phone className="h-4 w-4 ml-2" />
          اتصل الآن
        </Button>
      </div>
    </div>
  );
};

export default CityCallToAction;
