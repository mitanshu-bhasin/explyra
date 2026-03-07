import os
import glob
import re

directory = r"d:\Expense Tracker"
html_files = glob.glob(os.path.join(directory, "*.html"))

# Exclude emp.html and index.html since they are already updated
html_files = [f for f in html_files if not f.endswith(('emp.html', 'index.html'))]

# The substitutions we need to make to bring the new theme across to all other pages
substitutions = [
    (
        r'<meta name="theme-color" content="#10b981">',
        r'<meta name="theme-color" content="#1546C0">'
    ),
    (
        r'''<script>\s*\(function \(\) \{\s*const theme = localStorage\.getItem\('theme'\) \|\| 'light';\s*if \(theme === 'dark'\) document\.documentElement\.classList\.add\('dark'\);\s*else document\.documentElement\.classList\.remove\('dark'\);\s*\}\)\(\);\s*</script>''',
        '''<script>
        (function () {
            const theme = localStorage.getItem('explyra-theme') || 'light';
            if (theme === 'dark') document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
            
            window.addEventListener('storage', (e) => {
                if (e.key === 'explyra-theme') {
                    if (e.newValue === 'dark') document.documentElement.classList.add('dark');
                    else document.documentElement.classList.remove('dark');
                }
            });
        })();
    </script>'''
    ),
    (
        r'''<script>\s*tailwind\.config = \{\s*darkMode: 'class',\s*theme: \{\s*extend: \{\s*fontFamily: \{ sans: \['Inter', 'sans-serif'\] \},\s*colors: \{\s*slate: \{\s*700: '#2F3336',\s*800: '#16181C',\s*900: '#000000'\s*\},\s*brand: \{\s*50: '#ecfdf5',\s*100: '#d1fae5',\s*200: '#a7f3d0',\s*300: '#6ee7b7',\s*400: '#34d399',\s*500: '#10b981',\s*600: '#059669',\s*700: '#047857',\s*800: '#065f46',\s*900: '#064e3b'\s*\},\s*ipec: \{\s*red: '#D93025',\s*green: '#1E8E3E',\s*dark: '#0F172A'\s*\}\s*\}\s*\}\s*\}\s*\}\s*</script>''',
        '''<script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { 
                        sans: ['Outfit', 'sans-serif'],
                        serif: ['Playfair Display', 'serif']
                    },
                    colors: {
                        slate: {
                            50: '#F8F7F4',   // light bg -> Explyra --bg
                            100: '#F1EFE9',  // light bg3 -> Explyra --bg3
                            200: '#E4E1DB',  // light border -> Explyra --bdr
                            300: '#CCC8C0',  // dark border light
                            400: '#939BAC',  // muted text
                            500: '#8290A8',  // dark muted text
                            600: '#586070',  // secondary text
                            700: '#0D1117',  // root text
                            800: '#141928',  // Explyra --surf (Dark)
                            900: '#080B14'   // Explyra --bg (Dark)
                        },
                        green: { 
                            50: '#eef2ff',
                            100: 'rgba(21,70,192,0.08)',
                            200: '#93B4FF',
                            300: '#5B8AF5',
                            400: '#5B8AF5', // Dark mode blue
                            500: '#1546C0', // Light mode blue
                            600: '#1546C0', 
                            700: '#113A9F',
                            800: '#0C2B7A',
                            900: '#051234'
                        },
                        amber: {
                            50: 'rgba(180,83,9,0.08)',
                            100: '#FDE68A',
                            400: '#FBBF24',
                            500: '#B45309',
                            600: '#B45309'
                        },
                        brand: {
                            50: '#F8F7F4',
                            100: '#F1EFE9',
                            200: '#c7d2fe',
                            300: '#a5b4fc',
                            400: '#818cf8',
                            500: '#1546C0',
                            600: '#1546C0',
                            700: '#1d4ed8',
                            800: '#1e40af',
                            900: '#1e3a8a'
                        },
                        explyra: {
                            red: '#BE185D',
                            green: '#047857',
                            dark: '#0D1117'
                        }
                    }
                }
            }
        }
    </script>'''
    ),
    (
        r'<link href="https://fonts\.googleapis\.com/css2\?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">',
        r'<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
    )
]

css_substitution = [
    (
        r'''    <style type="text/tailwindcss">
        body \{
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
            color: #334155;
        \}[\s\S]*?::-webkit-scrollbar-thumb \{
            background: #059669;
        \}
    </style>''',
        '''    <style type="text/tailwindcss">
        body {
            font-family: 'Outfit', sans-serif;
            background-color: theme('colors.slate.50');
            color: theme('colors.slate.700');
        }

        .dark body {
            background-color: theme('colors.slate.900');
            color: #EEF0F8;
        }

        .card {
            background: white;
            border: 1px solid theme('colors.slate.200');
            box-shadow: 0 4px 16px rgba(0,0,0,.04);
        }

        .card:hover {
            box-shadow: 0 12px 40px rgba(0,0,0,.10);
        }

        .glass-header {
            background: rgba(248, 247, 244, 0.9);
            backdrop-filter: blur(20px) saturate(160%);
            border-bottom: 1px solid theme('colors.slate.200');
        }

        .input-field {
            background: theme('colors.slate.50');
            border: 1px solid theme('colors.slate.200');
            transition: all 0.2s;
            color: theme('colors.slate.700');
        }

        .input-field:focus {
            background: white;
            border-color: theme('colors.green.500');
            outline: none;
            box-shadow: 0 0 0 3px rgba(21, 70, 192, 0.1);
        }

        .dark .card {
            background-color: theme('colors.slate.800');
            border-color: rgba(255,255,255,.07);
            color: #EEF0F8;
        }
        .dark .glass-header {
            background: rgba(8, 11, 20, 0.88);
            border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .dark .input-field {
            background: theme('colors.slate.900');
            border-color: rgba(255,255,255,.07);
            color: #EEF0F8;
        }
        .dark .input-field:focus {
            background: theme('colors.slate.800');
        }

        .badge {
            padding: 2px 8px;
            border-radius: 999px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in {
            animation: slideUp 0.3s ease-out forwards;
        }

        /* Distinct Gradient Background */
        /* Logo Gradient Text Effect */
        .gradient-text {
            background: linear-gradient(135deg, #1546C0, #6D28D9);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .dark .gradient-text {
            background: linear-gradient(135deg, #5B8AF5, #A78BFA);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Subtle Gradient Background for Hero */
        .hero-bg {
            background: transparent;
        }

        .dark .hero-bg {
            background: transparent;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-thumb {
            background: theme('colors.green.500');
            border-radius: 3px;
        }
        .dark ::-webkit-scrollbar-thumb {
            background: theme('colors.green.400');
        }
    </style>'''
    )
]

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content
    for old, new in substitutions:
        new_content = re.sub(old, new, new_content)

    for old, new in css_substitution:
        new_content = re.sub(old, new, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Applied UI updates to {os.path.basename(filepath)}")
        
print("Finished!")
