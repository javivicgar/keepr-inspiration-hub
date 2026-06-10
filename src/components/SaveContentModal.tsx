import React, { useMemo, useState } from 'react';
import { ArrowLeft, MapPin, Link, User, Folder, Tag, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SavedContent } from '@/types/SavedContent';
import { classifySensitivity, type SensitivityResult } from '@/lib/sensitivity';

interface SaveContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: Omit<SavedContent, 'id' | 'createdAt'>) => void;
  existingFolders: string[];
  onOpenPrivacy?: () => void;
}

export const SaveContentModal = ({ isOpen, onClose, onSave, existingFolders, onOpenPrivacy }: SaveContentModalProps) => {
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
  const [pendingSensitive, setPendingSensitive] = useState<SensitivityResult | null>(null);

  // Live classification for the inline caution pill under the Title field.
  const liveSensitivity = useMemo(
    () => classifySensitivity({ title: formData.title, link: formData.link, note: formData.note }),
    [formData.title, formData.link, formData.note]
  );

  const resetForm = () => {
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

  const commitSave = () => {
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.link || !formData.folder) {
      return;
    }

    const result = classifySensitivity({
      title: formData.title,
      link: formData.link,
      note: formData.note,
    });

    if (result.tier === 'sensitive') {
      setPendingSensitive(result);
      return;
    }

    commitSave();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-background overflow-y-auto">
      <div className="px-4 pt-5 pb-24">
        <div className="flex items-center gap-3 mb-6 sticky top-0 bg-background py-2 z-10">
          <button
            onClick={onClose}
            aria-label="Back"
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold font-josefin">Save Content</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-josefin">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Amazing rooftop café in Rome"
              required
            />
            {liveSensitivity.tier === 'caution' && (
              <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>
                  This save may be sensitive ({liveSensitivity.category}) —{' '}
                  <button
                    type="button"
                    onClick={() => onOpenPrivacy?.()}
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    review privacy?
                  </button>
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="link" className="font-josefin">Link *</Label>
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
            <Label htmlFor="creator" className="font-josefin">Creator</Label>
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
            <Label className="font-josefin">Category</Label>
            <RadioGroup
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as SavedContent['category'] }))}
              className="grid grid-cols-2 gap-2"
            >
              {['Food Spots', 'Locations', 'Fashion', 'Useful Apps', 'Tutorials', 'Outdoor', 'Music', 'Home', 'Other'].map((category) => (
                <div key={category} className="flex items-center space-x-2 p-2 border border-border rounded-md">
                  <RadioGroupItem value={category} id={category} />
                  <Label htmlFor={category} className="text-sm font-josefin">{category}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {(formData.category === 'Food Spots' || formData.category === 'Locations') && (
            <>
              <div className="space-y-2">
                <Label htmlFor="location" className="font-josefin">Location</Label>
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
                <Label htmlFor="mapLink" className="font-josefin">Map Link</Label>
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
            <Label htmlFor="folder" className="font-josefin">Folder *</Label>
            <div className="space-y-2">
              {existingFolders.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground font-josefin">Select existing folder:</Label>
                  <Select value={formData.folder} onValueChange={(value) => setFormData(prev => ({ ...prev, folder: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose folder" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingFolders.map((folder) => (
                        <SelectItem key={folder} value={folder}>{folder}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Label className="text-sm text-muted-foreground font-josefin">Or create new folder:</Label>
                </div>
              )}
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="font-josefin">Tags</Label>
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
            <Label htmlFor="note" className="font-josefin">Note</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
              placeholder="Why you saved this..."
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 font-josefin">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 font-josefin">
              Save
            </Button>
          </div>
        </form>
      </div>

      {pendingSensitive && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          style={{ background: 'hsl(240 10% 12% / 0.35)', backdropFilter: 'blur(6px)' }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-[300px] rounded-2xl overflow-hidden p-5 text-center"
            style={{
              background: 'hsl(0 0% 100% / 0.92)',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 20px 50px -10px hsl(240 10% 12% / 0.25)',
            }}
          >
            <h3 className="text-[15px] font-semibold text-foreground leading-snug font-josefin">
              This looks like {pendingSensitive.category}
            </h3>
            <p className="text-[13px] text-muted-foreground mt-2 leading-snug">
              Saving this means it'll be stored in your Keepr account. Only you can see it.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                onClick={() => { setPendingSensitive(null); commitSave(); }}
                className="w-full h-10 rounded-md bg-primary hover:bg-primary/90 font-josefin"
              >
                Save anyway
              </Button>
              <Button
                onClick={() => setPendingSensitive(null)}
                variant="ghost"
                className="w-full h-10 rounded-md font-josefin"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
