import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  env: { schema: {
    PUBLIC_POSTHOG_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
    PUBLIC_ANALYTICS_ENABLED: envField.boolean({ context: 'client', access: 'public', default: false }),
  } },
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
