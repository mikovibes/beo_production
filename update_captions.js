const fs = require('fs');

const indexFile = 'c:/Users/Jakub/Desktop/Beo An/index.html';
let html = fs.readFileSync(indexFile, 'utf8');

const imgNames = [
    'Bageta Bánh Mì Gà.jpg',
    'Bún Bò Nam Bộ 2.jpg',
    'Bún Bò Nam Bộ.jpg',
    'Bún Cá.jpg',
    'Dušené hovězí Thịt bò kho 2.jpg',
    'Dušené hovězí Thịt bò kho.jpg',
    'Kake Udon.jpg',
    'Phad Thai.jpg',
    'Phở.jpg',
    'Smažené kuře v Bao.jpg',
    'Smažené zavitky Nem Rán 2.jpg',
    'Smažené zavitky Nem Rán.jpg',
    'Závitky Cha La Lot.jpg'
];

function getCaption(imgName) {
    if (imgName.includes(' 2.')) return null;
    return imgName.replace(/\.[^/.]+$/, "");
}

let pairsMap = {};
imgNames.forEach(img => {
    const isPair = img.includes(' 2.');
    const baseName = isPair ? img.replace(' 2.', '.') : img;
    if (!pairsMap[baseName]) {
        pairsMap[baseName] = [];
    }
    pairsMap[baseName].push(img);
});

let pairs = [];
let singles = [];

for (const baseName in pairsMap) {
    const imgs = pairsMap[baseName];
    imgs.sort((a, b) => {
        if (a.includes(' 2.')) return 1;
        if (b.includes(' 2.')) return -1;
        return 0;
    });

    const mapped = imgs.map(img => ({
        src: 'Jidla/' + img,
        alt: getCaption(img) || baseName.replace(/\.[^/.]+$/, "") + ' Detail',
        caption: getCaption(img)
    }));

    if (mapped.length > 1) {
        pairs.push(mapped);
    } else {
        singles.push(mapped[0]);
    }
}

// pairs has 3 arrays of 2 objects
// singles has 7 objects

// Structure map:
let heroItem = singles.shift();
let featureItem = singles.shift();
let grid1Pair = pairs.shift();
let grid1Single = singles.shift();
let grid2Pair1 = pairs.shift();
let grid2Pair2 = pairs.shift();
let grid3Singles = singles;

const genItem = (item, cls, parallax) => {
    let captionHtml = item.caption ? '<div class="aww-caption">' + item.caption + '</div>' : '';
    return '                <div class="aww-item ' + cls + '" data-parallax="' + parallax + '">\n' +
        '                    <img src="' + item.src + '" alt="' + item.alt + '">\n' +
        '                    ' + captionHtml + '\n' +
        '                </div>';
};

let newHTML = '            <!-- Hero Entrance -->\n' +
    '            <div class="aww-hero animate-on-scroll">\n' +
    genItem(heroItem, 'aww-item-hero', '0.04') + '\n' +
    '            </div>\n\n' +
    '            <!-- Structured Grid 1 -->\n' +
    '            <div class="aww-grid aww-grid-1 animate-on-scroll">\n' +
    genItem(grid1Pair[0], 'aww-item-medium', '0.02') + '\n' +
    genItem(grid1Pair[1], 'aww-item-small', '0.08') + '\n' +
    genItem(grid1Single, 'aww-item-medium', '-0.02') + '\n' +
    '            </div>\n\n' +
    '            <!-- Featured Dish Mid -->\n' +
    '            <div class="aww-feature animate-on-scroll">\n' +
    genItem(featureItem, 'aww-item-large', '0.05') + '\n' +
    '            </div>\n\n' +
    '            <!-- Structured Grid 2 -->\n' +
    '            <div class="aww-grid aww-grid-2 animate-on-scroll">\n' +
    genItem(grid2Pair1[0], 'aww-item-small', '0.03') + '\n' +
    genItem(grid2Pair1[1], 'aww-item-medium', '-0.01') + '\n' +
    genItem(grid2Pair2[0], 'aww-item-small', '0.06') + '\n' +
    genItem(grid2Pair2[1], 'aww-item-medium', '0.02') + '\n' +
    '            </div>\n\n' +
    '            <!-- Grid 3 -->\n' +
    '            <div class="aww-grid aww-grid-3 animate-on-scroll">\n' +
    genItem(grid3Singles[0], 'aww-item-medium', '-0.03') + '\n' +
    genItem(grid3Singles[1], 'aww-item-large', '0.04') + '\n' +
    genItem(grid3Singles[2], 'aww-item-small', '0.05') + '\n' +
    genItem(grid3Singles[3], 'aww-item-medium', '0.02') + '\n' +
    '            </div>';

if (html.includes('class="aww-gallery"')) {
    html = html.replace(/<div class="aww-container gallery-lightbox-container">[\s\S]*?<\/section>/, '<div class="aww-container gallery-lightbox-container">\n' + newHTML + '\n        </div>\n    </section>');
}

fs.writeFileSync(indexFile, html, 'utf8');
console.log('Update HTML complete');
