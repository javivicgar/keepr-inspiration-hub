import React, { useState, useEffect } from 'react';
import { AuthScreen } from '@/components/AuthScreen';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { PersonalizingScreen } from '@/components/onboarding/PersonalizingScreen';
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
import { AddOptionsModal } from '@/components/AddOptionsModal';
import { ProfileModal } from '@/components/ProfileModal';
import { SavedContent } from '@/types/SavedContent';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showPersonalizing, setShowPersonalizing] = useState(false);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
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

  // Remove splash screen - load directly to auth

  useEffect(() => {
    const mockContent: SavedContent[] = [];
    
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

  const handleOnboardingComplete = (preferences: string[], selectedUsername: string) => {
    setUserPreferences(preferences);
    setUsername(selectedUsername);
    setHasCompletedOnboarding(true);
  };

  const handleStartPersonalizing = () => {
    setShowPersonalizing(true);
    
    // Show personalizing for 5 seconds, then complete onboarding
    setTimeout(() => {
      setShowPersonalizing(false);
      setHasCompletedOnboarding(true);
    }, 5000);
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

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticate={handleAuthentication} />;
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} onStartPersonalizing={handleStartPersonalizing} />;
  }

  if (showPersonalizing) {
    return <PersonalizingScreen />;
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
      {(activeTab === 'home' || activeTab === 'map' || activeTab === 'community' || activeTab === 'more') && (
        <Header 
          onCreateKeepr={() => setShowSaveModal(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          username={username}
          onProfileClick={() => setShowProfileModal(true)}
        />
      )}
      
      <main className="container mx-auto px-4 pt-16">
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
                userPreferences={userPreferences}
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
        
        {activeTab === 'map' && (
          <div className="relative -mt-16">
            <MapView content={content} />
          </div>
        )}
        {activeTab === 'community' && (
          <div className="py-4">
            <CommunityView />
          </div>
        )}
        {activeTab === 'more' && (
          <div className="py-4">
            <MoreView 
              totalContent={content.length} 
              totalFolders={Array.from(new Set(content.map(item => item.folder))).length}
              userPreferences={userPreferences}
              onPreferencesUpdate={setUserPreferences}
            />
          </div>
        )}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => setShowAddOptions(true)} />

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

      {showAddOptions && (
        <AddOptionsModal
          isOpen={showAddOptions}
          onClose={() => setShowAddOptions(false)}
          onOptionSelect={() => setShowSaveModal(true)}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          username={username}
          onUsernameUpdate={setUsername}
        />
      )}
    </div>
  );
};

export default Index;
