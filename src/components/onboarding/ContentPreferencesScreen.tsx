import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { categoryMeta, type CategoryName } from '@/lib/categories';

interface ContentPreferencesScreenProps {
  selectedPreferences: string[];
  onPreferencesChange: (preferences: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const contentOptions: { id: string; label: CategoryName }[] = [
  { id: 'food',      label: 'Food Spots' },
  { id: 'travel',    label: 'Travel Spots' },
  { id: 'locations', label: 'Locations' },
  { id: 'fashion',   label: 'Fashion' },
  { id: 'outdoor',   label: 'Outdoor' },
  { id: 'sports',    label: 'Sports' },
  { id: 'apps',      label: 'Useful Apps' },
  { id: 'music',     label: 'Music' },
  { id: 'tutorials', label: 'Tutorials' },
  { id: 'home',      label: 'Home' },
];

export const ContentPreferencesScreen = ({
  selectedPreferences,
  onPreferencesChange,
  onNext,
  onBack,
}: ContentPreferencesScreenProps) => {
  const toggle = (id: string) => {
    if (selectedPreferences.includes(id)) {
      onPreferencesChange(selectedPreferences.filter((p) => p !== id));
    } else {
      onPreferencesChange([...selectedPreferences, id]);
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
          What kind of content do you save the most?
        </h2>
        <p className="text-muted-foreground text-base">
          We'll tailor Keepr to your needs.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 mb-4">
        <div className="grid grid-cols-2 gap-3">
          {contentOptions.map((option) => {
            const meta = categoryMeta[option.label];
            const Icon = meta.icon;
            const selected = selectedPreferences.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggle(option.id)}
                aria-pressed={selected}
                className={`p-4 rounded-xl border text-left transition-all ${meta.toneBg} ${
                  selected
                    ? 'border-foreground/70 ring-2 ring-foreground/10 shadow-sm'
                    : 'border-transparent hover:border-foreground/10'
                }`}
              >
                <Icon className={`h-5 w-5 mb-2 ${meta.tone}`} strokeWidth={1.75} aria-hidden="true" />
                <div className="text-sm font-medium leading-tight text-foreground">{option.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-shrink-0">
        <Button
          onClick={onNext}
          disabled={selectedPreferences.length === 0}
          className="w-full bg-primary text-primary-foreground hover:bg-primary-hover font-medium py-3 rounded-md text-base h-12 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
