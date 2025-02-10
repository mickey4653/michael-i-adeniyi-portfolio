document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let clickedImageContainer = null;

    // Add view button to image containers
    document.querySelectorAll('.image-container').forEach(container => {
        const viewOverlay = document.createElement('div');
        viewOverlay.classList.add('view-overlay');
        const viewBtn = document.createElement('button');
        viewBtn.textContent = 'View';
        viewBtn.classList.add('view-btn');
        viewOverlay.appendChild(viewBtn);
        container.appendChild(viewOverlay);

        viewBtn.addEventListener('click', (e) => {
            clickedImageContainer = container;
            modal.style.display = 'flex';
            showSlide(0);
            
            // Prevent page scroll
            document.body.style.overflow = 'hidden';
            
            // Scroll to modal if needed
            modal.scrollIntoView({behavior: 'smooth', block: 'center'});
        });
    });

    // Close modal
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Prevent scrolling when modal is open
    modal.addEventListener('wheel', (e) => {
        e.preventDefault();
    }, { passive: false });

    // Slide navigation
    function showSlide(n) {
        slides.forEach(slide => slide.style.display = 'none');
        slides[n].style.display = 'block';
        currentSlide = n;
    }

    prevBtn.onclick = () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    };

    nextBtn.onclick = () => {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    };
});