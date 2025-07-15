
import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthScreenProps {
  onComplete: () => void;
}

export const AuthScreen = ({ onComplete }: AuthScreenProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState<'google' | 'apple' | null>(null);

  const handleSignUpClick = (type: 'google' | 'apple') => {
    setLoginType(type);
    setShowLoginModal(true);
  };

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold font-josefin">
            Sign in with {loginType === 'google' ? 'Google' : 'Apple'}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLoginModal(false)}
            className="rounded-full p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-sm text-gray-600 font-josefin">
              {loginType === 'google' ? 'Google' : 'Apple'} sign-in would appear here
            </p>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-3 font-josefin text-center">
              Log in to unlock community features like sharing and connecting with others.
            </p>
            <Button
              onClick={onComplete}
              variant="outline"
              className="w-full font-josefin font-medium py-3 rounded-2xl"
            >
              Continue as Guest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#a8a5d0] to-[#9895c7] flex items-center justify-center p-6">
      <div className="text-center w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 mb-8 inline-block shadow-xl">
          <Heart className="h-16 w-16 text-[#a8a5d0] fill-current" />
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-3 font-josefin tracking-wide">Keepr</h1>
        <p className="text-white/90 text-lg mb-12 font-josefin">Save your inspirations</p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => handleSignUpClick('apple')}
            className="w-full bg-black text-white hover:bg-gray-800 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black text-sm font-bold">🍎</span>
            </div>
            Sign up with Apple
          </Button>
          
          <Button 
            onClick={() => handleSignUpClick('google')}
            className="w-full bg-white text-gray-700 hover:bg-gray-50 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 border border-gray-200 flex items-center justify-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            Sign up with Google
          </Button>
          
          <Button 
            onClick={onComplete}
            variant="ghost"
            className="w-full text-white hover:bg-white/10 font-josefin font-medium py-4 rounded-2xl text-base transition-all duration-200 mt-6"
          >
            Continue as Guest
          </Button>
        </div>
      </div>
      
      {showLoginModal && <LoginModal />}
    </div>
  );
};
