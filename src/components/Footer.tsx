import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { citiesData } from "@/data/citiesData";
import { servicesData } from "@/data/servicesData";

const Footer = () => {
  // Use a static, curated list for consistent UX and SEO
  const importantCities = citiesData.slice(0, 4); // Top 4 cities
  const importantServices = servicesData.slice(0, 5); // Top 5 services

  return (
    <footer className="bg-gray-900 text-white font-arabic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">توب كلينرز</h3>
            <p className="text-gray-300 mb-4">
              منصة شاملة للعثور على أفضل مقدمي الخدمات المحترفين في جميع أنحاء المملكة العربية السعودية.
            </p>
            <div className="space-y-2">
              <a href="tel:+966546331988" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Phone className="h-4 w-4 ml-2" />
                <span>+966546331988</span>
              </a>
              <a href="mailto:info@top-cleaners.net" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail className="h-4 w-4 ml-2" />
                <span>info@top-cleaners.net</span>
              </a>
              <Link to="/contact" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <MapPin className="h-4 w-4 ml-2" />
                <span>المملكة العربية السعودية</span>
              </Link>
            </div>
          </div>

          {/* Important Cities */}
          <div>
            <h4 className="text-lg font-semibold mb-4">أهم المدن</h4>
            <ul className="space-y-2">
              {importantCities.map((city) => (
                <li key={city.slug}>
                  <Link to={`/sa/${city.slug}`} className="text-gray-300 hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
               <li>
                  <Link to="/sa" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                    عرض جميع المدن...
                  </Link>
                </li>
            </ul>
          </div>

          {/* Important Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">أهم الخدمات</h4>
            <ul className="space-y-2">
              {importantServices.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="text-gray-300 hover:text-white transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links & Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط هامة</h4>
            <ul className="space-y-2 mb-6">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">عن الشركة</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">اتصل بنا</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">الشروط والأحكام</Link></li>
            </ul>
            
            <h4 className="text-lg font-semibold mb-4">تابعنا</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com/topcleaners" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/topcleaners" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/topcleaners" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-pink-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://youtube.com/topcleaners" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-300 hover:text-red-400 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-right gap-4">
            <p className="text-gray-400">© {new Date().getFullYear()} توب كلينرز - جميع الحقوق محفوظة</p>
            <p className="text-gray-400">
              Developed by{" "}
              <a 
                href="https://fb.com/elb3sho" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                mحmd Youns
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;