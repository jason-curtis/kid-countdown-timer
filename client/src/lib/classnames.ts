import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges Tailwind CSS classes intelligently
 * Uses clsx for conditional classes and tailwind-merge to resolve conflicts
 */
export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Keep the original `cn` export for backward compatibility with existing code
export const cn = mergeClassNames; 