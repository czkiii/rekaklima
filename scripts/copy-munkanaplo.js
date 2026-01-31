import { rmSync, cpSync } from 'fs';
import { resolve } from 'path';

const targetDir = resolve('public/munkanaplo-web-app');
const sourceDir = resolve('public/assets/shop/munkanaplo_web_app/dist');

try {
  // Töröljük a célt ha létezik
  rmSync(targetDir, { recursive: true, force: true });
  console.log('✓ Cleaned target directory');
  
  // Másoljuk az egész dist mappát
  cpSync(sourceDir, targetDir, { recursive: true });
  console.log('✓ Copied munkanaplo build to public/munkanaplo-web-app');
} catch (err) {
  console.error('✗ Copy failed:', err);
  process.exit(1);
}
