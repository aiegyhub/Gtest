import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PhoneData {
  number: string;
  city: string;
  service: string;
  assignedTo?: string;
  availability: {
    is24x7: boolean;
    status: "available" | "busy" | "offline";
  };
}

interface EnhancedClickToCallProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary";
  className?: string;
  cityName?: string;
  serviceName?: string;
  iconOnly?: boolean;
  showDetails?: boolean;
}

const EnhancedClickToCall = ({ 
  size = "default",
  variant = "default",
  className = "",
  cityName,
  serviceName,
  iconOnly = false,
  showDetails = false
}: EnhancedClickToCallProps) => {
  const [phoneData, setPhoneData] = useState<PhoneData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPhoneData();
  }, [cityName, serviceName]);

  const loadPhoneData = async () => {
    setIsLoading(true);
    
    // محاكاة API لجلب رقم الهاتف المناسب
    // **Corrected Mock Data to reflect site's actual service areas**
    const mockPhoneData: PhoneData[] = [
      {
        number: "+966546331988",
        city: "خميس مشيط",
        service: "رش دفان",
        assignedTo: "فريق عسير",
        availability: { is24x7: true, status: "available" }
      },
      {
        number: "+966546331988", 
        city: "أبها",
        service: "كشف تسريبات",
        assignedTo: "فهد العسيري",
        availability: { is24x7: false, status: "available" }
      },
      {
        number: "+966546331988",
        city: "حفر الباطن", 
        service: "عزل فوم",
        assignedTo: "فريق الشرقية",
        availability: { is24x7: false, status: "busy" }
      }
    ];

    // اختيار أفضل رقم متاح
    let selectedPhone = mockPhoneData.find(phone => 
      phone.city === cityName && phone.service === serviceName
    );

    if (!selectedPhone) {
      selectedPhone = mockPhoneData.find(phone => 
        phone.city === cityName
      );
    }

    if (!selectedPhone) {
      selectedPhone = mockPhoneData.find(phone => 
        phone.availability.status === "available"
      );
    }

    if (!selectedPhone) {
      selectedPhone = mockPhoneData[0];
    }

    setPhoneData(selectedPhone);
    setIsLoading(false);
  };

  const handleCall = () => {
    if (!phoneData) return;
    
    console.log("Enhanced call initiated:", {
      phoneNumber: phoneData.number,
      city: phoneData.city,
      service: phoneData.service,
      assignedTo: phoneData.assignedTo,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      context: { cityName, serviceName }
    });
    
    window.location.href = `tel:${phoneData.number}`;
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
        <Phone className={`${iconOnly ? '' : 'ml-2'} ${iconOnly ? 'h-8 w-8' : 'h-4 w-4'} animate-pulse`} />
        {!iconOnly && "جاري التحميل..."}
      </Button>
    );
  }

  if (!phoneData) {
    return (
      <Button
        size={size}
        variant="outline"
        className={`font-semibold ${className}`}
        disabled
      >
        <Phone className={`${iconOnly ? '' : 'ml-2'} ${iconOnly ? 'h-8 w-8' : 'h-4 w-4'}`} />
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
              <h4 className="font-semibold">تواصل مباشر</h4>
              <Badge className={getStatusColor(phoneData.availability.status)}>
                {getStatusText(phoneData.availability.status)}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{phoneData.number}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{phoneData.city}</span>
              </div>
              
              {phoneData.assignedTo && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{phoneData.assignedTo}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{phoneData.availability.is24x7 ? "متاح 24/7" : "أوقات العمل"}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCall}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={phoneData.availability.status === "offline"}
            >
              <Phone className="ml-2 h-4 w-4" />
              اتصل الآن
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button
      onClick={handleCall}
      size={size}
      variant={variant}
      className={`font-semibold ${className} ${
        phoneData.availability.status === "available" 
          ? "bg-green-600 hover:bg-green-700" 
          : "bg-yellow-600 hover:bg-yellow-700"
      }`}
      disabled={phoneData.availability.status === "offline"}
    >
      <Phone className={`${iconOnly ? '' : 'ml-2'} ${iconOnly ? 'h-8 w-8' : 'h-4 w-4'}`} />
      {!iconOnly && (
        <span className="flex items-center gap-2">
          اتصل الآن
          {phoneData.availability.status === "busy" && (
            <Badge variant="secondary" className="text-xs">مشغول</Badge>
          )}
        </span>
      )}
    </Button>
  );
};

export default EnhancedClickToCall;