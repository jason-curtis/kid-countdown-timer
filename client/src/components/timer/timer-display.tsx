import { motion } from "framer-motion";
import { formatTime } from "@/lib/utils";

interface TimerDisplayProps {
  remainingSeconds: number;
  isCompleted: boolean;
}

export function TimerDisplay({ remainingSeconds, isCompleted }: TimerDisplayProps) {
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
          {isCompleted ? "completed!" : "remaining"}
        </div>

        {/* Completion indicator */}
        {isCompleted && (
          <motion.div
            className="mt-2 text-xs md:text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Time's up!
          </motion.div>
        )}
      </div>
    </div>
  );
}