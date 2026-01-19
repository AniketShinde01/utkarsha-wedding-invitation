import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      colors: {
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          light: "hsl(var(--gold-light))",
          dark: "hsl(var(--gold-dark))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
          dark: "hsl(var(--cream-dark))",
        },
        maroon: "hsl(var(--maroon))",
        saffron: "hsl(var(--saffron))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        marathi: ["'Tiro Devanagari Marathi'", "serif"],
      },
		keyframes: {
			"accordion-down": {
				from: { height: "0" },
				to: { height: "var(--radix-accordion-content-height)" },
			},
			"accordion-up": {
				from: { height: "var(--radix-accordion-content-height)" },
				to: { height: "0" },
			},
			"fade-in-up": {
				"0%": { opacity: "0", transform: "translateY(40px) scale(0.95)" },
				"100%": { opacity: "1", transform: "translateY(0) scale(1)" },
			},
			"fade-out-up": {
				"0%": { opacity: "1", transform: "translateY(0) scale(1)" },
				"100%": { opacity: "0", transform: "translateY(-40px) scale(0.95)" },
			},
			"scale-in": {
				"0%": { opacity: "0", transform: "scale(0.5)" },
				"100%": { opacity: "1", transform: "scale(1)" },
			},
			shimmer: {
				"0%": { backgroundPosition: "-200% 0" },
				"100%": { backgroundPosition: "200% 0" },
			},
			float: {
				"0%, 100%": { transform: "translateY(0)" },
				"50%": { transform: "translateY(-10px)" },
			},
			"spin-slow": {
				"0%": { transform: "rotate(0deg)" },
				"100%": { transform: "rotate(360deg)" },
			},
			glow: {
				"0%, 100%": { textShadow: "0 0 20px hsla(38, 75%, 50%, 0.5)" },
				"50%": { textShadow: "0 0 40px hsla(38, 75%, 50%, 0.9)" },
			},
			"fade-in": {
				"0%": { opacity: "0" },
				"100%": { opacity: "1" },
			},
			"door-open-left": {
				"0%": { transform: "translateX(0) rotateY(0)" },
				"100%": { transform: "translateX(-100%) rotateY(-30deg)" },
			},
			"door-open-right": {
				"0%": { transform: "translateX(0) rotateY(0)" },
				"100%": { transform: "translateX(100%) rotateY(30deg)" },
			},
			"slide-up-fade": {
				"0%": { opacity: "0", transform: "translateY(30px)" },
				"100%": { opacity: "1", transform: "translateY(0)" },
			},
			"bounce-subtle": {
				"0%, 100%": { transform: "translateY(0)" },
				"50%": { transform: "translateY(-5px)" },
			},
		},
		animation: {
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
			"fade-in-up": "fade-in-up 0.8s ease-out forwards",
			"fade-out-up": "fade-out-up 0.6s ease-out forwards",
			"scale-in": "scale-in 0.6s ease-out forwards",
			shimmer: "shimmer 3s infinite linear",
			float: "float 3s ease-in-out infinite",
			"spin-slow": "spin-slow 8s linear infinite",
			glow: "glow 2s ease-in-out infinite",
			"fade-in": "fade-in 0.5s ease-out forwards",
			"door-open-left": "door-open-left 2.5s ease-in-out forwards",
			"door-open-right": "door-open-right 2.5s ease-in-out forwards",
			"slide-up-fade": "slide-up-fade 0.6s ease-out forwards",
			"bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
		},
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
