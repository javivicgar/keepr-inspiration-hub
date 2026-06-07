import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthScreenProps {
  onAuthenticate: () => void;
}

type Provider = 'apple' | 'google';

const providerCopy: Record<Provider, { domain: string }> = {
  apple: { domain: 'appleid.apple.com' },
  google: { domain: 'accounts.google.com' },
};

export const AuthScreen = ({ onAuthenticate }: AuthScreenProps) => {
  const [pendingProvider, setPendingProvider] = useState<Provider | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleContinue = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setPendingProvider(null);
      onAuthenticate();
    }, 1000);
  };

  const handleCancel = () => {
    if (isAuthenticating) return;
    setPendingProvider(null);
  };

  const IOSAuthDialog = ({ provider }: { provider: Provider }) => (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'hsl(240 10% 12% / 0.35)', backdropFilter: 'blur(6px)' }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[280px] rounded-2xl overflow-hidden text-center"
        style={{
          background: 'hsl(0 0% 100% / 0.92)',
          backdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 20px 50px -10px hsl(240 10% 12% / 0.25)',
        }}
      >
        <div className="px-5 pt-5 pb-4">
          <h3 className="text-[15px] font-semibold text-foreground leading-snug">
            “Keepr” Wants to Use “{providerCopy[provider].domain}” to Sign In
          </h3>
          <p className="text-[13px] text-muted-foreground mt-2 leading-snug">
            This allows the app and website to share information about you.
          </p>
        </div>
        <div className="border-t border-border/70 grid grid-cols-2">
          <button
            onClick={handleCancel}
            disabled={isAuthenticating}
            className="py-3 text-[15px] text-foreground border-r border-border/70 hover:bg-muted/50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={isAuthenticating}
            className="py-3 text-[15px] font-semibold text-primary hover:bg-muted/50 transition-colors"
          >
            {isAuthenticating ? 'Signing in…' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 bg-background brand-glow overflow-hidden">
      <div className="h-full w-full max-w-sm mx-auto px-6 flex flex-col">
        {/* Upper third: wordmark */}
        <div className="flex-[1] flex flex-col items-center justify-end pb-6">
          <div className="bg-primary-soft rounded-2xl p-5 mb-6 inline-flex shadow-sm">
            <div className="bg-primary rounded-full p-3.5 flex items-center justify-center">
              <Bookmark className="h-7 w-7 text-primary-foreground fill-current" aria-hidden="true" />
            </div>
          </div>
          <h1 className="font-keepr-wordmark text-5xl text-foreground mb-2 tracking-tight">Keepr</h1>
          <p className="text-muted-foreground text-base">Save your inspirations.</p>
        </div>

        {/* Middle: breathing space */}
        <div className="flex-[1]" />

        {/* Lower third: CTAs */}
        <div className="flex-[1] flex flex-col justify-end pb-8">
          <div className="space-y-3">
            <Button
              onClick={() => setPendingProvider('apple')}
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
              onClick={() => setPendingProvider('google')}
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

            <p className="text-xs text-muted-foreground pt-3 leading-relaxed text-center">
              By continuing you agree to our{' '}
              <a href="#" className="underline underline-offset-2 hover:text-foreground">Terms</a>
              {' '}and{' '}
              <a href="#" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>

      {pendingProvider && <IOSAuthDialog provider={pendingProvider} />}
    </div>
  );
};
