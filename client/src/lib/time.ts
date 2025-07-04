// Timer-related constants
export const HOUR_IN_SECONDS = 3600;

/**
 * Formats seconds to MM:SS format
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Formats time from Date object to HH:MM format for input
 */
export function formatTimeForInput(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Calculate remaining time in seconds between now and a target end time
 */
export function calculateRemainingTime(endTime: Date): number {
  const now = new Date();
  const diffMs = endTime.getTime() - now.getTime();
  return Math.max(0, Math.floor(diffMs / 1000));
}

/**
 * Converts HH:MM time string to a Date object
 * If the time is in the past, assumes it's for tomorrow
 */
export function timeStringToDate(timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  
  // If the time is in the past, assume it's for tomorrow
  if (date < new Date()) {
    date.setDate(date.getDate() + 1);
  }
  
  return date;
} 