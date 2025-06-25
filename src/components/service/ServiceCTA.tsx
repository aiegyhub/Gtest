
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { Service } from "@/types/services";

interface ServiceCTAProps {
  service: Service;
  cityName?: string;
  onBookService: (serviceName: string) => void;
}

const ServiceCTA = ({ service, cityName, onBookService }: ServiceCTAProps) => {
  const serviceTitle = cityName ? `${service.name} في ${cityName}` : service.name;
  
  return (
    <section className="bg-gray-50 rounded-lg p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        احصل على خدمة {serviceTitle} الآن
      </h3>
      <p className="text-gray-600 mb-6">
        فريقنا جاهز لخدمتك على مدار الساعة بأفضل الأسعار والجودة
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => onBookService(serviceTitle)}>
          <Phone className="ml-2 h-5 w-5" />
          اتصل الآن
        </Button>
        <Button size="lg" variant="outline" onClick={() => onBookService(serviceTitle)}>
          <MessageCircle className="ml-2 h-5 w-5" />
          تواصل عبر واتساب
        </Button>
      </div>
    </section>
  );
};

export default ServiceCTA;
