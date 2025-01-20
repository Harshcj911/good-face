import { Button } from "@/components/ui/button";
import { Smile, Coffee, Heart, Brain, Frown, AlertCircle } from "lucide-react";

export type Mood = "happy" | "energetic" | "calm" | "reflective" | "sad" | "stressed";

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood?: Mood;
  moodCounts: Record<Mood, number>;
}

const moods = [
  { type: "happy", icon: Smile, label: "Happy" },
  { type: "energetic", icon: Coffee, label: "Energetic" },
  { type: "calm", icon: Heart, label: "Calm" },
  { type: "reflective", icon: Brain, label: "Reflective" },
  { type: "sad", icon: Frown, label: "Sad" },
  { type: "stressed", icon: AlertCircle, label: "Stressed" },
] as const;

const MoodSelector = ({ onMoodSelect, selectedMood, moodCounts }: MoodSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {moods.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          variant={selectedMood === type ? "default" : "outline"}
          className="flex flex-col gap-2 h-auto p-4 min-w-[100px] relative"
          onClick={() => onMoodSelect(type)}
        >
          <Icon className="w-6 h-6" />
          <span>{label}</span>
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            {moodCounts[type]}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;