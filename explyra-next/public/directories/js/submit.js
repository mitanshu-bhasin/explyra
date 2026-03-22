/**
 * Explyra Directories - Business Submission Logic
 * Handles validation, Captcha, and WhatsApp Payment Redirect
 */

const WHATSAPP_NUMBER = "918076108584"; // Admin contact from Organization Schema

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateCaptcha();
    
    const form = document.getElementById('business-submit-form');
    form.addEventListener('submit', handleSubmission);
});

/**
 * Generate a simple alphanumeric captcha
 */
function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous chars like 0, O, I, 1
    let result = "";
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captcha-text').innerText = result;
    document.getElementById('captcha-text').dataset.value = result;
}

/**
 * Handle form submission
 */
function handleSubmission(e) {
    e.preventDefault();
    
    // 1. Verify Captcha
    const userCaptcha = document.getElementById('captcha-input').value.trim().toUpperCase();
    const correctCaptcha = document.getElementById('captcha-text').dataset.value;
    
    if (userCaptcha !== correctCaptcha) {
        alert("Incorrect CAPTCHA. Please try again.");
        generateCaptcha();
        return;
    }

    // 2. Collect Data
    const formData = {
        businessName: document.getElementById('businessName').value.trim(),
        ownerName: document.getElementById('ownerName').value.trim(),
        category: document.getElementById('category').value,
        description: document.getElementById('description').value.trim(),
        website: document.getElementById('website').value.trim() || "Not provided",
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phoneNumber').value.trim(),
        location: document.getElementById('location').value.trim(),
        timing: document.getElementById('timing').value.trim(),
        logo: document.getElementById('logo').value.trim(),
        services: document.getElementById('services').value.trim(),
        social: document.getElementById('socialLinks').value.trim() || "None",
        gallery: Array.from(document.querySelectorAll('.gallery-url'))
                      .map(input => input.value.trim())
                      .filter(val => val !== "")
    };

    // 3. Validation (URLs & Email already handled by browser types, but we can add secondary checks)
    if (formData.gallery.length === 0) {
        alert("Please provide at least one image URL for your gallery.");
        return;
    }

    // 4. Construct WhatsApp Message
    const message = constructWhatsAppMessage(formData);
    
    // 5. Redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Animate button before redirect
    const btn = document.getElementById('proceed-btn');
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Preparing Redirect...`;
    btn.disabled = true;

    setTimeout(() => {
        window.location.href = whatsappLink;
    }, 800);
}

/**
 * Format the message for WhatsApp
 */
function constructWhatsAppMessage(data) {
    return `Hello, I want to list my business on Explyra Directories.

🚀 *BUSINESS DETAILS*
--------------------------------
🏢 *Business Name:* ${data.businessName}
👤 *Owner Name:* ${data.ownerName}
📂 *Category:* ${data.category}
📝 *Description:* ${data.description.substring(0, 500)}${data.description.length > 500 ? '...' : ''}
🌐 *Website:* ${data.website}
📞 *Phone:* ${data.phone}
📍 *Location:* ${data.location}
🕒 *Timing:* ${data.timing}
🛠️ *Services:* ${data.services}

📸 *ASSETS*
--------------------------------
🖼️ *Logo:* ${data.logo}
🖼️ *Gallery:* ${data.gallery.join(', ')}
🔗 *Social:* ${data.social}

💰 *PAYMENT INFO*
--------------------------------
Item: Business Listing (Permanent)
Fee: ₹29 (Inclusive of SEO Support)

Please confirm my details and provided payment instructions.`;
}
