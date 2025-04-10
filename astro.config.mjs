import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',  // Cambiado de 'static' a 'server'
  adapter: node({
    mode: 'standalone'  // Modo para ejecutar como servidor independiente
  }),
  integrations: [
    tailwind(),
    react()
  ]
});