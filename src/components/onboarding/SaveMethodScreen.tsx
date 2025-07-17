
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface SaveMethodScreenProps {
  selectedMethods: string[];
  onMethodsChange: (methods: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const saveMethodOptions = [
  { id: 'reels', label: 'From Reels or TikToks', emoji: '📱', description: 'Short videos and social content' },
  { id: 'links', label: 'Copying and pasting links', emoji: '🔗', description: 'URLs and web content' },
  { id: 'screenshots', label: 'Taking screenshots', emoji: '📸', description: 'Visual content capture' },
  { id: 'memory', label: 'Just remembering', emoji: '🧠', description: 'Mental notes and ideas' }
];

export const SaveMethodScreen = ({ 
  selectedMethods, 
  onMethodsChange, 
  onNext, 
  onBack 
}: SaveMethodScreenProps) => {
  const toggleMethod = (id: string) => {
    if (selectedMethods.includes(id)) {
      onMethodsChange(selectedMethods.filter(m => m !== id));
    } else {
      onMethodsChange([...selectedMethods, id]);
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
          How do you usually save content?
        </h2>
        <p className="text-white/80 text-lg font-josefin">
          This helps us make Keepr more seamless for you.
        </p>
      </div>
      
      <div className="space-y-4 mb-8">
        {saveMethodOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => toggleMethod(option.id)}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
              selectedMethods.includes(option.id)
                ? 'bg-white text-[#a8a5d0] border-white shadow-lg scale-105'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-4">{option.emoji}</div>
              <div className="flex-1">
                <div className="font-josefin font-medium text-lg mb-1">{option.label}</div>
                <div className={`text-sm font-josefin ${
                  selectedMethods.includes(option.id) ? 'text-[#a8a5d0]/70' : 'text-white/70'
                }`}>
                  {option.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <Button 
        onClick={onNext}
        disabled={selectedMethods.length === 0}
        className="w-full bg-white text-[#a8a5d0] hover:bg-white/90 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 h-14 disabled:opacity-50"
      >
        Almost there →
      </Button>
    </div>
  );
};
