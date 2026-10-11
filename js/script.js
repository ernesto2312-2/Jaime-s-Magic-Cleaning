// ============================================
// JAIME'S MAGIC CLEANING - Fresh Precision
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initFormHandling();
  initFrequencySelector();
  initAddonChips();
});

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .step, .review-card, .value-card, .team-member, .service-detail-card, .feature-card').forEach(el => {
    observer.observe(el);
  });
}

// Form handling
function initFormHandling() {
  const form = document.querySelector('.contact-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Request sent!</span>';
      submitBtn.style.backgroundColor = 'var(--secondary)';
      submitBtn.style.color = 'var(--on-secondary)';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
        form.reset();

        // Reset frequency buttons
        document.querySelectorAll('.freq-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        const defaultFreq = document.querySelector('.freq-btn[data-freq="weekly"]');
        if (defaultFreq) defaultFreq.classList.add('active');

        // Reset add-on chips
        document.querySelectorAll('.form-addon-chip').forEach(chip => {
          chip.classList.remove('selected');
        });
      }, 2500);
    }, 1500);
  });
}

// Frequency selector (Services page & Contact form)
function initFrequencySelector() {
  // Services page frequency toggle
  const freqRegular = document.getElementById('freq-regular');
  const freqOnetime = document.getElementById('freq-onetime');

  if (freqRegular && freqOnetime) {
    const priceNodes = document.querySelectorAll('.price-display');

    freqRegular.addEventListener('click', () => {
      freqRegular.className = 'px-5 py-2 rounded-full font-label-lg text-label-lg bg-surface-container-lowest text-primary shadow-sm transition-all duration-200';
      freqOnetime.className = 'px-5 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-all duration-200';

      priceNodes.forEach(node => {
        const base = parseInt(node.getAttribute('data-base'));
        const discounted = Math.round(base * 0.85);
        node.textContent = '$' + discounted;
      });
    });

    freqOnetime.addEventListener('click', () => {
      freqOnetime.className = 'px-5 py-2 rounded-full font-label-lg text-label-lg bg-surface-container-lowest text-primary shadow-sm transition-all duration-200';
      freqRegular.className = 'px-5 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-all duration-200';

      priceNodes.forEach(node => {
        const base = node.getAttribute('data-base');
        node.textContent = '$' + base;
      });
    });
  }

  // Contact form frequency buttons
  const freqBtns = document.querySelectorAll('.freq-btn');
  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      freqBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Add-on chips (Services page & Contact form)
function initAddonChips() {
  // Services page add-on chips
  const addonChips = document.querySelectorAll('.addon-chip');
  const addonBadge = document.getElementById('addon-badge');
  const addonCount = document.getElementById('addon-count');
  let selectedCount = 0;

  addonChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const isSelected = chip.getAttribute('data-selected') === 'true';
      const icon = chip.querySelector('.chip-icon');

      if (!isSelected) {
        chip.setAttribute('data-selected', 'true');
        chip.classList.add('selected');
        if (icon) {
          icon.textContent = '✓';
          icon.style.fontSize = '1rem';
          icon.style.fontWeight = '700';
        }
        selectedCount++;
      } else {
        chip.setAttribute('data-selected', 'false');
        chip.classList.remove('selected');
        if (icon) {
          icon.textContent = '+';
          icon.style.fontSize = '';
          icon.style.fontWeight = '';
        }
        selectedCount--;
      }

      if (addonCount) {
        addonCount.textContent = selectedCount + (selectedCount === 1 ? ' selected' : ' selected');
      }
      if (addonBadge) {
        if (selectedCount > 0) {
          addonBadge.classList.remove('hidden');
        } else {
          addonBadge.classList.add('hidden');
        }
      }
    });
  });

  // Contact form add-on chips
  const formAddonChips = document.querySelectorAll('.form-addon-chip');
  formAddonChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const icon = chip.querySelector('svg');
      if (icon) {
        if (chip.classList.contains('selected')) {
          icon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
        } else {
          icon.innerHTML = '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>';
        }
      }
    });
  });
}
