import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const buttonClass = "h-14 text-lg font-medium";

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        <div className="bg-gray-900 text-white text-right text-4xl p-4 rounded mb-4 font-mono h-20 flex items-center justify-end">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={handleClear} variant="secondary" className={buttonClass}>C</Button>
          <Button onClick={() => handleOperation('÷')} variant="secondary" className={buttonClass}>÷</Button>
          <Button onClick={() => handleOperation('×')} variant="secondary" className={buttonClass}>×</Button>
          <Button onClick={() => setDisplay(String(-parseFloat(display)))} variant="secondary" className={buttonClass}>+/-</Button>
          
          <Button onClick={() => handleNumber('7')} className={buttonClass}>7</Button>
          <Button onClick={() => handleNumber('8')} className={buttonClass}>8</Button>
          <Button onClick={() => handleNumber('9')} className={buttonClass}>9</Button>
          <Button onClick={() => handleOperation('-')} variant="secondary" className={buttonClass}>-</Button>
          
          <Button onClick={() => handleNumber('4')} className={buttonClass}>4</Button>
          <Button onClick={() => handleNumber('5')} className={buttonClass}>5</Button>
          <Button onClick={() => handleNumber('6')} className={buttonClass}>6</Button>
          <Button onClick={() => handleOperation('+')} variant="secondary" className={buttonClass}>+</Button>
          
          <Button onClick={() => handleNumber('1')} className={buttonClass}>1</Button>
          <Button onClick={() => handleNumber('2')} className={buttonClass}>2</Button>
          <Button onClick={() => handleNumber('3')} className={buttonClass}>3</Button>
          <Button onClick={handleEquals} className={`${buttonClass} row-span-2 bg-blue-500 hover:bg-blue-600 text-white`}>=</Button>
          
          <Button onClick={() => handleNumber('0')} className={`${buttonClass} col-span-2`}>0</Button>
          <Button onClick={() => setDisplay(display.includes('.') ? display : display + '.')} className={buttonClass}>.</Button>
        </div>
      </div>
    </div>
  );
}
