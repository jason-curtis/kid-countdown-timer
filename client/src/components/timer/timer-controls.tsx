import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/time-picker";

interface TimerControlsProps {
  remainingSeconds: number;
  endTimeString: string;
  recentTimes: string[];
  timerPurpose: string;
  onSetPresetTime: (minutes: number) => void;
  onUpdateEndTime: (timeString: string) => void;
}

export function TimerControls({
  remainingSeconds,
  endTimeString,
  recentTimes,
  timerPurpose,
  onSetPresetTime,
  onUpdateEndTime
}: TimerControlsProps) {
  return (
    <div className="space-y-6">
      {/* Preset Time Buttons */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4">
        <Button
          variant="secondary"
          className="py-2 md:py-3 px-4 text-foreground font-semibold text-sm md:text-base lg:text-lg bg-secondary hover:bg-secondary/80"
          onClick={() => onSetPresetTime(5)}
        >
          5 min
        </Button>
        <Button
          variant="secondary"
          className="py-2 md:py-3 px-4 text-foreground font-semibold text-sm md:text-base lg:text-lg bg-secondary hover:bg-secondary/80"
          onClick={() => onSetPresetTime(10)}
        >
          10 min
        </Button>
        <Button
          variant="secondary"
          className="py-2 md:py-3 px-4 text-foreground font-semibold text-sm md:text-base lg:text-lg bg-secondary hover:bg-secondary/80"
          onClick={() => onSetPresetTime(60)}
        >
          1 hr
        </Button>
      </div>

      {/* Custom Time Picker */}
      <div className="flex flex-col items-center space-y-3">
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          Or set a custom end time:
        </p>
        <TimePicker
          value={endTimeString}
          onChange={onUpdateEndTime}
          recentTimes={recentTimes}
          className="w-full max-w-xs mx-auto"
        />
      </div>
    </div>
  );
}


