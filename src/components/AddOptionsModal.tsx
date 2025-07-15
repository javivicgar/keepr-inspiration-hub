
import React from 'react';
import { X, Globe, Camera, Clipboard, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

export const AddOptionsModal = ({ isOpen, onClose, onOptionSelect }: AddOptionsModalProps) => {
  const options = [
    { id: 'browser', label: 'Browser', icon: Globe, color: 'bg-blue-50 text-blue-600' },
    { id: 'camera', label: 'Camera', icon: Camera, color: 'bg-green-50 text-green-600' },
    { id: 'paste', label: 'Paste Content', icon: Clipboard, color: 'bg-purple-50 text-purple-600' },
    { id: 'scratch', label: 'Write from scratch', icon: Edit3, color: 'bg-orange-50 text-orange-600' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-background rounded-t-3xl w-full animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground font-josefin">Import a Keepr</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option.id}
                className="flex flex-col items-center p-6 rounded-2xl border-2 border-border hover:border-[#a8a5d0] transition-all font-josefin hover:shadow-md"
                onClick={() => {
                  onOptionSelect(option.id);
                  onClose();
                }}
              >
                <div className={`p-4 rounded-full ${option.color} mb-3`}>
                  <option.icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
