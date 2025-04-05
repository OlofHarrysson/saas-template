# Website

## TODO

- Fix the SEO tags images etc. Look at shipfast

## Setup

- Fill in the values in [src/app/site-config.ts](src/app/site-config.ts)
- Image and favicon
- Vercel
- Plausible

### Supabase

- Create a project in Supabase and copy the config values to .env.local
- Enable Google OAuth under Authentication (read next step)
- At the same time create a project in [Google Cloud](https://console.cloud.google.com/) and a new OAuth config. Authorized JavaScript origins=http://localhost:3000 and Authorized redirect URIs=http://localhost:3000/auth/callback and what Supabase OAuth provides e.g. https://fbucgqejoaejvmnhpjym.supabase.co/auth/v1/callback
- Fill in Client ID and Secret in Google Cloud
- In Supabase dashboard, go to Authentication then URL Configuration and add https://your-domain.com to Site URL. Then add https://your-domain.com/** and http://localhost:3000/** to Redirect URLs.
