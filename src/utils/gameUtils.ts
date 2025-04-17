
// Define cup colors with corresponding hex values
export const cupColors = [
  { color: "bg-red-500", name: "Red" },
  { color: "bg-blue-500", name: "Blue" },
  { color: "bg-green-500", name: "Green" },
  { color: "bg-yellow-500", name: "Yellow" },
  { color: "bg-purple-500", name: "Purple" },
  { color: "bg-orange-500", name: "Orange" },
  { color: "bg-pink-500", name: "Pink" },
  { color: "bg-teal-500", name: "Teal" }
];

// Cup interface defining properties for each cup
export interface Cup {
  id: number;
  color: string;
  colorName: string;
  position: number;
}

// Generate cups based on difficulty level
export function generateCups(difficulty: number): Cup[] {
  // Make sure difficulty is at least 4
  const count = Math.max(4, difficulty);
  
  const cups: Cup[] = [];
  for (let i = 0; i < count; i++) {
    cups.push({
      id: i,
      color: cupColors[i % cupColors.length].color,
      colorName: cupColors[i % cupColors.length].name,
      position: i
    });
  }
  
  return cups;
}

// Generate target order (hidden order)
export function generateTargetOrder(cups: Cup[]): Cup[] {
  const shuffled = [...cups];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

// Check how many cups are in the correct position
export function checkCorrectPositions(userOrder: Cup[], targetOrder: Cup[]): number {
  return userOrder.filter((cup, index) => cup.id === targetOrder[index].id).length;
}

// Shuffle cups for initial display
export function shuffleCups(cups: Cup[]): Cup[] {
  const shuffled = [...cups];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    // Update position property to reflect new order
    shuffled[i].position = i;
    shuffled[j].position = j;
  }
  
  return shuffled;
}
