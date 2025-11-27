import { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import Desktop from '@/components/Desktop';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Desktop username={username} />
      )}
    </div>
  );
}