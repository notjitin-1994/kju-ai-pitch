const fs = require('fs');
const filePath = 'C:\\Users\\midhu\\Downloads\\kju pitch\\src\\constants\\slides.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Undo relative upscaling carefully based on exact knowledge
const lines = content.split('\n');
const newLines = lines.map(line => {
  // Protect specific lines that were originally 6xl, 5xl, 7xl
  if (line.includes('text-6xl') && line.includes('font-display font-bold text-white uppercase tracking-tighter')) return line;
  if (line.includes('text-6xl') && line.includes('font-serif italic text-[#A7DADB]/20')) return line;
  if (line.includes('text-6xl') && line.includes('tracking-tighter uppercase leading-none text-left')) return line;
  if (line.includes('text-5xl') && line.includes('font-display font-bold text-white uppercase tracking-tighter')) return line;
  if (line.includes('text-5xl') && line.includes('uppercase tracking-[0.4em] text-[#b0c5c6]/40')) return line;
  if (line.includes('text-5xl') && line.includes('uppercase tracking-[0.4em] text-[#A7DADB]')) return line;
  if (line.includes('text-5xl') && line.includes('font-body italic text-[#A7DADB]/80 text-5xl')) return line;
  if (line.includes('text-5xl') && line.includes('font-body italic text-white text-5xl')) return line;
  
  if (line.includes('text-[120px]')) {
    // 140px mapping
    if (line.includes('leading-[0.9] tracking-tighter text-left')) return line.replace('text-[120px]', 'text-[140px]');
  }
  if (line.includes('text-6xl') && line.includes('leading-[1.2] text-white')) return line.replace('text-6xl', 'text-[64px]');
  if (line.includes('text-4xl') && line.includes('text-[#b0c5c6] font-light leading-relaxed')) return line.replace('text-4xl', 'text-[34px]');
  if (line.includes('text-4xl') && line.includes('leading-tight max-w-3xl border-l-2')) return line.replace('text-4xl', 'text-[34px]');
  if (line.includes('text-4xl') && line.includes('leading-tight max-w-3xl border-r-2')) return line.replace('text-4xl', 'text-[34px]');
  if (line.includes('text-5xl') && line.includes('text-[#b0c5c6] font-body font-light leading-tight')) return line.replace('text-5xl', 'text-[52px]');
  if (line.includes('text-8xl') && line.includes('leading-none tracking-tighter uppercase text-left')) return line.replace('text-8xl', 'text-[90px]');
  if (line.includes('text-[160px]') && line.includes('leading-none tracking-tighter')) return line.replace('text-[160px]', 'text-[180px]');
  if (line.includes('text-8xl') && line.includes('leading-[0.85] tracking-tighter uppercase text-center')) return line.replace('text-8xl', 'text-[100px]');
  if (line.includes('text-4xl') && line.includes('leading-relaxed opacity-60 group-hover:opacity-100')) return line.replace('text-4xl', 'text-[32px]');
  if (line.includes('text-7xl') && line.includes('font-serif italic font-normal')) return line.replace('text-7xl', 'text-[84px]');
  if (line.includes('text-7xl') && line.includes('leading-[1] tracking-tighter text-left')) return line.replace('text-7xl', 'text-[72px]');
  if (line.includes('text-[10px]') && line.includes('tracking-[0.5em] uppercase font-mono')) return line.replace('text-[10px]', 'text-[11px]');

  let replaced = line;
  replaced = replaced.replace(/text-6xl/g, 'text-4xl');
  replaced = replaced.replace(/text-5xl/g, 'text-3xl');
  replaced = replaced.replace(/text-4xl/g, 'text-2xl');
  replaced = replaced.replace(/text-3xl/g, 'text-xl');
  replaced = replaced.replace(/text-2xl/g, 'text-lg');
  replaced = replaced.replace(/text-xl/g, 'text-sm');

  replaced = replaced.replace(/max-w-6xl/g, 'max-w-4xl');
  replaced = replaced.replace(/max-w-5xl/g, 'max-w-3xl');
  replaced = replaced.replace(/max-w-4xl/g, 'max-w-2xl');
  replaced = replaced.replace(/max-w-3xl/g, 'max-w-xl');
  
  return replaced;
});

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Revert completed');