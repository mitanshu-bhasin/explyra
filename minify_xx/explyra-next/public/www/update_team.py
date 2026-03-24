import re

with open('d:/Expense Tracker/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract styles (inside <style>...</style>)
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
style = style_match.group(1) if style_match else ''

# 2. Extract <nav>...</nav>
nav_match = re.search(r'<nav>(.*?)</nav>', content, re.DOTALL)
nav = '<nav>\n' + nav_match.group(1) + '\n</nav>' if nav_match else '<nav></nav>'

# 3. Extract mobile menu overlay (from: <!-- MOBILE + MENU --> up to the next section or end of div)
# Let's just extract it via simple find if possible
menu_start = content.find('<div class="menu-overlay"')
if menu_start != -1:
    menu_end = content.find('</nav>', menu_start) # wait, it's outside nav?
    # Actually, let's just use regex for <div class="menu-overlay".*?</div>\s*</div>
    menu_match = re.search(r'(<div class="menu-overlay".*?</div>\s*</div>)', content, re.DOTALL)
    mobile_menu = menu_match.group(1) if menu_match else ''
else:
    mobile_menu = ''

# 4. Extract footer
footer_match = re.search(r'<footer>(.*?)</footer>', content, re.DOTALL)
footer = '<footer>\n' + footer_match.group(1) + '\n</footer>' if footer_match else '<footer></footer>'

# 5. Extract script
script_match = re.search(r'<script>\s*/\* THEME \*/(.*?)</script>', content, re.DOTALL)
script = '<script>\n/* THEME */\n' + script_match.group(1) + '\n</script>' if script_match else '<script></script>'

html_template = f"""<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Leadership Team | Explyra Suite</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <style>
{style}

/* Team specific styles */
.team-hero {{
    padding: 150px 5vw 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
}}

.team-grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 5vw 8rem;
}}

.team-card {{
    background: var(--surf);
    border: 1px solid var(--bdr);
    border-radius: 14px;
    padding: 2rem;
    text-align: center;
    transition: all .28s;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}}

[data-theme="dark"] .team-card {{
    background: var(--bg3);
    border-color: var(--bdr);
}}

.team-card:hover {{
    transform: translateY(-4px);
    box-shadow: var(--s3);
    border-color: var(--blue);
}}

.team-img-wrap {{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin-bottom: 1.5rem;
    overflow: hidden;
    border: 4px solid var(--bg);
    box-shadow: var(--s2);
}}

.team-img-wrap img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
}}

.team-name {{
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 0.2rem;
}}

.team-role {{
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--blue);
    margin-bottom: 1rem;
}}

.team-bio {{
    font-size: 0.95rem;
    color: var(--ink3);
    line-height: 1.6;
    font-weight: 300;
    margin-bottom: 1.5rem;
}}
    </style>
</head>
<body>
    {nav}

    <main>
        <div class="team-hero reveal">
            <div class="hero-badge">
                <div class="badge-pulse"></div>
                Visionaries & Experts
            </div>
            <h1 class="sec-h display">Meet the <em class="grad">Leadership</em></h1>
            <p class="sec-p">Driving process excellence, innovation, and global standards.</p>
        </div>

        <div class="team-grid reveal d1">
            <!-- Mitanshu -->
            <div class="team-card">
                <div class="team-img-wrap">
                    <img src="https://mitanshubhasin.netlify.app/mitanshu.jpg" alt="Mitanshu Bhasin">
                </div>
                <div class="team-name">Mitanshu Bhasin</div>
                <div class="team-role">Founder</div>
                <div class="team-bio">
                    The visionary architect behind Explyra Suite. Leading technical development, strategy, and overall execution of the platform.
                </div>
            </div>

            <!-- Rohan -->
            <div class="team-card">
                <div class="team-img-wrap">
                    <img src="https://media.licdn.com/dms/image/v2/D5603AQHdcAb_ugD1oQ/profile-displayphoto-crop_800_800/B56ZzIxP_DIIAI-/0/1772894880169?e=1774483200&v=beta&t=WVtSMFZ2b1oTk5yU7RVfMj8q_V0tZij7BJekgO33IO8" alt="Rohan">
                </div>
                <div class="team-name">Rohan</div>
                <div class="team-role">Co-Founder</div>
                <div class="team-bio">
                    Expertly managing data operations and architecture. Ensuring seamless data integration, security, and scalability across all Explyra platforms.
                </div>
            </div>
        </div>
    </main>

    {footer}

    {script}
</body>
</html>
"""

with open('d:/Expense Tracker/team.html', 'w', encoding='utf-8') as f:
    f.write(html_template)
print("Updated team.html successfully")
