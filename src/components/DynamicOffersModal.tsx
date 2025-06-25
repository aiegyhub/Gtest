import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Clock, Star, CheckCircle, Phone, MessageCircle, X } from "lucide-react";

interface DynamicOffersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DynamicOffersModal = ({ isOpen, onClose }: DynamicOffersModalProps) => {
  const [currentOffers, setCurrentOffers] = useState<any[]>([]);

  const allOffers = useMemo(() => [
    {
      title: "عرض التنظيف الشامل",
      originalPrice: "499",
      discountPrice: "299",
      savings: "200",
      description: "تنظيف شامل للمنزل مع تعقيم مجاني",
      features: ["تنظيف جميع الغرف", "تنظيف المطبخ والحمامات", "تعقيم مجاني", "ضمان 7 أيام"],
      timeLeft: "48 ساعة",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "باقة صيانة المكيفات",
      originalPrice: "399",
      discountPrice: "249",
      savings: "150",
      description: "صيانة شاملة لجميع المكيفات",
      features: ["فحص وتنظيف", "تغيير الفلاتر", "فحص غاز التبريد", "ضمان شهرين"],
      timeLeft: "72 ساعة",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "عرض مكافحة الحشرات",
      originalPrice: "299",
      discountPrice: "199",
      savings: "100",
      description: "حماية كاملة من جميع أنواع الحشرات",
      features: ["رش آمن وفعال", "ضمان 6 أشهر", "متابعة مجانية", "مواد صديقة للبيئة"],
      timeLeft: "24 ساعة",
      color: "from-orange-500 to-amber-600"
    },
    {
      title: "خدمة كشف التسريبات",
      originalPrice: "250",
      discountPrice: "150",
      savings: "100",
      description: "كشف دقيق للتسريبات بأجهزة متطورة",
      features: ["فحص شامل", "تقرير مفصل", "إصلاح فوري", "ضمان 3 أشهر"],
      timeLeft: "36 ساعة",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "عزل الأسطح والخزانات",
      originalPrice: "899",
      discountPrice: "599",
      savings: "300",
      description: "عزل فوم متخصص لحماية كاملة",
      features: ["عزل حراري ومائي", "مواد عالية الجودة", "ضمان 5 سنوات", "فريق متخصص"],
      timeLeft: "48 ساعة",
      color: "from-purple-500 to-pink-600"
    },
  ], []);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    const firstOfferIndex = dayOfYear % allOffers.length;
    let secondOfferIndex = (dayOfYear + Math.floor(allOffers.length / 2)) % allOffers.length;
    if (firstOfferIndex === secondOfferIndex) {
      secondOfferIndex = (secondOfferIndex + 1) % allOffers.length;
    }
    
    setCurrentOffers([allOffers[firstOfferIndex], allOffers[secondOfferIndex]]);
  }, [allOffers]);

  const handleCall = () => {
    window.open("tel:+966546331988", "_self"); // Corrected Phone Number
  };

  const handleWhatsApp = (offerTitle: string) => {
    const message = `أهلاً، أهتم بـ "${offerTitle}" المتاح اليوم`;
    window.open(`https://wa.me/966546331988?text=${encodeURIComponent(message)}`, "_blank"); // Corrected Phone Number
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto font-arabic" dir="rtl">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            🎉 عروض اليوم الخاصة
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-0 top-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentOffers.map((offer, index) => (
            <Card key={index} className="overflow-hidden border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <div className={`h-2 bg-gradient-to-r ${offer.color}`} />
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`bg-gradient-to-r ${offer.color} text-white px-3 py-1`}>
                    <Gift className="h-3 w-3 ml-1" />
                    عرض اليوم
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-600 text-sm">
                    <Clock className="h-4 w-4" />
                    {offer.timeLeft}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>

                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-emerald-600">{offer.discountPrice} ريال</span>
                    <span className="text-lg text-gray-500 line-through">{offer.originalPrice} ريال</span>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-0">
                    وفر {offer.savings} ريال
                  </Badge>
                </div>

                <ul className="space-y-2 mb-6">
                  {offer.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button 
                    className={`w-full bg-gradient-to-r ${offer.color} hover:opacity-90 text-white py-2`}
                    onClick={() => handleWhatsApp(offer.title)}
                  >
                    احجز الآن
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={handleCall}>
                      <Phone className="h-4 w-4 mr-1" />
                      اتصل
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleWhatsApp(offer.title)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      واتساب
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-2">
            ⚡ العروض تتغير يومياً - لا تفوت الفرصة!
          </p>
          <Badge variant="outline" className="text-xs">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicOffersModal;