import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo context cho i18n
const I18nContext = createContext({
   locale: "vi",
   setLocale: () => { },
   t: (key) => key,
});

// Hook để sử dụng i18n
const useI18n = () => {
   const context = useContext(I18nContext);
   if (!context) {
      throw new Error("useI18n must be used within an I18nProvider");
   }
   return context;
};

// Provider component
const I18nProvider = ({ children }) => {
   // Lấy locale từ localStorage hoặc sử dụng locale mặc định
   const [locale, setLocale] = useState(() => {
      const savedLocale = localStorage.getItem("locale");
      return savedLocale || "vi";
   });

   // State cho translations
   const [translations, setTranslations] = useState({});

   // Cập nhật locale trong localStorage khi locale thay đổi
   useEffect(() => {
      localStorage.setItem("locale", locale);

      // Tải translations cho locale
      const loadTranslations = async () => {
         // Trong thực tế, bạn sẽ tải translations từ API hoặc file JSON
         // Ở đây, chúng ta sẽ sử dụng dữ liệu mẫu
         const mockTranslations = {
            vi: {
               welcome: "Chào mừng bạn đến với Demo Đa Ngôn Ngữ",
               description: "Demo này minh họa cách triển khai tính năng đa ngôn ngữ (i18n) trong React.",
               selectLanguage: "Chọn ngôn ngữ:",
               vietnamese: "Tiếng Việt",
               english: "Tiếng Anh",
               french: "Tiếng Pháp",
               japanese: "Tiếng Nhật",
               dashboard: {
                  title: "Bảng Điều Khiển",
                  welcome: "Xin chào, {name}!",
                  stats: "Thống kê",
                  visits: "Lượt truy cập",
                  sales: "Doanh số",
                  orders: "Đơn hàng",
                  viewDetails: "Xem chi tiết",
               },
               profile: {
                  title: "Hồ Sơ Cá Nhân",
                  name: "Họ và tên",
                  email: "Email",
                  role: "Vai trò",
                  lastLogin: "Đăng nhập cuối",
                  updateProfile: "Cập nhật hồ sơ",
               },
               settings: {
                  title: "Cài Đặt",
                  language: "Ngôn ngữ",
                  notifications: "Thông báo",
                  darkMode: "Chế độ tối",
                  privacy: "Quyền riêng tư",
                  saveChanges: "Lưu thay đổi",
               },
               buttons: {
                  save: "Lưu",
                  cancel: "Hủy",
                  edit: "Sửa",
                  delete: "Xóa",
                  confirm: "Xác nhận",
               },
               dates: {
                  today: "Hôm nay",
                  yesterday: "Hôm qua",
                  tomorrow: "Ngày mai",
                  days: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
                  months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
               },
            },
            en: {
               welcome: "Welcome to the Internationalization Demo",
               description: "This demo illustrates how to implement internationalization (i18n) in React.",
               selectLanguage: "Select language:",
               vietnamese: "Vietnamese",
               english: "English",
               french: "French",
               japanese: "Japanese",
               dashboard: {
                  title: "Dashboard",
                  welcome: "Hello, {name}!",
                  stats: "Statistics",
                  visits: "Visits",
                  sales: "Sales",
                  orders: "Orders",
                  viewDetails: "View details",
               },
               profile: {
                  title: "Profile",
                  name: "Full name",
                  email: "Email",
                  role: "Role",
                  lastLogin: "Last login",
                  updateProfile: "Update profile",
               },
               settings: {
                  title: "Settings",
                  language: "Language",
                  notifications: "Notifications",
                  darkMode: "Dark mode",
                  privacy: "Privacy",
                  saveChanges: "Save changes",
               },
               buttons: {
                  save: "Save",
                  cancel: "Cancel",
                  edit: "Edit",
                  delete: "Delete",
                  confirm: "Confirm",
               },
               dates: {
                  today: "Today",
                  yesterday: "Yesterday",
                  tomorrow: "Tomorrow",
                  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
               },
            },
            fr: {
               welcome: "Bienvenue dans la Démo d'Internationalisation",
               description: "Cette démo illustre comment implémenter l'internationalisation (i18n) dans React.",
               selectLanguage: "Sélectionnez la langue:",
               vietnamese: "Vietnamien",
               english: "Anglais",
               french: "Français",
               japanese: "Japonais",
               dashboard: {
                  title: "Tableau de Bord",
                  welcome: "Bonjour, {name}!",
                  stats: "Statistiques",
                  visits: "Visites",
                  sales: "Ventes",
                  orders: "Commandes",
                  viewDetails: "Voir les détails",
               },
               profile: {
                  title: "Profil",
                  name: "Nom complet",
                  email: "Email",
                  role: "Rôle",
                  lastLogin: "Dernière connexion",
                  updateProfile: "Mettre à jour le profil",
               },
               settings: {
                  title: "Paramètres",
                  language: "Langue",
                  notifications: "Notifications",
                  darkMode: "Mode sombre",
                  privacy: "Confidentialité",
                  saveChanges: "Enregistrer les modifications",
               },
               buttons: {
                  save: "Enregistrer",
                  cancel: "Annuler",
                  edit: "Modifier",
                  delete: "Supprimer",
                  confirm: "Confirmer",
               },
               dates: {
                  today: "Aujourd'hui",
                  yesterday: "Hier",
                  tomorrow: "Demain",
                  days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                  months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
               },
            },
            ja: {
               welcome: "国際化デモへようこそ",
               description: "このデモでは、Reactでの国際化（i18n）の実装方法を示しています。",
               selectLanguage: "言語を選択:",
               vietnamese: "ベトナム語",
               english: "英語",
               french: "フランス語",
               japanese: "日本語",
               dashboard: {
                  title: "ダッシュボード",
                  welcome: "こんにちは、{name}さん！",
                  stats: "統計",
                  visits: "訪問数",
                  sales: "売上高",
                  orders: "注文数",
                  viewDetails: "詳細を見る",
               },
               profile: {
                  title: "プロフィール",
                  name: "氏名",
                  email: "メール",
                  role: "役割",
                  lastLogin: "最終ログイン",
                  updateProfile: "プロフィールを更新",
               },
               settings: {
                  title: "設定",
                  language: "言語",
                  notifications: "通知",
                  darkMode: "ダークモード",
                  privacy: "プライバシー",
                  saveChanges: "変更を保存",
               },
               buttons: {
                  save: "保存",
                  cancel: "キャンセル",
                  edit: "編集",
                  delete: "削除",
                  confirm: "確認",
               },
               dates: {
                  today: "今日",
                  yesterday: "昨日",
                  tomorrow: "明日",
                  days: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
                  months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
               },
            },
         };

         setTranslations(mockTranslations);
      };

      loadTranslations();
   }, [locale]);

   // Hàm translate
   const t = (key, params = {}) => {
      // Lấy translation từ key (hỗ trợ nested keys: "dashboard.title")
      const keys = key.split(".");
      let translation = translations[locale];

      // Nếu translations chưa được tải, trả về key
      if (!translation) return key;

      // Lấy translation từ nested keys
      for (const k of keys) {
         translation = translation?.[k];
         if (!translation) return key;
      }

      // Thay thế các tham số trong translation
      if (typeof translation === "string") {
         return Object.entries(params).reduce(
            (acc, [paramKey, paramValue]) => acc.replace(`{${paramKey}}`, paramValue),
            translation
         );
      }

      return translation;
   };

   return (
      <I18nContext.Provider value={{ locale, setLocale, t }}>
         {children}
      </I18nContext.Provider>
   );
};

