import re
import os

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

links = re.findall(r'href=["\'](.*?)["\']|src=["\'](.*?)["\']', content)
unique_links = set()
for h, s in links:
    link = h or s
    if link and not link.startswith(('http', 'mailto:', 'tel:', 'data:', '#')):
        unique_links.add(link)

print("Found internal links in index.html:")
for l in sorted(unique_links):
    # Check if exists
    exists = os.path.exists(l.split('?')[0].split('#')[0])
    # Also check if it starts with / (root relative)
    if not exists and l.startswith('/'):
        exists = os.path.exists(l.lstrip('/').split('?')[0].split('#')[0])
    
    status = "OK" if exists else "MISSING"
    print(f"{status}: {l}")
