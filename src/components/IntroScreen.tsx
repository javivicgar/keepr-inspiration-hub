import React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntroScreenProps {
  onContinue: () => void;
}

export const IntroScreen = ({ onContinue }: IntroScreenProps) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#a8a5d0] to-[#9895c7] flex flex-col items-center justify-center px-8">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm text-center">
        <div className="bg-white rounded-3xl p-6 mb-8 inline-block shadow-lg">
          <div className="bg-[#a8a5d0] rounded-full p-3 flex items-center justify-center">
            <Bookmark className="h-8 w-8 text-white fill-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-6 font-josefin">
          What is Keepr?
        </h1>

        <p className="text-white/90 text-base leading-relaxed font-josefin">
          Keepr is a save-for-later app for inspirational content.
          Save videos, places, ideas, and links from social media and organize them in one calm, personal space.
        </p>
      </div>

      <div className="w-full max-w-sm pb-12">
        <Button
          onClick={onContinue}
          className="w-full bg-white text-[#a8a5d0] hover:bg-white/90 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg h-14"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
