const fs = require('fs');

const indexFile = 'c:/Users/Jakub/Desktop/Beo An/index.html';
const cssFile = 'c:/Users/Jakub/Desktop/Beo An/style.css';
const jsFile = 'c:/Users/Jakub/Desktop/Beo An/script.js';

let indexContent = fs.readFileSync(indexFile, 'utf8');
let styleContent = fs.readFileSync(cssFile, 'utf8');
let jsContent = fs.readFileSync(jsFile, 'utf8');

// HTML
const galleryRegexHTML = /    <!-- ══════════════════════════════════════════ GALLERY ══════════════════════════════════════════ -->\r?\n    <section id="gallery" class="art-gallery-section">[\s\S]*?    <\/section>\r?\n/;

const newGalleryHTML = `    <!-- ══════════════════════════════════════════ GALLERY ══════════════════════════════════════════ -->
    <section id="gallery" class="aww-gallery">
        <div class="aww-header animate-on-scroll">
            <div class="section-label" style="background:var(--black); color:var(--yellow); border-color:var(--black);">Kulinářská Expozice</div>
            <h2 class="aww-title">Umění na <span class="accent-yellow">talíři</span></h2>
            <p class="aww-subtitle">Naše pokrmy nejsou jen jídlo. Jsou to pestré barvy, tvary a textury Vietnamu, pečlivě vrstvené do dokonalé kompozice zprostředkovávající jedinečný vizuální i chuťový zážitek.</p>
        </div>

        <div class="aww-container gallery-lightbox-container">
            <!-- Hero Entrance -->
            <div class="aww-hero animate-on-scroll">
                <div class="aww-item aww-item-hero" data-parallax="0.04">
                    <img src="Jidla/SnapInsta.to_495726980_17854406460431463_352625677572086672_n.jpg" alt="Tradiční Bún Bò">
                    <div class="aww-caption">Tradiční Bún Bò</div>
                </div>
            </div>

            <!-- Structured Grid 1 -->
            <div class="aww-grid aww-grid-1 animate-on-scroll">
                <div class="aww-item aww-item-medium" data-parallax="0.02">
                    <img src="Jidla/SnapInsta.to_559346883_17872534083431463_2990940697137328148_n.jpg" alt="Bánh mì">
                </div>
                <div class="aww-item aww-item-small" data-parallax="0.08">
                    <img src="Jidla/SnapInsta.to_517685650_17862302907431463_513710932625131433_n.jpg" alt="Miska s bylinkami">
                </div>
                <div class="aww-item aww-item-medium" data-parallax="-0.02">
                    <img src="Jidla/SnapInsta.to_496117226_17854406463431463_2838914249787590050_n.jpg" alt="Hovězí bowl">
                    <div class="aww-caption">Hovězí Bowl</div>
                </div>
            </div>

            <!-- Featured Dish Mid -->
            <div class="aww-feature animate-on-scroll">
                <div class="aww-item aww-item-large" data-parallax="0.05">
                    <img src="Jidla/SnapInsta.to_504495216_17858217009431463_6988883962574187862_n.jpg" alt="Pravé Phở">
                    <div class="aww-caption">Signaturní Phở</div>
                </div>
            </div>

            <!-- Structured Grid 2 -->
            <div class="aww-grid aww-grid-2 animate-on-scroll">
                <div class="aww-item aww-item-small" data-parallax="0.03">
                    <img src="Jidla/SnapInsta.to_504436312_17858217027431463_7491775255494949192_n.jpg" alt="Jarní závitky">
                </div>
                <div class="aww-item aww-item-medium" data-parallax="-0.01">
                    <img src="Jidla/SnapInsta.to_525793721_17865000087431463_8669714115790300123_n.jpg" alt="Denní menu">
                </div>
                <div class="aww-item aww-item-small" data-parallax="0.06">
                    <img src="Jidla/SnapInsta.to_541998128_17869344234431463_9046176636431765285_n.jpg" alt="Detail talíře">
                </div>
                <div class="aww-item aww-item-medium" data-parallax="0.02">
                    <img src="Jidla/SnapInsta.to_579541805_17876547636431463_6051367342237002503_n.jpg" alt="Grilovaná mísa">
                    <div class="aww-caption">Grilovaná Mísa</div>
                </div>
            </div>
            
            <!-- Grid 3 -->
            <div class="aww-grid aww-grid-3 animate-on-scroll">
                <div class="aww-item aww-item-medium" data-parallax="-0.03">
                    <img src="Jidla/SnapInsta.to_553189835_17871516525431463_920476333590412079_n.jpg" alt="Rýžový bowl">
                </div>
                <div class="aww-item aww-item-large" data-parallax="0.04">
                    <img src="Jidla/SnapInsta.to_581815480_17876547621431463_915883707193072805_n.jpg" alt="Asijská polévka">
                    <div class="aww-caption">Křehká Polévka</div>
                </div>
                <div class="aww-item aww-item-small" data-parallax="0.05">
                    <img src="Jidla/SnapInsta.to_573249946_17875902783431463_3874880771773861351_n.jpg" alt="Nudle se zeleninou">
                </div>
            </div>
        </div>
    </section>
`;

