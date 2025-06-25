export interface EnhancedFAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'service' | 'city' | 'emergency' | 'pricing' | 'coverage' | 'scheduling';
  serviceType?: string;
  cityName?: string;
  keywords: string[];
  priority: number; // 1-10, higher = more important
  contextSensitive?: boolean;
  quickActions?: {
    type: 'call' | 'whatsapp' | 'booking' | 'quote';
    label: string;
  }[];
  relatedQuestions?: string[];
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night' | 'any';
  season?: 'summer' | 'winter' | 'any';
}

// الأسئلة العامة المحسنة
export const enhancedGeneralFAQs: EnhancedFAQ[] = [
  {
    id: 'gen1',
    question: 'ما هي شركة توب كلينرز؟',
    answer: 'توب كلينرز هي الشركة الرائدة في مجال خدمات التنظيف والصيانة المنزلية في منطقة عسير والمناطق المجاورة. نقدم خدمات احترافية عالية الجودة مع ضمان الرضا 100% وفريق مدرب ومرخص.',
    category: 'general',
    keywords: ['شركة', 'توب كلينرز', 'من نحن', 'تعريف', 'الرائدة', 'خدمات'],
    priority: 10,
    quickActions: [
      { type: 'call', label: 'اتصل بنا الآن' },
      { type: 'whatsapp', label: 'واتساب' }
    ],
    relatedQuestions: ['ما هي خدماتكم؟', 'أين تقع مكاتبكم؟'],
    timeOfDay: 'any',
    season: 'any'
  },
  {
    id: 'gen2',
    question: 'ما هي المناطق التي تغطونها؟',
    answer: 'نغطي منطقة عسير بالكامل والمناطق المجاورة:\n🏙️ المدن الرئيسية: أبها، خميس مشيط، بيشة، محايل عسير\n🏘️ المراكز والقرى: النماص، تنومة، ظهران الجنوب، سراة عبيدة\n📍 المناطق المجاورة: جازان، نجران، الباحة\n⚡ استجابة سريعة في جميع المناطق المغطاة',
    category: 'coverage',
    keywords: ['مناطق', 'تغطية', 'خدمة', 'مدن', 'عسير', 'أبها', 'خميس مشيط', 'بيشة'],
    priority: 9,
    contextSensitive: true,
    quickActions: [
      { type: 'call', label: 'تأكيد التغطية' },
      { type: 'quote', label: 'طلب عرض سعر' }
    ],
    timeOfDay: 'any',
    season: 'any'
  },
  {
    id: 'gen3',
    question: 'كيف يمكنني حجز خدمة؟',
    answer: 'يمكنك حجز الخدمة بسهولة:\n📞 الاتصال المباشر: +966546331988\n💬 واتساب فوري: نفس الرقم\n🌐 الموقع الإلكتروني: نموذج الحجز\n🤖 المساعد الذكي: هنا مباشرة\n\n⏰ متاح 24/7 للطوارئ\n📋 تقييم مجاني قبل البدء',
    category: 'general',
    keywords: ['حجز', 'طلب خدمة', 'تواصل', 'موعد', 'اتصال', 'واتساب'],
    priority: 10,
    quickActions: [
      { type: 'call', label: 'احجز الآن' },
      { type: 'whatsapp', label: 'واتساب' },
      { type: 'booking', label: 'حجز سريع' }
    ],
    timeOfDay: 'any',
    season: 'any'
  },
  {
    id: 'gen4',
    question: 'هل تقدمون ضمان على الخدمات؟',
    answer: 'نعم، نقدم ضمان شامل متدرج:\n🛡️ ضمان الجودة: حتى 5 سنوات\n✅ ضمان الرضا: 100%\n🔧 ضمان قطع الغيار: حسب النوع\n📋 شهادات معتمدة ومرخصة\n🔄 إعادة الخدمة مجاناً إذا لم تكن راضي\n📞 متابعة ما بعد الخدمة',
    category: 'general',
    keywords: ['ضمان', 'جودة', 'تأمين', 'حماية', 'رضا', 'شهادات'],
    priority: 8,
    quickActions: [
      { type: 'call', label: 'استفسر عن الضمان' }
    ],
    timeOfDay: 'any',
    season: 'any'
  },
  {
    id: 'gen5',
    question: 'ما هي ساعات العمل؟',
    answer: 'نعمل لخدمتك على مدار الساعة:\n🕐 الخدمات العادية: 8 ص - 10 م\n🚨 خدمات الطوارئ: 24/7\n📅 أيام العمل: السبت - الخميس\n🕌 الجمعة: 2 م - 10 م\n⚡ استجابة فورية للطوارئ خلال 15-30 دقيقة',
    category: 'scheduling',
    keywords: ['ساعات عمل', 'مواعيد', 'طوارئ', 'وقت', '24/7', 'متاح'],
    priority: 9,
    timeOfDay: 'any',
    season: 'any'
  }
];

