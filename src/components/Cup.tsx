
import React from 'react';
import { Cup as CupType } from '@/utils/gameUtils';

interface CupProps {
  cup: CupType;
  isDragging?: boolean;
  onDragStart?: (cup: CupType) => void;
  onDragEnd?: () => void;
  index: number;
  revealed?: boolean;
}

const Cup: React.FC<CupProps> = ({ 
  cup, 
  isDragging, 
  onDragStart, 
  onDragEnd,
  index,
  revealed = false,
}) => {
  // Handle touch/mouse events for drag functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    onDragStart && onDragStart(cup);
  };

  const handleMouseDown = () => {
    onDragStart && onDragStart(cup);
  };

  return (
    <div 
      className={`relative select-none ${
        isDragging ? 'z-10 opacity-70 scale-105' : 'z-0'
      } transition-transform duration-200`}
      style={{ touchAction: 'none' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={onDragEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={onDragEnd}
    >
      <div
        className={`
          ${cup.color} w-10 h-20 md:w-20 md:h-24 
          rounded-t-3xl flex items-center justify-center 
          shadow-lg transform transition-all duration-300
          ${isDragging ? 'scale-110' : 'hover:scale-105'}
          cursor-grab active:cursor-grabbing
          dark:shadow-black/30
        `}
        aria-label={`Cup ${index + 1}, ${cup.colorName}`}
      >
        <span className="text-2xl font-bold text-white drop-shadow-lg">{cup.id + 1}</span>
      </div>
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-b-lg shadow-inner flex justify-center transition-colors duration-300">
        {revealed && (
          <div className="w-2 h-2 bg-white rounded-full -mt-1 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default Cup;
