# Website

## TODOs

- Verify that the open graph icon stuff works
- Stripe when I've got it working on some other site
- Resend? Setup readme and appwrite integration readme next time I create a domain
- Fix this next time you setup a domain. See https://shipfa.st/docs/features/emails
- Refactor the rules into a docs folder?

## Setup

- Fill in the values in [src/app/site-config.ts](src/app/site-config.ts)
- Fill in the domain in [next-sitemap.config.js](next-sitemap.config.js)
- Change the name in [package.json](package.json)
- Change .cursorrules to describe your project

### Icon Setup

- Create a single PNG icon (512x512px) and place in public/icon.png
- Will be used for modern browsers and as source for favicon
- Duplicate and crop your icon to maximize the size of the logo. Create a favicon with e.g. [favicon.io](https://favicon.io/) and place under src/app/favico.ico

- Create an Open Graph image (1200x630px) and place it in public directory as public/og-image.png

### Terms of Service + Privacy Policy

Go to /privacy/page.tsx and terms/page.tsx and use cursor to create the real TOS by adding some relevant files into the prompt.

### Vercel Deployment

**Initiate Setup:**

```bash
cd git/root
vercel login
vercel
# Answer questions and specify ./website for code dir
```

Follow the CLI prompts.

**Configure on Vercel Dashboard:**

- Add git repository. Remove notifications e.g. Pull Request Comments
- Add env variables
- Add domain, use www. as canoical version

### Resend / Emails

Also need to check appwrite integration

And create some nice template for login emails and forgot password - maybe use the tulipsocial one?

### Plausible

Go to the website and add your domain. We're configuring the settings through code so just press continue.

### Google cloud

- Go to [https://search.google.com/search-console](https://search.google.com/search-console) and add a domain. Add a txt record with blank host.
- Submit your sitemaps and request indexing on important pages.
