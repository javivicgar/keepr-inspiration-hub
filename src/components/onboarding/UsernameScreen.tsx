import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ArrowRight, Check } from 'lucide-react';

interface UsernameScreenProps {
  onNext: (username: string) => void;
  onBack: () => void;
}

export const UsernameScreen = ({ onNext, onBack }: UsernameScreenProps) => {
  const [username, setUsername] = useState('');
  const isValid = /^[a-zA-Z0-9_]{3,20}$/.test(username);

  const handleNext = () => {
    if (isValid) onNext(username);
  };

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="flex items-center flex-shrink-0">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
          aria-label="Go back"
          className="rounded-md -ml-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-6 px-1">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 tracking-tight">
            Choose your username
          </h2>
          <p className="text-muted-foreground text-base">
            This is how you'll be known in the Keepr community.
          </p>
        </div>

        <label htmlFor="username" className="sr-only">Username</label>
        <Input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full text-base py-6 rounded-md border border-border"
        />

        {username && (
          <div className="mt-3 text-sm">
            {isValid ? (
              <p className="text-emerald-600 inline-flex items-center gap-1.5">
                <Check className="h-4 w-4" /> Username is available
              </p>
            ) : (
              <p className="text-destructive">
                Username must be 3-20 characters (letters, numbers, underscore).
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex-shrink-0">
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="w-full bg-primary text-primary-foreground hover:bg-primary-hover font-medium py-3 rounded-md text-base h-12 disabled:opacity-50"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
