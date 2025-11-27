import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function Documents() {
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="border-b bg-white p-2 space-y-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Icon name="File" size={16} className="mr-2" />
            Файл
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Edit" size={16} className="mr-2" />
            Правка
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Eye" size={16} className="mr-2" />
            Вид
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isBold ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsBold(!isBold)}
          >
            <Icon name="Bold" size={16} />
          </Button>
          <Button
            variant={isItalic ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsItalic(!isItalic)}
          >
            <Icon name="Italic" size={16} />
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Underline" size={16} />
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm">Размер:</span>
            <Input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-16 h-8"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center p-8 overflow-auto">
        <div className="bg-white shadow-lg w-full max-w-3xl p-12 min-h-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Начните печатать документ..."
            className="w-full h-full border-0 outline-none resize-none"
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal',
            }}
          />
        </div>
      </div>
    </div>
  );
}
