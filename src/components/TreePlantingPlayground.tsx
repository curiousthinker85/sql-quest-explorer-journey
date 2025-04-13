
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TreeDeciduous, Award, Flower2, CloudSun } from 'lucide-react';

interface TreePlantingPlaygroundProps {
  treesPlanted: number;
}

const TreePlantingPlayground: React.FC<TreePlantingPlaygroundProps> = ({
  treesPlanted = 0
}) => {
  // Achievement levels
  const achievements = [
    { count: 1, title: "Seedling", description: "Planted your first tree!" },
    { count: 5, title: "Gardener", description: "You're starting to make an impact." },
    { count: 10, title: "Forester", description: "Building a small forest of knowledge." },
    { count: 25, title: "Conservationist", description: "You're making a real difference!" },
    { count: 50, title: "Environmental Hero", description: "Your SQL forest is thriving!" }
  ];
  
  // Find current achievement level
  const currentAchievement = achievements.filter(a => treesPlanted >= a.count).pop();
  
  // Find next achievement
  const nextAchievement = achievements.find(a => treesPlanted < a.count);
  
  // Calculate progress to next achievement
  const getProgressToNext = () => {
    if (!nextAchievement) return 100;
    const prevCount = currentAchievement ? currentAchievement.count : 0;
    const totalNeeded = nextAchievement.count - prevCount;
    const progress = treesPlanted - prevCount;
    return Math.round((progress / totalNeeded) * 100);
  };
  
  const progressToNext = getProgressToNext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TreeDeciduous className="h-5 w-5 mr-2 text-green-600" />
          Your Virtual Forest
        </CardTitle>
        <CardDescription>
          Complete focus sessions to plant trees in our community playground
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40 bg-green-50 rounded-full flex items-center justify-center overflow-hidden">
            <div className="z-10 flex flex-col items-center">
              <span className="text-4xl font-bold text-green-700">{treesPlanted}</span>
              <span className="text-green-600 font-medium">Trees Planted</span>
            </div>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-green-200" 
              style={{ height: `${Math.min(treesPlanted * 4, 100)}%`, transition: 'height 1s ease-out' }}
            />
          </div>
        </div>
        
        {currentAchievement && (
          <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="font-medium text-amber-800">Current Achievement: {currentAchievement.title}</h3>
            </div>
            <p className="text-sm text-amber-700">{currentAchievement.description}</p>
          </div>
        )}
        
        {nextAchievement && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-medium text-blue-800">Next Achievement: {nextAchievement.title}</h3>
            </div>
            <p className="text-sm text-blue-700">{nextAchievement.description}</p>
            <div className="mt-2">
              <div className="text-xs text-blue-700 mb-1">
                {treesPlanted}/{nextAchievement.count} trees needed ({progressToNext}%)
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          {Array.from({ length: Math.min(treesPlanted, 12) }).map((_, i) => (
            <div key={i} className="aspect-square bg-green-100 rounded-md flex items-center justify-center">
              {i % 3 === 0 ? (
                <TreeDeciduous className="h-6 w-6 text-green-600" />
              ) : i % 3 === 1 ? (
                <Flower2 className="h-6 w-6 text-pink-500" />
              ) : (
                <CloudSun className="h-6 w-6 text-blue-500" />
              )}
            </div>
          ))}
        </div>
        
        {treesPlanted > 12 && (
          <div className="text-center text-sm text-gray-500 mt-2">
            + {treesPlanted - 12} more trees in your forest
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TreePlantingPlayground;
