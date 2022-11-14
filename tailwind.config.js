/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'stickyNoteBlue': '#dcf5f5',
        'stickyNoteBeige': '#f5f5dc',
        'stickyNoteLila': '#f5dcf5',
      }
    },
  },
  plugins: [],
}
