
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Phone, MessageCircle } from "lucide-react";
import { smartSearchFAQs, getQuickSuggestions } from "@/data/enhancedFaqData";
import { useState } from "react";

interface FAQSectionProps {
  serviceName?: string;
  cityName?: string;
  showSearch?: boolean;
}

const FAQSection = ({ serviceName, cityName, showSearch = true }: FAQSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // الحصول على الأسئلة الشائعة المناسبة
  const getFAQs = () => {
    if (searchQuery.trim()) {
      return smartSearchFAQs(searchQuery, { serviceName, cityName });
    }
    
    // الأسئلة الافتراضية حسب السياق
    const contextFAQs = smartSearchFAQs('', { serviceName, cityName }).slice(0, 8);
    
    if (contextFAQs.length > 0) {
      return contextFAQs;
    }
    
    // أسئلة عامة افتراضية
    return [
      {
        id: 'default1',
        question: serviceName ? `ما هي أسعار ${serviceName}؟` : 'ما هي أسعاركم؟',
        answer: serviceName 
          ? `أسعار ${serviceName} تختلف حسب حجم العمل والمنطقة. يمكنك الحصول على عرض سعر مجاني عبر التواصل معنا.`
          : 'أسعارنا تنافسية وتختلف حسب نوع الخدمة. احصل على عرض سعر مجاني بالتواصل معنا.',
        category: 'service' as const,
        keywords: ['أسعار', 'تكلفة'],
        priority: 10,
        quickActions: [
          { type: 'call' as const, label: 'اتصل للسعر' },
          { type: 'quote' as const, label: 'عرض سعر مجاني' }
        ]
      },
      {
        id: 'default2',
        question: "هل تقدمون ضمان على الخدمة؟",
        answer: "نعم، نقدم ضمان شامل على جميع خدماتنا حسب نوع الخدمة المطلوبة مع متابعة ما بعد الخدمة.",
        category: 'general' as const,
        keywords: ['ضمان', 'جودة'],
        priority: 9
      },
      {
        id: 'default3',
        question: cityName ? `كم يستغرق الوصول في ${cityName}؟` : "كم من الوقت تستغرق الخدمة؟",
        answer: cityName 
          ? `في ${cityName}، نصل عادة خلال 30-60 دقيقة للخدمات العادية و15-30 دقيقة للطوارئ.`
          : "مدة الخدمة تعتمد على حجم العمل، ولكن معظم الخدمات تتم في نفس اليوم.",
        category: 'city' as const,
        keywords: ['وقت', 'مدة'],
        priority: 8
      },
      {
        id: 'default4',
        question: "هل الخدمة متاحة في عطلة نهاية الأسبوع؟",
        answer: "نعم، نقدم خدماتنا طوال أيام الأسبوع بما في ذلك عطلة نهاية الأسبوع، وخدمة طوارئ 24/7.",
        category: 'general' as const,
        keywords: ['متاح', 'عطلة'],
        priority: 7
      }
    ];
  };

  const faqs = getFAQs();
  const suggestions = getQuickSuggestions({ serviceName, cityName });

  const handleQuickAction = (action: { type: string; label: string }) => {
    const phoneNumber = '+966546331988';
    
    switch (action.type) {
      case 'call':
        window.open(`tel:${phoneNumber}`, '_self');
        break;
      case 'whatsapp':
        const whatsappText = `مرحباً، أريد الاستفسار عن ${serviceName || 'خدماتكم'}${cityName ? ` في ${cityName}` : ''}`;
        window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsappText)}`, '_blank');
        break;
      case 'quote':
        const quoteText = `أريد عرض سعر للخدمة: ${serviceName || 'الخدمات المنزلية'}${cityName ? ` في ${cityName}` : ''}`;
        window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(quoteText)}`, '_blank');
        break;
    }
  };

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <HelpCircle className="h-6 w-6" />
          الأسئلة الشائعة
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          إجابات فورية على أكثر الأسئلة شيوعاً {serviceName ? `حول ${serviceName}` : ''} {cityName ? `في ${cityName}` : ''}
        </p>
      </div>

      {showSearch && (
        <Card className="p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="ابحث في الأسئلة الشائعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button 
              onClick={() => setSearchQuery('')}
              variant="outline"
              className="px-4"
            >
              مسح
            </Button>
          </div>
        </Card>
      )}

      {/* اقتراحات سريعة */}
      {!searchQuery && suggestions.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3 text-gray-900">اقتراحات سريعة:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery(suggestion)}
                className="text-sm"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.id || index} value={index.toString()} className="px-6">
                <AccordionTrigger className="text-right hover:text-blue-600">
                  <span className="flex items-start gap-2">
                    {faq.priority && faq.priority >= 9 && (
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full mt-1">
                        مهم
                      </span>
                    )}
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <div className="space-y-3">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                    
                    {/* الأزرار السريعة */}
                    {faq.quickActions && faq.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t">
                        {faq.quickActions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            size="sm"
                            variant={action.type === 'call' ? 'default' : 'outline'}
                            onClick={() => handleQuickAction(action)}
                            className="text-xs"
                          >
                            {action.type === 'call' && <Phone className="h-3 w-3 ml-1" />}
                            {action.type === 'whatsapp' && <MessageCircle className="h-3 w-3 ml-1" />}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* قسم التواصل السريع */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-3">لم تجد إجابة لسؤالك؟</h3>
          <p className="text-gray-600 mb-4">تواصل معنا مباشرة للحصول على مساعدة فورية</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => handleQuickAction({ type: 'call', label: 'اتصل بنا' })}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Phone className="h-4 w-4 ml-2" />
              اتصل الآن: +966546331988
            </Button>
            <Button 
              onClick={() => handleQuickAction({ type: 'whatsapp', label: 'واتساب' })}
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              <MessageCircle className="h-4 w-4 ml-2" />
              واتساب مباشر
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FAQSection;
