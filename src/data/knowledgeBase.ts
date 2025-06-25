import { citiesData, CityData } from "./citiesData";

export const siteKnowledge = {
  company: {
    name: "توب كلينرز",
    description: "منصة شاملة للعثور على أفضل مقدمي الخدمات المحترفين في منطقة عسير والمناطق المجاورة",
    phone: "+966546331988",
    email: "info@topcleaners.com",
    website: "topcleaners.com",
    workingHours: "24/7 للطوارئ، 8 صباحاً - 10 مساءً للخدمات العادية",
    coverage: "جميع مدن وقرى منطقة عسير في المملكة العربية السعودية"
  },
  
  services: [
    {
      name: "تنظيف المنازل",
      slug: "home-cleaning",
      description: "خدمات تنظيف شاملة للمنازل والشقق بمعايير عالية",
      startingPrice: "200 ريال",
      priceRange: "200-500 ريال",
      currency: "ريال",
      available24x7: false,
      emergencyService: false,
      rating: 4.9,
      reviewCount: 350,
      aseerSpecific: "مناسب لمناخ المنطقة الجبلية",
      subServices: [
        {
          name: "تنظيف عام",
          description: "تنظيف عام شامل للمنزل",
          pricing: "200 ريال"
        },
        {
          name: "تنظيف عميق",
          description: "تنظيف عميق ومتخصص للمنازل الجبلية",
          pricing: "350 ريال"
        },
        {
          name: "تنظيف بعد البناء",
          description: "تنظيف خاص للمنازل الجديدة",
          pricing: "400 ريال"
        }
      ]
    },
    {
      name: "صيانة المكيفات",
      slug: "ac-maintenance",
      description: "صيانة وتنظيف أجهزة التكييف - ضروري في مناخ عسير",
      startingPrice: "120 ريال",
      priceRange: "120-350 ريال",
      currency: "ريال",
      available24x7: true,
      emergencyService: true,
      rating: 4.8,
      reviewCount: 280,
      aseerSpecific: "متخصصون في مكيفات المناطق الجبلية",
      subServices: [
        {
          name: "صيانة دورية",
          description: "صيانة وتنظيف دوري",
          pricing: "120 ريال"
        },
        {
          name: "إصلاح أعطال",
          description: "إصلاح جميع أنواع الأعطال",
          pricing: "200 ريال"
        }
      ]
    },
    {
      name: "خدمات السباكة",
      slug: "plumbing",
      description: "إصلاح وصيانة الأنابيب والحنفيات - خدمة طوارئ",
      startingPrice: "100 ريال",
      priceRange: "100-300 ريال",
      currency: "ريال",
      available24x7: true,
      emergencyService: true,
      rating: 4.7,
      reviewCount: 420,
      aseerSpecific: "خبرة في أنابيب المناطق الجبلية والضغط المرتفع",
      subServices: []
    },
    {
      name: "مكافحة الحشرات",
      slug: "pest-control",
      description: "خدمات مكافحة الحشرات والآفات بمواد آمنة",
      startingPrice: "150 ريال",
      priceRange: "150-450 ريال",
      currency: "ريال",
      available24x7: false,
      emergencyService: false,
      rating: 4.9,
      reviewCount: 250,
      aseerSpecific: "متخصصون في حشرات المناطق الجبلية والمناخ المعتدل",
      subServices: []
    },
    {
      name: "العزل الحراري والمائي",
      slug: "insulation-services",
      description: "خدمات العزل للأسطح والخزانات - مهم جداً في مناخ عسير",
      startingPrice: "300 ريال",
      priceRange: "300-800 ريال",
      currency: "ريال",
      available24x7: false,
      emergencyService: true,
      rating: 4.8,
      reviewCount: 180,
      aseerSpecific: "عزل متخصص للمناخ الجبلي والأمطار الموسمية",
      subServices: []
    },
    {
      name: "صيانة الأجهزة الكهربائية",
      slug: "appliance-repair",
      description: "إصلاح وصيانة جميع الأجهزة المنزلية",
      startingPrice: "80 ريال",
      priceRange: "80-250 ريال",
      currency: "ريال",
      available24x7: true,
      emergencyService: true,
      rating: 4.6,
      reviewCount: 320,
      aseerSpecific: "خبرة في أجهزة المناطق الجبلية والتقلبات الجوية",
      subServices: []
    }
  ],

  // مدن منطقة عسير المستهدفة
  aseerCities: [
    {
      name: "أبها",
      slug: "abha",
      description: "عاصمة منطقة عسير - خدمات شاملة",
      servicesCount: 50,
      rating: 4.9,
      areas: ["المنهل", "الموظفين", "الشرفة", "الشفا", "الكرامة", "الجرة", "الضباب"],
      areasCount: 7,
      altitude: "2200م فوق سطح البحر",
      climate: "معتدل صيفاً، بارد شتاءً"
    },
    {
      name: "خميس مشيط",
      slug: "khamis-mushait",
      description: "المدينة التجارية والصناعية - خدمات متطورة",
      servicesCount: 45,
      rating: 4.8,
      areas: ["الشرق", "الغرب", "الوسط", "الصناعية", "التجارية"],
      areasCount: 5,
      altitude: "2100م فوق سطح البحر",
      climate: "معتدل نسبياً"
    },
    {
      name: "بيشة",
      slug: "bisha",
      description: "المدينة الزراعية - خدمات متخصصة",
      servicesCount: 35,
      rating: 4.7,
      areas: ["المركز", "الصناعية", "الزراعية", "الأحياء الجديدة"],
      areasCount: 4,
      altitude: "1150م فوق سطح البحر",
      climate: "حار صيفاً، معتدل شتاءً"
    },
    {
      name: "محايل عسير",
      slug: "muhayil-aseer",
      description: "المدينة الساحلية - خدمات شاملة",
      servicesCount: 30,
      rating: 4.6,
      areas: ["المركز", "الساحل", "الجبلية"],
      areasCount: 3,
      altitude: "300م فوق سطح البحر",
      climate: "حار رطب صيفاً، معتدل شتاءً"
    },
    {
      name: "النماص",
      slug: "al-namas",
      description: "المدينة الجبلية - خدمات طبيعية",
      servicesCount: 25,
      rating: 4.8,
      areas: ["المركز", "الجبلية", "الزراعية"],
      areasCount: 3,
      altitude: "2800م فوق سطح البحر",
      climate: "بارد معظم السنة"
    }
  ],

  // أسئلة شائعة محسنة لمنطقة عسير
  commonQuestions: [
    {
      question: "ما هي أسعار خدماتكم في منطقة عسير؟",
      answer: "الأسعار تبدأ من 80 ريال للخدمات الأساسية وتختلف حسب نوع الخدمة والموقع الجغرافي في المنطقة. أسعار خاصة لسكان المناطق الجبلية."
    },
    {
      question: "هل تقدمون خدمات طوارئ في جميع مدن عسير؟",
      answer: "نعم، نقدم خدمات طوارئ 24/7 في أبها، خميس مشيط، بيشة، محايل عسير، والنماص. استجابة سريعة خلال 15-45 دقيقة حسب الموقع."
    },
    {
      question: "أي مدن في منطقة عسير تقدمون فيها خدماتكم؟",
      answer: "نقدم خدماتنا في جميع مدن عسير: أبها، خميس مشيط، بيشة، محايل عسير، النماص، تنومة، ظهران الجنوب، سراة عبيدة، وجميع المراكز والقرى التابعة."
    },
    {
      question: "كيف يمكنني حجز خدمة في منطقة عسير؟",
      answer: "يمكنك الحجز عبر الاتصال على +966546331988، أو واتساب، أو من خلال الموقع الإلكتروني. فرق محلية في كل مدينة رئيسية."
    },
    {
      question: "هل تقدمون ضمان على الخدمات في منطقة عسير؟",
      answer: "نعم، نقدم ضمان شامل على جميع خدماتنا في منطقة عسير. مدة الضمان تختلف حسب نوع الخدمة من شهر واحد حتى 5 سنوات."
    },
    {
      question: "ما هي الخدمات المتخصصة للمناطق الجبلية؟",
      answer: "نقدم خدمات متخصصة للمناطق الجبلية مثل: العزل المقاوم للأمطار، صيانة المكيفات للارتفاعات العالية، وأنظمة السباكة للضغط المرتفع."
    },
    {
      question: "هل لديكم خبرة في مناخ منطقة عسير؟",
      answer: "نعم، فرقنا مدربة خصيصاً للعمل في مناخ عسير المتنوع - من المناطق الجبلية الباردة إلى المناطق الساحلية الحارة."
    },
    {
      question: "كم تستغرق خدمة العزل في المناطق الجبلية؟",
      answer: "خدمة العزل تستغرق من يوم إلى 3 أيام حسب حجم المشروع. نستخدم مواد مقاومة للأمطار الموسمية في منطقة عسير."
    }
  ],

  // الكلمات المفتاحية للبحث المخصصة لمنطقة عسير
  aseerSearchIntents: {
    pestControl: [
      "رش دفان", "مكافحة النمل الأبيض", "رش مبيدات قبل البناء", "علاج الرمة",
      "مكافحة الرمة في الجدران", "حشرات المناطق الجبلية", "مكافحة حشرات أبها",
      "طرد الحمام", "تركيب شبك", "حشرات النماص", "مكافحة حشرات خميس مشيط"
    ],
    leakDetection: [
      "تسرب في المناطق الجبلية", "تسريب من سقف البيت", "ضغط المياه في الجبال",
      "تهريب ماء من السقف", "كشف تسريبات أبها", "سباكة المناطق المرتفعة",
      "تسرب تحت البلاط", "حرارة في الأرض", "مشاكل المياه في عسير"
    ],
    insulation: [
      "عزل أسطح المناطق الجبلية", "عزل مائي للأمطار", "عزل فوم عسير",
      "عزل خزانات المياه", "عزل ضد الأمطار الموسمية", "عزل حراري للجبال",
      "عزل الأسطح ضد البرد", "عزل مناسب للمناخ الجبلي"
    ],
    cleaning: [
      "تنظيف منازل أبها", "تنظيف بعد الأمطار", "تنظيف المناطق الجبلية",
      "تنظيف دهون المطبخ", "تنظيف موكيت بالبخار", "تنظيف منازل خميس مشيط",
      "تنظيف فلل النماص", "تنظيف بعد العواصف الترابية"
    ],
    acMaintenance: [
      "صيانة مكيفات الجبال", "مكيفات المناطق المرتفعة", "تنظيف مكيفات أبها",
      "صيانة مكيفات صيف عسير", "إصلاح مكيفات النماص", "مكيفات المناخ الجبلي"
    ]
  },

  // معلومات الحجز المحدثة
  booking: {
    process: "يمكن الحجز عبر الاتصال أو واتساب أو الموقع الإلكتروني",
    paymentMethods: ["نقداً", "فيزا", "ماستركارد", "مدى", "تحويل بنكي", "آبل باي"],
    cancellationPolicy: "يمكن الإلغاء قبل 24 ساعة من الموعد بدون رسوم",
    coverage: "جميع مدن وقرى منطقة عسير",
    emergencyResponse: "15-45 دقيقة حسب الموقع الجغرافي"
  },

  // معلومات الطقس والمواسم في عسير
  seasonalInfo: {
    summer: {
      months: "يونيو - سبتمبر",
      characteristics: "معتدل في المرتفعات، حار في المناطق المنخفضة",
      recommendedServices: ["صيانة مكيفات", "عزل حراري", "تنظيف بعد العواصف"],
      tips: "أفضل وقت للعزل الحراري والصيانة الوقائية"
    },
    winter: {
      months: "ديسمبر - فبراير",
      characteristics: "بارد في المرتفعات، معتدل في المناطق المنخفضة",
      recommendedServices: ["عزل مائي", "صيانة أنظمة التدفئة", "إصلاح تسريبات"],
      tips: "موسم الأمطار - أهمية العزل المائي"
    },
    rainy: {
      months: "مارس - مايو، أكتوبر - نوفمبر",
      characteristics: "أمطار موسمية متفاوتة",
      recommendedServices: ["عزل مائي طارئ", "تنظيف بعد الأمطار", "صيانة الأسطح"],
      tips: "فترة حساسة تتطلب عزل مائي ممتاز"
    }
  }
};

