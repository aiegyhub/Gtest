import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Corrected: Added missing import
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calculator, Info, Star } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { Service } from "@/types/services";

interface ServiceCalculatorProps {
  selectedService?: Service;
  onBookService: (serviceName: string, estimatedPrice: number) => void;
}

const ServiceCalculator = ({ selectedService, onBookService }: ServiceCalculatorProps) => {
  const [service, setService] = React.useState<Service | undefined>(selectedService);
  const [area, setArea] = React.useState<number>(100);
  const [urgency, setUrgency] = React.useState<'normal' | 'urgent' | 'emergency'>('normal');
  const [selectedAdditionalServices, setSelectedAdditionalServices] = React.useState<string[]>([]);
  
  const urgencyOptions = [
    { value: 'normal' as const, label: 'عادي (خلال 24-48 ساعة)' },
    { value: 'urgent' as const, label: 'عاجل (خلال 12 ساعة)' },
    { value: 'emergency' as const, label: 'طوارئ (فوري)' }
  ];

  const calculatedPrice = React.useMemo(() => {
    if (!service?.calculatorConfig) return service?.pricing.startingPrice || 0;

    const config = service.calculatorConfig;
    let basePrice = service.pricing.startingPrice * config.baseMultiplier;
    
    if (config.areaMultiplier > 0 && area > 0) {
      basePrice += (area * config.areaMultiplier);
    }
    
    basePrice *= config.urgencyMultipliers[urgency];
    
    const additionalCost = selectedAdditionalServices.reduce((total, serviceId) => {
      const additionalService = config.additionalServices.find(s => s.id === serviceId);
      return total + (additionalService?.price || 0);
    }, 0);
    
    return Math.round(basePrice + additionalCost);
  }, [service, area, urgency, selectedAdditionalServices]);

  const handleAdditionalServiceChange = (serviceId: string, checked: boolean) => {
    setSelectedAdditionalServices(prev =>
      checked ? [...prev, serviceId] : prev.filter(id => id !== serviceId)
    );
  };

  const handleServiceChange = (slug: string) => {
    const selectedSvc = servicesData.find(s => s.slug === slug);
    setService(selectedSvc);
    setSelectedAdditionalServices([]); 
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          حاسبة الأسعار الذكية
        </CardTitle>
        <p className="text-sm text-gray-600">احصل على تقدير دقيق لتكلفة الخدمة</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>نوع الخدمة</Label>
          <Select value={service?.slug || ''} onValueChange={handleServiceChange}>
            <SelectTrigger><SelectValue placeholder="اختر خدمة للحصول على تقدير" /></SelectTrigger>
            <SelectContent>
              {servicesData.filter(s => s.calculatorConfig).map((svc) => (
                <SelectItem key={svc.slug} value={svc.slug}>
                  {svc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {service && service.calculatorConfig && (
          <>
            {service.calculatorConfig.areaMultiplier > 0 && (
              <div className="space-y-2">
                <Label htmlFor={`area-input-${service.slug}`}>المساحة (متر مربع)</Label>
                <Input id={`area-input-${service.slug}`} type="number" value={area} onChange={(e) => setArea(Number(e.target.value))} min="1"/>
              </div>
            )}

            <div className="space-y-2">
              <Label>مستوى الاستعجال</Label>
              <Select value={urgency} onValueChange={(value: 'normal' | 'urgent' | 'emergency') => setUrgency(value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {urgencyOptions.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {service.calculatorConfig.additionalServices.length > 0 && (
              <div className="space-y-3">
                <Label>خدمات إضافية (اختيارية)</Label>
                {service.calculatorConfig.additionalServices.map((addSvc) => (
                  <div key={addSvc.id} className="flex items-center space-x-2 space-x-reverse p-3 border rounded-md">
                    <Checkbox id={addSvc.id} onCheckedChange={(checked) => handleAdditionalServiceChange(addSvc.id, !!checked)} />
                    <Label htmlFor={addSvc.id} className="flex-1 cursor-pointer flex justify-between items-center">
                      <span>{addSvc.name}</span>
                      <Badge variant="outline">+{addSvc.price} ريال</Badge>
                    </Label>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">التكلفة التقديرية</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{service.metadata.rating}</span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {calculatedPrice.toLocaleString()} ريال
              </div>
              
              <div className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                <Info className="h-3 w-3" />
                <span>السعر تقديري وقد يختلف حسب الحالة الفعلية.</span>
              </div>

              <Button 
                onClick={() => onBookService(service.name, calculatedPrice)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90" size="lg"
              >
                احجز الآن بهذا السعر
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCalculator;