import { Button } from "@/components/ui/button";
import { Smile, Coffee, Heart, Brain } from "lucide-react";

export type Mood = "happy" | "energetic" | "calm" | "reflective";

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

const moods = [
  { type: "happy", icon: Smile, label: "Happy" },
  { type: "energetic", icon: Coffee, label: "Energetic" },
  { type: "calm", icon: Heart, label: "Calm" },
  { type: "reflective", icon: Brain, label: "Reflective" },
] as const;

const MoodSelector = ({ onMoodSelect, selectedMood }: MoodSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {moods.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          variant={selectedMood === type ? "default" : "outline"}
          className="flex flex-col gap-2 h-auto p-4 min-w-[100px]"
          onClick={() => onMoodSelect(type)}
        >
          <Icon className="w-6 h-6" />
          <span>{label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;