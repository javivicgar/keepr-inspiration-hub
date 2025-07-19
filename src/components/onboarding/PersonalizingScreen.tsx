import React, { useEffect, useState } from 'react';

export const PersonalizingScreen = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#a8a5d0] to-[#9895c7] flex items-center justify-center">
      <div className="text-center">
        {/* Meta balls loading animation */}
        <div className="mb-8 flex justify-center items-center space-x-2">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-4 h-4 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-4 h-4 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="w-4 h-4 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></div>
          <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
        </div>
        
        <p className="text-white text-xl font-josefin">
          Setting up your profile{dots}
        </p>
      </div>
    </div>
  );
};