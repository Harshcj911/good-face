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
  const [isLoading, setIsLoading] = useState(false);
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
    if (isLoading) return;
    
    setIsLoading(true);
    setSelectedMood(mood);
    
    try {
      const newQuote = await generateQuote(mood);
      setQuote(null);
      setTimeout(() => setQuote(newQuote), 100);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="container max-w-6xl mx-auto bg-white rounded-2xl p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <DateDisplay clickCount={Object.values(moodCounts).reduce((a, b) => a + b, 0)} />
          
          <div className="space-y-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              How are you feeling today?
            </h1>
            <p className="text-lg text-muted-foreground">
              Select your mood and receive a personalized quote
            </p>
          </div>
          
          <MoodSelector 
            onMoodSelect={handleMoodSelect} 
            selectedMood={selectedMood} 
            moodCounts={moodCounts}
            isLoading={isLoading}
          />
          
          {quote && (
            <div className="w-full flex justify-center animate-fadeIn">
              <QuoteCard quote={quote.quote} author={quote.author} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Index;