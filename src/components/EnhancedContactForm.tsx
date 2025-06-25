import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, User, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedContactFormProps {
  serviceName?: string;
  cityName?: string;
  leadSource?: string;
}

// Define the validation schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب." }),
  phone: z.string()
    .min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام." })
    .regex(/^05\d{8}$/, { message: "الرقم يجب أن يبدأ بـ 05." }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح." }).optional().or(z.literal('')),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const EnhancedContactForm = ({ 
  serviceName = "",
  cityName = "",
  leadSource = "contact_form"
}: EnhancedContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    const leadData = {
      ...data,
      serviceName,
      cityName,
      leadSource,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    console.log("Lead tracked:", leadData);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "تم إرسال طلبك بنجاح",
      description: "سنتواصل معك خلال 15 دقيقة",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-md border-0 shadow-none">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-center text-lg font-bold text-gray-900">
          احجز الآن - استشارة مجانية
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم الكامل *</FormLabel>
                  <FormControl>
                    <Input {...field} icon={<User />} placeholder="أدخل اسمك الكامل" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف *</FormLabel>
                  <FormControl>
                    <Input {...field} icon={<Phone />} placeholder="05xxxxxxxx" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني (اختياري)</FormLabel>
                  <FormControl>
                    <Input {...field} icon={<Mail />} placeholder="example@email.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تفاصيل الطلب (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="اكتب تفاصيل الخدمة المطلوبة..." rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الإرسال..." : "احجز الآن"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EnhancedContactForm;