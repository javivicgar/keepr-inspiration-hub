import React, { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { AuthScreen } from '@/components/AuthScreen';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ImprovedContentGrid } from '@/components/ImprovedContentGrid';
import { FoldersView } from '@/components/views/FoldersView';
import { FolderContentView } from '@/components/FolderContentView';
import { KeeprDetailView } from '@/components/KeeprDetailView';
import { MapView } from '@/components/views/MapView';
import { CommunityView } from '@/components/views/CommunityView';
import { MoreView } from '@/components/views/MoreView';
import { SaveContentModal } from '@/components/SaveContentModal';
import { FilterBar } from '@/components/FilterBar';
import { SortModal } from '@/components/SortModal';
import { SavedContent } from '@/types/SavedContent';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [content, setContent] = useState<SavedContent[]>([]);
  const [filteredContent, setFilteredContent] = useState<SavedContent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFolder, setSelectedFolder] = useState('All Folders');
  const [showSortModal, setShowSortModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // New state for navigation
  const [currentView, setCurrentView] = useState<'home' | 'folder-content' | 'keepr-detail'>('home');
  const [selectedFolderName, setSelectedFolderName] = useState<string>('');
  const [selectedKeepr, setSelectedKeepr] = useState<SavedContent | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mockContent: SavedContent[] = [
      {
        id: '1',
        title: 'Basketball court in Röti',
        creatorName: 'sports_enthusiast',
        category: 'Sports',
        folder: 'Sport Courts',
        location: 'Röti, Switzerland',
        image: '',
        createdAt: new Date('2024-01-15'),
        googleMapsRating: 4.5
      },
      {
        id: '2',
        title: 'Basketball court in Enge',
        creatorName: 'city_explorer',
        category: 'Sports',
        folder: 'Sport Courts',
        location: 'Enge, Zurich',
        image: '',
        createdAt: new Date('2024-01-10'),
        googleMapsRating: 4.2
      },
      {
        id: '3',
        title: 'Amazing Pasta Place',
        creatorName: 'foodie_lover',
        category: 'Food Spots',
        folder: 'Italian Food',
        location: 'Rome, Italy',
        image: '',
        createdAt: new Date('2024-01-20')
      },
      {
        id: '4',
        title: 'Vintage Bookstore',
        creatorName: 'book_worm',
        category: 'Locations',
        folder: 'Bookstores',
        location: 'Paris, France',
        image: '',
        createdAt: new Date('2024-01-18')
      }
    ];
    
    setContent(mockContent);
    setFilteredContent(mockContent);
  }, []);

  useEffect(() => {
    let filtered = content;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedFolder !== 'All Folders') {
      filtered = filtered.filter(item => item.folder === selectedFolder);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sortedContent = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredContent(sortedContent);
  }, [content, selectedCategory, selectedFolder, searchQuery, sortBy]);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  const handleAddContent = (newContent: Omit<SavedContent, 'id' | 'createdAt'>) => {
    const contentWithId: SavedContent = {
      ...newContent,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setContent(prev => [contentWithId, ...prev]);
    setShowSaveModal(false);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setShowSortModal(false);
  };

  // New navigation handlers
  const handleFolderClick = (folderName: string) => {
    setSelectedFolderName(folderName);
    setCurrentView('folder-content');
  };

  const handleKeeprClick = (keepr: SavedContent) => {
    setSelectedKeepr(keepr);
    setCurrentView('keepr-detail');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedFolderName('');
    setSelectedKeepr(null);
  };

  const handleBackToFolder = () => {
    setCurrentView('folder-content');
    setSelectedKeepr(null);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticate={handleAuthentication} />;
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  const renderHomeContent = () => {
    if (currentView === 'keepr-detail' && selectedKeepr) {
      return (
        <KeeprDetailView 
          keepr={selectedKeepr} 
          onBack={selectedFolderName ? handleBackToFolder : handleBackToHome} 
        />
      );
    }

    if (currentView === 'folder-content' && selectedFolderName) {
      const folderContent = content.filter(item => item.folder === selectedFolderName);
      return (
        <FolderContentView
          folderName={selectedFolderName}
          content={folderContent}
          onBack={handleBackToHome}
          onKeeprClick={handleKeeprClick}
        />
      );
    }

    if (activeTab === 'folders') {
      return (
        <FoldersView 
          content={content} 
          onFolderClick={handleFolderClick}
        />
      );
    }

    // Show folders section in home if user has folders
    const folders = Array.from(new Set(content.map(item => item.folder)));
    if (folders.length > 0 && activeTab === 'home') {
      return (
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 font-josefin">Your Folders</h2>
            <div className="grid grid-cols-2 gap-3">
              {folders.map(folderName => {
                const folderContent = content.filter(item => item.folder === folderName);
                return (
                  <div
                    key={folderName}
                    onClick={() => handleFolderClick(folderName)}
                    className="p-4 bg-gradient-to-br from-[#a8a5d0]/10 to-[#9895c7]/20 rounded-2xl border-2 border-[#a8a5d0]/20 hover:border-[#a8a5d0]/40 transition-all cursor-pointer"
                  >
                    <div className="text-2xl mb-2">📁</div>
                    <h3 className="font-semibold text-sm font-josefin line-clamp-1">{folderName}</h3>
                    <p className="text-xs text-gray-600 font-josefin">
                      {folderContent.length} {folderContent.length === 1 ? 'Keepr' : 'Keeprs'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 font-josefin">All Keeprs</h2>
            <ImprovedContentGrid 
              content={filteredContent} 
              onCreateKeepr={() => setShowSaveModal(true)} 
            />
          </div>
        </div>
      );
    }

    return (
      <ImprovedContentGrid 
        content={filteredContent} 
        onCreateKeepr={() => setShowSaveModal(true)} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onCreateKeepr={() => setShowSaveModal(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="container mx-auto px-4 pt-20">
        {activeTab === 'home' && (
          <>
            {currentView === 'home' && (
              <FilterBar
                selectedCategory={selectedCategory}
                selectedFolder={selectedFolder}
                onCategoryChange={setSelectedCategory}
                onFolderChange={setSelectedFolder}
                onSortClick={() => setShowSortModal(true)}
                folders={Array.from(new Set(content.map(item => item.folder)))}
              />
            )}
            {renderHomeContent()}
          </>
        )}
        
        {activeTab === 'folders' && (
          <FoldersView 
            content={content} 
            onFolderClick={handleFolderClick}
          />
        )}
        
        {activeTab === 'map' && <MapView content={content} />}
        {activeTab === 'community' && <CommunityView />}
        {activeTab === 'more' && <MoreView />}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {showSaveModal && (
        <SaveContentModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          onSave={handleAddContent}
          existingFolders={Array.from(new Set(content.map(item => item.folder)))}
        />
      )}

      {showSortModal && (
        <SortModal
          isOpen={showSortModal}
          onClose={() => setShowSortModal(false)}
          currentSort={sortBy}
          onSortChange={handleSortChange}
        />
      )}
    </div>
  );
};

export default Index;
