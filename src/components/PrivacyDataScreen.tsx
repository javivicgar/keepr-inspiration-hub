import React, { useState } from 'react';
import { ArrowLeft, Download, Trash2, FileText, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import type { SavedContent } from '@/types/SavedContent';

interface PrivacyDataScreenProps {
  onBack: () => void;
  /** The user's saved Keeprs, used to produce the data export (G2.5). */
  content?: SavedContent[];
}

interface ToggleItem {
  key: string;
  title: string;
  description: string;
}

interface Section {
  heading: string;
  items: ToggleItem[];
}

const SECTIONS: Section[] = [
  {
    heading: 'Sharing scope',
    items: [
      {
        key: 'shareProfile',
        title: 'Show my profile to my connections',
        description: "Your username and profile photo are visible to people you've connected with.",
      },
    ],
  },
  {
    heading: 'Personalization',
    items: [
      {
        key: 'tailorSuggestions',
        title: 'Tailor suggestions from my saves',
        description: 'Let Keepr use what you save to suggest related items.',
      },
      {
        key: 'personalizeFeed',
        title: 'Personalize my Home feed',
        description: 'Use your activity in the app to order what you see.',
      },
    ],
  },
  {
    heading: 'Telemetry & analytics',
    items: [
      {
        key: 'usageData',
        title: 'Share anonymous usage data',
        description: 'Help improve Keepr by sharing anonymous app usage statistics.',
      },
      {
        key: 'crashReports',
        title: 'Send crash reports',
        description: 'Send diagnostic information when the app crashes.',
      },
    ],
  },
  {
    heading: 'AI features',
    items: [
      {
        key: 'aiTitles',
        title: 'Use AI to suggest titles and tags',
        description: "Let Keepr's AI propose titles and categories for items you save.",
      },
      {
        key: 'aiTraining',
        title: "Use my saves to improve Keepr's AI",
        description: 'Allow Keepr to use your anonymized saves to improve AI features.',
      },
    ],
  },
];

type SubScreen = 'main' | 'delete' | 'policy';

export const PrivacyDataScreen = ({ onBack, content = [] }: PrivacyDataScreenProps) => {
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const [screen, setScreen] = useState<SubScreen>('main');

  const handleToggle = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast('Setting saved');
  };

  // --- G2.5: export the user's data in a structured, machine-readable format ---
  const handleDownload = () => {
    const exportObject = {
      exportedAt: new Date().toISOString(),
      account: { settings },
      keeprs: content.map((c) => ({
        ...c,
        createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
      })),
    };
    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keepr-data-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Your data has been downloaded');
  };

  // ---------------------------------------------------------------- Delete account
  if (screen === 'delete') {
    return (
      <div className="pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setScreen('main')}
            aria-label="Back"
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold font-josefin">Delete account</h1>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-foreground font-josefin leading-relaxed">
            You can delete your account whenever you want. No need to contact support, and no
            extra steps to talk you out of it.
          </p>

          <Card>
            <CardContent className="p-4 space-y-3 font-josefin text-sm text-muted-foreground">
              <p>
                Your account and all your saves will be scheduled for permanent deletion. There is
                a <span className="text-foreground font-medium">30-day grace period</span>: sign
                back in anytime within 30 days to cancel and restore everything.
              </p>
              <p>
                After 30 days the deletion is final. Your saves are permanently erased and cannot
                be recovered.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2 pt-2">
            <Button
              className="w-full font-josefin bg-destructive hover:bg-destructive/90 text-white"
              onClick={() => {
                toast('Account scheduled for deletion. You have 30 days to cancel.');
                setScreen('main');
              }}
            >
              Delete my account
            </Button>
            <Button
              variant="outline"
              className="w-full font-josefin"
              onClick={() => setScreen('main')}
            >
              Keep my account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- Privacy policy
  if (screen === 'policy') {
    return (
      <div className="pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setScreen('main')}
            aria-label="Back"
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold font-josefin">Privacy policy</h1>
        </div>

        <div className="space-y-4 font-josefin text-sm text-muted-foreground leading-relaxed">
          <div className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-medium">In plain language</span>
          </div>
          <p>
            Your saves are private by default. Only you can see them unless you choose to share a
            Keepr with a connection.
          </p>
          <p>
            We never sell your data. We collect the minimum needed to run the app, and every
            data-use setting on the previous screen is off until you turn it on.
          </p>
          <p>
            You can export everything you have saved at any time, and you can delete your account
            yourself with a 30-day grace period.
          </p>
          <p>
            AI features that help classify or summarize your saves are always labeled where they
            appear, and you can switch them off in Privacy &amp; Data.
          </p>
          <p className="text-xs pt-2">
            This is a prototype privacy summary for demonstration purposes within a master's thesis.
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- Main screen
  return (
    <div className="pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          aria-label="Back"
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold font-josefin">Privacy & Data</h1>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 font-josefin px-1">
              {section.heading}
            </h2>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                {section.items.map((item) => (
                  <div key={item.key} className="p-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium font-josefin">{item.title}</p>
                      <p className="text-sm text-muted-foreground font-josefin mt-1">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      checked={!!settings[item.key]}
                      onCheckedChange={(v) => handleToggle(item.key, v)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 font-josefin px-1">
            Your data
          </h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full font-josefin justify-start gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download my data
            </Button>
            <Button
              variant="outline"
              className="w-full font-josefin justify-start gap-2 bg-white text-destructive hover:bg-destructive/5 border-border"
              onClick={() => setScreen('delete')}
            >
              <Trash2 className="h-4 w-4" />
              Delete account
            </Button>
            <Button
              variant="outline"
              className="w-full font-josefin justify-start gap-2"
              onClick={() => setScreen('policy')}
            >
              <FileText className="h-4 w-4" />
              View privacy policy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
