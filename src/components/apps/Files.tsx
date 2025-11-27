import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: string;
}

export default function Files() {
  const [files] = useState<FileItem[]>([
    { name: 'Документы', type: 'folder', icon: 'Folder' },
    { name: 'Изображения', type: 'folder', icon: 'Folder' },
    { name: 'Музыка', type: 'folder', icon: 'Folder' },
    { name: 'Видео', type: 'folder', icon: 'Folder' },
    { name: 'Загрузки', type: 'folder', icon: 'FolderDown' },
    { name: 'Рабочий стол', type: 'folder', icon: 'Monitor' },
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-2 flex items-center gap-2 bg-white">
        <Button variant="ghost" size="sm">
          <Icon name="ArrowLeft" size={16} />
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="ArrowRight" size={16} />
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="ArrowUp" size={16} />
        </Button>
        <div className="flex-1 bg-gray-100 px-3 py-1 rounded text-sm">
          Этот компьютер
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="Search" size={16} />
        </Button>
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded hover:bg-gray-100 cursor-pointer"
            >
              <Icon name={file.icon} size={48} className="text-blue-500" />
              <span className="text-sm text-center">{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
