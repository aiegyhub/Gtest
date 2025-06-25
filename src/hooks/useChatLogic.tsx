
import { useState, useEffect } from "react";
import { createGeminiService, getSystemPrompt } from "@/services/geminiService";
import { siteKnowledge, findRelevantInfo } from "@/data/knowledgeBase";
import { generateSmartResponse, ChatContext } from "@/services/smartChatService";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
  confidence?: number;
  quickActions?: {
    type: 'call' | 'whatsapp' | 'booking' | 'quote';
    label: string;
  }[];
}

interface UseChatLogicProps {
  currentPage?: string;
  cityName?: string;
  serviceName?: string;
}

export const useChatLogic = ({ currentPage, cityName, serviceName }: UseChatLogicProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [geminiService, setGeminiService] = useState<any>(null);
  const { toast } = useToast();

  // إعداد السياق للدردشة الذكية
  const chatContext: ChatContext = {
    currentPage,
    cityName,
    serviceName,
    timeOfDay: getCurrentTimeOfDay(),
    season: getCurrentSeason()
  };

  // تحديد الوقت الحالي
  function getCurrentTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  }

  // تحديد الموسم الحالي
  function getCurrentSeason(): 'summer' | 'winter' {
    const month = new Date().getMonth() + 1;
    return (month >= 5 && month <= 9) ? 'summer' : 'winter';
  }

  // رسالة الترحيب الذكية
  const generateWelcomeMessage = (): Message => {
    const timeOfDay = getCurrentTimeOfDay();
    let greeting = '';
    
    switch (timeOfDay) {
      case 'morning': greeting = 'صباح الخير! '; break;
      case 'afternoon': greeting = 'مساء الخير! '; break;
      case 'evening': greeting = 'مساء النور! '; break;
      case 'night': greeting = 'أهلاً وسهلاً! '; break;
    }

    let welcomeText = `${greeting}أنا مساعدك الذكي في توب كلينرز 🤖`;
    
    if (serviceName && cityName) {
      welcomeText += `\n\n🔧 أرى أنك تتصفح خدمة ${serviceName} في ${cityName}`;
    } else if (serviceName) {
      welcomeText += `\n\n🔧 أرى أنك مهتم بخدمة ${serviceName}`;
    } else if (cityName) {
      welcomeText += `\n\n📍 أرى أنك تتصفح خدماتنا في ${cityName}`;
    }

    welcomeText += `\n\nيمكنني مساعدتك في:
📞 الحصول على أرقام التواصل المباشر
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
        { type: 'quote', label: 'عرض سعر مجاني' }
      ]
    };
  };

  // تهيئة المحادثة
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = generateWelcomeMessage();
      setMessages([welcomeMessage]);
    }
  }, [currentPage, cityName, serviceName]);

  // تهيئة خدمة Gemini
  useEffect(() => {
    const geminiSettings = localStorage.getItem('gemini_settings');
    if (geminiSettings) {
      const settings = JSON.parse(geminiSettings);
      if (settings.apiKeys && settings.apiKeys.length > 0) {
        const activeKey = settings.apiKeys.find((key: any) => key.isActive)?.key || settings.apiKeys[0].key;
        setGeminiService(createGeminiService(activeKey));
      }
    }
  }, []);

  // الحصول على الرد المناسب
  const getContextualResponse = async (userMessage: string): Promise<Message> => {
    try {
      // استخدام النظام الذكي المحسن أولاً
      const smartResponse = generateSmartResponse(userMessage, chatContext);
      
      if (smartResponse.confidence >= 70) {
        return {
          id: messages.length + 2,
          text: smartResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          confidence: smartResponse.confidence,
          quickActions: smartResponse.quickActions
        };
      }

      // في حالة الثقة المنخفضة، استخدم AI كمساعد
      if (geminiService && smartResponse.confidence < 70) {
        try {
          const relevantInfo = findRelevantInfo(userMessage);
          
          const context = {
            currentPage,
            cityName,
            serviceName,
            relevantInfo,
            siteInfo: siteKnowledge.company,
            phoneNumber: '+966546331988',
            smartResponse: smartResponse.text // إضافة الرد الذكي كمرجع
          };

          const chatHistory = messages
            .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
            .slice(-5)
            .map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            }));

          const newUserMessage = {
            role: 'user' as const,
            parts: [{ text: userMessage }]
          };

          const aiResponse = await geminiService.generateResponse(
            [...chatHistory, newUserMessage],
            getSystemPrompt(),
            context
          );

          return {
            id: messages.length + 2,
            text: aiResponse,
            sender: 'bot',
            timestamp: new Date(),
            confidence: 85,
            quickActions: [
              { type: 'call', label: 'اتصل للتأكيد' },
              { type: 'whatsapp', label: 'واتساب مباشر' }
            ]
          };
        } catch (aiError) {
          console.error('AI service error:', aiError);
          // العودة للرد الذكي في حالة فشل AI
        }
      }

      // استخدام الرد الذكي في جميع الحالات
      return {
        id: messages.length + 2,
        text: smartResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        confidence: smartResponse.confidence,
        quickActions: smartResponse.quickActions
      };

    } catch (error) {
      console.error('Error getting response:', error);
      
      // رد طوارئ في حالة الخطأ
      return {
        id: messages.length + 2,
        text: `عذراً، حدث خطأ تقني مؤقت. للمساعدة الفورية:

📞 اتصل بنا: +966546331988
💬 واتساب متاح 24/7
🏠 خدمة طوارئ فورية

${cityName ? `فريق ${cityName} جاهز لخدمتك` : 'فرقنا متاحة في جميع المناطق'}
${serviceName ? `متخصصون في ${serviceName}` : ''}`,
        sender: 'bot',
        timestamp: new Date(),
        confidence: 100,
        quickActions: [
          { type: 'call', label: 'اتصال فوري' },
          { type: 'whatsapp', label: 'واتساب طوارئ' }
        ]
      };
    }
  };

  // إرسال رسالة
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

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
        const botResponse = await getContextualResponse(messageText);
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);

        // إشعار للردود ذات الثقة المنخفضة
        if (botResponse.confidence && botResponse.confidence < 70) {
          toast({
            title: "هل كان هذا الرد مفيداً؟",
            description: "للمساعدة المتخصصة، تواصل معنا مباشرة",
            duration: 5000,
          });
        }
      }, typingDelay);
      
    } catch (error) {
      console.error('Error in chat:', error);
      setIsTyping(false);
      
      toast({
        title: "خطأ في الاتصال",
        description: "يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
    chatContext
  };
};
