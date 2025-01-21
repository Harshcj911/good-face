import { format } from "date-fns";

interface DateDisplayProps {
  clickCount: number;
}

const DateDisplay = ({ clickCount }: DateDisplayProps) => {
  const today = new Date();
  
  return (
    <div className="text-center mb-8 space-y-2 bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20">
      <h2 className="text-2xl font-semibold">
        {format(today, "EEEE, MMMM do, yyyy")}
      </h2>
      <p className="text-muted-foreground">
        {clickCount} people have shared their mood today
      </p>
    </div>
  );
};

export default DateDisplay;