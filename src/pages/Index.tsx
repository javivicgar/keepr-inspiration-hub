
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SaveContentModal } from '@/components/SaveContentModal';
import { ContentGrid } from '@/components/ContentGrid';
import { FilterBar } from '@/components/FilterBar';
import { Header } from '@/components/Header';

export interface SavedContent {
  id: string;
  title: string;
  creatorName: string;
  link: string;
  category: 'Food Spot' | 'Travel Spot' | 'Outfit' | 'Useful App';
  location?: string;
  mapLink?: string;
  note: string;
  tags: string[];
  folder: string;
  createdAt: Date;
}

const Index = () => {
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSaveContent = (content: Omit<SavedContent, 'id' | 'createdAt'>) => {
    const newContent: SavedContent = {
      ...content,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setSavedContent(prev => [newContent, ...prev]);
    setIsModalOpen(false);
  };

  const filteredContent = savedContent.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.creatorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesFolder && matchesSearch;
  });

  const folders = Array.from(new Set(savedContent.map(item => item.folder)));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your Inspiration</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {savedContent.length} saved {savedContent.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-12 h-12 p-0"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedFolder={selectedFolder}
          onFolderChange={setSelectedFolder}
          folders={folders}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <ContentGrid content={filteredContent} />

        <SaveContentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveContent}
        />
      </main>
    </div>
  );
};

export default Index;
