import { initNavigation } from './navigation.js';
import { initQuiz } from './quiz.js';
import { initContactForm } from './form.js';
import { initAnimations } from './animations.js';

// Main app initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavigation();
  initQuiz();
  initContactForm();
  initAnimations();
  
  console.log('QuizMaster application initialized.');
});