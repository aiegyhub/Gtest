import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminSettings = () => {

  const handleSave = () => {
    toast.success("تم حفظ الإعدادات العامة بنجاح.");
    // In a real application, this would save the data to a backend.
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>الإعدادات العامة للشركة</CardTitle>
        <p className="text-sm text-muted-foreground">
          إدارة المعلومات الأساسية التي تظهر في جميع أنحاء الموقع.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName">اسم الشركة</Label>
            <Input 
              id="companyName"
              defaultValue="توب كلينرز"
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">الاسم الرسمي الذي يظهر في العناوين والفوتر.</p>
          </div>

          <div>
            <Label htmlFor="companyEmail">البريد الإلكتروني للتواصل</Label>
            <Input 
              id="companyEmail"
              type="email"
              defaultValue="info@top-cleaners.net"
              className="mt-1"
            />
             <p className="text-sm text-muted-foreground mt-1">البريد الإلكتروني الرئيسي لتلقي استفسارات العملاء.</p>
          </div>
          
          <div>
            <Label htmlFor="mainPhone">رقم الهاتف الرئيسي</Label>
            <Input 
              id="mainPhone"
              type="tel"
              defaultValue="+966546331988"
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">الرقم الأساسي الذي يظهر في الهيدر والفوتر.</p>
          </div>
        </div>

        <Button onClick={handleSave}>حفظ الإعدادات</Button>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;