// أسئلة الخدمات المحسنة
export const enhancedServiceFAQs: EnhancedFAQ[] = [
  {
    id: 'ser1',
    question: 'كم تكلفة خدمات التنظيف؟',
    answer: 'أسعار التنظيف تبدأ من:\n💰 تنظيف عادي: 200-300 ريال\n🏠 تنظيف شامل: 350-500 ريال\n✨ تنظيف عميق: 500-800 ريال\n🪟 تنظيف النوافذ: 150-250 ريال\n\nالسعر يعتمد على:\n📏 حجم المساحة\n🏢 نوع العقار\n📍 الموقع الجغرافي',
    category: 'pricing',
    serviceType: 'تنظيف',
    keywords: ['أسعار', 'تكلفة', 'تنظيف', 'منازل', 'سعر', 'فلوس'],
    priority: 10,
    quickActions: [
      { type: 'quote', label: 'عرض سعر مجاني' },
      { type: 'call', label: 'استفسر الآن' }
    ],
    timeOfDay: 'any',
    season: 'any'
  },
  {
    id: 'ser2',
    question: 'كم تستغرق خدمة مكافحة الحشرات؟',
    answer: 'مدة مكافحة الحشرات:\n⏰ شقة صغيرة: 1-2 ساعة\n🏠 منزل متوسط: 2-3 ساعات\n🏢 فيلا كبيرة: 3-4 ساعات\n\n📈 النتائج:\n✅ فعالة خلال 24-48 ساعة\n🛡️ حماية تدوم 3-6 أشهر\n🔄 متابعة مجانية بعد أسبوع',
    category: 'service',
    serviceType: 'مكافحة حشرات',
    keywords: ['مكافحة حشرات', 'مدة', 'وقت', 'نتائج', 'حشرات', 'رش'],
    priority: 9,
    season: 'summer',
    quickActions: [
      { type: 'call', label: 'حجز فوري' },
      { type: 'whatsapp', label: 'استشارة سريعة' }
    ],
    timeOfDay: 'any'
  },
  {
    id: 'ser3',
    question: 'هل تصلحون جميع أنواع المكيفات؟',
    answer: 'نعم، نصلح جميع أنواع المكيفات:\n❄️ سبليت (Split)\n🪟 شباك (Window)\n🏢 مركزي (Central)\n📦 كاسيت (Cassette)\n💨 دولابي (Floor Standing)\n\n🔧 الماركات المدعومة:\n✅ جميع الماركات المحلية والعالمية\n✅ LG, Samsung, Carrier, Gree\n✅ قطع غيار أصلية',
    category: 'service',
    serviceType: 'صيانة مكيفات',
    keywords: ['مكيفات', 'صيانة', 'تصليح', 'أنواع', 'سبليت', 'شباك', 'مركزي'],
    priority: 9,
    season: 'summer',
    quickActions: [
      { type: 'call', label: 'فحص مجاني' },
      { type: 'quote', label: 'عرض سعر' }
    ],
    timeOfDay: 'any'
  },
  {
    id: 'ser4',
    question: 'ما هي مشاكل السباكة التي تحلونها؟',
    answer: 'نحل جميع مشاكل السباكة:\n💧 تسريبات المياه (طوارئ)\n🚽 انسداد المجاري والمراحيض\n🚿 تركيب وصيانة الحنفيات\n🔧 إصلاح دورات المياه\n🔀 تمديد وتغيير الأنابيب\n🔥 سخانات المياه\n⚡ الضغط المنخفض\n\n🚨 خدمة طوارئ 24/7',
    category: 'service',
    serviceType: 'سباكة',
    keywords: ['سباكة', 'تسريبات', 'مجاري', 'حنفيات', 'انسداد', 'مراحيض'],
    priority: 10,
    contextSensitive: true,
    quickActions: [
      { type: 'call', label: 'طوارئ فوري' },
      { type: 'whatsapp', label: 'تشخيص سريع' }
    ],
    timeOfDay: 'any',
    season: 'any'
  },
  {
    id: 'ser5',
    question: 'هل تنظفون السجاد والموكيت؟',
    answer: 'نعم، متخصصون في تنظيف السجاد:\n🧽 تنظيف بالبخار المتطور\n🧴 مواد آمنة ومعتمدة\n🎯 إزالة البقع العنيدة\n🌸 إزالة الروائح نهائياً\n✨ تجفيف سريع وآمن\n🏠 خدمة منزلية أو بالمعمل\n\n🎨 أنواع السجاد:\n✅ سجاد فارسي وشرقي\n✅ موكيت وسجاد حديث',
    category: 'service',
    serviceType: 'تنظيف السجاد',
    keywords: ['سجاد', 'موكيت', 'تنظيف', 'بخار', 'بقع', 'روائح'],
    priority: 7,
    quickActions: [
      { type: 'quote', label: 'سعر التنظيف' },
      { type: 'call', label: 'حجز موعد' }
    ],
    timeOfDay: 'any',
    season: 'any'
  }
];

