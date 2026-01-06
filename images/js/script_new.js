let currentSlideIndex = 0;
const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');

function showSlide(index) {
    const translateX = -index * (100 / 3); // Each slide is 33.333% width
    slides.style.transform = `translateX(${translateX}%)`;
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) {
        currentSlideIndex = slideElements.length - 1;
    } else if (currentSlideIndex >= slideElements.length) {
        currentSlideIndex = 0;
    }
    showSlide(currentSlideIndex);
}

// Auto-slide functionality
function autoSlide() {
    changeSlide(1);
}

// Start auto-sliding every 5 seconds
setInterval(autoSlide, 5000);

// Initialize first slide
showSlide(currentSlideIndex);
