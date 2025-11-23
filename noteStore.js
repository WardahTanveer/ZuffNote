// A simple in-memory store
const tempNotes = {};
export function setTempNote(id, content) {
  tempNotes[id] = content;
}
export function getTempNote(id) {
  return tempNotes[id] ?? null;
}
export function clearTempNote(id) {
  delete tempNotes[id];
}