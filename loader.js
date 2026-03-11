/* ═══════════════════════════════════════════════════════════════════
   BÉO ĂN — 3D Loader Logic
   Handles: 3D Entrance, Mouse Parallax, Steam particles
═══════════════════════════════════════════════════════════════════ */

'use strict';

(function init3DLoader() {
    const loader = document.getElementById('loader');
    const logo = document.getElementById('loaderLogo');
    const shadow = document.getElementById('loaderShadow');
    const pho = document.getElementById('loaderPho');
    const loaderBar = document.getElementById('loaderBar');
    const steamParticles = document.querySelectorAll('.steam-particle');

    if (!loader || !logo) return;

    // ── Pre-setup ──
    gsap.set(loaderBar, { width: "0%" });
    gsap.set(shadow, {
        scaleY: 0.6,
        filter: "blur(40px)",
        y: 200,
        opacity: 0
    });

    // ── Mouse Parallax Logic ──
    const rotateXTo = gsap.quickTo(logo, "rotationX", { duration: 0.6, ease: "power3.out" });
    const rotateYTo = gsap.quickTo(logo, "rotationY", { duration: 0.6, ease: "power3.out" });
    const translateXTo = gsap.quickTo(logo, "x", { duration: 0.6, ease: "power3.out" });
    const translateYTo = gsap.quickTo(logo, "y", { duration: 0.6, ease: "power3.out" });

    const shadowXTo = gsap.quickTo(shadow, "x", { duration: 0.8, ease: "power3.out" });
    const shadowYTo = gsap.quickTo(shadow, "y", { duration: 0.8, ease: "power3.out" });

    const phoRotateXTo = gsap.quickTo(pho, "rotationX", { duration: 0.7, ease: "power3.out" });
    const phoRotateYTo = gsap.quickTo(pho, "rotationY", { duration: 0.7, ease: "power3.out" });

    const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const xOffset = (x - 0.5) * 2;
        const yOffset = (y - 0.5) * 2;

        rotateYTo(-xOffset * 12);
        rotateXTo(yOffset * 12);
        translateXTo(xOffset * 15);
        translateYTo(yOffset * 15);

        phoRotateYTo(-xOffset * 5);
        phoRotateXTo(yOffset * 5);

        shadowXTo(-xOffset * 40);
        shadowYTo(-yOffset * 40);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── Entrance Sequence ──
    const tl = gsap.timeline({
        onComplete: () => {
            // Gentle continuous floating
            gsap.to(logo, {
                y: "-=30",
                duration: 2.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

            gsap.to(shadow, {
                y: "+=15",
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

    // 1. Pho Bowl Rise
    tl.fromTo(pho,
        { scale: 0, opacity: 0, y: 300 },
        { scale: 1, opacity: 1, y: 0, duration: 1.8, ease: "elastic.out(1, 0.75)" },
        0.5
    );

    // 3. Logo Rise (from the bowl)
    tl.fromTo(logo,
        { scale: 0, opacity: 0, y: 150, rotationZ: -5 },
        { scale: 1, opacity: 1, y: 0, rotationZ: 0, duration: 2, ease: "elastic.out(1, 0.7)" },
        0.8
    );

    tl.to(shadow, { opacity: 0.35, duration: 2 }, 0.8);

    // 4. Progress bar fill
    tl.to(loaderBar, { width: "100%", duration: 4, ease: "slow(0.7, 0.7, false)" }, 0);

    // ── Steam Loop ──
    steamParticles.forEach((steam, i) => {
        gsap.to(steam, {
            y: -500,
            x: `+=${(Math.random() - 0.5) * 150}`,
            opacity: 0,
            scale: 2,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            delay: i * 0.8,
            ease: "power1.out",
            onRepeat: () => {
                gsap.set(steam, { 
                    y: 0, 
                    x: (Math.random() - 0.5) * 100, 
                    opacity: 0.6, 
                    scale: 0.2 + Math.random() * 0.5 
                });
            }
        });
    });

    // ── Exit Logic ──
    window.addEventListener('load', () => {
        // Wait for entrance to mostly finish or a min time
        setTimeout(() => {
            const exitTl = gsap.timeline({
                onComplete: () => {
                    loader.classList.add('hidden');
                    document.body.style.overflow = '';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 800);
                }
            });

            // Fade out everything
            exitTl.to([logo, pho, shadow, loaderBar], {
                scale: 1.2,
                opacity: 0,
                duration: 1,
                ease: "power2.in"
            });

        }, 3500); // Minimum time to enjoy the animation
    });

    // Prevent scroll during loading
    document.body.style.overflow = 'hidden';

})();
