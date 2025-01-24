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
        "w-full max-w-lg bg-white border border-gray-200",
        "transition-all duration-500 hover:shadow-lg",
        className
      )}
    >
      <CardContent className="p-8">
        <blockquote className="space-y-3">
          <p className="text-xl font-medium leading-relaxed text-foreground">
            "{quote}"
          </p>
          <footer className="text-sm text-muted-foreground font-medium">
            — {author}
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;