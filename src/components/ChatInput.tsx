
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Phone } from "lucide-react";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInput = ({ newMessage, setNewMessage, sendMessage, handleKeyPress }: ChatInputProps) => {
  return (
    <div className="p-3 border-t bg-white rounded-b-lg">
      <div className="flex gap-2 mb-2">
        <Button size="sm" variant="outline" className="flex-1 text-xs">
          <Phone className="h-3 w-3 ml-1" />
          اتصال سريع
        </Button>
        <Button size="sm" variant="outline" className="flex-1 text-xs">
          حجز خدمة
        </Button>
      </div>
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="اكتب رسالتك..."
          className="flex-1 text-sm"
        />
        <Button onClick={sendMessage} size="sm" className="px-3">
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-1 text-center">
        مدعوم بالذكاء الاصطناعي - مساعدة فورية
      </p>
    </div>
  );
};

export default ChatInput;
