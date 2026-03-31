/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../shared/**/*.{js,jsx,ts,tsx}" // only if you render shared components/types in UI
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#101215",
        steel: "#23272b",
        brushsteel: "#383c44",
        graphite: "#181a1b",
        accent: "#77aaff",
        muted: "#1f232a",
        radiance: "#313540",
        logo: "#7d8bb1",
        contentGray: "#babdc2",
        sectionBg: "rgba(30,34,40,0.96)",
        borderGray: "#242628"
      },
      fontFamily: {
        corporate: ["Inter", "ui-sans-serif", "system-ui"],
        fancy: ["Montserrat", "ui-sans-serif"]
      },
      boxShadow: {
        steel: "0 2px 20px rgba(60,66,77,0.22)"
      },
      backgroundImage: {
        "geometric-abstract":
          "repeating-linear-gradient(135deg, #23272b 0, #383c44 40%, transparent 47%, rgba(34,36,40,0.55) 100%)"
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        }
      }
    }
  },
  plugins: []
};
