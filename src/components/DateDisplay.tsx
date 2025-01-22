import { format } from "date-fns";

interface DateDisplayProps {
  clickCount: number;
}

const DateDisplay = ({ clickCount }: DateDisplayProps) => {
  const today = new Date();
  
  return (
    <div className="text-center mb-8 space-y-2 bg-white neo-brutal p-6">
      <h2 className="text-2xl font-bold">
        {format(today, "EEEE, MMMM do, yyyy")}
      </h2>
      <p className="text-muted-foreground font-medium">
        {clickCount} people have shared their mood today
      </p>
    </div>
  );
};

export default DateDisplay;