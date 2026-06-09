import React, { useState } from 'react';
import { X, Globe, Camera, Clipboard, Edit3, Plus, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PermissionPrompt } from '@/components/PermissionPrompt';
import { usePermissionFlow } from '@/lib/permissions';

interface AddOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

export const AddOptionsModal = ({ isOpen, onClose, onOptionSelect }: AddOptionsModalProps) => {
  const [showBrowser, setShowBrowser] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [browserUrl, setBrowserUrl] = useState('');
  const cameraFlow = usePermissionFlow('camera');
  const photosFlow = usePermissionFlow('photos');

  const options = [
    { id: 'browser', label: 'Browser', icon: Globe, color: 'bg-blue-50 text-blue-600' },
    { id: 'camera', label: 'Camera', icon: Camera, color: 'bg-green-50 text-green-600' },
    { id: 'paste', label: 'Paste Content', icon: Clipboard, color: 'bg-purple-50 text-purple-600' },
    { id: 'scratch', label: 'Write from scratch', icon: Edit3, color: 'bg-orange-50 text-orange-600' },
  ];

  const handleBrowserSearch = () => {
    if (browserUrl.trim()) {
      onOptionSelect('browser');
      setShowBrowser(false);
      setBrowserUrl('');
      onClose();
    }
  };

  const completeCameraFlow = () => {
    onOptionSelect('camera');
    setShowCamera(false);
    onClose();
  };

  const completeLibraryFlow = () => {
    onOptionSelect('camera');
    setShowCamera(false);
    onClose();
  };

  const handleTakePhoto = () => {
    cameraFlow.request(completeCameraFlow);
  };

  const handleFromLibrary = () => {
    photosFlow.request(completeLibraryFlow);
  };

  if (!isOpen) return null;

  if (showBrowser) {
    return (
      <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
        <div className="bg-background rounded-t-3xl w-full animate-slide-up max-h-[60vh]">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground font-josefin">Browse Content</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowBrowser(false)} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium font-josefin">Enter URL or search term</label>
              <Input
                placeholder="Search for content or paste a URL..."
                value={browserUrl}
                onChange={(e) => setBrowserUrl(e.target.value)}
                className="h-12 text-base rounded-2xl border-2 focus:border-primary font-josefin"
              />
            </div>

            <Button
              onClick={handleBrowserSearch}
              className="w-full bg-primary hover:bg-primary-hover text-white font-josefin font-medium py-3 rounded-2xl"
              disabled={!browserUrl.trim()}
            >
              Add as Keepr
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showCamera) {
    return (
      <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
        <div className="bg-background rounded-t-3xl w-full animate-slide-up max-h-[60vh]">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground font-josefin">Select Media</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowCamera(false)} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex flex-col items-center p-6 rounded-2xl border-2 border-border hover:border-primary transition-all font-josefin hover:shadow-md"
                onClick={handleTakePhoto}
              >
                <div className="p-4 rounded-full bg-green-50 text-green-600 mb-3">
                  <Camera className="h-6 w-6" />
                </div>
                <span className="font-medium text-sm">Take Photo</span>
                {cameraFlow.status === 'denied' && (
                  <span className="mt-2 text-[11px] text-primary underline font-josefin">Enable camera</span>
                )}
              </button>

              <button
                className="flex flex-col items-center p-6 rounded-2xl border-2 border-border hover:border-primary transition-all font-josefin hover:shadow-md"
                onClick={handleFromLibrary}
              >
                <div className="p-4 rounded-full bg-blue-50 text-blue-600 mb-3">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <span className="font-medium text-sm">From Library</span>
                {photosFlow.status === 'denied' && (
                  <span className="mt-2 text-[11px] text-primary underline font-josefin">Enable photo access</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {cameraFlow.pending && (
          <PermissionPrompt
            kind="camera"
            feature="Taking a photo for your Keepr"
            onAllow={() => cameraFlow.resolve(true)}
            onDismiss={() => cameraFlow.dismiss()}
          />
        )}
        {photosFlow.pending && (
          <PermissionPrompt
            kind="photos"
            feature="Attaching an existing photo to your Keepr"
            onAllow={() => photosFlow.resolve(true)}
            onDismiss={() => photosFlow.dismiss()}
          />
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-background rounded-t-3xl w-full animate-slide-up max-h-[60vh]">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground font-josefin">Import new Keepr</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option.id}
                className="flex flex-col items-center p-6 rounded-2xl border-2 border-border hover:border-primary transition-all font-josefin hover:shadow-md"
                onClick={() => {
                  if (option.id === 'browser') {
                    setShowBrowser(true);
                  } else if (option.id === 'camera') {
                    setShowCamera(true);
                  } else {
                    onOptionSelect(option.id);
                    onClose();
                  }
                }}
              >
                <div className={`p-4 rounded-full ${option.color} mb-3`}>
                  <option.icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
