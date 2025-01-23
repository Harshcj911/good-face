import { format } from "date-fns";

interface DateDisplayProps {
  clickCount: number;
}

const DateDisplay = ({ clickCount }: DateDisplayProps) => {
  const today = new Date();
  
  return (
    <div className="text-center space-y-2 bg-background/40 dark:bg-background/20 neo-brutal p-6 rounded-xl">
      <h2 className="text-2xl font-bold font-inter">
        {format(today, "EEEE, MMMM do, yyyy")}
      </h2>
      <p className="text-muted-foreground font-medium">
        {clickCount} people have shared their mood today
      </p>
    </div>
  );
};

export default DateDisplay;