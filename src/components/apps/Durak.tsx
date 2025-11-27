import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Durak() {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['6', '7', '8', '9', '10', 'В', 'Д', 'К', 'Т'];

  return (
    <div className="h-full bg-gradient-to-br from-red-900 to-amber-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="text-white">
          <div className="text-sm opacity-70">Колода</div>
          <div className="text-2xl font-bold">36 карт</div>
        </div>
        <div className="text-white text-center">
          <div className="text-sm opacity-70">Козырь</div>
          <div className="text-4xl">♥</div>
        </div>
        <Button className="bg-white text-red-900 hover:bg-gray-100">
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Новая игра
        </Button>
      </div>

      <div className="space-y-8">
        <div>
          <div className="text-white text-sm mb-2 opacity-70">Противник</div>
          <div className="flex gap-2">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-16 h-24 bg-blue-900 border-2 border-blue-700 rounded-lg flex items-center justify-center"
              >
                <div className="text-white text-2xl">🂠</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-950/50 rounded-lg p-6 min-h-32 flex items-center justify-center">
          <div className="text-white text-center opacity-50">
            Игровое поле
          </div>
        </div>

        <div>
          <div className="text-white text-sm mb-2 opacity-70">Ваши карты</div>
          <div className="flex gap-2 justify-center">
            {ranks.slice(0, 6).map((rank, index) => (
              <div
                key={index}
                className="w-16 h-24 bg-white border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:transform hover:-translate-y-2 transition-transform"
              >
                <div className={`text-2xl ${index % 2 ? 'text-red-600' : 'text-black'}`}>
                  {rank}
                </div>
                <div className={`text-xl ${index % 2 ? 'text-red-600' : 'text-black'}`}>
                  {suits[index % 4]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
