import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { OpenWindow } from '@/components/Desktop';
import { appRegistry } from '@/lib/apps';

interface TaskbarProps {
  onStartClick: () => void;
  openWindows: OpenWindow[];
  onWindowClick: (id: string) => void;
}

export default function Taskbar({ onStartClick, openWindows, onWindowClick }: TaskbarProps) {
  const currentTime = new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#1a1a1a] border-t border-gray-700 flex items-center px-2 gap-2 z-[9999]">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onStartClick();
        }}
        className="h-9 px-3 bg-[#0078d4] hover:bg-[#005a9e] text-white flex items-center gap-2"
      >
        <Icon name="Grid3x3" size={18} />
        <span className="font-medium">Пуск</span>
      </Button>

      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {openWindows.map((window) => {
          const app = appRegistry[window.appId];
          return (
            <Button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              variant="ghost"
              className={`h-9 px-3 flex items-center gap-2 ${
                !window.minimized
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-transparent hover:bg-gray-800'
              }`}
            >
              <Icon name={app.icon} size={16} />
              <span className="text-sm max-w-[120px] truncate">{window.title}</span>
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-white text-sm px-3">
        <div className="flex items-center gap-2">
          <Icon name="Volume2" size={16} />
          <Icon name="Wifi" size={16} />
        </div>
        <div className="text-right">
          <div className="font-medium">{currentTime}</div>
          <div className="text-xs text-gray-400">{currentDate}</div>
        </div>
      </div>
    </div>
  );
}
