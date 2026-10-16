import type { Locale } from "@/lib/i18n";

export type CategoryId =
  | "servers" | "networking" | "security" | "computers"
  | "storage" | "software" | "printing" | "consumer";

export const CATEGORIES: { id: CategoryId; name: Record<Locale, string> }[] = [
  { id: "servers", name: { en: "Servers & Infrastructure", az: "Serverlər və infrastruktur", ru: "Серверы и инфраструктура" } },
  { id: "networking", name: { en: "Networking", az: "Şəbəkə avadanlığı", ru: "Сетевое оборудование" } },
  { id: "security", name: { en: "Security", az: "Təhlükəsizlik", ru: "Безопасность" } },
  { id: "computers", name: { en: "Computers & Accessories", az: "Kompüterlər və aksesuarlar", ru: "Компьютеры и аксессуары" } },
  { id: "storage", name: { en: "Storage & Data Management", az: "Yaddaş və məlumat idarəetməsi", ru: "Хранение данных" } },
  { id: "software", name: { en: "Software", az: "Proqram təminatı", ru: "Программное обеспечение" } },
  { id: "printing", name: { en: "Printing & Imaging", az: "Çap və təsvir", ru: "Печать и изображение" } },
  { id: "consumer", name: { en: "Consumer Electronics", az: "İstehlak elektronikası", ru: "Потребительская электроника" } },
];

export const BRANDS = ["Dell", "HPE", "HP", "Cisco", "Lenovo", "Microsoft", "APC", "Fortinet", "Axis", "Logitech"] as const;

/** Shape returned by the (mock) 1C REST API before public-visibility filtering. */
export type Product1C = {
  id: string;
  sku: string;
  name: string;
  brand: (typeof BRANDS)[number];
  category: CategoryId;
  price: number;
  currency: "USD" | "AZN";
  stock: number;
  specs: [string, string][];
};

/** Shape the public website receives. price/stock are null when an admin has hidden them. */
export type PublicProduct = Omit<Product1C, "price" | "stock" | "currency"> & {
  price: number | null;
  currency: "USD" | "AZN" | null;
  stock: number | null;
};

