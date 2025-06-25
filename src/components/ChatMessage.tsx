
import { Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatMessageProps {
  message: Message;
  formatTime: (date: Date) => string;
}

const ChatMessage = ({ message, formatTime }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs px-3 py-2 rounded-lg ${
          message.sender === 'user'
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-white text-gray-800 border rounded-bl-none'
        }`}
      >
        {message.sender === 'bot' && (
          <div className="flex items-center gap-1 mb-1">
            <Bot className="h-3 w-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-600">مساعد ذكي</span>
          </div>
        )}
        <p className="text-sm">{message.text}</p>
        <div className={`flex items-center justify-between mt-1 ${
          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span className="text-xs">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
