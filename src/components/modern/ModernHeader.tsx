import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  MapPin,
  Clock,
  Star,
  Shield,
  ChevronDown
} from "lucide-react";
import EnhancedClickToCall from "../EnhancedClickToCall";
import EnhancedWhatsApp from "../EnhancedWhatsApp";

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: "الرئيسية", href: "/", active: true },
    { name: "الخدمات", href: "/sa", hasDropdown: true },
    { name: "عن الشركة", href: "/about" },
    { name: "تواصل معنا", href: "/contact" },
    { name: "خريطة الموقع", href: "/sitemap" }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-6 space-x-reverse">
              <a href="tel:+966546331988" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                <Phone className="h-4 w-4" />
                <span>+966546331988</span>
              </a>
              <a href="mailto:info@top-cleaners.net" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@top-cleaners.net</span>
              </a>
              <div className="hidden md:flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>خدمة 24/7</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
              <Badge variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30 transition-colors">
                <Star className="h-3 w-3 ml-1" />
                تقييم 4.9/5
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30 transition-colors">
                <Shield className="h-3 w-3 ml-1" />
                مرخص رسمياً
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30 transition-colors">
                <MapPin className="h-3 w-3 ml-1" />
                جميع مدن المملكة
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ت</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                توب كلينرز
              </h1>
              <p className="text-xs text-gray-500">شركة التنظيف الاحترافية</p>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link 
                  to={item.href} 
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                    item.active 
                      ? 'text-blue-600 bg-blue-50 font-semibold' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <EnhancedWhatsApp 
                size="sm"
                variant="outline"
                className="border-green-500 text-white bg-green-600 hover:bg-green-700 hover:text-white"
              />
              <EnhancedClickToCall 
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    item.active 
                      ? 'text-blue-600 bg-blue-50 font-semibold' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <EnhancedWhatsApp 
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              />
              <EnhancedClickToCall 
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default ModernHeader;