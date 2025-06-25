import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, Plus, Edit, Trash2, MapPin, Settings, Clock, User, Save, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { citiesData } from "@/data/citiesData";
import { servicesData } from "@/data/servicesData";

interface PhoneNumber {
  id: string;
  number: string;
  city: string;
  service: string;
  isActive: boolean;
  isPrimary: boolean;
  assignedTo?: string;
  priority: number;
}

const PhoneNumbersAdmin = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPhone, setEditingPhone] = useState<PhoneNumber | null>(null);
  const [formData, setFormData] = useState<Partial<PhoneNumber>>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedPhones = localStorage.getItem('phone_numbers_admin');
    if (savedPhones) {
      setPhoneNumbers(JSON.parse(savedPhones));
    } else {
      setPhoneNumbers([
        { id: "1", number: "+966546331988", city: "خميس مشيط", service: "رش دفان", isActive: true, isPrimary: true, assignedTo: "فريق الطوارئ", priority: 1 },
        { id: "2", number: "+966509876543", city: "أبها", service: "كشف تسريبات", isActive: true, isPrimary: false, assignedTo: "فريق أبها", priority: 2 },
        { id: "3", number: "+966555555555", city: "حفر الباطن", service: "عزل فوم", isActive: false, isPrimary: false, assignedTo: "فريق الشرقية", priority: 3 },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('phone_numbers_admin', JSON.stringify(phoneNumbers));
  }, [phoneNumbers]);

  const handleEdit = (phone: PhoneNumber) => {
    setEditingPhone(phone);
    setFormData({ ...phone });
    setIsEditDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPhone(null);
    setFormData({ number: "", city: "", service: "", isActive: true, isPrimary: false, assignedTo: "", priority: 3 });
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.number || !formData.city || !formData.service) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة.", variant: "destructive" });
      return;
    }

    const phoneData: PhoneNumber = {
      id: editingPhone?.id || Date.now().toString(),
      number: formData.number,
      city: formData.city,
      service: formData.service,
      isActive: formData.isActive ?? true,
      isPrimary: formData.isPrimary ?? false,
      assignedTo: formData.assignedTo,
      priority: formData.priority ?? 3,
    };

    if (editingPhone) {
      setPhoneNumbers(prev => prev.map(p => p.id === editingPhone.id ? phoneData : p));
      toast({ title: "تم التحديث", description: "تم تحديث رقم الهاتف بنجاح." });
    } else {
      setPhoneNumbers(prev => [...prev, phoneData]);
      toast({ title: "تمت الإضافة", description: "تم إضافة رقم هاتف جديد بنجاح." });
    }
    setIsEditDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setPhoneNumbers(prev => prev.filter(p => p.id !== id));
    toast({ title: "تم الحذف", description: "تم حذف رقم الهاتف بنجاح." });
  };
  
  const cities = citiesData.map(c => c.name);
  const services = servicesData.map(s => s.name);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>إدارة أرقام الهواتف الديناميكية</CardTitle>
          <Button onClick={handleAdd}><Plus className="ml-2 h-4 w-4"/>إضافة رقم</Button>
        </div>
        <p className="text-sm text-muted-foreground">إدارة وتخصيص أرقام الهواتف لكل خدمة ومدينة.</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>الرقم</TableHead><TableHead>المدينة</TableHead><TableHead>الخدمة</TableHead><TableHead>الأولوية</TableHead><TableHead>الحالة</TableHead><TableHead>الإجراءات</TableHead></TableRow></TableHeader>
          <TableBody>
            {phoneNumbers.map((phone) => (
              <TableRow key={phone.id}>
                <TableCell className="font-medium">{phone.number} {phone.isPrimary && <Badge className="mr-2">رئيسي</Badge>}</TableCell>
                <TableCell>{phone.city}</TableCell>
                <TableCell>{phone.service}</TableCell>
                <TableCell>{phone.priority}</TableCell>
                <TableCell><Badge variant={phone.isActive ? "default" : "destructive"} className={phone.isActive ? "bg-green-100 text-green-800" : ""}>{phone.isActive ? "نشط" : "معطل"}</Badge></TableCell>
                <TableCell className="flex gap-2"><Button size="sm" variant="outline" onClick={() => handleEdit(phone)}><Edit className="h-4 w-4" /></Button><Button size="sm" variant="destructive" onClick={() => handleDelete(phone.id)}><Trash2 className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingPhone ? 'تحرير رقم الهاتف' : 'إضافة رقم جديد'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label htmlFor="number">الرقم</Label><Input id="number" value={formData.number || ''} onChange={(e) => setFormData(p => ({ ...p, number: e.target.value }))} /></div>
            <div className="space-y-2"><Label htmlFor="city">المدينة</Label><Select value={formData.city} onValueChange={(val) => setFormData(p => ({...p, city: val}))}><SelectTrigger><SelectValue placeholder="اختر مدينة" /></SelectTrigger><SelectContent>{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-2"><Label htmlFor="service">الخدمة</Label><Select value={formData.service} onValueChange={(val) => setFormData(p => ({...p, service: val}))}><SelectTrigger><SelectValue placeholder="اختر خدمة" /></SelectTrigger><SelectContent>{services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-2"><Label htmlFor="assignedTo">المسؤول</Label><Input id="assignedTo" value={formData.assignedTo || ''} onChange={(e) => setFormData(p => ({ ...p, assignedTo: e.target.value }))} /></div>
            <div className="space-y-2"><Label htmlFor="priority">الأولوية</Label><Input id="priority" type="number" value={formData.priority || ''} onChange={(e) => setFormData(p => ({ ...p, priority: Number(e.target.value) }))} /></div>
            <div className="flex items-center space-x-2 pt-6"><Switch id="isActive" checked={formData.isActive} onCheckedChange={(val) => setFormData(p => ({...p, isActive: val}))} /><Label htmlFor="isActive">نشط</Label></div>
            <div className="flex items-center space-x-2 pt-6"><Switch id="isPrimary" checked={formData.isPrimary} onCheckedChange={(val) => setFormData(p => ({...p, isPrimary: val}))} /><Label htmlFor="isPrimary">رئيسي</Label></div>
          </div>
          <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>إلغاء</Button><Button onClick={handleSave}><Save className="ml-2 h-4 w-4" />حفظ</Button></div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PhoneNumbersAdmin;