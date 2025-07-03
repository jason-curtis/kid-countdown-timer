import { motion } from "framer-motion";
import { formatTime } from "@/lib/time";

interface TimerDisplayProps {
  remainingSeconds: number;
  isCompleted: boolean;
}

export function TimerDisplay({ remainingSeconds, isCompleted }: TimerDisplayProps) {
  const formattedTime = formatTime(remainingSeconds);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
      {/* Light background circle to ensure text visibility */}
      <div className="absolute bg-white/80 w-[100px] h-[100px] md:w-[120px] md:h-[120px] lg:w-[180px] lg:h-[180px] xl:w-[220px] xl:h-[220px] 2xl:w-[280px] 2xl:h-[280px] rounded-full"></div>

      <div className="relative z-10">
        <div
          className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold mb-1 lg:mb-2"
          style={{ 
            fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
            fontFeatureSettings: '"tnum" 1, "zero" 1'
          }}
          aria-live="polite"
          aria-label={`${remainingSeconds} seconds remaining`}
        >
          {formattedTime}
        </div>
        <div className="text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl opacity-70">
          {isCompleted ? "completed!" : "remaining"}
        </div>

        {/* Completion indicator */}
        {isCompleted && (
          <motion.div
            className="mt-2 lg:mt-4 text-sm md:text-base lg:text-xl xl:text-2xl px-3 py-1 lg:px-6 lg:py-2 rounded-full bg-green-100 text-green-700 font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-live="assertive"
          >
            Time's up!
          </motion.div>
        )}
      </div>
    </div>
  );
}