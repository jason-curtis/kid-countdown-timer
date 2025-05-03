import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/time-picker";
import { Play, Pause, RotateCcw } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { motion } from "framer-motion";

interface TimerControlsProps {
  isRunning: boolean;
  remainingSeconds: number;
  endTimeString: string;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSetPresetTime: (minutes: number) => void;
  onUpdateEndTime: (timeString: string) => void;
}

export function TimerControls({
  isRunning,
  remainingSeconds,
  endTimeString,
  onToggleTimer,
  onResetTimer,
  onSetPresetTime,
  onUpdateEndTime
}: TimerControlsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-foreground">Set End Time</h2>
        <div className="text-sm text-foreground opacity-70">1 hour maximum</div>
      </div>
      
      {/* Time input control */}
      <TimePicker
        value={endTimeString}
        onChange={onUpdateEndTime}
        description="School Start"
      />
      
      {/* Quick preset buttons */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="secondary"
          className="py-2 px-4 text-foreground font-semibold"
          style={{ backgroundColor: "hsl(54, 100%, 60%)" }}
          onClick={() => onSetPresetTime(15)}
        >
          15 min
        </Button>
        <Button
          variant="secondary"
          className="py-2 px-4 text-foreground font-semibold"
          style={{ backgroundColor: "hsl(54, 100%, 60%)" }}
          onClick={() => onSetPresetTime(30)}
        >
          30 min
        </Button>
        <Button
          variant="secondary"
          className="py-2 px-4 text-foreground font-semibold"
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


