import os
import struct

def get_png_size(file_path):
    with open(file_path, 'rb') as f:
        data = f.read(24)
        if data[:8] != b'\x89PNG\r\n\x1a\n':
            return None
        return struct.unpack('>II', data[16:24])

images = [
    "assets/images/explyra_screenshot_1.png",
    "assets/images/explyra_screenshot_2.png",
    "assets/images/explyra_screenshot_3.png",
    "assets/images/s1.png",
    "assets/images/s2.png",
    "assets/images/s3.png"
]

for img_path in images:
    if os.path.exists(img_path):
        size = get_png_size(img_path)
        if size:
            print(f"{img_path}: {size[0]}x{size[1]}")
        else:
            print(f"{img_path}: Not a valid PNG")
    else:
        print(f"{img_path} not found")
