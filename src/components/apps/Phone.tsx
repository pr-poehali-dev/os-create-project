import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Phone() {
  const [number, setNumber] = useState('');

  const handleDigit = (digit: string) => {
    if (number.length < 15) {
      setNumber(number + digit);
    }
  };

  const handleDelete = () => {
    setNumber(number.slice(0, -1));
  };

  const handleCall = () => {
    if (number) {
      alert(`Звонок на номер: ${number}`);
    }
  };

  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
        <div className="bg-gray-100 rounded-lg p-4 mb-6 h-16 flex items-center justify-center">
          <div className="text-2xl font-mono text-gray-800">
            {number || 'Введите номер'}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {buttons.map((btn) => (
            <Button
              key={btn}
              onClick={() => handleDigit(btn)}
              variant="outline"
              className="h-14 text-xl font-semibold hover:bg-blue-50"
            >
              {btn}
            </Button>
          ))}
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleDelete}
            variant="outline"
            className="flex-1 h-14"
          >
            <Icon name="Delete" size={20} />
          </Button>
          <Button
            onClick={handleCall}
            disabled={!number}
            className="flex-1 h-14 bg-green-500 hover:bg-green-600"
          >
            <Icon name="Phone" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
