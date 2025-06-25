import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import ModernFloatingButtons from "@/components/modern/ModernFloatingButtons";
import IntelligentLiveChat from "@/components/IntelligentLiveChat";
import EnhancedContactForm from "@/components/EnhancedContactForm";
import ClickToCall from "@/components/ClickToCall";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactPageSchema from "@/components/SEO/ContactPageSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle, Users, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [showAI, setShowAI] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      content: "+966546331988",
      description: "متاح 24/7",
      href: "tel:+966546331988",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: MessageCircle,
      title: "واتساب",
      content: "+966546331988",
      description: "للاستفسارات السريعة",
      href: "https://wa.me/966546331988",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      content: "info@top-cleaners.net",
      description: "نرد خلال 24 ساعة",
      href: "mailto:info@top-cleaners.net",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MapPin,
      title: "مناطق الخدمة",
      content: "جميع مدن المملكة",
      description: "تغطية شاملة",
      href: "/sa",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const supportChannels = [
    {
      icon: Headphones,
      title: "الدعم الفني",
      description: "للمساعدة التقنية والاستفسارات المتخصصة",
      available: "24/7"
    },
    {
      icon: Users,
      title: "خدمة العملاء",
      description: "لحجز المواعيد والاستفسارات العامة",
      available: "8 ص - 10 م"
    },
    {
      icon: MessageCircle,
      title: "الدردشة المباشرة",
      description: "للحصول على إجابات فورية من توب كلينرز الذكي",
      available: "24/7"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-arabic" dir="rtl">
      <Helmet>
        <title>تواصل معنا | توب كلينرز - خدمة عملاء متميزة</title>
        <meta name="description" content="تواصل مع فريق توب كلينرز المتخصص. خدمة عملاء 24/7، استجابة سريعة، ودعم فني متكامل لجميع احتياجاتك." />
        <meta name="keywords" content="تواصل, خدمة عملاء, توب كلينرز, دعم, استفسارات, اتصال" />
        <link rel="canonical" href="https://top-cleaners.net/contact" />
      </Helmet>

      <ContactPageSchema />
      <ModernHeader />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">تواصل معنا</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              نحن هنا لمساعدتك! تواصل معنا بالطريقة التي تناسبك
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Quick Contact Cards */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق التواصل السريع</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                اختر الطريقة المناسبة لك للتواصل معنا
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactInfo.map((info, index) => {
                const isExternal = info.href.startsWith('http');
                const isInternal = info.href.startsWith('/');
                const CardComponent = (
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 h-full">
                    <CardContent className="p-0 text-center">
                      <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <info.icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-blue-600 font-medium mb-1">{info.content}</p>
                      <p className="text-gray-500 text-sm">{info.description}</p>
                    </CardContent>
                  </Card>
                );

                if (isInternal) {
                  return <Link to={info.href} key={index} className="block h-full">{CardComponent}</Link>
                }

                return (
                  <a href={info.href} key={index} target={isExternal ? '_blank' : '_self'} rel={isExternal ? 'noopener noreferrer' : undefined} className="block h-full">
                    {CardComponent}
                  </a>
                );
              })}
            </div>
          </section>

          {/* Support Channels */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">قنوات الدعم المتخصصة</h2>
              <p className="text-lg text-gray-600">فرق متخصصة لخدمتك في جميع الأوقات</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="p-8 text-center bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <channel.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{channel.title}</h3>
                    <p className="text-gray-600 mb-4">{channel.description}</p>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {channel.available}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Enhanced Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-white border-0 shadow-xl">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">أرسل لنا رسالة</h2>
                  <EnhancedContactForm leadSource="contact_page" />
                </CardContent>
              </Card>
            </div>

            {/* Office Hours and Additional Info */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">ساعات العمل</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p><span className="font-medium">السبت - الخميس:</span> 8:00 ص - 10:00 م</p>
                    <p><span className="font-medium">الجمعة:</span> 2:00 م - 10:00 م</p>
                    <p className="text-green-600 font-medium mt-3">خدمة الطوارئ: 24/7</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-0 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">معلومات إضافية</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>✅ استجابة خلال 15 دقيقة للطوارئ</p>
                    <p>✅ تقييم مجاني للخدمة</p>
                    <p>✅ ضمان رضا العملاء 100%</p>
                    <p>✅ فرق متخصصة في جميع المناطق</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">هل تحتاج إلى مساعدة فورية؟</h2>
            <p className="text-xl mb-8">تواصل معنا مباشرة للحصول على خدمة سريعة</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ClickToCall
                size="lg"
                variant="secondary"
                className="font-semibold bg-white text-blue-600 hover:bg-gray-100"
              />
              <WhatsAppButton
                size="lg"
                variant="outline"
                className="bg-green-600 text-white hover:bg-green-700 font-semibold border-green-600"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <ModernFloatingButtons onShowAI={() => setShowAI(true)} />

      {showAI && (
        <IntelligentLiveChat 
          currentPage="contact"
          cityName=""
          serviceName=""
        />
      )}
    </div>
  );
};

export default Contact;