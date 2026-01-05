// Background slideshow
const bgSlides = document.querySelectorAll('.bg-slide');
let currentSlide = 0;

function showSlide() {
  bgSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });
  currentSlide = (currentSlide + 1) % bgSlides.length;
}

bgSlides[0].classList.add('active');
setInterval(showSlide, 5000); // change every 5s

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone.replace(/\s|-/g, ''));
}

function validateName(name) {
    return name.length >= 2;
}

function validateSubject(subject) {
    return subject.length >= 5;
}

function validateMessage(message) {
    return message.length >= 10;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    statusMsg.textContent = message;
    statusMsg.className = 'message error show';
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('error');
}

function clearAllErrors() {
    const fields = ['name', 'email', 'phone-number', 'subject', 'message'];
    fields.forEach(id => clearError(id));
    statusMsg.classList.remove('show');
}

const form = document.getElementById('form-group');
const statusMsg = document.getElementById('statusMessage');
const submitBtn = document.getElementById('submitBtn');

// Add input event listeners to clear errors
['name', 'email', 'phone-number', 'subject', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearError(id));
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    clearAllErrors();

    // GET FORM DATA
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone-number').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // VALIDATE FIELDS
    let isValid = true;

    if (!validateName(name)) {
        showError('name', 'Name must be at least 2 characters long.');
        isValid = false;
    }
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
    }
    if (!validatePhone(phone)) {
        showError('phone-number', 'Phone number must be 10-15 digits.');
        isValid = false;
    }
    if (!validateSubject(subject)) {
        showError('subject', 'Subject must be at least 5 characters long.');
        isValid = false;
    }
    if (!validateMessage(message)) {
        showError('message', 'Message must be at least 10 characters long.');
        isValid = false;
    }

    if (!isValid) {
        setTimeout(() => statusMsg.classList.remove('show'), 3000);
        return;
    }

    // DISABLE FORM
    submitBtn.disabled = true;
    submitBtn.textContent = 'Opening email client...';
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.disabled = true);

    // CREATE MAILTO LINK
    const mailtoLink = `mailto:ajewolehelenola@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Subject: ${subject}\n\n` +
        `Message:\n${message}`
    )}`;

    // OPEN EMAIL CLIENT
    window.location.href = mailtoLink;

    // SHOW SUCCESS MESSAGE
    setTimeout(() => {
        statusMsg.textContent = 'Email client opened! Please send the message from your mail app.';
        statusMsg.className = 'message success show';

        // RESET FORM
        form.reset();
        clearAllErrors();

        // RE-ENABLE FORM
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        inputs.forEach(input => input.disabled = false);

        // HIDE MESSAGE AFTER 5 SECONDS
        setTimeout(() => statusMsg.classList.remove('show'), 5000);
    }, 1000);
});
