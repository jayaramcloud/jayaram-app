// Full-page AI chat. Talks to /api/ask on this same site; the Anthropic key stays on the server.
// The conversation lives only in this page's memory: nothing is stored, and a refresh clears it.

const chat = document.getElementById("chat");
const composer = document.getElementById("composer");
const msgBox = document.getElementById("msg");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");
const countEl = document.getElementById("count");
const suggestions = document.getElementById("suggestions");

const GREETING = "Hi! I am an AI career coach. What would you like help with today?";
let history = [];   // [{role, content}] of completed turns
let busy = false;

function addMsg(text, kind) {
  const el = document.createElement("div");
  el.className = "msg " + kind;
  // Bot replies get safe mini-markdown (bold, lists). Everything else stays plain text.
  if (kind === "bot" && typeof renderMarkdown === "function") renderMarkdown(el, text);
  else el.textContent = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
  return el;
}

async function send(text) {
  const question = (text || "").trim();
  if (busy) return;
  if (!question) return;
  busy = true;
  sendBtn.disabled = true;
  addMsg(question, "user");
  msgBox.value = "";
  countEl.textContent = "0 / 600";
  const typing = addMsg("Thinking...", "bot typing");
  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question, history }),
    });
    const data = await res.json().catch(() => ({}));
    typing.remove();
    if (res.ok && data.answer) {
      addMsg(data.answer, "bot");
      history.push({ role: "user", content: question }, { role: "assistant", content: data.answer });
      history = history.slice(-6);
    } else {
      addMsg(data.error || "Something went wrong. Please try again.", "error");
    }
  } catch (e) {
    typing.remove();
    addMsg("Could not connect. Check your internet and try again.", "error");
  } finally {
    busy = false;
    sendBtn.disabled = false;
    msgBox.focus();
  }
}

composer.addEventListener("submit", (e) => { e.preventDefault(); send(msgBox.value); });

msgBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(msgBox.value); }
});
msgBox.addEventListener("input", () => { countEl.textContent = msgBox.value.length + " / 600"; });

suggestions.addEventListener("click", (e) => {
  const chip = e.target.closest ? e.target.closest(".chip") : null;
  if (chip) send(chip.textContent);
});

clearBtn.addEventListener("click", () => {
  history = [];
  chat.textContent = "";
  addMsg(GREETING, "bot");
  msgBox.focus();
});
