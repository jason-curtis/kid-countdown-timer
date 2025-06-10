import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/time-picker";
import { History, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface TimerControlsProps {
  remainingSeconds: number;
  endTimeString: string;
  recentTimes: string[];
  timerPurpose: string;
  onSetPresetTime: (minutes: number) => void;
  onUpdateEndTime: (timeString: string) => void;
}

export function TimerControls({
  remainingSeconds,
  endTimeString,
  recentTimes,
  timerPurpose,
  onSetPresetTime,
  onUpdateEndTime
}: TimerControlsProps) {
  const [showRecentTimes, setShowRecentTimes] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10">
      <div className="flex justify-between items-center mb-2 md:mb-3 lg:mb-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Set End Time</h2>
        <div className="text-sm md:text-base lg:text-lg text-foreground opacity-70">1 hour maximum</div>
      </div>

      {/* Time input control with recent times dropdown */}
      <div className="relative">
        <TimePicker
          value={endTimeString}
          onChange={onUpdateEndTime}
          description={`${timerPurpose.charAt(0).toUpperCase() + timerPurpose.slice(1)} Start`}
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
          className="py-2 md:py-3 px-4 text-foreground font-semibold text-sm md:text-base lg:text-lg bg-secondary hover:bg-secondary/80"
          onClick={() => onSetPresetTime(5)}
        >
          5 min
        </Button>
        <Button
          variant="secondary"
          className="py-2 md:py-3 px-4 text-foreground font-semibold text-sm md:text-base lg:text-lg bg-secondary hover:bg-secondary/80"
          onClick={() => onSetPresetTime(10)}
        >
          10 min
        </Button>
        <Button
          variant="secondary"
          className="py-2 md:py-3 px-4 text-foreground font-semibold text-sm md:text-base lg:text-lg bg-secondary hover:bg-secondary/80"
          onClick={() => onSetPresetTime(60)}
        >
          1 hr
        </Button>
      </div>
    </div>
  );
}


