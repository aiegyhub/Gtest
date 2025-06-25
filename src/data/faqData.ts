
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'service' | 'city' | 'emergency';
  serviceType?: string;
  cityName?: string;
  keywords: string[];
}

export const generalFAQs: FAQ[] = [
  {
    id: 'gen1',
    question: 'ما هي شركة توب كلينرز؟',
    answer: 'توب كلينرز هي شركة رائدة في مجال خدمات التنظيف والصيانة المنزلية في المملكة العربية السعودية، نقدم خدمات احترافية عالية الجودة لجميع عملائنا.',
    category: 'general',
    keywords: ['شركة', 'توب كلينرز', 'من نحن', 'تعريف']
  },
  {
    id: 'gen2',
    question: 'ما هي المناطق التي تغطونها؟',
    answer: 'نغطي جميع مدن ومحافظات منطقة عسير والمنطقة الشرقية، مع التركيز على المدن الكبرى مثل خميس مشيط، أبها، حفر الباطن، وبيشة.',
    category: 'general',
    keywords: ['مناطق', 'تغطية', 'خدمة', 'مدن']
  },
  {
    id: 'gen3',
    question: 'كيف يمكنني حجز خدمة؟',
    answer: 'يمكنك حجز الخدمة بعدة طرق: الاتصال على +966501234567، التواصل عبر واتساب، أو استخدام نموذج الحجز على موقعنا الإلكتروني.',
    category: 'general',
    keywords: ['حجز', 'طلب خدمة', 'تواصل', 'موعد']
  },
  {
    id: 'gen4',
    question: 'هل تقدمون ضمان على الخدمات؟',
    answer: 'نعم، نقدم ضمان شامل على جميع خدماتنا يتراوح من 3 أشهر إلى سنة كاملة حسب نوع الخدمة المقدمة.',
    category: 'general',
    keywords: ['ضمان', 'جودة', 'تأمين', 'حماية']
  },
  {
    id: 'gen5',
    question: 'ما هي ساعات العمل؟',
    answer: 'نعمل على مدار الساعة طوال أيام الأسبوع لخدمات الطوارئ، أما الخدمات العادية فمن السبت إلى الخميس من 8 صباحاً حتى 10 مساءً.',
    category: 'general',
    keywords: ['ساعات عمل', 'مواعيد', 'طوارئ', 'وقت']
  }
];

export const serviceFAQs: FAQ[] = [
  {
    id: 'ser1',
    question: 'كم تكلفة خدمات التنظيف؟',
    answer: 'تختلف أسعار التنظيف حسب حجم المنزل ونوع التنظيف. التنظيف العادي يبدأ من 200 ريال، والتنظيف الشامل من 350 ريال.',
    category: 'service',
    serviceType: 'تنظيف',
    keywords: ['أسعار', 'تكلفة', 'تنظيف', 'منازل']
  },
  {
    id: 'ser2',
    question: 'كم تستغرق خدمة مكافحة الحشرات؟',
    answer: 'عادة تستغرق خدمة مكافحة الحشرات من ساعة إلى 3 ساعات حسب حجم المنزل ونوع الحشرات. النتائج تظهر خلال 24-48 ساعة.',
    category: 'service',
    serviceType: 'مكافحة حشرات',
    keywords: ['مكافحة حشرات', 'مدة', 'وقت', 'نتائج']
  },
  {
    id: 'ser3',
    question: 'هل تصلحون جميع أنواع المكيفات؟',
    answer: 'نعم، نصلح جميع أنواع وماركات المكيفات: سبليت، شباك، مركزي، كاسيت، وجميع الماركات المحلية والعالمية.',
    category: 'service',
    serviceType: 'صيانة مكيفات',
    keywords: ['مكيفات', 'صيانة', 'تصليح', 'أنواع']
  },
  {
    id: 'ser4',
    question: 'ما هي مشاكل السباكة التي تحلونها؟',
    answer: 'نحل جميع مشاكل السباكة: تسريبات المياه، انسداد المجاري، تركيب وصيانة الحنفيات، إصلاح دورات المياه، وتمديد الأنابيب.',
    category: 'service',
    serviceType: 'سباكة',
    keywords: ['سباكة', 'تسريبات', 'مجاري', 'حنفيات']
  },
  {
    id: 'ser5',
    question: 'هل تنظفون السجاد والموكيت؟',
    answer: 'نعم، نقدم خدمة تنظيف السجاد والموكيت بالبخار والمواد المتخصصة، مع ضمان إزالة البقع والروائح.',
    category: 'service',
    serviceType: 'تنظيف السجاد',
    keywords: ['سجاد', 'موكيت', 'تنظيف', 'بخار']
  }
];

