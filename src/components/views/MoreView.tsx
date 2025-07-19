
import React, { useState } from 'react';
import { Settings, Heart, Star, Share2, HelpCircle, Mail, Moon, Sun, Chrome, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { EditPreferencesModal } from '@/components/EditPreferencesModal';

interface MoreViewProps {
  totalContent: number;
  totalFolders: number;
  userPreferences?: string[];
  onPreferencesUpdate?: (preferences: string[]) => void;
}

export const MoreView = ({ totalContent, totalFolders, userPreferences = [], onPreferencesUpdate }: MoreViewProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showEditPreferences, setShowEditPreferences] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#2B2737';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '';
    }
  };

  const menuItems = [
    { 
      icon: User, 
      label: 'Edit Preferences', 
      action: () => setShowEditPreferences(true)
    },
    { 
      icon: darkMode ? Sun : Moon, 
      label: 'Dark Mode', 
      action: toggleDarkMode,
      hasSwitch: true 
    },
    { 
      icon: Star, 
      label: 'Rate Keepr', 
      action: () => window.open('https://apps.apple.com/app/keepr', '_blank')
    },
    { 
      icon: Share2, 
      label: 'Share Keepr With Friends', 
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Keepr - Save Your Inspirations',
            text: 'Check out this amazing app for saving and organizing inspiration!',
            url: 'https://keepr.app'
          });
        }
      }
    },
    { 
      icon: Chrome, 
      label: 'Install Chrome Extension', 
      action: () => window.open('https://chrome.google.com/webstore/detail/keepr', '_blank')
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      action: () => console.log('Help')
    },
    { 
      icon: Mail, 
      label: 'Send Feedback', 
      action: () => window.open('mailto:support@keepr.app', '_blank')
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Stats */}
      <Card className="bg-gradient-to-r from-[#a8a5d0]/10 to-[#9895c7]/10">
        <CardContent className="p-6 text-center">
          <div className="bg-white rounded-2xl p-4 mb-4 inline-block">
            <Heart className="h-8 w-8 text-[#a8a5d0] fill-current" />
          </div>
          <h2 className="text-xl font-semibold mb-2 font-josefin">Your Keepr Stats</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-2xl font-bold text-[#a8a5d0] font-josefin">{totalContent}</div>
              <div className="text-sm text-muted-foreground font-josefin">Saved Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#a8a5d0] font-josefin">{totalFolders}</div>
              <div className="text-sm text-muted-foreground font-josefin">Folders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => (
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
        ))}
      </div>

      {/* App Info */}
      <div className="text-center pt-8">
        <p className="text-sm text-muted-foreground mb-2 font-josefin">Keepr v1.0.0</p>
        <p className="text-xs text-muted-foreground font-josefin">Made with ❤️ for saving inspiration</p>
      </div>

      <EditPreferencesModal
        isOpen={showEditPreferences}
        onClose={() => setShowEditPreferences(false)}
        currentPreferences={userPreferences}
        onSave={(preferences) => onPreferencesUpdate?.(preferences)}
      />
    </div>
  );
};
