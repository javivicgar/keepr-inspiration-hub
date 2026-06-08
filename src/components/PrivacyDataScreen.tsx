import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface PrivacyDataScreenProps {
  onBack: () => void;
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

export const PrivacyDataScreen = ({ onBack }: PrivacyDataScreenProps) => {
  const [settings, setSettings] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast('Setting saved');
  };

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
            <Button variant="outline" className="w-full font-josefin" onClick={() => toast('Coming soon')}>
              Download my data
            </Button>
            <Button
              variant="outline"
              className="w-full font-josefin bg-white text-destructive hover:bg-destructive/5 border-border"
              onClick={() => toast('Coming soon')}
            >
              Delete account
            </Button>
            <Button variant="outline" className="w-full font-josefin" onClick={() => toast('Coming soon')}>
              View privacy policy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
