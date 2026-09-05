const fs = require('fs');

const files = ['login.html', 'signup.html'];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('togglePasswordVisibility') && !content.includes('aria-label="Show password"')) {
    console.log(`File ${file} missing aria-label for password toggle`);
  }
}
