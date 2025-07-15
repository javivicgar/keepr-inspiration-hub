
import React from 'react';
import { Home, Map, Plus, Folder, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
}

export const BottomNavigation = ({ activeTab, onTabChange, onAddClick }: BottomNavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'add', label: 'Add', icon: Plus, isAdd: true },
    { id: 'folders', label: 'Folders', icon: Folder },
    { id: 'more', label: 'More', icon: Menu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
              tab.isAdd
                ? 'bg-[#a8a5d0] hover:bg-[#9895c7] text-white rounded-full w-12 h-12 p-0'
                : activeTab === tab.id
                ? 'text-[#a8a5d0]'
                : 'text-muted-foreground'
            }`}
            onClick={() => tab.isAdd ? onAddClick() : onTabChange(tab.id)}
          >
            <tab.icon className={`h-5 w-5 ${tab.isAdd ? '' : 'h-4 w-4'}`} />
            {!tab.isAdd && <span className="text-xs">{tab.label}</span>}
          </Button>
        ))}
      </div>
    </nav>
  );
};
