import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/time-picker";
import { Play, Pause, RotateCcw, History, Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface TimerControlsProps {
  isRunning: boolean;
  remainingSeconds: number;
  endTimeString: string;
  recentTimes: string[];
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSetPresetTime: (minutes: number) => void;
  onUpdateEndTime: (timeString: string) => void;
}

export function TimerControls({
  isRunning,
  remainingSeconds,
  endTimeString,
  recentTimes,
  onToggleTimer,
  onResetTimer,
  onSetPresetTime,
  onUpdateEndTime
}: TimerControlsProps) {
  const [showRecentTimes, setShowRecentTimes] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-foreground">Set End Time</h2>
        <div className="text-sm text-foreground opacity-70">1 hour maximum</div>
      </div>
      
      {/* Time input control with recent times dropdown */}
      <div className="relative">
        <TimePicker
          value={endTimeString}
          onChange={onUpdateEndTime}
          description="School Start"
        />
        
        {/* Recent times toggle button - only show if we have recent times */}
        {recentTimes.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="absolute right-0 top-0 h-full rounded-l-none"
            onClick={() => setShowRecentTimes(!showRecentTimes)}
            aria-label="Show recent times"
          >
            <History className="h-4 w-4" />
          </Button>
        )}
        
        {/* Recent times dropdown */}
        {showRecentTimes && recentTimes.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
            <div className="py-1 text-sm font-medium text-gray-700 px-3 border-b">
              Recent Times
            </div>
            <div className="py-1">
              {recentTimes.map((time, index) => (
                <button
                  key={index}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
                  onClick={() => {
                    onUpdateEndTime(time);
                    setShowRecentTimes(false);
                  }}
                >
                  <Clock className="h-3 w-3 mr-2 text-pink-500" />
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Quick preset buttons */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-4">
        <Button
          variant="secondary"
          className="py-2 md:py-3 px-4 text-foreground font-semibold text-sm md:text-base lg:text-lg"
          style={{ backgroundColor: "hsl(54, 100%, 60%)" }}
          onClick={() => onSetPresetTime(15)}
        >
          15 min
        </Button>
        <Button
          variant="secondary"
          className="py-2 md:py-3 px-4 text-foreground font-semibold text-sm md:text-base lg:text-lg"
          style={{ backgroundColor: "hsl(54, 100%, 60%)" }}
          onClick={() => onSetPresetTime(30)}
        >
          30 min
        </Button>
        <Button
          variant="secondary"
          className="py-2 md:py-3 px-4 text-foreground font-semibold text-sm md:text-base lg:text-lg"
          style={{ backgroundColor: "hsl(54, 100%, 60%)" }}
          onClick={() => onSetPresetTime(45)}
        >
          45 min
        </Button>
      </div>
      
      {/* Primary control buttons */}
      <div className="flex gap-4">
        <Button
          className="flex-1 py-6 rounded-xl font-bold text-lg h-auto text-white hover:bg-[hsl(95,55%,45%)]"
          style={{ backgroundColor: "hsl(95, 55%, 55%)" }}
          onClick={onToggleTimer}
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-5 w-5" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" /> Start
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          className="w-14 py-6 bg-muted text-foreground rounded-xl font-bold text-lg h-auto hover:bg-gray-200"
          onClick={onResetTimer}
          aria-label="Reset timer"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}


