import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Volume2, VolumeX } from "lucide-react";
import { speak } from "@/lib/utils";

interface SoundControlsProps {
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  timerPurpose: string;
}

export function SoundControls({ isSoundEnabled, onToggleSound, timerPurpose }: SoundControlsProps) {
  const testSound = () => {
    if (isSoundEnabled) {
      speak(`Sound test! This is what you'll hear when your ${timerPurpose} timer is up.`);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-3 bg-card p-4 rounded-lg border">
        <div className="flex items-center space-x-2">
          {isSoundEnabled ? (
            <Volume2 className="h-5 w-5 text-accent" />
          ) : (
            <VolumeX className="h-5 w-5 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">
            Sound {isSoundEnabled ? "On" : "Off"}
          </span>
        </div>

        <Switch
          id="sound-toggle"
          checked={isSoundEnabled}
          onCheckedChange={onToggleSound}
          className="data-[state=checked]:bg-accent h-6 w-11 md:h-7 md:w-14 lg:h-8 lg:w-16"
        />
      </div>

      {isSoundEnabled && (
        <Button
          variant="outline"
          size="sm"
          onClick={testSound}
          className="text-sm"
        >
          Test Sound
        </Button>
      )}
    </div>
  );
}
