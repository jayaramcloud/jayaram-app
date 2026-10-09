// Safe mini-markdown renderer shared by the chat page and the Practice box.
// Builds DOM nodes with createElement/createTextNode only. It never uses innerHTML,
// so AI replies cannot inject markup or scripts.
// Supports: **bold**, *italic*, paragraphs, "- " / "* " bullet lists, "1. " numbered lists, ### headings.

function mdInline(parent, text) {
  // Order matters: bold (**) before italic (*).
  // Italic must start right after a non-word char (or line start), hug its text with no inner
  // leading/trailing space, and not sit inside a word, so "2 * 3" and "a*b" stay literal.
  const re = /\*\*(?=\S)([^*\n]+?)(?<=\S)\*\*|(?<![\w*])\*(?=[^\s*])([^*\n]+?)(?<=[^\s*])\*(?![\w*])/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parent.appendChild(document.createTextNode(text.slice(last, m.index)));
    const el = document.createElement(m[1] !== undefined ? "strong" : "em");
    el.appendChild(document.createTextNode(m[1] !== undefined ? m[1] : m[2]));
    parent.appendChild(el);
    last = re.lastIndex;
  }
  if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
}

function renderMarkdown(container, text) {
  container.textContent = "";
  const lines = String(text).replace(/\r\n/g, "\n").split("\n");
  let list = null, listType = null, para = [];

  function flushPara() {
    if (!para.length) return;
    const p = document.createElement("p");
    mdInline(p, para.join(" "));
    container.appendChild(p);
    para = [];
  }
  function endList() { list = null; listType = null; }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushPara(); endList(); continue; }

    const bullet = /^[-*\u2022]\s+(.*)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);
    const heading = /^#{1,6}\s+(.*)$/.exec(line);

    if (bullet || numbered) {
      flushPara();
      const type = bullet ? "ul" : "ol";
      if (!list || listType !== type) {
        list = document.createElement(type);
        listType = type;
        container.appendChild(list);
      }
      const li = document.createElement("li");
      mdInline(li, (bullet || numbered)[1]);
      list.appendChild(li);
    } else if (heading) {
      flushPara(); endList();
      const p = document.createElement("p");
      const s = document.createElement("strong");
      mdInline(s, heading[1]);
      p.appendChild(s);
      container.appendChild(p);
    } else {
      endList();
      para.push(line);
    }
  }
  flushPara();
}
