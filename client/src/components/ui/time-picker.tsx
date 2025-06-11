import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/classnames";
import { timeStringToDate, HOUR_IN_SECONDS } from "@/lib/time";
import { Clock, AlertTriangle } from "lucide-react";

interface TimePickerProps {
  value: string; // HH:MM format (24-hour)
  onChange: (value: string) => void;
  recentTimes?: string[];
  className?: string;
}

export function TimePicker({ value, onChange, recentTimes = [], className }: TimePickerProps) {
  const [showWarning, setShowWarning] = useState(false);

  // Parse 24-hour time to 12-hour format with error handling
  const parseTime = (timeValue: string) => {
    try {
      const [hours24, minutes] = timeValue.split(':').map(Number);

      // Validate parsed values
      if (isNaN(hours24) || isNaN(minutes) || hours24 < 0 || hours24 > 23 || minutes < 0 || minutes > 59) {
        // Fallback to current time
        const now = new Date();
        return {
          hours24: now.getHours(),
          minutes: now.getMinutes(),
          isPM: now.getHours() >= 12,
          hours12: now.getHours() === 0 ? 12 : now.getHours() > 12 ? now.getHours() - 12 : now.getHours()
        };
      }

      const isPM = hours24 >= 12;
      const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;

      return { hours24, minutes, isPM, hours12 };
    } catch (error) {
      // Fallback to current time on any parsing error
      const now = new Date();
      return {
        hours24: now.getHours(),
        minutes: now.getMinutes(),
        isPM: now.getHours() >= 12,
        hours12: now.getHours() === 0 ? 12 : now.getHours() > 12 ? now.getHours() - 12 : now.getHours()
      };
    }
  };

  const { hours24, minutes, isPM, hours12 } = parseTime(value);

  // Check if current time would exceed 1 hour limit
  const checkTimeLimit = (timeString: string) => {
    try {
      const targetTime = timeStringToDate(timeString);
      const now = new Date();
      const diffMs = targetTime.getTime() - now.getTime();
      const diffSeconds = Math.max(0, Math.floor(diffMs / 1000));
      return diffSeconds > HOUR_IN_SECONDS;
    } catch {
      return false;
    }
  };

  // Check for time limit warning when value changes
  useEffect(() => {
    const exceedsLimit = checkTimeLimit(value);
    setShowWarning(exceedsLimit);
  }, [value]);

  const updateTime = (newHours12: number, newMinutes: number, newIsPM: boolean) => {
    // Validate inputs
    if (newHours12 < 1 || newHours12 > 12 || newMinutes < 0 || newMinutes > 59) {
      return; // Don't update with invalid values
    }

    // Convert 12-hour to 24-hour format
    let hours24;
    if (newHours12 === 12) {
      hours24 = newIsPM ? 12 : 0;
    } else {
      hours24 = newIsPM ? newHours12 + 12 : newHours12;
    }

    const formattedTime = `${hours24.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    onChange(formattedTime);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHour = parseInt(e.target.value);
    if (!isNaN(newHour) && newHour >= 1 && newHour <= 12) {
      updateTime(newHour, minutes, isPM);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinute = parseInt(e.target.value);
    if (!isNaN(newMinute) && newMinute >= 0 && newMinute <= 59) {
      updateTime(hours12, newMinute, isPM);
    }
  };

  const toggleAmPm = () => {
    updateTime(hours12, minutes, !isPM);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className={cn(
        "flex items-center justify-center gap-2 p-4 rounded-2xl border shadow-sm transition-colors",
        showWarning ? "border-amber-400 bg-amber-50" : "bg-card"
      )}>
        <Clock className="h-5 w-5 text-primary" />

        {/* Hour input */}
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs text-muted-foreground">Hour</label>
          <Input
            type="number"
            min="1"
            max="12"
            value={hours12}
            onChange={handleHourChange}
            className="w-16 text-center text-lg font-semibold"
            aria-label="Hour"
          />
        </div>

        <span className="text-2xl font-bold mt-6">:</span>

        {/* Minute input */}
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs text-muted-foreground">Min</label>
          <Input
            type="number"
            min="0"
            max="59"
            value={minutes.toString().padStart(2, '0')}
            onChange={handleMinuteChange}
            className="w-16 text-center text-lg font-semibold"
            aria-label="Minutes"
          />
        </div>

        {/* AM/PM toggle */}
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs text-muted-foreground">Period</label>
          <Button
            type="button"
            variant={isPM ? "default" : "outline"}
            size="sm"
            onClick={toggleAmPm}
            className="w-16 font-semibold"
            aria-label={`Switch to ${isPM ? "AM" : "PM"}`}
          >
            {isPM ? "PM" : "AM"}
          </Button>
        </div>
      </div>

      {/* Warning message for time limit */}
      {showWarning && (
        <div className="flex items-center gap-2 p-2 bg-amber-100 border border-amber-200 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-amber-800">
            Timer will be capped at 1 hour maximum
          </span>
        </div>
      )}

      {/* Recent times */}
      {recentTimes.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Recent times:</p>
          <div className="flex flex-wrap gap-1">
            {recentTimes.map((time, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onChange(time)}
                className="text-xs"
                aria-label={`Set time to ${time}`}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
