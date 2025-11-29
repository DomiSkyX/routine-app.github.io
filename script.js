
  // --- Clear Service Workers (once) ---
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  window.addEventListener('load', () => {
    // --- Days grid logic ---
    const today = new Date();
    const todayDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    let currentDate = today.getDate();
    let currentMonth = today.getMonth(); // 0 = Jan, 11 = Dec
    let currentYear = today.getFullYear();

    const dayCardsContainer = document.querySelector('.days-grid');
    const dayCards = Array.from(dayCardsContainer.children);

    // Map weekday indices to your card order (Mon=0, Sun=6)
    const cardDays = dayCards.map((card, index) => (index + 1) % 7);

    // Reorder so current day is first
    const orderedCards = [];
    const todayIndexInCards = cardDays.indexOf(todayDayOfWeek);

    for (let i = 0; i < dayCards.length; i++) {
      const card = dayCards[(todayIndexInCards + i) % dayCards.length];

      // Get number of days in the current month
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      // Reset day and month if it exceeds the current month
      if (currentDate > daysInMonth) {
        currentDate = 1;
        currentMonth++;
        if (currentMonth > 11) { // December -> January
          currentMonth = 0;
          currentYear++;
        }
      }

      // Update day number in <span>
      card.querySelector('span').textContent = currentDate;

      // Update classes
      if (i === 0) {
        card.classList.remove('upcoming-day-card');
        card.classList.add('current-day-card');
      } else {
        card.classList.remove('current-day-card');
        card.classList.add('upcoming-day-card');
      }

      currentDate++; // increment for next card
      orderedCards.push(card);
    }

    // Clear container and append in new order
    dayCardsContainer.innerHTML = '';
    orderedCards.forEach((card) => dayCardsContainer.appendChild(card));
  });