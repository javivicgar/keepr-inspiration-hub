import React, { useState } from 'react';
import { X, MapPin, Link, User, Folder, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { SavedContent } from '@/types/SavedContent';

interface SaveContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: Omit<SavedContent, 'id' | 'createdAt'>) => void;
}

export const SaveContentModal = ({ isOpen, onClose, onSave }: SaveContentModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    creatorName: '',
    link: '',
    category: 'Food Spots' as SavedContent['category'],
    location: '',
    mapLink: '',
    note: '',
    tags: '',
    folder: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.link || !formData.folder) {
      return;
    }

    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });

    // Reset form
    setFormData({
      title: '',
      creatorName: '',
      link: '',
      category: 'Food Spots',
      location: '',
      mapLink: '',
      note: '',
      tags: '',
      folder: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Save Content</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Amazing rooftop café in Rome"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link *</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="link"
                className="pl-10"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://tiktok.com/@user/video/..."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="creator">Creator</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="creator"
                className="pl-10"
                value={formData.creatorName}
                onChange={(e) => setFormData(prev => ({ ...prev, creatorName: e.target.value }))}
                placeholder="@username"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Category</Label>
            <RadioGroup
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as SavedContent['category'] }))}
              className="grid grid-cols-2 gap-2"
            >
              {['Food Spots', 'Locations', 'Fashion', 'Useful Apps', 'Tutorials', 'Outdoor', 'Music', 'Home', 'Other'].map((category) => (
                <div key={category} className="flex items-center space-x-2 p-2 border border-border rounded-md">
                  <RadioGroupItem value={category} id={category} />
                  <Label htmlFor={category} className="text-sm">{category}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {(formData.category === 'Food Spots' || formData.category === 'Locations') && (
            <>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Rome, Italy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mapLink">Map Link</Label>
                <Input
                  id="mapLink"
                  value={formData.mapLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, mapLink: e.target.value }))}
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="folder">Folder *</Label>
            <div className="relative">
              <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="folder"
                className="pl-10"
                value={formData.folder}
                onChange={(e) => setFormData(prev => ({ ...prev, folder: e.target.value }))}
                placeholder="Rome Trip, Summer Fits, etc."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="tags"
                className="pl-10"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="coffee, rooftop, romantic (comma-separated)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
              placeholder="Why you saved this..."
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
