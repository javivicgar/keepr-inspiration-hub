import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, MapPin, Bell, type LucideIcon } from 'lucide-react';

type PermissionKind = 'camera' | 'location' | 'notifications';

interface PermissionPromptProps {
  kind: PermissionKind;
  feature: string;
  onAllow: () => void;
  onDismiss: () => void;
}

const META: Record<PermissionKind, { icon: LucideIcon; label: string; tone: string; toneBg: string }> = {
  camera: { icon: Camera, label: 'camera', tone: 'text-emerald-600', toneBg: 'bg-emerald-50' },
  location: { icon: MapPin, label: 'location', tone: 'text-purple-600', toneBg: 'bg-purple-50' },
  notifications: { icon: Bell, label: 'notifications', tone: 'text-amber-600', toneBg: 'bg-amber-50' },
};

export const PermissionPrompt = ({ kind, feature, onAllow, onDismiss }: PermissionPromptProps) => {
  const meta = META[kind];
  const Icon = meta.icon;
  const sentence = `${feature} needs access to your ${meta.label} to work.`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-6">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in">
        <div className={`h-12 w-12 rounded-full ${meta.toneBg} flex items-center justify-center mb-4`}>
          <Icon className={`h-6 w-6 ${meta.tone}`} />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Quick permission</h3>
        <p className="text-sm text-muted-foreground mb-6">{sentence}</p>
        <div className="flex flex-col gap-2">
          <Button
            onClick={onAllow}
            className="w-full bg-primary text-primary-foreground hover:bg-primary-hover h-11 rounded-md"
          >
            Allow
          </Button>
          <Button
            onClick={onDismiss}
            variant="ghost"
            className="w-full h-11 rounded-md"
          >
            Not now
          </Button>
        </div>
      </div>
    </div>
  );
};
