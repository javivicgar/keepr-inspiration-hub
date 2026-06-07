import React, { useState } from 'react';
import { Bookmark, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthScreenProps {
  onAuthenticate: () => void;
}

export const AuthScreen = ({ onAuthenticate }: AuthScreenProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState<'google' | 'apple' | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSignUpClick = (type: 'google' | 'apple') => {
    setLoginType(type);
    setShowLoginModal(true);
  };

  const handleAuthentication = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setShowLoginModal(false);
      onAuthenticate();
    }, 1200);
  };

  const LoginModal = () => (
    <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-6">
      <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-lg border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Sign in with {loginType === 'google' ? 'Google' : 'Apple'}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close sign-in dialog"
            onClick={() => setShowLoginModal(false)}
            className="rounded-md"
            disabled={isAuthenticating}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {isAuthenticating
              ? 'Signing you in…'
              : `You'll continue with your ${loginType === 'google' ? 'Google' : 'Apple'} account.`}
          </p>
          <Button
            onClick={handleAuthentication}
            disabled={isAuthenticating}
            className="w-full bg-primary text-primary-foreground hover:bg-primary-hover rounded-md py-3"
          >
            {isAuthenticating ? 'Please wait…' : 'Continue'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 bg-background brand-glow flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-sm text-center relative">
        <div className="bg-primary-soft rounded-2xl p-6 mb-8 inline-flex shadow-sm">
          <div className="bg-primary rounded-full p-4 flex items-center justify-center">
            <Bookmark className="h-8 w-8 text-primary-foreground fill-current" aria-hidden="true" />
          </div>
        </div>

        <h1 className="text-5xl font-display font-medium text-foreground mb-4 tracking-tight">Keepr</h1>
        <p className="text-foreground/80 text-lg leading-snug mb-12 px-2">
          Keep what matters.<br />Forget the rest.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => handleSignUpClick('apple')}
            className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium py-3 rounded-xl text-base h-12 flex items-center justify-center gap-3"
          >
            <img
              src="/lovable-uploads/88fccea4-8273-4f19-a655-d7000b52ba19.png"
              alt=""
              aria-hidden="true"
              className="w-5 h-5"
            />
            Sign up with Apple
          </Button>

          <Button
            onClick={() => handleSignUpClick('google')}
            className="w-full bg-primary-soft text-foreground hover:bg-primary-soft/70 font-medium py-3 rounded-xl text-base h-12 border border-border/60 flex items-center justify-center gap-3"
          >
            <img
              src="/lovable-uploads/0e1e7537-0953-4c7c-927a-1d2fa977968a.png"
              alt=""
              aria-hidden="true"
              className="w-5 h-5"
            />
            Sign up with Google
          </Button>
        </div>
      </div>

      {showLoginModal && <LoginModal />}
    </div>
  );
};
