
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { WelcomeScreen } from './WelcomeScreen';
import { UsernameScreen } from './UsernameScreen';
import { ContentPreferencesScreen } from './ContentPreferencesScreen';
import { SaveMethodScreen } from './SaveMethodScreen';
import { ReadyScreen } from './ReadyScreen';

interface OnboardingFlowProps {
  onComplete: (preferences: string[], username: string) => void;
  onStartPersonalizing: () => void;
}

export const OnboardingFlow = ({ onComplete, onStartPersonalizing }: OnboardingFlowProps) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [username, setUsername] = useState('');
  const [contentPreferences, setContentPreferences] = useState<string[]>([]);
  const [saveMethods, setSaveMethods] = useState<string[]>([]);

  const screens = [
    <WelcomeScreen key="welcome" onNext={() => setCurrentScreen(1)} />,
    <UsernameScreen 
      key="username"
      onNext={(selectedUsername) => {
        setUsername(selectedUsername);
        setCurrentScreen(2);
      }}
      onBack={() => setCurrentScreen(0)}
    />,
    <ContentPreferencesScreen 
      key="content" 
      selectedPreferences={contentPreferences}
      onPreferencesChange={setContentPreferences}
      onNext={() => setCurrentScreen(3)} 
      onBack={() => setCurrentScreen(1)}
    />,
    <SaveMethodScreen 
      key="method" 
      selectedMethods={saveMethods}
      onMethodsChange={setSaveMethods}
      onNext={() => setCurrentScreen(4)} 
      onBack={() => setCurrentScreen(2)}
    />,
    <ReadyScreen 
      key="ready" 
      onComplete={() => onComplete(contentPreferences, username)} 
      onBack={() => setCurrentScreen(3)}
      onStartPersonalizing={onStartPersonalizing}
    />
  ];

  return (
    <div className={`h-full w-full bg-background overflow-hidden ${currentScreen === 0 ? 'brand-glow' : ''}`}>
      <div className="relative z-10 h-full w-full max-w-md mx-auto px-4 pt-4 pb-6 md:px-6 md:pt-4 md:pb-6">
        {screens[currentScreen]}
      </div>
    </div>
  );
};
