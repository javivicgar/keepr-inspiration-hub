import React, { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface ProfileScreenProps {
  username: string;
  onBack: () => void;
  onUsernameUpdate: (newUsername: string) => void;
}

export const ProfileScreen = ({ username, onBack, onUsernameUpdate }: ProfileScreenProps) => {
  const [editedUsername, setEditedUsername] = useState(username);
  const [displayName, setDisplayName] = useState(username);

  const handleSave = () => {
    onUsernameUpdate(editedUsername);
    toast('Profile saved');
    onBack();
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
        <h1 className="text-xl font-semibold font-josefin">Profile Settings</h1>
      </div>

      <div className="flex flex-col items-center space-y-4 mb-6">
        <div className="relative">
          <Avatar className="w-20 h-20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-white text-2xl font-josefin">
              {(username || 'U').charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            variant="outline"
            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-background"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground font-josefin">Tap to change profile picture</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="font-josefin">Username</Label>
          <Input
            id="username"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            className="font-josefin"
            placeholder="Enter username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayName" className="font-josefin">Display Name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="font-josefin"
            placeholder="Enter display name"
          />
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-josefin font-medium rounded-md"
      >
        Save Changes
      </Button>
    </div>
  );
};
