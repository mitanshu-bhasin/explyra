// js/ai-receipt.js

window.scanReceiptAI = async (input) => {
    const file = input.files[0];
    if (!file) return;

    const label = input.parentElement;
    const originalHtml = label.innerHTML;
    label.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-xs mr-2"></i> Scanning with AI...';
    label.classList.add('opacity-70', 'cursor-not-allowed');

    try {
        // 1. Convert image to Base64
        const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]); // remove data:image/...;base64,
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });

        // 2. Prepare Gemini API Request
        const apiKey = 'AIzaSyBrTkpz5KnyhCqJmN7enz0RVDeUimyrpds';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const payload = {
            contents: [{
                parts: [
                    {text: "You are a receipt extraction AI. Analyze this receipt and extract all product items purchased. Return the data STRICTLY as a JSON array of objects, with each object having exactly these keys: 'date' (YYYY-MM-DD), 'desc' (short product description), 'category' (must be exactly one of: Travel, Food, Lodging, Supplies, Other), 'amount' (number without currency symbol). Do not include tax as a separate item if it's already in the total, just list the individual items or a single 'Total Purchase' if it's a generic receipt. Example output: [{\"date\": \"2023-10-27\", \"desc\": \"Coffee\", \"category\": \"Food\", \"amount\": 4.50}]"},
                    {
                        inlineData: {
                            mimeType: file.type || "image/jpeg",
                            data: base64Data
                        }
                    }
                ]
            }],
            generationConfig: {
                responseMimeType: "application/json"
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const textResponse = data.candidates[0].content.parts[0].text;
        
        // 3. Parse JSON Response
        const cleanedText = textResponse.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        const items = JSON.parse(cleanedText);
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error("No items found on receipt");
        }

        // 4. Update UI
        const container = document.getElementById('line-items-container');
        if (container) {
            // Clear existing blank item if there's only one and it's mostly empty
            if (container.children.length === 1) {
                const firstItem = container.children[0];
                const amt = firstItem.querySelector('.item-amount').value;
                const desc = firstItem.querySelector('.item-desc').value;
                if (!amt && !desc) {
                    container.innerHTML = ''; 
                }
            }

            // Append scanned items
            items.forEach(item => {
                window.addLineItem(); // Adds a new blank item
                const newRow = container.lastElementChild;
                
                if (item.date) newRow.querySelector('.item-date').value = item.date;
                if (item.desc) newRow.querySelector('.item-desc').value = item.desc;
                if (item.amount) newRow.querySelector('.item-amount').value = parseFloat(item.amount).toFixed(2);
                
                const catDropdown = newRow.querySelector('.item-category');
                if (catDropdown && item.category) {
                    const validOptions = ['Travel', 'Food', 'Lodging', 'Supplies', 'Other'];
                    if (validOptions.includes(item.category)) {
                        catDropdown.value = item.category;
                    } else {
                        catDropdown.value = 'Other';
                    }
                }
            });

            if (window.calculateTotal) window.calculateTotal();
            if (window.showToast) window.showToast(`AI successfully extracted ${items.length} item(s)!`, 'success');
        }

    } catch (error) {
        console.error("AI Receipt Scan Error:", error);
        if (window.showToast) window.showToast("Failed to scan receipt. Please try again or enter manually.", 'error');
    } finally {
        // Reset button state
        label.innerHTML = originalHtml;
        label.classList.remove('opacity-70', 'cursor-not-allowed');
        input.value = ''; // Reset file input so same file can be selected again
    }
};
