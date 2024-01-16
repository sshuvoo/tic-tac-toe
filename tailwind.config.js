/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         animation: {
            'draw-o': 'svgdrawO 0.3s linear forwards',
            'draw-x': 'svgdrawX 0.15s linear forwards',
            'draw-x-line': 'lineX 0.5s linear forwards',
            'draw-y-line': 'lineY 0.5s linear forwards',
         },
         keyframes: {
            svgdrawO: {
               '0%': { strokeDashoffset: '301.635' },
               '100%': { strokeDashoffset: '0' },
            },
            svgdrawX: {
               '0%': { strokeDashoffset: '135.764' },
               '100%': { strokeDashoffset: '0' },
            },
            lineX: {
               '0%': { width: '0px' },
               '100%': { width: '100%' },
            },
            lineY: {
               '0%': { height: '0px' },
               '100%': { height: '100%' },
            },
         },
      },
   },
   plugins: [],
};
