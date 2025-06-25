
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
  trackingId?: string;
}

const AnalyticsProvider = ({ children, trackingId = "G-XXXXXXXXXX" }: AnalyticsProviderProps) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}', {
        page_title: document.title,
        page_location: window.location.href
      });
    `;
    document.head.appendChild(script2);

    // Google Search Console verification
    const gscMeta = document.createElement('meta');
    gscMeta.name = 'google-site-verification';
    gscMeta.content = 'your-verification-code-here';
    document.head.appendChild(gscMeta);

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(gscMeta);
    };
  }, [trackingId]);

  // Track page views
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', trackingId, {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });

      // Track custom events
      console.log('Page view tracked:', {
        page: location.pathname,
        title: document.title,
        timestamp: new Date().toISOString()
      });
    }
  }, [location, trackingId]);

  // Track form submissions
  const trackFormSubmission = (formType: string, data: any) => {
    if (window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: formType,
        custom_data: data
      });
    }
    console.log('Form submission tracked:', { formType, data });
  };

  // Track phone calls
  const trackPhoneCall = (phoneNumber: string, source: string) => {
    if (window.gtag) {
      window.gtag('event', 'phone_call', {
        event_category: 'contact',
        event_label: source,
        phone_number: phoneNumber
      });
    }
    console.log('Phone call tracked:', { phoneNumber, source });
  };

  // Track WhatsApp clicks
  const trackWhatsAppClick = (message: string, source: string) => {
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'contact',
        event_label: source,
        message_preview: message.substring(0, 50)
      });
    }
    console.log('WhatsApp click tracked:', { message, source });
  };

  // Make tracking functions available globally
  useEffect(() => {
    (window as any).trackFormSubmission = trackFormSubmission;
    (window as any).trackPhoneCall = trackPhoneCall;
    (window as any).trackWhatsAppClick = trackWhatsAppClick;
  }, []);

  return <>{children}</>;
};

export default AnalyticsProvider;
