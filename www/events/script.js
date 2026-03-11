document.addEventListener('DOMContentLoaded', () => {
    const eventsGrid = document.getElementById('eventsGrid');
    const searchInput = document.getElementById('eventSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let allEvents = [];

    // Fetch and Render Events
    async function initEvents() {
        try {
            console.log('Fetching events.json...');
            const response = await fetch('./events.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allEvents = await response.json();
            console.log('Events loaded:', allEvents);
            renderEvents(allEvents);
        } catch (error) {
            console.error('Error loading events:', error);
            eventsGrid.innerHTML = `<div class="error-msg"><p>Failed to load events. Please try again later.</p><small>${error.message}</small></div>`;
        }
    }

    function renderEvents(events) {
        if (events.length === 0) {
            eventsGrid.innerHTML = '<div class="no-results"><p>No events found matching your criteria.</p></div>';
            return;
        }

        eventsGrid.innerHTML = events.map(event => `
            <div class="event-card reveal" data-category="${event.category}">
                <div class="event-thumb">
                    <img src="${event.thumbnail}" alt="${event.title}" loading="lazy">
                </div>
                <div class="event-content">
                    <div class="event-meta">
                        <span class="event-type">${event.type}</span>
                        <span class="event-date">${event.date}</span>
                    </div>
                    <h3>${event.title}</h3>
                    <p>${event.shortDescription}</p>
                    <a href="${event.url}" class="btn-event">View Details</a>
                </div>
            </div>
        `).join('');

        // Trigger reveal animation
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        }, 100);
    }

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allEvents.filter(event => 
            event.title.toLowerCase().includes(term) || 
            event.shortDescription.toLowerCase().includes(term)
        );
        renderEvents(filtered);
    });

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            if (category === 'all') {
                renderEvents(allEvents);
            } else {
                const filtered = allEvents.filter(event => event.category === category);
                renderEvents(filtered);
            }
        });
    });

    initEvents();
});
