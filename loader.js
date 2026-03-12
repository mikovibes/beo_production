/* ═══════════════════════════════════════════════════════════════════
   BÉO ĂN — 3D Loader Logic
   Animation flow:
     1. Bowl pops up at the bottom (elastic bounce)
     2. Cloudy text rises like steam from the bowl → lands in CENTRE
     3. Steam particles drift upward continuously
   Exit: bowl sinks, logo drifts upward
═══════════════════════════════════════════════════════════════════ */

'use strict';

(function init3DLoader() {
    const loader         = document.getElementById('loader');
    const logo           = document.getElementById('loaderLogo');
    const shadow         = document.getElementById('loaderShadow');
    const pho            = document.getElementById('loaderPho');
    const loaderBar      = document.getElementById('loaderBar');
    const steamParticles = document.querySelectorAll('.steam-particle');

    if (!loader || !logo) return;

    // ── Pre-setup: hide everything before entrance ──
    gsap.set(loaderBar, { width: "0%" });
    gsap.set(shadow, { scaleY: 0.6, filter: "blur(40px)", y: 200, opacity: 0 });

    /*
     * The CSS already places .loader-logo-group at top:50%/translateY(-50%) = screen centre.
     * GSAP animates the .logo-layer INSIDE it with a y offset.
     *
     * logoStartY: how far BELOW the centre the text starts (near the bowl).
     * The bowl sits at roughly: screenHeight/2 - bowlHeight/2 below the centre.
     * We push the text a bit further so it clearly starts at the bowl.
     */
    const calcLogoStartY = () => {
        const bowlH = pho.offsetHeight || (window.innerWidth * 0.22);
        // Distance from screen centre to bowl centre:
        //   bowl centre Y = screenH - bottomMargin - bowlH/2
        //   screen centre Y = screenH/2
        //   offset = bowlCentreY - screenCentreY
        const screenH     = window.innerHeight;
        const bottomMargin = screenH * 0.05;   // ~5vh
        const bowlCentreY  = screenH - bottomMargin - bowlH / 2;
        const screenCentreY = screenH / 2;
        return bowlCentreY - screenCentreY + 60;  // +60px so it starts clearly at bowl
    };

    // ── Mouse Parallax (only active during loading) ──
    const rotateXTo    = gsap.quickTo(logo,   "rotationX", { duration: 0.6, ease: "power3.out" });
    const rotateYTo    = gsap.quickTo(logo,   "rotationY", { duration: 0.6, ease: "power3.out" });
    const translateXTo = gsap.quickTo(logo,   "x",         { duration: 0.6, ease: "power3.out" });
    const translateYTo = gsap.quickTo(logo,   "y",         { duration: 0.6, ease: "power3.out" });

    const shadowXTo    = gsap.quickTo(shadow, "x", { duration: 0.8, ease: "power3.out" });
    const shadowYTo    = gsap.quickTo(shadow, "y", { duration: 0.8, ease: "power3.out" });

    const phoRotateXTo = gsap.quickTo(pho,   "rotationX", { duration: 0.7, ease: "power3.out" });
    const phoRotateYTo = gsap.quickTo(pho,   "rotationY", { duration: 0.7, ease: "power3.out" });

    const handleMouseMove = (e) => {
        const x       = e.clientX / window.innerWidth;
        const y       = e.clientY / window.innerHeight;
        const xOffset = (x - 0.5) * 2;
        const yOffset = (y - 0.5) * 2;

        rotateYTo(-xOffset * 12);
        rotateXTo(yOffset  * 12);
        translateXTo(xOffset * 15);
        translateYTo(yOffset * 15);

        phoRotateYTo(-xOffset * 5);
        phoRotateXTo(yOffset  * 5);

        shadowXTo(-xOffset * 40);
        shadowYTo(-yOffset * 40);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── Entrance Timeline ──
    const tl = gsap.timeline({
        onComplete: () => {
            // Gentle float for the logo at centre
            gsap.to(logo, {
                y: "-=20",
                duration: 2.8,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

            // Subtle bob for the bowl
            gsap.to(pho, {
                y: "-=10",
                duration: 2.4,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: 0.3
            });

            gsap.to(shadow, {
                y: "+=12",
                opacity: 0.15,
                scaleY: 0.5,
                scaleX: 0.9,
                filter: "blur(55px)",
                duration: 2.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
        }
    });

    // Step 1 — Bowl pops up at the bottom (bouncy elastic entrance)
    tl.fromTo(pho,
        { scale: 0, opacity: 0, y: 140 },
        { scale: 1, opacity: 1, y: 0, duration: 1.6, ease: "elastic.out(1, 0.7)" },
        0.3   // slight pause before bowl appears
    );

    // Step 2 — Cloudy text RISES from the bowl like steam
    // Delayed so bowl fully lands first, then text slowly steams upward
    tl.fromTo(logo,
        {
            scale: 0.35,
            opacity: 0,
            y: calcLogoStartY(),  // starts near the bowl at the bottom
            rotationZ: -3,
            rotationX: 25,
            filter: "blur(28px)"  // very blurry at start — pure steam
        },
        {
            scale: 1,
            opacity: 1,
            y: 0,                 // lands at CSS centre
            rotationZ: 0,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 2,          // slow, dreamy rise
            ease: "power2.out"    // decelerates gradually — feels like steam settling
        },
        1.2   // bowl lands first, then text begins steaming up
    );

    tl.to(shadow, { opacity: 0.35, duration: 2.5 }, 1.8);

    // Progress bar runs across full duration
    tl.to(loaderBar, { width: "100%", duration: 6, ease: "slow(0.7, 0.7, false)" }, 0);

    // ── Steam Particle Loop ──
    steamParticles.forEach((steam, i) => {
        const spreadX = (i - 2) * 30;  // spread −60px … +60px around bowl centre

        gsap.set(steam, { x: spreadX, opacity: 0, scale: 0.3 });

        gsap.to(steam, {
            y: -500,
            x: `+=${(Math.random() - 0.5) * 140}`,
            opacity: 0,
            scale: 2 + Math.random() * 0.8,
            duration: 3 + Math.random() * 2.5,
            repeat: -1,
            delay: i * 0.6 + 0.5,
            ease: "power1.out",
            onRepeat: () => {
                gsap.set(steam, {
                    y: 0,
                    x: spreadX + (Math.random() - 0.5) * 50,
                    opacity: 0.5 + Math.random() * 0.2,
                    scale: 0.2 + Math.random() * 0.35
                });
            }
        });
    });

    // ── Exit ──
    window.addEventListener('load', () => {
        setTimeout(() => {
            window.removeEventListener('mousemove', handleMouseMove);

            const exitTl = gsap.timeline({
                onComplete: () => {
                    loader.classList.add('hidden');
                    document.body.style.overflow = '';
                    setTimeout(() => { loader.style.display = 'none'; }, 800);
                }
            });

            // Logo drifts upward and disappears
            exitTl.to(logo, {
                y: -90,
                scale: 1.04,
                opacity: 0,
                duration: 0.9,
                ease: "power2.in"
            }, 0);

            // Bowl sinks and disappears
            exitTl.to(pho, {
                y: 50,
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: "power2.in"
            }, 0.1);

            exitTl.to([shadow, loaderBar], {
                opacity: 0,
                duration: 0.6,
                ease: "power2.in"
            }, 0);

        }, 3800);
    });

    // Lock scroll during loading
    document.body.style.overflow = 'hidden';

})();
