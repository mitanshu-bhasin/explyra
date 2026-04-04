import fs from 'fs';
const content = fs.readFileSync('fb.config', 'utf-8');
const match = content.match(/const firebaseConfig = ({[\s\S]+?});/);
console.log('Match found:', !!match);
if (match) {
    console.log('JSON content:', match[1]);
} else {
    console.log('REGULAR EXPRESSION FAILED');
}
