import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Edit3, Save, Trash2, Plus, Eye, Settings, Phone, BarChart3 } from "lucide-react";

interface ContentItem {
  id: string;
  type: 'service' | 'city' | 'page';
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
}

const ManualContentEditor = () => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem('admin_content');
    if (savedContent) setContentItems(JSON.parse(savedContent));
    else {
      setContentItems([
        { id: '1', type: 'city', title: 'خدمات توب كلينرز في الرياض', slug: 'riyadh', content: 'محتوى صفحة خدمات توب كلينرز في الرياض...', status: 'published', lastModified: '2024-01-15T10:30:00Z'},
        { id: '2', type: 'page', title: 'عن شركة توب كلينرز', slug: 'about', content: 'محتوى صفحة من نحن...', status: 'published', lastModified: '2024-01-14T15:45:00Z'},
        { id: '3', type: 'page', title: 'سياسة الخصوصية', slug: 'privacy', content: 'محتوى صفحة سياسة الخصوصية...', status: 'draft', lastModified: '2024-01-13T09:20:00Z'},
      ]);
    }

    const savedPhones = localStorage.getItem('admin_phones');
    if (savedPhones) setPhoneNumbers(JSON.parse(savedPhones));
    else setPhoneNumbers(["+966546331988", "+966546331989"]);
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_content', JSON.stringify(contentItems));
  }, [contentItems]);

  useEffect(() => {
    localStorage.setItem('admin_phones', JSON.stringify(phoneNumbers));
  }, [phoneNumbers]);

  const handleEdit = (item: ContentItem) => {
    setSelectedItem(item);
    setEditContent(item.content);
    setIsEditing(true);
    toast({ title: "تم فتح المحرر", description: `جاري تحرير: ${item.title}` });
  };

  const handleSave = async () => {
    if (!selectedItem) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setContentItems(items => items.map(item => item.id === selectedItem.id ? { ...item, content: editContent, lastModified: new Date().toISOString() } : item));
    setIsEditing(false);
    setSelectedItem(null);
    setIsSaving(false);
    toast({ title: "تم الحفظ بنجاح ✅", description: "تم حفظ التغييرات بنجاح" });
  };

  const handleDelete = (id: string) => {
    const item = contentItems.find(item => item.id === id);
    setContentItems(items => items.filter(item => item.id !== id));
    toast({ title: "تم الحذف", description: `تم حذف "${item?.title}" بنجاح`, variant: "destructive" });
  };
  
  const getPreviewLink = (item: ContentItem): string => {
    switch (item.type) {
        case 'city':
            return `/sa/${item.slug}`;
        case 'service':
            return `/services/${item.slug}`;
        case 'page':
        default:
            return `/${item.slug}`;
    }
  };

  const getStatusBadge = (status: ContentItem['status']) => {
    const colors = { published: 'bg-green-100 text-green-800', draft: 'bg-yellow-100 text-yellow-800', archived: 'bg-gray-100 text-gray-800' };
    const labels = { published: 'منشور', draft: 'مسودة', archived: 'مؤرشف' };
    return <span className={`px-2 py-1 rounded-full text-xs ${colors[status]}`}>{labels[status]}</span>;
  };
  
  const addNewContent = () => {
    const newItem: ContentItem = { id: Date.now().toString(), type: 'page', title: 'صفحة جديدة', slug: 'new-page', content: 'محتوى الصفحة الجديدة...', status: 'draft', lastModified: new Date().toISOString() };
    setContentItems([...contentItems, newItem]);
    toast({ title: "تم إنشاء صفحة جديدة ✅", description: "يمكنك الآن تحرير المحتوى الجديد" });
  };
  
  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader><CardTitle>محرر المحتوى اليدوي</CardTitle></CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">جميع المحتويات ({contentItems.length})</h3>
                <Button onClick={addNewContent}><Plus className="h-4 w-4 ml-2" /> إضافة محتوى</Button>
              </div>
              <Table>
                <TableHeader><TableRow><TableHead>العنوان</TableHead><TableHead>النوع</TableHead><TableHead>الحالة</TableHead><TableHead>آخر تعديل</TableHead><TableHead>الإجراءات</TableHead></TableRow></TableHeader>
                <TableBody>
                  {contentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.type === 'service' ? 'خدمة' : item.type === 'city' ? 'مدينة' : 'صفحة'}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{new Date(item.lastModified).toLocaleDateString('ar-SA')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}><Edit3 className="h-4 w-4" /></Button>
                          <Button size="sm" variant="outline" onClick={() => window.open(getPreviewLink(item), '_blank')}><Eye className="h-4 w-4" /></Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild><Button size="sm" variant="outline"><Trash2 className="h-4 w-4 text-red-600" /></Button></AlertDialogTrigger>
                            <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>تأكيد الحذف</AlertDialogTitle><AlertDialogDescription>هل أنت متأكد من حذف "{item.title}"؟ لا يمكن التراجع عن هذا الإجراء.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>إلغاء</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-700">حذف</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">تحرير: {selectedItem?.title}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>إلغاء</Button>
                  <Button onClick={handleSave} disabled={isSaving}><Save className="h-4 w-4 ml-2" />{isSaving ? 'جاري الحفظ...' : 'حفظ'}</Button>
                </div>
              </div>
              <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full h-96 p-4 border rounded-lg" placeholder="محتوى الصفحة..." disabled={isSaving} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualContentEditor;