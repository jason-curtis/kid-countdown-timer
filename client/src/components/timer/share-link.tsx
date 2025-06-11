import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareLinkProps {
    timerPurpose: string;
    endTimeString: string;
}

/**
 * Converts "HH:MM" format to URL-friendly format (removes colon)
 * Example: "07:30" -> "730", "14:30" -> "1430"
 */
function formatTimeForUrl(timeString: string): string {
    return timeString.replace(':', '');
}

export function ShareLink({ timerPurpose, endTimeString }: ShareLinkProps) {
    const [isCopied, setIsCopied] = useState(false);
    const { toast } = useToast();

    const timeForUrl = formatTimeForUrl(endTimeString);
    const baseUrl = window.location.origin + import.meta.env.BASE_URL;
    const shareUrl = `${baseUrl}${timerPurpose}/${timeForUrl}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setIsCopied(true);
            toast({
                title: "Link copied!",
                description: "The timer link has been copied to your clipboard.",
            });

            // Reset the copied state after 2 seconds
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
            toast({
                title: "Copy failed",
                description: "Unable to copy link to clipboard. Please copy manually.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Link className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Share this timer</span>
                </div>

                <div className="flex gap-2">
                    <Input
                        value={shareUrl}
                        readOnly
                        className="text-xs bg-white border-blue-200 text-blue-700"
                        onClick={(e) => e.currentTarget.select()}
                    />
                    <Button
                        onClick={copyToClipboard}
                        size="sm"
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-100 shrink-0"
                    >
                        {isCopied ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                <p className="text-xs text-blue-600 mt-2">
                    Anyone with this link will get a timer set for {timerPurpose} at {endTimeString}
                </p>
            </CardContent>
        </Card>
    );
} 