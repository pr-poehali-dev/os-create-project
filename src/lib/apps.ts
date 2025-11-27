export interface App {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export const appRegistry: Record<string, App> = {
  calculator: {
    id: 'calculator',
    name: 'Калькулятор',
    icon: 'Calculator',
    category: 'Утилиты',
  },
  snake: {
    id: 'snake',
    name: 'Змейка',
    icon: 'Gamepad2',
    category: 'Игры',
  },
  solitaire: {
    id: 'solitaire',
    name: 'Пасьянс',
    icon: 'Spade',
    category: 'Игры',
  },
  durak: {
    id: 'durak',
    name: 'Дурак',
    icon: 'Club',
    category: 'Игры',
  },
  paint: {
    id: 'paint',
    name: 'Paint',
    icon: 'Paintbrush',
    category: 'Графика',
  },
  notepad: {
    id: 'notepad',
    name: 'Блокнот',
    icon: 'FileText',
    category: 'Утилиты',
  },
  clock: {
    id: 'clock',
    name: 'Часы',
    icon: 'Clock',
    category: 'Утилиты',
  },
  browser: {
    id: 'browser',
    name: 'Браузер',
    icon: 'Globe',
    category: 'Интернет',
  },
  settings: {
    id: 'settings',
    name: 'Настройки',
    icon: 'Settings',
    category: 'Система',
  },
  spreadsheet: {
    id: 'spreadsheet',
    name: 'Таблицы',
    icon: 'Table',
    category: 'Офис',
  },
  documents: {
    id: 'documents',
    name: 'Документы',
    icon: 'FileText',
    category: 'Офис',
  },
  presentations: {
    id: 'presentations',
    name: 'Презентации',
    icon: 'Presentation',
    category: 'Офис',
  },
  phone: {
    id: 'phone',
    name: 'Телефон',
    icon: 'Phone',
    category: 'Связь',
  },
  contacts: {
    id: 'contacts',
    name: 'Контакты',
    icon: 'Users',
    category: 'Связь',
  },
  appstore: {
    id: 'appstore',
    name: 'Магазин',
    icon: 'ShoppingBag',
    category: 'Система',
  },
  files: {
    id: 'files',
    name: 'Файлы',
    icon: 'Folder',
    category: 'Система',
  },
};

export const getAppsByCategory = () => {
  const categories: Record<string, App[]> = {};
  
  Object.values(appRegistry).forEach(app => {
    if (!categories[app.category]) {
      categories[app.category] = [];
    }
    categories[app.category].push(app);
  });
  
  return categories;
};
