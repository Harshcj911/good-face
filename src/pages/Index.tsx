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
  const { toast } = useToast();

  useEffect(() => {
    // Load click count from localStorage on component mount
    const todayKey = new Date().toISOString().split('T')[0];
    const savedCount = localStorage.getItem(`clickCount_${todayKey}`);
    if (savedCount) {
      setClickCount(parseInt(savedCount, 10));
    }
  }, []);

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    
    try {
      // Generate new quote
      const newQuote = await generateQuote(mood);
      setQuote(newQuote);

      // Update click count
      const todayKey = new Date().toISOString().split('T')[0];
      const newCount = clickCount + 1;
      setClickCount(newCount);
      localStorage.setItem(`clickCount_${todayKey}`, newCount.toString());

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
    <main className={`min-h-screen mood-gradient ${selectedMood ? `mood-${selectedMood}` : "bg-gradient-to-br from-gray-100 to-gray-200"}`}>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center gap-12">
        <DateDisplay clickCount={clickCount} />
        
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          How are you feeling today?
        </h1>
        
        <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />
        
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