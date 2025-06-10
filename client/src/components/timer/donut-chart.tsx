import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HOUR_IN_SECONDS } from "@/lib/utils";

interface DonutChartProps {
  remainingSeconds: number;
  className?: string;
}

export function DonutChart({
  remainingSeconds,
  className,
}: DonutChartProps) {
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
        <g className="text-xs font-bold">
          {/* 0 minutes (top) */}
          <text
            x="60"
            y="20"
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

          {/* 15 minutes (right) */}
          <text
            x="104"
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

          {/* 30 minutes (bottom) */}
          <text
            x="60"
            y="107"
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

          {/* 45 minutes (left) */}
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
            <stop offset="60%" stopColor="hsl(30 100% 40%)" />
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
