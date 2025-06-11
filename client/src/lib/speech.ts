/**
 * Speaks the given text using the Web Speech API
 * Optimized for kid-friendly speech with slower rate and higher pitch
 */
export function speak(text: string): void {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for kids
    utterance.pitch = 1.1; // Slightly higher pitch for kid-friendly sound
    window.speechSynthesis.speak(utterance);
  }
}

/**
 * Cancels any currently playing speech
 */
export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Checks if speech synthesis is supported in the current browser
 */
export function isSpeechSupported(): boolean {
  return 'speechSynthesis' in window;
} 