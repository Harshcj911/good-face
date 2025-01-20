import { useState } from "react";
import type { Mood } from "@/components/MoodSelector";
import MoodSelector from "@/components/MoodSelector";
import QuoteCard from "@/components/QuoteCard";
import { useToast } from "@/components/ui/use-toast";

const quotes = {
  happy: [
    { quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { quote: "The most wasted of all days is one without laughter.", author: "E.E. Cummings" },
  ],
  energetic: [
    { quote: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  ],
  calm: [
    { quote: "Peace comes from within. Do not seek it without.", author: "Buddha" },
    { quote: "The calm mind brings inner strength and self-confidence.", author: "Dalai Lama" },
  ],
  reflective: [
    { quote: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou" },
    { quote: "The unexamined life is not worth living.", author: "Socrates" },
  ],
};

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood>();
  const { toast } = useToast();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    toast({
      title: "Mood Selected",
      description: `Here's a quote to match your ${mood} mood.`,
    });
  };

  const getRandomQuote = (mood: Mood) => {
    const moodQuotes = quotes[mood];
    const randomIndex = Math.floor(Math.random() * moodQuotes.length);
    return moodQuotes[randomIndex];
  };

  return (
    <main className={`min-h-screen mood-gradient ${selectedMood ? `mood-${selectedMood}` : "bg-gradient-to-br from-gray-100 to-gray-200"}`}>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center gap-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          How are you feeling today?
        </h1>
        
        <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />
        
        {selectedMood && (
          <div className="animate-fadeIn">
            <QuoteCard {...getRandomQuote(selectedMood)} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Index;