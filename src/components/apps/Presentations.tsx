import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Slide {
  title: string;
  content: string;
}

export default function Presentations() {
  const [slides, setSlides] = useState<Slide[]>([
    { title: 'Слайд 1', content: 'Добро пожаловать в презентацию' },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const addSlide = () => {
    setSlides([...slides, { title: `Слайд ${slides.length + 1}`, content: '' }]);
  };

  const updateSlide = (field: 'title' | 'content', value: string) => {
    const updated = [...slides];
    updated[currentSlide][field] = value;
    setSlides(updated);
  };

  return (
    <div className="h-full flex">
      <div className="w-48 border-r bg-gray-50 p-2 overflow-auto">
        <Button onClick={addSlide} size="sm" className="w-full mb-2">
          <Icon name="Plus" size={14} className="mr-2" />
          Слайд
        </Button>
        <div className="space-y-2">
          {slides.map((slide, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${
                currentSlide === index ? 'bg-blue-50 border-blue-500' : ''
              }`}
            >
              <div className="text-xs font-medium mb-1">{slide.title}</div>
              <div className="w-full h-16 bg-white border rounded flex items-center justify-center text-xs text-gray-400">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b p-2 flex items-center gap-2 bg-white">
          <Button variant="ghost" size="sm">
            <Icon name="Play" size={16} className="mr-2" />
            Показать
          </Button>
        </div>
        <div className="flex-1 p-8 overflow-auto bg-gray-100">
          <div className="bg-white shadow-lg mx-auto max-w-4xl aspect-video p-12 space-y-6">
            <Input
              value={slides[currentSlide]?.title || ''}
              onChange={(e) => updateSlide('title', e.target.value)}
              className="text-4xl font-bold border-0 border-b rounded-none px-0"
              placeholder="Заголовок слайда"
            />
            <Textarea
              value={slides[currentSlide]?.content || ''}
              onChange={(e) => updateSlide('content', e.target.value)}
              className="text-lg border-0 resize-none h-64"
              placeholder="Содержимое слайда"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
