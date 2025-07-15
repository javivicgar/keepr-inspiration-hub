import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthScreen } from '@/components/AuthScreen';
import { SplashScreen } from '@/components/SplashScreen';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ImprovedSaveModal } from '@/components/ImprovedSaveModal';
import { ImprovedContentGrid } from '@/components/ImprovedContentGrid';
import { FilterBar } from '@/components/FilterBar';
import { FoldersView } from '@/components/views/FoldersView';
import { MapView } from '@/components/views/MapView';
import { MoreView } from '@/components/views/MoreView';
import { CommunityView } from '@/components/views/CommunityView';
import { SortModal } from '@/components/SortModal';
import { AddOptionsModal } from '@/components/AddOptionsModal';
import { useToast } from '@/hooks/use-toast';
import type { SavedContent } from '@/types/SavedContent';

const Index = () => {
  const [showAuth, setShowAuth] = useState(true);
  const [showSplash, setShowSplash] = useState(false);
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddOptionsOpen, setIsAddOptionsOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [importType, setImportType] = useState<string>('');
  const { toast } = useToast();

  const handleAuthComplete = () => {
    setShowAuth(false);
    setShowSplash(true);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleSaveContent = (content: Omit<SavedContent, 'id' | 'createdAt'>) => {
    const newContent: SavedContent = {
      ...content,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setSavedContent(prev => [newContent, ...prev]);
    setIsModalOpen(false);
    
    // Show success toast
    toast({
      title: "✅ Saved successfully!",
      description: `Saved to '${content.folder}'`,
      duration: 3000,
    });
  };

  const handleFolderClick = (folder: string) => {
    setSelectedFolder(folder);
    setActiveTab('home');
  };

  const handleSortApply = (newSort: string) => {
    setSortBy(newSort);
  };

  const handleAddOptionsSelect = (option: string) => {
    setImportType(option);
    setIsModalOpen(true);
  };

  const sortedContent = [...savedContent].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const filteredContent = sortedContent.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.creatorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesFolder && matchesSearch;
  });

  const folders = Array.from(new Set(savedContent.map(item => item.folder)));

  if (showAuth) {
    return <AuthScreen onComplete={handleAuthComplete} />;
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
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
      <div className="bg-[#a8a5d0]/10 rounded-2xl p-4 mb-6 shadow-sm">
        <p className="text-sm text-center font-medium text-[#a8a5d0] font-josefin">
          ✨ {statusMessages.join(' • ')}
        </p>
      </div>
    ) : null;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'community':
        return <CommunityView />;
      case 'map':
        return <MapView content={savedContent} />;
      case 'more':
        return <MoreView totalContent={savedContent.length} totalFolders={folders.length} />;
      default: // home
        return (
          <>
            {renderStatusBar()}
            
            <div className="mb-6">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-12 h-12 text-base rounded-2xl border-2 focus:border-[#a8a5d0] font-josefin"
                  placeholder="Search your Keeprs..."
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
                onSortClick={() => setIsSortModalOpen(true)}
              />
            </div>

            <ImprovedContentGrid 
              content={filteredContent}
              onCreateKeepr={() => setIsAddOptionsOpen(true)}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-josefin tracking-wide">
            {activeTab === 'home' ? 'Your Keeprs' :
             activeTab === 'community' ? 'Community' :
             activeTab === 'map' ? 'Map' : 'More'}
          </h1>
          {activeTab === 'home' && (
            <p className="text-sm text-muted-foreground font-josefin">
              {savedContent.length} saved {savedContent.length === 1 ? 'Keepr' : 'Keeprs'}
            </p>
          )}
        </header>

        <main>
          {renderContent()}
        </main>

        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddClick={() => setIsAddOptionsOpen(true)}
        />

        <AddOptionsModal
          isOpen={isAddOptionsOpen}
          onClose={() => setIsAddOptionsOpen(false)}
          onOptionSelect={handleAddOptionsSelect}
        />

        <SortModal
          isOpen={isSortModalOpen}
          onClose={() => setIsSortModalOpen(false)}
          onApply={handleSortApply}
          currentSort={sortBy}
        />

        <ImprovedSaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveContent}
          importType={importType}
        />
      </div>
    </div>
  );
};

export default Index;
