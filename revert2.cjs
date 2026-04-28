const fs = require('fs');
const filePath = 'C:\\Users\\midhu\\Downloads\\kju pitch\\src\\constants\\slides.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const restorations = [
  ['className="text-sm tracking-[0.4em] font-display uppercase font-bold text-[#A7DADB]"', 'className="text-xl tracking-[0.4em] font-display uppercase font-bold text-[#A7DADB]"'],
  ['className="text-sm tracking-[0.4em] font-display uppercase font-bold text-white"', 'className="text-xl tracking-[0.4em] font-display uppercase font-bold text-white"'],
  
  ['className="text-lg text-[#b0c5c6] font-light max-w-xl leading-relaxed text-left"', 'className="text-4xl text-[#b0c5c6] font-light max-w-3xl leading-relaxed text-left"'],
  ['className="text-lg font-display font-bold text-[#A7DADB] uppercase tracking-[0.4em]"', 'className="text-2xl font-display font-bold text-[#A7DADB] uppercase tracking-[0.4em]"'],
  ['className="text-sm font-mono text-[#A7DADB] uppercase tracking-[0.4em]"', 'className="text-xl font-mono text-[#A7DADB] uppercase tracking-[0.4em]"'],
  
  ['className="text-sm text-[#A7DADB] font-serif italic"', 'className="text-3xl text-[#A7DADB] font-serif italic"'],
  
  ['className="text-lg font-display font-bold text-white uppercase tracking-widest text-left"', 'className="text-4xl font-display font-bold text-white uppercase tracking-widest text-left"'],
  ['className="text-lg text-[#b0c5c6] font-light leading-relaxed"', 'className="text-4xl text-[#b0c5c6] font-light leading-relaxed"'],
  
  ['className="space-y-12 max-w-2xl"', 'className="space-y-12 max-w-4xl"'],
  ['className="text-sm font-mono text-red-400 uppercase tracking-widest"', 'className="text-xl font-mono text-red-400 uppercase tracking-widest"'],
  ['className="text-5xl font-display font-bold text-white uppercase tracking-tighter"', 'className="text-4xl font-display font-bold text-white uppercase tracking-tighter"'], 
  ['className="text-3xl text-[#b0c5c6] font-light leading-relaxed max-w-3xl"', 'className="text-2xl text-[#b0c5c6] font-light leading-relaxed max-w-2xl"'], 
  
  ['className="text-lg font-display font-bold text-orange-400 uppercase tracking-[0.4em]"', 'className="text-2xl font-display font-bold text-orange-400 uppercase tracking-[0.4em]"'],
  ['className="text-sm font-mono text-orange-400 uppercase tracking-widest"', 'className="text-xl font-mono text-orange-400 uppercase tracking-widest"'],
  
  ['className="text-lg text-white font-medium italic font-serif leading-relaxed text-left"', 'className="text-4xl text-white font-medium italic font-serif leading-relaxed text-left"'],
  ['className="text-sm text-[#b0c5c6] font-light leading-relaxed max-w-2xl text-left"', 'className="text-3xl text-[#b0c5c6] font-light leading-relaxed max-w-2xl text-left"'],
  
  ['className="text-lg text-[#b0c5c6] font-display line-through decoration-[#4F46E5] decoration-8 opacity-60 uppercase tracking-[0.3em]"', 'className="text-4xl text-[#b0c5c6] font-display line-through decoration-[#4F46E5] decoration-8 opacity-60 uppercase tracking-[0.3em]"'],
  
  ['className="text-lg font-display font-bold text-white tracking-tight uppercase text-left"', 'className="text-4xl font-display font-bold text-white tracking-tight uppercase text-left"'],
  ['className="text-sm font-body font-light text-[#b0c5c6] leading-relaxed max-w-[240px]"', 'className="text-xl font-body font-light text-[#b0c5c6] leading-relaxed max-w-[240px]"'],
  
  ['className="text-lg text-[#b0c5c6] font-body font-light text-left"', 'className="text-2xl text-[#b0c5c6] font-body font-light text-left"'], 
  ['className="text-lg font-bold text-white font-display tracking-tight uppercase leading-none text-left"', 'className="text-4xl font-bold text-white font-display tracking-tight uppercase leading-none text-left"'],
  
  ['className="text-lg text-[#A7DADB] font-bold uppercase tracking-[0.2em] mt-2 font-display"', 'className="text-4xl text-[#A7DADB] font-bold uppercase tracking-[0.2em] mt-2 font-display"'],
  ['className="text-lg text-[#A7DADB] font-display italic font-light text-left pl-2"', 'className="text-4xl text-[#A7DADB] font-display italic font-light text-left pl-2"'],
  
  ['className="text-lg font-display font-bold text-[#020C1B] uppercase tracking-tighter leading-none text-left"', 'className="text-4xl font-display font-bold text-[#020C1B] uppercase tracking-tighter leading-none text-left"'],
  
  ['className="text-lg text-[#b0c5c6] font-body font-light leading-relaxed px-2 text-left"', 'className="text-2xl text-[#b0c5c6] font-body font-light leading-relaxed px-2 text-left"'],
  
  ['className="text-lg text-[#A7DADB] font-display italic font-light text-left leading-relaxed text-left"', 'className="text-4xl text-[#A7DADB] font-display italic font-light text-left leading-relaxed text-left"'],
  
  ['className="text-sm font-display font-light text-[#A7DADB] ml-1 text-center"', 'className="text-3xl font-display font-light text-[#A7DADB] ml-1 text-center"'],
  ['className="grid grid-cols-2 gap-8 w-full max-w-xl px-4 text-center"', 'className="grid grid-cols-2 gap-8 w-full max-w-3xl px-4 text-center"'],
  ['className="text-[#b0c5c6] font-body text-sm uppercase tracking-tighter opacity-60 text-center text-center"', 'className="text-[#b0c5c6] font-body text-xs uppercase tracking-tighter opacity-60 text-center text-center"'],
  ['className="text-white font-serif italic text-sm opacity-90 text-center"', 'className="text-white font-serif italic text-3xl opacity-90 text-center"'],
  
  ['className="text-sm text-[#b0c5c6] font-light leading-relaxed text-left text-left"', 'className="text-3xl text-[#b0c5c6] font-light leading-relaxed text-left text-left"'],
  ['className="text-sm text-[#b0c5c6] font-light italic px-12 text-center text-center"', 'className="text-3xl text-[#b0c5c6] font-light italic px-12 text-center text-center"'],
  
  ['className="text-sm font-display font-bold text-white uppercase tracking-[0.4em] text-center"', 'className="text-3xl font-display font-bold text-white uppercase tracking-[0.4em] text-center"'],
  ['className="text-sm font-serif italic text-[#A7DADB] leading-tight tracking-tight text-left uppercase opacity-90 whitespace-nowrap"', 'className="text-3xl font-serif italic text-[#A7DADB] leading-tight tracking-tight text-left uppercase opacity-90 whitespace-nowrap"'],
  ['className="text-lg text-[#b0c5c6] font-body font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-700 text-left"', 'className="text-4xl text-[#b0c5c6] font-body font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-700 text-left"'],
  
  ['className="font-serif italic text-sm text-[#b0c5c6]/30 text-left text-left"', 'className="font-serif italic text-3xl text-[#b0c5c6]/30 text-left text-left"'],
  ['className="text-lg font-light font-body text-left leading-tight text-left"', 'className="text-4xl font-light font-body text-left leading-tight text-left"'],
  
  ['className="font-serif italic text-sm text-white/60 text-left text-left text-left"', 'className="font-serif italic text-3xl text-white/60 text-left text-left text-left"'],
  ['className="text-lg font-medium text-white font-body text-left leading-tight text-left"', 'className="text-4xl font-medium text-white font-body text-left leading-tight text-left"'],
  ['className="text-sm font-display uppercase tracking-widest text-[#A7DADB]/60 text-left mt-1 text-left"', 'className="text-xl font-display uppercase tracking-widest text-[#A7DADB]/60 text-left mt-1 text-left"'],
  
  ['className="flex items-start gap-12 group self-start max-w-2xl"', 'className="flex items-start gap-12 group self-start max-w-4xl"'],
  ['className="font-mono text-sm text-[#A7DADB] font-bold tracking-[0.5em] uppercase"', 'className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.5em] uppercase"'],
  ['className="font-serif italic text-[#A7DADB] text-sm"', 'className="font-serif italic text-[#A7DADB] text-3xl"'],
  ['className="font-body font-light text-[#b0c5c6] text-lg leading-tight max-w-xl border-l-2 border-[#A7DADB]/40 pl-8"', 'className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-l-2 border-[#A7DADB]/40 pl-8"'],
  
  ['className="flex flex-row-reverse items-start gap-12 group self-end text-right max-w-2xl"', 'className="flex flex-row-reverse items-start gap-12 group self-end text-right max-w-4xl"'],
  ['className="font-body font-light text-[#b0c5c6] text-lg leading-tight max-w-xl border-r-2 border-[#A7DADB]/40 pr-8 text-right"', 'className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-r-2 border-[#A7DADB]/40 pr-8 text-right"'],
  
  ['className="font-mono text-sm text-[#A7DADB] font-bold tracking-[0.4em] uppercase"', 'className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.4em] uppercase"'],
  
  ['className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center"', 'className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center"'],
  
  ['className="text-[#A7DADB] font-mono text-lg tracking-widest"', 'className="text-[#A7DADB] font-mono text-base tracking-widest"'],
  ['className="text-white font-mono text-lg tracking-widest"', 'className="text-white font-mono text-base tracking-widest"'],

  // Extras that resize.cjs touched and we need to put back exactly to original
  ['className="text-2xl font-body font-light text-[#b0c5c6] leading-relaxed max-w-lg"', 'className="text-sm font-body font-light text-[#b0c5c6] leading-relaxed max-w-sm"'],
  ['className="text-2xl text-[#b0c5c6] font-body font-light block opacity-70"', 'className="text-sm text-[#b0c5c6] font-body font-light block opacity-70"'],
  ['className="text-4xl text-white font-display font-bold uppercase tracking-tight block group-hover/item:translate-x-2 transition-transform duration-500"', 'className="text-lg text-white font-display font-bold uppercase tracking-tight block group-hover/item:translate-x-2 transition-transform duration-500"'],
  ['className="text-3xl text-[#A7DADB] font-serif italic opacity-80">Direct Fiscal & Operational Impact', 'className="text-lg text-[#A7DADB] font-serif italic opacity-80">Direct Fiscal & Operational Impact'],
  ['className="text-3xl text-[#A7DADB] font-serif italic opacity-80">Strategic Positioning & Legacy', 'className="text-lg text-[#A7DADB] font-serif italic opacity-80">Strategic Positioning & Legacy'],
];

for (const [bad, good] of restorations) {
  // Use a simple split/join for exact literal replacements safely
  content = content.split(bad).join(good);
}

fs.writeFileSync(filePath, content);
console.log('Restored all strings back to the exact pre-prompt state.');
