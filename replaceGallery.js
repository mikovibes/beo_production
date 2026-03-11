const fs = require('fs');

const indexFile = 'c:/Users/Jakub/Desktop/Beo An/index.html';
const cssFile = 'c:/Users/Jakub/Desktop/Beo An/style.css';

let indexContent = fs.readFileSync(indexFile, 'utf8');
let styleContent = fs.readFileSync(cssFile, 'utf8');

// Replace Gallery Section in HTML
const galleryRegexHTML = /    <!-- ══════════════════════════════════════════ GALLERY ══════════════════════════════════════════ -->\r?\n    <section id="gallery">[\s\S]*?    <\/section>\r?\n/;

const newGalleryHTML = `    <!-- ══════════════════════════════════════════ GALLERY ══════════════════════════════════════════ -->
    <section id="gallery" class="art-gallery-section">
        <div class="art-header animate-on-scroll">
            <div class="section-label">Kulinářská Expozice</div>
            <h2 class="section-title" style="font-family: 'DynaPuff', cursive; font-weight: 700;">Umění na <span class="accent-yellow">talíři</span></h2>
            <p class="section-sub">Naše pokrmy nejsou jen jídlo. Jsou to barvy, tvary a textury Vietnamu pečlivě vrstvené do dokonalé kompozice.</p>
        </div>

        <div class="art-canvas gallery-lightbox-container">
            <div class="art-parallax-wrap overlap-right" style="z-index:3;" data-parallax="0.04">
                <div class="art-item lvl-hero frame-polaroid" style="transform: rotate(-3deg); --mobile-rot: -2deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_495726980_17854406460431463_352625677572086672_n.jpg" alt="Bún bò" />
                        <div class="art-caption">Tradiční Bún Bò</div>
                    </div>
                </div>
            </div>

            <div class="art-parallax-wrap offset-down" style="z-index:4;" data-parallax="0.07">
                <div class="art-item lvl-support frame-modern" style="transform: rotate(4deg); --mobile-rot: 3deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_559346883_17872534083431463_2990940697137328148_n.jpg" alt="Bánh mì" />
                    </div>
                </div>
            </div>

            <div class="art-parallax-wrap offset-up overlap-left" style="z-index:5;" data-parallax="0.12">
                <div class="art-item lvl-detail frame-minimal" style="transform: rotate(-6deg); --mobile-rot: -4deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_517685650_17862302907431463_513710932625131433_n.jpg" alt="Bowl" />
                    </div>
                </div>
            </div>

            <div class="art-parallax-wrap offset-left" style="z-index:2;" data-parallax="0.05">
                <div class="art-item lvl-support frame-polaroid" style="transform: rotate(2deg); margin-left:8vw; --mobile-rot: 1deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_496117226_17854406463431463_2838914249787590050_n.jpg" alt="Hovězí bowl" />
                        <div class="art-caption">Hovězí Bowl</div>
                    </div>
                </div>
            </div>

            <div class="art-break"></div>

            <div class="art-parallax-wrap overlap-right mt-desktop" style="z-index:3;" data-parallax="0.06">
                <div class="art-item lvl-hero frame-modern" style="transform: rotate(2deg); margin-left:4vw; --mobile-rot: 2deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_504495216_17858217009431463_6988883962574187862_n.jpg" alt="Phở" />
                    </div>
                </div>
            </div>

            <div class="art-parallax-wrap offset-down overlap-left" style="z-index:6;" data-parallax="0.15">
                <div class="art-item lvl-detail frame-polaroid" style="transform: rotate(-4deg); --mobile-rot: -3deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_504436312_17858217027431463_7491775255494949192_n.jpg" alt="Závitky" />
                        <div class="art-caption">Jarní Závitky</div>
                    </div>
                </div>
            </div>

            <div class="art-parallax-wrap offset-up ml-desktop" style="z-index:2;" data-parallax="0.03">
                <div class="art-item lvl-support frame-minimal" style="transform: rotate(-2deg); --mobile-rot: 0deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_525793721_17865000087431463_8669714115790300123_n.jpg" alt="Denní menu" />
                    </div>
                </div>
            </div>

            <div class="art-break"></div>

            <div class="art-parallax-wrap offset-down overlap-right ml-neg-desktop" style="z-index:3;" data-parallax="0.08">
                <div class="art-item lvl-support frame-polaroid" style="transform: rotate(5deg); --mobile-rot: 4deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_541998128_17869344234431463_9046176636431765285_n.jpg" alt="Speciální talíř" />
                        <div class="art-caption">Speciální Talíř</div>
                    </div>
                </div>
            </div>

            <div class="art-parallax-wrap mt-desktop" style="z-index:2;" data-parallax="0.04">
                <div class="art-item lvl-hero frame-minimal" style="transform: rotate(-1deg); --mobile-rot: -1deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_579541805_17876547636431463_6051367342237002503_n.jpg" alt="Grilovaná mísa" />
                    </div>
                </div>
            </div>

            <div class="art-parallax-wrap offset-up overlap-left ml-neg-desktop2" style="z-index:5;" data-parallax="0.1">
                <div class="art-item lvl-detail frame-modern" style="transform: rotate(6deg); --mobile-rot: 5deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_553189835_17871516525431463_920476333590412079_n.jpg" alt="Rýžový bowl" />
                    </div>
                </div>
            </div>

            <div class="art-break"></div>

            <div class="art-parallax-wrap overlap-right ml-desktop2" style="z-index:3;" data-parallax="0.05">
                <div class="art-item lvl-support frame-minimal" style="transform: rotate(-3deg); --mobile-rot: -2deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_573249946_17875902783431463_3874880771773861351_n.jpg" alt="Nudle" />
                    </div>
                </div>
            </div>

            <div class="art-parallax-wrap offset-down overlap-left" style="z-index:4;" data-parallax="0.07">
                <div class="art-item lvl-detail frame-polaroid" style="transform: rotate(4deg); --mobile-rot: 3deg;">
                    <div class="art-frame">
                        <img src="Jidla/SnapInsta.to_581815480_17876547621431463_915883707193072805_n.jpg" alt="Polévka" />
                        <div class="art-caption">Mořská Polévka</div>
                    </div>
                </div>
            </div>

        </div>
    </section>
`;

