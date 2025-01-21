import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: string;
  author: string;
  className?: string;
}

const QuoteCard = ({ quote, author, className }: QuoteCardProps) => {
  return (
    <Card className={cn(
      "w-full max-w-lg bg-white/80 backdrop-blur-sm transform transition-all duration-300 hover:scale-105",
      className
    )}>
      <CardContent className="pt-6">
        <blockquote className="space-y-2">
          <p className="text-lg font-medium leading-relaxed">{quote}</p>
          <footer className="text-sm text-muted-foreground">— {author}</footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;