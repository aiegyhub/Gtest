import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import useScrollToTop from "@/hooks/useScrollToTop";
import Index from "./pages/Index";
import SaudiArabia from "./pages/SaudiArabia";
import CityServices from "./pages/CityServices";
import ServiceDetail from "./pages/ServiceDetail";
import CityServiceDetail from "./pages/CityServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Sitemap from "./pages/Sitemap";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              {/* 
                ====================================================================
                CRITICAL: GOOGLE ANALYTICS CONFIGURATION
                ====================================================================
                Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 
                Measurement ID for website tracking to function correctly.
                
                Example: 'G-123ABC456D'
                ====================================================================
              */}
              <AnalyticsProvider trackingId="G-XXXXXXXXXX">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/sa" element={<SaudiArabia />} />
                  <Route path="/sa/:citySlug" element={<CityServices />} />
                  <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
                  <Route path="/sa/:citySlug/:serviceSlug" element={<CityServiceDetail />} />
                  <Route path="/sa/:citySlug/:serviceSlug/:subServiceSlug" element={<CityServiceDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnalyticsProvider>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;