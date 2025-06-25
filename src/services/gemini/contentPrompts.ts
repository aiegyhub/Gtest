
import { ContentGenerationRequest } from './geminiTypes';

export const getPageContentPrompt = (request: ContentGenerationRequest): string => {
  const lengthGuide = {
    short: '300-500 كلمة',
    medium: '500-800 كلمة', 
    long: '800-1200 كلمة'
  };

  return `
اكتب محتوى صفحة خدمة متكامل لـ "${request.serviceName}" في "${request.cityName}".

المطلوب:
- طول المحتوى: ${lengthGuide[request.targetLength]}
- يجب أن يكون المحتوى مفيد وغني بالمعلومات
- استخدم العناوين الفرعية (H2, H3)
- اذكر معلومات عن المدينة والأحياء
- اشرح فوائد الخدمة وأهميتها
- اذكر نصائح مفيدة للعملاء
- اكتب بأسلوب مهني وودود
- استخدم الكلمات المفتاحية بشكل طبيعي

${request.subServiceName ? `ركز بشكل خاص على خدمة: ${request.subServiceName}` : ''}

ابدأ بعنوان رئيسي جذاب ثم اكتب المحتوى كاملاً.
`;
};

export const getFAQPrompt = (request: ContentGenerationRequest): string => {
  return `
اكتب 8-10 أسئلة وأجوبة شائعة حول خدمة "${request.serviceName}" في "${request.cityName}".

الأسئلة يجب أن تكون:
- متنوعة وتغطي جوانب مختلفة من الخدمة
- مناسبة للعملاء في ${request.cityName}
- تتضمن أسئلة عن الأسعار، المواعيد، جودة الخدمة
- الأجوبة مفصلة ومفيدة

صيغة الإخراج:
س: [السؤال]
ج: [الجواب المفصل]

${request.subServiceName ? `ركز على خدمة: ${request.subServiceName}` : ''}
`;
};

export const getDescriptionPrompt = (request: ContentGenerationRequest): string => {
  return `
اكتب وصف مختصر وجذاب لخدمة "${request.serviceName}" في "${request.cityName}".

المطلوب:
- طول الوصف: 150-200 كلمة
- يكون مفيد للعملاء المحتملين
- يذكر المزايا الرئيسية
- يحفز على التواصل
- يكون محسن لمحركات البحث

${request.subServiceName ? `ركز على: ${request.subServiceName}` : ''}
`;
};

export const getMetaPrompt = (request: ContentGenerationRequest): string => {
  return `
اكتب عنوان ووصف SEO لصفحة خدمة "${request.serviceName}" في "${request.cityName}".

المطلوب:
1. عنوان الصفحة (Title): 50-60 حرف، يحتوي على الكلمات المفتاحية الرئيسية
2. وصف الصفحة (Meta Description): 150-160 حرف، يحفز على النقر

الصيغة:
العنوان: [العنوان]
الوصف: [الوصف]

${request.subServiceName ? `اذكر: ${request.subServiceName}` : ''}
`;
};
