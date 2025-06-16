
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Cup from './Cup';
import { 
  Cup as CupType, 
  checkCorrectPositions 
} from '@/utils/gameUtils';
import { useToast } from "@/components/ui/use-toast";

interface GameBoardProps {
  userCups: CupType[];
  targetCups: CupType[];
  onUpdateCups: (cups: CupType[]) => void;
  onReset: () => void;
  attempts: number;
  setAttempts: (value: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  userCups, 
  targetCups, 
  onUpdateCups,
  onReset,
  attempts,
  setAttempts
}) => {
  const [draggedCup, setDraggedCup] = useState<CupType | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState<number | null>(null);
  const [showTargetOrder, setShowTargetOrder] = useState(false);
  const { toast } = useToast();

  const handleDragStart = (cup: CupType) => {
    setDraggedCup(cup);
  };

  const handleDragEnd = () => {
    setDraggedCup(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (index: number) => {
    if (draggedCup && draggedCup.position !== index) {
      setDragOverIndex(index);
      
      // Swap cups
      const newCups = [...userCups];
      const draggedIndex = newCups.findIndex(cup => cup.id === draggedCup.id);
      const temp = { ...newCups[draggedIndex] };
      
      // Update positions
      newCups[draggedIndex] = { ...newCups[index], position: draggedIndex };
      newCups[index] = { ...temp, position: index };
      
      onUpdateCups(newCups);
    }
  };

  const handleCheckOrder = () => {
    const correct = checkCorrectPositions(userCups, targetCups);
    setCorrectCount(correct);
    setAttempts(attempts + 1);
    
    if (correct === targetCups.length) {
      toast({
        title: "Congratulations!",
        description: `You solved it in ${attempts + 1} attempts!`,
        duration: 5000,
      });
      setShowTargetOrder(true);
    } else {
      toast({
        title: "Keep trying!",
        description: `${correct} out of ${targetCups.length} cups in correct position`,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    // Handle touch move events for better mobile experience
    const handleTouchMove = (e: TouchEvent) => {
      if (!draggedCup) return;
      
      const touch = e.touches[0];
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
      
      for (const element of elements) {
        const cupElement = element.closest("[data-cup-index]");
        if (cupElement) {
          const index = parseInt(cupElement.getAttribute("data-cup-index") || "-1");
          if (index >= 0) {
            handleDragOver(index);
            break;
          }
        }
      }
    };

    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [draggedCup, userCups]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Game Info */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm font-medium">
          <p>Attempts: <span className="font-bold">{attempts}</span></p>
          {correctCount !== null && (
            <p>Correct: <span className="font-bold">{correctCount}/{targetCups.length}</span></p>
          )}
        </div>
        <Button 
          variant="outline" 
          onClick={onReset}
          className="text-sm"
        >
          New Game
        </Button>
      </div>

      {/* User Cups */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Your Arrangement:</h2>
        <div className="flex justify-center gap-2 py-5 px-1 rounded-lg">
          {userCups.map((cup, index) => (
            <div 
              key={cup.id} 
              data-cup-index={index}
              onTouchMove={() => handleDragOver(index)}
              onMouseOver={() => draggedCup && handleDragOver(index)}
              className="transition-transform duration-200"
            >
              <Cup 
                cup={cup} 
                index={cup.id}
                isDragging={draggedCup?.id === cup.id}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Check Button */}
      <div className="mb-8 flex justify-center">
        <Button 
          onClick={handleCheckOrder}
          className="bg-green-600 hover:bg-green-700 py-6 px-6 text-lg"
          disabled={showTargetOrder}
        >
          Check Order
        </Button>
      </div>

      {/* Target Cups (shown after winning) */}
      {showTargetOrder && (
        <div className="mt-8 animate-fade-in">
          <h2 className="text-lg font-bold mb-2">Target Order:</h2>
          <div className="flex justify-center gap-2 py-5 px-1 rounded-lg">
            {targetCups.map((cup, index) => (
              <div key={cup.id}>
                <Cup 
                  cup={cup} 
                  index={cup.id}
                  revealed={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
