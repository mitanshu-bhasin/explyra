// Shared script for Legal Document Generators

function getFormData() {
    return {
        companyName: document.getElementById('companyName').value || '[Company Name]',
        websiteName: document.getElementById('websiteName').value || '[Website Name]',
        websiteUrl: document.getElementById('websiteUrl').value || '[Website URL]',
        companyEmail: document.getElementById('companyEmail').value || '[Contact Email]',
        businessAddress: document.getElementById('businessAddress').value || '[Business Address]',
        country: document.getElementById('country').value || '[Country]',
        businessType: document.getElementById('businessType').value || 'Website',
        collectsData: document.querySelector('input[name="collectsData"]:checked')?.value === 'yes',
        usesCookies: document.querySelector('input[name="usesCookies"]:checked')?.value === 'yes',
        usesThirdParty: document.querySelector('input[name="usesThirdParty"]:checked')?.value === 'yes',
        paymentMethods: document.getElementById('paymentMethods')?.value || 'Credit Card, PayPal',
        refundDuration: document.getElementById('refundDuration')?.value || '30 days',
        supportEmail: document.getElementById('supportEmail')?.value || document.getElementById('companyEmail').value || '[Support Email]'
    };
}

function generatePrivacyPolicy() {
    const data = getFormData();
    const date = new Date().toLocaleDateString();

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - ${data.websiteName}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1, h2, h3 { color: #111; }
        h1 { border-bottom: 2px solid #eee; padding-bottom: 0.5rem; }
        .last-updated { color: #666; font-style: italic; margin-bottom: 2rem; }
    </style>
</head>
<body>
    <h1>Privacy Policy</h1>
    <p class="last-updated">Last updated: ${date}</p>

    <section>
        <h2>1. Introduction</h2>
        <p>Welcome to ${data.websiteName} ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, and share information about you when you use our website (${data.websiteUrl}) and our services.</p>
    </section>

    <section>
        <h2>2. Information We Collect</h2>
        ${data.collectsData ?
            `<p>We collect personal information that you voluntarily provide to us when you register on the ${data.businessType}, express an interest in obtaining information about us or our products and Services, when you participate in activities on the ${data.businessType} or otherwise when you contact us.</p>
        <p>The personal information that we collect depends on the context of your interactions with us and the ${data.businessType}, the choices you make, and the products and features you use.</p>` :
            `<p>We do not proactively gather any sensitive personal data from our users. However, standard server logs and technical data necessary for providing our service may be collected.</p>`}
    </section>

    <section>
        <h2>3. How We Use Your Data</h2>
        <p>We use personal information collected via our ${data.businessType} for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
        <ul>
            <li>To facilitate account creation and login process.</li>
            <li>To send administrative information to you.</li>
            <li>To fulfill and manage your orders.</li>
            <li>To deliver and facilitate delivery of services to the user.</li>
        </ul>
    </section>

    ${data.usesCookies ?
            `<section>
        <h2>4. Cookies Policy</h2>
        <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
    </section>` : ''}

    ${data.usesThirdParty ?
            `<section>
        <h2>${data.usesCookies ? '5' : '4'}. Third-Party Services</h2>
        <p>We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service, and marketing efforts.</p>
    </section>` : ''}

    <section>
        <h2>${(data.usesCookies ? 1 : 0) + (data.usesThirdParty ? 1 : 0) + 4}. Data Security</h2>
        <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
    </section>

    <section>
        <h2>${(data.usesCookies ? 1 : 0) + (data.usesThirdParty ? 1 : 0) + 5}. Your Rights</h2>
        <p>Depending on your location (${data.country}), you may have certain rights regarding your personal information, such as the right to request access, correction, or deletion of your data. To exercise these rights, please contact us using the details provided below.</p>
    </section>

    <section>
        <h2>${(data.usesCookies ? 1 : 0) + (data.usesThirdParty ? 1 : 0) + 6}. Contact Information</h2>
        <p>If you have questions or comments about this notice, you may email us at ${data.companyEmail} or by post to:</p>
        <p>
            <strong>${data.companyName}</strong><br>
            ${data.businessAddress}<br>
            ${data.country}
        </p>
    </section>
</body>
</html>`;

    document.getElementById('outputArea').value = html;
}

function generateTermsAndConditions() {
    const data = getFormData();
    const date = new Date().toLocaleDateString();

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Conditions - ${data.websiteName}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1, h2, h3 { color: #111; }
        h1 { border-bottom: 2px solid #eee; padding-bottom: 0.5rem; }
        .last-updated { color: #666; font-style: italic; margin-bottom: 2rem; }
    </style>
</head>
<body>
    <h1>Terms and Conditions</h1>
    <p class="last-updated">Last updated: ${date}</p>

    <section>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using ${data.websiteUrl} (the "${data.businessType}"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
    </section>

    <section>
        <h2>2. User Responsibilities</h2>
        <p>You are responsible for your own communications and for any consequences thereof. Your use of the Service is subject to all applicable local, state, national and international laws and regulations (${data.country}). You agree:</p>
        <ul>
            <li>Not to use the service for illegal purposes.</li>
            <li>Not to interfere or disrupt networks connected to the service.</li>
            <li>To comply with all regulations, policies, and procedures of networks connected to the service.</li>
        </ul>
    </section>

    <section>
        <h2>3. Intellectual Property</h2>
        <p>The Site and its original content, features, and functionality are owned by ${data.companyName} and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
    </section>

    <section>
        <h2>4. Account Rules</h2>
        <p>If you create an account on the ${data.businessType}, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and start using the Services.</p>
    </section>

    <section>
        <h2>5. Limitation of Liability</h2>
        <p>In no event shall ${data.companyName}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service.</p>
    </section>

    <section>
        <h2>6. Termination Policy</h2>
        <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
    </section>

    <section>
        <h2>7. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of ${data.country}, without regard to its conflict of law provisions.</p>
    </section>

    <section>
        <h2>8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at ${data.companyEmail}.</p>
    </section>
</body>
</html>`;

    document.getElementById('outputArea').value = html;
}

function generateRefundPolicy() {
    const data = getFormData();
    const date = new Date().toLocaleDateString();

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refund Policy - ${data.websiteName}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1, h2, h3 { color: #111; }
        h1 { border-bottom: 2px solid #eee; padding-bottom: 0.5rem; }
        .last-updated { color: #666; font-style: italic; margin-bottom: 2rem; }
    </style>
</head>
<body>
    <h1>Return and Refund Policy</h1>
    <p class="last-updated">Last updated: ${date}</p>

    <section>
        <h2>1. Introduction</h2>
        <p>Thank you for shopping at ${data.websiteName}. We appreciate the trust you have placed in us and want to ensure you have a rewarding experience.</p>
        <p>If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.</p>
    </section>

    <section>
        <h2>2. Refund Eligibility</h2>
        <p>We offer a full money-back guarantee for all purchases made on our website. If you are not satisfied with the product that you have purchased from us, you can get your money back no questions asked.</p>
        <p>You are eligible for a full reimbursement within <strong>${data.refundDuration}</strong> of your purchase.</p>
        <p>After the ${data.refundDuration} period you will no longer be eligible and won't be able to receive a refund. We encourage our customers to try the product (or service) in the first two weeks after their purchase to ensure it fits your needs.</p>
    </section>

    <section>
        <h2>3. Non-Refundable Items/Services</h2>
        <p>The following items or services cannot be refunded:</p>
        <ul>
            <li>Products or services that have been significantly used or altered.</li>
            <li>Customized, bespoke, or personalized items/services.</li>
            <li>Digital downloads once they have been securely accessed or downloaded.</li>
            <li>Gift cards and promotional vouchers.</li>
        </ul>
        <p>We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.</p>
    </section>

    <section>
        <h2>4. Refund Request Process</h2>
        <p>To request a refund, please follow these steps:</p>
        <ol>
            <li>Contact our support team at <strong>${data.supportEmail}</strong>.</li>
            <li>Provide your order number and the email address associated with the purchase.</li>
            <li>Briefly explain the reason for your refund request to help us improve our services.</li>
        </ol>
    </section>

    <section>
        <h2>5. Refund Timeline</h2>
        <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
        <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment (${data.paymentMethods}), within a certain amount of days, typically 5-10 business days depending on your card issuer's policies.</p>
    </section>

    <section>
        <h2>6. Contact Us</h2>
        <p>If you have any questions about our Returns and Refunds Policy, please contact us:</p>
        <ul>
            <li>By email: ${data.supportEmail}</li>
            <li>By visiting this page on our website: ${data.websiteUrl}</li>
        </ul>
    </section>
</body>
</html>`;

    document.getElementById('outputArea').value = html;
}

// UI Actions

function copyHTML() {
    const output = document.getElementById('outputArea');
    if (!output.value) return;

    output.select();
    document.execCommand('copy');

    // Unselect
    window.getSelection().removeAllRanges();

    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Copied!';
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 2000);
}

function downloadHTML(type) {
    const output = document.getElementById('outputArea');
    if (!output.value) return;

    const blob = new Blob([output.value], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-policy.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function openPreview() {
    const output = document.getElementById('outputArea');
    if (!output.value) return;

    const modal = document.getElementById('previewModal');
    const container = document.getElementById('previewContainer');

    // We render the HTML directly into the container.
    // For a cleaner look, we might strip out the html/head/body tags for the preview, 
    // but the browser generally handles it fine inside a div.
    container.innerHTML = output.value;

    modal.classList.add('active');
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('previewModal');
    if (event.target == modal) {
        modal.classList.remove('active');
    }
}
