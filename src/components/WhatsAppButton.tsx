
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary";
  className?: string;
  cityName?: string;
  serviceName?: string;
  customMessage?: string;
  iconOnly?: boolean;
}

const WhatsAppButton = ({ 
  size = "default",
  variant = "default",
  className = "",
  cityName,
  serviceName,
  customMessage,
  iconOnly = false
}: WhatsAppButtonProps) => {
  
  const generateMessage = () => {
    if (customMessage) return customMessage;
    
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
    const phoneNumber = "966546331988"; // Updated phone number
    const message = generateMessage();
    
    // Track WhatsApp click
    console.log("WhatsApp initiated:", {
      phoneNumber,
      message,
      cityName,
      serviceName,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsApp}
      size={size}
      variant={variant}
      className={`font-semibold ${className}`}
    >
      <MessageCircle className={`${iconOnly ? '' : 'ml-2'} ${iconOnly ? 'h-8 w-8' : 'h-4 w-4'}`} />
      {!iconOnly && "واتساب"}
    </Button>
  );
};

export default WhatsAppButton;
