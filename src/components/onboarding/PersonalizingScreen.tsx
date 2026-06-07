import React, { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';

export const PersonalizingScreen = () => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dotsInt = setInterval(() => {
      setDots((p) => (p.length >= 3 ? '' : p + '.'));
    }, 500);
    const progInt = setInterval(() => {
      setProgress((p) => Math.min(100, p + 2));
    }, 100);
    return () => {
      clearInterval(dotsInt);
      clearInterval(progInt);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center animate-fade-in">
        <div className="bg-primary-soft rounded-2xl p-5 inline-flex mb-8 shadow-sm">
          <div className="bg-primary rounded-full p-3 flex items-center justify-center">
            <Bookmark className="h-7 w-7 text-primary-foreground fill-current" aria-hidden="true" />
          </div>
        </div>

        <p className="text-foreground text-lg mb-6">
          Setting up your profile{dots}
        </p>

        <div className="w-64 bg-muted rounded-md h-1.5 mx-auto mb-4 overflow-hidden">
          <div
            className="bg-primary h-full rounded-md transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-muted-foreground text-sm">
          Personalizing your Keepr experience…
        </p>
      </div>
    </div>
  );
};
