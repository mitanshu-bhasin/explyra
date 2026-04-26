// Explyra Security & Custom Context Menu

(function() {
    // 1. Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            window.location.reload();
        }
        // Ctrl+U
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            window.location.reload();
        }
        // Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
            e.preventDefault();
            window.location.reload();
        }
        // Ctrl+S (Save As)
        if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
            e.preventDefault();
        }
    });

    // 2. Custom Context Menu
    document.addEventListener('DOMContentLoaded', () => {
        const menuHTML = `
        <div id="explyra-context-menu" style="display: none; position: fixed; z-index: 999999; background: var(--ai-bg-primary, #ffffff); border: 1px solid var(--ai-border, #e2e8f0); border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 220px; padding: 6px; font-family: 'Inter', sans-serif;">
            <div class="exctx-item" onclick="window.history.back()" style="padding: 10px 14px; cursor: pointer; border-radius: 8px; font-size: 13px; color: var(--ai-text-primary, #334155); display: flex; align-items: center; gap: 10px; transition: background 0.2s;">
                <i class="fa-solid fa-arrow-left" style="font-size: 14px; opacity: 0.7;"></i> Go Back
            </div>
            <div class="exctx-item" onclick="window.history.forward()" style="padding: 10px 14px; cursor: pointer; border-radius: 8px; font-size: 13px; color: var(--ai-text-primary, #334155); display: flex; align-items: center; gap: 10px; transition: background 0.2s;">
                <i class="fa-solid fa-arrow-right" style="font-size: 14px; opacity: 0.7;"></i> Go Forward
            </div>
            <div class="exctx-item" onclick="window.location.reload()" style="padding: 10px 14px; cursor: pointer; border-radius: 8px; font-size: 13px; color: var(--ai-text-primary, #334155); display: flex; align-items: center; gap: 10px; transition: background 0.2s;">
                <i class="fa-solid fa-rotate-right" style="font-size: 14px; opacity: 0.7;"></i> Refresh
            </div>
            <div style="height: 1px; background: var(--ai-border, #e2e8f0); margin: 4px 0;"></div>
            <div class="exctx-item" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="padding: 10px 14px; cursor: pointer; border-radius: 8px; font-size: 13px; color: var(--ai-text-primary, #334155); display: flex; align-items: center; gap: 10px; transition: background 0.2s;">
                <i class="fa-solid fa-arrow-up" style="font-size: 14px; opacity: 0.7;"></i> Scroll to Top
            </div>
            <div class="exctx-item" onclick="window.print()" style="padding: 10px 14px; cursor: pointer; border-radius: 8px; font-size: 13px; color: var(--ai-text-primary, #334155); display: flex; align-items: center; gap: 10px; transition: background 0.2s;">
                <i class="fa-solid fa-print" style="font-size: 14px; opacity: 0.7;"></i> Print
            </div>
            <div style="height: 1px; background: var(--ai-border, #e2e8f0); margin: 4px 0;"></div>
            <div style="padding: 6px 14px; font-size: 10px; color: var(--ai-text-primary, #94a3b8); text-align: center; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                Explyra Security
            </div>
        </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .exctx-item:hover { background: var(--ai-bg-secondary, #f1f5f9) !important; color: #1546C0 !important; }
            [data-theme="dark"] #explyra-context-menu { --ai-bg-primary: #1e293b; --ai-bg-secondary: #0f172a; --ai-border: #334155; --ai-text-primary: #f8fafc; }
        `;
        document.head.appendChild(style);

        const div = document.createElement('div');
        div.innerHTML = menuHTML;
        document.body.appendChild(div.firstElementChild);

        const contextMenu = document.getElementById('explyra-context-menu');

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const { clientX: mouseX, clientY: mouseY } = e;
            
            contextMenu.style.display = 'block';
            
            // Adjust position so it doesn't go off screen
            const menuWidth = contextMenu.offsetWidth;
            const menuHeight = contextMenu.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            let x = mouseX;
            let y = mouseY;
            
            if (x + menuWidth > windowWidth) x = windowWidth - menuWidth - 10;
            if (y + menuHeight > windowHeight) y = windowHeight - menuHeight - 10;
            
            contextMenu.style.left = \`\${x}px\`;
            contextMenu.style.top = \`\${y}px\`;
            
            // Add a subtle pop animation
            contextMenu.animate([
                { opacity: 0, transform: 'scale(0.95)' },
                { opacity: 1, transform: 'scale(1)' }
            ], { duration: 150, easing: 'ease-out' });
        });

        document.addEventListener('click', (e) => {
            if (contextMenu.style.display === 'block' && !contextMenu.contains(e.target)) {
                contextMenu.style.display = 'none';
            }
        });
        
        window.addEventListener('scroll', () => {
            if (contextMenu.style.display === 'block') {
                contextMenu.style.display = 'none';
            }
        });
    });
})();
