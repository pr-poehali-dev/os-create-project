import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const date = time.toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="text-center space-y-8">
        <div className="text-9xl font-bold text-gray-800 font-mono tracking-wider">
          {hours}:{minutes}:{seconds}
        </div>
        <div className="text-2xl text-gray-600 capitalize">
          {date}
        </div>
      </div>
    </div>
  );
}
