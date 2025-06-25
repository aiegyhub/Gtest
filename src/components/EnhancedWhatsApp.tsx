
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WhatsAppData {
  number: string;
  city: string;
  service: string;
  assignedTo?: string;
  availability: {
    is24x7: boolean;
    status: "available" | "busy" | "offline";
    responseTime: string;
  };
  customMessage?: string;
}

interface EnhancedWhatsAppProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary";
  className?: string;
  cityName?: string;
  serviceName?: string;
  customMessage?: string;
  iconOnly?: boolean;
  showDetails?: boolean;
}

const EnhancedWhatsApp = ({ 
  size = "default",
  variant = "default",
  className = "",
  cityName,
  serviceName,
  customMessage,
  iconOnly = false,
  showDetails = false
}: EnhancedWhatsAppProps) => {
  const [whatsappData, setWhatsappData] = useState<WhatsAppData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWhatsAppData();
  }, [cityName, serviceName]);

  const loadWhatsAppData = async () => {
    setIsLoading(true);
    
    // محاكاة API لجلب بيانات واتساب المناسبة
    const mockWhatsAppData: WhatsAppData[] = [
      {
        number: "966546331988",
        city: "الرياض",
        service: "رش دفان",
        assignedTo: "أحمد محمد",
        availability: { 
          is24x7: true, 
          status: "available", 
          responseTime: "خلال دقائق" 
        },
        customMessage: "مرحباً، أحتاج خدمة رش دفان في الرياض"
      },
      {
        number: "966546331988", 
        city: "جدة",
        service: "كشف تسريبات",
        assignedTo: "فهد العلي",
        availability: { 
          is24x7: false, 
          status: "available", 
          responseTime: "خلال ساعة" 
        },
        customMessage: "مرحباً، أحتاج خدمة كشف تسريبات في جدة"
      },
      {
        number: "966546331988",
        city: "الدمام", 
        service: "عزل فوم",
        assignedTo: "خالد السعد",
        availability: { 
          is24x7: false, 
          status: "busy", 
          responseTime: "خلال ساعتين" 
        },
        customMessage: "مرحباً، أحتاج خدمة عزل فوم في الدمام"
      }
    ];

    // اختيار أفضل رقم واتساب متاح
    let selectedWhatsApp = mockWhatsAppData.find(wa => 
      wa.city === cityName && wa.service === serviceName
    );

    if (!selectedWhatsApp) {
      selectedWhatsApp = mockWhatsAppData.find(wa => 
        wa.city === cityName
      );
    }

    if (!selectedWhatsApp) {
      selectedWhatsApp = mockWhatsAppData.find(wa => 
        wa.availability.status === "available"
      );
    }

    if (!selectedWhatsApp) {
      selectedWhatsApp = mockWhatsAppData[0];
    }

    setWhatsappData(selectedWhatsApp);
    setIsLoading(false);
  };

  const generateMessage = () => {
    if (customMessage) return customMessage;
    if (whatsappData?.customMessage) return whatsappData.customMessage;
    
    let message = "مرحباً، أحتاج إلى مساعدة";
    
    if (serviceName) {
      message += ` في خدمة ${serviceName}`;
    }
    
    if (cityName) {
      message += ` في ${cityName}`;
    }
    
    message += ". يرجى التواصل معي في أقرب وقت ممكن.";
    
    return message;
  };

  const handleWhatsApp = () => {
    if (!whatsappData) return;
    
    const phoneNumber = whatsappData.number;
    const message = generateMessage();
    
    // تسجيل تفاصيل الواتساب
    console.log("Enhanced WhatsApp initiated:", {
      phoneNumber,
      message,
      city: whatsappData.city,
      service: whatsappData.service,
      assignedTo: whatsappData.assignedTo,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      context: { cityName, serviceName }
    });
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-yellow-100 text-yellow-800";
      case "offline": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available": return "متاح";
      case "busy": return "مشغول";
      case "offline": return "غير متاح";
      default: return "غير محدد";
    }
  };

  if (isLoading) {
    return (
      <Button
        size={size}
        variant={variant}
        className={`font-semibold ${className}`}
        disabled
      >
        <MessageCircle className={`${iconOnly ? '' : 'ml-2'} ${iconOnly ? 'h-8 w-8' : 'h-4 w-4'} animate-pulse`} />
        {!iconOnly && "جاري التحميل..."}
      </Button>
    );
  }

  if (!whatsappData) {
    return (
      <Button
        size={size}
        variant="outline"
        className={`font-semibold ${className}`}
        disabled
      >
        <MessageCircle className={`${iconOnly ? '' : 'ml-2'} ${iconOnly ? 'h-8 w-8' : 'h-4 w-4'}`} />
        {!iconOnly && "غير متاح"}
      </Button>
    );
  }

  if (showDetails) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">تواصل عبر واتساب</h4>
              <Badge className={getStatusColor(whatsappData.availability.status)}>
                {getStatusText(whatsappData.availability.status)}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">+{whatsappData.number}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{whatsappData.city}</span>
              </div>
              
              {whatsappData.assignedTo && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{whatsappData.assignedTo}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>
                  {whatsappData.availability.is24x7 ? "متاح 24/7" : "أوقات العمل"} 
                  - رد {whatsappData.availability.responseTime}
                </span>
              </div>
            </div>
            
            <Button 
              onClick={handleWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={whatsappData.availability.status === "offline"}
            >
              <MessageCircle className="ml-2 h-4 w-4" />
              تواصل عبر واتساب
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button
      onClick={handleWhatsApp}
      size={size}
      variant={variant}
      className={`font-semibold ${className} ${
        whatsappData.availability.status === "available" 
          ? "bg-green-600 hover:bg-green-700" 
          : "bg-yellow-600 hover:bg-yellow-700"
      }`}
      disabled={whatsappData.availability.status === "offline"}
    >
      <MessageCircle className={`${iconOnly ? '' : 'ml-2'} ${iconOnly ? 'h-8 w-8' : 'h-4 w-4'}`} />
      {!iconOnly && (
        <span className="flex items-center gap-2">
          واتساب
          {whatsappData.availability.status === "busy" && (
            <Badge variant="secondary" className="text-xs">
              رد {whatsappData.availability.responseTime}
            </Badge>
          )}
        </span>
      )}
    </Button>
  );
};

export default EnhancedWhatsApp;
