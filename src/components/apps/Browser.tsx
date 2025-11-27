import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Browser() {
  const [url, setUrl] = useState('https://www.example.com');

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-3 flex items-center gap-2 bg-white">
        <Button variant="ghost" size="icon">
          <Icon name="ArrowLeft" size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icon name="ArrowRight" size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icon name="RotateCw" size={18} />
        </Button>
        <div className="flex-1 flex items-center gap-2">
          <Icon name="Lock" size={16} className="text-green-600" />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
        </div>
        <Button variant="ghost" size="icon">
          <Icon name="Star" size={18} />
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <Icon name="Globe" size={64} className="mx-auto text-gray-300" />
          <p className="text-gray-500">Упрощённый браузер</p>
        </div>
      </div>
    </div>
  );
}
