import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  root: './src',
  server: {
    host: '0.0.0.0', 
    port: 3000 
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/index.html'),
        iceCreamGame: resolve(__dirname, './src/icecreamgame/index.html'),
        spaceObstacleGame: resolve(__dirname, './src/spaceobstaclegame/index.html'),
        topDownCarGame: resolve(__dirname, './src/topdowncargame/index.html'),
        pingPongGame: resolve(__dirname, './src/pingpong/index.html'),
        
      },
    },
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
  },
});