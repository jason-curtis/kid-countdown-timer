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
  className,
}: DonutChartProps) {
  const HOUR_IN_SECONDS = 3600;
  const CIRCUMFERENCE = 2 * Math.PI * 35; // 2πr where r=35 (smaller to leave space for ticks)

  // Calculate the percentage remaining of a full hour
  const percentRemaining = remainingSeconds / HOUR_IN_SECONDS;
  const dashOffset = CIRCUMFERENCE * (1 - percentRemaining);

  return (
    <div className={cn("relative", className)}>
      <svg
        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
        viewBox="-5 -5 130 130"
      >
        {/* Outer background circle */}
        <circle
          cx="60"
          cy="60"
          r="35"
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="8"
        />

        {/* Timer progress donut segment - start from top (counterclockwise) */}
        <motion.circle
          cx="60"
          cy="60"
          r="35"
          fill="none"
          stroke="url(#timerGradient)"
          strokeWidth="8"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90, 60, 60)"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* 15-minute markers (4 sections) */}
        <g>
          {/* Top marker (0/60 min) */}
          <line
            x1="60"
            y1="20"
            x2="60"
            y2="15"
            stroke="#333"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="10"
            textAnchor="middle"
            fill="#333"
            fontSize="7"
            fontWeight="bold"
            stroke="white"
            strokeWidth="0.5"
            paintOrder="stroke"
          >
            0
          </text>

          {/* Right marker (15 min) */}
          <line
            x1="100"
            y1="60"
            x2="105"
            y2="60"
            stroke="#333"
            strokeWidth="1.5"
          />
          <text
            x="108"
            y="63"
            textAnchor="start"
            fill="#333"
            fontSize="7"
            fontWeight="bold"
            stroke="white"
            strokeWidth="0.5"
            paintOrder="stroke"
          >
            15
          </text>

          {/* Bottom marker (30 min) */}
          <line
            x1="60"
            y1="100"
            x2="60"
            y2="105"
            stroke="#333"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="113"
            textAnchor="middle"
            fill="#333"
            fontSize="7"
            fontWeight="bold"
            stroke="white"
            strokeWidth="0.5"
            paintOrder="stroke"
          >
            30
          </text>

          {/* Left marker (45 min) */}
          <line
            x1="20"
            y1="60"
            x2="15"
            y2="60"
            stroke="#333"
            strokeWidth="1.5"
          />
          <text
            x="12"
            y="63"
            textAnchor="end"
            fill="#333"
            fontSize="7"
            fontWeight="bold"
            stroke="white"
            strokeWidth="0.5"
            paintOrder="stroke"
          >
            45
          </text>
        </g>

        {/* Gradient definition for timer circle */}
        <defs>
          <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {/* purple */}
            <stop offset="0%" stopColor="hsl(280 100% 75%)" />
            {/* red */}
            <stop offset="18%" stopColor="hsl(0 100% 65%)" />
            {/* pink */}
            <stop offset="25%" stopColor="hsl(305, 100%, 36%)" />
            {/* gray */}
            <stop offset="37%" stopColor="hsl(339 0% 70%)" />
            <stop offset="43%" stopColor="hsl(330 100% 50%)" />
            {/* yellow */}
            <stop offset="50%" stopColor="hsl(54 100% 60%)" />
            {/* brown */}
            <stop offset="60%" stopColor="hsl(30
              100% 40%)" />
            {/* orange */}
            <stop offset="70%" stopColor="hsl(30 100% 60%)" />
            {/* green */}
            <stop offset="80%" stopColor="hsl(95 50% 60%)" />
            {/* dark blue */}
            <stop offset="90%" stopColor="hsl(240 80% 60%)" />
            {/* light blue */}
            <stop offset="100%" stopColor="hsl(180 80% 60%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
