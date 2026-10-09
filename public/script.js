// Runs in the visitor's browser.

// ---------- Left navigation: show one panel at a time ----------
const navButtons = document.querySelectorAll("button.nav-btn");
const panels = document.querySelectorAll(".panel");

function showPanel(id) {
  let found = false;
  panels.forEach((p) => {
    const match = p.id === id;
    p.classList.toggle("active", match);
    if (match) found = true;
  });
  if (!found) return false;
  navButtons.forEach((b) => b.classList.toggle("active", b.dataset.target === id));
  return true;
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.target;
    if (showPanel(id)) {
      history.replaceState(null, "", "#" + id);
      window.scrollTo(0, 0);
    }
  });
});

// Open the section named in the URL, e.g. /#prep
if (location.hash) showPanel(location.hash.slice(1));

// ---------- Practice questions ----------
// Edit these lists to add your own questions and tips.
const QUESTIONS = {
  behavioral: [
    { q: "Tell me about a time you faced a difficult problem at work. What did you do?",
      tip: "Use STAR. Spend most of your time on the Action and the Result." },
    { q: "Describe a time you disagreed with a coworker. How did you handle it?",
      tip: "Show respect and listening. End with a positive outcome or a lesson learned." },
    { q: "Tell me about a mistake you made and what you learned from it.",
      tip: "Pick a real but small mistake. Focus on what you changed afterwards." },
    { q: "Give an example of a time you met a tight deadline.",
      tip: "Explain how you prioritized, and any help you asked for." },
    { q: "Tell me about a time you had to learn something new quickly.",
      tip: "Describe how you learned (docs, courses, asking people) and what you delivered." },
    { q: "Describe a time you helped a teammate who was struggling.",
      tip: "Shows teamwork. Be specific about what you did and the effect on the team." },
    { q: "Tell me about a time you received critical feedback.",
      tip: "Show you listened without getting defensive and made a real change." },
    { q: "Give an example of when you took the lead without being asked.",
      tip: "Pick a moment where you saw a gap and acted. Keep the credit shared with the team." },
    { q: "Describe a time you had to handle several priorities at once.",
      tip: "Explain how you decided what came first and how you communicated it." },
    { q: "Tell me about a time something went wrong in production or on a project. What was your role?",
      tip: "Stay calm in the telling: detect, fix, communicate, and prevent it happening again." },
  ],
  general: [
    { q: "Tell me about yourself.",
      tip: "Keep it to about 90 seconds: present role, key past experience, why you want this job." },
    { q: "Why do you want to work here?",
      tip: "Mention something specific about the company, then connect it to your skills." },
    { q: "What are your strengths and weaknesses?",
      tip: "Give a strength with proof. Give a real weakness and how you are improving it." },
    { q: "Where do you see yourself in five years?",
      tip: "Show ambition to grow while staying relevant to the role you are applying for." },
    { q: "Why are you leaving your current job?",
      tip: "Stay positive. Talk about what you are moving toward, not what you dislike." },
    { q: "Why should we hire you?",
      tip: "Match your top two or three strengths directly to what the job needs." },
    { q: "What motivates you at work?",
      tip: "Give an honest answer backed by a short example." },
    { q: "How do you handle stress and pressure?",
      tip: "Share a practical habit, such as planning, breaking work down or asking for help early." },
    { q: "There is a gap in your resume. Can you explain it?",
      tip: "Be brief and honest, then move to what you learned or did and what you are ready to do now." },
    { q: "What salary are you expecting?",
      tip: "Research the market first. Give a range, and say you are open to discussing the full package." },
    { q: "Are you comfortable working in a team and on your own?",
      tip: "Show both with a quick example each." },
  ],
  tech: [
    { q: "Walk me through a project you are proud of, from start to finish.",
      tip: "Cover the goal, your role, the tools, one real problem you solved and the result." },
    { q: "How would you test a login page?",
      tip: "Cover valid and invalid input, locked accounts, password reset, security (injection, brute force), accessibility and performance." },
    { q: "What is the difference between continuous integration and continuous delivery?",
      tip: "CI merges and tests code automatically on every change. CD also prepares or pushes it to release automatically." },
    { q: "How do you decide what to automate in testing?",
      tip: "Automate repeatable, stable, high-value checks. Keep exploratory and one-off tests manual." },
    { q: "What happens when you type a web address into a browser and press Enter?",
      tip: "DNS lookup, TCP and TLS connection, HTTP request, server response, browser renders the page." },
    { q: "How would you troubleshoot a website that suddenly became slow?",
      tip: "Check what changed, then look at monitoring, logs, database, network and recent deployments, one step at a time." },
    { q: "What is the difference between authentication and authorization?",
      tip: "Authentication proves who you are. Authorization decides what you are allowed to do." },
    { q: "How do you keep secrets such as passwords and API keys safe?",
      tip: "Never put them in code or public repos. Use a secrets manager or environment variables, and rotate them." },
    { q: "Explain what a container is and why teams use them.",
      tip: "A container packages an app with its dependencies so it runs the same everywhere. It is lighter than a virtual machine." },
    { q: "How do you use Git when working in a team?",
      tip: "Mention branches, pull requests, code reviews, clear commit messages and resolving merge conflicts." },
    { q: "Describe a bug that was hard to find. How did you track it down?",
      tip: "Show a method: reproduce, narrow down, form a hypothesis, test, fix, add a test so it stays fixed." },
    { q: "What is infrastructure as code and what are its benefits?",
      tip: "Managing servers and cloud resources with files in version control. Benefits: repeatable, reviewable, easier to recover." },
  ],
  ask: [
    { q: "What would success look like in this role after the first 90 days?",
      tip: "Shows you care about results. Listen for the real priorities." },
    { q: "How would you describe the team and the way people work together?",
      tip: "Helps you judge whether the culture fits you." },
    { q: "What are the biggest challenges the team is facing right now?",
      tip: "Opens a conversation where you can offer relevant examples." },
    { q: "What are the next steps in the hiring process?",
      tip: "A polite way to close and learn the timeline." },
    { q: "How does the company support learning and career growth?",
      tip: "Shows you plan to grow with them. Ask about training budgets and mentoring." },
    { q: "What do you enjoy most about working here?",
      tip: "A friendly question that often gives an honest view of the culture." },
    { q: "How is performance measured in this role?",
      tip: "Helps you understand expectations and how you will be reviewed." },
  ],
};

