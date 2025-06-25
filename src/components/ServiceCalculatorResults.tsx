
import { Button } from "@/components/ui/button";
import { Clock, Users, Home } from "lucide-react";

interface ServiceCalculatorResultsProps {
  calculatePrice: () => number;
  estimatedDuration: () => number;
  roomCount: string;
}

const ServiceCalculatorResults = ({
  calculatePrice,
  estimatedDuration,
  roomCount
}: ServiceCalculatorResultsProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {calculatePrice()} ريال
          </div>
          <p className="text-sm text-gray-600">التكلفة الإجمالية</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600">
            <Clock className="h-6 w-6" />
            {estimatedDuration()} ساعات
          </div>
          <p className="text-sm text-gray-600">مدة العمل المتوقعة</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-600">
            <Users className="h-6 w-6" />
            {Math.ceil(parseInt(roomCount) / 2)} فنيين
          </div>
          <p className="text-sm text-gray-600">عدد الفريق المطلوب</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button size="lg" className="w-full md:w-auto">
          <Home className="h-5 w-5 ml-2" />
          احجز الآن بهذا السعر
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          * الأسعار تقديرية وقد تختلف حسب التفاصيل النهائية
        </p>
      </div>
    </div>
  );
};

export default ServiceCalculatorResults;
