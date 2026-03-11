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
            'operational': { color: 'var(--teal)', label: 'Operational', icon: '🟢' },
            'disruption': { color: 'var(--amber)', label: 'Partial Disruption', icon: '🟡' },
            'outage': { color: 'var(--rose)', label: 'Major Outage', icon: '🔴' },
            'maintenance': { color: 'var(--blue)', label: 'Maintenance', icon: '🔵' }
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
                    border: 1px solid var(--bdr, #e4e1db);
                    border-radius: 12px;
                    padding: 1.2rem;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    box-shadow: var(--s1, 0 1px 3px rgba(0,0,0,0.06));
                }

                :host(:hover) {
                    transform: translateY(-2px);
                    box-shadow: var(--s2, 0 4px 16px rgba(0,0,0,0.08));
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.8rem;
                }

                .service-name {
                    font-weight: 600;
                    font-size: 1rem;
                    color: var(--ink, #0d1117);
                }

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: ${config.color};
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: ${config.color};
                    box-shadow: 0 0 8px ${config.color}80;
                }

                .card-footer {
                    font-size: 0.75rem;
                    color: var(--ink4, #939bac);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid var(--bdr, #e4e1db);
                    padding-top: 0.8rem;
                    margin-top: 0.8rem;
                }

                [data-theme="dark"] :host {
                    background: var(--surf, #141928);
                    border-color: var(--bdr, rgba(255,255,255,0.07));
                }
            </style>
            <div class="card-header">
                <span class="service-name">${name}</span>
                <div class="status-indicator">
                    <div class="status-dot"></div>
                    <span>${config.label}</span>
                </div>
            </div>
            <div class="card-footer">
                <span>Last checked</span>
                <span>${lastChecked}</span>
            </div>
        `;
    }
}

customElements.define('status-card', StatusCard);
