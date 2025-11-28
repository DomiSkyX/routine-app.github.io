
  // --- Clear Service Workers (once) ---
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  // --- Prevent caching for this load ---
  window.addEventListener('load', () => {
    // Only reload if page was loaded from cache
    if (performance.getEntriesByType("navigation")[0].transferSize === 0) {
      window.location.reload();
    }

    // --- Days grid logic ---
    const today = new Date();
    const todayDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const todayDate = today.getDate();

    const dayCardsContainer = document.querySelector('.days-grid');
    const dayCards = Array.from(dayCardsContainer.children);

    // Map weekday indices to your card order (Mon=0, Sun=6)
    const cardDays = dayCards.map((card, index) => (index + 1) % 7);

    // Reorder so current day is first
    const orderedCards = [];
    const todayIndexInCards = cardDays.indexOf(todayDayOfWeek);

    for (let i = 0; i < dayCards.length; i++) {
      const card = dayCards[(todayIndexInCards + i) % dayCards.length];

      // Calculate the day of the month for each card
      const offset = i;
      const cardDate = todayDate + offset;
      card.querySelector('span').textContent = cardDate;

      // Update classes
      if (i === 0) {
        card.classList.remove('upcoming-day-card');
        card.classList.add('current-day-card');
      } else {
        card.classList.remove('current-day-card');
        card.classList.add('upcoming-day-card');
      }

      orderedCards.push(card);
    }

    // Clear container and append in new order
    dayCardsContainer.innerHTML = '';
    orderedCards.forEach((card) => dayCardsContainer.appendChild(card));
  });
