import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, MapPin, Bell, Image as ImageIcon, type LucideIcon } from 'lucide-react';
import type { PermissionKind } from '@/lib/permissions';

interface PermissionPromptProps {
  kind: PermissionKind;
  feature: string;
  onAllow: () => void;
  onDismiss: () => void;
}

interface OSOption {
  label: string;
  granted: boolean;
  emphasized?: boolean;
}

interface KindMeta {
  icon: LucideIcon;
  label: string;
  tone: string;
  toneBg: string;
  os: {
    title: string;
    body: string;
    options: OSOption[];
  };
}

const META: Record<PermissionKind, KindMeta> = {
  camera: {
    icon: Camera,
    label: 'camera',
    tone: 'text-emerald-600',
    toneBg: 'bg-emerald-50',
    os: {
      title: '“Keepr” Would Like to Access the Camera',
      body: 'This lets you take a photo to save directly to Keepr.',
      options: [
        { label: "Don't Allow", granted: false },
        { label: 'Allow', granted: true, emphasized: true },
      ],
    },
  },
  location: {
    icon: MapPin,
    label: 'location',
    tone: 'text-purple-600',
    toneBg: 'bg-purple-50',
    os: {
      title: 'Allow “Keepr” to use your location?',
      body: 'Keepr will show nearby Keeprs on the map.',
      options: [
        { label: 'Allow While Using App', granted: true, emphasized: true },
        { label: 'Allow Once', granted: true },
        { label: "Don't Allow", granted: false },
      ],
    },
  },
  notifications: {
    icon: Bell,
    label: 'notifications',
    tone: 'text-amber-600',
    toneBg: 'bg-amber-50',
    os: {
      title: '“Keepr” Would Like to Send You Notifications',
      body: 'Notifications may include reminders to revisit saves you haven’t opened in a while.',
      options: [
        { label: "Don't Allow", granted: false },
        { label: 'Allow', granted: true, emphasized: true },
      ],
    },
  },
  photos: {
    icon: ImageIcon,
    label: 'photo library',
    tone: 'text-blue-600',
    toneBg: 'bg-blue-50',
    os: {
      title: '“Keepr” Would Like to Access Your Photos',
      body: 'This lets you attach an existing photo to a Keepr.',
      options: [
        { label: 'Allow Full Access', granted: true, emphasized: true },
        { label: 'Limited Access', granted: true },
        { label: "Don't Allow", granted: false },
      ],
    },
  },
};

export const PermissionPrompt = ({ kind, feature, onAllow, onDismiss }: PermissionPromptProps) => {
  const meta = META[kind];
  const Icon = meta.icon;
  const sentence = `${feature} needs access to your ${meta.label} to work.`;
  const [stage, setStage] = useState<'card' | 'os'>('card');

  if (stage === 'os') {
    const { title, body, options } = meta.os;
    const isStacked = options.length > 2;
    return (
      <div
        className="absolute inset-0 z-[60] flex items-center justify-center p-6"
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
            <h3 className="text-[15px] font-semibold text-foreground leading-snug">{title}</h3>
            <p className="text-[13px] text-muted-foreground mt-2 leading-snug">{body}</p>
          </div>
          {isStacked ? (
            <div className="border-t border-border/70 flex flex-col">
              {options.map((opt, i) => (
                <button
                  key={opt.label}
                  onClick={() => (opt.granted ? onAllow() : onDismiss())}
                  className={`py-3 text-[15px] hover:bg-muted/50 transition-colors ${
                    i > 0 ? 'border-t border-border/70' : ''
                  } ${opt.emphasized ? 'font-semibold text-primary' : 'text-foreground'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="border-t border-border/70 grid grid-cols-2">
              {options.map((opt, i) => (
                <button
                  key={opt.label}
                  onClick={() => (opt.granted ? onAllow() : onDismiss())}
                  className={`py-3 text-[15px] hover:bg-muted/50 transition-colors ${
                    i === 0 ? 'border-r border-border/70' : ''
                  } ${opt.emphasized ? 'font-semibold text-primary' : 'text-foreground'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/50 p-6">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in">
        <div className={`h-12 w-12 rounded-full ${meta.toneBg} flex items-center justify-center mb-4`}>
          <Icon className={`h-6 w-6 ${meta.tone}`} />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Quick permission</h3>
        <p className="text-sm text-muted-foreground mb-6">{sentence}</p>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => setStage('os')}
            className="w-full bg-primary text-primary-foreground hover:bg-primary-hover h-11 rounded-md"
          >
            Allow
          </Button>
          <Button onClick={onDismiss} variant="ghost" className="w-full h-11 rounded-md">
            Not now
          </Button>
        </div>
      </div>
    </div>
  );
};