export const cityFAQs: FAQ[] = [
  {
    id: 'city1',
    question: 'هل تقدمون خدمات في خميس مشيط؟',
    answer: 'نعم، نقدم جميع خدماتنا في خميس مشيط وجميع أحيائها. لدينا فريق متخصص ومتاح على مدار الساعة.',
    category: 'city',
    cityName: 'خميس مشيط',
    keywords: ['خميس مشيط', 'خدمات', 'متاح']
  },
  {
    id: 'city2',
    question: 'كم يستغرق الوصول في أبها؟',
    answer: 'في أبها، نصل عادة خلال 30-60 دقيقة من تأكيد الحجز، وفي حالات الطوارئ نصل خلال 15-30 دقيقة.',
    category: 'city',
    cityName: 'أبها',
    keywords: ['أبها', 'وصول', 'وقت', 'طوارئ']
  },
  {
    id: 'city3',
    question: 'هل تخدمون حفر الباطن؟',
    answer: 'نعم، نخدم حفر الباطن والمناطق المحيطة بها. لدينا فريق محلي متخصص في المنطقة الشرقية.',
    category: 'city',
    cityName: 'حفر الباطن',
    keywords: ['حفر الباطن', 'المنطقة الشرقية', 'فريق محلي']
  }
];

export const emergencyFAQs: FAQ[] = [
  {
    id: 'emr1',
    question: 'لدي تسريب مياه طارئ، ماذا أفعل؟',
    answer: 'اتصل بنا فوراً على +966501234567. في الأثناء، أغلق مصدر المياه الرئيسي واتصل بنا. سنصل خلال 15-30 دقيقة.',
    category: 'emergency',
    keywords: ['طوارئ', 'تسريب', 'مياه', 'فوري']
  },
  {
    id: 'emr2',
    question: 'انقطع التكييف في الصيف، هل تأتون بسرعة؟',
    answer: 'نعم، انقطاع التكييف في الصيف حالة طارئة. نصل خلال ساعة واحدة كحد أقصى ونوفر حلول مؤقتة إذا لزم الأمر.',
    category: 'emergency',
    keywords: ['تكييف', 'صيف', 'طوارئ', 'سريع']
  }
];

export const allFAQs = [...generalFAQs, ...serviceFAQs, ...cityFAQs, ...emergencyFAQs];

export const searchFAQs = (query: string, context?: { cityName?: string; serviceName?: string }) => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return allFAQs.filter(faq => {
    const matchesKeywords = faq.keywords.some(keyword => 
      keyword.toLowerCase().includes(normalizedQuery) || 
      normalizedQuery.includes(keyword.toLowerCase())
    );
    
    const matchesQuestion = faq.question.toLowerCase().includes(normalizedQuery);
    const matchesAnswer = faq.answer.toLowerCase().includes(normalizedQuery);
    
    const contextMatch = !context || (
      (!context.cityName || !faq.cityName || faq.cityName === context.cityName) &&
      (!context.serviceName || !faq.serviceType || faq.serviceType === context.serviceName)
    );
    
    return (matchesKeywords || matchesQuestion || matchesAnswer) && contextMatch;
  }).slice(0, 5); // Return top 5 matches
};
