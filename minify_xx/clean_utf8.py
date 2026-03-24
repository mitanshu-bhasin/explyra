import sys

path = "d:/Expense Tracker/index.html"
with open(path, "rb") as f:
    content = f.read()

# Try to decode as utf-8, ignore errors to find where it breaks
try:
    text = content.decode("utf-8")
    print("File is valid UTF-8")
except UnicodeDecodeError as e:
    print(f"File is NOT valid UTF-8: {e}")
    # Fix it by replacing invalid chars
    text = content.decode("utf-8", errors="replace")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("File cleaned and saved as UTF-8")
