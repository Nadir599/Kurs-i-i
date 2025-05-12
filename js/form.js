// Contact form validation and handling

export function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  
  const formSuccess = document.getElementById('form-success');
  
  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Validate name
  function validateName() {
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name';
      nameInput.classList.add('shake');
      setTimeout(() => {
        nameInput.classList.remove('shake');
      }, 500);
      return false;
    } else if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Name must be at least 2 characters';
      return false;
    } else {
      nameError.textContent = '';
      return true;
    }
  }
  
  // Validate email
  function validateEmail() {
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email';
      emailInput.classList.add('shake');
      setTimeout(() => {
        emailInput.classList.remove('shake');
      }, 500);
      return false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address';
      return false;
    } else {
      emailError.textContent = '';
      return true;
    }
  }
  
  // Validate message
  function validateMessage() {
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please enter a message';
      messageInput.classList.add('shake');
      setTimeout(() => {
        messageInput.classList.remove('shake');
      }, 500);
      return false;
    } else if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'Message must be at least 10 characters';
      return false;
    } else {
      messageError.textContent = '';
      return true;
    }
  }
  
  // Add input event listeners
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    // If all fields are valid, process the form
    if (isNameValid && isEmailValid && isMessageValid) {
      // Simulate form submission with a loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.innerHTML = '<span class="loading"></span> Sending...';
      submitButton.disabled = true;
      
      // Simulate API call delay
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        formSuccess.classList.remove('hidden');
        formSuccess.classList.add('form-success-animation');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.add('hidden');
          formSuccess.classList.remove('form-success-animation');
        }, 5000);
      }, 1500);
    }
  });
}