indexContent = indexContent.replace(galleryRegexHTML, newGalleryHTML);

// Replace Gallery Section in CSS
const galleryRegexCSS = /\/\* ══════════════════════════════════════════ GALLERY ══════════════════════════════════════════ \*\/[\s\S]*?(?=\/\* ══════════════════════════════════════════ MENU ══════════════════════════════════════════ \*\/)/;

const newGalleryCSS = `/* ══════════════════════════════════════════ ART GALLERY REDESIGN ══════════════════════════════════════════ */
.art-gallery-section {
    padding: 120px 0 160px;
    background: var(--cream);
    overflow: hidden;
    position: relative;
    width: 100%;
}

.art-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 100px;
    padding: 0 40px;
    position: relative;
    z-index: 10;
}

.art-header .section-label {
    background: var(--black);
    color: var(--yellow);
    border-color: var(--black);
}

.art-canvas {
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 4vw;
    box-sizing: border-box;
}

.art-parallax-wrap {
    position: relative;
    display: inline-block;
    transition: transform 0.1s ease-out; /* smooth parallax */
}

.art-break {
    flex-basis: 100%;
    height: 0;
}

/* Base Art Item */
.art-item {
    position: relative;
    flex-shrink: 0;
    will-change: transform;
    transition: z-index 0s, filter 0.4s ease;
    filter: drop-shadow(0 15px 35px rgba(0,0,0,0.12));
    cursor: pointer;
}

.art-frame {
    background: var(--white);
    padding: 12px 12px 36px 12px;
    border-radius: var(--radius-sm);
    border: 1px solid rgba(0,0,0,0.05);
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
    width: 100%;
    height: 100%;
    position: relative;
}

/* Captions */
.art-item.frame-polaroid .art-caption {
    position: absolute;
    bottom: 8px;
    left: 0;
    width: 100%;
    text-align: center;
    font-family: var(--font-head);
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--black);
    pointer-events: none;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

/* Modern Frame */
.art-item.frame-modern .art-frame {
    padding: 0;
    border: 3px solid var(--black);
    border-radius: var(--radius-md);
    box-shadow: 6px 6px 0 var(--black);
}
.art-item.frame-modern .art-caption { display: none; }

/* Minimal Frame */
.art-item.frame-minimal .art-frame {
    padding: 8px;
    background: transparent;
    border: none;
    border-radius: var(--radius-lg);
    box-shadow: none;
}
.art-item.frame-minimal .art-frame img {
    border-radius: var(--radius-lg);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}
.art-item.frame-minimal .art-caption { display: none; }

.art-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    transform-origin: center;
}

/* Hover Effects */
.art-item:hover {
    z-index: 50 !important;
    filter: drop-shadow(0 25px 45px rgba(0,0,0,0.22));
}

.art-item:hover .art-frame {
    transform: scale(1.05) translateY(-8px) rotate(0deg); 
}
.art-item.frame-modern:hover .art-frame {
    box-shadow: 12px 12px 0 var(--yellow);
}

.art-item:hover .art-frame img {
    transform: scale(1.08);
}

/* Hierarchy Sizes */
.lvl-hero {
    width: clamp(320px, 35vw, 650px);
    height: clamp(420px, 45vw, 800px);
}
.lvl-support {
    width: clamp(240px, 25vw, 420px);
    height: clamp(300px, 32vw, 520px);
}
.lvl-detail {
    width: clamp(160px, 16vw, 260px);
    height: clamp(160px, 16vw, 260px);
}

/* Desktop position tweaking */
@media (min-width: 1025px) {
    .offset-up { transform: translateY(-8vw); }
    .offset-down { transform: translateY(8vw); }
    .offset-left { margin-left: -5vw; }
    .offset-right { margin-right: -5vw; }
    .overlap-left { margin-left: -12vw; }
    .overlap-right { margin-right: -12vw; }
    .mt-desktop { margin-top: 4vw; }
    .ml-desktop { margin-left: 6vw; }
    .ml-desktop2 { margin-left: 12vw; }
    .ml-neg-desktop { margin-left: -6vw; }
    .ml-neg-desktop2 { margin-left: -10vw; }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .offset-up { transform: translateY(-4vw); }
    .offset-down { transform: translateY(4vw); }
    .overlap-left { margin-left: -8vw; }
    .overlap-right { margin-right: -8vw; }
    .lvl-hero { width: 42vw; height: 50vw; }
    .lvl-support { width: 32vw; height: 38vw; }
    .lvl-detail { width: 22vw; height: 22vw; }
}

/* Mobile Stack */
@media (max-width: 768px) {
    .art-gallery-section { padding: 80px 0; }
    .art-header { margin-bottom: 40px; }
    .art-canvas {
        flex-direction: column;
        gap: 30px;
        padding: 0 5vw;
    }
    .art-parallax-wrap {
        margin: 0 !important;
        transform: none !important;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .art-break { display: none; }
    .art-item {
        width: 100% !important;
        max-width: 450px !important;
        height: auto !important;
        aspect-ratio: 4/5;
        margin: 0 !important;
        transform: rotate(calc(var(--mobile-rot, 0deg))) !important;
    }
    .lvl-detail {
        aspect-ratio: 1/1;
        width: 80% !important;
    }
}
`;

styleContent = styleContent.replace(galleryRegexCSS, newGalleryCSS);

fs.writeFileSync(indexFile, indexContent, 'utf8');
fs.writeFileSync(cssFile, styleContent, 'utf8');
console.log('HTML and CSS updated.');