// Component chọn ngôn ngữ
const LanguageSelector = () => {
   const { locale, setLocale, t } = useI18n();

   const languages = [
      { code: "vi", name: t("vietnamese"), flag: "🇻🇳" },
      { code: "en", name: t("english"), flag: "🇬🇧" },
      { code: "fr", name: t("french"), flag: "🇫🇷" },
      { code: "ja", name: t("japanese"), flag: "🇯🇵" },
   ];

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h3 className="font-bold mb-2">{t("selectLanguage")}</h3>
         <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
               <button
                  key={language.code}
                  onClick={() => setLocale(language.code)}
                  className={`px-4 py-2 rounded flex items-center ${locale === language.code
                     ? "bg-blue-500 text-white"
                     : "bg-gray-200 dark:bg-gray-700"
                     }`}
               >
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
               </button>
            ))}
         </div>
      </div>
   );
};

// Component Dashboard
const Dashboard = () => {
   const { t } = useI18n();

   const stats = [
      { id: 1, name: t("dashboard.visits"), value: "12,345", icon: "👁️" },
      { id: 2, name: t("dashboard.sales"), value: "$9,876", icon: "💰" },
      { id: 3, name: t("dashboard.orders"), value: "1,234", icon: "📦" },
   ];

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h3 className="text-lg font-bold mb-4">{t("dashboard.title")}</h3>
         <p className="mb-4">{t("dashboard.welcome", { name: "Nguyễn Văn A" })}</p>

         <h4 className="font-bold mb-2">{t("dashboard.stats")}</h4>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat) => (
               <div key={stat.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <div className="flex items-center mb-2">
                     <span className="text-2xl mr-2">{stat.icon}</span>
                     <span className="font-medium">{stat.name}</span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <a href="#" className="text-blue-500 text-sm hover:underline">
                     {t("dashboard.viewDetails")}
                  </a>
               </div>
            ))}
         </div>
      </div>
   );
};

