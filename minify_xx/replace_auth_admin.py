import sys

def process(filename, start_idx, end_idx):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_content = []
    for i in range(len(lines)):
        if start_idx <= i <= end_idx:
            continue
        new_content.append(lines[i])

    loader = """    <div id="explyra-global-loader" class="fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col items-center justify-center transition-opacity duration-500">
        <div class="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-[#0067b8] rounded-full animate-spin mb-4"></div>
        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Verifying session...</p>
    </div>\n"""
    
    new_content.insert(start_idx, loader)

    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(new_content)

process('admin.html', 2088, 2290)
