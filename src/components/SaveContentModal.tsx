import React, { useState } from 'react';
import { ArrowLeft, MapPin, Link as LinkIcon, User, Folder, Tag, ChevronDown, Plus, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { SavedContent } from '@/types/SavedContent';
import { CATEGORIES } from '@/lib/categories';
import { classifySensitivity, type SensitivityResult } from '@/lib/sensitivity';

interface SaveContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: Omit<SavedContent, 'id' | 'createdAt'>) => void;
  existingFolders: string[];
  onOpenPrivacy?: () => void;
  /** Categories the user has previously created, persisted by the parent. */
  customCategories?: string[];
  onAddCustomCategory?: (name: string) => void;
}

export const SaveContentModal = ({
  isOpen,
  onClose,
  onSave,
  existingFolders,
  onOpenPrivacy,
  customCategories = [],
  onAddCustomCategory,
}: SaveContentModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    creatorName: '',
    link: '',
    category: 'Places' as string,
    location: '',
    note: '',
    tags: '',
    folder: '',
  });
  const [showDetails, setShowDetails] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(existingFolders.length === 0);
  const [pendingSensitive, setPendingSensitive] = useState<SensitivityResult | null>(null);

  const liveSensitivity = classifySensitivity({
    title: formData.title,
    link: formData.link,
    note: formData.note,
  });

  const allCategories = [...CATEGORIES, ...customCategories];
  const isPlaceLike = formData.category === 'Places';

  const resetForm = () => {
    setFormData({ title: '', creatorName: '', link: '', category: 'Places', location: '', note: '', tags: '', folder: '' });
    setShowDetails(false);
    setCreatingFolder(existingFolders.length === 0);
  };

  const commitSave = () => {
    onSave({
      title: formData.title,
      creatorName: formData.creatorName,
      link: formData.link,
      category: formData.category,
      location: formData.location || undefined,
      note: formData.note,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      folder: formData.folder,
    });
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.folder) return; // Link no longer required (G2.1)
    const result = classifySensitivity({ title: formData.title, link: formData.link, note: formData.note });
    if (result.tier === 'sensitive') {
      setPendingSensitive(result);
      return;
    }
    commitSave();
  };

  const confirmNewCategory = () => {
    const name = newCategory.trim();
    if (!name) return;
    onAddCustomCategory?.(name);
    setFormData((p) => ({ ...p, category: name }));
    setNewCategory('');
    setAddingCategory(false);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-background overflow-y-auto">
      <div className="px-4 pt-5 pb-28">
        <div className="flex items-center gap-3 mb-6 sticky top-0 bg-background py-2 z-10">
          <button onClick={onClose} aria-label="Back" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center">
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold font-josefin">Save a Keepr</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE - the one essential field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-josefin">What are you saving?</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
              placeholder="Give it a name"
              className="rounded-xl"
              required
            />
            {liveSensitivity.tier === 'caution' && (
              <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>
                  This save may be sensitive ({liveSensitivity.category}) —{' '}
                  <button type="button" onClick={() => onOpenPrivacy?.()} className="underline underline-offset-2 hover:text-foreground">
                    review privacy?
                  </button>
                </span>
              </div>
            )}
          </div>

          {/* CATEGORY - tap chips */}
          <div className="space-y-2">
            <Label className="font-josefin">Category</Label>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, category: cat }))}
                  className={`px-3 py-1.5 rounded-full text-sm font-josefin border transition-colors ${
                    formData.category === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:border-primary/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
              {addingCategory ? (
                <span className="inline-flex items-center gap-1">
                  <Input
                    autoFocus
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); confirmNewCategory(); } }}
                    placeholder="Name it"
                    className="h-8 w-28 rounded-full text-sm"
                  />
                  <Button type="button" size="sm" onClick={confirmNewCategory} className="h-8 rounded-full">Add</Button>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setAddingCategory(true)}
                  className="px-3 py-1.5 rounded-full text-sm font-josefin border border-dashed border-border text-muted-foreground hover:border-primary/60 inline-flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> New
                </button>
              )}
            </div>
          </div>

          {/* LOCATION - only for place-like saves */}
          {isPlaceLike && (
            <div className="space-y-2">
              <Label htmlFor="location" className="font-josefin">Location <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="location" className="pl-10 rounded-xl" value={formData.location}
                  onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))} placeholder="e.g. Rome, Italy" />
              </div>
            </div>
          )}

          {/* FOLDER - existing or create new inline */}
          <div className="space-y-2">
            <Label htmlFor="folder" className="font-josefin">Save to folder</Label>
            {existingFolders.length > 0 && !creatingFolder ? (
              <div className="flex flex-wrap gap-2">
                {existingFolders.map((f) => (
                  <button key={f} type="button" onClick={() => setFormData((p) => ({ ...p, folder: f }))}
                    className={`px-3 py-1.5 rounded-full text-sm font-josefin border transition-colors ${
                      formData.folder === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:border-primary/60'
                    }`}>
                    {f}
                  </button>
                ))}
                <button type="button" onClick={() => { setCreatingFolder(true); setFormData((p) => ({ ...p, folder: '' })); }}
                  className="px-3 py-1.5 rounded-full text-sm font-josefin border border-dashed border-border text-muted-foreground hover:border-primary/60 inline-flex items-center gap-1">
                  <Plus className="h-3.5 w-3.5" /> New folder
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <Folder className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="folder" className="pl-10 rounded-xl" value={formData.folder}
                    onChange={(e) => setFormData((p) => ({ ...p, folder: e.target.value }))} placeholder="New folder name" required />
                </div>
                {existingFolders.length > 0 && (
                  <button type="button" onClick={() => setCreatingFolder(false)} className="text-xs text-primary underline font-josefin">
                    Choose an existing folder instead
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ADD DETAILS - everything non-essential collapsed (G2.1) */}
          <div className="border-t border-border pt-4">
            <button type="button" onClick={() => setShowDetails((v) => !v)}
              className="flex items-center justify-between w-full text-sm font-medium font-josefin text-muted-foreground">
              <span>Add details (optional)</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>

            {showDetails && (
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="link" className="font-josefin">Link</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="link" className="pl-10 rounded-xl" value={formData.link}
                      onChange={(e) => setFormData((p) => ({ ...p, link: e.target.value }))} placeholder="https://..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creator" className="font-josefin">Creator</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="creator" className="pl-10 rounded-xl" value={formData.creatorName}
                      onChange={(e) => setFormData((p) => ({ ...p, creatorName: e.target.value }))} placeholder="@username" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="font-josefin">Tags</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="tags" className="pl-10 rounded-xl" value={formData.tags}
                      onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))} placeholder="comma, separated" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note" className="font-josefin">Note</Label>
                  <Textarea id="note" className="rounded-xl" value={formData.note}
                    onChange={(e) => setFormData((p) => ({ ...p, note: e.target.value }))} placeholder="Why you saved this..." rows={3} />
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 font-josefin rounded-xl">Cancel</Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 font-josefin rounded-xl">Save Keepr</Button>
          </div>
        </form>
      </div>

      {pendingSensitive && (
        <div className="fixed -inset-12 z-[60] flex items-center justify-center p-6"
          style={{ background: 'hsl(240 10% 12% / 0.35)', backdropFilter: 'blur(6px)' }} role="dialog" aria-modal="true">
          <div className="w-full max-w-[300px] rounded-2xl overflow-hidden p-5 text-center"
            style={{ background: 'hsl(0 0% 100% / 0.92)', backdropFilter: 'blur(20px) saturate(180%)', boxShadow: '0 20px 50px -10px hsl(240 10% 12% / 0.25)' }}>
            <h3 className="text-[15px] font-semibold text-foreground leading-snug font-josefin">This looks like {pendingSensitive.category}</h3>
            <p className="text-[13px] text-muted-foreground mt-2 leading-snug">Saving this means it'll be stored in your Keepr account. Only you can see it.</p>
            <div className="mt-4 flex flex-col gap-2">
              <Button onClick={() => { setPendingSensitive(null); commitSave(); }} className="w-full h-10 rounded-md bg-primary hover:bg-primary/90 font-josefin">Save anyway</Button>
              <Button onClick={() => setPendingSensitive(null)} variant="ghost" className="w-full h-10 rounded-md font-josefin">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};