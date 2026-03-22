const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const ignoreDirs = ['node_modules', '.git', 'www'];

function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (ignoreDirs.includes(file)) continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const htmlFiles = findHtmlFiles(targetDir);
let fixedCount = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Missing Doctype (prepend if missing, unless it's explicitly a fragment or component, but let's just add it if it starts with <html> or <head> or similar root tags)
    // Actually, it's safer to just inject it if missing and the file contains <html> or <head>.
    if (content.match(/^\s*<html/i) && !content.match(/^\s*<!DOCTYPE/i)) {
        content = '<!DOCTYPE html>\n' + content;
    }
    if (content.match(/^\s*google-site-verification/i)) {
        // text files saved as .html shouldn't really have doctype, but htmlhint complains. 
        // We'll leave it to avoid breaking google check.
    }

    // 2. Empty src attributes in img
    // match class="... hidden" src="" or src=""
    content = content.replace(/<img(.*?)src=""(.*?)>/g, (match, p1, p2) => {
        // just remove src="" to fix the validation, or replace with a placeholder
        return `<img${p1}${p2}>`.replace(/ +>/, '>');
    });

    // 3. Duplicate class in crm/index.html and drive.html
    content = content.replace(/class="([^"]*)"\s+class="([^"]*)"/g, 'class="$1 $2"');

    // 4. Double quotes in href/placeholder
    content = content.replace(/href='data:([^']+)'/g, 'href="data:$1"');
    content = content.replace(/placeholder='([^']+)'/g, 'placeholder="$1"');

    // 5. Duplicate IDs in admin.html
    if (file.endsWith('admin.html') || file.endsWith('orig_emp.html') || file.endsWith('emp.html')) {
        // Let's not regex IDs blindly to avoid breaking JS, but for modal-title:
        // admin.html has two modal-title, we'll prefix one if needed, but it's tricky.
        // Let's do a manual replace for the specific lines in admin.html
        if (file.endsWith('admin.html')) {
            // "modal-title" on line 745 vs another
            content = content.replace(/<span id="modal-title" class="truncate line-clamp-1">Expense Report<\/span>/, 
                                      '<span id="expense-modal-title" class="truncate line-clamp-1">Expense Report</span>');
            content = content.replace(/<div id="modal-payment-issue"/, '<div id="expense-modal-payment-issue"');
            content = content.replace(/<input type="hidden" id="issue-expense-id">/, '<input type="hidden" id="expense-issue-expense-id">');
        }
        
        if (file.endsWith('emp.html') || file.endsWith('orig_emp.html')) {
            // Fix nested label: <label ...>Full <label ...>Name</label> -> <label ...>Full Name</label>
            content = content.replace(
                /<label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Full\s*<label\s*class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Name<\/label>/g,
                '<label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Full Name</label>'
            );
        }
    }

    // 6. Escaped characters >
    if (file.endsWith('faq.html')) {
        content = content.replace(/Stone > Scissors > Paper > Stone/g, 'Stone &gt; Scissors &gt; Paper &gt; Stone');
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
        console.log(`Fixed formatting in ${path.relative(targetDir, file)}`);
    }
}

console.log(`Fixed ${fixedCount} files.`);