// Component Profile
const Profile = () => {
   const { t } = useI18n();

   const profile = {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      role: "Admin",
      lastLogin: "2023-06-15 14:30",
   };

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h3 className="text-lg font-bold mb-4">{t("profile.title")}</h3>

         <div className="space-y-4">
            <div>
               <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("profile.name")}
               </label>
               <div className="mt-1">{profile.name}</div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("profile.email")}
               </label>
               <div className="mt-1">{profile.email}</div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("profile.role")}
               </label>
               <div className="mt-1">{profile.role}</div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("profile.lastLogin")}
               </label>
               <div className="mt-1">{profile.lastLogin}</div>
            </div>

            <div>
               <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  {t("profile.updateProfile")}
               </button>
            </div>
         </div>
      </div>
   );
};

// Component Settings
const Settings = () => {
   const { t } = useI18n();

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h3 className="text-lg font-bold mb-4">{t("settings.title")}</h3>

         <div className="space-y-4">
            <div>
               <label className="block mb-2 font-medium">
                  {t("settings.language")}
               </label>
               <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                  <option>{t("vietnamese")}</option>
                  <option>{t("english")}</option>
                  <option>{t("french")}</option>
                  <option>{t("japanese")}</option>
               </select>
            </div>

            <div>
               <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {t("settings.notifications")}
               </label>
            </div>

            <div>
               <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {t("settings.darkMode")}
               </label>
            </div>

            <div>
               <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {t("settings.privacy")}
               </label>
            </div>

            <div>
               <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  {t("settings.saveChanges")}
               </button>
            </div>
         </div>
      </div>
   );
};

