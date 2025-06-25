import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import { useEnhancedChat } from "@/hooks/useEnhancedChat";
import ChatWindow from "./ChatWindow";

interface IntelligentLiveChatProps {
  currentPage?: string;
  cityName?: string;
  serviceName?: string;
}

const IntelligentLiveChat = ({ currentPage, cityName, serviceName }: IntelligentLiveChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, isTyping, sendMessage: sendChatMessage } = useEnhancedChat({
    context: { currentPage, cityName, serviceName },
  });

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // Increment unread count only if chat is closed and the new message is from the bot
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].sender === 'bot') {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, isOpen]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    sendChatMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0); // Reset count when chat is opened
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleChat}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg relative w-16 h-16"
        >
          <Bot className="h-8 w-8" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        toggleChat={toggleChat}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
        formatTime={formatTime}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};

export default IntelligentLiveChat;