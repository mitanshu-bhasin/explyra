from PIL import Image
import os

images = [
    "assets/images/explyra_screenshot_1.png",
    "assets/images/explyra_screenshot_2.png",
    "assets/images/explyra_screenshot_3.png"
]

for img_path in images:
    if os.path.exists(img_path):
        with Image.open(img_path) as img:
            print(f"{img_path}: {img.width}x{img.height}")
    else:
        print(f"{img_path} not found")
