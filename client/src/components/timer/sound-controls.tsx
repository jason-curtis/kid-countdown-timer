import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Volume2, VolumeX } from "lucide-react";
import { speak } from "@/lib/speech";

interface SoundControlsProps {
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  timerPurpose: string;
}

export function SoundControls({ isSoundEnabled, onToggleSound, timerPurpose }: SoundControlsProps) {
  const testSound = () => {
    if (isSoundEnabled) {
      speak(`Sound test for your ${timerPurpose} timer.`);
    }
  };

  return (
    <div className="flex items-center justify-center">
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
          className="data-[state=checked]:bg-accent"
        />

        {isSoundEnabled && (
          <Button
            variant="outline"
            size="sm"
            onClick={testSound}
            className="text-sm ml-2"
          >
            Test
          </Button>
        )}
      </div>
    </div>
  );
}
