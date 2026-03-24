const fs = require('fs');
const chunk = fs.readFileSync('account_chunk.html', 'utf8');
let adminLogic = fs.readFileSync('js/admin-logic.js', 'utf8');
const regex = /window\.renderAccount = async \(\) => \{[\s\S]*?if \(window\.populateAccountCenter\)/;
const match = adminLogic.match(regex);
if(match) {
    const rawHTML = chunk.replace(/\/g, '\\\').replace(/\\\$/g, '\\\$');
    const newBody = 'window.renderAccount = async () => {\\n    const content = document.getElementById(\\'content-area\\');\\n    if (!content) return;\\n\\n    content.innerHTML = \\n        <div class=\\'space-y-6 animate-fade-in pb-20\\'>\\n            <div class=\\'max-w-4xl mx-auto\\'>\\n' + rawHTML + '\\n            </div>\\n        </div>\\n    ;\\n\\n    if (window.populateAccountCenter)';
    adminLogic = adminLogic.replace(regex, newBody);
    fs.writeFileSync('js/admin-logic.js', adminLogic);
    console.log('Successfully replaced!');
} else {
    console.log('Regex match failed');
}
