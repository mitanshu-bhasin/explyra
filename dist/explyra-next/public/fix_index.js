const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Fix product section stacking with Regex
const prodInnerRegex = /\.prod-inner\s*\{[^}]*grid-template-columns:\s*1fr 1fr;[^}]*\}/;
const prodInnerNew = `.prod-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            align-items: center
        }

        @media (max-width: 1024px) {
            .prod-inner {
                grid-template-columns: 1fr;
                gap: 3rem;
                text-align: center;
            }
            .prod-inner.rev {
                direction: ltr;
            }
            .prod-inner.rev > * {
                direction: ltr;
            }
            .prod-label {
                justify-content: center;
            }
            .feat-list {
                align-items: center;
            }
            .prod-actions {
                justify-content: center;
            }
        }`;

if (prodInnerRegex.test(content)) {
    content = content.replace(prodInnerRegex, prodInnerNew);
    console.log('Fixed prod-inner stacking');
} else {
    console.log('Could not find prod-inner with regex');
}

// 2. Add lazy loading to images
content = content.replace(/<img\s+src="nobg\.png"\s+alt="Explyra">/g, '<img src="nobg.png" alt="Explyra" loading="lazy">');
content = content.replace(/<img\s+src="nobg\.png"\s+alt="Explyra Logo">/g, '<img src="nobg.png" alt="Explyra Logo" loading="lazy">');

// 3. Fix navbar overflow issue
if (!content.includes('nav-right { gap: .5rem }')) {
    const navFix = `
        @media (max-width: 1024px) {
            .nav-links { display: none; }
            .nav-right { gap: .5rem; }
            .theme-pill-label { display: none; }
            .btn-try { display: none; }
        }
    `;
    content = content.replace('</style>', navFix + '\n    </style>');
}

fs.writeFileSync('index.html', content);
console.log('index.html process complete');
