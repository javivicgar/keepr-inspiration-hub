import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ArrowRight,
  Film,
  Link2,
  Camera,
  Send,
  Brain,
  type LucideIcon,
} from 'lucide-react';

interface SaveMethodScreenProps {
  selectedMethods: string[];
  onMethodsChange: (methods: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const saveMethodOptions: {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}[] = [
  { id: 'reels',       label: 'From Reels or TikToks',   icon: Film,   description: 'Short videos and social content' },
  { id: 'links',       label: 'Copying and pasting links', icon: Link2,  description: 'URLs and web content' },
  { id: 'screenshots', label: 'Taking screenshots',       icon: Camera, description: 'Visual content capture' },
  { id: 'messaging',   label: 'Send it to myself or friends', icon: Send, description: 'Direct messages and shares' },
  { id: 'memory',      label: 'Just remembering',          icon: Brain,  description: 'Mental notes and ideas' },
];

export const SaveMethodScreen = ({
  selectedMethods,
  onMethodsChange,
  onNext,
  onBack,
}: SaveMethodScreenProps) => {
  const toggle = (id: string) => {
    if (selectedMethods.includes(id)) {
      onMethodsChange(selectedMethods.filter((m) => m !== id));
    } else {
      onMethodsChange([...selectedMethods, id]);
    }
  };

  return (
    <div className="animate-fade-in h-full flex flex-col min-h-0">
      <div className="flex items-center mb-4 flex-shrink-0">
        <Button onClick={onBack} variant="ghost" size="icon" aria-label="Go back" className="rounded-md">
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="mb-6 px-1 flex-shrink-0">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 tracking-tight leading-tight">
          How do you usually save content?
        </h2>
        <p className="text-muted-foreground text-base">
          This helps us make Keepr more seamless for you.
        </p>
        <p className="text-muted-foreground/80 text-xs mt-2">
          These preferences personalize your suggestions. You can change them anytime in Privacy & Data.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 mb-4">
        <div className="space-y-3">
          {saveMethodOptions.map((option) => {
            const Icon = option.icon;
            const selected = selectedMethods.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggle(option.id)}
                aria-pressed={selected}
                className={`w-full p-4 rounded-md border transition-colors text-left ${
                  selected
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <div className="flex-1">
                    <div className="font-medium text-base mb-0.5">{option.label}</div>
                    <div className={`text-sm ${selected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-shrink-0">
        <Button
          onClick={onNext}
          disabled={selectedMethods.length === 0}
          className="w-full bg-primary text-primary-foreground hover:bg-primary-hover font-medium py-3 rounded-md text-base h-12 disabled:opacity-50"
        >
          Almost there
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
