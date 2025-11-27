import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Calculator from '@/components/apps/Calculator';
import Snake from '@/components/apps/Snake';
import Solitaire from '@/components/apps/Solitaire';
import Durak from '@/components/apps/Durak';
import Paint from '@/components/apps/Paint';
import Notepad from '@/components/apps/Notepad';
import Clock from '@/components/apps/Clock';
import Browser from '@/components/apps/Browser';
import Settings from '@/components/apps/Settings';
import Spreadsheet from '@/components/apps/Spreadsheet';
import Documents from '@/components/apps/Documents';
import Presentations from '@/components/apps/Presentations';
import Phone from '@/components/apps/Phone';
import Contacts from '@/components/apps/Contacts';
import AppStore from '@/components/apps/AppStore';
import Files from '@/components/apps/Files';

interface WindowProps {
  id: string;
  appId: string;
  title: string;
  icon: string;
  zIndex: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
}

export default function Window({
  id,
  appId,
  title,
  icon,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus(id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isMaximized) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useState(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });

  const windowStyle = isMaximized
    ? {
        top: 0,
        left: 0,
        right: 0,
        bottom: '48px',
        width: 'auto',
        height: 'auto',
      }
    : {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '800px',
        height: '600px',
      };

  const renderApp = () => {
    switch (appId) {
      case 'calculator':
        return <Calculator />;
      case 'snake':
        return <Snake />;
      case 'solitaire':
        return <Solitaire />;
      case 'durak':
        return <Durak />;
      case 'paint':
        return <Paint />;
      case 'notepad':
        return <Notepad />;
      case 'clock':
        return <Clock />;
      case 'browser':
        return <Browser />;
      case 'settings':
        return <Settings />;
      case 'spreadsheet':
        return <Spreadsheet />;
      case 'documents':
        return <Documents />;
      case 'presentations':
        return <Presentations />;
      case 'phone':
        return <Phone />;
      case 'contacts':
        return <Contacts />;
      case 'appstore':
        return <AppStore />;
      case 'files':
        return <Files />;
      default:
        return <div className="p-4">Приложение в разработке</div>;
    }
  };

  return (
    <div
      className="absolute bg-white rounded-t-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      style={{ ...windowStyle, zIndex }}
      onClick={() => onFocus(id)}
    >
      <div
        className="h-9 bg-white border-b flex items-center justify-between px-3 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Icon name={icon} size={16} />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-gray-100"
            onClick={() => onMinimize(id)}
          >
            <Icon name="Minus" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-gray-100"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            <Icon name={isMaximized ? 'Minimize2' : 'Square'} size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-red-100 hover:text-red-600"
            onClick={() => onClose(id)}
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-gray-50">{renderApp()}</div>
    </div>
  );
}
