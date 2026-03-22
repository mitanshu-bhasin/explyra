document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('listing-form');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // UI Feedback
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            try {
                // Add timestamp and status
                data.submittedAt = firebase.firestore.FieldValue.serverTimestamp();
                data.status = 'pending';
                data.paymentStatus = 'unpaid';

                // Submit to Firestore
                await db.collection('business_submissions').add(data);

                // Success Message
                alert('Success! Your business has been submitted for verification. Please complete the payment via WhatsApp to get listed.');
                
                // Construct WhatsApp Link
                const waMessage = encodeURIComponent(`Hi, I just submitted my business "${data.name}" for verification on Explyra Directories. Please confirm my submission.`);
                const waLink = `https://wa.me/918076108584?text=${waMessage}`;
                
                // Redirect to WhatsApp
                window.location.href = waLink;

            } catch (error) {
                console.error('Submission Error:', error);
                alert('There was an error submitting your form. Please try again.');
                submitBtn.textContent = 'Submit for Verification';
                submitBtn.disabled = false;
            }
        });
    }
});
