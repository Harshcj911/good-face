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
      "w-full max-w-lg bg-white neo-brutal",
      "transition-transform duration-200",
      className
    )}>
      <CardContent className="pt-6">
        <blockquote className="space-y-2">
          <p className="text-lg font-bold leading-relaxed text-black">{quote}</p>
          <footer className="text-sm font-bold text-gray-700">— {author}</footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;