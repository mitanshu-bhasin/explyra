import xml.etree.ElementTree as ET
import os

tree = ET.parse("images.xml")
root = tree.getroot()
namespace = {'image': 'http://www.google.com/schemas/sitemap-image/1.1'}

print("Checking images from images.xml:")
for image_loc in root.findall('.//image:loc', namespace):
    url = image_loc.text
    if 'explyra.me/' in url:
        rel_path = url.split('explyra.me/')[1]
        exists = os.path.exists(rel_path)
        status = "OK" if exists else "MISSING"
        if not exists:
            print(f"{status}: {url} (mapped to {rel_path})")
