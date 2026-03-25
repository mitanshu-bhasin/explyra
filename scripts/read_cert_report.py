from pypdf import PdfReader

p = r"d:/Expense Tracker/Explyra certification report _ Partner Center.pdf"
reader = PdfReader(p)
print(f"PAGES {len(reader.pages)}")
for i, page in enumerate(reader.pages, start=1):
    text = (page.extract_text() or "").strip()
    print(f"---PAGE {i}---")
    print(text[:8000])
