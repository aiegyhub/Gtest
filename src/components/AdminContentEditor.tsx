
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

const AdminContentEditor = () => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Mock data - في التطبيق الحقيقي سيأتي من الخادم
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'service',
      title: 'تنظيف المنازل في الرياض',
      slug: 'riyadh/home-cleaning',
      content: 'محتوى صفحة تنظيف المنازل في الرياض...',
      status: 'published',
      lastModified: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'city',
      title: 'خدمات جدة',
      slug: 'jeddah',
      content: 'محتوى صفحة مدينة جدة...',
      status: 'published',
      lastModified: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      type: 'page',
      title: 'من نحن',
      slug: 'about',
      content: 'محتوى صفحة من نحن...',
      status: 'draft',
      lastModified: '2024-01-13T09:20:00Z'
    }
  ]);

  const [phoneNumbers, setPhoneNumbers] = useState([
    "+966501234567",
    "+966507654321",
    "+966509876543"
  ]);

  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  // تحميل البيانات المحفوظة عند التحميل
  useEffect(() => {
    const savedContent = localStorage.getItem('admin_content');
    const savedPhones = localStorage.getItem('admin_phones');
    
    if (savedContent) {
      try {
        setContentItems(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
    
    if (savedPhones) {
      try {
        setPhoneNumbers(JSON.parse(savedPhones));
      } catch (error) {
        console.error('Error loading saved phones:', error);
      }
    }
  }, []);

  // حفظ البيانات في localStorage عند تغييرها
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
    
    toast({
      title: "تم فتح المحرر",
      description: `جاري تحرير: ${item.title}`
    });
  };

  const handleSave = async () => {
    if (!selectedItem) return;
    
    setIsSaving(true);
    
    // محاكاة عملية الحفظ
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setContentItems(items => 
      items.map(item => 
        item.id === selectedItem.id 
          ? { ...item, content: editContent, lastModified: new Date().toISOString() }
          : item
      )
    );
    
    setIsEditing(false);
    setSelectedItem(null);
    setIsSaving(false);
    
    toast({
      title: "تم الحفظ بنجاح ✅",
      description: "تم حفظ التغييرات بنجاح"
    });
    
    console.log('Content saved:', { id: selectedItem.id, content: editContent });
  };

  const handleDelete = (id: string) => {
    const item = contentItems.find(item => item.id === id);
    setContentItems(items => items.filter(item => item.id !== id));
    
    toast({
      title: "تم الحذف",
      description: `تم حذف "${item?.title}" بنجاح`,
      variant: "destructive"
    });
    
    console.log('Content deleted:', id);
  };

  const handleStatusChange = (id: string, status: ContentItem['status']) => {
    const item = contentItems.find(item => item.id === id);
    setContentItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, status, lastModified: new Date().toISOString() }
          : item
      )
    );
    
    const statusLabels = {
      published: 'منشور',
      draft: 'مسودة', 
      archived: 'مؤرشف'
    };
    
    toast({
      title: "تم تغيير الحالة",
      description: `تم تغيير حالة "${item?.title}" إلى ${statusLabels[status]}`
    });
    
    console.log('Status changed:', { id, status });
  };

  const addPhoneNumber = () => {
    if (!newPhoneNumber.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الهاتف",
        variant: "destructive"
      });
      return;
    }
    
    if (phoneNumbers.includes(newPhoneNumber)) {
      toast({
        title: "خطأ",
        description: "رقم الهاتف موجود مسبقاً",
        variant: "destructive"
      });
      return;
    }
    
    setPhoneNumbers([...phoneNumbers, newPhoneNumber]);
    setNewPhoneNumber("");
    
    toast({
      title: "تمت الإضافة ✅",
      description: `تم إضافة رقم الهاتف: ${newPhoneNumber}`
    });
    
    console.log('Phone number added:', newPhoneNumber);
  };

  const removePhoneNumber = (phone: string) => {
    if (phoneNumbers.length === 1) {
      toast({
        title: "تحذير",
        description: "لا يمكن حذف الرقم الوحيد المتبقي",
        variant: "destructive"
      });
      return;
    }
    
    setPhoneNumbers(phoneNumbers.filter(p => p !== phone));
    
    toast({
      title: "تم الحذف",
      description: `تم حذف رقم الهاتف: ${phone}`,
      variant: "destructive"
    });
    
    console.log('Phone number removed:', phone);
  };

  const addNewContent = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: 'page',
      title: 'صفحة جديدة',
      slug: 'new-page',
      content: 'محتوى الصفحة الجديدة...',
      status: 'draft',
      lastModified: new Date().toISOString()
    };
    
    setContentItems([...contentItems, newItem]);
    
    toast({
      title: "تم إنشاء صفحة جديدة ✅",
      description: "يمكنك الآن تحرير المحتوى الجديد"
    });
  };

  const getStatusBadge = (status: ContentItem['status']) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      published: 'منشور',
      draft: 'مسودة',
      archived: 'مؤرشف'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${colors[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">إدارة المحتوى</TabsTrigger>
          <TabsTrigger value="phones">إدارة الهواتف</TabsTrigger>
          <TabsTrigger value="analytics">تقارير مفصلة</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>محرر المحتوى</CardTitle>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">جميع المحتويات ({contentItems.length})</h3>
                    <Button onClick={addNewContent}>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة محتوى جديد
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>العنوان</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>آخر تعديل</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contentItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>
                            {item.type === 'service' ? 'خدمة' : item.type === 'city' ? 'مدينة' : 'صفحة'}
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>
                            {new Date(item.lastModified).toLocaleDateString('ar-SA')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(item)}
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`/sa/${item.slug}`, '_blank')}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      هل أنت متأكد من حذف "{item.title}"؟ لا يمكن التراجع عن هذا الإجراء.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDelete(item.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      حذف
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
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
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setSelectedItem(null);
                          toast({
                            title: "تم الإلغاء",
                            description: "تم إلغاء التحرير"
                          });
                        }}
                        disabled={isSaving}
                      >
                        إلغاء
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving}>
                        <Save className="h-4 w-4 ml-2" />
                        {isSaving ? 'جاري الحفظ...' : 'حفظ'}
                      </Button>
                    </div>
                  </div>
                  
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none"
                    placeholder="محتوى الصفحة..."
                    disabled={isSaving}
                  />
                  
                  <div className="flex gap-2">
                    <Button
                      variant={selectedItem?.status === 'published' ? 'default' : 'outline'}
                      onClick={() => selectedItem && handleStatusChange(selectedItem.id, 'published')}
                      disabled={isSaving}
                    >
                      نشر
                    </Button>
                    <Button
                      variant={selectedItem?.status === 'draft' ? 'default' : 'outline'}
                      onClick={() => selectedItem && handleStatusChange(selectedItem.id, 'draft')}
                      disabled={isSaving}
                    >
                      حفظ كمسودة
                    </Button>
                    <Button
                      variant={selectedItem?.status === 'archived' ? 'default' : 'outline'}
                      onClick={() => selectedItem && handleStatusChange(selectedItem.id, 'archived')}
                      disabled={isSaving}
                    >
                      أرشفة
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                إدارة أرقام الهواتف ({phoneNumbers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="newPhone">رقم الهاتف الجديد</Label>
                  <Input
                    id="newPhone"
                    type="tel"
                    value={newPhoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    placeholder="+966501234567"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addPhoneNumber();
                      }
                    }}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addPhoneNumber}>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {phoneNumbers.map((phone, index) => (
                  <div key={phone} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{phone}</span>
                      {index === 0 && <span className="mr-2 text-sm text-green-600 bg-green-100 px-2 py-1 rounded">(الرئيسي)</span>}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removePhoneNumber(phone)}
                      disabled={phoneNumbers.length === 1}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 يمكنك إضافة عدة أرقام هواتف. الرقم الأول سيكون الرقم الرئيسي المعروض في الموقع.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي المشاهدات</p>
                    <p className="text-2xl font-bold">12,543</p>
                    <p className="text-xs text-green-600">+12% عن الشهر الماضي</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">مكالمات اليوم</p>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-xs text-green-600">+8% عن أمس</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">معدل التحويل</p>
                    <p className="text-2xl font-bold">8.3%</p>
                    <p className="text-xs text-green-600">+2.1% عن الشهر الماضي</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">عدد الصفحات</p>
                    <p className="text-2xl font-bold">{contentItems.length}</p>
                    <p className="text-xs text-gray-600">إجمالي المحتوى</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Edit3 className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">أرقام الهواتف</p>
                    <p className="text-2xl font-bold">{phoneNumbers.length}</p>
                    <p className="text-xs text-gray-600">أرقام نشطة</p>
                  </div>
                  <div className="bg-cyan-100 p-3 rounded-lg">
                    <Settings className="h-6 w-6 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">المحتوى المنشور</p>
                    <p className="text-2xl font-bold">
                      {contentItems.filter(item => item.status === 'published').length}
                    </p>
                    <p className="text-xs text-gray-600">من {contentItems.length} إجمالي</p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <Settings className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContentEditor;
