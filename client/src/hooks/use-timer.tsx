import { useState, useEffect, useRef, useCallback } from "react";
import { speak, formatTime, HOUR_IN_SECONDS } from "@/lib/utils";

export interface TimerState {
  remainingSeconds: number;
  endTimeString: string;
  isSoundEnabled: boolean;
  recentTimes: string[];
  timerPurpose: string;
  isCompleted: boolean;
}

// Formats time from Date object to HH:MM format for input
function formatTimeForInput(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Calculate remaining time in seconds between now and a target end time
function calculateRemainingTime(endTime: Date): number {
  const now = new Date();
  const diffMs = endTime.getTime() - now.getTime();
  return Math.max(0, Math.floor(diffMs / 1000));
}

// Converts HH:MM time string to a Date object
function timeStringToDate(timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  // If the time is in the past, assume it's for tomorrow
  if (date < new Date()) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

const DEFAULT_MINUTES = 30;
const RECENT_TIMES_KEY = 'timer_recent_times';
const TIMER_PURPOSE_KEY = 'timer_purpose';
const MAX_RECENT_TIMES = 3;

export function useTimer() {
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_MINUTES * 60);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timerPurpose, setTimerPurpose] = useState(() => {
    try {
      return localStorage.getItem(TIMER_PURPOSE_KEY) || 'school';
    } catch (error) {
      console.error('Error loading timer purpose from localStorage:', error);
      return 'school';
    }
  });
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

  // Create a ref to access the latest state in the interval
  const timerStateRef = useRef({
    remainingSeconds,
    endTime,
    isSoundEnabled,
    recentTimes,
    timerPurpose,
    isCompleted
  });

  // Update the ref whenever the state changes
  useEffect(() => {
    timerStateRef.current = {
      remainingSeconds,
      endTime,
      isSoundEnabled,
      recentTimes,
      timerPurpose,
      isCompleted
    };
  }, [remainingSeconds, endTime, isSoundEnabled, recentTimes, timerPurpose, isCompleted]);

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

  // Save timer purpose to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(TIMER_PURPOSE_KEY, timerPurpose);
    } catch (error) {
      console.error('Error saving timer purpose to localStorage:', error);
    }
  }, [timerPurpose]);

  // Set up the countdown interval - always running, calculating from end time
  useEffect(() => {
    const interval = window.setInterval(() => {
      const { endTime, isSoundEnabled, timerPurpose, isCompleted } = timerStateRef.current;

      if (!endTime || isCompleted) return;

      const now = new Date();
      const diffMs = endTime.getTime() - now.getTime();
      const newRemainingSeconds = Math.max(0, Math.floor(diffMs / 1000));

      setRemainingSeconds(newRemainingSeconds);

      if (newRemainingSeconds <= 0) {
        // Timer complete - set completion state and play alert once
        setIsCompleted(true);
        if (isSoundEnabled) {
          speak(`Time is up! It's time for ${timerPurpose}!`);
        }
        return;
      }

      // Check for 5 minute warning
      if (newRemainingSeconds === 300 && isSoundEnabled) { // 5 minutes = 300 seconds
        speak(`5 minutes remaining until ${timerPurpose} time!`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const initializeDefaultEndTime = useCallback(() => {
    const now = new Date();
    const futureTime = new Date(now.getTime() + DEFAULT_MINUTES * 60 * 1000);
    setEndTime(futureTime);
    setIsCompleted(false);
  }, []);

  const setPresetTime = useCallback((minutes: number) => {
    const newSeconds = minutes * 60;
    setRemainingSeconds(newSeconds);

    // Update end time and reset completion state
    const now = new Date();
    const newEndTime = new Date(now.getTime() + newSeconds * 1000);
    setEndTime(newEndTime);
    setIsCompleted(false);
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
    const cappedSeconds = Math.min(newRemainingSeconds, HOUR_IN_SECONDS);

    setRemainingSeconds(cappedSeconds);
    setEndTime(newEndTime);
    setIsCompleted(false); // Reset completion state when setting new time

    // Add this time to recent times
    addToRecentTimes(timeString);
  }, [addToRecentTimes]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev);
  }, []);

  const updateTimerPurpose = useCallback((purpose: string) => {
    setTimerPurpose(purpose);
  }, []);

  const endTimeString = endTime ? formatTimeForInput(endTime) : formatTimeForInput(new Date());

  return {
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
  };
}
