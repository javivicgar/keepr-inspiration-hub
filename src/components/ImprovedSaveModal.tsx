
import React, { useState } from 'react';
import { X, MapPin, Link, User, Folder, Tag, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { SavedContent } from '@/pages/Index';

interface ImprovedSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: Omit<SavedContent, 'id' | 'createdAt'>) => void;
}

export const ImprovedSaveModal = ({ isOpen, onClose, onSave }: ImprovedSaveModalProps) => {
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

  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { value: 'Food Spots', emoji: '🍕', label: 'Food Spots' },
    { value: 'Locations', emoji: '🧳', label: 'Locations' },
    { value: 'Fashion', emoji: '🛍️', label: 'Fashion' },
    { value: 'Useful Apps', emoji: '⚙️', label: 'Useful Apps' },
    { value: 'Tutorials', emoji: '📚', label: 'Tutorials' },
    { value: 'Outdoor', emoji: '🏔️', label: 'Outdoor' },
    { value: 'Music', emoji: '🎵', label: 'Music' },
    { value: 'Home', emoji: '🏠', label: 'Home' },
    { value: 'Other', emoji: '💡', label: 'Other' },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.link || !formData.folder) {
      return;
    }

    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
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
    }, 1500);
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
        <div className="bg-background rounded-3xl p-8 max-w-sm w-full text-center shadow-xl">
          <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 font-josefin">Saved to {formData.folder}!</h3>
          <p className="text-muted-foreground font-josefin">Your Keepr has been saved successfully</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute inset-x-0 bottom-0 bg-background rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground font-josefin tracking-wide">Save Inspiration</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Category Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium font-josefin">Content Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category.value}
                  type="button"
                  className={`p-4 rounded-2xl border-2 transition-all text-left font-josefin ${
                    formData.category === category.value
                      ? 'border-[#a8a5d0] bg-[#a8a5d0]/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                >
                  <div className="text-2xl mb-1">{category.emoji}</div>
                  <div className="font-medium text-sm">{category.label}</div>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {categories.slice(4).map((category) => (
                <button
                  key={category.value}
                  type="button"
                  className={`p-3 rounded-2xl border-2 transition-all text-left font-josefin ${
                    formData.category === category.value
                      ? 'border-[#a8a5d0] bg-[#a8a5d0]/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                >
                  <div className="text-lg mb-1">{category.emoji}</div>
                  <div className="font-medium text-xs">{category.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium font-josefin">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Amazing rooftop café in Rome"
              className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              required
            />
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label htmlFor="link" className="text-base font-medium font-josefin">Content Link *</Label>
            <div className="relative">
              <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="link"
                className="pl-12 h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://tiktok.com/@user/video/..."
                required
              />
            </div>
          </div>

          {/* Creator */}
          <div className="space-y-2">
            <Label htmlFor="creator" className="text-base font-medium font-josefin">Creator</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="creator"
                className="pl-12 h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
                value={formData.creatorName}
                onChange={(e) => setFormData(prev => ({ ...prev, creatorName: e.target.value }))}
                placeholder="@username"
              />
            </div>
          </div>

          {/* Location (for Food/Travel) */}
          {(formData.category === 'Food Spots' || formData.category === 'Locations') && (
            <>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-medium font-josefin">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    className="pl-12 h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Rome, Italy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mapLink" className="text-base font-medium font-josefin">Google Maps Link</Label>
                <Input
                  id="mapLink"
                  value={formData.mapLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, mapLink: e.target.value }))}
                  placeholder="https://maps.google.com/..."
                  className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
                />
              </div>
            </>
          )}

          {/* Folder */}
          <div className="space-y-2">
            <Label htmlFor="folder" className="text-base font-medium font-josefin">Folder *</Label>
            <div className="relative">
              <Folder className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="folder"
                className="pl-12 h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
                value={formData.folder}
                onChange={(e) => setFormData(prev => ({ ...prev, folder: e.target.value }))}
                placeholder="Rome Trip, Summer Fits, etc."
                required
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-base font-medium font-josefin">Tags</Label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="tags"
                className="pl-12 h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="coffee, rooftop, romantic"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="note" className="text-base font-medium font-josefin">Notes</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
              placeholder="Why you saved this..."
              rows={4}
              className="text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-12 rounded-2xl border-2 font-josefin"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-12 bg-[#a8a5d0] hover:bg-[#9895c7] rounded-2xl font-josefin font-medium"
            >
              Save Keepr
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
