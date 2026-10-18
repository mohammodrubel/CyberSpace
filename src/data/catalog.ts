import type { Locale } from "@/lib/i18n";

export type CategoryId =
  | "servers" | "networking" | "security" | "computers"
  | "storage" | "software" | "printing" | "consumer";

export const CATEGORIES: { id: CategoryId; name: Record<Locale, string> }[] = [
  { id: "servers",    name: { en: "Servers & Infrastructure",  az: "Serverlər və infrastruktur",       ru: "Серверы и инфраструктура" } },
  { id: "networking", name: { en: "Networking",                az: "Şəbəkə avadanlığı",                ru: "Сетевое оборудование" } },
  { id: "security",   name: { en: "Security",                  az: "Təhlükəsizlik",                    ru: "Безопасность" } },
  { id: "computers",  name: { en: "Computers & Accessories",   az: "Kompüterlər və aksesuarlar",       ru: "Компьютеры и аксессуары" } },
  { id: "storage",    name: { en: "Storage & Data Management", az: "Yaddaş və məlumat idarəetməsi",   ru: "Хранение данных" } },
  { id: "software",   name: { en: "Software",                  az: "Proqram təminatı",                 ru: "Программное обеспечение" } },
  { id: "printing",   name: { en: "Printing & Imaging",        az: "Çap və təsvir",                    ru: "Печать и изображение" } },
  { id: "consumer",   name: { en: "Consumer Electronics",      az: "İstehlak elektronikası",           ru: "Потребительская электроника" } },
];

export const BRANDS = [
  "Dell", "HPE", "HP", "Cisco", "Lenovo", "Microsoft", "APC", "Fortinet", "Axis", "Logitech",
] as const;

export type Product1C = {
  id: string; sku: string; name: string;
  brand: (typeof BRANDS)[number]; category: CategoryId;
  price: number; currency: "USD" | "AZN"; stock: number;
  specs: [string, string][];
};

export type PublicProduct = Omit<Product1C, "price" | "stock" | "currency"> & {
  price: number | null; currency: "USD" | "AZN" | null; stock: number | null;
};

