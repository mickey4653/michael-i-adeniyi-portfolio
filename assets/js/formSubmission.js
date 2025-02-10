document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            var submitButton = form.querySelector('button[type="submit"]');
            
            if (!submitButton) {
                console.error('Submit button not found');
                alert('There was an issue with the form submission button.');
                return;
            }

            var formData = new FormData(form);

            // Disable submit button and change text
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Use XMLHttpRequest for more detailed error handling
            var xhr = new XMLHttpRequest();
            xhr.open('POST', form.action, true);
            xhr.setRequestHeader('Accept', 'application/json');

            xhr.onload = function() {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';

                if (xhr.status === 200) {
                    alert('Thank you for your message! I will get back to you soon.');
                    form.reset();
                } else {
                    console.error('Error status:', xhr.status);
                    console.error('Error response:', xhr.responseText);
                    alert('Oops! There was a problem submitting your form. Status: ' + xhr.status);
                }
            };

            xhr.onerror = function() {
                console.error('Network Error');
                alert('Network error. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            };

            xhr.send(formData);
        });
    } else {
        console.error('Contact form not found');
    }
});