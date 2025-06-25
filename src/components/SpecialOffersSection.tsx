
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Gift, 
  Clock, 
  Star, 
  CheckCircle, 
  Phone,
  MessageCircle,
  Sparkles
} from "lucide-react";
import SpecialOffersModal from "./SpecialOffersModal";

const SpecialOffersSection = () => {
  const [showOffers, setShowOffers] = useState(false);

  const offers = [
    {
      title: "عرض التنظيف الشامل",
      originalPrice: "499",
      discountPrice: "299",
      savings: "200",
      description: "تنظيف شامل للمنزل مع تعقيم مجاني",
      features: [
        "تنظيف جميع الغرف",
        "تنظيف المطبخ والحمامات",
        "تعقيم مجاني ضد الفيروسات",
        "ضمان 7 أيام"
      ],
      timeLeft: "48 ساعة",
      badge: "الأكثر طلباً",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "باقة صيانة المكيفات",
      originalPrice: "399",
      discountPrice: "249",
      savings: "150",
      description: "صيانة شاملة لجميع المكيفات",
      features: [
        "فحص وتنظيف المكيفات",
        "تغيير الفلاتر",
        "فحص غاز التبريد",
        "ضمان شهرين"
      ],
      timeLeft: "72 ساعة",
      badge: "توفير 38%",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "عرض مكافحة الحشرات",
      originalPrice: "299",
      discountPrice: "199",
      savings: "100",
      description: "حماية كاملة من جميع أنواع الحشرات",
      features: [
        "رش آمن وفعال",
        "ضمان 6 أشهر",
        "متابعة مجانية",
        "مواد صديقة للبيئة"
      ],
      timeLeft: "24 ساعة",
      badge: "عرض محدود",
      color: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* العنوان الرئيسي */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <span className="text-emerald-800 font-medium">عروض محدودة الوقت</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                عروض خاصة
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              وفر حتى 40% على خدماتنا المتميزة مع ضمان الجودة والسرعة في التنفيذ
            </p>
          </div>

          {/* البطاقات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* الخلفية المتدرجة */}
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <CardContent className="p-8 relative">
                  {/* الباج والوقت المتبقي */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge className={`bg-gradient-to-r ${offer.color} text-white border-0 px-3 py-1`}>
                      <Gift className="h-3 w-3 ml-1" />
                      {offer.badge}
                    </Badge>
                    <div className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                      <Clock className="h-4 w-4" />
                      {offer.timeLeft}
                    </div>
                  </div>

                  {/* العنوان والوصف */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                  <p className="text-gray-600 mb-6">{offer.description}</p>

                  {/* الأسعار */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-emerald-600">{offer.discountPrice} ريال</span>
                      <span className="text-lg text-gray-500 line-through">{offer.originalPrice} ريال</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-0">
                        وفر {offer.savings} ريال
                      </Badge>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">4.9</span>
                      </div>
                    </div>
                  </div>

                  {/* المميزات */}
                  <ul className="space-y-3 mb-8">
                    {offer.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* أزرار الإجراء */}
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowOffers(true)}
                      className={`w-full bg-gradient-to-r ${offer.color} hover:opacity-90 text-white py-3 text-lg font-semibold`}
                    >
                      احجز الآن
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => window.open("tel:+966501234567", "_self")}
                      >
                        <Phone className="h-4 w-4" />
                        اتصل
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => window.open("https://wa.me/966501234567", "_blank")}
                      >
                        <MessageCircle className="h-4 w-4" />
                        واتساب
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* دعوة للعمل النهائية */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              ⚡ العروض محدودة الوقت - لا تفوت الفرصة!
            </p>
            <Button 
              onClick={() => setShowOffers(true)}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg"
            >
              <Gift className="h-5 w-5 ml-2" />
              اطلع على جميع العروض
            </Button>
          </div>
        </div>
      </section>

      {showOffers && (
        <SpecialOffersModal 
          isOpen={showOffers} 
          onClose={() => setShowOffers(false)} 
        />
      )}
    </>
  );
};

export default SpecialOffersSection;
