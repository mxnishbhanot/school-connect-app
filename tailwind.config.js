/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts,tsx,js,jsx}',
    './src/**/*.component.html',
    './src/**/*.page.html'
  ],
  safelist: [
    // Core backgrounds
    'bg-mint', 'bg-babyblue', 'bg-lightyellow',
    'bg-peach', 'bg-lavender', 'bg-accentpink',
    'bg-white', 'bg-success',

    // Text colors
    'text-textPrimary', 'text-textSecondary', 'text-white',
    'text-error', 'text-accentpink',

    // Layout utilities
    'min-h-screen', 'flex', 'items-center', 'justify-center',
    'w-full', 'max-w-md', 'space-y-2', 'space-y-6',
    'rounded-lg', 'rounded-2xl', 'rounded-full',

    // Sizing
    'w-20', 'h-20', 'h-12', 'p-4', 'p-8', 'mb-2', 'mb-4', 'mb-8', 'mt-1', 'mt-6', 'mt-8',

    // Borders
    'border-2', 'border-mint/30', 'border-error',

    // Shadows and animations
    'shadow-soft', 'shadow-pastel', 'animate-fadeIn',

    // Interactive states
    'hover:bg-success', 'transition-all', 'duration-300',

    // Typography
    'font-nunito', 'font-bold', 'font-semibold',
    'text-xs', 'text-sm', 'text-base', 'text-2xl', 'text-4xl',
    'text-center',

    // Flexbox
    'flex-col'
  ],
  theme: {
    extend: {
      colors: {
        // 🌈 Pastel Core Palette
        mint: '#A8E6CF',
        babyblue: '#B3E5FC',
        lightyellow: '#FFF9C4',
        peach: '#FFD3B6',
        lavender: '#CDB4F5',

        // 🎯 Accents / Actions
        accentpink: '#FF8B94',
        aqua: '#64D8CB',
        success: '#81C784',
        warning: '#FFD54F',
        error: '#FF6B6B',

        // 🖋 Semantic Text Colors
        textPrimary: '#333333',
        textSecondary: '#666666',
        textDisabled: '#B0BEC5',

        // 🎨 Background Helpers
        bgSoft: '#FDFDF6',

        // 🌑 Dark Theme
        darkbg: '#23272f',
        darkcard: '#2c313a',
        darktext: '#e3e3e3',
        darkaccent: '#FF8B94',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.08)',
        pastel: '0 4px 12px rgba(0,0,0,0.06)',
        glow: '0 0 12px rgba(255, 139, 148, 0.4)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      screens: {
        xs: '400px',
        '3xl': '1920px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%, 20%, 40%, 60%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out',
        slideUp: 'slideUp 0.6s ease-out',
        bounceIn: 'bounceIn 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
