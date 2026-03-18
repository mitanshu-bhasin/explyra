import re

with open('emp.html', 'r', encoding='utf-8') as f:
    html = f.read()

lines = html.split('\n')
depth = 0
tracker = []

for i, line in enumerate(lines):
    open_divs = len(re.findall(r'<div', line, re.IGNORECASE))
    close_divs = len(re.findall(r'</div', line, re.IGNORECASE))
    
    depth += open_divs - close_divs
    
    if 'id=\"' in line and (open_divs > 0 or close_divs > 0):
        tracker.append((i+1, depth, line.strip()[:60]))

print(f"Final Depth: {depth}")
for t in tracker:
    print(f"L{t[0]:04d}: d={t[1]:02d} | {t[2]}")
