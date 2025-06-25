
export interface NeighboringArea {
  mainCity: string;
  mainCitySlug: string;
  neighboringAreas: {
    name: string;
    slug: string;
    distance: number; // بالكيلومتر
    responseTime: number; // بالدقائق
    serviceType: 'full' | 'limited' | 'emergency_only';
    additionalFee?: number; // رسوم إضافية إن وجدت
  }[];
}

export const neighboringAreasData: NeighboringArea[] = [
  {
    mainCity: 'الرياض',
    mainCitySlug: 'riyadh',
    neighboringAreas: [
      { name: 'الخرج', slug: 'kharj', distance: 77, responseTime: 90, serviceType: 'full' },
      { name: 'الدرعية', slug: 'diriyah', distance: 20, responseTime: 30, serviceType: 'full' },
      { name: 'عرقة', slug: 'irqah', distance: 35, responseTime: 45, serviceType: 'full' },
      { name: 'المزاحمية', slug: 'muzahimiyah', distance: 69, responseTime: 85, serviceType: 'full', additionalFee: 50 },
      { name: 'ضرما', slug: 'dharma', distance: 45, responseTime: 60, serviceType: 'full' },
      { name: 'الأفلاج', slug: 'aflaj', distance: 120, responseTime: 150, serviceType: 'limited', additionalFee: 100 },
      { name: 'وادي الدواسر', slug: 'wadi-dawasir', distance: 450, responseTime: 300, serviceType: 'emergency_only', additionalFee: 200 },
      { name: 'السليل', slug: 'suleil', distance: 380, responseTime: 280, serviceType: 'limited', additionalFee: 150 },
      { name: 'حوطة بني تميم', slug: 'hawtat-bani-tamim', distance: 165, responseTime: 120, serviceType: 'full', additionalFee: 80 }
    ]
  },
  {
    mainCity: 'جدة',
    mainCitySlug: 'jeddah',
    neighboringAreas: [
      { name: 'مكة المكرمة', slug: 'mecca', distance: 79, responseTime: 90, serviceType: 'full' },
      { name: 'رابغ', slug: 'rabigh', distance: 150, responseTime: 120, serviceType: 'full', additionalFee: 75 },
      { name: 'خليص', slug: 'khulais', distance: 78, responseTime: 90, serviceType: 'full' },
      { name: 'الكامل', slug: 'kamel', distance: 95, responseTime: 105, serviceType: 'full' },
      { name: 'ثول', slug: 'thuwal', distance: 80, responseTime: 90, serviceType: 'full' },
      { name: 'الطائف', slug: 'taif', distance: 167, responseTime: 150, serviceType: 'full', additionalFee: 100 },
      { name: 'الليث', slug: 'laith', distance: 280, responseTime: 200, serviceType: 'limited', additionalFee: 150 },
      { name: 'الجموم', slug: 'jumum', distance: 45, responseTime: 50, serviceType: 'full' },
      { name: 'باحة', slug: 'baha', distance: 230, responseTime: 180, serviceType: 'limited', additionalFee: 120 }
    ]
  },
  {
    mainCity: 'الدمام',
    mainCitySlug: 'dammam',
    neighboringAreas: [
      { name: 'الخبر', slug: 'khobar', distance: 17, responseTime: 25, serviceType: 'full' },
      { name: 'الظهران', slug: 'dhahran', distance: 25, responseTime: 30, serviceType: 'full' },
      { name: 'القطيف', slug: 'qatif', distance: 35, responseTime: 45, serviceType: 'full' },
      { name: 'حفر الباطن', slug: 'hafar-albatin', distance: 275, responseTime: 180, serviceType: 'full', additionalFee: 150 },
      { name: 'الجبيل', slug: 'jubail', distance: 83, responseTime: 90, serviceType: 'full' },
      { name: 'الأحساء', slug: 'ahsa', distance: 150, responseTime: 120, serviceType: 'full', additionalFee: 80 },
      { name: 'رأس تنورة', slug: 'ras-tanura', distance: 75, responseTime: 85, serviceType: 'full' },
      { name: 'سيهات', slug: 'sayhat', distance: 40, responseTime: 50, serviceType: 'full' },
      { name: 'تاروت', slug: 'tarout', distance: 42, responseTime: 50, serviceType: 'full' },
      { name: 'الخفجي', slug: 'khafji', distance: 150, responseTime: 120, serviceType: 'limited', additionalFee: 100 }
    ]
  },
  {
    mainCity: 'مكة المكرمة',
    mainCitySlug: 'mecca',
    neighboringAreas: [
      { name: 'جدة', slug: 'jeddah', distance: 79, responseTime: 90, serviceType: 'full' },
      { name: 'الطائف', slug: 'taif', distance: 88, responseTime: 95, serviceType: 'full' },
      { name: 'المدينة المنورة', slug: 'medina', distance: 385, responseTime: 240, serviceType: 'limited', additionalFee: 200 },
      { name: 'الجموم', slug: 'jumum', distance: 54, responseTime: 65, serviceType: 'full' },
      { name: 'بحرة', slug: 'bahrah', distance: 45, responseTime: 55, serviceType: 'full' },
      { name: 'رنية', slug: 'ranyah', distance: 180, responseTime: 140, serviceType: 'limited', additionalFee: 100 }
    ]
  },
  {
    mainCity: 'المدينة المنورة',
    mainCitySlug: 'medina',
    neighboringAreas: [
      { name: 'ينبع', slug: 'yanbu', distance: 220, responseTime: 150, serviceType: 'full', additionalFee: 120 },
      { name: 'بدر', slug: 'badr', distance: 150, responseTime: 110, serviceType: 'full', additionalFee: 80 },
      { name: 'خيبر', slug: 'khaybar', distance: 170, responseTime: 120, serviceType: 'limited', additionalFee: 100 },
      { name: 'العلا', slug: 'alula', distance: 300, responseTime: 200, serviceType: 'limited', additionalFee: 180 },
      { name: 'وادي الفرع', slug: 'wadi-fara', distance: 80, responseTime: 85, serviceType: 'full' },
      { name: 'المهد', slug: 'mahd', distance: 120, responseTime: 100, serviceType: 'full', additionalFee: 60 }
    ]
  },
  {
    mainCity: 'أبها',
    mainCitySlug: 'abha',
    neighboringAreas: [
      { name: 'خميس مشيط', slug: 'khamis-mushait', distance: 25, responseTime: 30, serviceType: 'full' },
      { name: 'بيشة', slug: 'bisha', distance: 90, responseTime: 95, serviceType: 'full' },
      { name: 'النماص', slug: 'namas', distance: 150, responseTime: 120, serviceType: 'full', additionalFee: 80 },
      { name: 'محايل عسير', slug: 'muhayil-asir', distance: 85, responseTime: 90, serviceType: 'full' },
      { name: 'سراة عبيدة', slug: 'sarat-abidah', distance: 70, responseTime: 80, serviceType: 'full' },
      { name: 'تنومة', slug: 'tanuma', distance: 120, responseTime: 105, serviceType: 'full', additionalFee: 60 },
      { name: 'ظهران الجنوب', slug: 'dhahran-janub', distance: 180, responseTime: 140, serviceType: 'limited', additionalFee: 100 }
    ]
  }
];

