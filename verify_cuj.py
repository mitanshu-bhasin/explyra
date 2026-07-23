from playwright.sync_api import sync_playwright
import os
import glob

def run_cuj(page):
    page.goto("http://localhost:3000/login.html")
    page.wait_for_timeout(1000)

    # Hide any intercepting overlays
    page.evaluate("document.getElementById('auth-skeleton')?.setAttribute('style', 'display: none !important');")
    page.evaluate("document.getElementById('step-loading')?.setAttribute('style', 'display: none !important');")

    # Force the display of step-password just to be sure we can click it
    page.evaluate("document.getElementById('step-password').classList.add('active');")
    page.evaluate("document.getElementById('step-identifier').classList.remove('active');")
    page.wait_for_timeout(500)

    # Verify the initial state
    toggle_btn = page.locator("button[aria-label='Show password']")
    toggle_btn.wait_for(state="attached")

    # Interact with the toggle using JS evaluation to bypass intercepts
    page.evaluate("document.querySelector('button[aria-label=\"Show password\"]').click()")
    page.wait_for_timeout(500)

    # Wait for the state change to apply
    page.wait_for_selector("button[aria-label='Hide password']")

    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()

    video_files = glob.glob("/home/jules/verification/videos/*.webm")
    if video_files:
        print(f"Video saved at: {video_files[0]}")
