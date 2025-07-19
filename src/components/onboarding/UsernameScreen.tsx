import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';

interface UsernameScreenProps {
  onNext: (username: string) => void;
  onBack: () => void;
}

export const UsernameScreen = ({ onNext, onBack }: UsernameScreenProps) => {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    // Simple validation: 3-20 characters, alphanumeric + underscore
    const isValidUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);
    setIsValid(isValidUsername);
  };

  const handleNext = () => {
    if (isValid && username) {
      onNext(username);
    }
  };

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 p-2 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="text-center mb-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-josefin leading-tight">
          Choose your username
        </h2>
        <p className="text-white/80 text-lg font-josefin">
          This is how you'll be known in the Keepr community.
        </p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center px-4">
        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 font-josefin text-lg py-6 rounded-2xl focus:border-white focus:bg-white/20"
          />
          
          {username && (
            <div className="text-center mt-4">
              {isValid ? (
                <p className="text-green-300 text-sm font-josefin">✓ Username is available</p>
              ) : (
                <p className="text-red-300 text-sm font-josefin">
                  Username must be 3-20 characters (letters, numbers, underscore only)
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto px-4 pt-6">
        <Button 
          onClick={handleNext}
          disabled={!isValid || !username}
          className="w-full bg-white text-[#a8a5d0] hover:bg-white/90 font-josefin font-medium py-4 md:py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 h-12 md:h-14 disabled:opacity-50"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};