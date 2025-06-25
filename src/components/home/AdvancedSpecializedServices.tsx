import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock, CheckCircle, Zap, Droplets, Bug, Wrench } from "lucide-react";

interface AdvancedSpecializedServicesProps {
  onBookService: (serviceName: string) => void;
}

const AdvancedSpecializedServices = ({ onBookService }: AdvancedSpecializedServicesProps) => {
  const specializedServices = [
    {
      service: "مكافحة الحشرات",
      icon: Bug,
      highlight: "رش دفان ومكافحة الرمة",
      urgencyLevel: "طوارئ 24/7",
      valueProposition: "حماية المباني من النمل الأبيض",
      rating: 4.9,
      priceRange: "200-800 ريال",
      availability: "متاح 24/7",
      color: "from-red-500 to-pink-600"
    },
    {
      service: "كشف التسريبات",
      icon: Droplets,
      highlight: "كشف تسريبات متطور",
      urgencyLevel: "فحص فوري",
      valueProposition: "توفير فواتير المياه والكهرباء",
      rating: 4.8,
      priceRange: "120-600 ريال",
      availability: "حجز مسبق",
      color: "from-blue-500 to-cyan-600"
    },
    {
      service: "خدمات العزل",
      icon: Shield,
      highlight: "عزل فوم متخصص",
      urgencyLevel: "ضمان 5 سنوات",
      valueProposition: "حماية شاملة للأسطح والخزانات",
      rating: 4.7,
      priceRange: "180-800 ريال",
      availability: "حجز مسبق",
      color: "from-purple-500 to-indigo-600"
    },
    {
      service: "خدمات الكهرباء",
      icon: Zap,
      highlight: "حل مشاكل الكهرباء",
      urgencyLevel: "خدمة طوارئ",
      valueProposition: "أمان وكفاءة في الاستهلاك",
      rating: 4.6,
      priceRange: "100-500 ريال",
      availability: "حجز مسبق",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const electricalServices = [
    {
      id: "emergency-electrical",
      name: "صيانة أعطال الكهرباء الطارئة",
      description: "إصلاح فوري لأعطال الكهرباء وانقطاع التيار المفاجئ",
      pricing: "يبدأ من 150 ريال",
      urgency: "طوارئ",
      features: ["خدمة 24/7", "استجابة فورية", "فحص شامل", "ضمان الأمان"],
      rating: 4.8
    },
    {
      id: "electrical-panels",
      name: "تركيب لوحات التوزيع والمفاتيح",
      description: "تركيب وصيانة لوحات الكهرباء ومفاتيح التحكم",
      pricing: "يبدأ من 200 ريال",
      urgency: "حجز مسبق",
      features: ["لوحات حديثة", "مفاتيح ذكية", "حماية من التحميل", "ضمان سنتين"],
      rating: 4.9
    },
    {
      id: "lighting-systems",
      name: "إنارة الحدائق والأسقف",
      description: "تصميم وتركيب أنظمة الإنارة الداخلية والخارجية",
      pricing: "يبدأ من 180 ريال",
      urgency: "حجز مسبق",
      features: ["LED موفر للطاقة", "تحكم ذكي", "إنارة خارجية", "تصميم جمالي"],
      rating: 4.7
    }
  ];

  const cleaningServices = [
    {
      id: "post-construction",
      name: "تنظيف بعد التشطيب",
      description: "تنظيف شامل للمباني الجديدة وإزالة بقايا البناء",
      pricing: "يبدأ من 5 ريال/متر",
      features: ["إزالة الأتربة", "تنظيف الدهانات", "تلميع الأرضيات", "تنظيف النوافذ"],
      rating: 4.9
    },
    {
      id: "restaurant-cleaning",
      name: "تنظيف مداخن المطاعم",
      description: "تنظيف متخصص لشفاطات ومداخن المطاعم التجارية",
      pricing: "يبدأ من 300 ريال",
      features: ["إزالة الدهون", "تنظيف الفلاتر", "تعقيم شامل", "صيانة دورية"],
      rating: 4.8,
      type: "تجاري"
    },
    {
      id: "sewage-cleaning",
      name: "تنظيف وتعقيم البيارات",
      description: "شفط وتنظيف وتعقيم البيارات والصرف الصحي",
      pricing: "يبدأ من 200 ريال",
      features: ["شفط آمن", "تعقيم شامل", "إزالة الروائح", "صيانة وقائية"],
      rating: 4.7,
      type: "طوارئ"
    }
  ];

  const applianceServices = [
    {
      id: "dryer-repair",
      name: "صيانة النشافات والعصرات",
      description: "إصلاح شامل لجميع أنواع النشافات ومشاكل التجفيف",
      pricing: "يبدأ من 120 ريال",
      availability: "متاح يومياً",
      features: ["تشخيص دقيق", "قطع غيار أصلية", "ضمان 6 أشهر", "خدمة منزلية"],
      rating: 4.8
    },
    {
      id: "commercial-fridges",
      name: "صيانة ثلاجات العرض التجارية",
      description: "صيانة متخصصة لثلاجات السوبر ماركت ومحلات العرض",
      pricing: "يبدأ من 200 ريال",
      urgency: "طوارئ 24/7",
      features: ["صيانة فورية", "شحن فريون", "تغيير كمبروسور", "صيانة دورية"],
      rating: 4.9,
      type: "تجاري"
    },
    {
      id: "fridge-seals",
      name: "تركيب غروف التبريد والعوازل",
      description: "تبديل جوانات الثلاجة وإصلاح مشاكل الإغلاق",
      pricing: "يبدأ من 80 ريال",
      availability: "حجز مسبق",
      features: ["جوانات أصلية", "إحكام كامل", "توفير الطاقة", "ضمان سنة"],
      rating: 4.7
    }
  ];

  const plumbingServices = [
    {
      id: "water-heaters",
      name: "تركيب السخانات والفلاتر",
      description: "تركيب وصيانة السخانات وأنظمة تنقية المياه",
      pricing: "يبدأ من 180 ريال",
      availability: "متاح يومياً",
      features: ["سخانات كهربائية", "فلاتر تنقية", "صيانة دورية", "ضمان سنتين"],
      rating: 4.8
    },
    {
      id: "plumbing-networks",
      name: "تمديد الشبكات الجديدة",
      description: "تصميم وتمديد شبكات المياه والصرف للمباني الجديدة",
      pricing: "يبدأ من 15 ريال/متر",
      features: ["تصميم هندسي", "مواسير عالية الجودة", "اختبار الضغط", "ضمان 5 سنوات"],
      rating: 4.9,
      type: "مشاريع"
    },
    {
      id: "restaurant-maintenance",
      name: "صيانة شفاطات المطاعم",
      description: "صيانة وتنظيف شفاطات المطابخ التجارية",
      pricing: "يبدأ من 250 ريال",
      features: ["تنظيف عميق", "صيانة موتور", "تغيير فلاتر", "ضمان 6 أشهر"],
      rating: 4.7,
      type: "تجاري"
    }
  ];

  return (
    <div className="space-y-16">
      {/* خدمات عالية القيمة */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              خدمات عالية القيمة
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              خدمات متخصصة بأحدث التقنيات
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              احصل على أفضل الحلول المتطورة لحماية منزلك وتوفير المال مع ضمان الجودة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializedServices.map((item, index) => {
              const ServiceIcon = item.icon;
              return (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 bg-white">
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${item.color} opacity-10 rounded-bl-full`}></div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 bg-gradient-to-r ${item.color} bg-opacity-10 rounded-lg`}>
                        <ServiceIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        {item.urgencyLevel}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{item.service}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 mr-1">{item.rating}</span>
                      </div>
                      <Badge className="text-xs bg-blue-100 text-blue-800">
                        {item.priceRange}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">{item.highlight}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-700">{item.valueProposition}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-purple-500" />
                        <span className="text-gray-700">{item.availability}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => onBookService(item.service)}
                      className={`w-full bg-gradient-to-r ${item.color} hover:opacity-90 text-white`}
                      size="sm"
                    >
                      احجز الآن - خصومات خاصة
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">
              🔥 خصومات حصرية لفترة محدودة على الخدمات المتخصصة
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span>✅ فحص مجاني</span>
              <span>✅ ضمان مميز</span>
              <span>✅ تقنيات متطورة</span>
              <span>✅ فريق محترف</span>
            </div>
          </div>
        </div>
      </section>

      {/* خدمات الكهرباء المتخصصة */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
              خدمات الكهرباء المتخصصة
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              حلول كهربائية آمنة ومضمونة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              فريق متخصص في جميع أعمال الكهرباء مع ضمان الأمان والجودة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {electricalServices.map((service) => (
              <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-6 w-6 text-orange-600" />
                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                      {service.urgency}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 mr-1">{service.rating}</span>
                    <span className="text-sm font-medium text-orange-600">{service.pricing}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => onBookService(service.name)}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
                    size="sm"
                  >
                    احجز الآن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">
              ⚡ خدمات كهربائية آمنة ومضمونة مع فريق مؤهل
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span>✅ فحص مجاني</span>
              <span>✅ ضمان الأمان</span>
              <span>✅ مواد عالية الجودة</span>
              <span>✅ أسعار تنافسية</span>
            </div>
          </div>
        </div>
      </section>

      {/* باقي الأقسام ... */}
      {/* ... keep existing code for other service sections */}
      {/* Specialized Cleaning Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
              تنظيف متخصص
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              خدمات تنظيف احترافية ومتخصصة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              حلول تنظيف متقدمة للمباني الجديدة والمنشآت التجارية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleaningServices.map((service) => (
              <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="h-6 w-6 text-teal-600" />
                    <div className="flex gap-2">
                      {service.type === "تجاري" && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          تجاري
                        </Badge>
                      )}
                      {service.type === "طوارئ" && (
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          طوارئ
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 mr-1">{service.rating}</span>
                    <span className="text-sm font-medium text-teal-600">{service.pricing}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => onBookService(service.name)}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                    size="sm"
                  >
                    احجز الآن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">
              🧽 تنظيف متخصص بأحدث المعدات والمواد الآمنة
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span>✅ معدات متطورة</span>
              <span>✅ مواد آمنة</span>
              <span>✅ فريق مدرب</span>
              <span>✅ ضمان النظافة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Appliance Services Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              صيانة الأجهزة المنزلية
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              خبراء صيانة الأجهزة الكهربائية
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              فريق متخصص في صيانة جميع الأجهزة المنزلية والتجارية بضمان الجودة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applianceServices.map((service) => (
              <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Wrench className="h-6 w-6 text-blue-600" />
                    <div className="flex gap-2">
                      {service.type === "تجاري" && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          تجاري
                        </Badge>
                      )}
                      {service.urgency === "طوارئ 24/7" && (
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          طوارئ
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 mr-1">{service.rating}</span>
                    <span className="text-sm font-medium text-blue-600">{service.pricing}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => onBookService(service.name)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                    size="sm"
                  >
                    احجز الصيانة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">
              🔧 صيانة موثوقة بقطع غيار أصلية وضمان شامل
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span>✅ تشخيص مجاني</span>
              <span>✅ قطع غيار أصلية</span>
              <span>✅ ضمان معتمد</span>
              <span>✅ خدمة منزلية</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plumbing Services Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-teal-600 to-green-600 text-white">
              السباكة المتقدمة
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              حلول سباكة شاملة ومتطورة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              من التركيبات البسيطة إلى المشاريع الكبيرة مع ضمان الجودة والمتانة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plumbingServices.map((service) => (
              <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="h-6 w-6 text-green-600" />
                    <div className="flex gap-2">
                      {service.type === "مشاريع" && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          مشاريع
                        </Badge>
                      )}
                      {service.type === "تجاري" && (
                        <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                          تجاري
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 mr-1">{service.rating}</span>
                    <span className="text-sm font-medium text-green-600">{service.pricing}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => onBookService(service.name)}
                    className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white"
                    size="sm"
                  >
                    احجز الخدمة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">
              🚰 سباكة احترافية بمواد عالية الجودة وضمان طويل المدى
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span>✅ استشارة مجانية</span>
              <span>✅ مواد معتمدة</span>
              <span>✅ تنفيذ سريع</span>
              <span>✅ ضمان ممتد</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedSpecializedServices;
