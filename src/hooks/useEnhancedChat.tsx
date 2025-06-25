
import { useState, useEffect } from "react";
import { generateSmartResponse, getContextualSuggestions, ChatContext, SmartResponse } from "@/services/smartChatService";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  confidence?: number;
  quickActions?: {
    type: 'call' | 'whatsapp' | 'booking' | 'quote';
    label: string;
  }[];
  suggestions?: string[];
}

interface UseEnhancedChatProps {
  context: ChatContext;
}

export const useEnhancedChat = ({ context }: UseEnhancedChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  // رسالة الترحيب الذكية
  const generateWelcomeMessage = (): Message => {
    const currentHour = new Date().getHours();
    let greeting = '';
    
    if (currentHour >= 6 && currentHour < 12) greeting = 'صباح الخير! ';
    else if (currentHour >= 12 && currentHour < 18) greeting = 'مساء الخير! ';
    else if (currentHour >= 18 && currentHour < 22) greeting = 'مساء النور! ';
    else greeting = 'أهلاً وسهلاً! ';

    let welcomeText = `${greeting}أنا مساعدك الذكي في توب كلينرز 🤖`;
    
    if (context.serviceName && context.cityName) {
      welcomeText += `\n\n🔧 أرى أنك تتصفح خدمة ${context.serviceName} في ${context.cityName}`;
    } else if (context.serviceName) {
      welcomeText += `\n\n🔧 أرى أنك مهتم بخدمة ${context.serviceName}`;
    } else if (context.cityName) {
      welcomeText += `\n\n📍 أرى أنك تتصفح خدماتنا في ${context.cityName}`;
    }

    welcomeText += `\n\nيمكنني مساعدتك في:
📞 الحصول على أرقام التواصل المناسبة
💰 معرفة الأسعار والعروض الحالية
⏰ حجز المواعيد وخدمات الطوارئ
📍 التحقق من تغطية منطقتك
❓ الإجابة على جميع استفساراتك

كيف يمكنني مساعدتك اليوم؟`;

    return {
      id: 1,
      text: welcomeText,
      sender: 'bot',
      timestamp: new Date(),
      confidence: 100,
      quickActions: [
        { type: 'call', label: 'اتصال مباشر' },
        { type: 'whatsapp', label: 'واتساب' },
        { type: 'quote', label: 'عرض سعر' }
      ]
    };
  };

  // تهيئة المحادثة
  useEffect(() => {
    if (!isInitialized) {
      const welcomeMessage = generateWelcomeMessage();
      setMessages([welcomeMessage]);
      setSuggestions(getContextualSuggestions(context));
      setIsInitialized(true);
    }
  }, [context, isInitialized]);

  // إرسال رسالة
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // تأخير طبيعي للكتابة
      const typingDelay = 800 + Math.random() * 1200;
      
      setTimeout(async () => {
        // إنشاء الرد الذكي
        const smartResponse: SmartResponse = generateSmartResponse(messageText, context);
        
        const botMessage: Message = {
          id: messages.length + 2,
          text: smartResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          confidence: smartResponse.confidence,
          quickActions: smartResponse.quickActions,
          suggestions: smartResponse.suggestions
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);

        // تحديث الاقتراحات
        if (smartResponse.suggestions) {
          setSuggestions(smartResponse.suggestions);
        }

        // إشعار بجودة الرد إذا كانت منخفضة
        if (smartResponse.confidence < 70) {
          toast({
            title: "هل كان هذا الرد مفيداً؟",
            description: "يمكنك التواصل مباشرة للمساعدة الفورية",
            duration: 5000,
          });
        }
      }, typingDelay);

    } catch (error) {
      console.error('Error in enhanced chat:', error);
      setIsTyping(false);
      
      // رسالة خطأ ودية
      const errorMessage: Message = {
        id: messages.length + 2,
        text: `عذراً، حدث خطأ تقني مؤقت. للمساعدة الفورية:
        
📞 اتصل بنا: +966546331988
💬 واتساب متاح 24/7
🏠 نصل إليك في أي وقت

${context.cityName ? `فريق ${context.cityName} جاهز لخدمتك` : 'فرقنا جاهزة في جميع المناطق'}`,
        sender: 'bot',
        timestamp: new Date(),
        confidence: 100,
        quickActions: [
          { type: 'call', label: 'اتصال فوري' },
          { type: 'whatsapp', label: 'واتساب' }
        ]
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // إرسال اقتراح سريع
  const sendSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  // إجراء سريع
  const executeQuickAction = (action: { type: string; label: string }) => {
    const phoneNumber = '+966546331988';
    
    switch (action.type) {
      case 'call':
        window.open(`tel:${phoneNumber}`, '_self');
        break;
      case 'whatsapp':
        const whatsappText = `مرحباً، أريد الاستفسار عن خدماتكم${context.serviceName ? ` - ${context.serviceName}` : ''}${context.cityName ? ` في ${context.cityName}` : ''}`;
        window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsappText)}`, '_blank');
        break;
      case 'booking':
        sendMessage('أريد حجز موعد للخدمة');
        break;
      case 'quote':
        sendMessage('أريد عرض سعر للخدمة');
        break;
    }
  };

  // مسح المحادثة
  const clearChat = () => {
    const welcomeMessage = generateWelcomeMessage();
    setMessages([welcomeMessage]);
    setSuggestions(getContextualSuggestions(context));
  };

  // تقييم جودة الرد
  const rateResponse = (messageId: number, rating: 'helpful' | 'not_helpful') => {
    // هنا يمكن إضافة تتبع التقييمات لتحسين النظام
    console.log(`Response ${messageId} rated as ${rating}`);
    
    if (rating === 'helpful') {
      toast({
        title: "شكراً لك!",
        description: "تقييمك يساعدنا في تحسين خدمتنا",
        duration: 3000,
      });
    } else {
      toast({
        title: "نعتذر عن ذلك",
        description: "سنعمل على تحسين إجاباتنا. يمكنك التواصل مباشرة معنا",
        duration: 5000,
      });
    }
  };

  return {
    messages,
    isTyping,
    suggestions,
    sendMessage,
    sendSuggestion,
    executeQuickAction,
    clearChat,
    rateResponse,
    context
  };
};
