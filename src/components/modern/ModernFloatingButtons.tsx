import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Phone, 
  MessageCircle, 
  Percent, 
  Bot,
  Star,
  Clock
} from "lucide-react";
import SpecialOffersModal from "../SpecialOffersModal";
import DynamicOffersModal from "../DynamicOffersModal";
import EnhancedClickToCall from "../EnhancedClickToCall";
import EnhancedWhatsApp from "../EnhancedWhatsApp";

interface ModernFloatingButtonsProps {
  cityName?: string;
  serviceName?: string;
  onShowAI?: () => void;
}

const ModernFloatingButtons = ({ cityName, serviceName, onShowAI }: ModernFloatingButtonsProps) => {
  const [showOffers, setShowOffers] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasNewOffers, setHasNewOffers] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSupport = () => {
    if (onShowAI) {
      onShowAI();
    } else {
      console.log("فتح المحادثة المباشرة المطورة");
    }
  };

  const quickActions = [
    {
      icon: Phone,
      label: "اتصال مباشر",
      color: "bg-green-600 hover:bg-green-700",
      action: "call"
    },
    {
      icon: MessageCircle,
      label: "واتساب",
      color: "bg-green-500 hover:bg-green-600", 
      action: "whatsapp"
    },
    {
      icon: Bot,
      label: "توب كلينرز",
      color: "bg-blue-600 hover:bg-blue-700",
      action: "support"
    },
    {
      icon: Percent,
      label: "عروض خاصة",
      color: "bg-orange-600 hover:bg-orange-700",
      action: "offers",
      badge: hasNewOffers
    }
  ];

  const handleActionClick = (action: string) => {
    switch (action) {
      case "call":
        break;
      case "whatsapp":
        break;
      case "support":
        handleSupport();
        break;
      case "offers":
        setShowOffers(true);
        setHasNewOffers(false);
        break;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 left-4 z-50 flex flex-col items-start gap-3">
        {/* الأزرار الرئيسية في عمود رأسي */}
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-300">
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon;
            
            if (action.action === "call") {
              return (
                <div key={index} className="relative group">
                  <EnhancedClickToCall
                    size="sm"
                    className={`${action.color} text-white shadow-lg w-12 h-12 rounded-md p-0`}
                    cityName={cityName}
                    serviceName={serviceName}
                    iconOnly={true}
                  />
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {action.label}
                  </div>
                </div>
              );
            }
            
            if (action.action === "whatsapp") {
              return (
                <div key={index} className="relative group">
                  <EnhancedWhatsApp
                    size="sm"
                    className={`${action.color} text-white shadow-lg w-12 h-12 rounded-md p-0`}
                    cityName={cityName}
                    serviceName={serviceName}
                    iconOnly={true}
                  />
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {action.label}
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="relative group flex items-center gap-2">
                <Button
                  onClick={() => handleActionClick(action.action)}
                  size="sm"
                  className={`${action.color} text-white shadow-lg w-12 h-12 rounded-md p-0 relative`}
                >
                  <ActionIcon className="h-5 w-5" />
                  {action.badge && (
                    <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900 text-xs min-w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                      !
                    </Badge>
                  )}
                </Button>
                
                {/* رسالة "عروض خاصة!" على يمين زر العروض الخاصة */}
                {action.action === "offers" && hasNewOffers && (
                  <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg animate-pulse absolute left-full ml-2 top-1/2 -translate-y-1/2">
                    <CardContent className="p-2 text-center">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3" />
                        <span>عروض خاصة!</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {action.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* كارت "متاح 24/7" على الجانب الأيمن */}
      <div className="fixed bottom-6 right-4 z-50">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm">
          <CardContent className="p-2 text-center">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Clock className="h-3 w-3" />
              <span>متاح 24/7</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {showOffers && (
        <DynamicOffersModal
          isOpen={showOffers}
          onClose={() => setShowOffers(false)}
        />
      )}
    </>
  );
};

export default ModernFloatingButtons;