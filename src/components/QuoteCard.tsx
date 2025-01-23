import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: string;
  author: string;
  className?: string;
}

const QuoteCard = ({ quote, author, className }: QuoteCardProps) => {
  return (
    <Card 
      className={cn(
        "w-full max-w-lg backdrop-blur-sm neo-brutal",
        "animate-fade-in transition-all duration-500",
        "bg-background/40 dark:bg-background/20",
        className
      )}
    >
      <CardContent className="pt-6">
        <blockquote className="space-y-2">
          <p className="text-lg font-bold leading-relaxed text-foreground font-inter">{quote}</p>
          <footer className="text-sm font-bold text-muted-foreground font-inter">— {author}</footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;