import { motion } from "framer-motion";

interface TimerDisplayProps {
  remainingSeconds: number;
}

// Formats seconds to MM:SS format
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function TimerDisplay({ remainingSeconds }: TimerDisplayProps) {
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
          remaining
        </div>
      </div>
    </div>
  );
}