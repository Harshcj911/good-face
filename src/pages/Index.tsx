import { useState, useEffect } from "react";
import type { Mood } from "@/components/MoodSelector";
import MoodSelector from "@/components/MoodSelector";
import QuoteCard from "@/components/QuoteCard";
import DateDisplay from "@/components/DateDisplay";
import { useToast } from "@/components/ui/use-toast";
import { quotes } from "@/data/quotes";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood>();
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  const [usedQuotes, setUsedQuotes] = useState<Set<string>>(new Set());
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
    // Reset used quotes at the start of each day
    const lastResetDate = localStorage.getItem('lastResetDate');
    if (lastResetDate !== todayKey) {
      setUsedQuotes(new Set());
      localStorage.setItem('lastResetDate', todayKey);
    } else {
      const savedUsedQuotes = localStorage.getItem('usedQuotes');
      if (savedUsedQuotes) {
        setUsedQuotes(new Set(JSON.parse(savedUsedQuotes)));
      }
    }
  }, []);

  const getRandomQuote = (mood: Mood) => {
    const moodQuotes = quotes.filter(q => q.mood === mood);
    const availableQuotes = moodQuotes.filter(q => !usedQuotes.has(q.quote));
    
    if (availableQuotes.length === 0) {
      // If all quotes for this mood have been used, reset the used quotes for this mood
      const newUsedQuotes = new Set(usedQuotes);
      moodQuotes.forEach(q => newUsedQuotes.delete(q.quote));
      setUsedQuotes(newUsedQuotes);
      localStorage.setItem('usedQuotes', JSON.stringify(Array.from(newUsedQuotes)));
      return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
    }
    
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    const newUsedQuotes = new Set(usedQuotes).add(randomQuote.quote);
    setUsedQuotes(newUsedQuotes);
    localStorage.setItem('usedQuotes', JSON.stringify(Array.from(newUsedQuotes)));
    return randomQuote;
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    const selectedQuote = getRandomQuote(mood);
    setQuote(selectedQuote);

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
  };

  return (
    <main className={`min-h-screen mood-gradient ${selectedMood ? `mood-${selectedMood}` : "bg-gradient-to-br from-gray-800 to-gray-900"}`}>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center gap-12">
        <div className="animate-fade-in">
          <DateDisplay clickCount={Object.values(moodCounts).reduce((a, b) => a + b, 0)} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white animate-fade-in">
          How are you feeling today?
        </h1>
        
        <div className="animate-fade-in delay-100">
          <MoodSelector 
            onMoodSelect={handleMoodSelect} 
            selectedMood={selectedMood} 
            moodCounts={moodCounts}
          />
        </div>
        
        {quote && (
          <div className="animate-scale-in">
            <QuoteCard quote={quote.quote} author={quote.author} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Index;