import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Clock, Volume2 } from "lucide-react";

interface SoundControlsProps {
  isSoundEnabled: boolean;
  timerPurpose: string;
  onToggleSound: () => void;
}

// Speaks the given text using the Web Speech API
const speak = (text: string): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 2;
    window.speechSynthesis.speak(utterance);
  }
};

export function SoundControls({
  isSoundEnabled,
  timerPurpose,
  onToggleSound
}: SoundControlsProps) {
  const previewFiveMinWarning = () => {
    if (isSoundEnabled) {
      speak(`5 minutes remaining until ${timerPurpose} time!`);
    }
  };

  const previewTimesUpAlert = () => {
    if (isSoundEnabled) {
      speak(`Time is up! It's time for ${timerPurpose}!`);
    }
  };

  return (
    <div className="p-4 md:p-5 lg:p-6 bg-muted rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <Volume2 className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-foreground" />
          <Label htmlFor="sound-toggle" className="text-base md:text-lg lg:text-xl font-semibold">
            Sound Alerts
          </Label>
        </div>
        <Switch
          id="sound-toggle"
          checked={isSoundEnabled}
          onCheckedChange={onToggleSound}
          className="data-[state=checked]:bg-[hsl(95,55%,55%)] h-6 w-11 md:h-7 md:w-14 lg:h-8 lg:w-16"
        />
      </div>
      <div className="mt-3 md:mt-4 lg:mt-5 text-sm md:text-base lg:text-lg flex flex-wrap gap-2 md:gap-3 lg:gap-4">
        <button
          onClick={previewFiveMinWarning}
          disabled={!isSoundEnabled}
          className="flex items-center gap-1 md:gap-2 px-2 md:px-3 lg:px-4 py-1 md:py-2 lg:py-3 rounded-lg bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm lg:text-base"
        >
          <Clock className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
          Preview 5min warning
        </button>
        <button
          onClick={previewTimesUpAlert}
          disabled={!isSoundEnabled}
          className="flex items-center gap-1 md:gap-2 px-2 md:px-3 lg:px-4 py-1 md:py-2 lg:py-3 rounded-lg bg-green-100 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm lg:text-base"
        >
          <Bell className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
          Preview times up alert
        </button>
      </div>
    </div>
  );
}
