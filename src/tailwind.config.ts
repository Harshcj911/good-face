import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        mood: {
          happy: {
            light: {
              bg: "#F97316",
              text: "#000000"
            },
            dark: {
              bg: "#FF8534",
              text: "#000000"
            }
          },
          calm: {
            light: {
              bg: "#D3E4FD",
              text: "#000000"
            },
            dark: {
              bg: "#90B8F8",
              text: "#000000"
            }
          },
          energetic: {
            light: {
              bg: "#8B5CF6",
              text: "#FFFFFF"
            },
            dark: {
              bg: "#A78BFA",
              text: "#000000"
            }
          },
          reflective: {
            light: {
              bg: "#7E69AB",
              text: "#FFFFFF"
            },
            dark: {
              bg: "#9F85D7",
              text: "#000000"
            }
          },
          sad: {
            light: {
              bg: "#1A1F2C",
              text: "#FFFFFF"
            },
            dark: {
              bg: "#2D3748",
              text: "#FFFFFF"
            }
          },
          stressed: {
            light: {
              bg: "#D946EF",
              text: "#FFFFFF"
            },
            dark: {
              bg: "#E879F9",
              text: "#000000"
            }
          }
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;