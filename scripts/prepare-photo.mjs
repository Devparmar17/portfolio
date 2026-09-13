/**
 * Prepares Dev's cut-out photo for the hero.
 *
 *   node scripts/prepare-photo.mjs "C:/path/to/photo.png"
 *
 * Trims the empty transparent margin around him, keeps head to waist, and
 * writes a transparent PNG to public/images/profile.png. The photo itself is
 * not retouched — only cropped and resized.
 *
 * The photo needs a transparent background (a cut-out). A photo with a solid
 * background will show that background as a box inside the hero circle.
 */

import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2];
const OUT = path.join(process.cwd(), "public", "images", "profile.png");

/** Share of the trimmed height to keep, from the top: head to waist. */
const KEEP = 0.72;
/** Export height. The hero shows it at roughly 300px, so this covers 3x screens. */
const OUT_HEIGHT = 900;

if (!SRC) {
  console.error('Usage: node scripts/prepare-photo.mjs "<photo.png>"');
  process.exit(1);
}

async function main() {
  const meta = await sharp(SRC).metadata();
  if (!meta.hasAlpha) {
    console.warn("warning: this photo has no transparent background; it will appear as a box.");
  }

  const trimmed = await sharp(SRC).ensureAlpha().trim({ threshold: 10 }).png().toBuffer({ resolveWithObject: true });
  const { width, height } = trimmed.info;
  const keepHeight = Math.round(height * KEEP);

  const out = await sharp(trimmed.data)
    .extract({ left: 0, top: 0, width, height: keepHeight })
    .resize({ height: OUT_HEIGHT, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(`source   ${meta.width}x${meta.height}  alpha=${Boolean(meta.hasAlpha)}`);
  console.log(`trimmed  ${width}x${height}, kept top ${keepHeight}px`);
  console.log(`output   public/images/profile.png  ${out.width}x${out.height}  ${Math.round(out.size / 1024)}KB`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
