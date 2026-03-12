class StatusCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['name', 'status', 'last-checked'];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    getStatusConfig(status) {
        const configs = {
            'operational': { color: 'var(--teal)', label: 'Operational' },
            'disruption': { color: 'var(--amber)', label: 'Partial Disruption' },
            'outage': { color: 'var(--rose)', label: 'Major Outage' },
            'maintenance': { color: 'var(--blue)', label: 'Maintenance' }
        };
        return configs[status.toLowerCase()] || configs['operational'];
    }

    render() {
        const name = this.getAttribute('name') || 'Service';
        const status = this.getAttribute('status') || 'operational';
        const lastChecked = this.getAttribute('last-checked') || 'N/A';
        const config = this.getStatusConfig(status);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: var(--surf, #ffffff);
                    padding: 1rem 1.25rem;
                }

                .card-body {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .service-name {
                    font-weight: 500;
                    font-size: 0.9375rem;
                    color: var(--ink, #111827);
                }

                .status-info {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .last-checked {
                    font-size: 0.75rem;
                    color: var(--ink4, #9ca3af);
                }

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: ${config.color};
                    min-width: 100px;
                    justify-content: flex-end;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: ${config.color};
                }

                [data-theme="dark"] .service-name {
                    color: var(--ink, #f9fafb);
                }
            </style>
            <div class="card-body">
                <span class="service-name">${name}</span>
                <div class="status-info">
                    <span class="last-checked">Checked: ${lastChecked}</span>
                    <div class="status-indicator">
                        <span>${config.label}</span>
                        <div class="status-dot"></div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('status-card', StatusCard);
