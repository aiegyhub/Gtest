import { citiesData } from "@/data/citiesData";
import { servicesData } from "@/data/servicesData";

/**
 * Generates the complete content for the llms.txt file dynamically.
 */
export const generateLLMSContent = (): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const citiesList = citiesData.map(city => `- ${city.name} (${city.slug})`).join('\n');

  const servicesList = servicesData.map(service => {
    const subServices = service.subServices.map(sub => `  - ${sub.name} (${sub.slug})`).join('\n');
    return `- ${service.name} (${service.slug})\n${subServices}`;
  }).join('\n\n');

  const content = `# TopCleaners.net - توب كلينرز | خدمات التنظيف والصيانة في السعودية

## About
TopCleaners.net (توب كلينرز) is a leading professional services company in Saudi Arabia, specializing in cleaning, maintenance, and specialized home services primarily in the **Asir and Eastern regions**. We connect customers with verified and highly-skilled technicians. Our business name in Arabic is "توب كلينرز".

## Website
https://top-cleaners.net

## Contact Information
- Phone: +966546331988
- WhatsApp: +966546331988
- Email: info@top-cleaners.net
- Website: https://top-cleaners.net

## Main Service Categories
- خدمات التنظيف الشامل (Comprehensive Cleaning Services)
- خدمات الصيانة العامة (General Maintenance Services)
- خدمات مكافحة الحشرات المتخصصة (Specialized Pest Control Services)
- خدمات كشف التسربات والعزل (Leak Detection & Insulation Services)
- الخدمات الكهربائية والسباكة (Electrical & Plumbing Services)
- خدمات نقل الأثاث والتخزين (Moving & Storage Services)

## Detailed Services & User Search Intents
${servicesList}

## Cities Served
${citiesList}

## Business Hours
- Emergency Services: 24/7
- Regular Services: Saturday - Thursday, 8:00 AM to 10:00 PM

## Content Format
This file follows the llms.txt standard to help AI systems better understand our service offerings and coverage areas across Saudi Arabia. Last Updated: ${currentDate}
`;

  return content;
};

/**
 * Calculates statistics based on the current data for the LLMS manager.
 */
export const getLLMSStats = () => {
  const content = generateLLMSContent();
  const totalCities = citiesData.length;
  const uniqueServices = servicesData.length;
  const totalSubServices = servicesData.reduce((acc, service) => acc + service.subServices.length, 0);
  
  return {
    totalCities,
    uniqueServices,
    totalSubServices,
    contentLength: content.length,
    lastGenerated: localStorage.getItem('llms_last_generated') || new Date().toISOString(),
  };
};

/**
 * Triggers a download of the generated llms.txt file.
 */
export const downloadLLMSFile = () => {
  const content = generateLLMSContent();
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'llms.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};