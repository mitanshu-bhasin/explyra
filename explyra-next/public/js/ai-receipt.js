window.scanReceiptAI = async (input) => {
    const file = input.files[0];
    if (!file) return;

    const label = input.parentElement;
    const originalHtml = label.innerHTML;
    label.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-xs mr-2"></i> Gemini Scanning...';
    label.classList.add('opacity-70', 'cursor-not-allowed');

    try {
        // 1. Convert/Compress Image to Base64
        const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const max = 1024;
                    if (width > height && width > max) { height *= max / width; width = max; }
                    else if (height > max) { width *= max / height; height = max; }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.8).split(',')[1]);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        // 2. Call backend proxy to keep GEMINI_KEY secure
        const prompt = "Analyze this receipt image. Extract all line items and return them as a JSON array where each object has: 'date' (YYYY-MM-DD), 'desc' (item description), 'category' (Travel, Food, Lodging, Supplies, Other), and 'amount' (numeric). Return ONLY the raw JSON array. If you cannot find a date, use today's date: " + new Date().toISOString().split('T')[0];
        
        // Use proxy in production, direct call in local dev (if proxy returns 405/404)
        let response;
        try {
            response = await fetch('/api/scan-receipt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ base64Data, prompt })
            });
        } catch (e) {
            console.warn("Backend proxy failed, trying direct call...", e);
        }

        if (!response || !response.ok) {
            // Local dev fallback if proxy is missing (e.g., Live Server)
            const LOCAL_HOSTS = ['localhost', '127.0.0.1'];
            if (LOCAL_HOSTS.includes(window.location.hostname)) {
                console.info("Using Direct Gemini API Fallback for Local Dev...");
                const DEV_KEY = (window.EXPLYRA_CONFIG?.ai?.geminiKey || "REDACTED");
                const MODEL = 'gemini-flash-latest';
                const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${DEV_KEY}`;
                
                response = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: prompt },
                                { inlineData: { mimeType: 'image/jpeg', data: base64Data } }
                            ]
                        }],
                        generationConfig: { responseMimeType: "application/json" }
                    })
                });
            }
        }

        if (!response || !response.ok) {
            const errBody = response ? await response.text() : 'Network error';
            throw new Error(`Scan Failed: ${errBody}`);
        }

        const data = await response.json();
        let rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawContent) throw new Error("Empty response from AI");

        // Clean up potential markdown formatting
        rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

        const items = JSON.parse(rawContent);
        processReceiptItems(items);

    } catch (error) {
        console.error("Gemini Scan Error:", error);
        if (window.showToast) window.showToast(`AI Scan Failed: ${error.message}`, 'error');
    } finally {
        label.innerHTML = originalHtml;
        label.classList.remove('opacity-70', 'cursor-not-allowed');
        input.value = '';
    }

    function processReceiptItems(inputItems) {
        let items = Array.isArray(inputItems) ? inputItems : (inputItems.items || inputItems.receipt_items || [inputItems]);
        const container = document.getElementById('line-items-container');
        if (!container) return;

        if (container.children.length === 1) {
            const first = container.children[0];
            if (!first.querySelector('.item-amount').value && !first.querySelector('.item-desc').value) {
                container.innerHTML = '';
            }
        }

        items.forEach(item => {
            if (!item || typeof item !== 'object') return;
            if (window.addLineItem) window.addLineItem();
            const row = container.lastElementChild;
            if (!row) return;

            if (item.date) row.querySelector('.item-date').value = item.date;
            if (item.desc || item.description) row.querySelector('.item-desc').value = item.desc || item.description;
            if (item.amount) row.querySelector('.item-amount').value = parseFloat(item.amount).toFixed(2);
            
            const catEl = row.querySelector('.item-category');
            if (catEl && (item.category || item.cat)) {
                const catVal = item.category || item.cat;
                const normCat = catVal.charAt(0).toUpperCase() + catVal.slice(1).toLowerCase();
                const options = Array.from(catEl.options).map(o => o.value);
                if (options.includes(normCat)) catEl.value = normCat;
                else catEl.value = 'Other';
            }
        });

        if (window.calculateTotal) window.calculateTotal();
        if (window.showToast) window.showToast(`Gemini Extracted ${items.length} items`, 'success');
    }
};
