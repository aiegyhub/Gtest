import { Helmet } from "react-helmet-async";
import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import ModernFloatingButtons from "@/components/modern/ModernFloatingButtons";
import IntelligentLiveChat from "@/components/IntelligentLiveChat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Shield, Clock, Star, Award, Target, Heart } from "lucide-react";
import { useState } from "react";
import AboutPageSchema from "@/components/SEO/AboutPageSchema";

const About = () => {
  const [showAI, setShowAI] = useState(false);

  const features = [
    {
      icon: CheckCircle,
      title: "جودة مضمونة",
      description: "نختار مقدمي الخدمات بعناية فائقة لضمان أعلى مستويات الجودة"
    },
    {
      icon: Users,
      title: "خدمة عملاء متميزة",
      description: "فريق خدمة عملاء محترف متاح على مدار الساعة لمساعدتك"
    },
    {
      icon: Shield,
      title: "أمان وثقة",
      description: "جميع مقدمي الخدمات مرخصون ومؤمن عليهم لضمان راحة بالك"
    },
    {
      icon: Clock,
      title: "استجابة سريعة",
      description: "نضمن لك الحصول على الخدمة في أسرع وقت ممكن"
    }
  ];

  const values = [
    {
      icon: Award,
      title: "التميز",
      description: "نسعى دائماً لتقديم أفضل مستوى من الخدمة والجودة"
    },
    {
      icon: Target,
      title: "الدقة",
      description: "نلتزم بالمواعيد ونؤدي العمل بدقة واحترافية عالية"
    },
    {
      icon: Heart,
      title: "الاهتمام",
      description: "نهتم بتفاصيل احتياجاتك ونقدم حلول مخصصة لك"
    },
    {
      icon: Star,
      title: "الثقة",
      description: "بناء علاقات طويلة الأمد مع عملائنا أساس نجاحنا"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-arabic" dir="rtl">
      <Helmet>
        <title>عن توب كلينرز | شركة رائدة في خدمات عسير والمنطقة الشرقية</title>
        <meta name="description" content="تعرف على شركة توب كلينرز، رؤيتنا ورسالتنا. الشركة الرائدة في خدمات التنظيف والصيانة في خميس مشيط، أبها، وحفر الباطن." />
        <meta name="keywords" content="عن توب كلينرز, شركة تنظيف, صيانة منزلية, منطقة عسير, المنطقة الشرقية" />
        <link rel="canonical" href="https://top-cleaners.net/about" />
      </Helmet>
      
      <AboutPageSchema />

      <ModernHeader />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">عن توب كلينرز</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              رواد الخدمات المنزلية الاحترافية في المملكة
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-0 shadow-xl">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-600">رؤيتنا</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  أن نكون الشركة الأولى والأكثر ثقة في المملكة العربية السعودية لخدمات التنظيف والصيانة المنزلية، 
                  مما يساهم في تطوير قطاع الخدمات وتحسين جودة الحياة للمواطنين والمقيمين.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-50 to-white border-0 shadow-xl">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-600">رسالتنا</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نسعى لتقديم حلول مبتكرة وسهلة الاستخدام في مجال التنظيف والصيانة، مع ضمان أعلى معايير الجودة 
                  والشفافية والأمان، لخلق تجربة استثنائية لجميع عملائنا.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار توب كلينرز؟</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                نحن نقدم أكثر من مجرد خدمة تنظيف، نقدم تجربة متكاملة من الجودة والاحترافية
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-0">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">قيمنا</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                القيم التي نؤمن بها والتي توجه عملنا اليومي
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12 mb-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">إنجازاتنا بالأرقام</h2>
              <p className="text-blue-100 text-lg">نفخر بما حققناه من إنجازات وثقة عملائنا</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">فني متخصص</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25,000+</div>
                <div className="text-blue-100">عميل راضي</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">22</div>
                <div className="text-blue-100">مدينة نخدمها</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">خدمة مستمرة</div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              هل أنت مقدم خدمة محترف؟
            </h2>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              انضم إلى شبكة توب كلينرز المتنامية وابدأ في الوصول إلى آلاف العملاء المحتملين
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
              انضم كشريك
            </Button>
          </section>
        </div>
      </main>

      <Footer />
      <ModernFloatingButtons onShowAI={() => setShowAI(true)} />

      {showAI && (
        <IntelligentLiveChat 
          currentPage="about"
          cityName=""
          serviceName=""
        />
      )}
    </div>
  );
};

export default About;