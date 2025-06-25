
import { Alert, AlertDescription } from "@/components/ui/alert";

const GSCSetupInstructions = () => {
  return (
    <>
      <Alert>
        <AlertDescription>
          <strong>ملاحظة:</strong> ستحتاج إلى إنشاء مشروع في Google Cloud Console وتفعيل 
          Search Console API للحصول على API Key و Access Token.
        </AlertDescription>
      </Alert>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-800">خطوات الإعداد:</h4>
        <ol className="text-sm text-blue-700 space-y-1 mr-4">
          <li>1. انتقل إلى Google Cloud Console</li>
          <li>2. أنشئ مشروعاً جديداً أو اختر مشروعاً موجوداً</li>
          <li>3. فعّل Search Console API</li>
          <li>4. أنشئ credentials (OAuth 2.0 أو Service Account)</li>
          <li>5. انسخ API Key و Access Token هنا</li>
          <li>6. تأكد من إضافة الموقع في Google Search Console</li>
        </ol>
      </div>
    </>
  );
};

export default GSCSetupInstructions;
