/* ==========================================================================
   SEMO DEPARTMENT STORE - INTERACTIVIDAD Y LÓGICA DE CLIENTE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initSubscribeForm();
  initEventModal();
  initCatalogFilters();
  initQuickViewModal();
});

/* --------------------------------------------------------------------------
   1. CONTADOR REGRESIVO FLASH SALE
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  // Establecer cuenta regresiva de 14 horas desde el momento actual
  let totalSeconds = 14 * 3600 + 45 * 60 + 22;

  function updateTimer() {
    if (totalSeconds <= 0) {
      totalSeconds = 24 * 3600; // Reiniciar cuenta si llega a 0
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');

    totalSeconds--;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   2. FORMULARIO DE SUSCRIPCIÓN CLUB VIP
   -------------------------------------------------------------------------- */
function initSubscribeForm() {
  const form = document.getElementById('subscribe-form');
  const modal = document.getElementById('subscribe-modal');
  const closeBtn = document.getElementById('close-subscribe-modal');
  const userEmailSpan = document.getElementById('registered-email');

  if (!form || !modal) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (email) {
      if (userEmailSpan) userEmailSpan.textContent = email;
      modal.classList.add('active');
      form.reset();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   3. MODAL DE RESERVACIÓN DE EVENTOS (RSVP)
   -------------------------------------------------------------------------- */
function initEventModal() {
  const eventButtons = document.querySelectorAll('.btn-rsvp');
  const modal = document.getElementById('event-modal');
  const closeBtn = document.getElementById('close-event-modal');
  const eventNameEl = document.getElementById('modal-event-name');
  const rsvpForm = document.getElementById('rsvp-form');

  if (!modal) return;

  eventButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.getAttribute('data-event') || 'Evento Exclusivo SEMO';
      if (eventNameEl) eventNameEl.textContent = eventName;
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Excelente! Tu pase VIP digital ha sido enviado a tu correo electrónico.');
      modal.classList.remove('active');
      rsvpForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   4. FILTROS DE CATEGORÍA EN EL CATÁLOGO
   -------------------------------------------------------------------------- */
function initCatalogFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.catalog-card');

  if (filterBtns.length === 0 || productCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. MODAL DE VISTA PREVIA RÁPIDA (QUICK VIEW)
   -------------------------------------------------------------------------- */
function initQuickViewModal() {
  const quickViewBtns = document.querySelectorAll('.btn-quickview');
  const modal = document.getElementById('quickview-modal');
  const closeBtn = document.getElementById('close-quickview-modal');
  const modalTitle = document.getElementById('qv-title');
  const modalPrice = document.getElementById('qv-price');
  const modalOldPrice = document.getElementById('qv-old-price');
  const modalDesc = document.getElementById('qv-desc');

  if (!modal) return;

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || 'Producto Exclusivo SEMO';
      const price = btn.getAttribute('data-price') || '$0.00';
      const oldPrice = btn.getAttribute('data-old') || '';
      const desc = btn.getAttribute('data-desc') || 'Promoción especial por tiempo limitado en SEMO.';

      if (modalTitle) modalTitle.textContent = title;
      if (modalPrice) modalPrice.textContent = price;
      if (modalOldPrice) modalOldPrice.textContent = oldPrice;
      if (modalDesc) modalDesc.textContent = desc;

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}
