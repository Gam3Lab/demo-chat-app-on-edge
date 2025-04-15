import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface MessageItemProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

function formatMessageContent(content: string) {
  // Replace code blocks with styled version
  return content
    .split(/```([^`]+)```/g)
    .map((part, i) => {
      if (i % 2 === 1) {
        // This is a code block
        return (
          <pre key={i} className="bg-gray-200 p-2 rounded block text-sm my-2 overflow-x-auto">
            <code>{part}</code>
          </pre>
        );
      }
      // Handle inline code and line breaks in regular text
      return (
        <span key={i}>
          {part.split(/`([^`]+)`/g).map((fragment, j) => {
            if (j % 2 === 1) {
              return (
                <code key={j} className="bg-gray-200 px-1 py-0.5 rounded text-sm">
                  {fragment}
                </code>
              );
            }
            return fragment.split('\n').map((line, k) => (
              <React.Fragment key={k}>
                {k > 0 && <br />}
                {line}
              </React.Fragment>
            ));
          })}
        </span>
      );
    });
}

export function MessageItem({ content, role, timestamp }: MessageItemProps) {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit',
    minute: '2-digit'
  });
  
  if (role === 'user') {
    return (
      <div className="flex items-start justify-end mb-4">
        <div className="mr-3 bg-primary text-white p-3 rounded-lg rounded-tr-none max-w-[80%]">
          <div>{formatMessageContent(content)}</div>
          <span className="text-xs text-white/70 mt-1 block">{formattedTime}</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start mb-4">
      <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div className="ml-3 bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
        <div>{formatMessageContent(content)}</div>
        <span className="text-xs text-gray-500 mt-1 block">{formattedTime}</span>
      </div>
    </div>
  );
}

export default MessageItem;
