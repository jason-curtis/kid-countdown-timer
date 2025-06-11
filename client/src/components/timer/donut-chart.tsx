import { motion } from "framer-motion";
import { HOUR_IN_SECONDS } from "@/lib/time";
import { GradientConfig } from "./gradient-editor";

interface DonutChartProps {
  remainingSeconds: number;
  className?: string;
  gradient?: GradientConfig;
}

export function DonutChart({
  remainingSeconds,
  className,
  gradient,
}: DonutChartProps) {
  const CIRCUMFERENCE = 2 * Math.PI * 35; // 2πr where r=35 (smaller to leave space for ticks)

  // Calculate the percentage remaining of a full hour
  const percentRemaining = remainingSeconds / HOUR_IN_SECONDS;
  const dashOffset = CIRCUMFERENCE * (1 - percentRemaining);

  // Default gradient if none provided
  const defaultGradient: GradientConfig = {
    type: 'linear',
    direction: '0deg',
    stops: [
      { offset: 0, color: 'hsl(280 100% 75%)' },
      { offset: 18, color: 'hsl(0 100% 65%)' },
      { offset: 25, color: 'hsl(305, 100%, 36%)' },
      { offset: 37, color: 'hsl(339 0% 70%)' },
      { offset: 43, color: 'hsl(330 100% 50%)' },
      { offset: 50, color: 'hsl(54 100% 60%)' },
      { offset: 60, color: 'hsl(30 100% 40%)' },
      { offset: 70, color: 'hsl(30 100% 60%)' },
      { offset: 80, color: 'hsl(95 50% 60%)' },
      { offset: 90, color: 'hsl(240 80% 60%)' },
      { offset: 100, color: 'hsl(180 80% 60%)' },
    ]
  };

  const currentGradient = gradient || defaultGradient;

  // Generate SVG gradient definition
  const generateSvgGradient = (grad: GradientConfig) => {
    if (grad.type === 'radial') {
      return (
        <radialGradient id="timerGradient" cx="50%" cy="50%" r="50%">
          {grad.stops.map((stop, index) => (
            <stop
              key={index}
              offset={`${stop.offset}%`}
              stopColor={stop.color}
            />
          ))}
        </radialGradient>
      );
    } else {
      // Convert CSS angle to SVG coordinates
      const angle = parseInt(grad.direction?.replace('deg', '') || '0');
      const radians = (angle * Math.PI) / 180;
      const x2 = Math.cos(radians) * 100;
      const y2 = Math.sin(radians) * 100;

      return (
        <linearGradient
          id="timerGradient"
          x1="0%"
          y1="0%"
          x2={`${x2}%`}
          y2={`${y2}%`}
        >
          {grad.stops.map((stop, index) => (
            <stop
              key={index}
              offset={`${stop.offset}%`}
              stopColor={stop.color}
            />
          ))}
        </linearGradient>
      );
    }
  };

  return (
    <div className={className ? `relative ${className}` : "relative"}>
      <svg
        className="w-80 h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] xl:w-[40rem] xl:h-[40rem] 2xl:w-[48rem] 2xl:h-[48rem]"
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
          {generateSvgGradient(currentGradient)}
        </defs>
      </svg>
    </div>
  );
}
