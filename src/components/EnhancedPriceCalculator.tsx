
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calculator, Info, Star } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { Service } from "@/types/services";

interface EnhancedPriceCalculatorProps {
  selectedService?: Service;
  onBookService: (serviceName: string, estimatedPrice: number) => void;
}

const EnhancedPriceCalculator = ({ selectedService, onBookService }: EnhancedPriceCalculatorProps) => {
  const [service, setService] = useState<Service | null>(selectedService || null);
  const [area, setArea] = useState<number>(100);
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'emergency'>('normal');
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<string[]>([]);
  const [city, setCity] = useState<string>('riyadh');

  const cities = [
    { value: 'riyadh', label: 'الرياض', multiplier: 1 },
    { value: 'jeddah', label: 'جدة', multiplier: 1.1 },
    { value: 'dammam', label: 'الدمام', multiplier: 0.9 },
    { value: 'medina', label: 'المدينة المنورة', multiplier: 1.05 },
    { value: 'makkah', label: 'مكة المكرمة', multiplier: 1.1 }
  ];

  const urgencyOptions = [
    { value: 'normal', label: 'عادي (خلال 24-48 ساعة)', multiplier: 1, color: 'bg-green-100 text-green-800' },
    { value: 'urgent', label: 'عاجل (خلال 12 ساعة)', multiplier: 1.3, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'emergency', label: 'طوارئ (فوري)', multiplier: 1.6, color: 'bg-red-100 text-red-800' }
  ];

  const calculatedPrice = useMemo(() => {
    if (!service?.calculatorConfig) return 0;

    const config = service.calculatorConfig;
    const cityMultiplier = cities.find(c => c.value === city)?.multiplier || 1;
    
    // السعر الأساسي
    let basePrice = service.pricing.startingPrice * config.baseMultiplier;
    
    // سعر المساحة (للخدمات التي تعتمد على المساحة)
    if (config.areaMultiplier > 0 && area > 0) {
      basePrice += (area * config.areaMultiplier);
    }
    
    // مضاعف الاستعجال
    basePrice *= config.urgencyMultipliers[urgency];
    
    // مضاعف المدينة
    basePrice *= cityMultiplier;
    
    // الخدمات الإضافية
    const additionalCost = selectedAdditionalServices.reduce((total, serviceId) => {
      const additionalService = config.additionalServices.find(s => s.id === serviceId);
      return total + (additionalService?.price || 0);
    }, 0);
    
    return Math.round(basePrice + additionalCost);
  }, [service, area, urgency, selectedAdditionalServices, city]);

  const handleAdditionalServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedAdditionalServices(prev => [...prev, serviceId]);
    } else {
      setSelectedAdditionalServices(prev => prev.filter(id => id !== serviceId));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          حاسبة الأسعار المتطورة
        </CardTitle>
        <p className="text-sm text-gray-600">احصل على تقدير دقيق لتكلفة الخدمة</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* اختيار الخدمة */}
        <div className="space-y-2">
          <Label>نوع الخدمة</Label>
          <Select value={service?.slug || ''} onValueChange={(value) => {
            const selectedSvc = servicesData.find(s => s.slug === value);
            setService(selectedSvc || null);
            setSelectedAdditionalServices([]);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الخدمة" />
            </SelectTrigger>
            <SelectContent>
              {servicesData.map((svc) => (
                <SelectItem key={svc.slug} value={svc.slug}>
                  <div className="flex items-center gap-2">
                    <svc.icon className="h-4 w-4" />
                    <span>{svc.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {svc.pricing.priceRange}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {service && (
          <>
            {/* المدينة */}
            <div className="space-y-2">
              <Label>المدينة</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* المساحة (إذا كانت مطلوبة) */}
            {service.calculatorConfig?.areaMultiplier > 0 && (
              <div className="space-y-2">
                <Label>المساحة (متر مربع)</Label>
                <Input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  placeholder="أدخل المساحة"
                  min="1"
                />
              </div>
            )}

            {/* مستوى الاستعجال */}
            <div className="space-y-2">
              <Label>مستوى الاستعجال</Label>
              <Select value={urgency} onValueChange={(value: 'normal' | 'urgent' | 'emergency') => setUrgency(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {urgencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={option.color}>
                          {option.label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* الخدمات الإضافية */}
            {service.calculatorConfig?.additionalServices && service.calculatorConfig.additionalServices.length > 0 && (
              <div className="space-y-3">
                <Label>خدمات إضافية (اختيارية)</Label>
                <div className="grid grid-cols-1 gap-3">
                  {service.calculatorConfig.additionalServices.map((additionalService) => (
                    <div key={additionalService.id} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={additionalService.id}
                        checked={selectedAdditionalServices.includes(additionalService.id)}
                        onCheckedChange={(checked) => handleAdditionalServiceChange(additionalService.id, !!checked)}
                      />
                      <Label htmlFor={additionalService.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>{additionalService.name}</span>
                          <Badge variant="outline">+{additionalService.price} ريال</Badge>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* نتيجة الحساب */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">التكلفة المقدرة</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{service.metadata.rating}</span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {calculatedPrice.toLocaleString()} ريال
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1 mb-1">
                  <Info className="h-3 w-3" />
                  <span>يشمل جميع المواد والعمالة</span>
                </div>
                <div>السعر تقديري ويمكن أن يختلف حسب الحالة الفعلية</div>
              </div>

              <Button 
                onClick={() => onBookService(service.name, calculatedPrice)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
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

export default EnhancedPriceCalculator;
