const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// Smooth scroll avec easing personnalisé pour les ancres
function smoothScrollToElement(element, duration = 800, targetId = null) {
    const start = window.scrollY;
    const offset = targetId && offsetConfig[targetId] ? offsetConfig[targetId] : 100;
    const target = element.getBoundingClientRect().top + window.scrollY - offset;
    const distance = target - start;
    let startTime = null;

    // Fonction d'easing (cubic-in-out)
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function scrollAnimation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, start + distance * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    requestAnimationFrame(scrollAnimation);
}

// Configuration des offsets par section
const offsetConfig = {
    '#header': 0,
    '#apropos': 100,
    '#piliers': 100,
    '#partenaires': 100,
    '#reseaux': 100,
    '#contact': 0
};

// Gestion des clics sur les liens de navigation
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        console.log('Target ID:', targetId);
        console.log('Element trouvé:', targetElement);
        console.log('Position actuelle:', window.scrollY);
        
        if (targetElement) {
            smoothScrollToElement(targetElement, 800, targetId);
        }
    });
});

// Gestion de TOUS les boutons nav-toggle (avec querySelectorAll)
const navToggles = document.querySelectorAll('.nav-toggle');
navToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
        const ul = document.querySelector('#nav ul');
        ul.classList.toggle('active');
    });
});