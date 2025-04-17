
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider";

interface DifficultySelectorProps {
  difficulty: number;
  setDifficulty: (value: number) => void;
  onStart: () => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  difficulty, 
  setDifficulty, 
  onStart 
}) => {
  const handleSliderChange = (value: number[]) => {
    setDifficulty(value[0]);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-4 dark:text-gray-100">Difficulty Settings</h2>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium dark:text-gray-300">Number of Cups:</span>
          <span className="font-bold text-lg dark:text-gray-100">{difficulty}</span>
        </div>
        
        <Slider 
          defaultValue={[difficulty]} 
          min={4} 
          max={8} 
          step={1} 
          onValueChange={handleSliderChange}
          className="my-4"
        />
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Easy</span>
          <span>Medium</span>
          <span>Hard</span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 px-8 py-2 rounded-lg font-medium"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default DifficultySelector;
