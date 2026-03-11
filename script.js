/* ══════════════════════════════════════════ SCRIPT.JS ══════════════════════════════════════════
   Béo Ăn Restaurant — Interactive JavaScript
   Handles: Loader, Navbar, Scroll Animations, Menu Tabs, Cart, Vouchers, Parallax
═══════════════════════════════════════════════════════════════════════════════════════════════ */

'use strict';

// ── Cart State ──
let cart = [];
let voucherSelected = null;

// ════════════════════════════════ LOADER ════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');

  // Ensure minimum loader display time for brand impression
  const startTime = Date.now();
  const MIN_DISPLAY = 2200;

  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY - elapsed);

    setTimeout(() => {
      loader.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = '';
      }, 700);
    }, remaining);
  });

  // Prevent scroll while loading
  document.body.style.overflow = 'hidden';

  // Init everything after DOM is ready
  initNavbar();
  initScrollAnimations();
  initMenuTabs();
  initParallax();
  initMobileNav();
});

// ════════════════════════════════ NAVBAR ════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ════════════════════════════════ MOBILE NAV ════════════════════════════════
function initMobileNav() {
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');

  burger.addEventListener('click', () => {
    mobile.classList.toggle('open');
    // Animate burger bars
    const spans = burger.querySelectorAll('span');
    burger.classList.toggle('active');
    if (burger.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close when clicking a link
  document.querySelectorAll('.nm-link').forEach(link => {
    link.addEventListener('click', () => {
      mobile.classList.remove('open');
      burger.classList.remove('active');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// ════════════════════════════════ SCROLL ANIMATIONS ════════════════════════════════
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll, .animate-gallery');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ════════════════════════════════ PARALLAX ════════════════════════════════
function initParallax() {
  const mosaicCards = document.querySelectorAll('[data-parallax]');

  const onScroll = () => {
    const scrollY = window.scrollY;

    mosaicCards.forEach(card => {
      const factor = parseFloat(card.dataset.parallax);
      const rect = card.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
      card.style.transform = `translateY(${centerY * factor}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

// ════════════════════════════════ MENU TABS ════════════════════════════════
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;

      // Filter cards with animation
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease both';
          setTimeout(() => { card.style.animation = ''; }, 400);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ════════════════════════════════ CART / ORDER ════════════════════════════════
function addToCart(btn, name, price) {
  // Animate button
  btn.textContent = '✓';
  btn.style.background = '#4CAF50';
  setTimeout(() => {
    btn.textContent = '+';
    btn.style.background = '';
  }, 700);

  // Check if item already in cart
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  renderCart();
  showToast(`${name} přidáno do košíku 🛒`);
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  renderCart();
}

function renderCart() {
  const summary = document.getElementById('cartSummary');
  const total = document.getElementById('cartTotal');
  const totalAmt = document.getElementById('cartTotalAmt');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (cart.length === 0) {
    summary.innerHTML = '<div class="cart-empty">Váš košík je prázdný 🛒</div>';
    total.style.display = 'none';
    checkoutBtn.style.display = 'none';
    return;
  }

  const totalSum = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  summary.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.qty}× ${item.name}</span>
      <span>${item.price * item.qty} Kč</span>
      <button onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')">✕</button>
    </div>
  `).join('');

  totalAmt.textContent = `${totalSum} Kč`;
  total.style.display = 'flex';
  checkoutBtn.style.display = 'flex';
}

function checkout() {
  if (cart.length === 0) return;

  const items = cart.map(i => `${i.qty}× ${i.name}`).join(', ');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  showToast(`Děkujeme! Vaše objednávka (${total} Kč) byla přijata. Brzy vás budeme kontaktovat. ✅`);

  cart = [];
  renderCart();
}

// ════════════════════════════════ VOUCHERS ════════════════════════════════
function selectVoucher(el, amount) {
  voucherSelected = amount;

  // Hide all cards, show preview
  document.querySelector('.voucher-grid').style.display = 'none';
  const preview = document.getElementById('voucherPreview');
  preview.style.display = 'block';

  // Update preview
  document.getElementById('vpAmount').textContent = `${amount.toLocaleString('cs-CZ')} Kč`;

  // Generate random code
  const code = 'BEO-' + new Date().getFullYear() + '-' +
    Math.random().toString(36).substring(2, 6).toUpperCase();
  document.getElementById('vpCode').textContent = code;

  // Re-trigger animation
  preview.style.animation = 'none';
  requestAnimationFrame(() => {
    preview.style.animation = 'fadeInUp 0.5s both';
  });

  showToast(`Voucher v hodnotě ${amount.toLocaleString('cs-CZ')} Kč vybrán!`);
}

function closeVoucher() {
  document.querySelector('.voucher-grid').style.display = 'grid';
  document.getElementById('voucherPreview').style.display = 'none';
  voucherSelected = null;
}

function purchaseVoucher() {
  if (!voucherSelected) return;

  showToast(`🎁 Voucher ${voucherSelected.toLocaleString('cs-CZ')} Kč — přejdete na platbu. Děkujeme!`);

  setTimeout(() => {
    closeVoucher();
  }, 2000);
}

// ════════════════════════════════ TOAST ════════════════════════════════
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ════════════════════════════════ SMOOTH SCROLL OFFSET ════════════════════════════════
// Adjust for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const navHeight = document.getElementById('navbar').offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

// ════════════════════════════════ SUBTLE CURSOR TRAIL (Desktop) ════════════════════════════════
(function initCursorEffect() {
  if (window.innerWidth < 1024) return;

  let dots = [];
  const NUM_DOTS = 6;

  for (let i = 0; i < NUM_DOTS; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${6 + i * 2}px;
      height: ${6 + i * 2}px;
      background: rgba(255, 217, 61, ${0.7 - i * 0.1});
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      opacity: 0;
      transition: opacity 0.3s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dots[0].el.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    dots.forEach(d => d.el.style.opacity = '0');
  });

  function animateDots() {
    dots[0].x = mouseX;
    dots[0].y = mouseY;

    for (let i = 1; i < NUM_DOTS; i++) {
      dots[i].x += (dots[i - 1].x - dots[i].x) * 0.35;
      dots[i].y += (dots[i - 1].y - dots[i].y) * 0.35;
      dots[i].el.style.opacity = dots[0].el.style.opacity;
    }

    dots.forEach(d => {
      d.el.style.left = d.x + 'px';
      d.el.style.top = d.y + 'px';
    });

    requestAnimationFrame(animateDots);
  }

  animateDots();
})();

// ════════════════════════════════ GALLERY LIGHTBOX ════════════════════════════════
(function initLightbox() {
  const items = document.querySelectorAll('.aww-item');

  // Create lightbox
  const lb = document.createElement('div');
  lb.style.cssText = `
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.92);
    z-index: 8000;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    backdrop-filter: blur(8px);
  `;

  const lbImg = document.createElement('img');
  lbImg.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 20px;
    border: 4px solid #FFD93D;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
    object-fit: contain;
    animation: fadeInUp 0.3s ease;
  `;

  const lbClose = document.createElement('div');
  lbClose.textContent = '×';
  lbClose.style.cssText = `
    position: absolute;
    top: 24px; right: 32px;
    color: white; font-size: 3rem;
    cursor: pointer; line-height: 1;
    font-weight: 300;
    transition: color 0.2s;
  `;
  lbClose.onmouseover = () => lbClose.style.color = '#FFD93D';
  lbClose.onmouseout = () => lbClose.style.color = 'white';

  lb.appendChild(lbImg);
  lb.appendChild(lbClose);
  document.body.appendChild(lb);

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLb = () => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  };

  lb.addEventListener('click', closeLb);
  lbClose.addEventListener('click', closeLb);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLb();
  });
})();

// ════════════════════════════════ HERO LOGO JIGGLE ════════════════════════════════
(function initLogoJiggle() {
  const logo = document.querySelector('.hero-logo-wrap');
  if (!logo) return;

  logo.addEventListener('mouseenter', () => {
    logo.style.animation = 'jiggle 0.4s ease';
  });

  logo.addEventListener('animationend', () => {
    logo.style.animation = '';
  });

  // Add jiggle keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes jiggle {
      0% { transform: rotate(0deg); }
      20% { transform: rotate(-4deg) scale(1.02); }
      40% { transform: rotate(4deg) scale(1.02); }
      60% { transform: rotate(-2deg); }
      80% { transform: rotate(2deg); }
      100% { transform: rotate(0deg); }
    }
  `;
  document.head.appendChild(style);
})();

// ════════════════════════════════ STAT COUNTER ANIMATION ════════════════════════════════
(function initStatCounters() {
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  const gmLogo = document.querySelector('.stat-gm-logo');

  if (!statNums.length && !gmLogo) return;

  // Easing function: ease out quart
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1200; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      if (el.classList.contains('stat-num')) {
        animateCount(el);
      } else if (el.classList.contains('stat-gm-logo')) {
        // Small delay so it triggers after numbers start
        setTimeout(() => el.classList.add('animated'), 200);
      }

      observer.unobserve(el);
    });
  }, {
    threshold: 0.6
  });

  statNums.forEach(el => observer.observe(el));
  if (gmLogo) observer.observe(gmLogo);
})();

