import { useState, useEffect } from "react";
import type { Mood } from "@/components/MoodSelector";
import MoodSelector from "@/components/MoodSelector";
import QuoteCard from "@/components/QuoteCard";
import DateDisplay from "@/components/DateDisplay";
import { useToast } from "@/components/ui/use-toast";
import { generateQuote } from "@/utils/openai";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood>();
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [moodCounts, setMoodCounts] = useState<Record<Mood, number>>({
    happy: 0,
    energetic: 0,
    calm: 0,
    reflective: 0,
    sad: 0,
    stressed: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    const savedCounts = localStorage.getItem(`moodCounts_${todayKey}`);
    if (savedCounts) {
      setMoodCounts(JSON.parse(savedCounts));
    }
  }, []);

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    
    try {
      const newQuote = await generateQuote(mood);
      setQuote(newQuote);

      // Update mood counts
      const todayKey = new Date().toISOString().split('T')[0];
      const newMoodCounts = {
        ...moodCounts,
        [mood]: moodCounts[mood] + 1
      };
      setMoodCounts(newMoodCounts);
      localStorage.setItem(`moodCounts_${todayKey}`, JSON.stringify(newMoodCounts));

      toast({
        title: "Mood Selected",
        description: `Here's a quote to match your ${mood} mood.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate a quote. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className={`min-h-screen mood-gradient ${selectedMood ? `mood-${selectedMood}` : "bg-gradient-to-br from-gray-800 to-gray-900"}`}>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center gap-12">
        <DateDisplay clickCount={Object.values(moodCounts).reduce((a, b) => a + b, 0)} />
        
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          How are you feeling today?
        </h1>
        
        <MoodSelector 
          onMoodSelect={handleMoodSelect} 
          selectedMood={selectedMood} 
          moodCounts={moodCounts}
        />
        
        {quote && (
          <div className="animate-fadeIn">
            <QuoteCard quote={quote.quote} author={quote.author} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Index;