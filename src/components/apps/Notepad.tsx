import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Notepad() {
  const [text, setText] = useState('');

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-2 flex items-center gap-2 bg-white">
        <Button variant="ghost" size="sm">
          <Icon name="File" size={16} className="mr-2" />
          Файл
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="Edit" size={16} className="mr-2" />
          Правка
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="Search" size={16} className="mr-2" />
          Поиск
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Начните печатать..."
        className="flex-1 border-0 rounded-none resize-none focus-visible:ring-0 font-mono"
      />
    </div>
  );
}
