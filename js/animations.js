// Animations and UI effects

export function initAnimations() {
  // Apply fade-in animation to sections when they enter the viewport
  const sections = document.querySelectorAll('.section');
  const animationOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };
  
  // Intersection Observer for section animations
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('hidden')) {
        entry.target.classList.add('fade-in');
        
        // Animate children elements
        const animatedElements = entry.target.querySelectorAll('.animate-on-enter');
        animatedElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('fade-in');
          }, 100 * index);
        });
      }
    });
  }, animationOptions);
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Add hover animation to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.classList.add('btn-hover-effect');
  });
  
  // Animate quiz options on hover
  const quizOptions = document.querySelectorAll('.option');
  quizOptions.forEach(option => {
    option.classList.add('option-select');
  });
  
  // Pulse animation for start quiz button
  const startButton = document.getElementById('start-quiz');
  if (startButton) {
    startButton.classList.add('pulse');
  }
  
  // Animate score counter when results are shown
  const resultObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateScoreCounter();
      }
    });
  }, { threshold: 0.8 });
  
  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    resultObserver.observe(resultsSection);
  }
  
  // Function to animate the score counter
  function animateScoreCounter() {
    const finalScore = document.getElementById('final-score');
    if (!finalScore) return;
    
    const targetScore = parseInt(finalScore.textContent || '0');
    let currentScore = 0;
    
    const scoreInterval = setInterval(() => {
      if (currentScore < targetScore) {
        currentScore++;
        finalScore.textContent = currentScore;
      } else {
        clearInterval(scoreInterval);
      }
    }, 100);
  }
  
  // Animate form inputs on focus
  const formInputs = document.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('input-focus');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('input-focus');
    });
  });
  
  // Add scroll-triggered animations
  window.addEventListener('scroll', () => {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    scrollElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementHeight = element.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - elementHeight / 3) {
        element.classList.add('fade-in');
      }
    });
  });
  
  // Add subtle background animation to hero section
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    let position = 0;
    const speed = 0.05;
    
    function animateHeroBackground() {
      position += speed;
      const translateValue = Math.sin(position) * 5;
      
      heroSection.style.backgroundPosition = `${50 + translateValue}% ${50 - translateValue}%`;
      
      requestAnimationFrame(animateHeroBackground);
    }
    
    animateHeroBackground();
  }
}