export default defineConfig({
  base: './',
  plugins: [react()],
  // server proxy development के लिए है, production में काम नहीं आएगा
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