export const PRODUCTS_1C: Product1C[] = [
  { id: "dell-poweredge-r760", sku: "210-BGDX", name: "Dell PowerEdge R760 Rack Server", brand: "Dell", category: "servers", price: 8450, currency: "USD", stock: 12,
    specs: [["Form factor", "2U rack"], ["Processor", "Up to 2× Intel Xeon Scalable"], ["Memory", "Up to 8 TB DDR5"], ["Drive bays", "Up to 24× 2.5\""], ["Management", "iDRAC9"]] },
  { id: "hpe-proliant-dl380-gen11", sku: "P52560-B21", name: "HPE ProLiant DL380 Gen11", brand: "HPE", category: "servers", price: 7920, currency: "USD", stock: 8,
    specs: [["Form factor", "2U rack"], ["Processor", "Up to 2× Intel Xeon Scalable"], ["Memory", "Up to 8 TB DDR5"], ["Drive bays", "Up to 36× E3.S"], ["Management", "iLO 6"]] },
  { id: "apc-smart-ups-srt-3000", sku: "SRT3000XLI", name: "APC Smart-UPS SRT 3000VA", brand: "APC", category: "servers", price: 1890, currency: "USD", stock: 15,
    specs: [["Capacity", "3000 VA / 2700 W"], ["Topology", "Double-conversion online"], ["Input", "230 V"], ["Runtime", "Extendable with battery packs"]] },
  { id: "cisco-catalyst-9300-48p", sku: "C9300-48P-E", name: "Cisco Catalyst 9300 48-port Switch", brand: "Cisco", category: "networking", price: 5600, currency: "USD", stock: 20,
    specs: [["Ports", "48× 1G PoE+"], ["Uplinks", "Modular network module"], ["Stacking", "StackWise-480"], ["Layer", "L2/L3"]] },
  { id: "cisco-meraki-mr46", sku: "MR46-HW", name: "Cisco Meraki MR46 Access Point", brand: "Cisco", category: "networking", price: 780, currency: "USD", stock: 25,
    specs: [["Wi-Fi", "Wi-Fi 6 (802.11ax)"], ["Radios", "2.4 GHz + 5 GHz + scanning"], ["Management", "Cloud dashboard"], ["Power", "802.3at PoE"]] },
  { id: "fortinet-fortigate-100f", sku: "FG-100F", name: "Fortinet FortiGate 100F Firewall", brand: "Fortinet", category: "security", price: 2100, currency: "USD", stock: 10,
    specs: [["Firewall throughput", "20 Gbps"], ["Interfaces", "22× GE + 4× SFP+"], ["Features", "NGFW, SD-WAN, IPS"], ["Form factor", "1U"]] },
  { id: "axis-p3265-lve", sku: "02332-001", name: "Axis P3265-LVE Network Camera", brand: "Axis", category: "security", price: 890, currency: "USD", stock: 18,
    specs: [["Resolution", "1080p"], ["Housing", "IK10, IP66"], ["Night vision", "Built-in IR"], ["Analytics", "Edge-based"]] },
  { id: "lenovo-thinkpad-t14-gen4", sku: "21HD00BDRT", name: "Lenovo ThinkPad T14 Gen 4 Laptop", brand: "Lenovo", category: "computers", price: 1450, currency: "USD", stock: 35,
    specs: [["Display", "14\" WUXGA"], ["Processor", "Intel Core i7"], ["Memory", "16 GB"], ["Storage", "512 GB SSD"], ["OS", "Windows 11 Pro"]] },
  { id: "hp-elitebook-840-g10", sku: "81A07EA", name: "HP EliteBook 840 G10", brand: "HP", category: "computers", price: 1680, currency: "USD", stock: 22,
    specs: [["Display", "14\" WUXGA"], ["Processor", "Intel Core i7"], ["Memory", "16 GB"], ["Storage", "512 GB SSD"]] },
  { id: "dell-ultrasharp-u2723qe", sku: "210-BDZZ", name: "Dell UltraSharp 27 4K Monitor U2723QE", brand: "Dell", category: "computers", price: 640, currency: "USD", stock: 40,
    specs: [["Size", "27\""], ["Resolution", "3840×2160"], ["Panel", "IPS Black"], ["Connectivity", "USB-C hub, DisplayPort, HDMI"]] },
  { id: "dell-powerstore-500t", sku: "PS500T-BASE", name: "Dell PowerStore 500T Storage Array", brand: "Dell", category: "storage", price: 18500, currency: "USD", stock: 3,
    specs: [["Type", "Unified all-flash"], ["Protocols", "FC, iSCSI, NFS, SMB"], ["Drives", "NVMe SSD"], ["Data reduction", "Always-on"]] },
  { id: "microsoft-windows-11-pro", sku: "FQC-10528", name: "Microsoft Windows 11 Pro", brand: "Microsoft", category: "software", price: 145, currency: "USD", stock: 200,
    specs: [["Edition", "Pro"], ["License", "OEM, 64-bit"], ["Language", "Multilingual"]] },
  { id: "hp-laserjet-enterprise-m507dn", sku: "1PV87A", name: "HP LaserJet Enterprise M507dn Printer", brand: "HP", category: "printing", price: 520, currency: "USD", stock: 0,
    specs: [["Type", "Mono laser"], ["Speed", "Up to 43 ppm"], ["Duplex", "Automatic"], ["Connectivity", "Ethernet, USB"]] },
  { id: "logitech-mx-master-3s", sku: "910-006559", name: "Logitech MX Master 3S Wireless Mouse", brand: "Logitech", category: "consumer", price: 99, currency: "USD", stock: 120,
    specs: [["Sensor", "8000 DPI"], ["Connectivity", "Bluetooth, Logi Bolt"], ["Battery", "Up to 70 days"]] },
];

