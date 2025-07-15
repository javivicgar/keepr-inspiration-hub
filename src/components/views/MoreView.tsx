
import React from 'react';
import { Settings, Heart, Star, Share2, HelpCircle, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MoreViewProps {
  totalContent: number;
  totalFolders: number;
}

export const MoreView = ({ totalContent, totalFolders }: MoreViewProps) => {
  const menuItems = [
    { icon: Settings, label: 'Settings', action: () => console.log('Settings') },
    { icon: Star, label: 'Rate Keepr', action: () => console.log('Rate') },
    { icon: Share2, label: 'Share with Friends', action: () => console.log('Share') },
    { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help') },
    { icon: Mail, label: 'Send Feedback', action: () => console.log('Feedback') },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Stats */}
      <Card className="bg-gradient-to-r from-[#a8a5d0]/10 to-[#9895c7]/10">
        <CardContent className="p-6 text-center">
          <div className="bg-white rounded-2xl p-4 mb-4 inline-block">
            <Heart className="h-8 w-8 text-[#a8a5d0] fill-current" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your Keepr Stats</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-2xl font-bold text-[#a8a5d0]">{totalContent}</div>
              <div className="text-sm text-muted-foreground">Saved Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#a8a5d0]">{totalFolders}</div>
              <div className="text-sm text-muted-foreground">Folders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4" onClick={item.action}>
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* App Info */}
      <div className="text-center pt-8">
        <p className="text-sm text-muted-foreground mb-2">Keepr v1.0.0</p>
        <p className="text-xs text-muted-foreground">Made with ❤️ for saving inspiration</p>
      </div>
    </div>
  );
};
