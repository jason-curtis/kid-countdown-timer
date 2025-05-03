import { Card, CardContent } from "@/components/ui/card";
import { DonutChart } from "./donut-chart";
import { TimerControls } from "./timer-controls";
import { TimerDisplay } from "./timer-display";
import { SoundControls } from "./sound-controls";
import { motion } from "framer-motion";

interface TimerCardProps {
  isRunning: boolean;
  remainingSeconds: number;
  endTimeString: string;
  isSoundEnabled: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSetPresetTime: (minutes: number) => void;
  onUpdateEndTime: (timeString: string) => void;
  onToggleSound: () => void;
}

export function TimerCard({
  isRunning,
  remainingSeconds,
  endTimeString,
  isSoundEnabled,
  onToggleTimer,
  onResetTimer,
  onSetPresetTime,
  onUpdateEndTime,
  onToggleSound
}: TimerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <CardContent className="p-0 space-y-6">
          {/* Timer Display */}
          <div className="relative flex justify-center items-center mb-4">
            <DonutChart 
              remainingSeconds={remainingSeconds} 
              isRunning={isRunning} 
            />
            <TimerDisplay 
              remainingSeconds={remainingSeconds} 
              isRunning={isRunning} 
            />
          </div>
          
          {/* Timer Controls */}
          <TimerControls
            isRunning={isRunning}
            remainingSeconds={remainingSeconds}
            endTimeString={endTimeString}
            onToggleTimer={onToggleTimer}
            onResetTimer={onResetTimer}
            onSetPresetTime={onSetPresetTime}
            onUpdateEndTime={onUpdateEndTime}
          />
          
          {/* Sound Controls */}
          <SoundControls
            isSoundEnabled={isSoundEnabled}
            onToggleSound={onToggleSound}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
