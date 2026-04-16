import re
import os

def minify(content):
    # Remove HTML comments
    content = re.sub(r'<!--(.*?)-->', '', content, flags=re.DOTALL)
    # Remove whitespace between tags
    content = re.sub(r'>\s+<', '><', content)
    # Remove extra newlines and spaces
    content = re.sub(r'\s{2,}', ' ', content)
    return content.strip()

path = 'd:/Expense Tracker/'
output_dir = os.path.join(path, 'minify_xx')

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for filename in ['index.html', 'privacy.html', '_worker.js']:
    with open(os.path.join(path, filename), 'r', encoding='utf-8') as f:
        content = f.read()
    
    if filename.endswith('.html'):
        minified = minify(content)
    else:
        # Simple whitespace reduction for JS if needed, but for now just copy
        minified = content
        
    with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
        f.write(minified)
    print(f"Processed {filename}")
