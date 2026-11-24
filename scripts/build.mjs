import { readFileSync, writeFileSync } from 'node:fs';

const read = file => readFileSync(new URL('../src/' + file, import.meta.url), 'utf8').replace(/^\uFEFF/, '');
const sections = [
  ['/* COMIC_STYLES */', 'comic.css'],
  ['/* FLAG_SHEET */', 'flag-sheet.txt'],
  ['/* POPULATION_SNAPSHOT */ []', 'population-2024.json'],
  ['/* MAP_DATA */ []', 'map-data.json'],
  ['/* CITY_DATA */ {}', 'city-data.json'],
  ['/* FLAG_POSITIONS */ {}', 'flag-positions.json'],
  ['/* PUBLIC_GAME_URL */', 'public-game-url.txt'],
  ['/* LOCAL_STORY_ATLAS */', 'local-atlas.js'],
  ['/* CITY_STORY_DETAILS */', 'city-lore.js'],
  ['/* LIFE_STORIES */', 'story.js'],
  ['/* MAP_RENDERER */', 'map.js'],
  ['/* RESULT_POSTER */', 'poster.js']
];
let html = read('index.template.html');
for (const [placeholder, file] of sections) {
  if (!html.includes(placeholder)) throw new Error('Missing template slot ' + placeholder);
  html = html.replace(placeholder, () => read(file).trim());
}
writeFileSync(new URL('../docs/index.html', import.meta.url), html);
console.log('Built', Buffer.byteLength(html), 'bytes');

