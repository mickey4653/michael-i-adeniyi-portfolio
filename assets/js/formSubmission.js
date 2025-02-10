window.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    var submitButton = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function(event) {
        // Optional: Disable submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Use fetch to handle form submission
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Clear form fields
                form.reset();
                
                // Optional: Show success message
                alert('Thank you for your message! I will get back to you soon.');
                
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            } else {
                // Handle errors
                alert('Oops! There was a problem submitting your form');
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }).catch(error => {
            // Handle network errors
            console.error('Error:', error);
            alert('Oops! There was a network error.');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });

        // Prevent the default form submission
        event.preventDefault();
    });
});