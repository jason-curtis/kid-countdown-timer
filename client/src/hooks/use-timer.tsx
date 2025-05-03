import { useState, useEffect, useRef, useCallback } from "react";
import { 
  formatTimeForInput, 
  calculateRemainingTime, 
  timeStringToDate, 
  capRemainingTime,
  speak
} from "@/lib/utils";

export interface TimerState {
  isRunning: boolean;
  remainingSeconds: number;
  endTimeString: string;
  isSoundEnabled: boolean;
  recentTimes: string[];
}

const HOUR_IN_SECONDS = 3600;
const DEFAULT_MINUTES = 45;
const RECENT_TIMES_KEY = 'timer_recent_times';
const MAX_RECENT_TIMES = 3;

export function useTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_MINUTES * 60);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [recentTimes, setRecentTimes] = useState<string[]>(() => {
    // Try to load recent times from localStorage
    try {
      const savedTimes = localStorage.getItem(RECENT_TIMES_KEY);
      return savedTimes ? JSON.parse(savedTimes) : [];
    } catch (error) {
      console.error('Error loading recent times from localStorage:', error);
      return [];
    }
  });
  
  // Create a ref so we can access the latest state in the interval
  const timerStateRef = useRef({
    isRunning,
    remainingSeconds,
    endTime,
    isSoundEnabled,
    recentTimes
  });
  
  // Update the ref whenever the state changes
  useEffect(() => {
    timerStateRef.current = {
      isRunning,
      remainingSeconds,
      endTime,
      isSoundEnabled,
      recentTimes
    };
  }, [isRunning, remainingSeconds, endTime, isSoundEnabled, recentTimes]);
  
  // Initialize the timer with default end time (current time + DEFAULT_MINUTES)
  useEffect(() => {
    initializeDefaultEndTime();
  }, []);
  
  // Save recent times to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(RECENT_TIMES_KEY, JSON.stringify(recentTimes));
    } catch (error) {
      console.error('Error saving recent times to localStorage:', error);
    }
  }, [recentTimes]);
  
  // Set up the countdown interval
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        const { remainingSeconds, isSoundEnabled } = timerStateRef.current;
        
        if (remainingSeconds <= 0) {
          // Timer complete
          clearInterval(interval);
          setIsRunning(false);
          
          // Play time's up alert
          if (isSoundEnabled) {
            speak("Time is up! It's time for school!");
          }
          
          return;
        }
        
        // Check for 5 minute warning
        if (remainingSeconds === 300 && isSoundEnabled) { // 5 minutes = 300 seconds
          speak("5 minutes remaining until school time!");
        }
        
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);
  
  const initializeDefaultEndTime = useCallback(() => {
    const now = new Date();
    const futureTime = new Date(now.getTime() + remainingSeconds * 1000);
    setEndTime(futureTime);
  }, [remainingSeconds]);
  
  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => {
      const newIsRunning = !prev;
      
      if (newIsRunning && !endTime) {
        // If starting with no end time set, use current time + remaining
        initializeDefaultEndTime();
      }
      
      return newIsRunning;
    });
  }, [endTime, initializeDefaultEndTime]);
  
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setRemainingSeconds(DEFAULT_MINUTES * 60);
    setEndTime(null);
    initializeDefaultEndTime();
  }, [initializeDefaultEndTime]);
  
  const setPresetTime = useCallback((minutes: number) => {
    const newSeconds = minutes * 60;
    setRemainingSeconds(newSeconds);
    
    // Update end time
    const now = new Date();
    const newEndTime = new Date(now.getTime() + newSeconds * 1000);
    setEndTime(newEndTime);
  }, []);
  
  // Add a time string to the recent times list
  const addToRecentTimes = useCallback((timeString: string) => {
    setRecentTimes(prev => {
      // Don't add if already in the list
      if (prev.includes(timeString)) {
        // Move the used time to the front of the list
        return [timeString, ...prev.filter(t => t !== timeString)];
      }
      
      // Add new time to the beginning and limit to MAX_RECENT_TIMES
      const newTimes = [timeString, ...prev].slice(0, MAX_RECENT_TIMES);
      return newTimes;
    });
  }, []);
  
  const updateEndTime = useCallback((timeString: string) => {
    const newEndTime = timeStringToDate(timeString);
    
    // Calculate remaining time in seconds
    const now = new Date();
    const diffMs = newEndTime.getTime() - now.getTime();
    const newRemainingSeconds = Math.max(0, Math.floor(diffMs / 1000));
    
    // Cap at 1 hour maximum
    const cappedSeconds = capRemainingTime(newRemainingSeconds);
    
    setRemainingSeconds(cappedSeconds);
    setEndTime(newEndTime);
    
    // Add this time to recent times
    addToRecentTimes(timeString);
  }, [addToRecentTimes]);
  
  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev);
  }, []);
  
  const endTimeString = endTime ? formatTimeForInput(endTime) : formatTimeForInput(new Date());
  
  return {
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
  };
}
