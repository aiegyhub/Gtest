import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, MapPin, Settings } from "lucide-react";

interface PhoneNumber {
  id: string;
  number: string;
  city: string;
  service: string;
  isActive: boolean;
  availability: {
    weekdays: string;
    weekends: string;
    is24x7: boolean;
  };
  assignedTo?: string;
  lastUpdated: Date;
}

interface PhoneNumberManagerProps {
  cityName?: string;
  serviceName?: string;
  onCallInitiated?: (phoneData: PhoneNumber) => void;
}

const PhoneNumberManager = ({ cityName, serviceName, onCallInitiated }: PhoneNumberManagerProps) => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);

  useEffect(() => {
    loadPhoneNumbers();
  }, [cityName, serviceName]);

  const loadPhoneNumbers = () => {
    // محاكاة جلب البيانات من قاعدة البيانات
    const mockData: PhoneNumber[] = [
      {
        id: "1",
        number: "+966546331988",
        city: "الرياض",
        service: "رش دفان",
        isActive: true,
        availability: {
          weekdays: "8:00 AM - 10:00 PM",
          weekends: "9:00 AM - 8:00 PM",
          is24x7: false
        },
        assignedTo: "أحمد محمد",
        lastUpdated: new Date()
      },
      {
        id: "2", 
        number: "+966546331988",
        city: "جدة",
        service: "كشف تسريبات",
        isActive: true,
        availability: {
          weekdays: "24/7",
          weekends: "24/7", 
          is24x7: true
        },
        assignedTo: "فهد العلي",
        lastUpdated: new Date()
      },
      {
        id: "3",
        number: "+966546331988",
        city: "الدمام",
        service: "عزل فوم",
        isActive: true,
        availability: {
          weekdays: "7:00 AM - 11:00 PM",
          weekends: "8:00 AM - 10:00 PM",
          is24x7: false
        },
        assignedTo: "خالد السعد",
        lastUpdated: new Date()
      }
    ];

    // فلترة الأرقام حسب المدينة والخدمة
    let filteredNumbers = mockData;
    
    if (cityName) {
      filteredNumbers = filteredNumbers.filter(num => 
        num.city.includes(cityName) || cityName.includes(num.city)
      );
    }
    
    if (serviceName) {
      filteredNumbers = filteredNumbers.filter(num => 
        num.service.includes(serviceName) || serviceName.includes(num.service)
      );
    }

    setPhoneNumbers(filteredNumbers);
    
    // اختيار أفضل رقم متاح
    const bestNumber = filteredNumbers.find(num => num.isActive && num.availability.is24x7) || 
                      filteredNumbers.find(num => num.isActive) ||
                      filteredNumbers[0];
    
    setSelectedNumber(bestNumber);
  };

  const handleCall = (phoneNumber: PhoneNumber) => {
    if (onCallInitiated) {
      onCallInitiated(phoneNumber);
    }
    
    // تسجيل المكالمة
    console.log("مكالمة مبدأة:", {
      phoneNumber: phoneNumber.number,
      city: phoneNumber.city,
      service: phoneNumber.service,
      assignedTo: phoneNumber.assignedTo,
      timestamp: new Date().toISOString()
    });
    
    window.location.href = `tel:${phoneNumber.number}`;
  };

  const isCurrentlyAvailable = (phoneNumber: PhoneNumber) => {
    if (phoneNumber.availability.is24x7) return true;
    
    const now = new Date();
    const currentHour = now.getHours();
    const isWeekend = now.getDay() === 5 || now.getDay() === 6;
    
    // تحديد أوقات العمل (مبسط)
    if (isWeekend) {
      return currentHour >= 9 && currentHour <= 20;
    } else {
      return currentHour >= 8 && currentHour <= 22;
    }
  };

  if (!selectedNumber) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">لا توجد أرقام متاحة حالياً</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* الرقم المختار */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-green-800">
              خط الاتصال المباشر
            </CardTitle>
            <div className="flex items-center gap-2">
              {isCurrentlyAvailable(selectedNumber) ? (
                <Badge className="bg-green-100 text-green-800">متاح الآن</Badge>
              ) : (
                <Badge variant="secondary">خارج أوقات العمل</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-lg">{selectedNumber.number}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{selectedNumber.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-500" />
                <span>{selectedNumber.service}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>
                {selectedNumber.availability.is24x7 
                  ? "متاح 24/7" 
                  : `${selectedNumber.availability.weekdays}`}
              </span>
            </div>
            
            {selectedNumber.assignedTo && (
              <p className="text-sm text-gray-600">
                المسؤول: {selectedNumber.assignedTo}
              </p>
            )}
            
            <Button 
              onClick={() => handleCall(selectedNumber)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              size="lg"
            >
              <Phone className="ml-2 h-5 w-5" />
              اتصل الآن
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* أرقام إضافية إذا توفرت */}
      {phoneNumbers.length > 1 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">أرقام إضافية:</h4>
          {phoneNumbers.filter(num => num.id !== selectedNumber.id).map((phoneNumber) => (
            <Card key={phoneNumber.id} className="border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{phoneNumber.number}</p>
                      <p className="text-sm text-gray-500">
                        {phoneNumber.city} - {phoneNumber.service}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCall(phoneNumber)}
                    variant="outline"
                    size="sm"
                  >
                    اتصل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneNumberManager;
