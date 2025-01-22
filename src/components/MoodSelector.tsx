import { Button } from "@/components/ui/button";
import { Smile, Coffee, Heart, Brain, Frown, AlertCircle } from "lucide-react";

export type Mood = "happy" | "energetic" | "calm" | "reflective" | "sad" | "stressed";

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood?: Mood;
  moodCounts: Record<Mood, number>;
  isLoading?: boolean;
}

const moods = [
  { type: "happy", icon: Smile, label: "Happy" },
  { type: "energetic", icon: Coffee, label: "Energetic" },
  { type: "calm", icon: Heart, label: "Calm" },
  { type: "reflective", icon: Brain, label: "Reflective" },
  { type: "sad", icon: Frown, label: "Sad" },
  { type: "stressed", icon: AlertCircle, label: "Stressed" },
] as const;

const MoodSelector = ({ onMoodSelect, selectedMood, moodCounts, isLoading }: MoodSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {moods.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          variant="outline"
          className={`
            flex flex-col gap-2 h-auto p-4 min-w-[120px] relative neo-brutal
            transition-colors duration-300
            ${selectedMood === type ? `mood-${type}` : 'bg-background text-foreground'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => !isLoading && onMoodSelect(type)}
          disabled={isLoading}
        >
          <Icon className="w-6 h-6" />
          <span className="font-bold">{label}</span>
          <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs px-2 py-1 rounded-full font-bold">
            {moodCounts[type]}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;