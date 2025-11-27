import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const settingsCategories = [
  { name: 'Система', icon: 'Monitor', items: ['О системе', 'Обновления', 'Производительность'] },
  { name: 'Персонализация', icon: 'Palette', items: ['Фон', 'Цвета', 'Темы'] },
  { name: 'Учётные записи', icon: 'User', items: ['Профиль', 'Безопасность', 'Синхронизация'] },
  { name: 'Сеть', icon: 'Wifi', items: ['Wi-Fi', 'Ethernet', 'Прокси'] },
  { name: 'Конфиденциальность', icon: 'Shield', items: ['Разрешения', 'История', 'Данные'] },
];

export default function Settings() {
  return (
    <div className="h-full flex">
      <div className="w-64 border-r bg-gray-50 p-4">
        <h2 className="text-lg font-semibold mb-4">Настройки</h2>
        <div className="space-y-2">
          {settingsCategories.map((category, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-3 rounded hover:bg-gray-200 text-left"
            >
              <Icon name={category.icon} size={20} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      <ScrollArea className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Система</h1>
        <div className="space-y-4">
          {settingsCategories[0].items.map((item, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-medium">{item}</h3>
              <p className="text-sm text-gray-500 mt-1">Настройки {item.toLowerCase()}</p>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
