
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, X, Minimize2, Maximize2 } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
  toggleChat: () => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  formatTime: (date: Date) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatWindow = ({
  messages,
  isTyping,
  isMinimized,
  setIsMinimized,
  toggleChat,
  newMessage,
  setNewMessage,
  sendMessage,
  handleKeyPress,
  formatTime,
  messagesEndRef
}: ChatWindowProps) => {
  return (
    <Card className={`w-80 shadow-xl transition-all duration-300 ${isMinimized ? 'h-14' : 'h-96'}`}>
      <CardHeader className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <div>
              <h3 className="text-sm font-semibold">مساعد الذكي</h3>
              <p className="text-xs text-blue-100">مدعوم بـ LLM AI</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-blue-800"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-blue-800"
              onClick={toggleChat}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="p-0 h-64 overflow-y-auto bg-gray-50">
            <div className="p-3 space-y-3">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  formatTime={formatTime}
                />
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-lg rounded-bl-none px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Bot className="h-3 w-3 text-blue-600" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            handleKeyPress={handleKeyPress}
          />
        </>
      )}
    </Card>
  );
};

export default ChatWindow;
