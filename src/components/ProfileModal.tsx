import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onUsernameUpdate: (newUsername: string) => void;
}

export const ProfileModal = ({ isOpen, onClose, username, onUsernameUpdate }: ProfileModalProps) => {
  const [editedUsername, setEditedUsername] = useState(username);
  const [displayName, setDisplayName] = useState(username);

  const handleSave = () => {
    onUsernameUpdate(editedUsername);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-josefin">Profile Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-white text-2xl font-josefin">
                  {username.charAt(0).toUpperCase()}
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

          {/* Username */}
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

          {/* Display Name */}
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

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 font-josefin"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-primary text-white font-josefin"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};