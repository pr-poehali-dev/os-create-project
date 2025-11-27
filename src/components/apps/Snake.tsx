import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export default function Snake() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      let newHead: Position;

      switch (direction) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE ||
        prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateFood());
        setScore((prev) => prev + 10);
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [direction, food, gameOver, generateFood, isPlaying]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-900 p-8">
      <div className="mb-4 text-white text-2xl font-bold">Счёт: {score}</div>
      <div
        className="bg-gray-800 border-4 border-gray-700"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          position: 'relative',
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: index === 0 ? '#10b981' : '#22c55e',
              border: '1px solid #059669',
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: '#ef4444',
            borderRadius: '50%',
          }}
        />
      </div>
      <div className="mt-4 space-x-4">
        {!isPlaying && (
          <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600">
            {gameOver ? 'Начать заново' : 'Старт'}
          </Button>
        )}
        {gameOver && (
          <div className="text-red-500 text-xl font-bold mt-2">Игра окончена!</div>
        )}
      </div>
      {isPlaying && (
        <div className="text-gray-400 text-sm mt-4">
          Используйте стрелки для управления
        </div>
      )}
    </div>
  );
}