// أسئلة المدن والتغطية - محدثة لمنطقة عسير
export const enhancedCityFAQs: EnhancedFAQ[] = [
  {
    id: 'city1',
    question: 'هل تقدمون خدمات في أبها؟',
    answer: 'نعم، نغطي أبها بالكامل:\n🏙️ جميع أحياء أبها\n📍 المناطق المجاورة: خميس مشيط، بللحمر، بللسمر\n👥 فريق متخصص محلي\n⚡ وصول خلال 30 دقيقة\n🚨 طوارئ خلال 15 دقيقة\n\n🏘️ الأحياء الرئيسية:\nالمنهل، الموظفين، الشرفة، الشفا، حي الكرامة، الجرة',
    category: 'city',
    cityName: 'أبها',
    keywords: ['أبها', 'خدمات', 'متاح', 'أحياء', 'تغطية', 'عسير'],
    priority: 10,
    contextSensitive: true,
    quickActions: [
      { type: 'call', label: 'خدمة أبها' },
      { type: 'booking', label: 'احجز في أبها' }
    ],
    timeOfDay: 'any',
    season: 'any'
  },
  {
    id: 'city2',
    question: 'كم يستغرق الوصول في خميس مشيط؟',
    answer: 'أوقات الوصول في خميس مشيط:\n⏰ الخدمة العادية: 30-45 دقيقة\n🚨 الطوارئ: 15-25 دقيقة\n🏪 المركز التجاري: 20-30 دقيقة\n🏞️ الأحياء الطرفية: 35-45 دقيقة\n\n📍 نغطي أيضاً:\n✅ حي الشرق، حي الغرب، حي الوسط\n✅ المناطق الصناعية والتجارية',
    category: 'city',
    cityName: 'خميس مشيط',
    keywords: ['خميس مشيط', 'وصول', 'وقت', 'طوارئ', 'أحياء'],
    priority: 9,
    contextSensitive: true,
    timeOfDay: 'any',
    season: 'any'
  },
  {
    id: 'city3',
    question: 'هل تخدمون بيشة ومحايل عسير؟',
    answer: 'نعم، نخدم المنطقة الجنوبية بالكامل:\n🏢 بيشة ومراكزها التابعة\n⚡ محايل عسير وقراها المحيطة\n🏭 رجال ألمع والمناطق الجبلية\n📍 جميع المراكز والقرى المجاورة\n\n👥 فريق محلي متخصص\n🚛 معدات متطورة في المنطقة',
    category: 'city',
    cityName: 'بيشة',
    keywords: ['بيشة', 'محايل عسير', 'فريق محلي', 'رجال ألمع', 'المنطقة الجنوبية'],
    priority: 9,
    contextSensitive: true,
    timeOfDay: 'any',
    season: 'any'
  }
];

