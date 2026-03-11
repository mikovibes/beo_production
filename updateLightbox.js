const fs = require('fs');
const jsFile = 'c:/Users/Jakub/Desktop/Beo An/script.js';
let content = fs.readFileSync(jsFile, 'utf8');

content = content.replace(
    /const items = document\.querySelectorAll\('\.gallery-item \.gi-inner'\);/,
    "const items = document.querySelectorAll('.art-item');"
);

fs.writeFileSync(jsFile, content, 'utf8');
console.log('Script updated.');
