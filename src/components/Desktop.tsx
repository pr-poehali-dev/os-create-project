import { useState } from 'react';
import Taskbar from '@/components/Taskbar';
import StartMenu from '@/components/StartMenu';
import Window from '@/components/Window';
import DesktopIcon from '@/components/DesktopIcon';
import { appRegistry } from '@/lib/apps';

interface DesktopProps {
  username: string;
}

export interface OpenWindow {
  id: string;
  appId: string;
  title: string;
  icon: string;
  minimized: boolean;
  zIndex: number;
}

export default function Desktop({ username }: DesktopProps) {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  const handleOpenApp = (appId: string) => {
    const app = appRegistry[appId];
    if (!app) return;

    const existingWindow = openWindows.find(w => w.appId === appId);
    if (existingWindow) {
      setOpenWindows(prev =>
        prev.map(w =>
          w.id === existingWindow.id
            ? { ...w, minimized: false, zIndex: nextZIndex }
            : w
        )
      );
      setNextZIndex(prev => prev + 1);
      return;
    }

    const newWindow: OpenWindow = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: app.name,
      icon: app.icon,
      minimized: false,
      zIndex: nextZIndex,
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
    setShowStartMenu(false);
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const handleMinimizeWindow = (id: string) => {
    setOpenWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, minimized: true } : w))
    );
  };

  const handleRestoreWindow = (id: string) => {
    setOpenWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
      )
    );
    setNextZIndex(prev => prev + 1);
  };

  const handleFocusWindow = (id: string) => {
    setOpenWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
    );
    setNextZIndex(prev => prev + 1);
  };

  const desktopApps = ['calculator', 'notepad', 'paint', 'browser', 'files'];

  return (
    <div 
      className="h-full w-full relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
      onClick={() => setShowStartMenu(false)}
    >
      <div className="absolute inset-0 p-4 grid grid-cols-6 gap-4 content-start">
        {desktopApps.map((appId) => (
          <DesktopIcon
            key={appId}
            appId={appId}
            onOpen={handleOpenApp}
          />
        ))}
      </div>

      {openWindows.map((window) => (
        !window.minimized && (
          <Window
            key={window.id}
            id={window.id}
            appId={window.appId}
            title={window.title}
            icon={window.icon}
            zIndex={window.zIndex}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
          />
        )
      ))}

      {showStartMenu && (
        <StartMenu
          onOpenApp={handleOpenApp}
          onClose={() => setShowStartMenu(false)}
          username={username}
        />
      )}

      <Taskbar
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        openWindows={openWindows}
        onWindowClick={handleRestoreWindow}
      />
    </div>
  );
}
