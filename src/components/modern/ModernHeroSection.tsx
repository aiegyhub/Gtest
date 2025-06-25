
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Phone, 
  MessageCircle, 
  Star, 
  Shield, 
  Clock,
  Sparkles,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import EnhancedClickToCall from "../EnhancedClickToCall";
import EnhancedWhatsApp from "../EnhancedWhatsApp";

interface ModernHeroSectionProps {
  onBookService: (serviceName: string) => void;
}

const ModernHeroSection = ({ onBookService }: ModernHeroSectionProps) => {
  const [selectedService, setSelectedService] = useState("تنظيف منازل");

  const services = [
    "تنظيف منازل", "مكافحة حشرات", "كشف تسريبات", 
    "عزل فوم", "صيانة مكيفات", "صيانة أجهزة"
  ];

  const features = [
    { icon: CheckCircle, text: "خدمة 24/7", color: "text-green-500" },
    { icon: Shield, text: "مرخص رسمياً", color: "text-blue-500" },
    { icon: Star, text: "تقييم 4.9/5", color: "text-yellow-500" },
    { icon: Clock, text: "استجابة فورية", color: "text-purple-500" }
  ];

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Main Content */}
          <div className="space-y-8 text-center lg:text-right">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 ml-2" />
                منصة الخدمات الأولى في المملكة
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  توب كلينرز
                </span>
                <br />
                <span className="text-gray-800">
                  دليلك المتخصص
                </span>
                <br />
                <span className="text-gray-600 text-2xl md:text-3xl">
                  للخدمات المنزلية
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                نربطك بأفضل مقدمي الخدمات المحترفين في جميع أنحاء المملكة العربية السعودية
                مع ضمان الجودة والأسعار المناسبة
              </p>
            </div>

            {/* Service Selection */}
            <div className="space-y-4">
              <p className="text-lg font-medium text-gray-700">اختر الخدمة التي تحتاجها:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {services.map((service) => (
                  <Button
                    key={service}
                    variant={selectedService === service ? "default" : "outline"}
                    onClick={() => setSelectedService(service)}
                    className={`${
                      selectedService === service 
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
                        : "text-gray-700 hover:bg-blue-50"
                    } transition-all duration-200`}
                  >
                    {service}
                  </Button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => onBookService(selectedService)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                احجز {selectedService} الآن
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="flex gap-3">
                <EnhancedClickToCall 
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-6"
                />
                <EnhancedWhatsApp 
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-6"
                />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-2 justify-center lg:justify-start">
                    <IconComponent className={`h-5 w-5 ${feature.color}`} />
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    15K+
                  </div>
                  <p className="text-gray-600 font-medium">عميل راضي</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    25+
                  </div>
                  <p className="text-gray-600 font-medium">مدينة</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    50+
                  </div>
                  <p className="text-gray-600 font-medium">خدمة</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    24/7
                  </div>
                  <p className="text-gray-600 font-medium">دعم فني</p>
                </CardContent>
              </Card>
            </div>

            {/* Special Offer Card */}
            <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="h-6 w-6" />
                  <h3 className="text-xl font-bold">عرض خاص</h3>
                </div>
                <p className="mb-4">خصم 20% على الخدمة الأولى</p>
                <Button 
                  variant="secondary" 
                  className="bg-white text-orange-600 hover:bg-orange-50"
                  onClick={() => onBookService(selectedService)}
                >
                  احجز بالخصم
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
