import fs from 'fs';
import path from 'path';

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.html') || dirFile.endsWith('.md')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const rootDir = process.cwd();
const filesToProcess = [
  ...walkSync(path.join(rootDir, 'src')),
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'VISION.md'),
  path.join(rootDir, 'design-system.md')
];

for (const file of filesToProcess) {
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  content = content.replace(/Smartslate × KJU/g, 'Smartslate | Institutional Intelligence');
  content = content.replace(/Smartslate x KJU/g, 'Smartslate | Institutional Intelligence');
  content = content.replace(/Kristu Jayanti University/g, 'the University');
  content = content.replace(/Kristu Jayanti College/g, 'the University');
  content = content.replace(/Kristu Jayanti/g, 'the University');
  content = content.replace(/KJU/g, 'UNI');
  content = content.replace(/kjc-logo\.png/g, 'uni-logo.png');
  content = content.replace(/https:\/\/kju-ai-pitch\.vercel\.app\/?/g, 'https://cc.smartslate.io/');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
