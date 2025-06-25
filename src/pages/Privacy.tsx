import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Phone, Mail, MapPin, Lock, Eye, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>سياسة الخصوصية | توب كلينرز</title>
        <meta name="description" content="تعرف على سياسة الخصوصية وحماية البيانات في منصة توب كلينرز للخدمات المنزلية. نحن نلتزم بحماية بيانات عملائنا في السعودية." />
        <meta name="keywords" content="سياسة الخصوصية, حماية البيانات, توب كلينرز, الأمان, السعودية" />
        <link rel="canonical" href="https://top-cleaners.net/privacy" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <ModernHeader />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-green-600" />
              <h1 className="text-4xl font-bold text-gray-900">سياسة الخصوصية</h1>
            </div>
            <p className="text-xl text-gray-600">
              نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
            </p>
            <Badge variant="outline" className="mt-2">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </Badge>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  مقدمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  في توب كلينرز، نحن نقدر ثقتك ونلتزم بحماية خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات الشخصية التي تقدمها عند استخدام منصتنا على top-cleaners.net.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 text-sm">
                    نحن ملتزمون بأعلى معايير الأمان وحماية البيانات وفقاً للقوانين السعودية المعمول بها.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>1. المعلومات التي نجمعها</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    المعلومات الشخصية
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>الاسم الكامل</li>
                    <li>رقم الهاتف</li>
                    <li>عنوان البريد الإلكتروني</li>
                    <li>العنوان أو المنطقة السكنية</li>
                    <li>تفاصيل الخدمة المطلوبة</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">المعلومات التقنية</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>عنوان IP</li>
                    <li>نوع المتصفح والجهاز</li>
                    <li>تاريخ ووقت الزيارة</li>
                    <li>الصفحات التي تم زيارتها</li>
                    <li>مصدر الإحالة</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    نجمع هذه المعلومات فقط عند تقديمها طوعياً من قبل المستخدم أو عند الضرورة لتشغيل الموقع.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. كيفية استخدام المعلومات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 mb-4">
                  نستخدم المعلومات المجمعة للأغراض التالية:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">تقديم الخدمات</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• ربطك بمقدمي الخدمات المناسبين</li>
                      <li>• تسهيل عملية التواصل والحجز</li>
                      <li>• تقديم عروض أسعار مخصصة</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">تحسين الخدمة</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• تطوير وتحسين المنصة</li>
                      <li>• تحليل سلوك المستخدمين</li>
                      <li>• تخصيص المحتوى والعروض</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">التواصل</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• إرسال تأكيدات الحجز</li>
                      <li>• تقديم الدعم الفني</li>
                      <li>• إشعارات العروض الخاصة</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">الأمان والحماية</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• منع الاحتيال والأنشطة المشبوهة</li>
                      <li>• ضمان أمان المعاملات</li>
                      <li>• حماية حقوق المستخدمين</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>9. التواصل معنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، يرجى التواصل معنا:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3 text-sm">
                    <a href="tel:+966546331988" className="flex items-center gap-2 hover:text-blue-600">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span><strong>الهاتف:</strong> +966546331988</span>
                    </a>
                    <a href="mailto:privacy@top-cleaners.net" className="flex items-center gap-2 hover:text-blue-600">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span><strong>البريد الإلكتروني للخصوصية:</strong> privacy@top-cleaners.net</span>
                    </a>
                    <Link to="/contact" className="flex items-center gap-2 hover:text-blue-600">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span><strong>العنوان:</strong> المملكة العربية السعودية</span>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Privacy;