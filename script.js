  if ('serviceWorker' in navigator) {
    // unregister all service workers to avoid cached content
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  // Force reload ignoring cache
  window.addEventListener('load', () => {
    fetch(window.location.href, { cache: "no-store" })
      .then(() => window.location.reload(true));
  });

  const today = new Date();
  const todayDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const todayDate = today.getDate(); // Day of month

  const dayCardsContainer = document.querySelector('.days-grid');
  const dayCards = Array.from(dayCardsContainer.children);

  // Map weekday indices to your card order (Mon=0, Sun=6)
  const cardDays = dayCards.map((card, index) => (index + 1) % 7);

  // Create new ordered array with current day first
  const orderedCards = [];
  const todayIndexInCards = cardDays.indexOf(todayDayOfWeek);

  for (let i = 0; i < dayCards.length; i++) {
    const card = dayCards[(todayIndexInCards + i) % dayCards.length];

    // Calculate the day of the month for this card
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

  // Clear the container and append in new order
  dayCardsContainer.innerHTML = '';
  orderedCards.forEach(card => dayCardsContainer.appendChild(card));