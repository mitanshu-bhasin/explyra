import os
import glob
import re

directory = r"d:\Expense Tracker"
html_files = glob.glob(os.path.join(directory, "*.html"))

replacements = {
    r"IPEC Expense Manager": "Explyra Expense",
    r"IPEC Consulting": "Explyra",
    r"IPEC Expenze System": "Explyra Expense",
    r"IPEC Expense": "Explyra Expense",
    r"IPEC Team": "Explyra Team",
    r"\bIPEC\b": "Explyra",
    r"Sangeet Malhotra": "Mitanshu Bhasin"
}

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = re.sub(old, new, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {os.path.basename(filepath)}")
print("Done!")
