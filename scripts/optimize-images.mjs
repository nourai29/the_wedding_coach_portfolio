import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const INPUT_DIR = 'src/assets/portfolio';
const OUTPUT_DIR = 'src/assets/portfolio-optimized';
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimize() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await readdir(INPUT_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  console.log(`Found ${imageFiles.length} images to optimize...\n`);

  for (const file of imageFiles) {
    const inputPath = join(INPUT_DIR, file);
    const { name } = parse(file);
    const outputPath = join(OUTPUT_DIR, `${name}.webp`);

    try {
      const result = await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const inputStats = await sharp(inputPath).metadata();
      const savings = ((1 - result.size / (inputStats.size || result.size)) * 100).toFixed(1);
      console.log(`  ${file} → ${name}.webp (${(result.size / 1024).toFixed(0)} KB, -${savings}%)`);
    } catch (err) {
      console.error(`  ERROR: ${file} — ${err.message}`);
    }
  }

  console.log('\nDone!');
}

optimize();
