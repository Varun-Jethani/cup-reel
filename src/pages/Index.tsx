
import React, { useState, useEffect } from 'react';
import DifficultySelector from '@/components/DifficultySelector';
import GameBoard from '@/components/GameBoard';
import Instructions from '@/components/Instructions';
import ThemeToggle from '@/components/ThemeToggle';
import { 
  generateCups, 
  generateTargetOrder, 
  shuffleCups,
  Cup
} from '@/utils/gameUtils';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

const Index = () => {
  const [difficulty, setDifficulty] = useState(4);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [userCups, setUserCups] = useState<Cup[]>([]);
  const [targetCups, setTargetCups] = useState<Cup[]>([]);
  const [attempts, setAttempts] = useState(0);

  const startGame = () => {
    const cups = generateCups(difficulty);
    const targets = generateTargetOrder(cups);
    const shuffled = shuffleCups([...cups]);
    
    setUserCups(shuffled);
    setTargetCups(targets);
    setAttempts(0);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  useEffect(() => {
    // Show instructions on first visit
    const hasSeenInstructions = localStorage.getItem('hasSeenInstructions');
    if (!hasSeenInstructions) {
      setShowInstructions(true);
      localStorage.setItem('hasSeenInstructions', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-slate-900 dark:to-blue-950 px-4 py-6 sm:px-6 transition-colors duration-300">
      <header className="text-center mb-8 relative">
        <div className="absolute right-2 top-0">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-2">Cup Shuffle</h1>
        <p className="text-gray-600 dark:text-gray-300">Arrange the cups to match the hidden order</p>
      </header>

      <main className="max-w-md mx-auto">
        {!gameStarted ? (
          <DifficultySelector 
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            onStart={startGame}
          />
        ) : (
          <GameBoard 
            userCups={userCups}
            targetCups={targetCups}
            onUpdateCups={setUserCups}
            onReset={resetGame}
            attempts={attempts}
            setAttempts={setAttempts}
          />
        )}

        {/* Help Button */}
        <div className="mt-6 text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowInstructions(true)}
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300"
          >
            <HelpCircle size={18} className="mr-1" />
            How to play
          </Button>
        </div>
      </main>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Instructions onClose={() => setShowInstructions(false)} />
        </div>
      )}
    </div>
  );
};

export default Index;
