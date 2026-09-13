const fs = require('fs');
const html = fs.readFileSync('login.html', 'utf8');
console.log(html.includes('aria-label="Show password"'));