const questionEl = document.getElementById("question");
const tipEl = document.getElementById("tip");
const tipBtn = document.getElementById("show-tip");
const counterEl = document.getElementById("counter");
let currentItem = null;
let asked = 0;

function pick(category) {
  const pool = category === "any"
    ? [].concat(QUESTIONS.behavioral, QUESTIONS.general, QUESTIONS.tech, QUESTIONS.ask)
    : QUESTIONS[category];
  let item;
  // Avoid showing the same question twice in a row.
  do {
    item = pool[Math.floor(Math.random() * pool.length)];
  } while (pool.length > 1 && item === currentItem);
  currentItem = item;
  asked += 1;
  questionEl.textContent = item.q;
  tipEl.textContent = "Tip: " + item.tip;
  tipEl.hidden = true;
  tipBtn.hidden = false;
  counterEl.textContent = "Questions practiced this visit: " + asked;
}

document.getElementById("q-any").addEventListener("click", () => pick("any"));
document.getElementById("q-behavioral").addEventListener("click", () => pick("behavioral"));
document.getElementById("q-general").addEventListener("click", () => pick("general"));
document.getElementById("q-tech").addEventListener("click", () => pick("tech"));
document.getElementById("q-ask").addEventListener("click", () => pick("ask"));
tipBtn.addEventListener("click", () => { tipEl.hidden = !tipEl.hidden; });

// ---------- Ask the AI career coach ----------
// Calls /api/ask on this same site. The Anthropic key lives on the server (Cloudflare Worker),
// never in this file.
const aiInput = document.getElementById("ai-input");
const aiSend = document.getElementById("ai-send");
const aiAnswer = document.getElementById("ai-answer");
const aiCount = document.getElementById("ai-count");

aiInput.addEventListener("input", () => {
  aiCount.textContent = aiInput.value.length + " / 600";
});

function showAnswer(text, isError) {
  aiAnswer.textContent = text;
  aiAnswer.hidden = false;
  aiAnswer.classList.toggle("error", !!isError);
}

async function askAI() {
  const question = aiInput.value.trim();
  if (!question) { showAnswer("Please type a question first.", true); return; }
  aiSend.disabled = true;
  showAnswer("Thinking...", false);
  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.answer) showAnswer(data.answer, false);
    else showAnswer(data.error || "Something went wrong. Please try again.", true);
  } catch (e) {
    showAnswer("Could not connect. Check your internet and try again.", true);
  } finally {
    aiSend.disabled = false;
  }
}

aiSend.addEventListener("click", askAI);
aiInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) askAI();
});
