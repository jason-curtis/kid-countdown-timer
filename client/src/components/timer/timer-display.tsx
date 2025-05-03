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
      <div className="absolute bg-white/80 w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full"></div>
      
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-1">
          {formattedTime}
        </div>
        <div className="text-sm md:text-base lg:text-lg opacity-70">
          min left
        </div>
      
        {/* Timer status indicator */}
        <div className={`mt-2 text-xs md:text-sm lg:text-base px-2 md:px-3 py-0.5 md:py-1 rounded-full font-semibold inline-flex items-center ${
          isRunning ? 'bg-[hsl(95,55%,55%)] text-white' : 'bg-[hsl(0,100%,65%)] text-white'
        }`}>
          <motion.span 
            className="h-1.5 w-1.5 md:h-2 md:w-2 lg:h-2.5 lg:w-2.5 bg-white rounded-full mr-1 md:mr-1.5"
            animate={{ opacity: isRunning ? [1, 0.4, 1] : 1 }}
            transition={{ duration: 1.5, repeat: isRunning ? Infinity : 0 }}
          />
          {isRunning ? 'Running' : 'Paused'}
        </div>
      </div>
    </div>
  );
}