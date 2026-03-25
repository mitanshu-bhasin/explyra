import os
import re
import json
import xml.etree.ElementTree as ET

def check_file(path):
    if not path: return True
    # Remove fragments/query
    path = path.split('#')[0].split('?')[0]
    if not path: return True
    if path.startswith(('http://', 'https://')):
        return True # Skip external links for now
    
    # Try directory-style link (e.g., /contact maps to contact.html)
    possible_paths = [
        path,
        path.lstrip('/'),
        path.lstrip('/') + '.html',
        os.path.join(path.lstrip('/'), 'index.html')
    ]
    
    for p in possible_paths:
        if os.path.exists(p):
            return True
    return False

def check_manifest(manifest_path):
    print(f"\nChecking manifest: {manifest_path}")
    if not os.path.exists(manifest_path):
        print(f"FAILED: {manifest_path} not found")
        return
        
    with open(manifest_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for icon in data.get('icons', []):
        src = icon.get('src')
        if not check_file(src):
            print(f"MISSING ICON: {src}")
            
    for screenshot in data.get('screenshots', []):
        src = screenshot.get('src')
        if not check_file(src):
            print(f"MISSING SCREENSHOT: {src}")

def check_sitemap(sitemap_path):
    print(f"\nChecking sitemap: {sitemap_path}")
    if not os.path.exists(sitemap_path):
        print(f"FAILED: {sitemap_path} not found")
        return
        
    try:
        tree = ET.parse(sitemap_path)
        root = tree.getroot()
        namespace = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        # Check for <loc> inside <urlset> or <sitemapindex>
        for loc in root.findall('.//sm:loc', namespace):
            url = loc.text
            if 'explyra.me' in url:
                # Map URL to local path
                rel_path = url.replace('https://explyra.me', '').lstrip('/')
                if not check_file(rel_path):
                    print(f"MISSING SITEMAP TARGET: {url} (mapped to {rel_path})")
    except Exception as e:
        print(f"ERROR parsing {sitemap_path}: {e}")

def check_html_links(html_path):
    print(f"\nChecking links in: {html_path}")
    if not os.path.exists(html_path):
        return
        
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find href and src
    links = re.findall(r'href=["\'](.*?)["\']|src=["\'](.*?)["\']', content)
    for href, src in links:
        link = href or src
        if link and not link.startswith(('http', 'mailto:', 'tel:', 'data:', '#')):
            # Local link
            # Need to handle relative paths based on html_path
            base_dir = os.path.dirname(html_path)
            full_path = os.path.join(base_dir, link.lstrip('/'))
            if not check_file(full_path if link.startswith('/') else os.path.join(base_dir, link)):
                 print(f"BROKEN LINK: {link} in {html_path}")

if __name__ == "__main__":
    check_manifest("manifest.json")
    check_sitemap("sitemap.xml")
    check_sitemap("sitemap-index.xml")
    check_sitemap("images.xml")
    
    # Check index.html
    check_html_links("index.html")
    
    # Check subfolders
    for folder in ['compare', 'integrations', 'health-manager', 'status', 'direc']:
        sm = os.path.join(folder, "sitemap.xml")
        if os.path.exists(sm):
            check_sitemap(sm)
        idx = os.path.join(folder, "index.html")
        if os.path.exists(idx):
            check_html_links(idx)
