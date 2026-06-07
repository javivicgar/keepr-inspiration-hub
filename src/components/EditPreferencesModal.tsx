import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EditPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreferences: string[];
  onSave: (preferences: string[]) => void;
}

const contentTypes = [
  { id: 'food', label: 'Food Spots', icon: '🍽️' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'locations', label: 'Locations', icon: '📍' },
  { id: 'outdoor', label: 'Outdoor', icon: '🏞️' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'travel', label: 'Travel Spots', icon: '✈️' },
  { id: 'fashion', label: 'Fashion', icon: '👗' },
  { id: 'art', label: 'Art & Design', icon: '🎨' },
  { id: 'books', label: 'Books', icon: '📚' },
  { id: 'tech', label: 'Technology', icon: '💻' },
];

export const EditPreferencesModal = ({ isOpen, onClose, currentPreferences, onSave }: EditPreferencesModalProps) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(currentPreferences);

  const togglePreference = (preferenceId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preferenceId) 
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleSave = () => {
    onSave(selectedPreferences);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-josefin text-xl">
            Edit Your Preferences
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-center text-muted-foreground font-josefin text-sm">
            Choose the types of content you save most often
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => togglePreference(type.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedPreferences.includes(type.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-josefin text-sm font-medium">{type.label}</div>
                  {selectedPreferences.includes(type.id) && (
                    <Check className="h-4 w-4 text-primary mx-auto mt-2" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 font-josefin"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary-hover text-white font-josefin"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};