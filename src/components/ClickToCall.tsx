
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface ClickToCallProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary";
  className?: string;
  cityName?: string;
  serviceName?: string;
  iconOnly?: boolean;
}

const ClickToCall = ({ 
  size = "default",
  variant = "default",
  className = "",
  cityName,
  serviceName,
  iconOnly = false
}: ClickToCallProps) => {
  const [currentPhoneIndex, setCurrentPhoneIndex] = useState(0);
  
  // Phone numbers for rotation (updated to the new number)
  const phoneNumbers = [
    "+966546331988",
    "+966546331988",
    "+966546331988"
  ];

  useEffect(() => {
    // Rotate phone numbers every 5 minutes
    const interval = setInterval(() => {
      setCurrentPhoneIndex((prev) => (prev + 1) % phoneNumbers.length);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [phoneNumbers.length]);

  const handleCall = () => {
    const phoneNumber = phoneNumbers[currentPhoneIndex];
    
    // Track call attempt
    console.log("Call initiated:", {
      phoneNumber,
      cityName,
      serviceName,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Button
      onClick={handleCall}
      size={size}
      variant={variant}
      className={`font-semibold ${className}`}
    >
      <Phone className={`${iconOnly ? '' : 'ml-2'} ${iconOnly ? 'h-8 w-8' : 'h-4 w-4'}`} />
      {!iconOnly && "اتصل الآن"}
    </Button>
  );
};

export default ClickToCall;
