const fs = require('fs');
const filePath = 'C:\\Users\\midhu\\Downloads\\kju pitch\\src\\constants\\slides.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The Case / Skill Mismatch (L223-L239)
content = content.replace(
  /className="text-\[34px\] text-\[#b0c5c6\] font-light leading-relaxed max-w-4xl">\{item\.desc\}/g,
  'className="text-3xl text-[#b0c5c6] font-light leading-relaxed max-w-3xl">{item.desc}'
);
content = content.replace(
  /className="text-6xl font-display font-bold text-white uppercase tracking-tighter">\{item\.title\}/g,
  'className="text-5xl font-display font-bold text-white uppercase tracking-tighter">{item.title}'
);

// 3-Pillar Model (L409-436)
content = content.replace(
  /className="text-sm font-body font-light text-\[#b0c5c6\] leading-relaxed max-w-sm">\{item\.sub\}/g,
  'className="text-2xl font-body font-light text-[#b0c5c6] leading-relaxed max-w-lg">{item.sub}'
);
content = content.replace(
  /className="text-lg font-display font-bold text-white tracking-tight uppercase text-left">\{item\.title\}/g,
  'className="text-4xl font-display font-bold text-white tracking-tight uppercase text-left">{item.title}'
);

// Pillar 1 (L460-470)
content = content.replace(
  /className="text-sm text-\[#b0c5c6\] font-body font-light text-left">\{item\.detail\}/g,
  'className="text-2xl text-[#b0c5c6] font-body font-light text-left">{item.detail}'
);
content = content.replace(
  /className="text-lg font-bold text-white font-display tracking-tight uppercase leading-none text-left">\{item\.title\}/g,
  'className="text-4xl font-bold text-white font-display tracking-tight uppercase leading-none text-left">{item.title}'
);

// Pillar 2 (L520-545)
content = content.replace(
  /className="text-lg text-\[#b0c5c6\] font-body font-light leading-relaxed px-2 text-left">\{item\.detail\}/g,
  'className="text-2xl text-[#b0c5c6] font-body font-light leading-relaxed px-2 text-left">{item.detail}'
);
content = content.replace(
  /className="text-lg font-display font-bold text-\[#020C1B\] uppercase tracking-tighter leading-none text-left">\{item\.title\}/g,
  'className="text-4xl font-display font-bold text-[#020C1B] uppercase tracking-tighter leading-none text-left">{item.title}'
);

// Pillar 3 Efficiency & Impact (L567-577)
content = content.replace(
  /className="text-lg text-\[#b0c5c6\] font-body font-light leading-relaxed text-left">\{item\.desc\}/g,
  'className="text-2xl text-[#b0c5c6] font-body font-light leading-relaxed text-left">{item.desc}'
);
content = content.replace(
  /className="text-lg font-display font-bold text-white tracking-tight uppercase leading-none text-left">\{item\.title\}/g,
  'className="text-4xl font-display font-bold text-white tracking-tight uppercase leading-none text-left">{item.title}'
);

// Tangible / Intangible ROI Lists (L1000+)
content = content.replace(
  /className="text-sm text-\[#b0c5c6\] font-body font-light block opacity-70">\{item\.sub\}/g,
  'className="text-2xl text-[#b0c5c6] font-body font-light block opacity-70">{item.sub}'
);
content = content.replace(
  /className="text-lg text-white font-display font-bold uppercase tracking-tight block group-hover\/item:translate-x-2 transition-transform duration-500">\{item\.text\}/g,
  'className="text-4xl text-white font-display font-bold uppercase tracking-tight block group-hover/item:translate-x-2 transition-transform duration-500">{item.text}'
);

// Tangible / Intangible Titles
content = content.replace(
  /className="text-lg text-\[#A7DADB\] font-serif italic opacity-80">Direct Fiscal & Operational Impact/g,
  'className="text-3xl text-[#A7DADB] font-serif italic opacity-80">Direct Fiscal & Operational Impact'
);
content = content.replace(
  /className="text-lg text-\[#A7DADB\] font-serif italic opacity-80">Strategic Positioning & Legacy/g,
  'className="text-3xl text-[#A7DADB] font-serif italic opacity-80">Strategic Positioning & Legacy'
);

fs.writeFileSync(filePath, content);
console.log('Targeted text resizing applied successfully.');