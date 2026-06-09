import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ArrowRight, ChevronDown, Lock, Sparkles, Wand2 } from 'lucide-react';

interface DataHandlingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

interface Section {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  toneBg: string;
  tone: string;
  title: string;
  body: string;
  more: string;
}

const sections: Section[] = [
  {
    id: 'storage',
    icon: Lock,
    toneBg: 'bg-purple-50',
    tone: 'text-purple-600',
    title: 'Storage',
    body: "Your saves live securely in your Keepr account. Everything you save is private by default — only you can see it unless you choose to share.",
    more: "We store your saves so you can access them across your devices. You can export or delete them anytime from Privacy & Data.",
  },
  {
    id: 'personalization',
    icon: Sparkles,
    toneBg: 'bg-amber-50',
    tone: 'text-amber-600',
    title: 'Personalization',
    body: "The preferences you set in the next steps simply help us tailor your suggestions. You can turn personalization off anytime in Privacy & Data.",
    more: "Your choices shape what Keepr recommends — like the types of content you see first. Turning it off won't delete anything; it just stops the tailoring.",
  },
  {
    id: 'ai',
    icon: Wand2,
    toneBg: 'bg-emerald-50',
    tone: 'text-emerald-600',
    title: 'AI features',
    body: "AI helps classify and summarize your saves so they're easier to find. Anywhere AI is at work, you'll see a clear AI label.",
    more: "AI runs in the background to add tags, group similar saves, and write short summaries. You can opt out of AI features in Privacy & Data.",
  },
];

export const DataHandlingScreen = ({ onNext, onBack }: DataHandlingScreenProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="animate-fade-in h-full flex flex-col min-h-0">
      <div className="flex items-center mb-4 flex-shrink-0">
        <Button onClick={onBack} variant="ghost" size="icon" aria-label="Go back" className="rounded-md">
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="mb-5 px-1 flex-shrink-0">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 tracking-tight leading-tight">
          How Keepr handles your data
        </h2>
        <p className="text-muted-foreground text-base">
          A quick, friendly heads-up before we dive in.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 mb-4 space-y-3 pr-0.5">
        {sections.map((s) => {
          const Icon = s.icon;
          const isOpen = !!expanded[s.id];
          return (
            <div key={s.id} className={`rounded-2xl p-4 ${s.toneBg}`}>
              <div className="flex items-start gap-3">
                <div className={`h-9 w-9 rounded-full bg-white/70 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${s.tone}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
                  {isOpen && (
                    <p className="text-sm text-foreground/70 leading-relaxed mt-2 animate-fade-in">
                      {s.more}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
                    className={`mt-2 inline-flex items-center gap-1 text-sm font-medium ${s.tone} hover:opacity-80`}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? 'Show less' : 'Learn more'}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-shrink-0">
        <Button
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground hover:bg-primary-hover font-medium py-3 rounded-md text-base h-12"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
