import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, timeStringToDate, HOUR_IN_SECONDS } from "@/lib/utils";
import { Plus, Minus, Clock, ChevronDown, AlertTriangle } from "lucide-react";

interface TimePickerProps {
  value: string; // HH:MM format
  onChange: (value: string) => void;
  recentTimes?: string[];
  className?: string;
}

export function TimePicker({ value, onChange, recentTimes = [], className }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [hours, minutes] = value.split(':').map(Number);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check for time limit warning when value changes
  useEffect(() => {
    const exceedsLimit = checkTimeLimit(value);
    setShowWarning(exceedsLimit);
  }, [value]);

  const updateTime = (newHours: number, newMinutes: number) => {
    const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    onChange(formattedTime);
  };

  const handleIncrement = (type: 'hours' | 'minutes') => {
    if (type === 'hours') {
      const newHours = (hours + 1) % 24;
      updateTime(newHours, minutes);
    } else {
      const newMinutes = (minutes + 5) % 60;
      updateTime(hours, newMinutes);
    }
  };

  const handleDecrement = (type: 'hours' | 'minutes') => {
    if (type === 'hours') {
      const newHours = hours === 0 ? 23 : hours - 1;
      updateTime(newHours, minutes);
    } else {
      const newMinutes = minutes === 0 ? 55 : minutes - 5;
      updateTime(hours, newMinutes);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Basic validation for HH:MM format
    if (/^\d{1,2}:\d{2}$/.test(inputValue)) {
      const [inputHours, inputMinutes] = inputValue.split(':').map(Number);
      if (inputHours >= 0 && inputHours <= 23 && inputMinutes >= 0 && inputMinutes <= 59) {
        onChange(inputValue.padStart(5, '0'));
      }
    }
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div className={cn(
        "flex items-center space-x-2 md:space-x-3 lg:space-x-4 bg-card p-3 md:p-4 lg:p-5 rounded-2xl border shadow-sm transition-colors",
        showWarning && "border-amber-400 bg-amber-50"
      )}>
        <Clock className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary" />

        {/* Hours */}
        <div className="flex flex-col items-center space-y-1">
          <Button
            size="sm"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg text-white bg-primary hover:bg-primary/80"
            onClick={() => handleIncrement('hours')}
            aria-label="Increase hours"
          >
            <Plus className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
          </Button>
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-center min-w-[2ch]">
            {hours.toString().padStart(2, '0')}
          </span>
          <Button
            size="sm"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg text-white bg-primary hover:bg-primary/80"
            onClick={() => handleDecrement('hours')}
            aria-label="Decrease hours"
          >
            <Minus className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
          </Button>
        </div>

        <span className="text-2xl md:text-3xl lg:text-4xl font-bold">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center space-y-1">
          <Button
            size="sm"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg text-white bg-primary hover:bg-primary/80"
            onClick={() => handleIncrement('minutes')}
            aria-label="Increase minutes"
          >
            <Plus className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
          </Button>
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-center min-w-[2ch]">
            {minutes.toString().padStart(2, '0')}
          </span>
          <Button
            size="sm"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg text-white bg-primary hover:bg-primary/80"
            onClick={() => handleDecrement('minutes')}
            aria-label="Decrease minutes"
          >
            <Minus className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
          </Button>
        </div>

        {/* Direct input */}
        <div className="flex flex-col items-center space-y-1">
          <label htmlFor="time-input" className="text-xs md:text-sm lg:text-base text-muted-foreground">
            Or type:
          </label>
          <Input
            id="time-input"
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="HH:MM"
            className={cn(
              "w-16 md:w-20 lg:w-24 text-center text-sm md:text-base lg:text-lg border-none focus:outline-none bg-muted",
              showWarning && "bg-amber-100"
            )}
          />
        </div>

        {/* Recent times dropdown button */}
        {recentTimes.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
            aria-label="Show recent times"
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-180")} />
          </Button>
        )}
      </div>

      {/* Warning message for time limit */}
      {showWarning && (
        <div className="mt-2 flex items-center gap-2 p-2 bg-amber-100 border border-amber-200 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-amber-800">
            Timer will be capped at 1 hour maximum
          </span>
        </div>
      )}

      {/* Recent times dropdown */}
      {isOpen && recentTimes.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-10">
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2">Recent times:</p>
            {recentTimes.map((time, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(time);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
