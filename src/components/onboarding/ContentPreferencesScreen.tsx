
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface ContentPreferencesScreenProps {
  selectedPreferences: string[];
  onPreferencesChange: (preferences: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const contentOptions = [
  { id: 'food', label: 'Food Spots', emoji: '🍕' },
  { id: 'travel', label: 'Travel Spots', emoji: '✈️' },
  { id: 'locations', label: 'Locations', emoji: '🧳' },
  { id: 'fashion', label: 'Fashion', emoji: '👕' },
  { id: 'outdoor', label: 'Outdoor', emoji: '🏞️' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'apps', label: 'Useful Apps', emoji: '📱' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'tutorials', label: 'Tutorials', emoji: '📚' },
  { id: 'home', label: 'Home', emoji: '🏡' }
];

export const ContentPreferencesScreen = ({ 
  selectedPreferences, 
  onPreferencesChange, 
  onNext, 
  onBack 
}: ContentPreferencesScreenProps) => {
  const togglePreference = (id: string) => {
    if (selectedPreferences.includes(id)) {
      onPreferencesChange(selectedPreferences.filter(p => p !== id));
    } else {
      onPreferencesChange([...selectedPreferences, id]);
    }
  };

  return (
    <div className="animate-fade-in">
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
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3 font-josefin">
          What kind of content do you save the most?
        </h2>
        <p className="text-white/80 text-lg font-josefin">
          We'll tailor Keepr to your needs.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {contentOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => togglePreference(option.id)}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
              selectedPreferences.includes(option.id)
                ? 'bg-white text-[#a8a5d0] border-white shadow-lg scale-105'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <div className="text-2xl mb-2">{option.emoji}</div>
            <div className="text-sm font-josefin font-medium">{option.label}</div>
          </button>
        ))}
      </div>
      
      <Button 
        onClick={onNext}
        disabled={selectedPreferences.length === 0}
        className="w-full bg-white text-[#a8a5d0] hover:bg-white/90 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 h-14 disabled:opacity-50"
      >
        Continue →
      </Button>
    </div>
  );
};
