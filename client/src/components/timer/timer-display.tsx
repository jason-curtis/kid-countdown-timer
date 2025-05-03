import { motion } from "framer-motion";
import { formatTime } from "@/lib/utils";

interface TimerDisplayProps {
  remainingSeconds: number;
  isRunning: boolean;
}

export function TimerDisplay({ remainingSeconds, isRunning }: TimerDisplayProps) {
  const formattedTime = formatTime(remainingSeconds);
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
      {/* Light background circle to ensure text visibility */}
      <div className="absolute bg-white/80 w-[80px] h-[80px] rounded-full"></div>
      
      <div className="relative z-10">
        <div className="text-4xl font-bold mb-1">
          {formattedTime}
        </div>
        <div className="text-sm opacity-70">
          min left
        </div>
      
        {/* Timer status indicator */}
        <div className={`mt-2 text-xs px-2 py-0.5 rounded-full font-semibold inline-flex items-center ${
          isRunning ? 'bg-[hsl(95,55%,55%)] text-white' : 'bg-[hsl(0,100%,65%)] text-white'
        }`}>
          <motion.span 
            className="h-1.5 w-1.5 bg-white rounded-full mr-1"
            animate={{ opacity: isRunning ? [1, 0.4, 1] : 1 }}
            transition={{ duration: 1.5, repeat: isRunning ? Infinity : 0 }}
          />
          {isRunning ? 'Running' : 'Paused'}
        </div>
      </div>
    </div>
  );
}