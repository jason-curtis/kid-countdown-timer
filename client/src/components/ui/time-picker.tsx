import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

interface TimePickerProps {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
}

export function TimePicker({
  className,
  onChange,
  value,
  label,
  description,

}: TimePickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleIncrement = () => {
    if (!inputRef.current) return;
    
    const [hours, minutes] = inputRef.current.value.split(':').map(Number);
    
    // Add 5 minutes
    let newMinutes = minutes + 5;
    let newHours = hours;
    
    if (newMinutes >= 60) {
      newMinutes = newMinutes % 60;
      newHours = (newHours + 1) % 24;
    }
    
    const newValue = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    inputRef.current.value = newValue;
    onChange(newValue);
  };

  const handleDecrement = () => {
    if (!inputRef.current) return;
    
    const [hours, minutes] = inputRef.current.value.split(':').map(Number);
    
    // Subtract 5 minutes
    let newMinutes = minutes - 5;
    let newHours = hours;
    
    if (newMinutes < 0) {
      newMinutes = 60 + newMinutes;
      newHours = (newHours - 1 + 24) % 24;
    }
    
    const newValue = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    inputRef.current.value = newValue;
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-1", className)}>
      {label && <div className="text-sm font-medium">{label}</div>}
      <div className="flex items-center justify-between bg-muted rounded-xl p-2 md:p-3 lg:p-4">
        <Button 
          type="button"
          variant="default"
          size="icon"
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg text-white hover:bg-[hsl(339,100%,65%)]"
          style={{ backgroundColor: "hsl(339, 100%, 75%)" }}
          onClick={handleDecrement}
          aria-label="Decrease time"
        >
          <Minus className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </Button>
        
        <div className="text-center">
          <Input
            ref={inputRef}
            type="time"
            className="text-center bg-transparent text-xl md:text-2xl lg:text-3xl font-semibold w-32 md:w-40 lg:w-48 focus:outline-none border-none"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          />
          {description && (
            <div className="text-xs md:text-sm lg:text-base mt-1 md:mt-2 text-foreground opacity-70">{description}</div>
          )}
        </div>
        
        <Button 
          type="button"
          variant="default"
          size="icon"
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg text-white hover:bg-[hsl(339,100%,65%)]"
          style={{ backgroundColor: "hsl(339, 100%, 75%)" }}
          onClick={handleIncrement}
          aria-label="Increase time"
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </Button>
      </div>
    </div>
  );
}
