
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/types/services";

interface ServiceCalculatorFormProps {
  currentService: Service | undefined;
  roomCount: string;
  setRoomCount: (value: string) => void;
  area: string;
  setArea: (value: string) => void;
  serviceType: string;
  setServiceType: (value: string) => void;
  urgency: string;
  setUrgency: (value: string) => void;
  additionalServices: string[];
  serviceTypes: Record<string, { name: string; multiplier: number; description: string }>;
  urgencyOptions: Record<string, { name: string; multiplier: number; description: string }>;
  additionalOptions: Array<{ id: string; name: string; price: number }>;
  toggleAdditionalService: (serviceId: string) => void;
}

const ServiceCalculatorForm = ({
  currentService,
  roomCount,
  setRoomCount,
  area,
  setArea,
  serviceType,
  setServiceType,
  urgency,
  setUrgency,
  additionalServices,
  serviceTypes,
  urgencyOptions,
  additionalOptions,
  toggleAdditionalService
}: ServiceCalculatorFormProps) => {
  const getServiceSpecificFields = () => {
    if (!currentService) return null;
    
    if (currentService.category === "appliance-repair") {
      return (
        <div>
          <label className="block text-sm font-medium mb-2">عدد الأجهزة</label>
          <Select value={roomCount} onValueChange={setRoomCount}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">جهاز واحد</SelectItem>
              <SelectItem value="2">جهازان</SelectItem>
              <SelectItem value="3">3 أجهزة</SelectItem>
              <SelectItem value="4">4 أجهزة</SelectItem>
              <SelectItem value="5">5 أجهزة أو أكثر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    if (currentService.category === "pest-control") {
      return (
        <div>
          <label className="block text-sm font-medium mb-2">مستوى الإصابة</label>
          <Select value={roomCount} onValueChange={setRoomCount}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">خفيف</SelectItem>
              <SelectItem value="2">متوسط</SelectItem>
              <SelectItem value="3">شديد</SelectItem>
              <SelectItem value="4">شديد جداً</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    return (
      <div>
        <label className="block text-sm font-medium mb-2">عدد الغرف</label>
        <Select value={roomCount} onValueChange={setRoomCount}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">غرفة واحدة</SelectItem>
            <SelectItem value="2">غرفتان</SelectItem>
            <SelectItem value="3">3 غرف</SelectItem>
            <SelectItem value="4">4 غرف</SelectItem>
            <SelectItem value="5">5 غرف أو أكثر</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        {getServiceSpecificFields()}

        <div>
          <label className="block text-sm font-medium mb-2">المساحة التقريبية (متر مربع)</label>
          <Input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="مثال: 120"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">نوع الخدمة</label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(serviceTypes).map(([key, type]) => (
                <SelectItem key={key} value={key}>
                  {type.name} - {type.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">مستوى الاستعجال</label>
          <Select value={urgency} onValueChange={setUrgency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(urgencyOptions).map(([key, option]) => (
                <SelectItem key={key} value={key}>
                  {option.name} - {option.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">خدمات إضافية</label>
          <div className="space-y-2">
            {additionalOptions.map((option) => (
              <div
                key={option.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  additionalServices.includes(option.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleAdditionalService(option.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{option.name}</span>
                  <Badge variant="secondary">+{option.price} ريال</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCalculatorForm;
