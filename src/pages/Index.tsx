
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SplashScreen } from '@/components/SplashScreen';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ImprovedSaveModal } from '@/components/ImprovedSaveModal';
import { ImprovedContentGrid } from '@/components/ImprovedContentGrid';
import { FilterBar } from '@/components/FilterBar';
import { FoldersView } from '@/components/views/FoldersView';
import { MapView } from '@/components/views/MapView';
import { MoreView } from '@/components/views/MoreView';

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
  const [showSplash, setShowSplash] = useState(true);
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
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

  const handleFolderClick = (folder: string) => {
    setSelectedFolder(folder);
    setActiveTab('home');
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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const renderStatusBar = () => {
    if (savedContent.length === 0) return null;
    
    const locationContent = savedContent.filter(item => item.location);
    const statusMessages = [];
    
    if (locationContent.length > 0) {
      statusMessages.push(`${locationContent.length} places to explore`);
    }
    if (folders.length > 0) {
      statusMessages.push(`${folders.length} folders`);
    }
    
    return statusMessages.length > 0 ? (
      <div className="bg-[#a8a5d0]/10 rounded-xl p-3 mb-4">
        <p className="text-sm text-center font-medium text-[#a8a5d0]">
          ✨ {statusMessages.join(' • ')}
        </p>
      </div>
    ) : null;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'folders':
        return <FoldersView content={savedContent} onFolderClick={handleFolderClick} />;
      case 'map':
        return <MapView content={savedContent} />;
      case 'more':
        return <MoreView totalContent={savedContent.length} totalFolders={folders.length} />;
      default: // home
        return (
          <>
            {renderStatusBar()}
            
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10 h-12 text-base rounded-2xl"
                  placeholder="Search your inspiration..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <FilterBar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedFolder={selectedFolder}
                onFolderChange={setSelectedFolder}
                folders={folders}
                searchQuery=""
                onSearchChange={() => {}}
              />
            </div>

            <ImprovedContentGrid content={filteredContent} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {activeTab === 'home' ? 'Your Inspiration' :
             activeTab === 'folders' ? 'Folders' :
             activeTab === 'map' ? 'Map' : 'More'}
          </h1>
          {activeTab === 'home' && (
            <p className="text-sm text-muted-foreground">
              {savedContent.length} saved {savedContent.length === 1 ? 'item' : 'items'}
            </p>
          )}
        </header>

        <main>
          {renderContent()}
        </main>

        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddClick={() => setIsModalOpen(true)}
        />

        <ImprovedSaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveContent}
        />
      </div>
    </div>
  );
};

export default Index;
