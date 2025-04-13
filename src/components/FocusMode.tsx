
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Clock, TreeDeciduous, TimerOff, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FocusModeProps {
  duration?: number; // Duration in minutes
  onComplete?: () => void;
}

const FocusMode: React.FC<FocusModeProps> = ({
  duration = 20,
  onComplete
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // Convert to seconds
  const [treesPlanted, setTreesPlanted] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      setIsActive(false);
      setTreesPlanted(prev => prev + 1);
      
      toast({
        title: "Focus Session Completed!",
        description: "Congratulations! You've planted a tree on our virtual playground.",
      });
      
      if (onComplete) {
        onComplete();
      }
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeRemaining, onComplete, toast]);
  
  const startFocusMode = () => {
    setTimeRemaining(duration * 60);
    setIsActive(true);
    setIsOpen(false);
    
    toast({
      title: "Focus Mode Activated",
      description: `Stay focused for ${duration} minutes. A tree will be planted when you complete this session.`,
    });
  };
  
  const endFocusMode = () => {
    setIsActive(false);
    
    toast({
      title: "Focus Mode Ended",
      description: "You've ended your focus session early.",
    });
  };
  
  // Format time as MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercentage = 100 - (timeRemaining / (duration * 60)) * 100;
  
  return (
    <>
      <Button 
        variant={isActive ? "default" : "outline"} 
        className={isActive ? "bg-green-600 hover:bg-green-700" : ""}
        onClick={() => isActive ? endFocusMode() : setIsOpen(true)}
      >
        {isActive ? (
          <>
            <Clock className="h-4 w-4 mr-2 animate-pulse" />
            {formatTime(timeRemaining)}
          </>
        ) : (
          <>
            <TimerOff className="h-4 w-4 mr-2" />
            Focus Mode
          </>
        )}
      </Button>
      
      {isActive && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50 w-72">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Focus Mode</h3>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={endFocusMode}>
              <TimerOff className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Time Remaining: {formatTime(timeRemaining)}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>
      )}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Focus Mode</DialogTitle>
            <DialogDescription>
              Focus mode helps you concentrate by eliminating distractions. Complete a session to plant a virtual tree!
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{duration}</div>
                <div className="text-sm text-gray-500">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{treesPlanted}</div>
                <div className="text-sm text-gray-500">Trees Planted</div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <div className="flex items-start">
                <TreeDeciduous className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-green-800">Plant a Tree</h4>
                  <p className="text-sm text-green-700">
                    For every completed focus session, we'll plant a virtual tree in our community playground.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={startFocusMode}>Start {duration}-Minute Focus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FocusMode;
