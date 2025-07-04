import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DonutChart } from "./donut-chart";
import { TimerControls } from "./timer-controls";
import { TimerDisplay } from "./timer-display";
import { SoundControls } from "./sound-controls";
import { ShareLink } from "./share-link";
import { GradientEditor } from "./gradient-editor";
import { useGradient } from "@/hooks/use-gradient";
import { motion } from "framer-motion";
import { Edit2, Check, X } from "lucide-react";
import { useState } from "react";

interface TimerCardProps {
  remainingSeconds: number;
  endTimeString: string;
  isSoundEnabled: boolean;
  recentTimes: string[];
  timerPurpose: string;
  isCompleted: boolean;
  onSetPresetTime: (minutes: number) => void;
  onUpdateEndTime: (timeString: string) => void;
  onToggleSound: () => void;
  onUpdateTimerPurpose: (purpose: string) => void;
}

export function TimerCard({
  remainingSeconds,
  endTimeString,
  isSoundEnabled,
  recentTimes,
  timerPurpose,
  isCompleted,
  onSetPresetTime,
  onUpdateEndTime,
  onToggleSound,
  onUpdateTimerPurpose
}: TimerCardProps) {
  const [isEditingPurpose, setIsEditingPurpose] = useState(false);
  const [editPurpose, setEditPurpose] = useState(timerPurpose);
  const [isGradientEditorOpen, setIsGradientEditorOpen] = useState(false);

  const { gradient, setGradient } = useGradient();

  const handleSavePurpose = () => {
    if (editPurpose.trim()) {
      onUpdateTimerPurpose(editPurpose.trim());
      setIsEditingPurpose(false);
    }
  };

  const handleCancelEdit = () => {
    setEditPurpose(timerPurpose);
    setIsEditingPurpose(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white rounded-3xl shadow-xl p-4 md:p-6 lg:p-8 w-full max-w-none transition-all duration-300 hover:shadow-2xl">
        <CardContent className="p-0 space-y-4 md:space-y-6 lg:space-y-8">
          {/* Timer Purpose Header */}
          <div className="text-center">
            {isEditingPurpose ? (
              <div className="flex items-center justify-center gap-2">
                <Input
                  value={editPurpose}
                  onChange={(e) => setEditPurpose(e.target.value)}
                  className="text-center text-2xl md:text-3xl font-bold border-2"
                  placeholder="Enter purpose..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSavePurpose();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  autoFocus
                />
                <Button
                  size="sm"
                  onClick={handleSavePurpose}
                  className="text-green-600 hover:text-green-700"
                  variant="ghost"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleCancelEdit}
                  className="text-red-600 hover:text-red-700"
                  variant="ghost"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground capitalize">
                  {timerPurpose} Timer
                </h3>
                <Button
                  size="sm"
                  onClick={() => setIsEditingPurpose(true)}
                  className="text-gray-600 hover:text-gray-700"
                  variant="ghost"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Timer Display */}
          <div className="relative flex justify-center items-center mb-4 md:mb-6 lg:mb-8">
            <DonutChart
              remainingSeconds={remainingSeconds}
              gradient={gradient}
            />
            <TimerDisplay
              remainingSeconds={remainingSeconds}
              isCompleted={isCompleted}
            />
          </div>

          {/* Timer Controls */}
          <TimerControls
            remainingSeconds={remainingSeconds}
            endTimeString={endTimeString}
            recentTimes={recentTimes}
            timerPurpose={timerPurpose}
            onSetPresetTime={onSetPresetTime}
            onUpdateEndTime={onUpdateEndTime}
          />

          {/* Sound Controls */}
          <SoundControls
            isSoundEnabled={isSoundEnabled}
            onToggleSound={onToggleSound}
            timerPurpose={timerPurpose}
          />

          {/* Gradient Editor */}
          <GradientEditor
            gradient={gradient}
            onChange={setGradient}
            isOpen={isGradientEditorOpen}
            onToggle={() => setIsGradientEditorOpen(!isGradientEditorOpen)}
          />

          {/* Share Link */}
          <ShareLink
            timerPurpose={timerPurpose}
            endTimeString={endTimeString}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
