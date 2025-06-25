
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Clock, Phone, MessageCircle } from "lucide-react";
import ClickToCall from "./ClickToCall";
import WhatsAppButton from "./WhatsAppButton";

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  originalPrice: string;
  salePrice: string;
  validUntil: string;
  terms: string[];
  applicable: {
    services?: string[];
    cities?: string[];
  };
}

interface SpecialOffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityName?: string;
  serviceName?: string;
}

const SpecialOffersModal = ({ isOpen, onClose, cityName, serviceName }: SpecialOffersModalProps) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  // Sample offers data
  const offers: SpecialOffer[] = [
    {
      id: "1",
      title: "عرض الجمعة الذهبي",
      description: "خصم حصري لفترة محدودة على جميع الخدمات",
      discount: "30%",
      originalPrice: "300 ريال",
      salePrice: "210 ريال",
      validUntil: "نهاية اليوم",
      terms: ["العرض ساري لمدة 24 ساعة فقط", "يطبق على الحجز الأول", "غير قابل للجمع مع عروض أخرى"],
      applicable: {
        services: [serviceName].filter(Boolean),
        cities: [cityName].filter(Boolean)
      }
    },
    {
      id: "2",
      title: "باقة العميل الجديد",
      description: "ترحيب خاص بالعملاء الجدد مع خدمات إضافية مجانية",
      discount: "25%",
      originalPrice: "250 ريال",
      salePrice: "188 ريال",
      validUntil: "خلال الساعة القادمة",
      terms: ["للعملاء الجدد فقط", "يشمل معاينة مجانية", "ضمان 6 أشهر"],
      applicable: {}
    }
  ];

  useEffect(() => {
    if (!isOpen) return;

    // Countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleClaim = (offerId: string) => {
    console.log("Offer claimed:", {
      offerId,
      cityName,
      serviceName,
      timestamp: new Date().toISOString()
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-red-600">
              🔥 عروض حصرية لفترة محدودة
            </DialogTitle>
            <div className="flex items-center bg-red-100 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-red-600 ml-1" />
              <span className="text-red-600 font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="p-4 border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{offer.title}</h3>
                  <Badge className="bg-red-600 text-white">{offer.discount} خصم</Badge>
                </div>
                
                <p className="text-gray-600 text-sm">{offer.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 line-through text-sm">{offer.originalPrice}</span>
                    <span className="text-red-600 font-bold text-lg mr-2">{offer.salePrice}</span>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    ينتهي {offer.validUntil}
                  </Badge>
                </div>

                <ul className="text-xs text-gray-500 space-y-1">
                  {offer.terms.map((term, index) => (
                    <li key={index}>• {term}</li>
                  ))}
                </ul>

                <div className="flex gap-2 pt-2">
                  <ClickToCall 
                    size="sm" 
                    className="flex-1 bg-red-600 hover:bg-red-700" 
                    cityName={cityName}
                    serviceName={serviceName}
                  />
                  <WhatsAppButton 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                    cityName={cityName}
                    serviceName={serviceName}
                    customMessage={`مرحباً، أريد الاستفادة من ${offer.title} بخصم ${offer.discount}`}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center pt-4 border-t">
          <p className="text-xs text-gray-500 mb-3">
            العروض محدودة الكمية • اتصل الآن قبل انتهاء الوقت
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500"
          >
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialOffersModal;
