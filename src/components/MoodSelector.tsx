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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {moods.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          variant="outline"
          className={`
            relative h-auto py-6 px-4 flex flex-col items-center gap-3
            transition-all duration-300 hover:scale-105
            ${selectedMood === type ? `mood-${type} shadow-lg` : 'bg-white hover:bg-gray-50'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            border border-gray-200 rounded-xl
          `}
          onClick={() => !isLoading && onMoodSelect(type)}
          disabled={isLoading}
        >
          <Icon className="w-8 h-8" />
          <span className="font-medium">{label}</span>
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
            {moodCounts[type]}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;