// Component DateExample
const DateExample = () => {
   const { t } = useI18n();

   const today = new Date();
   const dayOfWeek = today.getDay();
   const month = today.getMonth();

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h3 className="text-lg font-bold mb-4">Date Localization</h3>

         <div className="space-y-2">
            <p>
               <span className="font-medium">{t("dates.today")}:</span>{" "}
               {t(`dates.days.${dayOfWeek}`)}, {t(`dates.months.${month}`)} {today.getDate()}, {today.getFullYear()}
            </p>

            <p>
               <span className="font-medium">{t("dates.yesterday")}:</span>{" "}
               {t(`dates.days.${(dayOfWeek - 1 + 7) % 7}`)}
            </p>

            <p>
               <span className="font-medium">{t("dates.tomorrow")}:</span>{" "}
               {t(`dates.days.${(dayOfWeek + 1) % 7}`)}
            </p>

            <div>
               <span className="font-medium">Days:</span>
               <ul className="list-disc pl-5 mt-1">
                  {Array.from({ length: 7 }).map((_, index) => (
                     <li key={index}>{t(`dates.days.${index}`)}</li>
                  ))}
               </ul>
            </div>

            <div>
               <span className="font-medium">Months:</span>
               <ul className="list-disc pl-5 mt-1">
                  {Array.from({ length: 12 }).map((_, index) => (
                     <li key={index}>{t(`dates.months.${index}`)}</li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

// Component ButtonsExample
const ButtonsExample = () => {
   const { t } = useI18n();

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h3 className="text-lg font-bold mb-4">Buttons</h3>

         <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
               {t("buttons.save")}
            </button>

            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
               {t("buttons.cancel")}
            </button>

            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
               {t("buttons.edit")}
            </button>

            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
               {t("buttons.delete")}
            </button>

            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
               {t("buttons.confirm")}
            </button>
         </div>
      </div>
   );
};

// Component chính
const I18nDemo = () => {
   return (
      <I18nProvider>
         <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h1 className="text-2xl font-bold mb-4">
                  <TranslatedText textKey="welcome" />
               </h1>
               <p className="mb-6">
                  <TranslatedText textKey="description" />
               </p>

               {/* Giải thích code */}
               <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
                  <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                     <li>Sử dụng Context API để chia sẻ translations và locale giữa các component</li>
                     <li>Lưu trữ tùy chọn locale trong localStorage để giữ nguyên khi tải lại trang</li>
                     <li>Hỗ trợ nested keys (e.g., "dashboard.title") để tổ chức translations</li>
                     <li>Hỗ trợ thay thế tham số trong translations (e.g., "Hello, {name}!")</li>
                     <li>Tách biệt logic i18n và UI, giúp dễ dàng thêm ngôn ngữ mới</li>
                  </ul>
               </div>
            </div>

            <LanguageSelector />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Dashboard />
               <Profile />
               <Settings />
               <DateExample />
               <ButtonsExample />
            </div>

            {/* Code Example */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

               <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
                  <pre className="text-sm">
                     {`// i18n.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Tạo context cho i18n
const I18nContext = createContext();

// Provider component
export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('locale') || 'vi';
  });
  
  const [translations, setTranslations] = useState({});
  
  useEffect(() => {
    localStorage.setItem('locale', locale);
    
    // Tải translations cho locale
    const loadTranslations = async () => {
      try {
        // Trong thực tế, bạn sẽ tải translations từ file JSON
        const response = await import(\`./locales/\${locale}.json\`);
        setTranslations(response.default);
      } catch (error) {
        console.error(\`Failed to load translations for \${locale}\`, error);
      }
    };
    
    loadTranslations();
  }, [locale]);
  
  // Hàm translate
  const t = (key, params = {}) => {
    // Lấy translation từ key (hỗ trợ nested keys: "dashboard.title")
    const keys = key.split('.');
    let translation = translations;
    
    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) return key;
    }
    
    // Thay thế các tham số trong translation
    if (typeof translation === 'string') {
      return Object.entries(params).reduce(
        (acc, [paramKey, paramValue]) => acc.replace(\`{\${paramKey}}\`, paramValue),
        translation
      );
    }
    
    return translation || key;
  };
  
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook để sử dụng i18n
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Component tiện ích để hiển thị text đã dịch
export const TranslatedText = ({ textKey, params }) => {
  const { t } = useI18n();
  return <>{t(textKey, params)}</>;
};

// Sử dụng trong ứng dụng
// App.js
import { I18nProvider } from './i18n';

function App() {
  return (
    <I18nProvider>
      <div className="app">
        <Header />
        <main>
          <Content />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}

// Component.js
import { useI18n, TranslatedText } from './i18n';

function Component() {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'John' })}</p>
      
      <button onClick={() => setLocale('en')}>English</button>
      <button onClick={() => setLocale('fr')}>Français</button>
      
      {/* Hoặc sử dụng component tiện ích */}
      <TranslatedText textKey="welcome" />
    </div>
  );
}`}
                  </pre>
               </div>
            </div>
         </div>
      </I18nProvider>
   );
};

// Component tiện ích để hiển thị text đã dịch
const TranslatedText = ({ textKey, params }) => {
   const { t } = useI18n();
   return <>{t(textKey, params)}</>;
};

export default I18nDemo;
