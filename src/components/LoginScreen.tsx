import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<'welcome' | 'create' | 'login'>('welcome');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  const [savedPin, setSavedPin] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = () => {
    if (!username.trim()) {
      setError('Введите имя пользователя');
      return;
    }
    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError('ПИН-код должен состоять из 4 цифр');
      return;
    }
    if (pin !== confirmPin) {
      setError('ПИН-коды не совпадают');
      return;
    }
    
    setSavedUsername(username);
    setSavedPin(pin);
    setError('');
    setStep('login');
  };

  const handleLogin = () => {
    if (loginPin === savedPin) {
      onLogin(savedUsername);
    } else {
      setError('Неверный ПИН-код');
      setLoginPin('');
    }
  };

  const handlePinInput = (value: string, setter: (val: string) => void) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setter(value);
      setError('');
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
      <Card className="w-96 p-8 shadow-2xl">
        {step === 'welcome' && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                <Icon name="Monitor" size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-semibold">Добро пожаловать</h1>
            <p className="text-muted-foreground">Начните работу с вашей системой</p>
            <div className="space-y-3">
              <Button 
                onClick={() => setStep('create')} 
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Создать аккаунт
              </Button>
              {savedUsername && (
                <Button 
                  onClick={() => setStep('login')} 
                  variant="outline"
                  className="w-full"
                >
                  Войти как {savedUsername}
                </Button>
              )}
            </div>
          </div>
        )}

        {step === 'create' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Создание аккаунта</h2>
              <p className="text-sm text-muted-foreground mt-2">Настройте свой профиль</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Имя пользователя</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите имя"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">ПИН-код (4 цифры)</label>
                <Input
                  type="password"
                  value={pin}
                  onChange={(e) => handlePinInput(e.target.value, setPin)}
                  placeholder="• • • •"
                  maxLength={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Подтвердите ПИН-код</label>
                <Input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => handlePinInput(e.target.value, setConfirmPin)}
                  placeholder="• • • •"
                  maxLength={4}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => {
                    setStep('welcome');
                    setError('');
                  }} 
                  variant="outline"
                  className="w-full"
                >
                  Назад
                </Button>
                <Button 
                  onClick={handleCreateAccount} 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  Создать
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 'login' && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                  <Icon name="User" size={40} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{savedUsername}</h2>
                <p className="text-sm text-muted-foreground mt-1">Введите ПИН-код для входа</p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                type="password"
                value={loginPin}
                onChange={(e) => handlePinInput(e.target.value, setLoginPin)}
                placeholder="• • • •"
                maxLength={4}
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && loginPin.length === 4) {
                    handleLogin();
                  }
                }}
              />

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setStep('welcome');
                    setLoginPin('');
                    setError('');
                  }} 
                  variant="outline"
                  className="w-full"
                >
                  Назад
                </Button>
                <Button 
                  onClick={handleLogin} 
                  disabled={loginPin.length !== 4}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  Войти
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
