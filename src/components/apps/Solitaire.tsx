import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Solitaire() {
  const suits = ['♠', '♥', '♦', '♣'];
  const colors = ['black', 'red', 'red', 'black'];

  return (
    <div className="h-full bg-gradient-to-br from-green-700 to-green-900 p-8">
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4">
          {suits.map((suit, index) => (
            <div
              key={index}
              className="w-24 h-32 bg-green-800 border-2 border-green-600 rounded-lg flex items-center justify-center"
            >
              <span className={`text-4xl`} style={{ color: colors[index] }}>
                {suit}
              </span>
            </div>
          ))}
        </div>
        <Button className="bg-white text-green-900 hover:bg-gray-100">
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Новая игра
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="w-24 h-32 bg-green-800 border-2 border-dashed border-green-600 rounded-lg"
          />
        ))}
      </div>
      <div className="text-center text-white text-sm mt-8 opacity-70">
        Классический пасьянс Косынка
      </div>
    </div>
  );
}
