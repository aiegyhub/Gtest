import { City } from "@/types/services";
import { servicesData } from "@/data/servicesData";

export const citiesData: City[] = [
  {
    name: "خميس مشيط",
    slug: "khamis-mushait",
    population: "850,000+",
    services: servicesData, // Has all services
    rating: 4.8,
    image: "/images/cities/khamis-mushait.jpg",
    description: "أكبر مدن منطقة عسير ومركز تجاري واقتصادي مهم، نقدم بها جميع خدماتنا الاحترافية.",
    areas: ["وادي بن هشبل", "يعرى", "تندحة", "الحفاير", "الجزيرة", "العمارة"],
    neighborhoods: [
      { name: "وادي بن هشبل", slug: "wadi-bin-hashbal" },
      { name: "يعرى", slug: "yaara" },
      { name: "تندحة", slug: "tandaha" },
      { name: "الحفاير", slug: "al-hafayir" },
      { name: "الجزيرة", slug: "al-jazeera" },
      { name: "العمارة", slug: "al-amara" }
    ],
    stats: {
      customers: "5,000+",
      rating: 4.8,
      responseTime: "30 دقيقة",
      neighborhoods: 6
    }
  },
  {
    name: "أبها",
    slug: "abha",
    population: "450,000+",
    services: servicesData, // Has all services
    rating: 4.9,
    image: "/images/cities/abha.jpg",
    description: "عاصمة منطقة عسير والوجهة السياحية الأولى جنوباً، مع تغطية كاملة لخدماتنا.",
    areas: ["السودة", "الشعف", "مدينة سلطان", "طبب", "دلغان", "تمنية", "العرين", "بني مازن"],
    neighborhoods: [
      { name: "السودة", slug: "al-soudah" },
      { name: "الشعف", slug: "al-shaaf" },
      { name: "مدينة سلطان", slug: "sultan-city" },
      { name: "طبب", slug: "tabbab" },
      { name: "دلغان", slug: "dalgan" },
      { name: "تمنية", slug: "tamaniya" },
      { name: "العرين", slug: "al-areen" },
      { name: "بني مازن", slug: "bani-mazen" }
    ],
    stats: {
      customers: "3,500+",
      rating: 4.9,
      responseTime: "25 دقيقة",
      neighborhoods: 8
    }
  },
  {
    name: "حفر الباطن",
    slug: "hafr-al-batin",
    population: "430,000+",
    services: servicesData, // Has all services
    rating: 4.7,
    image: "/images/cities/hafr-al-batin.jpg",
    description: "المركز الرئيسي لخدماتنا في المنطقة الشرقية، مع تغطية شاملة لجميع الأحياء.",
    areas: ["القيصومة", "مدينة الملك خالد العسكرية", "الصفيري", "الصداوي", "الذيبية", "الرقعي"],
    neighborhoods: [
      { name: "القيصومة", slug: "qaisumah" },
      { name: "مدينة الملك خالد العسكرية", slug: "king-khalid-military-city" },
      { name: "الصفيري", slug: "al-safiri" },
      { name: "الصداوي", slug: "al-sudawi" },
      { name: "الذيبية", slug: "al-thuaibiyah" },
      { name: "الرقعي", slug: "al-ruqai" }
    ],
    stats: {
      customers: "2,800+",
      rating: 4.7,
      responseTime: "40 دقيقة",
      neighborhoods: 6
    }
  },
  {
    name: "بيشة",
    slug: "bisha",
    population: "320,000+",
    services: servicesData.slice(0, 6),
    rating: 4.6,
    image: "/images/cities/bisha.jpg",
    description: "خدمات متخصصة لمدينة بيشة ومراكزها الزراعية.",
    areas: ["صمخ", "تبالة", "الجعبة", "الثنية"],
    neighborhoods: [
      { name: "صمخ", slug: "samakh" },
      { name: "تبالة", slug: "tabala" },
      { name: "الجعبة", slug: "al-jaaba" },
      { name: "الثنية", slug: "al-thaniya" }
    ]
  },
  {
    name: "محايل عسير",
    slug: "mahayel-asir",
    population: "180,000+",
    services: servicesData.slice(0, 5),
    rating: 4.5,
    image: "/images/cities/mahayel-asir.jpg",
    description: "تغطية كاملة لخدمات الصيانة والتنظيف في محايل عسير.",
    areas: ["تهامة بللسمر وبللحمر", "السعيدة", "بحر أبو سكينة"],
    neighborhoods: [
      { name: "تهامة بللسمر وبللحمر", slug: "tihama-ballasamar" },
      { name: "السعيدة", slug: "al-saeeda" },
      { name: "بحر أبو سكينة", slug: "bahr-abu-sakeena" }
    ]
  },
  {
    name: "القيصومة",
    slug: "qaisumah",
    population: "98,000+",
    services: servicesData.slice(0, 8),
    rating: 4.4,
    image: "/images/cities/qaisumah.jpg",
    description: "خدماتنا تمتد لتشمل مدينة القيصومة الحدودية.",
    areas: ["المركز", "الصناعية"],
    neighborhoods: [
      { name: "المركز", slug: "al-markaz" },
      { name: "الصناعية", slug: "al-sinaiya" }
    ]
  },
  {
    name: "تثليث",
    slug: "tathlith",
    population: "95,000+",
    services: servicesData.slice(0, 4), // Added services array
    rating: 4.4,
    image: "/images/cities/tathlith.jpg",
    description: "خدمات أساسية وموثوقة لمدينة تثليث والمراكز التابعة لها.",
    areas: ["الزرق", "الحمضة", "القيرة"],
    neighborhoods: [
      { name: "الزرق", slug: "al-zurq" },
      { name: "الحمضة", slug: "al-hamdha" },
      { name: "القيرة", slug: "al-qayra" }
    ]
  },
  {
    name: "سراة عبيدة",
    slug: "sarat-abidah", 
    population: "85,000+",
    services: servicesData.slice(0, 5), // Added services array
    rating: 4.2,
    image: "/images/cities/sarat-abidah.jpg",
    description: "خدمات متكاملة لمدينة سراة عبيدة الجبلية.",
    areas: ["الجوة", "الفرشة", "وادي الحيا"],
    neighborhoods: [
      { name: "الجوة", slug: "al-jawa" },
      { name: "الفرشة", slug: "al-farsha" },
      { name: "وادي الحيا", slug: "wadi-al-haya" }
    ]
  },
  {
    name: "النماص",
    slug: "namas",
    population: "75,000+",
    services: servicesData.slice(0, 4), // Added services array
    rating: 4.3,
    image: "/images/cities/namas.jpg",
    description: "خدماتنا تصل إلى مدينة النماص السياحية.",
    areas: ["بني عمرو", "السرح", "وادي زيد"],
    neighborhoods: [
      { name: "بني عمرو", slug: "bani-amr" },
      { name: "السرح", slug: "al-sarh" },
      { name: "وادي زيد", slug: "wadi-zaid" }
    ]
  },
  {
    name: "المجاردة",
    slug: "almajardah",
    population: "72,000+", 
    services: servicesData.slice(0, 4), // Added services array
    rating: 4.3,
    image: "/images/cities/almajardah.jpg",
    description: "تغطية لخدمات الصيانة الأساسية في المجاردة.",
    areas: ["عبس", "أحد ثربان", "خاط"],
    neighborhoods: [
      { name: "عبس", slug: "abs" },
      { name: "أحد ثربان", slug: "ahad-thurban" },
      { name: "خاط", slug: "khat" }
    ]
  },
  {
    name: "ظهران الجنوب",
    slug: "dhahran-janub",
    population: "68,000+",
    services: servicesData.slice(0, 4), // Added services array
    rating: 4.2,
    image: "/images/cities/dhahran-janub.jpg",
    description: "خدماتنا تمتد إلى مدينة ظهران الجنوب الحدودية.",
    areas: ["علب", "الغايل", "الحمره"],
    neighborhoods: [
      { name: "علب", slug: "alab" },
      { name: "الغايل", slug: "al-ghayil" },
      { name: "الحمره", slug: "al-hamra" }
    ]
  },
  {
    name: "مدينة الملك خالد العسكرية",
    slug: "king-khalid-military-city",
    population: "65,000+",
    services: servicesData, // Has all services
    rating: 4.5,
    image: "/images/cities/kkmc.jpg",
    description: "خدمات متخصصة للمدينة العسكرية والمجمعات السكنية.",
    areas: ["المجمع السكني الأول", "المجمع السكني الثاني", "المنطقة الإدارية"],
    neighborhoods: [
      { name: "المجمع السكني الأول", slug: "residential-complex-1" },
      { name: "المجمع السكني الثاني", slug: "residential-complex-2" },
      { name: "المنطقة الإدارية", slug: "administrative-area" }
    ]
  }
];