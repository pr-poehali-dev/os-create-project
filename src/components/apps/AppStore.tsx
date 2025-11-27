import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const apps = [
  { name: 'Фоторедактор', category: 'Графика', icon: 'Image', rating: 4.5 },
  { name: 'Видеоплеер', category: 'Медиа', icon: 'Video', rating: 4.8 },
  { name: 'Музыка', category: 'Медиа', icon: 'Music', rating: 4.6 },
  { name: 'Календарь', category: 'Продуктивность', icon: 'Calendar', rating: 4.7 },
  { name: 'Email', category: 'Связь', icon: 'Mail', rating: 4.4 },
  { name: 'Карты', category: 'Навигация', icon: 'Map', rating: 4.9 },
];

export default function AppStore() {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-3xl font-bold mb-2">Магазин приложений</h1>
        <p className="text-blue-100">Откройте для себя новые приложения</p>
      </div>
      <ScrollArea className="flex-1 p-6">
        <div className="grid grid-cols-2 gap-4">
          {apps.map((app, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Icon name={app.icon} size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{app.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{app.category}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                    <span>{app.rating}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-3 bg-blue-500 hover:bg-blue-600">
                Установить
              </Button>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
