
import { GeminiSettings, ChatMessage, ContentGenerationRequest } from './gemini/geminiTypes';
import { getPageContentPrompt, getFAQPrompt, getDescriptionPrompt, getMetaPrompt } from './gemini/contentPrompts';

export class GeminiService {
  private settings: GeminiSettings;
  
  constructor(settings: GeminiSettings) {
    this.settings = settings;
  }

  async generateResponse(
    messages: ChatMessage[], 
    systemPrompt: string,
    context?: any
  ): Promise<string> {
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.settings.model}:generateContent?key=${this.settings.apiKey}`;
      
      const fullSystemPrompt = this.buildSystemPrompt(systemPrompt, context);
      
      const requestBody = {
        contents: [
          {
            role: 'user',
            parts: [{ text: fullSystemPrompt }]
          },
          ...messages
        ],
        generationConfig: {
          temperature: this.settings.temperature,
          maxOutputTokens: this.settings.maxTokens,
          candidateCount: 1
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  async generateServiceContent(request: ContentGenerationRequest): Promise<string> {
    const contentPrompts = {
      page: getPageContentPrompt(request),
      faq: getFAQPrompt(request),
      description: getDescriptionPrompt(request),
      meta: getMetaPrompt(request)
    };

    const prompt = contentPrompts[request.contentType];
    
    const messages: ChatMessage[] = [{
      role: 'user',
      parts: [{ text: prompt }]
    }];

    return await this.generateResponse(messages, this.getContentSystemPrompt(), {
      cityName: request.cityName,
      serviceName: request.serviceName,
      subServiceName: request.subServiceName
    });
  }

  private getContentSystemPrompt(): string {
    return `
أنت خبير في كتابة المحتوى التسويقي لخدمات المنازل في المملكة العربية السعودية.

معلومات الشركة:
- الاسم: دليل الخدمات السعودي
- الهاتف: +966501234567
- التخصص: جميع خدمات المنازل والصيانة

اكتب محتوى:
- باللغة العربية الفصحى المبسطة
- مهني وموثوق
- مفيد للعملاء
- محسن لمحركات البحث
- يحفز على التواصل والحجز

تجنب:
- المبالغة غير المبررة
- الوعود المستحيلة
- التكرار المملل
- المصطلحات التقنية المعقدة
`;
  }

  private buildSystemPrompt(basePrompt: string, context?: any): string {
    let prompt = basePrompt;
    
    if (context) {
      prompt += `\n\nمعلومات السياق الحالي:\n`;
      if (context.currentPage) prompt += `- الصفحة الحالية: ${context.currentPage}\n`;
      if (context.cityName) prompt += `- المدينة المختارة: ${context.cityName}\n`;
      if (context.serviceName) prompt += `- الخدمة المختارة: ${context.serviceName}\n`;
      if (context.userLocation) prompt += `- موقع المستخدم: ${context.userLocation}\n`;
    }
    
    return prompt;
  }
}

export const createGeminiService = (apiKey: string) => {
  const settings: GeminiSettings = {
    apiKey,
    model: 'gemini-pro',
    temperature: 0.7,
    maxTokens: 1000
  };
  
  return new GeminiService(settings);
};

export const getSystemPrompt = () => `
أنت مساعد ذكي لموقع "دليل الخدمات السعودي" وأنت خبير في جميع الخدمات المنزلية في المملكة العربية السعودية.

معلومات الشركة:
- الاسم: دليل الخدمات السعودي
- الهاتف: +966501234567
- البريد الإلكتروني: info@saudiservices.sa
- ساعات العمل: 24/7 للطوارئ، 8 صباحاً - 10 مساءً للخدمات العادية
- التغطية: جميع مدن المملكة العربية السعودية

الخدمات المتاحة:
1. تنظيف المنازل (من 150 ريال)
2. مكافحة الحشرات (من 200 ريال)
3. خدمات الغسالات (من 100 ريال)
4. خدمات الثلاجات (من 120 ريال)
5. خدمات التكييف (من 150 ريال)
6. نقل الأثاث (من 250 ريال)
7. خدمات العزل (من 180 ريال)
8. خدمات السباكة (من 90 ريال)
9. كشف التسريبات (من 120 ريال)

المدن المخدومة: الرياض، جدة، الدمام، حفر الباطن، خميس مشيط، أبها، جيزان، نجران، حائل، تبوك، بريدة، المدينة المنورة.

التعليمات:
- اجب باللغة العربية دائماً
- كن مفيداً ومحترفاً
- قدم معلومات دقيقة عن الأسعار والخدمات
- ساعد في الحجز والاستفسارات
- وجه العملاء لخدمة العملاء عند الحاجة
- استخدم المعلومات المحدثة عن الموقع
- كن ودوداً ومساعداً
- اقترح الخدمات المناسبة حسب احتياج العميل

إذا سأل العميل عن حجز خدمة، ساعده في توضيح الخطوات وقدم له الخيارات المتاحة.
إذا سأل عن الأسعار، قدم له نطاق السعر والعوامل المؤثرة.
إذا احتاج مساعدة فورية، وجهه للاتصال بخدمة العملاء.
`;
