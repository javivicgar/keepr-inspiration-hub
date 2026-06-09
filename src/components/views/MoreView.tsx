
import React, { useState } from 'react';
import { Heart, Star, Share2, HelpCircle, Mail, Moon, Sun, Chrome, User, Shield, Bell, BellOff, BellRing } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { EditPreferencesScreen } from '@/components/EditPreferencesScreen';
import { PrivacyDataScreen } from '@/components/PrivacyDataScreen';
import { PermissionPrompt } from '@/components/PermissionPrompt';
import { usePermissionFlow } from '@/lib/permissions';

interface MoreViewProps {
  totalContent: number;
  totalFolders: number;
  userPreferences?: string[];
  onPreferencesUpdate?: (preferences: string[]) => void;
}

interface MenuItem {
  icon: any;
  label: string;
  action: () => void;
  hasSwitch?: boolean;
}

export const MoreView = ({ totalContent, totalFolders, userPreferences = [], onPreferencesUpdate }: MoreViewProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showEditPreferences, setShowEditPreferences] = useState(false);
  const [showPrivacyData, setShowPrivacyData] = useState(false);
  const notificationsFlow = usePermissionFlow('notifications');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (showPrivacyData) {
    return <PrivacyDataScreen onBack={() => setShowPrivacyData(false)} />;
  }

  if (showEditPreferences) {
    return (
      <EditPreferencesScreen
        currentPreferences={userPreferences}
        onBack={() => setShowEditPreferences(false)}
        onSave={(preferences) => onPreferencesUpdate?.(preferences)}
      />
    );
  }

  const sections: { heading: string; items: MenuItem[] }[] = [
    {
      heading: 'Account',
      items: [
        { icon: User, label: 'Edit Preferences', action: () => setShowEditPreferences(true) },
        { icon: Shield, label: 'Privacy & Data', action: () => setShowPrivacyData(true) },
      ],
    },
    {
      heading: 'App',
      items: [
        { icon: darkMode ? Sun : Moon, label: 'Dark Mode', action: toggleDarkMode, hasSwitch: true },
        {
          icon: notificationsFlow.status === 'granted' ? BellRing : notificationsFlow.status === 'denied' ? BellOff : Bell,
          label:
            notificationsFlow.status === 'granted'
              ? 'Notifications enabled'
              : notificationsFlow.status === 'denied'
              ? 'Enable notifications'
              : 'Turn on notifications',
          action: () => {
            if (notificationsFlow.status === 'granted') return;
            notificationsFlow.request();
          },
        },
        { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help') },
        { icon: Mail, label: 'Send Feedback', action: () => window.open('mailto:support@keepr.app', '_blank') },
      ],
    },
    {
      heading: 'More',
      items: [
        { icon: Star, label: 'Rate Keepr', action: () => window.open('https://apps.apple.com/app/keepr', '_blank') },
        {
          icon: Share2,
          label: 'Share Keepr With Friends',
          action: () => {
            if (navigator.share) {
              navigator.share({
                title: 'Keepr - Save Your Inspirations',
                text: 'Check out this amazing app for saving and organizing inspiration!',
                url: 'https://keepr.app',
              });
            }
          },
        },
        { icon: Chrome, label: 'Install Chrome Extension', action: () => window.open('https://chrome.google.com/webstore/detail/keepr', '_blank') },
      ],
    },
  ];

  const renderItem = (item: MenuItem, index: number) => (
    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4" onClick={item.action}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted rounded-full p-2">
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="font-medium font-josefin">{item.label}</span>
          </div>
          {item.hasSwitch && (
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Stats */}
      <Card className="bg-card">
        <CardContent className="p-6 text-center">
          <div className="bg-white rounded-2xl p-4 mb-4 inline-block">
            <Heart className="h-8 w-8 text-primary fill-current" />
          </div>
          <h2 className="text-xl font-semibold mb-2 font-josefin">Your Keepr Stats</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-2xl font-bold text-primary font-josefin">{totalContent}</div>
              <div className="text-sm text-muted-foreground font-josefin">Saved Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-josefin">{totalFolders}</div>
              <div className="text-sm text-muted-foreground font-josefin">Folders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grouped Menu */}
      {sections.map((section, sIdx) => (
        <div key={section.heading}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1 font-josefin">
            {section.heading}
          </h3>
          <div className="space-y-2">
            {section.items.map(renderItem)}
          </div>
          {sIdx < sections.length - 1 && <div className="border-t border-border mt-6" />}
        </div>
      ))}

      {/* App Info */}
      <div className="text-center pt-8">
        <p className="text-sm text-muted-foreground mb-2 font-josefin">Keepr v1.0.0</p>
        <p className="text-xs text-muted-foreground font-josefin">For saving inspiration</p>
      </div>

      {notificationsFlow.pending && (
        <PermissionPrompt
          kind="notifications"
          feature="Reminders to revisit your saves"
          onAllow={() => notificationsFlow.resolve(true)}
          onDismiss={() => notificationsFlow.dismiss()}
        />
      )}
    </div>
  );
};
