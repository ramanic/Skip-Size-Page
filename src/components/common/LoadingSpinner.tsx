
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-400 rounded-full animate-ping"></div>
      </div>
      <span className="ml-4 text-gray-300 text-lg animate-pulse">Loading skips...</span>
    </div>
  );
};

export default LoadingSpinner;
