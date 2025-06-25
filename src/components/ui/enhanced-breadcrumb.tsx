
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface EnhancedBreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export const EnhancedBreadcrumb = ({ items = [], className }: EnhancedBreadcrumbProps) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs if none provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "الرئيسية", href: "/" }
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      let name = segment;
      if (segment === "sa") name = "الخدمات";
      else if (segment === "about") name = "عن الشركة";
      else if (segment === "contact") name = "تواصل معنا";
      else if (segment === "admin") name = "لوحة التحكم";
      
      breadcrumbs.push({
        name,
        href: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = items.length > 0 ? items : generateBreadcrumbs();

  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 space-x-reverse">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronLeft className="h-4 w-4 text-gray-400 mx-2" />
            )}
            
            {item.current ? (
              <span className="text-sm font-medium text-gray-900">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default EnhancedBreadcrumb;
