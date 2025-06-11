import { useEffect } from "react";
import { useParams } from "wouter";
import { useTimer } from "@/hooks/use-timer";
import { TimerCard } from "@/components/timer/timer-card";
import { motion } from "framer-motion";

/**
 * Converts time string from URL format (like "730", "1430") to "HH:MM" format
 */
function parseTimeFromUrl(timeParam: string): string | null {
    // Remove any non-digits
    const digits = timeParam.replace(/\D/g, '');

    // Handle different time formats:
    // 730 -> 07:30
    // 1430 -> 14:30
    // 8 -> 08:00
    // 800 -> 08:00

    if (digits.length === 1) {
        // Single digit like "8" -> "08:00"
        return `0${digits}:00`;
    } else if (digits.length === 2) {
        // Two digits like "08" -> "08:00"
        return `${digits}:00`;
    } else if (digits.length === 3) {
        // Three digits like "730" -> "07:30"
        const hour = digits.slice(0, 1);
        const minute = digits.slice(1);
        return `0${hour}:${minute}`;
    } else if (digits.length === 4) {
        // Four digits like "1430" -> "14:30"
        const hour = digits.slice(0, 2);
        const minute = digits.slice(2);
        return `${hour}:${minute}`;
    }

    return null;
}

export default function Timer() {
    const params = useParams();
    const purpose = params.purpose || 'timer';
    const timeParam = params.time;

    const {
        remainingSeconds,
        endTimeString,
        isSoundEnabled,
        recentTimes,
        timerPurpose,
        isCompleted,
        setPresetTime,
        updateEndTime,
        toggleSound,
        updateTimerPurpose
    } = useTimer();

    // Set the timer purpose and time from URL parameters on mount
    useEffect(() => {
        if (purpose && purpose !== timerPurpose) {
            updateTimerPurpose(purpose);
        }
    }, [purpose, timerPurpose, updateTimerPurpose]);

    useEffect(() => {
        if (timeParam) {
            const parsedTime = parseTimeFromUrl(timeParam);
            if (parsedTime) {
                updateEndTime(parsedTime);
            }
        }
    }, [timeParam, updateEndTime]);

    return (
        <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-center min-h-screen max-w-none">
            <motion.header
                className="w-full text-center mb-4 md:mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 capitalize" style={{ color: "hsl(339, 100%, 55%)" }}>
                    {timerPurpose} Countdown
                </h1>
                <p className="text-lg md:text-xl text-foreground">Count down until it's time for {timerPurpose}!</p>
            </motion.header>

            <div className="w-full flex flex-col justify-center items-center flex-1">
                <div className="w-full flex justify-center">
                    <TimerCard
                        remainingSeconds={remainingSeconds}
                        endTimeString={endTimeString}
                        isSoundEnabled={isSoundEnabled}
                        recentTimes={recentTimes}
                        timerPurpose={timerPurpose}
                        isCompleted={isCompleted}
                        onSetPresetTime={setPresetTime}
                        onUpdateEndTime={updateEndTime}
                        onToggleSound={toggleSound}
                        onUpdateTimerPurpose={updateTimerPurpose}
                    />
                </div>
            </div>

            <motion.footer
                className="mt-4 text-center text-sm text-foreground opacity-70 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <p>Designed with ❤️ for anyone who needs to keep track of time!</p>
                {timeParam && (
                    <p className="mt-2 text-xs">
                        Direct link: /{purpose}/{timeParam}
                    </p>
                )}
            </motion.footer>
        </div>
    );
} 