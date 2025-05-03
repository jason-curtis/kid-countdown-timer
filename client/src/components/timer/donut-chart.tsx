import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  remainingSeconds: number;
  isRunning: boolean;
  className?: string;
}

export function DonutChart({ 
  remainingSeconds, 
  isRunning,
  className 
}: DonutChartProps) {
  const HOUR_IN_SECONDS = 3600;
  const CIRCUMFERENCE = 2 * Math.PI * 45; // 2πr where r=45 (matches SVG circle radius)
  
  // Calculate the percentage remaining of a full hour
  const percentRemaining = remainingSeconds / HOUR_IN_SECONDS;
  const dashOffset = CIRCUMFERENCE * (1 - percentRemaining);
  
  return (
    <div className={cn("relative", className)}>
      <svg className="w-64 h-64" viewBox="-10 -10 120 120">
        {/* Outer background circle */}
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="#f0f0f0" 
          strokeWidth="10"
        />
        
        {/* Timer progress donut segment - start from top (counterclockwise) */}
        <motion.circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="url(#timerGradient)" 
          strokeWidth="10"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90, 50, 50)"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        {/* Background for better contrast with ticker text */}
        <rect x="-10" y="-10" width="120" height="120" fill="white" opacity="0.35" />
        
        {/* 15-minute markers (4 sections) */}
        <g>
          {/* Top marker (0/60 min) */}
          <line x1="50" y1="5" x2="50" y2="15" stroke="#333" strokeWidth="2.5" />
          <rect x="45" y="-9" width="10" height="10" fill="white" rx="2" />
          <text x="50" y="-2" textAnchor="middle" fill="#333" fontSize="8" fontWeight="bold">0</text>
          
          {/* Right marker (15 min) */}
          <line x1="85" y1="50" x2="95" y2="50" stroke="#333" strokeWidth="2.5" />
          <rect x="105" y="45" width="15" height="10" fill="white" rx="2" />
          <text x="113" y="52" textAnchor="middle" fill="#333" fontSize="8" fontWeight="bold">15</text>
          
          {/* Bottom marker (30 min) */}
          <line x1="50" y1="85" x2="50" y2="95" stroke="#333" strokeWidth="2.5" />
          <rect x="45" y="99" width="10" height="10" fill="white" rx="2" />
          <text x="50" y="107" textAnchor="middle" fill="#333" fontSize="8" fontWeight="bold">30</text>
          
          {/* Left marker (45 min) */}
          <line x1="5" y1="50" x2="15" y2="50" stroke="#333" strokeWidth="2.5" />
          <rect x="-20" y="45" width="15" height="10" fill="white" rx="2" />
          <text x="-12" y="52" textAnchor="middle" fill="#333" fontSize="8" fontWeight="bold">45</text>
        </g>
        
        {/* Gradient definition for timer circle */}
        <defs>
          <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(339 100% 75%)" />
            <stop offset="50%" stopColor="hsl(54 100% 60%)" />
            <stop offset="100%" stopColor="hsl(95 55% 55%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
