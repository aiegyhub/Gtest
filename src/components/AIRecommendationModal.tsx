
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AIRecommendationEngine from "./AIRecommendationEngine";

interface AIRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPreferences?: any;
}

const AIRecommendationModal = ({ isOpen, onClose, userPreferences = {} }: AIRecommendationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>التوصيات الذكية</DialogTitle>
        </DialogHeader>
        <AIRecommendationEngine
          isOpen={isOpen}
          onClose={onClose}
          userPreferences={userPreferences}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AIRecommendationModal;
