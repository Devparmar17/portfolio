/**
 * Prepares the case-study boards for the web.
 *
 * The source exports are tall (~30,000px) and heavy (8–18MB) — fine as design
 * files, far too heavy to ship. This produces, for each board:
 *
 *   <name>-cover.webp   1400 x 900, cropped from the top, for the project card
 *   <name>-full.jpg     1400px wide progressive JPEG, for the detail view
 *
 * Progressive JPEG rather than WebP on purpose: WebP caps at 16,383px per
 * side, which the NESCAFÉ board comfortably exceeds.
 *
 * Usage:
 *   node scripts/prepare-case-studies.mjs
 *   node scripts/prepare-case-studies.mjs "D:\\path\\to\\source\\folder"
 */

import { access, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const TARGET_WIDTH = 1400;
const COVER_HEIGHT = 900;

const BOARDS = [
  { source: "dd.png", name: "nescafe", label: "NESCAFÉ — Campus Canteen Kiosk" },
  { source: "kk.png", name: "ux-laws", label: "Competitive App Analysis — 10 Laws of UX" },
];

const sourceDir = process.argv[2] ?? path.join(homedir(), "Downloads");
const outDir = path.join(process.cwd(), "public", "images", "projects");

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function prepare(board) {
  const src = path.join(sourceDir, board.source);

  if (!(await exists(src))) {
    console.error(`  ✗ missing: ${src}`);
    return null;
  }

  const { width, height } = await sharp(src).metadata();
  const scaledHeight = Math.round(height * (TARGET_WIDTH / width));

  const fullOut = path.join(outDir, `${board.name}-full.jpg`);
  await sharp(src)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(fullOut);

  const coverOut = path.join(outDir, `${board.name}-cover.webp`);
  await sharp(src)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .extract({
      left: 0,
      top: 0,
      width: TARGET_WIDTH,
      height: Math.min(COVER_HEIGHT, scaledHeight),
    })
    .webp({ quality: 82 })
    .toFile(coverOut);

  console.log(`  ✓ ${board.label}`);
  console.log(`      source  ${width} x ${height}`);
  console.log(`      full    ${TARGET_WIDTH} x ${scaledHeight}  -> ${board.name}-full.jpg`);
  console.log(`      cover   ${TARGET_WIDTH} x ${COVER_HEIGHT}  -> ${board.name}-cover.webp`);

  return { name: board.name, width: TARGET_WIDTH, height: scaledHeight };
}

async function main() {
  console.log(`Source: ${sourceDir}`);
  console.log(`Output: ${outDir}\n`);

  await mkdir(outDir, { recursive: true });

  const results = [];
  for (const board of BOARDS) {
    results.push(await prepare(board));
  }

  const done = results.filter(Boolean);

  if (done.length === 0) {
    console.error(
      "\nNothing was generated. Pass the folder holding the source images:\n" +
        '  node scripts/prepare-case-studies.mjs "C:\\path\\to\\images"',
    );
    process.exitCode = 1;
    return;
  }

  console.log("\nCheck these match `fullWidth` / `fullHeight` in data/portfolio.js:");
  for (const r of done) {
    console.log(`  ${r.name}: fullWidth: ${r.width}, fullHeight: ${r.height}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
