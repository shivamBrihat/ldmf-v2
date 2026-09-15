// Builds data/gallery-manifest.json from public/images/events/*.webp.
// Run: node scripts/build-gallery-manifest.mjs
// Re-run whenever photos are added to or removed from public/images/events.
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const EVENTS_DIR = path.join(ROOT, 'public', 'images', 'events');
const OUT_FILE = path.join(ROOT, 'data', 'gallery-manifest.json');

// Never publish these (political placards / unrelated to LDMF).
const EXCLUDED = new Set([1803]);

// Checked in order: first matching rule wins, so narrow ranges come before broad ones.
const CATEGORY_RULES = [
  ['group', [[1885, 1888]]],
  ['saints', [[1890, 1899]]],
  ['audience', [[1916, 1925], [1942, 1942], [1967, 1971], [2013, 2014], [2062, 2063]]],
  ['welcome', [[1875, 1937], [1944, 1944], [1958, 1958], [2005, 2005]]],
  ['inauguration', [[1947, 1956]]],
  ['speeches', [[1938, 1943], [1961, 1965], [1973, 1977], [1980, 1987], [2000, 2001], [2015, 2016], [2050, 2067], [2148, 2150]]],
  ['awards', [[1989, 1999], [2006, 2012], [2037, 2045], [2072, 2102], [2119, 2147], [2151, 2166]]],
  ['saints', [[2003, 2004], [2018, 2027], [2031, 2036], [2110, 2118]]],
  ['group', [[2028, 2030], [2047, 2049], [2103, 2109]]],
];

// Standout shots, shown first in this order.
const FEATURED = [
  2106, 1947, 1890, 2045, 2164, 2048, 2063, 2029, 1886, 2050,
  1927, 1954, 1999, 2117, 2090, 2121, 1967, 2012, 2032, 2015,
];

// Blurry / eyes closed / awkward framing: kept in the gallery but shown last.
const WEAK = new Set([
  1895, 1911, 1929, 1938, 1964, 2019, 2020, 2024, 2026, 2039, 2053,
  2079, 2091, 2092, 2093, 2108, 2112, 2126, 2133, 2134, 2135, 2147,
  2159, 2160, 2166,
]);

function categoryFor(n) {
  for (const [category, ranges] of CATEGORY_RULES) {
    if (ranges.some(([from, to]) => n >= from && n <= to)) return category;
  }
  return null;
}

const files = (await fs.readdir(EVENTS_DIR)).filter((f) => /^IMG_\d+\.webp$/i.test(f));
const entries = [];
const unassigned = [];

for (const file of files) {
  const n = Number(file.match(/\d+/)[0]);
  if (EXCLUDED.has(n)) continue;

  const category = categoryFor(n);
  if (!category) unassigned.push(n);

  const image = sharp(path.join(EVENTS_DIR, file));
  const { width, height } = await image.metadata();
  const blur = await image.clone().resize(16).webp({ quality: 40 }).toBuffer();

  entries.push({
    id: `IMG_${n}`,
    src: `/images/events/${file}`,
    width,
    height,
    category: category ?? 'welcome',
    featured: FEATURED.includes(n),
    blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
    _n: n,
  });
}

const rank = (e) => {
  const f = FEATURED.indexOf(e._n);
  if (f !== -1) return f;
  return WEAK.has(e._n) ? 1_000_000 + e._n : 10_000 + e._n;
};
entries.sort((a, b) => rank(a) - rank(b));

await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
await fs.writeFile(OUT_FILE, JSON.stringify(entries.map(({ _n, ...e }) => e), null, 1) + '\n');

const counts = entries.reduce((acc, e) => ({ ...acc, [e.category]: (acc[e.category] || 0) + 1 }), {});
console.log(`Wrote ${entries.length} images to ${path.relative(ROOT, OUT_FILE)}`);
console.log('Per category:', counts);
if (unassigned.length) console.warn('Unassigned (defaulted to welcome):', unassigned.join(', '));
