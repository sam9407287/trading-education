/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 暗色主題
        'bg-primary': '#0a0e17',
        'bg-secondary': '#111827',
        'bg-card': '#1a1f2e',
        
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        
        'accent-gold': '#f59e0b',
        'accent-gold-light': '#fbbf24',
        'accent-green': '#10b981',
        'accent-red': '#ef4444',
        'accent-blue': '#3b82f6',
        'accent-purple': '#8b5cf6',
        
        'border-color': '#1e293b',
        'border-light': '#334155',
      },
    },
  },
  plugins: [],
};

