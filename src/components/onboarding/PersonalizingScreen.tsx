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
    <div className="fixed inset-0 bg-gradient-to-b from-[#a8a5d0] to-[#9895c7] flex items-center justify-center z-50">
      <div className="text-center animate-fade-in">
        {/* Meta balls loading animation */}
        <div className="mb-8 flex justify-center items-center space-x-3">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s', animationDuration: '1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1s' }}></div>
        </div>
        
        <p className="text-white text-xl font-josefin">
          Setting up your profile{dots}
        </p>
      </div>
    </div>
  );
};