export const PRODUCTS_1C: Product1C[] = [
  // ── Servers ─────────────────────────────────────────────────
  { id: "dell-poweredge-r760", sku: "210-BGDX", name: "Dell PowerEdge R760 Rack Server", brand: "Dell", category: "servers", price: 8450, currency: "USD", stock: 12,
    specs: [["Form factor","2U rack"],["Processor","Up to 2× Intel Xeon Scalable"],["Memory","Up to 8 TB DDR5"],["Drive bays","Up to 24× 2.5\""],["Management","iDRAC9"]] },

  { id: "hpe-proliant-dl380-gen11", sku: "P52560-B21", name: "HPE ProLiant DL380 Gen11", brand: "HPE", category: "servers", price: 7920, currency: "USD", stock: 8,
    specs: [["Form factor","2U rack"],["Processor","Up to 2× Intel Xeon Scalable"],["Memory","Up to 8 TB DDR5"],["Drive bays","Up to 36× E3.S"],["Management","iLO 6"]] },

  { id: "dell-poweredge-t440", sku: "210-AMEI", name: "Dell PowerEdge T440 Tower Server", brand: "Dell", category: "servers", price: 5200, currency: "USD", stock: 6,
    specs: [["Form factor","5U tower"],["Processor","Up to 2× Intel Xeon Scalable"],["Memory","Up to 3 TB DDR4"],["Drive bays","Up to 18× 3.5\""],["Management","iDRAC9"]] },

  { id: "apc-smart-ups-srt-3000", sku: "SRT3000XLI", name: "APC Smart-UPS SRT 3000VA", brand: "APC", category: "servers", price: 1890, currency: "USD", stock: 15,
    specs: [["Capacity","3000 VA / 2700 W"],["Topology","Double-conversion online"],["Input","230 V"],["Runtime","Extendable with battery packs"]] },

  { id: "hpe-proliant-ml350-gen10", sku: "P11051-B21", name: "HPE ProLiant ML350 Gen10 Tower Server", brand: "HPE", category: "servers", price: 6340, currency: "USD", stock: 4,
    specs: [["Form factor","5U tower/rack"],["Processor","Up to 2× Intel Xeon Scalable"],["Memory","Up to 3 TB DDR4"],["Storage","Up to 20 LFF drives"],["Management","iLO 5"]] },

  // ── Networking ───────────────────────────────────────────────
  { id: "cisco-catalyst-9300-48p", sku: "C9300-48P-E", name: "Cisco Catalyst 9300 48-port Switch", brand: "Cisco", category: "networking", price: 5600, currency: "USD", stock: 20,
    specs: [["Ports","48× 1G PoE+"],["Uplinks","Modular network module"],["Stacking","StackWise-480"],["Layer","L2/L3"]] },

  { id: "cisco-sg350-28", sku: "SG350-28-K9-EU", name: "Cisco SG350-28 Gigabit Managed Switch", brand: "Cisco", category: "networking", price: 385, currency: "USD", stock: 45,
    specs: [["Ports","28× 1G"],["Uplinks","2× combo SFP"],["Layer","L2+"],["Management","Web UI, CLI, SNMP"]] },

  { id: "cisco-meraki-mr46", sku: "MR46-HW", name: "Cisco Meraki MR46 Access Point", brand: "Cisco", category: "networking", price: 780, currency: "USD", stock: 25,
    specs: [["Wi-Fi","Wi-Fi 6 (802.11ax)"],["Radios","2.4 GHz + 5 GHz + scanning"],["Management","Cloud dashboard"],["Power","802.3at PoE"]] },

  { id: "hpe-aruba-ap-515", sku: "R2H28A", name: "HPE Aruba Instant On AP22 Wi-Fi 6", brand: "HPE", category: "networking", price: 195, currency: "USD", stock: 60,
    specs: [["Wi-Fi","Wi-Fi 6 (802.11ax)"],["Bands","Dual-band 2.4/5 GHz"],["Management","Aruba Instant On app"],["Power","802.3at PoE"]] },

  // ── Security ─────────────────────────────────────────────────
  { id: "fortinet-fortigate-100f", sku: "FG-100F", name: "Fortinet FortiGate 100F Firewall", brand: "Fortinet", category: "security", price: 2100, currency: "USD", stock: 10,
    specs: [["Firewall throughput","20 Gbps"],["Interfaces","22× GE + 4× SFP+"],["Features","NGFW, SD-WAN, IPS"],["Form factor","1U"]] },

  { id: "fortinet-fortigate-60f", sku: "FG-60F", name: "Fortinet FortiGate 60F Desktop Firewall", brand: "Fortinet", category: "security", price: 750, currency: "USD", stock: 22,
    specs: [["Firewall throughput","10 Gbps"],["Interfaces","10× GE"],["Features","NGFW, IPS, Web Filtering"],["Form factor","Desktop"]] },

  { id: "axis-p3265-lve", sku: "02332-001", name: "Axis P3265-LVE Network Camera", brand: "Axis", category: "security", price: 890, currency: "USD", stock: 18,
    specs: [["Resolution","1080p"],["Housing","IK10, IP66"],["Night vision","Built-in IR"],["Analytics","Edge-based"]] },

  { id: "axis-q6135-le", sku: "01784-001", name: "Axis Q6135-LE PTZ Camera", brand: "Axis", category: "security", price: 3200, currency: "USD", stock: 5,
    specs: [["Resolution","1080p 60fps"],["Zoom","32× optical"],["Housing","IP66, IK10"],["IR range","Up to 200 m"]] },

  // ── Computers ────────────────────────────────────────────────
  { id: "lenovo-thinkpad-t14-gen4", sku: "21HD00BDRT", name: "Lenovo ThinkPad T14 Gen 4 Laptop", brand: "Lenovo", category: "computers", price: 1450, currency: "USD", stock: 35,
    specs: [["Display","14\" WUXGA"],["Processor","Intel Core i7"],["Memory","16 GB"],["Storage","512 GB SSD"],["OS","Windows 11 Pro"]] },

  { id: "hp-elitebook-840-g10", sku: "81A07EA", name: "HP EliteBook 840 G10", brand: "HP", category: "computers", price: 1680, currency: "USD", stock: 22,
    specs: [["Display","14\" WUXGA"],["Processor","Intel Core i7"],["Memory","16 GB"],["Storage","512 GB SSD"]] },

  { id: "lenovo-thinkcentre-m70q", sku: "11DT003MRT", name: "Lenovo ThinkCentre M70q Tiny Desktop", brand: "Lenovo", category: "computers", price: 820, currency: "USD", stock: 28,
    specs: [["Processor","Intel Core i5"],["Memory","8 GB DDR4"],["Storage","256 GB SSD"],["Form factor","Tiny"],["OS","Windows 11 Pro"]] },

  { id: "dell-ultrasharp-u2723qe", sku: "210-BDZZ", name: "Dell UltraSharp 27 4K Monitor U2723QE", brand: "Dell", category: "computers", price: 640, currency: "USD", stock: 40,
    specs: [["Size","27\""],["Resolution","3840×2160"],["Panel","IPS Black"],["Connectivity","USB-C hub, DisplayPort, HDMI"]] },

  // ── Storage ──────────────────────────────────────────────────
  { id: "dell-powerstore-500t", sku: "PS500T-BASE", name: "Dell PowerStore 500T Storage Array", brand: "Dell", category: "storage", price: 18500, currency: "USD", stock: 3,
    specs: [["Type","Unified all-flash"],["Protocols","FC, iSCSI, NFS, SMB"],["Drives","NVMe SSD"],["Data reduction","Always-on"]] },

  { id: "hpe-storeever-msl3040", sku: "Q0L74A", name: "HPE StoreEver MSL3040 Tape Library", brand: "HPE", category: "storage", price: 9800, currency: "USD", stock: 2,
    specs: [["Capacity","Up to 10 PB compressed"],["Drives","Up to 40 LTO"],["Interface","SAS/FC"],["Management","Remote web UI"]] },

  // ── Software ─────────────────────────────────────────────────
  { id: "microsoft-windows-11-pro", sku: "FQC-10528", name: "Microsoft Windows 11 Pro", brand: "Microsoft", category: "software", price: 145, currency: "USD", stock: 200,
    specs: [["Edition","Pro"],["License","OEM, 64-bit"],["Language","Multilingual"]] },

  { id: "microsoft-office-365-bp", sku: "CFQ7TTC0LH18", name: "Microsoft 365 Business Premium (Annual)", brand: "Microsoft", category: "software", price: 264, currency: "USD", stock: 500,
    specs: [["Apps","Word, Excel, PowerPoint, Teams"],["Cloud","1 TB OneDrive per user"],["Security","Defender for Business"],["Users","Per user / 1 year"]] },

  // ── Printing ─────────────────────────────────────────────────
  { id: "hp-laserjet-enterprise-m507dn", sku: "1PV87A", name: "HP LaserJet Enterprise M507dn Printer", brand: "HP", category: "printing", price: 520, currency: "USD", stock: 0,
    specs: [["Type","Mono laser"],["Speed","Up to 43 ppm"],["Duplex","Automatic"],["Connectivity","Ethernet, USB"]] },

  { id: "hp-color-laserjet-m856dn", sku: "T3U51A", name: "HP Color LaserJet Enterprise M856dn", brand: "HP", category: "printing", price: 2150, currency: "USD", stock: 3,
    specs: [["Type","Color laser"],["Speed","Up to 56 ppm"],["Duplex","Automatic"],["Paper","Up to A3"],["Connectivity","Gigabit Ethernet"]] },

  // ── Consumer ─────────────────────────────────────────────────
  { id: "logitech-mx-master-3s", sku: "910-006559", name: "Logitech MX Master 3S Wireless Mouse", brand: "Logitech", category: "consumer", price: 99, currency: "USD", stock: 120,
    specs: [["Sensor","8000 DPI"],["Connectivity","Bluetooth, Logi Bolt"],["Battery","Up to 70 days"]] },

  { id: "logitech-rally-camera", sku: "960-001227", name: "Logitech Rally Ultra-HD ConferenceCam", brand: "Logitech", category: "consumer", price: 1199, currency: "USD", stock: 8,
    specs: [["Video","4K Ultra HD"],["FOV","90° diagonal"],["Pan/Tilt/Zoom","15× zoom"],["Compatibility","Microsoft Teams, Zoom"]] },
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

export const PARTNERS: { name: string; desc: Record<Locale, string> }[] = [
  { name: "Dell Technologies",       desc: { en: "Official partner for servers, storage and workstations", az: "Serverlər, yaddaş və iş stansiyaları üzrə rəsmi tərəfdaş", ru: "Официальный партнёр по серверам, СХД и рабочим станциям" } },
  { name: "Hewlett Packard Enterprise", desc: { en: "HPE ProLiant servers and Aruba networking solutions", az: "HPE ProLiant serverlər və Aruba şəbəkə həlləri", ru: "Серверы HPE ProLiant и сетевые решения Aruba" } },
  { name: "Cisco",                   desc: { en: "Enterprise networking, switching and collaboration", az: "Korporativ şəbəkə, kommutasiya və əməkdaşlıq", ru: "Корпоративные сети, коммутация и унифицированные коммуникации" } },
  { name: "Lenovo",                  desc: { en: "Business laptops, desktops and ThinkSystem servers", az: "Biznes noutbuklar, masaüstü kompüterlər və ThinkSystem serverlər", ru: "Бизнес-ноутбуки, ПК и серверы ThinkSystem" } },
  { name: "Microsoft",               desc: { en: "Windows, Microsoft 365 and Azure licensing", az: "Windows, Microsoft 365 və Azure lisenziyaları", ru: "Лицензирование Windows, Microsoft 365 и Azure" } },
  { name: "Fortinet",                desc: { en: "Next-generation firewall and network security", az: "Növbəti nəsil firewall və şəbəkə təhlükəsizliyi", ru: "Межсетевые экраны нового поколения и сетевая безопасность" } },
  { name: "APC by Schneider Electric", desc: { en: "UPS, power management and data center infrastructure", az: "UPS, güc idarəetməsi və data mərkəzi infrastrukturu", ru: "ИБП, управление питанием и инфраструктура ЦОД" } },
  { name: "HP",                      desc: { en: "Business printers, laptops and accessories", az: "Biznes printerlər, noutbuklar və aksesuarlar", ru: "Бизнес-принтеры, ноутбуки и аксессуары" } },
  { name: "Axis Communications",     desc: { en: "Network cameras and video surveillance systems", az: "Şəbəkə kameraları və video müşahidə sistemləri", ru: "Сетевые камеры и системы видеонаблюдения" } },
  { name: "Logitech",                desc: { en: "Conference cameras, mice and business peripherals", az: "Konfrans kameraları, siçanlar və iş periferiyaları", ru: "Камеры для конференций, мыши и бизнес-периферия" } },
];

export type NewsItem = {
  id: string;
  date: string;
  image: string;
  author: string;
  category: Record<Locale, string>;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string[]>;
};

export const NEWS: NewsItem[] = [
  {
    id: "n1", date: "2026-09-17",
    image: "https://picsum.photos/seed/cyberspace-n1/800/450",
    author: "Cyberspace Team",
    category: { en: "Products", az: "Məhsullar", ru: "Продукты" },
    title: { en: "Dell PowerEdge servers: new generation now available to order", az: "Dell PowerEdge serverləri: yeni nəsil sifarişə açıqdır", ru: "Серверы Dell PowerEdge: новое поколение доступно для заказа" },
    excerpt: { en: "The latest Dell PowerEdge R760 and T440 servers are now in stock. Featuring Intel 5th Gen Xeon processors and DDR5 memory for maximum workload performance.", az: "Dell PowerEdge R760 və T440 serverlərin son modelləri indi stokdadır. Maksimal iş yükü performansı üçün Intel 5-ci nəsil Xeon prosessorları və DDR5 yaddaşı ilə.", ru: "Новейшие серверы Dell PowerEdge R760 и T440 уже на складе. Intel Xeon 5-го поколения и DDR5 для максимальной производительности." },
    body: {
      en: [
        "Cyberspace is proud to announce the availability of the latest Dell PowerEdge server generation, including the rack-optimised R760 and the tower T440, now in stock at our Baku warehouse for immediate deployment across Azerbaijan.",
        "The new generation introduces Intel 5th Gen Xeon Scalable processors paired with DDR5 memory modules, delivering up to twice the memory bandwidth of the previous generation. PCIe 5.0 connectivity supports the latest NVMe SSDs and AI accelerator cards, making these systems ready for machine learning inference, high-density virtualisation, and demanding enterprise database workloads.",
        "Dell's iDRAC9 with OpenManage automation simplifies lifecycle management, remote provisioning, and real-time health monitoring across an entire server fleet. From core enterprise databases to cloud-edge computing, the PowerEdge line covers every tier of the modern data centre.",
        "Contact the Cyberspace sales team for configuration quotes, trade-in programmes, and government tender pricing. Same-week delivery is available for standard configurations from stock.",
      ],
      az: [
        "Cyberspace, Dell PowerEdge server seriyasının ən son nəslinin - şkaf üçün optimallaşdırılmış R760 və qüllə T440 modelinin - Bakı anbarımızda mövcud olduğunu elan etməkdən məmnuniyyət duyur.",
        "Yeni nəsil Intel 5-ci nəsil Xeon Scalable prosessorları və DDR5 yaddaş modulları ilə gəlir, əvvəlki nəsillə müqayisədə yaddaş bant genişliyini 2 dəfəyə qədər artırır. PCIe 5.0 bağlantısı ən son NVMe SSD-ləri və AI akseleratoru kartlarını dəstəkləyir.",
        "Dell iDRAC9 avtomatlaşdırılmış idarəetmə ilə server parkınızın həyat dövrü idarəetməsini, uzaqdan quraşdırmanı və real vaxt rejimində sağlamlıq monitorinqini asanlaşdırır.",
        "Konfiqurasiya sitat, ticarət-in proqramlar və dövlət tender qiymətləri üçün Cyberspace satış komandası ilə əlaqə saxlayın.",
      ],
      ru: [
        "Cyberspace рада сообщить о поступлении в наличие новейшего поколения серверов Dell PowerEdge — стоечного R760 и башенного T440 — на наш склад в Баку для немедленной поставки.",
        "Новое поколение оснащено процессорами Intel Xeon 5-го поколения и модулями памяти DDR5, обеспечивая до двух раз большую пропускную способность памяти по сравнению с предыдущим поколением. Интерфейс PCIe 5.0 поддерживает новейшие NVMe SSD и ускорители ИИ.",
        "iDRAC9 с автоматизацией OpenManage упрощает управление жизненным циклом, удалённое развёртывание и мониторинг состояния серверного парка в режиме реального времени.",
        "Свяжитесь с отделом продаж Cyberspace для получения коммерческих предложений, программ trade-in и тендерных цен для государственного сектора.",
      ],
    },
  },
  {
    id: "n2", date: "2026-09-09",
    image: "https://picsum.photos/seed/cyberspace-n2/800/450",
    author: "Cyberspace Team",
    category: { en: "Networking", az: "Şəbəkə", ru: "Сети" },
    title: { en: "Cisco networking solutions for modern business", az: "Müasir biznes üçün Cisco şəbəkə həlləri", ru: "Сетевые решения Cisco для современного бизнеса" },
    excerpt: { en: "Cisco Catalyst 9300 switches and Meraki MR46 access points are ideal for growing businesses that need reliable, cloud-managed networking.", az: "Cisco Catalyst 9300 kommutatorları və Meraki MR46 giriş nöqtələri etibarlı, bulud idarə olunan şəbəkəyə ehtiyacı olan böyüyən bizneslər üçün idealdır.", ru: "Коммутаторы Cisco Catalyst 9300 и точки доступа Meraki MR46 — оптимальный выбор для растущего бизнеса." },
    body: {
      en: [
        "Cyberspace now stocks the full Cisco Catalyst 9300 switch series alongside Meraki MR46 Wi-Fi 6 access points, giving Azerbaijani businesses a complete enterprise-grade networking platform backed by Cisco's industry-leading support.",
        "The Catalyst 9300 delivers programmable, intent-based networking with advanced security features including encrypted traffic analytics and integrated Cisco TrustSec. A modular design allows uplink upgrades without replacing the base switch, protecting your capital investment as bandwidth demands grow.",
        "Cisco Meraki's cloud-managed dashboard consolidates visibility across switches, access points and security appliances into a single pane of glass. Zero-touch provisioning, automatic firmware updates and rich per-client analytics simplify IT operations for lean teams managing distributed offices.",
        "Reach out to the Cyberspace networking team for a free site assessment and solution design tailored to your branch count, user density and bandwidth requirements.",
      ],
      az: [
        "Cyberspace indi tam Cisco Catalyst 9300 kommutator seriyasını və Meraki MR46 Wi-Fi 6 giriş nöqtələrini stokda saxlayır, Azərbaycan müəssisələrinə Cisco-nun sənaye lider dəstəyi ilə tam korporativ şəbəkə platforması təqdim edir.",
        "Catalyst 9300 şifrəli trafik analitikası və inteqrasiya edilmiş Cisco TrustSec daxil olmaqla qabaqcıl təhlükəsizlik xüsusiyyətləri ilə proqramlaşdırıla bilən şəbəkə təqdim edir.",
        "Cisco Meraki-nin bulud idarə olunan paneli kommutatorlar, giriş nöqtələri və təhlükəsizlik cihazları üzərindən görünürlüğü vahid interfeysdə birləşdirir.",
        "Pulsuz sahə qiymətləndirmə və həll dizaynı üçün Cyberspace şəbəkə komandası ilə əlaqə saxlayın.",
      ],
      ru: [
        "Cyberspace теперь хранит полную серию коммутаторов Cisco Catalyst 9300 и точки доступа Meraki MR46 Wi-Fi 6, предоставляя азербайджанским предприятиям комплексную корпоративную сетевую платформу.",
        "Catalyst 9300 обеспечивает программируемые сети на основе намерений с расширенными функциями безопасности, включая аналитику зашифрованного трафика и интегрированный Cisco TrustSec.",
        "Облачная панель управления Cisco Meraki объединяет видимость коммутаторов, точек доступа и устройств безопасности в едином интерфейсе. Нулевое касание, автоматические обновления прошивки и аналитика клиентов упрощают ИТ-операции.",
        "Свяжитесь с сетевой командой Cyberspace для бесплатной оценки объекта и проектирования решения.",
      ],
    },
  },
  {
    id: "n3", date: "2026-08-28",
    image: "https://picsum.photos/seed/cyberspace-n3/800/450",
    author: "Cyberspace Team",
    category: { en: "Software", az: "Proqram", ru: "Программы" },
    title: { en: "Microsoft 365 Business Premium — cloud productivity for your team", az: "Microsoft 365 Business Premium — komandanız üçün bulud məhsuldarlığı", ru: "Microsoft 365 Business Premium — облачная продуктивность для вашей команды" },
    excerpt: { en: "Get the full Microsoft 365 suite with enterprise-grade security, 1 TB cloud storage and premium apps for every user in your organisation.", az: "Hər istifadəçi üçün korporativ təhlükəsizlik, 1 TB bulud yaddaşı və premium tətbiqlər ilə tam Microsoft 365 paketini əldə edin.", ru: "Полный пакет Microsoft 365 с корпоративной защитой, 1 ТБ облачного хранилища и premium-приложениями для каждого сотрудника." },
    body: {
      en: [
        "Cyberspace is an authorised Microsoft Cloud Solution Provider, enabling us to offer Microsoft 365 Business Premium licences to Azerbaijani organisations with local billing, Azerbaijani-language support, and fast licence activation.",
        "Microsoft 365 Business Premium bundles the full Office application suite — Word, Excel, PowerPoint, Outlook and Teams — with 1 TB of OneDrive cloud storage per user. Enterprise Mobility and Security features including Microsoft Defender for Business, Intune mobile device management, and Azure AD Premium P1 are included at no additional cost.",
        "For organisations concerned about data sovereignty, Microsoft 365 keeps data within EU data residency zones with compliance certifications spanning ISO 27001, SOC 2, and GDPR. Advanced audit logging and eDiscovery tools simplify regulatory compliance for financial, healthcare and government clients.",
        "Cyberspace offers migration assistance from legacy on-premise Exchange or Google Workspace environments, including data migration, user training, and ongoing licence management. Contact us for volume pricing and multi-year agreement discounts.",
      ],
      az: [
        "Cyberspace, Microsoft 365 Business Premium lisenziyalarını yerli hesablaşma, Azərbaycan dilində dəstək və sürətli lisenziya aktivasiyası ilə Azərbaycan təşkilatlarına təklif edən səlahiyyətli Microsoft Bulud Həlləri Provayderidir.",
        "Microsoft 365 Business Premium tam Office tətbiqi dəstini — Word, Excel, PowerPoint, Outlook və Teams — hər istifadəçi üçün 1 TB OneDrive bulud yaddaşı ilə birləşdirir.",
        "Microsoft Defender for Business, Intune mobil cihaz idarəetməsi və Azure AD Premium P1 daxil olmaqla Enterprise Mobility and Security xüsusiyyətləri əlavə xərc olmadan daxildir.",
        "Köhnə mühitlərdən miqrasiya yardımı, istifadəçi təlimi və davamlı lisenziya idarəetməsi üçün bizimlə əlaqə saxlayın.",
      ],
      ru: [
        "Cyberspace является авторизованным поставщиком облачных решений Microsoft, предлагая лицензии Microsoft 365 Business Premium организациям Азербайджана с местным выставлением счетов и поддержкой.",
        "Microsoft 365 Business Premium объединяет полный пакет Office — Word, Excel, PowerPoint, Outlook и Teams — с 1 ТБ облачного хранилища OneDrive на пользователя.",
        "Функции Enterprise Mobility and Security, включая Microsoft Defender for Business, Intune и Azure AD Premium P1, включены без дополнительной платы.",
        "Мы предлагаем помощь в миграции с устаревших локальных сред Exchange или Google Workspace, включая перенос данных, обучение пользователей и управление лицензиями.",
      ],
    },
  },
  {
    id: "n4", date: "2026-08-12",
    image: "https://picsum.photos/seed/cyberspace-n4/800/450",
    author: "Cyberspace Team",
    category: { en: "Security", az: "Təhlükəsizlik", ru: "Безопасность" },
    title: { en: "Fortinet FortiGate: next-generation firewall for enterprise protection", az: "Fortinet FortiGate: korporativ müdafiə üçün növbəti nəsil firewall", ru: "Fortinet FortiGate: межсетевой экран нового поколения для корпоративной защиты" },
    excerpt: { en: "The FortiGate 100F and 60F provide comprehensive threat protection, SD-WAN and zero-trust network access for businesses of all sizes.", az: "FortiGate 100F və 60F hər ölçülü bizneslər üçün hərtərəfli təhlükə qorunması, SD-WAN və sıfır güvən şəbəkə girişi təmin edir.", ru: "FortiGate 100F и 60F обеспечивают комплексную защиту от угроз, SD-WAN и доступ на основе нулевого доверия." },
    body: {
      en: [
        "Cyberspace is a Fortinet Authorised Partner, stocking the full FortiGate appliance range from the desktop 60F series for branch offices to the high-throughput 100F for headquarters and data centre perimeters.",
        "FortiGate next-generation firewalls combine intrusion prevention, SSL deep inspection, application control, web filtering, and anti-malware into a single ASIC-accelerated platform. The FortiOS operating system unifies policy management across firewall, SD-WAN and zero-trust network access from a single console, reducing administrative complexity for multi-site organisations.",
        "Fortinet's Security Fabric integrates FortiGate with FortiSwitch, FortiAP wireless access points, FortiAnalyzer SIEM logging, and FortiSandbox for unknown threat detonation — all manageable from the FortiManager central management platform. This fabric approach eliminates point-product blind spots that attackers exploit in siloed security architectures.",
        "Cyberspace provides on-site installation, configuration and staff training for FortiGate deployments. Annual FortiCare support and FortiGuard threat intelligence subscriptions are available with competitive local pricing.",
      ],
      az: [
        "Cyberspace, filial ofislər üçün masa üstü 60F seriyasından baş qərargah üçün yüksək keçicilik 100F-ə qədər tam FortiGate cihaz xəttini stokda saxlayan Fortinet Səlahiyyətli Partneridir.",
        "FortiGate növbəti nəsil firewalllar müdaxilənin qarşısının alınması, SSL dərin yoxlama, proqram nəzarəti, veb filtrasiya və zərərli proqram əleyhinə müdafiəni vahid ASIC-sürətləndirilmiş platformada birləşdirir.",
        "Fortinet-in Security Fabric, FortiGate-i FortiSwitch, FortiAP, FortiAnalyzer SIEM və FortiSandbox ilə birləşdirir - hamısı FortiManager mərkəzi idarəetmə platformasından idarə edilə bilər.",
        "Cyberspace FortiGate yerləşdirmələri üçün sahəyə yerləşdirmə, konfiqurament və işçi heyət təlimini təmin edir.",
      ],
      ru: [
        "Cyberspace является авторизованным партнёром Fortinet, хранящим полный ассортимент устройств FortiGate — от настольной серии 60F для филиалов до высокопроизводительного 100F для центров обработки данных.",
        "Межсетевые экраны нового поколения FortiGate объединяют предотвращение вторжений, глубокую инспекцию SSL, контроль приложений, веб-фильтрацию и защиту от вредоносного ПО в единую ASIC-ускоренную платформу.",
        "Security Fabric компании Fortinet интегрирует FortiGate с FortiSwitch, FortiAP, FortiAnalyzer SIEM и FortiSandbox — всё это управляется с платформы центрального управления FortiManager.",
        "Cyberspace предоставляет услуги по установке на месте, настройке и обучению персонала для развёртывания FortiGate.",
      ],
    },
  },
  {
    id: "n5", date: "2026-07-30",
    image: "https://picsum.photos/seed/cyberspace-n5/800/450",
    author: "Cyberspace Team",
    category: { en: "Company", az: "Şirkət", ru: "Компания" },
    title: { en: "Cyberspace celebrates 15 years of IT excellence in Azerbaijan", az: "Cyberspace Azərbaycanda 15 il IT mükəmməlliyini qeyd edir", ru: "Cyberspace отмечает 15 лет IT-превосходства в Азербайджане" },
    excerpt: { en: "Founded in 2009, Cyberspace has grown from a small reseller to the leading IT distributor in Azerbaijan, serving over 1,000 enterprise and SMB clients.", az: "2009-cu ildə yaradılan Cyberspace kiçik bir distribütordən 1000-dən çox müştəriyə xidmət göstərən Azərbaycanın aparıcı IT distribütorunə çevrilib.", ru: "Основанная в 2009 году, Cyberspace выросла из небольшого реселлера в ведущего IT-дистрибьютора Азербайджана, обслуживающего более 1000 клиентов." },
    body: {
      en: [
        "This year marks Cyberspace's 15th anniversary — a milestone that reflects our team's commitment to bringing world-class IT infrastructure to Azerbaijani businesses, government institutions, and educational organisations since 2009.",
        "What began as a small hardware reseller in central Baku has grown into the country's leading IT distributor, representing over 100 global technology brands including Dell Technologies, Cisco, Microsoft, Fortinet, HPE, and Lenovo. Today our team of 50+ engineers, sales consultants and project managers serves more than 1,000 active enterprise and SMB clients.",
        "Key milestones over 15 years include achieving Cisco Gold Partner status, becoming a Dell Titanium Partner, and opening our logistics and pre-sales integration centre in the Heydar Aliyev Business Centre. We have successfully delivered data centre infrastructure for several state ministries and major banking institutions across Azerbaijan.",
        "We thank our clients, partners and team members for 15 years of trust. As we look ahead, Cyberspace is expanding its cloud professional services practice and launching a new cybersecurity operations centre to serve Azerbaijan's growing digital economy.",
      ],
      az: [
        "Bu il Cyberspace-in 15-ci yubileyi - komandamızın 2009-cu ildən Azərbaycan müəssisələrinə, dövlət qurumlarına və təhsil təşkilatlarına dünya səviyyəli İT infrastrukturu gətirmək öhdəliyini əks etdirən bir məruz hədd.",
        "Bakının mərkəzindəki kiçik hardware distribütoru kimi başladığımız şey, Dell Technologies, Cisco, Microsoft, Fortinet, HPE və Lenovo daxil olmaqla 100-dən çox qlobal texnologiya brendini təmsil edən ölkənin aparıcı IT distribütoruna çevrilib.",
        "15 il ərzindəki əsas dönüm nöqtələrinə Cisco Gold Partner statusunun əldə edilməsi, Dell Titanium Partner olması daxildir. Azərbaycanın bir neçə dövlət nazirliyi üçün data mərkəzi infrastrukturunu uğurla çatdırdıq.",
        "15 il ərzindəki güvənləri üçün müştərilərimizə, partnyorlarımıza və komanda üzvlərimizə təşəkkür edirik.",
      ],
      ru: [
        "В этом году Cyberspace отмечает 15-летие — веху, отражающую приверженность нашей команды привнесению ИТ-инфраструктуры мирового класса в азербайджанский бизнес, государственные учреждения и образовательные организации с 2009 года.",
        "То, что началось как небольшой реселлер оборудования в центре Баку, превратилось в ведущего ИТ-дистрибьютора страны, представляющего более 100 мировых технологических брендов, включая Dell Technologies, Cisco, Microsoft, Fortinet, HPE и Lenovo.",
        "Ключевые вехи за 15 лет включают получение статуса Cisco Gold Partner, статуса Dell Titanium Partner и успешную реализацию инфраструктуры центров обработки данных для нескольких государственных министерств.",
        "Мы благодарим наших клиентов, партнёров и сотрудников за 15 лет доверия.",
      ],
    },
  },
  {
    id: "n6", date: "2026-07-14",
    image: "https://picsum.photos/seed/cyberspace-n6/800/450",
    author: "Cyberspace Team",
    category: { en: "Solutions", az: "Həllər", ru: "Решения" },
    title: { en: "HPE storage solutions for hybrid cloud environments", az: "Hibrid bulud mühitləri üçün HPE yaddaş həlləri", ru: "Решения HPE для хранения данных в гибридных облачных средах" },
    excerpt: { en: "HPE's latest storage portfolio including the MSL3040 tape library provides cost-effective, high-capacity data protection for your hybrid cloud strategy.", az: "MSL3040 lent kitabxanasını da əhatə edən HPE-nin son yaddaş portfeli hibrid bulud strategiyanız üçün sərfəli yüksək tutumlu məlumat qorunması təmin edir.", ru: "Новейший портфель СХД HPE, включая ленточную библиотеку MSL3040, обеспечивает экономичную защиту данных большой ёмкости." },
    body: {
      en: [
        "Cyberspace has expanded its HPE storage portfolio to cover the full spectrum of hybrid cloud data management, from all-flash primary storage to long-term tape archiving — now fully stocked and available for immediate project deployment in Azerbaijan.",
        "HPE Nimble Storage dHCI disaggregated HCI and HPE Primera all-flash arrays deliver sub-millisecond latency for tier-1 workloads such as Oracle, SAP HANA and Microsoft SQL Server. HPE InfoSight predictive analytics uses machine learning to predict and prevent issues before they impact production, reducing unplanned downtime by up to 86% for existing HPE customers.",
        "For backup and archiving, the HPE MSL3040 tape library provides up to 2.9 PB of compressed capacity with LTO-9 tape technology, offering a cents-per-gigabyte cost model far below that of public cloud archive tiers. Integration with HPE StoreOnce deduplication appliances creates a complete disk-to-disk-to-tape backup chain suitable for 5-to-7 year regulatory retention requirements.",
        "Our certified HPE Presales Engineers can design a storage architecture matched to your RPO/RTO requirements, budget and existing infrastructure. Contact Cyberspace for a complimentary storage assessment.",
      ],
      az: [
        "Cyberspace, HPE yaddaş portfelini tam hibrid bulud məlumat idarəetməsini əhatə etmək üçün genişləndirib - hamısı indi Azərbaycanda dərhal layihə yerləşdirməsi üçün stokdadır.",
        "HPE Nimble Storage dHCI və HPE Primera tam flaş massivlər Oracle, SAP HANA və Microsoft SQL Server kimi birinci dərəcəli iş yükləri üçün millisaniyəaltı gecikmə təmin edir.",
        "Ehtiyat nüsxə üçün HPE MSL3040 lent kitabxanası LTO-9 lent texnologiyası ilə 2.9 PB sıxılmış tutuma qədər təmin edir.",
        "Sertifikatlı HPE Presales Mühəndislərimiz sizin tələblərinizə uyğun yaddaş arxitekturası dizayn edə bilər. Pulsuz qiymətləndirmə üçün Cyberspace ilə əlaqə saxlayın.",
      ],
      ru: [
        "Cyberspace расширила портфель СХД HPE для охвата всего спектра управления данными в гибридном облаке — от флэш-хранилища первичных данных до долгосрочного ленточного архивирования.",
        "Всефлэш-массивы HPE Nimble Storage dHCI и HPE Primera обеспечивают субмиллисекундную задержку для рабочих нагрузок первого уровня, таких как Oracle, SAP HANA и Microsoft SQL Server.",
        "Для резервного копирования ленточная библиотека HPE MSL3040 обеспечивает до 2,9 ПБ сжатой ёмкости с технологией ленты LTO-9.",
        "Наши сертифицированные инженеры HPE могут разработать архитектуру хранения, соответствующую вашим требованиям RPO/RTO и бюджету.",
      ],
    },
  },
  {
    id: "n7", date: "2026-06-28",
    image: "https://picsum.photos/seed/cyberspace-n7/800/450",
    author: "Cyberspace Team",
    category: { en: "Networking", az: "Şəbəkə", ru: "Сети" },
    title: { en: "Wi-Fi 6 upgrades: Cisco Meraki and HPE Aruba now in stock", az: "Wi-Fi 6 yeniləmələri: Cisco Meraki və HPE Aruba indi stokdadır", ru: "Обновление до Wi-Fi 6: Cisco Meraki и HPE Aruba уже в наличии" },
    excerpt: { en: "Upgrade your office or campus network with Wi-Fi 6 access points from Cisco Meraki and HPE Aruba, now available for immediate delivery.", az: "Cisco Meraki və HPE Aruba-dan Wi-Fi 6 giriş nöqtələri ilə ofis və ya kampus şəbəkənizi yeniləyin, indi dərhal çatdırılma üçün mövcuddur.", ru: "Обновите корпоративную или кампусную сеть с точками доступа Wi-Fi 6 от Cisco Meraki и HPE Aruba — доступны к немедленной отгрузке." },
    body: {
      en: [
        "Cyberspace now stocks the latest Wi-Fi 6 (802.11ax) access points from both Cisco Meraki and HPE Aruba Networking, giving enterprise and campus customers a choice of two industry-leading platforms for their wireless LAN modernisation projects.",
        "The Cisco Meraki MR46 and MR86 deliver up to 5.9 Gbps aggregate throughput with 8-stream MU-MIMO and OFDMA, significantly reducing per-client latency in high-density environments such as open-plan offices, conference centres and university lecture halls. Meraki's cloud-first management platform enables zero-touch provisioning and centrally managed RF optimisation.",
        "HPE Aruba AP-515 and AP-635 access points integrate seamlessly with Aruba Central's AI-powered operations, providing automated RF management, anomaly detection, and application-level visibility across the wireless network. For organisations requiring on-premise control, Aruba Mobility Controllers offer an alternative to cloud management while maintaining the same rich feature set.",
        "Cyberspace provides site surveys, RF planning, installation, and post-deployment optimisation for both platforms. Ask our wireless team for a comparison report tailored to your building layout and user density.",
      ],
      az: [
        "Cyberspace indi Cisco Meraki və HPE Aruba Networking-dən ən son Wi-Fi 6 (802.11ax) giriş nöqtələrini stokda saxlayır.",
        "Cisco Meraki MR46 və MR86 8 axınlı MU-MIMO və OFDMA ilə 5.9 Gbps-ə qədər ümumi keçicilik təmin edir. Meraki-nin bulud-birinci idarəetmə platforması sıfır toxunuşlu quraşdırmaya imkan verir.",
        "HPE Aruba AP-515 və AP-635 giriş nöqtələri Aruba Central-ın süni intellekt ilə işləyən əməliyyatları ilə inteqrasiya olunur, simsiz şəbəkə üzərindən avtomatlaşdırılmış RF idarəetməsi təqdim edir.",
        "Cyberspace hər iki platforma üçün sahə sorğuları, RF planlaması, quraşdırma və yerləşdirmə sonrası optimallaşdırma təmin edir.",
      ],
      ru: [
        "Cyberspace теперь хранит новейшие точки доступа Wi-Fi 6 (802.11ax) как от Cisco Meraki, так и от HPE Aruba Networking, предоставляя корпоративным и кампусным клиентам выбор из двух ведущих платформ.",
        "Cisco Meraki MR46 и MR86 обеспечивают до 5,9 Гбит/с совокупной пропускной способности с 8-потоковым MU-MIMO и OFDMA, значительно снижая задержку на клиента в средах с высокой плотностью.",
        "Точки доступа HPE Aruba AP-515 и AP-635 интегрируются с операциями на базе ИИ Aruba Central, обеспечивая автоматизированное управление RF и видимость на уровне приложений.",
        "Cyberspace предоставляет обследование объекта, планирование RF, установку и оптимизацию после развёртывания для обеих платформ.",
      ],
    },
  },
];
