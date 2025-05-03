import { useTimer } from "@/hooks/use-timer";
import { TimerCard } from "@/components/timer/timer-card";
import { motion } from "framer-motion";

export default function Home() {
  const {
    isRunning,
    remainingSeconds,
    endTimeString,
    isSoundEnabled,
    recentTimes,
    toggleTimer,
    resetTimer,
    setPresetTime,
    updateEndTime,
    toggleSound
  } = useTimer();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen max-w-full">
      <motion.header 
        className="w-full text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: "hsl(339, 100%, 55%)" }}>School Timer</h1>
        <p className="text-lg text-foreground">Count down until it's time for school!</p>
      </motion.header>
      
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="w-full md:w-auto flex-1 flex justify-center">
          <TimerCard
            isRunning={isRunning}
            remainingSeconds={remainingSeconds}
            endTimeString={endTimeString}
            isSoundEnabled={isSoundEnabled}
            recentTimes={recentTimes}
            onToggleTimer={toggleTimer}
            onResetTimer={resetTimer}
            onSetPresetTime={setPresetTime}
            onUpdateEndTime={updateEndTime}
            onToggleSound={toggleSound}
          />
        </div>
      </div>
      
      <motion.footer 
        className="mt-12 text-center text-sm text-foreground opacity-70 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p>Designed with ❤️ for kids who need to get ready for school!</p>
      </motion.footer>
    </div>
  );
}
