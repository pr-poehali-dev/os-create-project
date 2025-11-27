import Icon from '@/components/ui/icon';
import { appRegistry } from '@/lib/apps';

interface DesktopIconProps {
  appId: string;
  onOpen: (appId: string) => void;
}

export default function DesktopIcon({ appId, onOpen }: DesktopIconProps) {
  const app = appRegistry[appId];
  if (!app) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onOpen(appId);
      }}
      className="flex flex-col items-center gap-2 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group"
    >
      <div className="w-14 h-14 bg-white/90 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
        <Icon name={app.icon} size={32} className="text-blue-600" />
      </div>
      <span className="text-white text-xs font-medium text-center drop-shadow-lg max-w-[80px] line-clamp-2">
        {app.name}
      </span>
    </button>
  );
}
