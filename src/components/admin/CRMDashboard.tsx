import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Phone, Calendar, TrendingUp, Search, UserPlus, MessageCircle, Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  totalBookings: number;
  lastBooking: string;
  status: 'active' | 'inactive' | 'vip';
  rating: number;
  totalSpent: number;
}

interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  service: string;
  date: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  amount: number;
  city: string;
}

const CRMDashboard = () => {
  const { toast } = useToast();

  const [customers, setCustomers] = useState<Customer[]>([
    { id: "1", name: "أحمد محمد عسيري", phone: "+966546331988", email: "ahmed@email.com", city: "خميس مشيط", totalBookings: 5, lastBooking: "2024-01-20", status: "vip", rating: 4.8, totalSpent: 1200 },
    { id: "2", name: "فاطمة علي القحطاني", phone: "+966509876543", email: "fatima@email.com", city: "أبها", totalBookings: 2, lastBooking: "2024-01-18", status: "active", rating: 4.2, totalSpent: 450 },
    { id: "3", name: "خالد سعد الشمري", phone: "+966555555555", email: "khalid@email.com", city: "حفر الباطن", totalBookings: 8, lastBooking: "2024-01-22", status: "vip", rating: 4.9, totalSpent: 2100 }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: "1", customerId: "1", customerName: "أحمد محمد عسيري", service: "تنظيف المنازل", date: "2024-01-25", status: "confirmed", amount: 250, city: "خميس مشيط" },
    { id: "2", customerId: "2", customerName: "فاطمة علي القحطاني", service: "مكافحة حشرات", date: "2024-01-24", status: "pending", amount: 180, city: "أبها" },
    { id: "3", customerId: "3", customerName: "خالد سعد الشمري", service: "صيانة التكييف", date: "2024-01-23", status: "in_progress", amount: 320, city: "حفر الباطن" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const statusConfig = {
    active: { label: "نشط", variant: "default" as const },
    inactive: { label: "غير نشط", variant: "secondary" as const },
    vip: { label: "VIP", variant: "destructive" as const },
    pending: { label: "في الانتظار", variant: "secondary" as const },
    confirmed: { label: "مؤكد", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
    in_progress: { label: "قيد التنفيذ", variant: "outline" as const, color: "bg-orange-100 text-orange-800" },
    completed: { label: "مكتمل", variant: "default" as const, color: "bg-green-100 text-green-800" },
    cancelled: { label: "ملغي", variant: "destructive" as const }
  };
  
  const filteredCustomers = customers.filter(c => 
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm)) &&
    (filterStatus === "all" || c.status === filterStatus)
  );
  
  const handleSendMessage = (phone: string) => {
    toast({ title: "إجراء قيد التنفيذ", description: `فتح محادثة واتساب مع ${phone}` });
    window.open(`https://wa.me/${phone.replace('+', '')}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة علاقات العملاء (CRM)</CardTitle>
        <p className="text-sm text-muted-foreground">نظرة شاملة على عملائك وحجوزاتهم.</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customers">العملاء</TabsTrigger>
            <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="space-y-4">
            <div className="flex gap-4"><Input placeholder="ابحث بالاسم أو الهاتف..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} icon={<Search />} /><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded-md px-3"><option value="all">جميع الحالات</option><option value="active">نشط</option><option value="vip">VIP</option><option value="inactive">غير نشط</option></select></div>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id}><CardContent className="p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Users className="h-6 w-6 text-blue-600" /></div><div><h3 className="font-semibold">{customer.name}</h3><p className="text-sm text-gray-600">{customer.phone} • {customer.city}</p></div></div><div className="flex items-center gap-2"><div className="text-right"><p className="font-semibold">{customer.totalSpent.toLocaleString()} ريال</p><p className="text-xs text-muted-foreground">{customer.totalBookings} حجوزات</p></div><Badge {...statusConfig[customer.status]}>{statusConfig[customer.status].label}</Badge><Button size="sm" variant="outline" onClick={() => handleSendMessage(customer.phone)}><MessageCircle className="h-4 w-4" /></Button></div></div></CardContent></Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}><CardContent className="p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-4"><div className={`p-3 rounded-lg ${statusConfig[booking.status].color || ''}`}><Calendar className="h-6 w-6" /></div><div><h3 className="font-semibold">{booking.service}</h3><p className="text-sm text-gray-600">{booking.customerName} • {booking.city}</p></div></div><div className="flex items-center gap-4"><div className="text-right"><p className="font-semibold">{booking.amount} ريال</p><p className="text-xs text-muted-foreground">{booking.date}</p></div><Badge {...statusConfig[booking.status]}>{statusConfig[booking.status].label}</Badge></div></div></CardContent></Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CRMDashboard;