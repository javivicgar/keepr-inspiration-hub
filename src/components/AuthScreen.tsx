
import React from 'react';
import { Heart, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthScreenProps {
  onComplete: () => void;
}

export const AuthScreen = ({ onComplete }: AuthScreenProps) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#a8a5d0] to-[#9895c7] flex items-center justify-center p-6">
      <div className="text-center w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 mb-8 inline-block shadow-xl">
          <Heart className="h-16 w-16 text-[#a8a5d0] fill-current" />
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-3 font-josefin tracking-wide">Keepr</h1>
        <p className="text-white/90 text-lg mb-12 font-josefin">Save your inspiration</p>
        
        <div className="space-y-4">
          <Button 
            onClick={onComplete}
            className="w-full bg-white text-[#a8a5d0] hover:bg-gray-50 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg transition-all duration-200"
          >
            Create a new account
          </Button>
          
          <Button 
            onClick={onComplete}
            className="w-full bg-black text-white hover:bg-gray-800 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Apple className="h-5 w-5" />
            Sign up with Apple
          </Button>
          
          <Button 
            onClick={onComplete}
            className="w-full bg-white text-gray-700 hover:bg-gray-50 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 border border-gray-200"
          >
            Sign up with Google
          </Button>
          
          <Button 
            onClick={onComplete}
            variant="ghost"
            className="w-full text-white hover:bg-white/10 font-josefin font-medium py-4 rounded-2xl text-base transition-all duration-200"
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
};
