// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightContextualMenu from 'starlight-contextual-menu';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sznuper.com',

  integrations: [
      starlight({
          plugins: [starlightContextualMenu({
              actions: ['copy', 'view', 'chatgpt', 'claude'],
          })],
          title: 'sznuper',
          logo: {
              src: './src/assets/logo.svg',
          },
          social: [
              { icon: 'github', label: 'GitHub', href: 'https://github.com/sznuper/sznuper' },
          ],
          customCss: ['./src/styles/global.css', './src/styles/custom.css'],
          editLink: {
              baseUrl: 'https://github.com/sznuper/sznuper.com/edit/main/',
          },
          sidebar: [
              {
                  label: 'Start Here',
                  items: [
                      { label: 'Getting Started', slug: 'getting-started' },
                  ],
              },
              {
                  label: 'Reference',
                  autogenerate: { directory: 'reference' },
              },
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});