const CATEGORY_DESC: Record<CategoryId, Record<Locale, string>> = {
  servers: {
    en: "is built for virtualization, cloud workloads and data-intensive applications, with the reliability and manageability enterprise data centers expect.",
    az: "virtuallaşdırma, bulud yükləri və verilənlərlə intensiv tətbiqlər üçün nəzərdə tutulub və korporativ data mərkəzlərinin tələb etdiyi etibarlılığı təmin edir.",
    ru: "создан для виртуализации, облачных нагрузок и ресурсоёмких приложений и обеспечивает надёжность и управляемость корпоративных ЦОД.",
  },
  networking: {
    en: "delivers scalable, secure connectivity for campus, branch and data center networks.",
    az: "kampus, filial və data mərkəz şəbəkələri üçün miqyaslana bilən və təhlükəsiz bağlantı təmin edir.",
    ru: "обеспечивает масштабируемое и защищённое подключение для кампусных, филиальных сетей и ЦОД.",
  },
  security: {
    en: "protects your infrastructure and premises with enterprise-grade security capabilities.",
    az: "infrastrukturunuzu və obyektlərinizi korporativ səviyyəli təhlükəsizlik imkanları ilə qoruyur.",
    ru: "защищает вашу инфраструктуру и объекты с помощью функций корпоративного уровня.",
  },
  computers: {
    en: "is a dependable choice for office teams, delivering performance, comfort and long-term value.",
    az: "ofis komandaları üçün etibarlı seçimdir və performans, rahatlıq və uzunmüddətli dəyər təqdim edir.",
    ru: "— надёжный выбор для офисных команд: производительность, удобство и долгосрочная ценность.",
  },
  storage: {
    en: "provides fast, resilient storage with built-in data protection and efficient data management.",
    az: "daxili məlumat qorunması və səmərəli idarəetmə ilə sürətli və davamlı yaddaş təmin edir.",
    ru: "обеспечивает быстрое и отказоустойчивое хранение со встроенной защитой данных.",
  },
  software: {
    en: "gives your organization a licensed, supported software foundation.",
    az: "təşkilatınıza lisenziyalı və dəstəklənən proqram bazası verir.",
    ru: "даёт вашей организации лицензионную и поддерживаемую программную основу.",
  },
  printing: {
    en: "delivers dependable, high-volume printing for busy workgroups.",
    az: "yüklü iş qrupları üçün etibarlı və yüksək həcmli çap təmin edir.",
    ru: "обеспечивает надёжную печать большого объёма для рабочих групп.",
  },
  consumer: {
    en: "improves everyday productivity with a comfortable, well-made design.",
    az: "rahat və keyfiyyətli dizaynla gündəlik məhsuldarlığı artırır.",
    ru: "повышает ежедневную продуктивность благодаря удобному и качественному дизайну.",
  },
};

export function describeProduct(p: { name: string; category: CategoryId }, locale: Locale): string {
  return `${p.name} ${CATEGORY_DESC[p.category][locale]}`;
}

export const PARTNERS = ["DELL Technologies", "Hewlett Packard Enterprise", "Lenovo", "CISCO", "Microsoft", "APC"];

export const NEWS: { id: string; date: string; title: Record<Locale, string> }[] = [
  { id: "n1", date: "2026-09-17", title: {
    en: "Dell PowerEdge servers: new generation now available to order",
    az: "Dell PowerEdge serverləri: yeni nəsil sifarişə açıqdır",
    ru: "Серверы Dell PowerEdge: новое поколение доступно для заказа" } },
  { id: "n2", date: "2026-09-09", title: {
    en: "Cisco networking solutions for modern business",
    az: "Müasir biznes üçün Cisco şəbəkə həlləri",
    ru: "Сетевые решения Cisco для современного бизнеса" } },
  { id: "n3", date: "2026-08-28", title: {
    en: "Microsoft cloud licensing options for business growth",
    az: "Biznesin böyüməsi üçün Microsoft bulud lisenziyalaşdırma seçimləri",
    ru: "Варианты облачного лицензирования Microsoft для роста бизнеса" } },
];
