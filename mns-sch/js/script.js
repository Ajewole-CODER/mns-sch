// Background slideshow (only runs on pages that actually have .bg-slide elements)
const bgSlides = document.querySelectorAll('.bg-slide');
if (bgSlides.length > 0) {
    let currentSlide = 0;

    const showBgSlide = () => {
        bgSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        currentSlide = (currentSlide + 1) % bgSlides.length;
    };

    bgSlides[0].classList.add('active');
    setInterval(showBgSlide, 5000); // change every 5s
}

// Contact form handling (only runs on the page that has the contact form)
const form = document.getElementById('form-group');
if (form) {
    const statusMsg = document.getElementById('statusMessage');
    const submitBtn = document.getElementById('submitBtn');

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10,15}$/.test(phone.replace(/\s|-/g, ''));
    const validateName = (name) => name.length >= 2;
    const validateSubject = (subject) => subject.length >= 5;
    const validateMessage = (message) => message.length >= 10;

    const showError = (fieldId, message) => {
        const field = document.getElementById(fieldId);
        field.classList.add('error');
        statusMsg.textContent = message;
        statusMsg.className = 'message error show';
    };

    const clearError = (fieldId) => {
        document.getElementById(fieldId).classList.remove('error');
    };

    const clearAllErrors = () => {
        ['name', 'email', 'phone-number', 'subject', 'message'].forEach(clearError);
        statusMsg.classList.remove('show');
    };

    ['name', 'email', 'phone-number', 'subject', 'message'].forEach((id) => {
        document.getElementById(id).addEventListener('input', () => clearError(id));
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        clearAllErrors();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone-number').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

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

        submitBtn.disabled = true;
        submitBtn.textContent = 'Opening email client...';
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach((input) => (input.disabled = true));

        const mailtoLink = `mailto:ajewolehelenola@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Subject: ${subject}\n\n` +
            `Message:\n${message}`
        )}`;

        window.location.href = mailtoLink;

        setTimeout(() => {
            statusMsg.textContent = 'Email client opened! Please send the message from your mail app.';
            statusMsg.className = 'message success show';

            form.reset();
            clearAllErrors();

            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            inputs.forEach((input) => (input.disabled = false));

            setTimeout(() => statusMsg.classList.remove('show'), 5000);
        }, 1000);
    });
}
