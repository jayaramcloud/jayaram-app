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

## AI career coach ("Ask the AI" box on Practice Questions)

The box calls `POST /api/ask`, handled by the Cloudflare Worker in `src/worker.js`, which calls
the Claude API. **The API key is never stored in this repo.** It is a Worker secret:

```bash
npx wrangler secret put ANTHROPIC_API_KEY   # paste the key when prompted
```

There are two places to ask: the small box on Practice Questions, and the full chat page
**`/ask`** (`public/ask.html`, `ask.css`, `ask.js`) with example questions and follow-up
conversation. Replies are shown with a small safe markdown renderer (`public/markdown.js`: bold, italic, lists; it builds DOM nodes and never uses `innerHTML`). Conversations are kept only in the visitor's browser memory.

Until the secret is set, the box shows "The AI helper is not switched on yet."
Model is set by `CLAUDE_MODEL` in `wrangler.jsonc`. Built-in limits: 600 characters per question,
450 output tokens, last 6 messages of context, 8 questions per visitor per 10 minutes, 300 questions per day. Also set a monthly
spend limit on the key in the Anthropic console.

## Day 8 page (`/day8`)

`public/day8.html` + `day8.css`: a guide to how the chatbot was built, with an SVG architecture
diagram (browser, Cloudflare Worker, secret key, Claude API), a request walkthrough, build steps,
safety controls and honest limits. Linked from the left menu as "Day 8: Chatbot".

Optional local preview: `npx wrangler dev` (needs Node.js).

Never commit passwords, tokens or API keys: this repo is public.
