const fs = require('fs');
const file = 'c:/Users/Jakub/Desktop/Beo An/index.html';
let content = fs.readFileSync(file, 'utf8');

const aboutRegex = /    <!-- ══════════════════════════════════════════ ABOUT ══════════════════════════════════════════ -->\r?\n    <section id="about">[\s\S]*?    <\/section>\r?\n/;
const galleryRegex = /    <!-- ══════════════════════════════════════════ GALLERY ══════════════════════════════════════════ -->\r?\n    <section id="gallery">[\s\S]*?    <\/section>\r?\n/;
const menuRegex = /    <!-- ══════════════════════════════════════════ MENU \(REACT COMPONENT\) ══════════════════════════════════════════ -->\r?\n    <div id="root"><\/div>\r?\n/;

const aboutMatch = content.match(aboutRegex)[0];
const galleryMatch = content.match(galleryRegex)[0];
const menuMatch = content.match(menuRegex)[0];

const startIdx = Math.min(content.indexOf(aboutMatch), content.indexOf(galleryMatch), content.indexOf(menuMatch));
const endIdx = Math.max(
    content.indexOf(aboutMatch) + aboutMatch.length,
    content.indexOf(galleryMatch) + galleryMatch.length,
    content.indexOf(menuMatch) + menuMatch.length
);

let sep = content.includes('\r\n') ? '\r\n' : '\n';

const newBlock = menuMatch + sep + galleryMatch + sep + aboutMatch;

content = content.substring(0, startIdx) + newBlock + content.substring(endIdx);

const r1 = /<li><a href="#about">O nás<\/a><\/li>(\s*)<li><a href="#gallery">Galerie<\/a><\/li>(\s*)<li><a href="#menu">Menu<\/a><\/li>/g;
content = content.replace(r1, '<li><a href="#menu">Menu</a></li>$1<li><a href="#gallery">Galerie</a></li>$1<li><a href="#about">O nás</a></li>');

const r2 = /<li><a href="#about" class="nm-link">O nás<\/a><\/li>(\s*)<li><a href="#gallery" class="nm-link">Galerie<\/a><\/li>(\s*)<li><a href="#menu" class="nm-link">Menu<\/a><\/li>/g;
content = content.replace(r2, '<li><a href="#menu" class="nm-link">Menu</a></li>$1<li><a href="#gallery" class="nm-link">Galerie</a></li>$1<li><a href="#about" class="nm-link">O nás</a></li>');

fs.writeFileSync(file, content, 'utf8');
console.log('Done');
