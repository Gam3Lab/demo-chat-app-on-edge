import React from 'react';
import { Settings } from 'lucide-react';

export function ChatHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h1 className="font-semibold text-lg">AI Assistant</h1>
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Settings">
        <Settings className="h-6 w-6 text-gray-500" />
      </button>
    </header>
  );
}

export default ChatHeader;
