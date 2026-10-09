# jayaram-app

Help and training for people looking for jobs and preparing for interviews.
Live at **https://jayaram.preparingforinterviews.com**

Plain HTML, CSS and JavaScript in the `public/` folder. No framework, no build step.
Pushing to the `master` branch publishes the site (about 1-2 minutes) once the repo is
connected to the Cloudflare Worker.

## Pages (left-hand buttons)

| Button | What it covers |
|---|---|
| Home | Welcome and the 4-step approach |
| Resume & Profile | Resume checklist, online profile tips |
| Interview Prep | Before/after checklist, STAR method |
| Practice Questions | Random behavioral, general and "questions to ask" with tips |
| Job Search | Weekly plan, where to look, staying motivated |

## Editing

- Text of each section: `public/index.html` (one `<section>` per button).
- Colours and layout: `public/style.css` (brand colours are at the top).
- Practice questions: the `QUESTIONS` list at the top of the practice part of `public/script.js`.

```bash
git clone https://github.com/jayaramcloud/jayaram-app.git
cd jayaram-app
# edit files in public/, then:
git add -A && git commit -m "my change" && git push
```

Optional local preview: `npx wrangler dev` (needs Node.js).
