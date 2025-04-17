
import React from 'react';
import { Button } from '@/components/ui/button';

interface InstructionsProps {
  onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-4 dark:text-gray-100">How to Play</h2>
      
      <ol className="space-y-3 text-gray-700 dark:text-gray-300 mb-6 list-decimal pl-5">
        <li>
          <strong>Goal:</strong> Arrange the cups to match the hidden target order.
        </li>
        <li>
          <strong>Gameplay:</strong> Drag and swap cups to rearrange them.
        </li>
        <li>
          <strong>Guessing:</strong> Submit your guess by tapping "Check Order."
        </li>
        <li>
          <strong>Feedback:</strong> You'll see how many cups are in the correct position.
        </li>
        <li>
          <strong>Keep trying:</strong> Use the feedback to improve your next guess.
        </li>
        <li>
          <strong>Win:</strong> Match all cups to their correct positions!
        </li>
      </ol>
      
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-12 bg-red-500 rounded-t-xl"></div>
          <div className="w-10 h-1 bg-gray-200 dark:bg-gray-600 rounded-b-lg"></div>
          <span className="text-xs mt-1 dark:text-gray-300">Cup 1</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-12 bg-blue-500 rounded-t-xl"></div>
          <div className="w-10 h-1 bg-gray-200 dark:bg-gray-600 rounded-b-lg"></div>
          <span className="text-xs mt-1 dark:text-gray-300">Cup 2</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-12 bg-green-500 rounded-t-xl"></div>
          <div className="w-10 h-1 bg-gray-200 dark:bg-gray-600 rounded-b-lg"></div>
          <span className="text-xs mt-1 dark:text-gray-300">Cup 3</span>
        </div>
      </div>
      
      <div className="text-center text-sm mb-5 dark:text-gray-400">
        Each cup has both a color and number for accessibility.
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg dark:bg-green-700 dark:hover:bg-green-800"
        >
          Got It!
        </Button>
      </div>
    </div>
  );
};

export default Instructions;
