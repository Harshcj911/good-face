interface Quote {
  quote: string;
  author: string;
  mood: 'happy' | 'energetic' | 'calm' | 'reflective' | 'sad' | 'stressed';
}

export const quotes: Quote[] = [
  {
    quote: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    mood: "happy"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    mood: "energetic"
  },
  {
    quote: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    mood: "calm"
  },
  {
    quote: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    mood: "reflective"
  },
  {
    quote: "The pain you feel today is the strength you feel tomorrow.",
    author: "Anonymous",
    mood: "sad"
  },
  {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    mood: "stressed"
  },
  // Add more quotes for each mood to ensure variety
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    mood: "happy"
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    mood: "energetic"
  }
];