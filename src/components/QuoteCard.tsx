import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: string;
  author: string;
  className?: string;
}

const QuoteCard = ({ quote, author, className }: QuoteCardProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTypingComplete(false);
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < quote.length) {
        setDisplayedText(prev => prev + quote[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 50); // Adjust typing speed here (lower = faster)

    return () => clearInterval(typingInterval);
  }, [quote]);

  return (
    <Card 
      className={cn(
        "w-full max-w-lg bg-white border border-gray-200",
        "transition-all duration-500 hover:shadow-lg",
        "neo-brutal",
        className
      )}
    >
      <CardContent className="p-8">
        <blockquote className="space-y-3">
          <p className="text-xl font-medium leading-relaxed text-foreground">
            "{displayedText}"
            <span className={`inline-block w-0.5 h-5 ml-1 bg-foreground ${isTypingComplete ? 'animate-pulse' : 'animate-blink'}`} />
          </p>
          <footer className={cn(
            "text-sm text-muted-foreground font-medium transition-opacity duration-300",
            isTypingComplete ? "opacity-100" : "opacity-0"
          )}>
            — {author}
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;