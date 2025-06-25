
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Phone, MessageCircle, Tag } from "lucide-react";

interface PricingOption {
  title: string;
  price: string;
  originalPrice?: string;
  features: string[];
  popular?: boolean;
  specialOffer?: string;
}

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  pricingOptions: PricingOption[];
  cityName?: string;
  serviceName?: string;
}

const PricingSection = ({ 
  title = "أسعار الخدمات",
  subtitle = "اختر الباقة المناسبة لك",
  pricingOptions,
  cityName,
  serviceName
}: PricingSectionProps) => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white rounded-lg p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
        {cityName && serviceName && (
          <p className="text-sm text-blue-600 mt-2">
            أسعار خاصة لسكان {cityName} لخدمات {serviceName}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingOptions.map((option, index) => (
          <Card 
            key={index} 
            className={`relative hover:shadow-lg transition-shadow ${
              option.popular ? "border-2 border-blue-500 shadow-lg" : ""
            }`}
          >
            {option.popular && (
              <Badge className="absolute -top-3 right-4 bg-blue-600 text-white">
                الأكثر طلباً
              </Badge>
            )}
            {option.specialOffer && (
              <div className="absolute -top-2 left-4">
                <Badge variant="destructive" className="flex items-center">
                  <Tag className="h-3 w-3 ml-1" />
                  {option.specialOffer}
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg text-gray-900">{option.title}</CardTitle>
              <div className="flex items-center justify-center gap-2 mt-2">
                {option.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {option.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-blue-600">{option.price}</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-right">
                    <CheckCircle className="h-4 w-4 text-green-600 ml-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Phone className="ml-2 h-4 w-4" />
                  احجز الآن
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="ml-2 h-4 w-4" />
                  استفسار واتساب
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-yellow-800 font-medium mb-2">
          💡 نصيحة: احصل على خصم إضافي عند حجز أكثر من خدمة
        </p>
        <p className="text-sm text-yellow-700">
          الأسعار قابلة للتفاوض حسب حجم العمل ونوع الخدمة المطلوبة
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
