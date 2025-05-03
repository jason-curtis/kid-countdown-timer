import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Clock, Volume2 } from "lucide-react";
import { speak } from "@/lib/utils";

interface SoundControlsProps {
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export function SoundControls({ 
  isSoundEnabled, 
  onToggleSound 
}: SoundControlsProps) {
  const previewFiveMinWarning = () => {
    if (isSoundEnabled) {
      speak("5 minutes remaining until school time!");
    }
  };

  const previewTimeUpAlert = () => {
    if (isSoundEnabled) {
      speak("Time is up! It's time for school!");
    }
  };

  return (
    <div className="border-t border-gray-100 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Volume2 className="mr-2 h-5 w-5" style={{ color: "hsl(339, 100%, 55%)" }} />
          <Label htmlFor="sound-toggle" className="font-semibold">Sound Alerts</Label>
        </div>
        
        <Switch
          id="sound-toggle"
          checked={isSoundEnabled}
          onCheckedChange={onToggleSound}
          className="data-[state=checked]:bg-[hsl(95,55%,55%)]"
        />
      </div>
      
      <div className="mt-2 text-sm flex flex-wrap gap-2">
        <button 
          onClick={previewFiveMinWarning}
          disabled={!isSoundEnabled}
          className={`bg-[#ffe5ee] px-3 py-1 rounded-full inline-flex items-center ${
            isSoundEnabled ? 'cursor-pointer hover:bg-[#ffd6e5] active:bg-[#ffc6db]' : 'opacity-50 cursor-not-allowed'
          }`} 
          style={{ color: "hsl(339, 100%, 55%)" }}
        >
          <Bell className="h-3 w-3 mr-1" /> 5 min warning
        </button>
        
        <button 
          onClick={previewTimeUpAlert}
          disabled={!isSoundEnabled}
          className={`bg-[#e8f5d9] px-3 py-1 rounded-full inline-flex items-center ${
            isSoundEnabled ? 'cursor-pointer hover:bg-[#daecc7] active:bg-[#cee3b5]' : 'opacity-50 cursor-not-allowed'
          }`} 
          style={{ color: "hsl(95, 55%, 35%)" }}
        >
          <Clock className="h-3 w-3 mr-1" /> Time's up alert
        </button>
      </div>
    </div>
  );
}
