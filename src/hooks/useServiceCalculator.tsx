
import { useState, useMemo } from "react";
import { servicesData } from "@/data/servicesData";

interface UseServiceCalculatorProps {
  serviceName: string;
  basePrice?: number;
}

export const useServiceCalculator = ({ serviceName, basePrice = 150 }: UseServiceCalculatorProps) => {
  const [roomCount, setRoomCount] = useState("2");
  const [serviceType, setServiceType] = useState("basic");
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [area, setArea] = useState("");
  const [urgency, setUrgency] = useState("normal");

  const currentService = useMemo(() => {
    return servicesData.find(service => 
      service.name === serviceName || 
      service.name.includes(serviceName) ||
      serviceName.includes(service.name)
    );
  }, [serviceName]);

  const serviceTypes = {
    basic: { name: "أساسي", multiplier: 1, description: "خدمة عادية" },
    premium: { name: "مميز", multiplier: 1.5, description: "خدمة شاملة" },
    deluxe: { name: "فاخر", multiplier: 2, description: "خدمة شاملة + ضمانات" }
  };

  const urgencyOptions = {
    normal: { name: "عادي", multiplier: 1, description: "خلال 24-48 ساعة" },
    urgent: { name: "عاجل", multiplier: 1.3, description: "خلال 12 ساعة" },
    emergency: { name: "طارئ", multiplier: 1.6, description: "خلال 3 ساعات" }
  };

  const actualBasePrice = currentService?.pricing.startingPrice || basePrice;
  const calculatorConfig = currentService?.calculatorConfig;
  const additionalOptions = calculatorConfig?.additionalServices || [
    { id: "deep_clean", name: "خدمة إضافية 1", price: 100 },
    { id: "sanitize", name: "خدمة إضافية 2", price: 50 },
    { id: "warranty", name: "ضمان إضافي", price: 80 }
  ];

  if (calculatorConfig?.urgencyMultipliers) {
    urgencyOptions.normal.multiplier = calculatorConfig.urgencyMultipliers.normal;
    urgencyOptions.urgent.multiplier = calculatorConfig.urgencyMultipliers.urgent;
    urgencyOptions.emergency.multiplier = calculatorConfig.urgencyMultipliers.emergency;
  }

  const calculatePrice = () => {
    let totalPrice = actualBasePrice;
    
    if (calculatorConfig?.baseMultiplier) {
      totalPrice *= calculatorConfig.baseMultiplier;
    }
    
    if (currentService?.category === "cleaning" || currentService?.category === "insulation") {
      const roomMultiplier = parseInt(roomCount) * 0.5;
      totalPrice += (actualBasePrice * roomMultiplier);
    }
    
    totalPrice *= serviceTypes[serviceType as keyof typeof serviceTypes].multiplier;
    
    const additionalPrice = additionalServices.reduce((sum, serviceId) => {
      const service = additionalOptions.find(opt => opt.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);
    totalPrice += additionalPrice;
    
    totalPrice *= urgencyOptions[urgency as keyof typeof urgencyOptions].multiplier;
    
    if (area && parseInt(area) > 100) {
      const extraArea = parseInt(area) - 100;
      const areaMultiplier = calculatorConfig?.areaMultiplier || 0.5;
      totalPrice += (extraArea * areaMultiplier);
    }
    
    return Math.round(totalPrice);
  };

  const estimatedDuration = () => {
    let baseHours = 2;
    
    if (currentService?.category === "pest-control") baseHours = 1.5;
    if (currentService?.category === "appliance-repair") baseHours = 1;
    if (currentService?.category === "moving") baseHours = 4;
    if (currentService?.category === "insulation") baseHours = 6;
    
    const roomHours = parseInt(roomCount) * 0.5;
    const additionalHours = additionalServices.length * 0.5;
    return Math.ceil(baseHours + roomHours + additionalHours);
  };

  const toggleAdditionalService = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return {
    roomCount,
    setRoomCount,
    serviceType,
    setServiceType,
    additionalServices,
    setAdditionalServices,
    area,
    setArea,
    urgency,
    setUrgency,
    currentService,
    serviceTypes,
    urgencyOptions,
    additionalOptions,
    calculatePrice,
    estimatedDuration,
    toggleAdditionalService
  };
};
