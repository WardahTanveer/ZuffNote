// @/navigationStore.js
let lastVisited = null;
let currentPath = null;
export function setLastVisited(path) {
  lastVisited = currentPath;
  currentPath = path;
}
export function getLastVisited() {
  return lastVisited || "/";
}
