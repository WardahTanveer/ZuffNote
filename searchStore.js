// @/searchStore.js
let searchText = "";
let includeGroups = [];
let excludeGroups = [];
export function setSearchState(text, include, exclude) {
  searchText = text;
  includeGroups = include;
  excludeGroups = exclude;
}
export function getSearchState() {
  return { searchText, includeGroups, excludeGroups };
}