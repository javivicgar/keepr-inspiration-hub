
import React, { useState, useEffect } from 'react';
import { X, MapPin, Link, User, Folder, Tag, ChevronDown, Check, Globe, Camera, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SavedContent } from '@/types/SavedContent';

interface ImprovedSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: Omit<SavedContent, 'id' | 'createdAt'>) => void;
  importType?: string;
}

export const ImprovedSaveModal = ({ isOpen, onClose, onSave, importType }: ImprovedSaveModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    creatorName: '',
    link: '',
    category: 'Food Spots' as SavedContent['category'],
    location: '',
    mapLink: '',
    note: '',
    tags: '',
    folder: '',
    // Category-specific fields
    googleMapsRating: '',
    recommendedBy: '',
    country: '',
    city: '',
    visitedWith: '',
    bestSeason: '',
    brand: '',
    priceRange: '',
    buyLink: '',
    styleTags: '',
    platform: '',
    appCategory: '',
    price: '',
    skillLevel: '',
    sportType: '',
    duration: '',
    entryFee: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pasteText, setPasteText] = useState('');

  const categories = [
    { value: 'Food Spots', emoji: '🍕', label: 'Food Spots' },
    { value: 'Locations', emoji: '🧳', label: 'Locations' },
    { value: 'Fashion', emoji: '🛍️', label: 'Fashion' },
    { value: 'Useful Apps', emoji: '⚙️', label: 'Useful Apps' },
    { value: 'Tutorials', emoji: '📚', label: 'Tutorials' },
    { value: 'Outdoor', emoji: '🏔️', label: 'Outdoor' },
    { value: 'Music', emoji: '🎵', label: 'Music' },
    { value: 'Home', emoji: '🏠', label: 'Home' },
    { value: 'Sports', emoji: '🏀', label: 'Sports' },
    { value: 'Other', emoji: '💡', label: 'Other' },
  ] as const;

  // AI Analysis simulation
  const analyzeContent = async (text: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple keyword-based analysis (replace with actual AI)
    let suggestedCategory: SavedContent['category'] = 'Other';
    let suggestedTags: string[] = [];
    
    if (text.toLowerCase().includes('food') || text.toLowerCase().includes('restaurant')) {
      suggestedCategory = 'Food Spots';
      suggestedTags = ['food', 'restaurant'];
    } else if (text.toLowerCase().includes('travel') || text.toLowerCase().includes('location')) {
      suggestedCategory = 'Locations';
      suggestedTags = ['travel', 'location'];
    } else if (text.toLowerCase().includes('fashion') || text.toLowerCase().includes('outfit')) {
      suggestedCategory = 'Fashion';
      suggestedTags = ['fashion', 'style'];
    }
    
    setFormData(prev => ({
      ...prev,
      category: suggestedCategory,
      tags: suggestedTags.join(', '),
      title: text.substring(0, 50) + (text.length > 50 ? '...' : '')
    }));
    
    setIsAnalyzing(false);
  };

  useEffect(() => {
    if (importType === 'paste' && pasteText) {
      analyzeContent(pasteText);
    }
  }, [importType, pasteText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.link || !formData.folder) {
      return;
    }

    const contentData: Omit<SavedContent, 'id' | 'createdAt'> = {
      title: formData.title,
      creatorName: formData.creatorName,
      link: formData.link,
      category: formData.category,
      location: formData.location,
      mapLink: formData.mapLink,
      note: formData.note,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      folder: formData.folder,
      // Category-specific fields
      googleMapsRating: formData.googleMapsRating ? parseFloat(formData.googleMapsRating) : undefined,
      recommendedBy: formData.recommendedBy || undefined,
      country: formData.country || undefined,
      city: formData.city || undefined,
      visitedWith: formData.visitedWith || undefined,
      bestSeason: formData.bestSeason || undefined,
      brand: formData.brand || undefined,
      priceRange: formData.priceRange || undefined,
      buyLink: formData.buyLink || undefined,
      styleTags: formData.styleTags ? formData.styleTags.split(',').map(tag => tag.trim()).filter(Boolean) : undefined,
      platform: formData.platform || undefined,
      appCategory: formData.appCategory || undefined,
      price: formData.price || undefined,
      skillLevel: formData.skillLevel || undefined,
      sportType: formData.sportType || undefined,
      duration: formData.duration || undefined,
      entryFee: formData.entryFee || undefined,
    };

    onSave(contentData);

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
        folder: '',
        googleMapsRating: '',
        recommendedBy: '',
        country: '',
        city: '',
        visitedWith: '',
        bestSeason: '',
        brand: '',
        priceRange: '',
        buyLink: '',
        styleTags: '',
        platform: '',
        appCategory: '',
        price: '',
        skillLevel: '',
        sportType: '',
        duration: '',
        entryFee: ''
      });
      setPasteText('');
    }, 1500);
  };

  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'Food Spots':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="googleMapsRating" className="text-base font-medium font-josefin">Google Maps Rating</Label>
              <Input
                id="googleMapsRating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.googleMapsRating}
                onChange={(e) => setFormData(prev => ({ ...prev, googleMapsRating: e.target.value }))}
                placeholder="4.5"
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recommendedBy" className="text-base font-medium font-josefin">Recommended by</Label>
              <Input
                id="recommendedBy"
                value={formData.recommendedBy}
                onChange={(e) => setFormData(prev => ({ ...prev, recommendedBy: e.target.value }))}
                placeholder="Creator name"
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
          </>
        );
      
      case 'Locations':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="country" className="text-base font-medium font-josefin">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                placeholder="Switzerland"
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-base font-medium font-josefin">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Zurich"
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitedWith" className="text-base font-medium font-josefin">Visited with</Label>
              <Input
                id="visitedWith"
                value={formData.visitedWith}
                onChange={(e) => setFormData(prev => ({ ...prev, visitedWith: e.target.value }))}
                placeholder="Friends, family..."
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bestSeason" className="text-base font-medium font-josefin">Best Season</Label>
              <Select value={formData.bestSeason} onValueChange={(value) => setFormData(prev => ({ ...prev, bestSeason: value }))}>
                <SelectTrigger className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="autumn">Autumn</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                  <SelectItem value="all-year">All Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case 'Fashion':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="brand" className="text-base font-medium font-josefin">Brand/Store</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                placeholder="Zara, H&M, Nike..."
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceRange" className="text-base font-medium font-josefin">Price Range</Label>
              <Select value={formData.priceRange} onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}>
                <SelectTrigger className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget ($)</SelectItem>
                  <SelectItem value="mid-range">Mid-range ($$)</SelectItem>
                  <SelectItem value="premium">Premium ($$$)</SelectItem>
                  <SelectItem value="luxury">Luxury ($$$$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyLink" className="text-base font-medium font-josefin">Buy Link</Label>
              <Input
                id="buyLink"
                value={formData.buyLink}
                onChange={(e) => setFormData(prev => ({ ...prev, buyLink: e.target.value }))}
                placeholder="https://..."
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="styleTags" className="text-base font-medium font-josefin">Style Tags</Label>
              <Input
                id="styleTags"
                value={formData.styleTags}
                onChange={(e) => setFormData(prev => ({ ...prev, styleTags: e.target.value }))}
                placeholder="casual, summer, elegant..."
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
          </>
        );
      
      case 'Useful Apps':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-base font-medium font-josefin">Platform</Label>
              <Select value={formData.platform} onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}>
                <SelectTrigger className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ios">iOS</SelectItem>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="all">All Platforms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="appCategory" className="text-base font-medium font-josefin">Category</Label>
              <Select value={formData.appCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, appCategory: value }))}>
                <SelectTrigger className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="health">Health & Fitness</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-base font-medium font-josefin">Price</Label>
              <Select value={formData.price} onValueChange={(value) => setFormData(prev => ({ ...prev, price: value }))}>
                <SelectTrigger className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin">
                  <SelectValue placeholder="Select price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case 'Tutorials':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="skillLevel" className="text-base font-medium font-josefin">Skill Level</Label>
              <Select value={formData.skillLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, skillLevel: value }))}>
                <SelectTrigger className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin">
                  <SelectValue placeholder="Select skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case 'Sports':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="sportType" className="text-base font-medium font-josefin">Sport Type</Label>
              <Input
                id="sportType"
                value={formData.sportType}
                onChange={(e) => setFormData(prev => ({ ...prev, sportType: e.target.value }))}
                placeholder="Tennis, Football, Yoga..."
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-base font-medium font-josefin">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="1 hour, 2 hours..."
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entryFee" className="text-base font-medium font-josefin">Entry Fee</Label>
              <Input
                id="entryFee"
                value={formData.entryFee}
                onChange={(e) => setFormData(prev => ({ ...prev, entryFee: e.target.value }))}
                placeholder="Free, $20, $50..."
                className="h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
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

  // Handle paste text import
  if (importType === 'paste' && !pasteText) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50">
        <div className="absolute inset-x-0 bottom-0 bg-background rounded-t-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground font-josefin tracking-wide">Paste Content</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-6 space-y-4">
            <Label htmlFor="pasteText" className="text-base font-medium font-josefin">
              Paste your content here
            </Label>
            <Textarea
              id="pasteText"
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste TikTok description, Instagram caption, or any content link..."
              rows={6}
              className="text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
            />
            <Button 
              onClick={() => analyzeContent(pasteText)}
              disabled={!pasteText || isAnalyzing}
              className="w-full h-12 bg-[#a8a5d0] hover:bg-[#9895c7] rounded-2xl font-josefin font-medium"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Content'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute inset-x-0 bottom-0 bg-background rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground font-josefin tracking-wide">
            {importType === 'browser' ? 'Import from Browser' :
             importType === 'camera' ? 'Import from Camera' :
             importType === 'paste' ? 'Import from Text' :
             'Save Inspiration'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Category Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium font-josefin">Content Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {categories.slice(0, 6).map((category) => (
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
            <div className="grid grid-cols-2 gap-3">
              {categories.slice(6).map((category) => (
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

          {/* Category-specific fields */}
          {renderCategorySpecificFields()}

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