// أسئلة الطوارئ المحسنة
export const enhancedEmergencyFAQs: EnhancedFAQ[] = [
  {
    id: 'emr1',
    question: 'لدي تسريب مياه طارئ، ماذا أفعل؟',
    answer: '🚨 تسريب طارئ - اتبع هذه الخطوات:\n\n⚡ فوراً:\n1️⃣ أغلق مصدر المياه الرئيسي\n2️⃣ اتصل بنا: +966546331988\n3️⃣ ابعد الأثاث والأجهزة الكهربائية\n\n🚗 سنصل خلال 15-30 دقيقة\n🛠️ معدات طوارئ متكاملة\n💧 حل مؤقت فوري + إصلاح نهائي',
    category: 'emergency',
    keywords: ['طوارئ', 'تسريب', 'مياه', 'فوري', 'عاجل'],
    priority: 10,
    contextSensitive: true,
    quickActions: [
      { type: 'call', label: 'طوارئ فوري!' }
    ],
    timeOfDay: 'any',
    season: 'any'
  },
  {
    id: 'emr2',
    question: 'انقطع التكييف في الصيف، هل تأتون بسرعة؟',
    answer: '🔥 انقطاع التكييف في الصيف - أولوية قصوى!\n\n⚡ استجابة فورية:\n🚗 وصول خلال 30-60 دقيقة\n❄️ مروحة طوارئ مؤقتة إذا لزم\n🔧 تشخيص سريع ودقيق\n✅ إصلاح فوري أو بديل مؤقت\n\n🌡️ خاص للصيف:\n📞 خط ساخن للتكييف\n🔄 متابعة حتى الحل النهائي',
    category: 'emergency',
    keywords: ['تكييف', 'صيف', 'طوارئ', 'سريع', 'انقطاع', 'حر'],
    priority: 10,
    season: 'summer',
    quickActions: [
      { type: 'call', label: 'إصلاح فوري!' }
    ],
    timeOfDay: 'any'
  }
];

// دمج جميع الأسئلة
export const allEnhancedFAQs = [
  ...enhancedGeneralFAQs,
  ...enhancedServiceFAQs,
  ...enhancedCityFAQs,
  ...enhancedEmergencyFAQs
];

// البحث الذكي المحسن
export const smartSearchFAQs = (
  query: string,
  context?: {
    cityName?: string;
    serviceName?: string;
    currentPage?: string;
    timeOfDay?: string;
    season?: string;
  }
) => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return allEnhancedFAQs
    .filter(faq => {
      // البحث في الكلمات المفتاحية
      const keywordMatch = faq.keywords.some(keyword =>
        keyword.toLowerCase().includes(normalizedQuery) ||
        normalizedQuery.includes(keyword.toLowerCase())
      );
      
      // البحث في السؤال والجواب
      const contentMatch =
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery);
      
      // مطابقة السياق
      const contextMatch = !context || (
        (!context.cityName || !faq.cityName || faq.cityName === context.cityName) &&
        (!context.serviceName || !faq.serviceType || faq.serviceType === context.serviceName) &&
        (!context.timeOfDay || !faq.timeOfDay || faq.timeOfDay === 'any' || faq.timeOfDay === context.timeOfDay) &&
        (!context.season || !faq.season || faq.season === 'any' || faq.season === context.season)
      );
      
      return (keywordMatch || contentMatch) && contextMatch;
    })
    .sort((a, b) => b.priority - a.priority) // ترتيب حسب الأولوية
    .slice(0, 5);
};

// الحصول على اقتراحات سريعة
export const getQuickSuggestions = (context?: {
  cityName?: string;
  serviceName?: string;
  currentPage?: string;
}) => {
  const suggestions = [
    'ما هي أسعاركم؟',
    'كم يستغرق الوصول؟',
    'هل تقدمون ضمان؟',
    'كيف أحجز خدمة؟'
  ];
  
  if (context?.serviceName) {
    suggestions.unshift(`ما هي خدمات ${context.serviceName}؟`);
  }
  
  if (context?.cityName) {
    suggestions.push(`هل تخدمون ${context.cityName}؟`);
  }
  
  return suggestions;
};
