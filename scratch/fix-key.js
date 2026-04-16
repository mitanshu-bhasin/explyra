const fs = require('fs');
const path = require('path');

const keyPath = path.join(process.cwd(), 'articles', 'explyras-service-account.json');
const raw = fs.readFileSync(keyPath, 'utf8');
const data = JSON.parse(raw);

// Ensure the private key has literal newline characters if it was double-escaped
// or fix common formatting errors.
if (data.private_key) {
    // Replace literal "\\n" with "\n" if it's double escaped
    data.private_key = data.private_key.replace(/\\\\n/g, '\n');
    // If it's already "\n" (literal newline), leave it or fix it.
    // The Indexing API expects it to be the exact PEM string.
}

fs.writeFileSync(keyPath, JSON.stringify(data, null, 2));
console.log('Fixed service account JSON.');
