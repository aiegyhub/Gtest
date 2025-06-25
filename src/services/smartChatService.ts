import { EnhancedFAQ, smartSearchFAQs, getQuickSuggestions as getFaqSuggestions } from '@/data/enhancedFaqData';
import { generateCoverageMessage } from '@/data/neighboringAreas';
import { servicesData } from '@/data/servicesData';

export interface ChatContext {
  currentPage?: string;
  cityName?: string;
  serviceName?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  season?: 'summer' | 'winter';
  userLocation?: string;
}

export interface SmartResponse {
  text: string;
  confidence: number;
  source: 'faq' | 'intelligent' | 'fallback';
  quickActions?: {
    type: 'call' | 'whatsapp' | 'booking' | 'quote';
    label: string;
  }[];
  relatedQuestions?: string[];
  suggestions?: string[];
}

const getServiceInfoByName = (name: string) => {
  const normalizedName = name.toLowerCase();
  return servicesData.find(s => s.name.toLowerCase().includes(normalizedName) || normalizedName.includes(s.name.toLowerCase()));
};

const intelligentResponses = {
  pricing: {
    patterns: ['سعر', 'تكلفة', 'كم', 'فلوس', 'غالي', 'رخيص', 'مجاني', 'عرض'],
    responses: {
      general: 'أسعارنا تنافسية في منطقة عسير والشرقية وتبدأ من 80 ريالاً. للحصول على عرض سعر دقيق لخدمة معينة، يرجى تحديد الخدمة التي تريدها.'
    }
  },
  timing: {
    patterns: ['متى', 'موعد', 'متاح', 'وقت', 'مدة', 'كم ساعة', 'سريع'],
    responses: {
      general: 'نحن متاحون 24/7 للطوارئ. الخدمات العادية من 8 صباحاً حتى 10 مساءً.',
    }
  },
  coverage: {
    patterns: ['تخدمون', 'تغطون', 'تجون', 'منطقة'],
    responses: {
      general: 'نغطي جميع مدن وقرى منطقة عسير والمنطقة الشرقية. ما هي المدينة التي تسأل عنها تحديداً؟'
    }
  },
  emergency: {
    patterns: ['طوارئ', 'طارئ', 'عاجل', 'مشكلة', 'تسريب'],
    responses: {
      general: 'نعم، نقدم خدمات طوارئ 24/7. ما هي المشكلة التي تواجهها؟ يرجى الاتصال بنا فوراً على +966546331988 للحصول على مساعدة سريعة.'
    }
  },
  quality: {
    patterns: ['ضمان', 'جودة', 'معتمدين', 'موثوق'],
    responses: {
      general: 'نعم، نقدم ضماناً شاملاً على جميع خدماتنا. جميع الفنيين لدينا معتمدون ومدربون لضمان أعلى مستويات الجودة.'
    }
  }
};

const detectQueryType = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  for (const [type, data] of Object.entries(intelligentResponses)) {
    if (data.patterns.some(pattern => lowerQuery.includes(pattern))) {
      return type;
    }
  }
  return 'general';
};

// **Corrected:** Added export keyword
export const getContextualSuggestions = (context: ChatContext): string[] => {
  return getFaqSuggestions(context);
};

export const generateSmartResponse = (
  query: string,
  context: ChatContext = {}
): SmartResponse => {
  const normalizedQuery = query.toLowerCase().trim();
  const faqResults = smartSearchFAQs(query, context);
  if (faqResults.length > 0) {
    const bestMatch = faqResults[0];
    return {
      text: bestMatch.answer,
      confidence: 95,
      source: 'faq',
      quickActions: bestMatch.quickActions,
      suggestions: getContextualSuggestions(context)
    };
  }

  const queryType = detectQueryType(normalizedQuery);

  if (queryType === 'pricing') {
    const serviceNameInQuery = servicesData.find(s => normalizedQuery.includes(s.name.toLowerCase()))?.name;
    const serviceName = context.serviceName || serviceNameInQuery;
    
    if (serviceName) {
      const serviceInfo = getServiceInfoByName(serviceName);
      if (serviceInfo) {
        return {
          text: `خدمة "${serviceInfo.name}" لدينا تبدأ من ${serviceInfo.pricing.priceRange}. السعر النهائي يعتمد على التفاصيل الدقيقة للعمل. يمكننا تزويدك بعرض سعر دقيق ومجاني.`,
          confidence: 88,
          source: 'intelligent',
          quickActions: [{ type: 'quote', label: `عرض سعر لـ${serviceInfo.name}` }, { type: 'call', label: 'اتصل للاستفسار' }],
          suggestions: getContextualSuggestions(context)
        };
      }
    }
    
    return {
      text: intelligentResponses.pricing.responses.general,
      confidence: 80,
      source: 'intelligent',
      quickActions: [{ type: 'booking', label: 'حدد خدمة أولاً' }, { type: 'call', label: 'استفسر عن الأسعار' }],
      suggestions: getContextualSuggestions(context)
    };
  }

  const responseData = intelligentResponses[queryType as keyof typeof intelligentResponses];
  if (responseData) {
    return {
      text: responseData.responses.general,
      confidence: 85,
      source: 'intelligent',
      quickActions: [{ type: 'call', label: 'اتصل الآن' }, { type: 'whatsapp', label: 'واتساب' }],
      suggestions: getContextualSuggestions(context)
    };
  }
  
  return {
    text: `أنا هنا لمساعدتك، لكن لم أفهم طلبك تماماً. هل يمكنك إعادة صياغته؟ يمكنك أيضاً طلب "قائمة الخدمات" أو "مناطق التغطية" أو الاتصال بنا مباشرة.`,
    confidence: 60,
    source: 'fallback',
    quickActions: [{ type: 'call', label: 'تحدث مع خبير' }, { type: 'whatsapp', label: 'واتساب مباشر' }],
    suggestions: getContextualSuggestions(context)
  };
};