// البحث عن المناطق المجاورة
export const findNeighboringAreas = (cityName: string): NeighboringArea | null => {
  return neighboringAreasData.find(
    data => data.mainCity === cityName || data.mainCitySlug === cityName
  ) || null;
};

// التحقق من تغطية منطقة معينة
export const checkAreaCoverage = (mainCity: string, targetArea: string) => {
  const neighboringData = findNeighboringAreas(mainCity);
  if (!neighboringData) return null;
  
  return neighboringData.neighboringAreas.find(
    area => area.name === targetArea || area.slug === targetArea
  );
};

// الحصول على معلومات الخدمة لمنطقة معينة
export const getServiceInfo = (mainCity: string, targetArea: string) => {
  const coverage = checkAreaCoverage(mainCity, targetArea);
  if (!coverage) return null;
  
  const serviceLevel = {
    full: 'خدمة شاملة متاحة',
    limited: 'خدمة محدودة',
    emergency_only: 'طوارئ فقط'
  };
  
  return {
    available: true,
    serviceType: serviceLevel[coverage.serviceType],
    responseTime: coverage.responseTime,
    additionalFee: coverage.additionalFee || 0,
    distance: coverage.distance
  };
};

// إنشاء رسالة تلقائية عن التغطية
export const generateCoverageMessage = (mainCity: string, targetArea: string) => {
  const serviceInfo = getServiceInfo(mainCity, targetArea);
  
  if (!serviceInfo) {
    return `عذراً، ${targetArea} خارج نطاق خدمتنا المباشر من ${mainCity}. 
    يمكنك التواصل معنا لترتيب خدمة خاصة أو البحث عن أقرب فرع لك.`;
  }
  
  const feeText = serviceInfo.additionalFee > 0 
    ? `\n💰 رسوم إضافية: ${serviceInfo.additionalFee} ريال`
    : '\n✅ بدون رسوم إضافية';
  
  return `✅ نعم، نخدم ${targetArea} من ${mainCity}
  
📍 نوع الخدمة: ${serviceInfo.serviceType}
⏰ وقت الوصول: ${serviceInfo.responseTime} دقيقة
📏 المسافة: ${serviceInfo.distance} كم${feeText}

📞 احجز الآن: +966546331988`;
};
