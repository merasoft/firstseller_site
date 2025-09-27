/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Основная зеленая палитра
        primary: {
          50: '#ecfdf5', // Eng ochiq yashil
          100: '#d1fae5', // Очень светлый
          200: '#a7f3d0', // Ochiq
          300: '#6ee7b7', // O'rtacha ochiq
          400: '#34d399', // O'rtacha
          500: '#10b981', // Asosiy brand rangi
          600: '#059669', // Quyuqroq
          700: '#047857', // Quyuq
          800: '#065f46', // Очень темный
          900: '#064e3b', // Eng quyuq
        },

        // Дополнительные цвета
        secondary: {
          500: '#06b6d4', // Turkuaz
          600: '#0891b2',
          700: '#0e7490',
        },

        accent: {
          orange: '#f97316', // Для скидок
          red: '#ef4444', // Sale uchun
          yellow: '#eab308', // Diqqat uchun
          blue: '#3b82f6', // Info uchun
        },

        // Градиентные цвета
        gradient: {
          'green-light': '#ecfdf5',
          'green-dark': '#065f46',
          eco: '#22c55e',
          nature: '#16a34a',
        },

        // Status ranglar
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',

        // Matn ranglari
        text: {
          primary: '#064e3b',
          secondary: '#065f46',
          muted: '#6b7280',
          light: '#9ca3af',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },

      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      boxShadow: {
        green: '0 4px 14px 0 rgba(16, 185, 129, 0.2)',
        'green-lg': '0 10px 25px -3px rgba(16, 185, 129, 0.3)',
        soft: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        hover: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-green': 'pulseGreen 2s infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
        },
      },
    },
  },
  plugins: [],
};
