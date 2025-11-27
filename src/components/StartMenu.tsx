import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { appRegistry, getAppsByCategory } from '@/lib/apps';
import { useState } from 'react';

interface StartMenuProps {
  onOpenApp: (appId: string) => void;
  onClose: () => void;
  username: string;
}

export default function StartMenu({ onOpenApp, username }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getAppsByCategory();

  const filteredApps = Object.values(appRegistry).filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="absolute bottom-12 left-2 w-[500px] h-[600px] bg-[#1a1a1a] rounded-t-lg shadow-2xl border border-gray-700 animate-in slide-in-from-bottom-4 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-700">
          <Input
            placeholder="Поиск приложений..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>

        <ScrollArea className="flex-1 p-4">
          {searchQuery ? (
            <div className="space-y-1">
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <Button
                    key={app.id}
                    onClick={() => onOpenApp(app.id)}
                    variant="ghost"
                    className="w-full justify-start h-12 px-4 hover:bg-gray-800 text-white"
                  >
                    <Icon name={app.icon} size={20} className="mr-3" />
                    <span className="text-base">{app.name}</span>
                  </Button>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  Приложения не найдены
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(categories).map(([category, apps]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2 px-2">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {apps.map((app) => (
                      <Button
                        key={app.id}
                        onClick={() => onOpenApp(app.id)}
                        variant="ghost"
                        className="w-full justify-start h-12 px-4 hover:bg-gray-800 text-white"
                      >
                        <Icon name={app.icon} size={20} className="mr-3" />
                        <span className="text-base">{app.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Icon name="User" size={20} className="text-white" />
            </div>
            <span className="text-white font-medium">{username}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Icon name="Power" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
