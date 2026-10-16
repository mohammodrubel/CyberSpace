export const LOCALES = ["az", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export type Dict = {
  nav: Record<"home" | "about" | "products" | "solutions" | "services" | "partners" | "news" | "careers" | "contact" | "shop" | "admin", string>;
  common: Record<string, string>;
  home: Record<string, string>;
  shop: Record<string, string>;
  product: Record<string, string>;
  inquiry: Record<string, string>;
  admin: Record<string, string>;
  footer: Record<string, string>;
};

const en: Dict = {
  nav: {
    home: "Home", about: "About Us", products: "Products", solutions: "Solutions", services: "Services",
    partners: "Partners", news: "News", careers: "Careers", contact: "Contact", shop: "Shop", admin: "Admin",
  },
  common: {
    viewAll: "View all", readMore: "Read more", search: "Search", contactMe: "Contact Me", inStock: "In Stock",
    outOfStock: "Out of Stock", partNo: "Part No", brand: "Brand", category: "Category", all: "All",
    loading: "Loading…", syncedFrom1C: "Synced from 1C", language: "Language", skipToContent: "Skip to content",
  },
  home: {
    eyebrow: "Your trusted IT distribution partner",
    heroTitle: "Technology for a Smarter Tomorrow",
    heroText: "We deliver reliable IT products, solutions and services to help businesses grow and stay secure.",
    exploreProducts: "Explore Products", ourSolutions: "Our Solutions",
    f1t: "Wide Product Portfolio", f1d: "from global brands",
    f2t: "Professional Support", f2d: "and expertise",
    f3t: "Reliable Supply Chain", f3d: "and logistics",
    f4t: "Long-Term Partnerships", f4d: "for your success",
    categoriesTitle: "Our Product Categories",
    aboutTitle: "Reliable Technology Stronger Businesses",
    aboutText: "Cyberspace is a leading IT distributor in Azerbaijan, providing a comprehensive range of products and solutions from world-class manufacturers.",
    aboutBtn: "About Us",
    statYears: "Years in Market", statBrands: "Global Brands", statCustomers: "Business Customers", statTeam: "Professional Team",
    partnersTitle: "Our Partners", newsTitle: "Latest News",
  },
  shop: {
    title: "Shop",
    subtitle: "Wide range of IT products from global manufacturers. Find the right solution for your business.",
    searchPlaceholder: "Search by product name, part number or keyword",
    categories: "Categories", brands: "Brand", priceRange: "Price Range", min: "Min", max: "Max",
    showing: "Showing", of: "of", products: "products", sortBy: "Sort by", sortRelevance: "Relevance",
    sortNameAsc: "Name A–Z", sortPriceAsc: "Price: low to high", sortPriceDesc: "Price: high to low",
    noResults: "No products match your filters.", reset: "Reset filters", showMore: "Show more", showLess: "Show less",
    gridView: "Grid view", listView: "List view",
  },
  product: {
    description: "Description", specifications: "Specifications", related: "Related Products", sku: "SKU",
    price: "Price", stock: "Stock", pcs: "pcs", priceOnRequest: "Price on request", back: "Back to shop",
    notFound: "Product not found.",
  },
  inquiry: {
    title: "Contact Me", name: "Your Name", namePh: "Enter your name", phone: "Phone Number", phonePh: "+994 XX XXX XX XX",
    message: "Additional Message (optional)", messagePh: "Your message", send: "Send Inquiry", sending: "Sending…",
    note: "Our team will contact you shortly.", success: "Thank you! Your inquiry was sent.", close: "Close",
    errName: "Please enter your name (at least 2 characters).", errPhone: "Please enter a valid phone number.",
    errSpam: "Spam check failed.", notRobot: "I'm not a robot",
  },
  admin: {
    title: "Admin Panel (demo)", note: "Demo only. In production this area is protected by authentication and role-based access control.",
    visibility: "Public display settings", showPrices: "Show prices on public site", showStock: "Show stock quantities on public site",
    hiddenNote: "Hidden values are removed from the data returned to the public site, not just hidden with CSS.",
    inquiries: "Customer inquiries", empty: "No inquiries yet. Submit one from any product page.",
    colProduct: "Product", colCustomer: "Customer", colPhone: "Phone", colDate: "Date", colStatus: "Status",
    statusNew: "New", statusInProgress: "In progress", statusDone: "Done",
    sync: "1C sync", lastSync: "Last sync", syncNow: "Sync now", interval: "Interval: every 15 minutes (mock)",
  },
  footer: {
    about: "Leading IT distributor in Azerbaijan.", quick: "Quick links", contact: "Contact", rights: "All rights reserved.",
    address: "Baku, Azerbaijan",
  },
};

const az: Dict = {
  nav: {
    home: "Ana səhifə", about: "Haqqımızda", products: "Məhsullar", solutions: "Həllər", services: "Xidmətlər",
    partners: "Tərəfdaşlar", news: "Xəbərlər", careers: "Karyera", contact: "Əlaqə", shop: "Mağaza", admin: "Admin",
  },
  common: {
    viewAll: "Hamısına bax", readMore: "Daha çox", search: "Axtar", contactMe: "Mənimlə əlaqə saxlayın", inStock: "Stokda var",
    outOfStock: "Stokda yoxdur", partNo: "Part No", brand: "Brend", category: "Kateqoriya", all: "Hamısı",
    loading: "Yüklənir…", syncedFrom1C: "1C ilə sinxronlaşıb", language: "Dil", skipToContent: "Məzmuna keç",
  },
  home: {
    eyebrow: "Etibarlı İT distribyutor tərəfdaşınız",
    heroTitle: "Daha ağıllı sabah üçün texnologiya",
    heroText: "Biznesin böyüməsi və təhlükəsiz qalması üçün etibarlı İT məhsulları, həllər və xidmətlər təqdim edirik.",
    exploreProducts: "Məhsullara bax", ourSolutions: "Həllərimiz",
    f1t: "Geniş məhsul çeşidi", f1d: "qlobal brendlərdən",
    f2t: "Peşəkar dəstək", f2d: "və təcrübə",
    f3t: "Etibarlı təchizat zənciri", f3d: "və logistika",
    f4t: "Uzunmüddətli tərəfdaşlıq", f4d: "sizin uğurunuz üçün",
    categoriesTitle: "Məhsul kateqoriyalarımız",
    aboutTitle: "Etibarlı texnologiya, güclü biznes",
    aboutText: "Cyberspace Azərbaycanın aparıcı İT distribyutorudur və dünya səviyyəli istehsalçıların məhsul və həllərini təklif edir.",
    aboutBtn: "Haqqımızda",
    statYears: "İl bazarda", statBrands: "Qlobal brend", statCustomers: "Biznes müştəri", statTeam: "Peşəkar komanda",
    partnersTitle: "Tərəfdaşlarımız", newsTitle: "Son xəbərlər",
  },
  shop: {
    title: "Mağaza",
    subtitle: "Qlobal istehsalçılardan geniş İT məhsul çeşidi. Biznesiniz üçün düzgün həlli tapın.",
    searchPlaceholder: "Məhsul adı, part nömrəsi və ya açar söz üzrə axtarın",
    categories: "Kateqoriyalar", brands: "Brend", priceRange: "Qiymət aralığı", min: "Min", max: "Maks",
    showing: "Göstərilir", of: "/", products: "məhsul", sortBy: "Sırala", sortRelevance: "Uyğunluq",
    sortNameAsc: "Ad A–Z", sortPriceAsc: "Qiymət: artan", sortPriceDesc: "Qiymət: azalan",
    noResults: "Filtrə uyğun məhsul tapılmadı.", reset: "Filtrləri sıfırla", showMore: "Daha çox", showLess: "Daha az",
    gridView: "Şəbəkə görünüşü", listView: "Siyahı görünüşü",
  },
  product: {
    description: "Təsvir", specifications: "Xüsusiyyətlər", related: "Əlaqəli məhsullar", sku: "SKU",
    price: "Qiymət", stock: "Stok", pcs: "ədəd", priceOnRequest: "Qiymət sorğu ilə", back: "Mağazaya qayıt",
    notFound: "Məhsul tapılmadı.",
  },
  inquiry: {
    title: "Mənimlə əlaqə saxlayın", name: "Adınız", namePh: "Adınızı daxil edin", phone: "Telefon nömrəsi", phonePh: "+994 XX XXX XX XX",
    message: "Əlavə mesaj (ixtiyari)", messagePh: "Mesajınız", send: "Sorğu göndər", sending: "Göndərilir…",
    note: "Komandamız tezliklə sizinlə əlaqə saxlayacaq.", success: "Təşəkkürlər! Sorğunuz göndərildi.", close: "Bağla",
    errName: "Adınızı daxil edin (ən azı 2 simvol).", errPhone: "Düzgün telefon nömrəsi daxil edin.",
    errSpam: "Spam yoxlaması uğursuz oldu.", notRobot: "Mən robot deyiləm",
  },
  admin: {
    title: "Admin panel (demo)", note: "Yalnız demo. Real layihədə bu bölmə autentifikasiya və rol əsaslı giriş ilə qorunur.",
    visibility: "İctimai göstərmə parametrləri", showPrices: "Qiymətləri saytda göstər", showStock: "Stok miqdarını saytda göstər",
    hiddenNote: "Gizlədilən dəyərlər yalnız CSS ilə deyil, ictimai saytın aldığı məlumatdan çıxarılır.",
    inquiries: "Müştəri sorğuları", empty: "Hələ sorğu yoxdur. İstənilən məhsul səhifəsindən göndərin.",
    colProduct: "Məhsul", colCustomer: "Müştəri", colPhone: "Telefon", colDate: "Tarix", colStatus: "Status",
    statusNew: "Yeni", statusInProgress: "İcrada", statusDone: "Tamamlandı",
    sync: "1C sinxronizasiyası", lastSync: "Son sinxronizasiya", syncNow: "İndi sinxronlaşdır", interval: "İnterval: hər 15 dəqiqə (mock)",
  },
  footer: {
    about: "Azərbaycanın aparıcı İT distribyutoru.", quick: "Sürətli keçidlər", contact: "Əlaqə", rights: "Bütün hüquqlar qorunur.",
    address: "Bakı, Azərbaycan",
  },
};

const ru: Dict = {
  nav: {
    home: "Главная", about: "О нас", products: "Продукты", solutions: "Решения", services: "Услуги",
    partners: "Партнёры", news: "Новости", careers: "Карьера", contact: "Контакты", shop: "Магазин", admin: "Админ",
  },
  common: {
    viewAll: "Смотреть все", readMore: "Подробнее", search: "Поиск", contactMe: "Свяжитесь со мной", inStock: "В наличии",
    outOfStock: "Нет в наличии", partNo: "Артикул", brand: "Бренд", category: "Категория", all: "Все",
    loading: "Загрузка…", syncedFrom1C: "Синхронизировано с 1C", language: "Язык", skipToContent: "К содержимому",
  },
  home: {
    eyebrow: "Ваш надёжный ИТ-дистрибьютор",
    heroTitle: "Технологии для умного завтра",
    heroText: "Мы поставляем надёжные ИТ-продукты, решения и услуги, чтобы бизнес рос и оставался защищённым.",
    exploreProducts: "Смотреть продукты", ourSolutions: "Наши решения",
    f1t: "Широкий ассортимент", f1d: "от мировых брендов",
    f2t: "Профессиональная поддержка", f2d: "и экспертиза",
    f3t: "Надёжная цепочка поставок", f3d: "и логистика",
    f4t: "Долгосрочное партнёрство", f4d: "для вашего успеха",
    categoriesTitle: "Категории продуктов",
    aboutTitle: "Надёжные технологии, сильный бизнес",
    aboutText: "Cyberspace — ведущий ИТ-дистрибьютор в Азербайджане, предлагающий широкий спектр продуктов и решений от мировых производителей.",
    aboutBtn: "О нас",
    statYears: "Лет на рынке", statBrands: "Мировых брендов", statCustomers: "Бизнес-клиентов", statTeam: "Профессиональная команда",
    partnersTitle: "Наши партнёры", newsTitle: "Последние новости",
  },
  shop: {
    title: "Магазин",
    subtitle: "Широкий ассортимент ИТ-продукции от мировых производителей. Найдите подходящее решение для бизнеса.",
    searchPlaceholder: "Поиск по названию, артикулу или ключевому слову",
    categories: "Категории", brands: "Бренд", priceRange: "Диапазон цен", min: "Мин", max: "Макс",
    showing: "Показано", of: "из", products: "товаров", sortBy: "Сортировка", sortRelevance: "По релевантности",
    sortNameAsc: "Название А–Я", sortPriceAsc: "Цена: по возрастанию", sortPriceDesc: "Цена: по убыванию",
    noResults: "Товары по фильтрам не найдены.", reset: "Сбросить фильтры", showMore: "Показать ещё", showLess: "Свернуть",
    gridView: "Сетка", listView: "Список",
  },
  product: {
    description: "Описание", specifications: "Характеристики", related: "Похожие товары", sku: "SKU",
    price: "Цена", stock: "Остаток", pcs: "шт.", priceOnRequest: "Цена по запросу", back: "Назад в магазин",
    notFound: "Товар не найден.",
  },
  inquiry: {
    title: "Свяжитесь со мной", name: "Ваше имя", namePh: "Введите имя", phone: "Номер телефона", phonePh: "+994 XX XXX XX XX",
    message: "Сообщение (необязательно)", messagePh: "Ваше сообщение", send: "Отправить запрос", sending: "Отправка…",
    note: "Наша команда свяжется с вами в ближайшее время.", success: "Спасибо! Ваш запрос отправлен.", close: "Закрыть",
    errName: "Введите имя (минимум 2 символа).", errPhone: "Введите корректный номер телефона.",
    errSpam: "Проверка на спам не пройдена.", notRobot: "Я не робот",
  },
  admin: {
    title: "Панель администратора (демо)", note: "Только демо. В продакшене этот раздел защищён аутентификацией и ролевым доступом.",
    visibility: "Настройки публичного отображения", showPrices: "Показывать цены на сайте", showStock: "Показывать остатки на сайте",
    hiddenNote: "Скрытые значения удаляются из данных, отдаваемых публичному сайту, а не просто прячутся через CSS.",
    inquiries: "Запросы клиентов", empty: "Запросов пока нет. Отправьте запрос со страницы любого товара.",
    colProduct: "Товар", colCustomer: "Клиент", colPhone: "Телефон", colDate: "Дата", colStatus: "Статус",
    statusNew: "Новый", statusInProgress: "В работе", statusDone: "Завершён",
    sync: "Синхронизация 1C", lastSync: "Последняя синхронизация", syncNow: "Синхронизировать", interval: "Интервал: каждые 15 минут (mock)",
  },
  footer: {
    about: "Ведущий ИТ-дистрибьютор в Азербайджане.", quick: "Быстрые ссылки", contact: "Контакты", rights: "Все права защищены.",
    address: "Баку, Азербайджан",
  },
};

export const dictionaries: Record<Locale, Dict> = { az, en, ru };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export const LOCALE_LABEL: Record<Locale, string> = { az: "AZ", en: "EN", ru: "RU" };
