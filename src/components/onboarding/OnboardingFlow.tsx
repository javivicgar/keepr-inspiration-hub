
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { WelcomeScreen } from './WelcomeScreen';
import { ContentPreferencesScreen } from './ContentPreferencesScreen';
import { SaveMethodScreen } from './SaveMethodScreen';
import { ReadyScreen } from './ReadyScreen';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [contentPreferences, setContentPreferences] = useState<string[]>([]);
  const [saveMethods, setSaveMethods] = useState<string[]>([]);

  const screens = [
    <WelcomeScreen key="welcome" onNext={() => setCurrentScreen(1)} />,
    <ContentPreferencesScreen 
      key="content" 
      selectedPreferences={contentPreferences}
      onPreferencesChange={setContentPreferences}
      onNext={() => setCurrentScreen(2)} 
      onBack={() => setCurrentScreen(0)}
    />,
    <SaveMethodScreen 
      key="method" 
      selectedMethods={saveMethods}
      onMethodsChange={setSaveMethods}
      onNext={() => setCurrentScreen(3)} 
      onBack={() => setCurrentScreen(1)}
    />,
    <ReadyScreen 
      key="ready" 
      onComplete={onComplete} 
      onBack={() => setCurrentScreen(2)}
    />
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#a8a5d0] to-[#9895c7] flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-md">
        {screens[currentScreen]}
      </div>
    </div>
  );
};
