import { useTimer } from "@/hooks/use-timer";
import { TimerCard } from "@/components/timer/timer-card";
import { motion } from "framer-motion";

export default function Home() {
  const {
    remainingSeconds,
    endTimeString,
    isSoundEnabled,
    recentTimes,
    timerPurpose,
    setPresetTime,
    updateEndTime,
    toggleSound,
    updateTimerPurpose
  } = useTimer();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen max-w-full">
      <motion.header
        className="w-full text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 capitalize" style={{ color: "hsl(339, 100%, 55%)" }}>
          {timerPurpose} Countdown
        </h1>
        <p className="text-lg text-foreground">Count down until it's time for {timerPurpose}!</p>
      </motion.header>

      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="w-full md:w-auto flex-1 flex justify-center">
          <TimerCard
            remainingSeconds={remainingSeconds}
            endTimeString={endTimeString}
            isSoundEnabled={isSoundEnabled}
            recentTimes={recentTimes}
            timerPurpose={timerPurpose}
            onSetPresetTime={setPresetTime}
            onUpdateEndTime={updateEndTime}
            onToggleSound={toggleSound}
            onUpdateTimerPurpose={updateTimerPurpose}
          />
        </div>
      </div>

      <motion.footer
        className="mt-12 text-center text-sm text-foreground opacity-70 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p>Designed with ❤️ for anyone who needs to keep track of time!</p>
      </motion.footer>
    </div>
  );
}
