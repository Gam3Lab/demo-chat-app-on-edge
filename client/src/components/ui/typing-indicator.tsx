import React from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TypingIndicator({ className, ...props }: TypingIndicatorProps) {
  return (
    <div className={cn('inline-flex', className)} {...props}>
      <span className="animate-[blink_1.5s_infinite] h-[7px] w-[7px] mx-[2px] bg-primary rounded-full inline-block" style={{ animationDelay: "0s" }}></span>
      <span className="animate-[blink_1.5s_infinite] h-[7px] w-[7px] mx-[2px] bg-primary rounded-full inline-block" style={{ animationDelay: "0.2s" }}></span>
      <span className="animate-[blink_1.5s_infinite] h-[7px] w-[7px] mx-[2px] bg-primary rounded-full inline-block" style={{ animationDelay: "0.4s" }}></span>
    </div>
  );
}

export default TypingIndicator;
