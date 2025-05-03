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
    <div className="border-t border-gray-100 pt-4 md:pt-6 lg:pt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Volume2 className="mr-2 h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" style={{ color: "hsl(339, 100%, 55%)" }} />
          <Label htmlFor="sound-toggle" className="font-semibold text-base md:text-lg lg:text-xl">Sound Alerts</Label>
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
          className={`bg-[#ffe5ee] px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-full inline-flex items-center ${
            isSoundEnabled ? 'cursor-pointer hover:bg-[#ffd6e5] active:bg-[#ffc6db]' : 'opacity-50 cursor-not-allowed'
          }`} 
          style={{ color: "hsl(339, 100%, 55%)" }}
        >
          <Bell className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 mr-1 md:mr-2" /> 5 min warning
        </button>
        
        <button 
          onClick={previewTimeUpAlert}
          disabled={!isSoundEnabled}
          className={`bg-[#e8f5d9] px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-full inline-flex items-center ${
            isSoundEnabled ? 'cursor-pointer hover:bg-[#daecc7] active:bg-[#cee3b5]' : 'opacity-50 cursor-not-allowed'
          }`} 
          style={{ color: "hsl(95, 55%, 35%)" }}
        >
          <Clock className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 mr-1 md:mr-2" /> Time's up alert
        </button>
      </div>
    </div>
  );
}
