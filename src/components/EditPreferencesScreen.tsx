import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categoryMeta, type CategoryName } from '@/lib/categories';
import { toast } from 'sonner';

interface EditPreferencesScreenProps {
  currentPreferences: string[];
  onBack: () => void;
  onSave: (preferences: string[]) => void;
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

export const EditPreferencesScreen = ({ currentPreferences, onBack, onSave }: EditPreferencesScreenProps) => {
  const [selected, setSelected] = useState<string[]>(currentPreferences);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const handleSave = () => {
    onSave(selected);
    toast('Preferences saved');
    onBack();
  };

  return (
    <div className="pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          aria-label="Back"
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold font-josefin">Edit Preferences</h1>
      </div>

      <p className="text-muted-foreground font-josefin text-sm mb-4 px-1">
        Choose the types of content you save the most.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {contentOptions.map((option) => {
          const meta = categoryMeta[option.label];
          const Icon = meta.icon;
          const isSelected = selected.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggle(option.id)}
              aria-pressed={isSelected}
              className={`p-4 rounded-xl border text-left transition-all ${meta.toneBg} ${
                isSelected
                  ? 'border-foreground/70 ring-2 ring-foreground/10 shadow-sm'
                  : 'border-transparent hover:border-foreground/10'
              }`}
            >
              <Icon className={`h-5 w-5 mb-2 ${meta.tone}`} strokeWidth={1.75} aria-hidden="true" />
              <div className="text-sm font-medium leading-tight text-foreground font-josefin">{option.label}</div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleSave}
        className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-josefin font-medium rounded-md"
      >
        Save Changes
      </Button>
    </div>
  );
};
