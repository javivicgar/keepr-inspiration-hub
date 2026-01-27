
import React, { useState, useEffect } from 'react';
import { Bookmark, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthScreenProps {
  onAuthenticate: () => void;
}

const funFacts = [
  "The most stolen food in the world is cheese.",
  "Ketchup was once sold as medicine.",
  "Croissants actually originated in Austria, not France.",
  "The world's most expensive pizza costs over $12,000.",
  "In Japan, it's polite to slurp your noodles!",
  "Iceland has no mosquitoes.",
  "Vatican City is the smallest country in the world.",
  "Canada has more lakes than all other countries combined.",
  "In Switzerland, it's illegal to own just one guinea pig (they get lonely!).",
  "There's a pink lake in Australia — yes, it's really pink!",
  "High heels were originally designed for men.",
  "The world's longest fashion show lasted 30 hours.",
  "Denim was invented in France — \"de Nîmes\".",
  "Queen Elizabeth had her wedding dress paid for with WWII ration coupons.",
  "The T-shirt is over 100 years old!",
  "The first email ever sent was \"QWERTYUIOP\".",
  "Over 90% of smartphone time is spent using apps.",
  "The first iPhone had no App Store.",
  "Google processes over 99,000 searches every second.",
  "TikTok was the most downloaded app globally in 2021 & 2022.",
  "Bananas are berries, but strawberries aren't.",
  "The Eiffel Tower can grow taller in summer.",
  "Avocados are fruit, not vegetables.",
  "Some turtles can breathe through their butts.",
  "A group of flamingos is called a \"flamboyance.\"",
  "Wombat poop is cube-shaped.",
  "Sea otters hold hands while they sleep.",
  "Honey never spoils.",
  "There's a basketball court on the top floor of the U.S. Supreme Court building.",
  "Octopuses have three hearts.",
  "A shrimp's heart is in its head.",
  "You can hear rhubarb grow in the dark.",
  "Elephants can't jump.",
  "Clouds can weigh over a million pounds.",
  "Sloths can hold their breath longer than dolphins.",
  "Peanuts aren't technically nuts.",
  "Koalas have fingerprints.",
  "Tomatoes were once considered poisonous.",
  "There's a species of jellyfish that's immortal.",
  "Cheese is the most stolen food in the world."
];

export const AuthScreen = ({ onAuthenticate }: AuthScreenProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState<'google' | 'apple' | null>(null);
  const [currentFact, setCurrentFact] = useState(() => Math.floor(Math.random() * funFacts.length));
  const [isVisible, setIsVisible] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentFact(Math.floor(Math.random() * funFacts.length));
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSignUpClick = (type: 'google' | 'apple') => {
    setLoginType(type);
    setShowLoginModal(true);
  };

  const handleAuthentication = async () => {
    setIsAuthenticating(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsAuthenticating(false);
      setShowLoginModal(false);
      onAuthenticate();
    }, 2000);
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
            disabled={isAuthenticating}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-sm text-gray-600 font-josefin mb-4">
              {isAuthenticating ? 'Signing you in...' : `Continue with ${loginType === 'google' ? 'Google' : 'Apple'}`}
            </p>
            
            <Button
              onClick={handleAuthentication}
              disabled={isAuthenticating}
              className="w-full bg-[#a8a5d0] hover:bg-[#9895c7] text-white font-josefin rounded-2xl py-3"
            >
              {isAuthenticating ? 'Please wait...' : 'Continue'}
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 font-josefin text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#a8a5d0] to-[#9895c7] flex items-center justify-center p-4 md:p-6">
      <div className="text-center w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 mb-8 inline-block shadow-xl">
          <div className="bg-[#a8a5d0] rounded-full p-4 flex items-center justify-center">
            <Bookmark className="h-10 w-10 text-white fill-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-josefin tracking-wide">Keepr</h1>
        <p className="text-white/90 text-lg mb-8 md:mb-12 font-josefin">Save your inspirations.</p>
        
        <div className="space-y-4 mb-8">
          <Button 
            onClick={() => handleSignUpClick('apple')}
            className="w-full bg-black text-white hover:bg-gray-800 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-3 h-14"
          >
            <img 
              src="/lovable-uploads/88fccea4-8273-4f19-a655-d7000b52ba19.png" 
              alt="Apple logo" 
              className="w-5 h-5"
            />
            Sign up with Apple
          </Button>
          
          <Button 
            onClick={() => handleSignUpClick('google')}
            className="w-full bg-white text-gray-700 hover:bg-gray-50 font-josefin font-medium py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 border border-gray-200 flex items-center justify-center gap-3 h-14"
          >
            <img 
              src="/lovable-uploads/0e1e7537-0953-4c7c-927a-1d2fa977968a.png" 
              alt="Google logo" 
              className="w-5 h-5"
            />
            Sign up with Google
          </Button>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm min-h-[140px] flex flex-col justify-center items-center text-center overflow-hidden">
          <p className="text-white/80 text-sm font-josefin mb-2">Did you know?</p>
          <p 
            className={`text-white text-sm font-josefin transition-opacity duration-500 leading-relaxed line-clamp-4 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {funFacts[currentFact]}
          </p>
        </div>
      </div>
      
      {showLoginModal && <LoginModal />}
    </div>
  );
};
