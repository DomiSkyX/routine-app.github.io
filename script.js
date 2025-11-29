// ===============================
// 1. FORCE REFRESH AND CLEAR SERVICE WORKERS
// ===============================

if (!localStorage.getItem("app_version_checked")) {
    localStorage.setItem("app_version_checked", "true");

    // Unregister all service workers
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(reg => reg.unregister());
        });
    }

    // Hard reload the page to fetch newest version
    window.location.reload();
}

// ===============================
// 2. Remove loading overlay when page is ready
// ===============================
window.addEventListener("load", () => {
    const overlay = document.getElementById("loading-overlay");
    if (overlay) overlay.style.display = "none";

    initDaysGrid();         // call your days-grid logic after page loads
    initPlansTasksSwitcher(); // set up Plans/Tasks switcher
});

// ===============================
// 3. Days grid logic
// ===============================
function initDaysGrid() {
    const today = new Date();
    const todayDayOfWeek = today.getDay(); // 0 = Sunday
    let currentDate = today.getDate();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const dayCardsContainer = document.querySelector('.days-grid');
    const dayCards = Array.from(dayCardsContainer.children);

    // Map weekday indices to your card order (Mon=0, Sun=6)
    const cardDays = dayCards.map((card, index) => (index + 1) % 7);
    const orderedCards = [];
    const todayIndexInCards = cardDays.indexOf(todayDayOfWeek);

    for (let i = 0; i < dayCards.length; i++) {
        const card = dayCards[(todayIndexInCards + i) % dayCards.length];

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        if (currentDate > daysInMonth) {
            currentDate = 1;
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        }

        card.querySelector('span').textContent = currentDate;

        if (i === 0) {
            card.classList.remove('upcoming-day-card');
            card.classList.add('current-day-card');
        } else {
            card.classList.remove('current-day-card');
            card.classList.add('upcoming-day-card');
        }

        currentDate++;
        orderedCards.push(card);
    }

    dayCardsContainer.innerHTML = '';
    orderedCards.forEach(card => dayCardsContainer.appendChild(card));
}

// ===============================
// 4. Plans/Tasks switcher logic
// ===============================
function initPlansTasksSwitcher() {
    const plansBtn = document.querySelector('.plans-tasks-switcher button:nth-child(1)');
    const tasksBtn = document.querySelector('.plans-tasks-switcher button:nth-child(2)');

    const plansSection = document.getElementById('plans-section');
    const tasksSection = document.getElementById('tasks-section');

    // Default: show Plans
    plansSection.style.display = 'flex';
    tasksSection.style.display = 'none';
    plansBtn.classList.add('active');

    plansBtn.addEventListener('click', () => {
        plansSection.style.display = 'flex';
        tasksSection.style.display = 'none';
        plansBtn.classList.add('active');
        tasksBtn.classList.remove('active');
    });

    tasksBtn.addEventListener('click', () => {
        plansSection.style.display = 'none';
        tasksSection.style.display = 'flex';
        tasksBtn.classList.add('active');
        plansBtn.classList.remove('active');
    });
}
