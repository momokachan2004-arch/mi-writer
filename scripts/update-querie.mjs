// Pulls みさん's answered questions from querie.me and merges them into data/querie.json.
// Run by .github/workflows/update-answers.yml (Node 20+, no dependencies).
import { readFile, writeFile } from "node:fs/promises";

const USER_ID = "pEE9jbctACaV8kUil7HOuBXhJy34";
const API = `https://querie.me/api/qas?kind=recent&count=100&userId=${USER_ID}`;
const FILE = new URL("../data/querie.json", import.meta.url);

const res = await fetch(API, { headers: { "user-agent": "mi-writer-updater" } });
if (!res.ok) throw new Error(`querie.me returned ${res.status}`);
const items = await res.json();
if (!Array.isArray(items)) throw new Error("unexpected response shape");

let existing = [];
try { existing = JSON.parse(await readFile(FILE, "utf8")); } catch { /* first run */ }

const byId = new Map(existing.map((e) => [e.id, e]));
let added = 0;
for (const qa of items) {
  if (!qa.answer || qa.isAnsweredAsPrivate) continue;
  const entry = {
    source: "querie",
    id: qa.id,
    date: new Date(qa.answeredAt * 1000).toISOString().slice(0, 10),
    q: String(qa.text || "").trim(),
    a: String(qa.answer).trim(),
  };
  if (!byId.has(qa.id)) added++;
  byId.set(qa.id, entry);
}

const merged = [...byId.values()].sort((x, y) => (y.date > x.date ? 1 : y.date < x.date ? -1 : 0));
const next = JSON.stringify(merged, null, 1) + "\n";
const prev = existing.length ? JSON.stringify(existing, null, 1) + "\n" : "";
if (next !== prev) {
  await writeFile(FILE, next);
  console.log(`querie.json updated: ${merged.length} answers (${added} new)`);
} else {
  console.log("no changes");
}
