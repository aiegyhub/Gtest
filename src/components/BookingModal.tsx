import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { citiesData } from "@/data/citiesData";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  cityName?: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب." }),
  phone: z.string().min(10, { message: "رقم الهاتف يجب أن يتكون من 10 أرقام." }).regex(/^05\d{8}$/, "يجب أن يبدأ الرقم بـ 05."),
  city: z.string({ required_error: "الرجاء اختيار مدينة." }),
  service: z.string({ required_error: "الرجاء اختيار خدمة." }),
  date: z.string({ required_error: "الرجاء اختيار تاريخ." }),
  time: z.string({ required_error: "الرجاء اختيار وقت." }),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const BookingModal = ({ isOpen, onClose, serviceName, cityName }: BookingModalProps) => {
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: cityName || "",
      service: serviceName || "",
      date: "",
      time: "",
      address: "",
      notes: "",
    },
  });

  // Reset form when service/city props change
  React.useEffect(() => {
    form.reset({
      name: "",
      phone: "",
      city: cityName || "",
      service: serviceName || "",
      date: "",
      time: "",
      address: "",
      notes: "",
    });
    setStep(1);
  }, [isOpen, serviceName, cityName, form]);


  const validationFieldsPerStep: (keyof FormData)[][] = [
    ['name', 'phone'],
    ['service', 'city'],
    ['date', 'time'],
  ];

  const handleNext = async () => {
    const isValid = await form.trigger(validationFieldsPerStep[step - 1]);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Submitting booking data:", data);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    onClose();
    toast({
      title: "✅ تم تأكيد الحجز بنجاح!",
      description: `تم حجز خدمة ${data.service} في ${data.city}. سنتواصل معك قريباً.`,
    });
  };

  const timeSlots = Array.from({ length: 13 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>احجز خدمتك الآن</DialogTitle>
          <DialogDescription>الخطوة {step} من 4</DialogDescription>
        </DialogHeader>

        <div className="w-full bg-gray-200 rounded-full h-2 my-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <div className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>الاسم الكامل</FormLabel><FormControl><Input placeholder="أدخل اسمك..." {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>رقم الهاتف</FormLabel><FormControl><Input placeholder="05xxxxxxxx" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormField control={form.control} name="service" render={({ field }) => (
                  <FormItem><FormLabel>الخدمة</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="اختر خدمة..." /></SelectTrigger></FormControl>
                    <SelectContent>{servicesData.map(s => <SelectItem key={s.slug} value={s.name}>{s.name}</SelectItem>)}</SelectContent>
                  </Select><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem><FormLabel>المدينة</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="اختر مدينة..." /></SelectTrigger></FormControl>
                    <SelectContent>{citiesData.map(c => <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                  </Select><FormMessage /></FormItem>
                )}/>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem><FormLabel>التاريخ</FormLabel><FormControl><Input type="date" min={minDate} {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="time" render={({ field }) => (
                  <FormItem><FormLabel>الوقت</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="اختر وقتاً..." /></SelectTrigger></FormControl>
                    <SelectContent>{timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select><FormMessage /></FormItem>
                )}/>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4">
                 <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>العنوان التفصيلي (اختياري)</FormLabel><FormControl><Input placeholder="الحي، الشارع..." {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="notes" render={({ field }) => (
                  <FormItem><FormLabel>ملاحظات إضافية (اختياري)</FormLabel><FormControl><Textarea placeholder="أي تفاصيل خاصة..." {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && <Button type="button" variant="outline" onClick={handleBack}>السابق</Button>}
              {step < 4 && <Button type="button" onClick={handleNext} className="mr-auto">التالي</Button>}
              {step === 4 && (
                <Button type="submit" className="mr-auto" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                  تأكيد الحجز النهائي
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;