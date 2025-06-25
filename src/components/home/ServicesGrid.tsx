
import { useMemo } from "react";
import { Service } from "@/types/services";
import ServiceCard from "./ServiceCard";

interface ServicesGridProps {
  services: Service[];
  onBookService: (serviceName: string) => void;
}

const ServicesGrid = ({ services, onBookService }: ServicesGridProps) => {
  const memoizedServices = useMemo(() => services, [services]);

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">خدماتنا المميزة</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          نقدم مجموعة شاملة من الخدمات المنزلية والتجارية بأعلى معايير الجودة والاحترافية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {memoizedServices.map((service) => (
          <ServiceCard 
            key={service.slug} 
            service={service} 
            onBookService={onBookService}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
