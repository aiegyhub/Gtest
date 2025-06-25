import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle } from "lucide-react";

interface BookingFormProps {
  serviceName?: string;
  cityName?: string;
  // Renamed prop to be more descriptive of its new function.
  onTriggerBooking: () => void; 
}

const BookingForm = ({ 
  serviceName = 'خدماتنا', 
  cityName, 
  onTriggerBooking 
}: BookingFormProps) => {

  const title = `احجز ${serviceName} ${cityName ? `في ${cityName}` : 'الآن'}`;

  return (
    <Card className="max-w-2xl mx-auto border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-lg">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          {title}
        </CardTitle>
        <p className="text-gray-600">
          نحن هنا لخدمتك. املأ النموذج السريع واحصل على خدمتك في الوقت المناسب لك.
        </p>
      </CardHeader>
      <CardContent className="text-center">
        <ul className="space-y-3 text-right mb-6 text-gray-700">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>استجابة سريعة وتأكيد فوري للحجز.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>فريق متخصص ومؤهل لضمان أعلى جودة.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>ضمان شامل على جميع الخدمات المقدمة.</span>
          </li>
        </ul>
        <Button 
          onClick={onTriggerBooking} 
          size="lg" 
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          ابدأ الحجز الآن
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingForm;