import re

def main():
    files = ["login.html", "signup.html"]
    for file in files:
        with open(file, 'r') as f:
            content = f.read()

        print(f"Buttons in {file}:")
        for match in re.finditer(r'<button type="button" onclick="togglePasswordVisibility\([^)]*\)"[^>]*>', content):
            print(match.group(0))
        print("-" * 40)

if __name__ == "__main__":
    main()