indexContent = indexContent.replace(galleryRegexHTML, newGalleryHTML);

// CSS
const galleryRegexCSS = /\/\* ══════════════════════════════════════════ ART GALLERY REDESIGN ══════════════════════════════════════════ \*\/[\s\S]*?(?=\/\* ══════════════════════════════════════════ MENU ══════════════════════════════════════════ \*\/)/;

const newGalleryCSS = `/* ══════════════════════════════════════════ ART GALLERY REDESIGN ══════════════════════════════════════════ */
.aww-gallery {
    padding: 160px 0;
    background: #fbf8f1; /* Subtle warm neutral tone background */
    position: relative;
    width: 100%;
}

.aww-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 100px;
    padding: 0 40px;
}

.aww-title {
    font-family: var(--font-head);
    font-size: clamp(3rem, 5vw, 4.5rem);
    font-weight: 800;
    color: var(--black);
    margin: 16px 0 24px;
    letter-spacing: -0.02em;
    line-height: 1.1;
}

.aww-subtitle {
    font-family: var(--font-main);
    font-size: 1.15rem;
    color: var(--gray);
    line-height: 1.7;
    max-width: 600px;
    margin: 0 auto;
}

.aww-container {
    max-width: 1560px;
    margin: 0 auto;
    padding: 0 4vw;
    display: flex;
    flex-direction: column;
    gap: 8vw;
}

.aww-item {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 10px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.03);
    background: #fff;
    will-change: transform;
    /* Smooth, premium transition */
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.aww-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.aww-item:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 24px 60px rgba(0,0,0,0.12);
    z-index: 10;
}

.aww-item:hover img {
    transform: scale(1.05);
}

/* Captions inside images */
.aww-caption {
    position: absolute;
    bottom: 30px;
    left: 30px;
    background: var(--white);
    padding: 10px 20px;
    border-radius: 50px;
    font-family: var(--font-head);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--black);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    transition: transform 0.4s ease;
    pointer-events: none;
}

.aww-item:hover .aww-caption {
    transform: translateY(-4px);
}

/* Layout Hierarchy */
.aww-hero {
    display: flex;
    justify-content: center;
}
.aww-item-hero {
    width: 100%;
    max-width: 1100px;
    height: clamp(400px, 65vh, 850px);
}

.aww-feature {
    display: flex;
    justify-content: center;
}
.aww-item-large {
    width: 100%;
    max-width: 900px;
    height: clamp(350px, 55vh, 750px);
}

.aww-grid {
    display: grid;
    gap: 3vw;
    align-items: center;
}

/* Grid 1: medium - small - medium */
.aww-grid-1 {
    grid-template-columns: 2fr 1fr 2fr;
}
.aww-grid-1 .aww-item { height: clamp(250px, 40vw, 550px); }
.aww-grid-1 .aww-item-small { height: clamp(180px, 20vw, 350px); }

/* Grid 2: small - medium - small - medium */
.aww-grid-2 {
    grid-template-columns: 1fr 2fr 1.2fr 2fr;
    align-items: end;
}
.aww-grid-2 .aww-item { height: clamp(200px, 30vw, 450px); }
.aww-grid-2 .aww-item-small { height: clamp(150px, 20vw, 280px); }

/* Grid 3: medium - large - small */
.aww-grid-3 {
    grid-template-columns: 1.5fr 3fr 1fr;
    align-items: start;
}
.aww-grid-3 .aww-item-medium { height: clamp(250px, 35vw, 500px); }
.aww-grid-3 .aww-item-large { height: clamp(300px, 50vw, 650px); }
.aww-grid-3 .aww-item-small { height: clamp(200px, 25vw, 350px); }

/* Mobile Optimization: Masonry / Stack */
@media (max-width: 1024px) {
    .aww-grid-1 { grid-template-columns: 1.5fr 1fr; }
    .aww-grid-2 { grid-template-columns: 1fr 1fr; }
    .aww-grid-3 { grid-template-columns: 1fr 1.5fr; }
    .aww-item-small { display: none; } /* Hide detail shots on tablet to preserve focus */
    .aww-caption { bottom: 20px; left: 20px; }
}

@media (max-width: 768px) {
    .aww-gallery { padding: 80px 0 100px; }
    .aww-header { margin-bottom: 60px; }
    .aww-grid { grid-template-columns: 1fr !important; gap: 32px; }
    .aww-container { gap: 48px; }
    .aww-item { 
        height: 400px !important; 
        max-width: 100% !important; 
    }
}
`;

styleContent = styleContent.replace(galleryRegexCSS, newGalleryCSS);

// JS
jsContent = jsContent.replace(/const items = document\.querySelectorAll\('\.art-item'\);/, "const items = document.querySelectorAll('.aww-item');");

fs.writeFileSync(indexFile, indexContent, 'utf8');
fs.writeFileSync(cssFile, styleContent, 'utf8');
fs.writeFileSync(jsFile, jsContent, 'utf8');

console.log('Success');
