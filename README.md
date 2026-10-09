# jayaram-app

Help and training for people looking for jobs and preparing for interviews.
Live at **https://jayaram.preparingforinterviews.com**

Plain HTML, CSS and JavaScript in the `public/` folder. No framework, no build step.
Pushing to the `master` branch publishes the site (usually under a minute).

## Pages (left-hand buttons)

| Button | What it covers |
|---|---|
| Home | Welcome, who it is for, how to use the site, "Book a session" box |
| Resume & Profile | Checklist, writing strong bullets, career changers and gaps, online profile |
| Interview Prep | Before/day-of/after checklists, STAR method with example, technical interview tips |
| Practice Questions | 40 random questions (behavioral, general, technical IT, questions to ask) with tips |
| Job Search | Weekly plan, application tracker, where to look, networking, offers |

## Editing

- Section text: `public/index.html` (one `<section>` per button).
- Colours and layout: `public/style.css` (brand colours are at the top).
- Practice questions: the `QUESTIONS` lists in `public/script.js`. Add `{ q: "...", tip: "..." }` entries.
- **TODO:** add your real contact email / LinkedIn / booking link in the "Book a session" box on the Home section (search for `TODO` in `index.html`).

```bash
git clone https://github.com/jayaramcloud/jayaram-app.git
cd jayaram-app
# edit files in public/, then:
git add -A && git commit -m "my change" && git push
```

Optional local preview: `npx wrangler dev` (needs Node.js).

Never commit passwords, tokens or API keys: this repo is public.
