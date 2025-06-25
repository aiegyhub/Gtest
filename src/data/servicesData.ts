import { 
  Home, 
  Snowflake, 
  Wrench, 
  Bug, 
  Zap, 
  Leaf, 
  Palette, 
  Shield,
  Droplet,
  Hammer,
  Car,
  Building
} from "lucide-react";
import { Service, ServiceCategory } from "@/types/services";

export const servicesData: Service[] = [
  {
    name: "تنظيف المنازل",
    slug: "home-cleaning",
    description: "خدمات تنظيف شاملة ومتخصصة للمنازل والشقق بأحدث الأدوات والمواد",
    icon: Home,
    subServices: [
      {
        name: "تنظيف عام شامل",
        slug: "general-cleaning",
        description: "تنظيف شامل لجميع أجزاء المنزل",
        estimatedDuration: "2-4 ساعات"
      },
      {
        name: "تنظيف عميق متخصص",
        slug: "deep-cleaning",
        description: "تنظيف عميق مع التعقيم",
        estimatedDuration: "4-6 ساعات"
      },
      {
        name: "تنظيف بعد التشطيب والبناء",
        slug: "post-construction-cleaning",
        description: "إزالة بقايا البناء والدهانات والغبار بشكل كامل",
        estimatedDuration: "5-8 ساعات"
      },
      {
        name: "تنظيف السجاد والموكيت بالبخار",
        slug: "carpet-steam-cleaning",
        description: "تنظيف وتعقيم السجاد والموكيت في الموقع",
        estimatedDuration: "2-3 ساعات"
      },
       {
        name: "تنظيف الخزانات مع التعقيم",
        slug: "tank-cleaning-sanitization",
        description: "تنظيف خزانات المياه الأرضية والعلوية وتعقيمها",
        estimatedDuration: "2-4 ساعات"
      }
    ],
    pricing: {
      startingPrice: 150,
      currency: "ريال",
      priceRange: "ابتداءً من 150 ريال"
    },
    availability: {
      available24x7: false,
      emergencyService: false,
      advanceBookingRequired: true
    },
    metadata: {
      rating: 4.8,
      reviewCount: 245,
      popularity: 95,
      tags: ["تنظيف", "منازل", "تعقيم", "شقق", "فلل"]
    },
    category: ServiceCategory.CLEANING,
    calculatorConfig: {
      baseMultiplier: 1.2,
      areaMultiplier: 1.5,
      urgencyMultipliers: {
        normal: 1,
        urgent: 1.3,
        emergency: 1.6
      },
      additionalServices: [
        { id: "deep_clean", name: "تنظيف عميق", price: 100 },
        { id: "sanitize", name: "تعقيم وتطهير", price: 80 },
        { id: "carpet_clean", name: "تنظيف السجاد", price: 120 }
      ]
    }
  },
  {
    name: "مكافحة الحشرات",
    slug: "pest-control",
    description: "خدمات مكافحة الحشرات والآفات بمواد آمنة وفعالة مع الضمان.",
    icon: Bug,
    subServices: [
      {
        name: "رش دفان قبل البناء",
        slug: "pre-construction-termite-treatment",
        description: "رش الدفان لحماية المباني من النمل الأبيض (الرمة) قبل صبة النظافة.",
        estimatedDuration: "2-4 ساعات"
      },
      {
        name: "مكافحة الرمة (النمل الأبيض)",
        slug: "termite-control",
        description: "مكافحة وعلاج النمل الأبيض في الجدران والأبواب والأرضيات.",
        estimatedDuration: "3-5 ساعات"
      },
      {
        name: "مكافحة الصراصير والنمل وبق الفراش",
        slug: "crawling-insects-control",
        description: "القضاء على الصراصير والنمل وبق الفراش والحشرات الزاحفة.",
        estimatedDuration: "1-2 ساعة"
      },
      {
        name: "طرد الحمام وتركيب طارد",
        slug: "pigeon-control",
        description: "طرد الحمام وتركيب شبك وأشواك لمنع عودته.",
        estimatedDuration: "2-3 ساعات"
      }
    ],
    pricing: {
      startingPrice: 120,
      currency: "ريال",
      priceRange: "ابتداءً من 120 ريال"
    },
    availability: {
      available24x7: false,
      emergencyService: true,
      advanceBookingRequired: true
    },
    metadata: {
      rating: 4.9,
      reviewCount: 312,
      popularity: 93,
      tags: ["مكافحة حشرات", "رش دفان", "نمل أبيض", "الرمة"]
    },
    category: ServiceCategory.PEST_CONTROL,
    calculatorConfig: {
      baseMultiplier: 1.3,
      areaMultiplier: 2.0,
      urgencyMultipliers: {
        normal: 1,
        urgent: 1.3,
        emergency: 1.8
      },
      additionalServices: [
        { id: "termite_treatment", name: "علاج النمل الأبيض", price: 300 },
        { id: "rodent_control", name: "مكافحة القوارض", price: 180 },
        { id: "warranty_3years", name: "ضمان 3 سنوات", price: 250 }
      ]
    }
  },
    {
    name: "صيانة المكيفات",
    slug: "ac-maintenance",
    description: "صيانة وتنظيف وإصلاح جميع أنواع أجهزة التكييف والتبريد بفريق متخصص.",
    icon: Snowflake,
    subServices: [
      {
        name: "تنظيف مكيفات سبليت وشباك",
        slug: "split-window-ac-cleaning",
        description: "تنظيف شامل للوحدة الداخلية والخارجية للمكيفات.",
        estimatedDuration: "45-60 دقيقة لكل وحدة"
      },
      {
        name: "تعبئة فريون مكيف سبليت",
        slug: "freon-refill",
        description: "فحص وتعبئة الفريون لضمان أفضل أداء تبريد.",
        estimatedDuration: "30-60 دقيقة"
      },
       {
        name: "حل مشكلة تسريب المياه من المكيف",
        slug: "ac-water-leak-fix",
        description: "إصلاح مشاكل تسريب المياه من الوحدة الداخلية.",
        estimatedDuration: "1-2 ساعة"
      },
      {
        name: "صيانة المكيفات المركزية",
        slug: "central-ac-maintenance",
        description: "صيانة وتنظيف أنظمة التكييف المركزي للمباني الكبيرة.",
        estimatedDuration: "3-6 ساعات"
      }
    ],
    pricing: {
      startingPrice: 100,
      currency: "ريال",
      priceRange: "ابتداءً من 100 ريال"
    },
    availability: {
      available24x7: true,
      emergencyService: true,
      advanceBookingRequired: false
    },
    metadata: {
      rating: 4.7,
      reviewCount: 189,
      popularity: 88,
      tags: ["مكيفات", "صيانة", "تبريد", "فريون"]
    },
    category: ServiceCategory.MAINTENANCE,
    calculatorConfig: {
      baseMultiplier: 1.1,
      areaMultiplier: 0.8,
      urgencyMultipliers: {
        normal: 1,
        urgent: 1.4,
        emergency: 1.7
      },
      additionalServices: [
        { id: "filter_replace", name: "استبدال الفلاتر", price: 50 },
        { id: "freon_refill", name: "تعبئة الفريون", price: 120 },
        { id: "full_service", name: "صيانة شاملة", price: 200 }
      ]
    }
  },
  {
    name: "كشف تسريبات المياه",
    slug: "leak-detection",
    description: "كشف تسريبات المياه إلكترونياً بدون تكسير وحل مشاكل الرطوبة.",
    icon: Droplet,
    subServices: [
       {
        name: "كشف تسربات المياه إلكترونياً",
        slug: "electronic-leak-detection",
        description: "استخدام أجهزة حديثة لتحديد مكان التسريب بدقة.",
        estimatedDuration: "1-3 ساعات"
      },
      {
        name: "فحص تسربات الخزانات والمسابح",
        slug: "tank-pool-leak-detection",
        description: "فحص وكشف التسريبات في الخزانات والمسابح.",
        estimatedDuration: "2-4 ساعات"
      },
       {
        name: "حل مشكلة رطوبة الجدران والأسقف",
        slug: "damp-walls-ceiling-fix",
        description: "تحديد مصدر الرطوبة ومعالجته بشكل جذري.",
        estimatedDuration: "3-6 ساعات"
      }
    ],
    pricing: {
      startingPrice: 150,
      currency: "ريال",
      priceRange: "ابتداءً من 150 ريال"
    },
    availability: {
      available24x7: true,
      emergencyService: true,
      advanceBookingRequired: false
    },
    metadata: {
      rating: 4.8,
      reviewCount: 289,
      popularity: 92,
      tags: ["كشف تسريبات", "أجهزة حديثة", "توفير فواتير", "رطوبة"]
    },
    category: ServiceCategory.LEAK_DETECTION,
    calculatorConfig: {
      baseMultiplier: 1.4,
      areaMultiplier: 1.8,
      urgencyMultipliers: {
        normal: 1,
        urgent: 1.5,
        emergency: 2.0
      },
      additionalServices: [
        { id: "detailed_report", name: "تقرير مفصل", price: 100 },
        { id: "repair_service", name: "خدمة الإصلاح", price: 300 },
        { id: "follow_up", name: "متابعة بعد الإصلاح", price: 80 }
      ]
    }
  },
    {
    name: "خدمات العزل",
    slug: "insulation-services",
    description: "خدمات العزل المائي والحراري للأسطح والخزانات بأفضل المواد.",
    icon: Shield,
    subServices: [
       {
        name: "عزل فوم للأسطح (بولي يوريثان)",
        slug: "foam-roof-insulation",
        description: "عزل حراري ومائي للأسطح باستخدام الفوم.",
        estimatedDuration: "1-2 يوم"
      },
      {
        name: "عزل مائي للحمامات والأسطح",
        slug: "waterproofing",
        description: "عزل الأسطح المبلطة والحمامات لمنع التسريب.",
        estimatedDuration: "1-3 أيام"
      },
       {
        name: "عزل الخزانات",
        slug: "tank-insulation",
        description: "عزل الخزانات الأرضية والعلوية لمنع التسريب والحرارة.",
        estimatedDuration: "1-2 يوم"
      }
    ],
    pricing: {
      startingPrice: 35,
      currency: "ريال/متر",
      priceRange: "ابتداءً من 35 ريال/متر"
    },
    availability: {
      available24x7: false,
      emergencyService: true,
      advanceBookingRequired: true
    },
    metadata: {
      rating: 4.9,
      reviewCount: 167,
      popularity: 89,
      tags: ["عزل", "تسريبات", "أسطح", "فوم"]
    },
    category: ServiceCategory.INSULATION,
    calculatorConfig: {
      baseMultiplier: 1.2,
      areaMultiplier: 35.0,
      urgencyMultipliers: {
        normal: 1,
        urgent: 1.4,
        emergency: 1.8
      },
      additionalServices: [
        { id: "membrane_layer", name: "طبقة عازلة إضافية", price: 20 },
        { id: "warranty_5years", name: "ضمان 5 سنوات", price: 500 },
        { id: "thermal_coating", name: "طلاء حراري", price: 25 }
      ]
    }
  },
  {
    name: "خدمات السباكة",
    slug: "plumbing-services",
    description: "إصلاح وصيانة الأعطال، وتركيب الأدوات الصحية، وتسليك المجاري.",
    icon: Wrench,
    subServices: [
       {
        name: "تسليك مجاري بالضغط",
        slug: "high-pressure-drain-cleaning",
        description: "تسليك وتنظيف المجاري المسدودة باستخدام ضغط الماء العالي.",
        estimatedDuration: "1-3 ساعات"
      },
       {
        name: "تركيب سخانات مياه",
        slug: "water-heater-installation",
        description: "تركيب السخانات الفورية والمركزية والعادية.",
        estimatedDuration: "1-2 ساعة"
      },
       {
        name: "حل مشكلة ضعف ضغط المياه",
        slug: "low-water-pressure-fix",
        description: "فحص وإصلاح أسباب ضعف المياه في المنزل.",
        estimatedDuration: "2-4 ساعات"
      },
       {
        name: "تركيب وإصلاح الأدوات الصحية",
        slug: "sanitary-ware-installation",
        description: "تركيب وصيانة المراحيض والمغاسل وأطقم الحمام.",
        estimatedDuration: "1-3 ساعات"
      }
    ],
    pricing: {
      startingPrice: 80,
      currency: "ريال",
      priceRange: "ابتداءً من 80 ريال"
    },
    availability: {
      available24x7: true,
      emergencyService: true,
      advanceBookingRequired: false
    },
    metadata: {
      rating: 4.6,
      reviewCount: 156,
      popularity: 82,
      tags: ["سباكة", "تسريبات", "إصلاح", "مجاري"]
    },
    category: ServiceCategory.PLUMBING,
    calculatorConfig: {
      baseMultiplier: 1.0,
      areaMultiplier: 0.5,
      urgencyMultipliers: {
        normal: 1,
        urgent: 1.5,
        emergency: 2.0
      },
      additionalServices: [
        { id: "leak_detection", name: "كشف التسريبات", price: 150 },
        { id: "pipe_replacement", name: "استبدال الأنابيب", price: 200 },
        { id: "drain_cleaning", name: "تسليك المجاري", price: 180 }
      ]
    }
  },
  {
    name: "خدمات الكهرباء",
    slug: "electrical-services",
    description: "إصلاح وصيانة التمديدات والأعطال الكهربائية بأيدي فنيين معتمدين.",
    icon: Zap,
    subServices: [
       {
        name: "حل ارتفاع فاتورة الكهرباء",
        slug: "high-electricity-bill-solution",
        description: "فحص واكتشاف أسباب ارتفاع استهلاك الكهرباء وتقديم حلول.",
        estimatedDuration: "2-4 ساعات"
      },
      {
        name: "كشف التماس كهربائي",
        slug: "electrical-short-circuit-detection",
        description: "تحديد وإصلاح مشاكل الماس الكهربائي بأمان.",
        estimatedDuration: "1-3 ساعات"
      },
      {
        name: "تأسيس وتمديد كهرباء",
        slug: "electrical-wiring-installation",
        description: "تأسيس وتمديد شبكات الكهرباء للمباني الجديدة والتوسعات.",
        estimatedDuration: "حسب المشروع"
      }
    ],
    pricing: {
      startingPrice: 90,
      currency: "ريال",
      priceRange: "ابتداءً من 90 ريال"
    },
    availability: {
      available24x7: true,
      emergencyService: true,
      advanceBookingRequired: false
    },
    metadata: {
      rating: 4.7,
      reviewCount: 201,
      popularity: 85,
      tags: ["كهرباء", "إصلاح", "فاتورة الكهرباء", "التماس"]
    },
    category: ServiceCategory.MAINTENANCE,
    calculatorConfig: {
      baseMultiplier: 1.1,
      areaMultiplier: 0.6,
      urgencyMultipliers: {
        normal: 1,
        urgent: 1.4,
        emergency: 1.8
      },
      additionalServices: [
        { id: "panel_upgrade", name: "تحديث اللوحة الكهربائية", price: 400 },
        { id: "wiring_check", name: "فحص الأسلاك", price: 150 },
        { id: "safety_inspection", name: "فحص الأمان", price: 100 }
      ]
    }
  },
  {
    name: "نقل الأثاث",
    slug: "moving-services",
    description: "خدمات نقل وتغليف وتخزين الأثاث داخل وخارج المدن بأمان.",
    icon: Car,
    subServices: [
       {
        name: "نقل عفش مع الفك والتركيب",
        slug: "furniture-moving-assembly",
        description: "نقل الأثاث مع فكه وتركيبه من قبل نجارين محترفين.",
        estimatedDuration: "4-8 ساعات"
      },
      {
        name: "دينا نقل عفش",
        slug: "moving-truck-rental",
        description: "توفير سيارات نقل (دينا) مجهزة لنقل الأثاث.",
        estimatedDuration: "حسب الطلب"
      },
      {
        name: "تخزين الأثاث",
        slug: "furniture-storage",
        description: "تخزين الأثاث في مستودعات آمنة ومجهزة.",
        estimatedDuration: "حسب المدة"
      }
    ],
    pricing: {
      startingPrice: 300,
      currency: "ريال",
      priceRange: "ابتداءً من 300 ريال"
    },
    availability: {
      available24x7: false,
      emergencyService: false,
      advanceBookingRequired: true
    },
    metadata: {
      rating: 4.7,
      reviewCount: 145,
      popularity: 80,
      tags: ["نقل", "ترحيل", "تغليف", "عفش"]
    },
    category: ServiceCategory.MOVING,
    calculatorConfig: {
      baseMultiplier: 1.2,
      areaMultiplier: 2.5,
      urgencyMultipliers: {
        normal: 1,
        urgent: 1.4,
        emergency: 1.8
      },
      additionalServices: [
        { id: "packing_materials", name: "مواد التغليف", price: 150 },
        { id: "assembly_service", name: "خدمة التركيب", price: 200 },
        { id: "insurance_coverage", name: "تأمين شامل", price: 100 }
      ]
    }
  }
];