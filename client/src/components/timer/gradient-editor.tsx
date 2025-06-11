import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Palette, RotateCcw, Plus, Trash2 } from "lucide-react";

export interface GradientStop {
    offset: number;
    color: string;
}

export interface GradientConfig {
    type: 'linear' | 'radial';
    stops: GradientStop[];
    direction?: string; // For linear gradients: "0deg", "90deg", etc.
}

interface GradientEditorProps {
    gradient: GradientConfig;
    onChange: (gradient: GradientConfig) => void;
    isOpen: boolean;
    onToggle: () => void;
}

// Predefined gradient presets
const GRADIENT_PRESETS: { name: string; gradient: GradientConfig }[] = [
    {
        name: "Cedar's Rainbow",
        gradient: {
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
        }
    },
    {
        name: "Sunset",
        gradient: {
            type: 'linear',
            direction: '45deg',
            stops: [
                { offset: 0, color: '#ff9a56' },
                { offset: 50, color: '#ff6b6b' },
                { offset: 100, color: '#4ecdc4' },
            ]
        }
    },
    {
        name: "Ocean",
        gradient: {
            type: 'linear',
            direction: '135deg',
            stops: [
                { offset: 0, color: '#667eea' },
                { offset: 100, color: '#764ba2' },
            ]
        }
    },
    {
        name: "Forest",
        gradient: {
            type: 'radial',
            stops: [
                { offset: 0, color: '#56ab2f' },
                { offset: 100, color: '#a8e6cf' },
            ]
        }
    }
];

export function GradientEditor({ gradient, onChange, isOpen, onToggle }: GradientEditorProps) {
    const [selectedStopIndex, setSelectedStopIndex] = useState(0);

    const addGradientStop = () => {
        const newOffset = gradient.stops.length > 0
            ? Math.min(100, Math.max(...gradient.stops.map(s => s.offset)) + 10)
            : 50;

        const newStop: GradientStop = {
            offset: newOffset,
            color: '#ff0000'
        };

        const newStops = [...gradient.stops, newStop].sort((a, b) => a.offset - b.offset);
        onChange({ ...gradient, stops: newStops });
    };

    const removeGradientStop = (index: number) => {
        if (gradient.stops.length <= 2) return; // Keep at least 2 stops

        const newStops = gradient.stops.filter((_, i) => i !== index);
        onChange({ ...gradient, stops: newStops });

        if (selectedStopIndex >= newStops.length) {
            setSelectedStopIndex(Math.max(0, newStops.length - 1));
        }
    };

    const updateGradientStop = (index: number, updates: Partial<GradientStop>) => {
        const newStops = gradient.stops.map((stop, i) =>
            i === index ? { ...stop, ...updates } : stop
        ).sort((a, b) => a.offset - b.offset);

        onChange({ ...gradient, stops: newStops });
    };

    const resetToDefault = () => {
        onChange(GRADIENT_PRESETS[0].gradient);
    };

    const generateGradientCss = (grad: GradientConfig): string => {
        const stopsString = grad.stops
            .map(stop => `${stop.color} ${stop.offset}%`)
            .join(', ');

        if (grad.type === 'radial') {
            return `radial-gradient(circle, ${stopsString})`;
        } else {
            const direction = grad.direction || '0deg';
            return `linear-gradient(${direction}, ${stopsString})`;
        }
    };

    if (!isOpen) {
        return (
            <Button
                onClick={onToggle}
                variant="outline"
                size="sm"
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
                <Palette className="h-4 w-4 mr-2" />
                Customize Colors
            </Button>
        );
    }

    return (
        <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Gradient Editor
                    </CardTitle>
                    <Button onClick={onToggle} variant="ghost" size="sm">
                        ×
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Live Preview */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Preview</Label>
                    <div
                        className="h-16 rounded-lg border-2 border-purple-200"
                        style={{ background: generateGradientCss(gradient) }}
                    />
                </div>

                <Tabs defaultValue="editor" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="presets">Presets</TabsTrigger>
                        <TabsTrigger value="editor">Custom</TabsTrigger>
                    </TabsList>

                    <TabsContent value="presets" className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                            {GRADIENT_PRESETS.map((preset, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="h-16 p-2 flex flex-col items-center justify-center"
                                    onClick={() => onChange(preset.gradient)}
                                >
                                    <div
                                        className="w-full h-8 rounded mb-1"
                                        style={{ background: generateGradientCss(preset.gradient) }}
                                    />
                                    <span className="text-xs">{preset.name}</span>
                                </Button>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="editor" className="space-y-4">
                        {/* Gradient Type */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Type</Label>
                            <div className="flex gap-2">
                                <Button
                                    variant={gradient.type === 'linear' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => onChange({ ...gradient, type: 'linear' })}
                                >
                                    Linear
                                </Button>
                                <Button
                                    variant={gradient.type === 'radial' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => onChange({ ...gradient, type: 'radial' })}
                                >
                                    Radial
                                </Button>
                            </div>
                        </div>

                        {/* Direction (for linear gradients) */}
                        {gradient.type === 'linear' && (
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Direction</Label>
                                <Input
                                    value={gradient.direction || '0deg'}
                                    onChange={(e) => onChange({ ...gradient, direction: e.target.value })}
                                    placeholder="0deg, 45deg, 90deg, etc."
                                    className="text-sm"
                                />
                            </div>
                        )}

                        {/* Color Stops */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Color Stops</Label>
                                <div className="flex gap-1">
                                    <Button
                                        onClick={addGradientStop}
                                        size="sm"
                                        variant="outline"
                                        className="h-6 w-6 p-0"
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        onClick={resetToDefault}
                                        size="sm"
                                        variant="outline"
                                        className="h-6 w-6 p-0"
                                        title="Reset to Cedar's Rainbow"
                                    >
                                        <RotateCcw className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {gradient.stops.map((stop, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 border rounded-lg bg-white">
                                        <input
                                            type="color"
                                            value={stop.color.startsWith('#') ? stop.color : '#ff0000'}
                                            onChange={(e) => updateGradientStop(index, { color: e.target.value })}
                                            className="w-8 h-8 rounded border cursor-pointer"
                                        />
                                        <Input
                                            value={stop.color}
                                            onChange={(e) => updateGradientStop(index, { color: e.target.value })}
                                            className="flex-1 text-xs"
                                            placeholder="Color (hex, hsl, etc.)"
                                        />
                                        <Input
                                            type="number"
                                            value={stop.offset}
                                            onChange={(e) => updateGradientStop(index, { offset: parseInt(e.target.value) || 0 })}
                                            className="w-16 text-xs"
                                            min="0"
                                            max="100"
                                        />
                                        <span className="text-xs text-gray-500">%</span>
                                        {gradient.stops.length > 2 && (
                                            <Button
                                                onClick={() => removeGradientStop(index)}
                                                size="sm"
                                                variant="ghost"
                                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
} 