export const getServiceByName = (serviceName: string) => {
  return siteKnowledge.services.find(
    service => service.name.includes(serviceName) || serviceName.includes(service.name)
  );
};

export const getCityByName = (cityName: string) => {
  return siteKnowledge.aseerCities.find(
    city => city.name.includes(cityName) || cityName.includes(city.name)
  );
};

export const findRelevantInfo = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  // البحث في الكلمات المفتاحية المخصصة لعسير
  for (const [category, keywords] of Object.entries(siteKnowledge.aseerSearchIntents)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))) {
      const relatedService = siteKnowledge.services.find(service => 
        service.slug.includes(category.replace('Control', '-control').toLowerCase()) ||
        service.description.toLowerCase().includes(category.toLowerCase())
      );
      if (relatedService) return relatedService;
    }
  }
  
  // البحث في الأسئلة الشائعة
  const matchingFAQ = siteKnowledge.commonQuestions.find(
    faq => faq.question.toLowerCase().includes(lowerQuery) || 
           faq.answer.toLowerCase().includes(lowerQuery)
  );
  
  if (matchingFAQ) return matchingFAQ;
  
  // البحث في الخدمات
  const matchingService = siteKnowledge.services.find(
    service => service.name.toLowerCase().includes(lowerQuery) ||
               service.description.toLowerCase().includes(lowerQuery)
  );
  
  if (matchingService) return matchingService;
  
  // البحث في مدن عسير
  const matchingCity = siteKnowledge.aseerCities.find(
    city => city.name.toLowerCase().includes(lowerQuery)
  );
  
  if (matchingCity) return matchingCity;
  
  return null;
};
