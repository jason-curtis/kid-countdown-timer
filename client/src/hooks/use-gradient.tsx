import { useState, useEffect } from "react";
import { GradientConfig } from "@/components/timer/gradient-editor";

const GRADIENT_STORAGE_KEY = 'timer_gradient_config';

// Default gradient (Cedar's Rainbow)
const DEFAULT_GRADIENT: GradientConfig = {
    type: 'linear',
    direction: '0deg',
    stops: [
        { offset: 0, color: 'hsl(280 100% 75%)' },
        { offset: 18, color: 'hsl(0 100% 65%)' },
        { offset: 25, color: 'hsl(305, 100%, 36%)' },
        { offset: 37, color: 'hsl(339 0% 70%)' },
        { offset: 43, color: 'hsl(330 100% 50%)' },
        { offset: 50, color: 'hsl(54 100% 60%)' },
        { offset: 60, color: 'hsl(30 100% 40%)' },
        { offset: 70, color: 'hsl(30 100% 60%)' },
        { offset: 80, color: 'hsl(95 50% 60%)' },
        { offset: 90, color: 'hsl(240 80% 60%)' },
        { offset: 100, color: 'hsl(180 80% 60%)' },
    ]
};

export function useGradient() {
    const [gradient, setGradient] = useState<GradientConfig>(() => {
        try {
            const saved = localStorage.getItem(GRADIENT_STORAGE_KEY);
            return saved ? JSON.parse(saved) : DEFAULT_GRADIENT;
        } catch (error) {
            console.error('Error loading gradient from localStorage:', error);
            return DEFAULT_GRADIENT;
        }
    });

    // Save to localStorage whenever gradient changes
    useEffect(() => {
        try {
            localStorage.setItem(GRADIENT_STORAGE_KEY, JSON.stringify(gradient));
        } catch (error) {
            console.error('Error saving gradient to localStorage:', error);
        }
    }, [gradient]);

    const resetToDefault = () => {
        setGradient(DEFAULT_GRADIENT);
    };

    return {
        gradient,
        setGradient,
        resetToDefault
    };
} 