import { format } from "date-fns";

interface DateDisplayProps {
  clickCount: number;
}

const DateDisplay = ({ clickCount }: DateDisplayProps) => {
  const today = new Date();
  
  return (
    <div className="text-center space-y-3 bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-2xl font-semibold tracking-tight">
        {format(today, "EEEE, MMMM do, yyyy")}
      </h2>
      <p className="text-muted-foreground">
        {clickCount} people have shared their mood today
      </p>
    </div>
  );
};

export default DateDisplay;