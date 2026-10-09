// Runs in the visitor's browser.

// ---------- Left navigation: show one panel at a time ----------
const navButtons = document.querySelectorAll(".nav-btn");
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
  ],
};

const questionEl = document.getElementById("question");
const tipEl = document.getElementById("tip");
const tipBtn = document.getElementById("show-tip");
let currentItem = null;

function pick(category) {
  const pool = category === "any"
    ? [].concat(QUESTIONS.behavioral, QUESTIONS.general, QUESTIONS.ask)
    : QUESTIONS[category];
  let item;
  // Avoid showing the same question twice in a row.
  do {
    item = pool[Math.floor(Math.random() * pool.length)];
  } while (pool.length > 1 && item === currentItem);
  currentItem = item;
  questionEl.textContent = item.q;
  tipEl.textContent = "Tip: " + item.tip;
  tipEl.hidden = true;
  tipBtn.hidden = false;
}

document.getElementById("q-any").addEventListener("click", () => pick("any"));
document.getElementById("q-behavioral").addEventListener("click", () => pick("behavioral"));
document.getElementById("q-general").addEventListener("click", () => pick("general"));
document.getElementById("q-ask").addEventListener("click", () => pick("ask"));
tipBtn.addEventListener("click", () => { tipEl.hidden = !tipEl.hidden; });
