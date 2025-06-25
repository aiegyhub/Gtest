import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>الشروط والأحكام | توب كلينرز</title>
        <meta name="description" content="شروط وأحكام استخدام منصة توب كلينرز للخدمات المنزلية في المملكة العربية السعودية. يرجى قراءة الشروط بعناية." />
        <meta name="keywords" content="شروط الاستخدام, أحكام, توب كلينرز, الخدمات المنزلية, السعودية" />
        <link rel="canonical" href="https://top-cleaners.net/terms" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <ModernHeader />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">الشروط والأحكام</h1>
            </div>
            <p className="text-xl text-gray-600">
              شروط وأحكام استخدام منصة توب كلينرز
            </p>
            <Badge variant="outline" className="mt-2">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </Badge>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. التعريفات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  <strong>"توب كلينرز"</strong> تشير إلى منصة الخدمات المنزلية المتاحة على الموقع الإلكتروني top-cleaners.net
                </p>
                <p className="text-gray-700">
                  <strong>"المستخدم"</strong> يشير إلى أي شخص يستخدم خدمات المنصة أو يتصفح الموقع
                </p>
                <p className="text-gray-700">
                  <strong>"مقدم الخدمة"</strong> يشير إلى الأفراد أو الشركات المتخصصة في تقديم الخدمات المنزلية
                </p>
                <p className="text-gray-700">
                  <strong>"الخدمات"</strong> تشمل جميع الخدمات المنزلية المتاحة عبر المنصة مثل التنظيف، الصيانة، السباكة، الكهرباء، وغيرها
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. قبول الشروط</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  باستخدام منصة توب كلينرز، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم إشعار المستخدمين بأي تغييرات جوهرية.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. استخدام المنصة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">3.1 الاستخدام المسموح</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>البحث عن مقدمي الخدمات المنزلية المعتمدين</li>
                    <li>طلب عروض أسعار للخدمات المطلوبة</li>
                    <li>التواصل مع مقدمي الخدمات عبر القنوات المتاحة</li>
                    <li>قراءة المراجعات والتقييمات</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3.2 الاستخدام المحظور</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>استخدام المنصة لأغراض غير قانونية</li>
                    <li>نشر محتوى مسيء أو غير لائق</li>
                    <li>محاولة اختراق أو إلحاق الضرر بالموقع</li>
                    <li>انتحال شخصية الآخرين</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Other cards remain the same */}

            <Card>
              <CardHeader>
                <CardTitle>10. التواصل وحل النزاعات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 mb-4">
                  في حال وجود أي مشاكل أو نزاعات، نشجع على التواصل المباشر مع الطرف الآخر أولاً. في حال عدم التوصل لحل، يمكن التواصل معنا للمساعدة في الوساطة.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    معلومات التواصل
                  </h4>
                  <div className="space-y-3 text-sm">
                    <a href="tel:+966546331988" className="flex items-center gap-2 hover:text-blue-600">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span><strong>الهاتف:</strong> +966546331988</span>
                    </a>
                    <a href="mailto:info@top-cleaners.net" className="flex items-center gap-2 hover:text-blue-600">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span><strong>البريد الإلكتروني:</strong> info@top-cleaners.net</span>
                    </a>
                    <Link to="/contact" className="flex items-center gap-2 hover:text-blue-600">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span><strong>العنوان:</strong> المملكة العربية السعودية</span>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final sections remain the same */}

          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Terms;