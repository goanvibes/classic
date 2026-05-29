document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileToggle && closeMenu && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => observer.observe(el));

    // Trigger hero animations immediately on load
    setTimeout(() => {
        document.querySelectorAll('.hero.slide-up, .order-section.slide-up').forEach(el => el.classList.add('appear'));
    }, 100);

    // --- Print Order WhatsApp Integration ---
    const printOrderForm = document.getElementById('printOrderForm');
    
    if (printOrderForm) {
        printOrderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Retrieve form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const branch = document.getElementById('branch').value;
            const service = document.getElementById('service').value;
            const details = document.getElementById('details').value;

            // Map branches to specific numbers if needed. 
            // Defaulting to the Patto branch number provided in the JSON data.
            const whatsappNumber = "918322950687"; 

            // Construct WhatsApp Message
            const message = 
`*NEW PRINT ORDER REQUEST*%0A
*Name:* ${name}%0A
*Phone:* ${phone}%0A
*Pickup Branch:* ${branch}%0A
*Service Required:* ${service}%0A
---------------------------%0A
*Instructions:*%0A${details.replace(/\n/g, '%0A')}%0A
---------------------------%0A
_Please see the attached files for printing._`;

            // Open WhatsApp in a new tab
            const waLink = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(waLink, '_blank');
            
            // Optional: Reset form after clicking
            printOrderForm.reset();
        });
    }
});
