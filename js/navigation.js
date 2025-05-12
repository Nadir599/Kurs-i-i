export function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');
  const startQuizBtn = document.getElementById('start-quiz');
  const scrollTopBtn = document.getElementById('scroll-top');
  const header = document.querySelector('header');

  // Toggle mobile menu
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when nav link is clicked
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Start quiz button functionality
  startQuizBtn?.addEventListener('click', () => {
    document.getElementById('hero').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');

    // Scroll to the quiz section
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Scroll to top button functionality
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Add shadow to header when scrolling
    if (window.scrollY > 50) {
      header.style.boxShadow = 'var(--shadow)';
      header.style.backgroundColor = 'rgba(248, 249, 250, 0.95)';
    } else {
      header.style.boxShadow = 'var(--shadow-sm)';
      header.style.backgroundColor = 'rgba(248, 249, 250, 0.9)';
    }
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth scroll and section visibility logic
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Hide all sections except #contact and the target section
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
          if (section.id !== 'contact' && section.id !== targetElement.id) {
            section.classList.add('hidden');
          } else if (section.id === targetElement.id) {
            section.classList.remove('hidden');
          }
        });

        // Scroll to the target section
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}