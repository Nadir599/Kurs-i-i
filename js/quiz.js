// Quiz functionality

const quizQuestions = [
  {
    question: "Fransanın paytaxtı hansıdır?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "Hansı planet Qırmızı Planet kimi tanınır?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "Hansı yer üzündəki ən böyük okeandır?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Mona Lizanı kim çəkib?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "Hansı elementin kimyəvi simvolu 'O'dır?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen"
  },
  {
    question: "İkinci Dünya Müharibəsi hansı ildə başa çatıb?",
    options: ["1943", "1945", "1947", "1950"],
    correctAnswer: "1945"
  },
  {
    question: "Bunlardan hansı suda yaşayır?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Böyük Sədd rifinin vətəni hansı ölkədir?",
    options: ["Brazil", "Mexico", "Australia", "Thailand"],
    correctAnswer: "Australia"
  },
  {
    question: "Ən kiçik sadə ədəd nədir?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2"
  },
  {
    question: "'Romeo və Cülyetta'nı kim yazıb?",
    options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  }
];

export function initQuiz() {
  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const progressBar = document.getElementById('progress-bar');
  const currentQuestionSpan = document.getElementById('current-question');
  const totalQuestionsSpan = document.getElementById('total-questions');
  const currentScoreSpan = document.getElementById('current-score');
  const finalScoreSpan = document.getElementById('final-score');
  const maxScoreSpan = document.getElementById('max-score');
  const resultMessageElement = document.getElementById('result-message');
  const resultDetailsElement = document.getElementById('result-details');
  const reviewAnswersBtn = document.getElementById('review-answers');
  const retakeQuizBtn = document.getElementById('retake-quiz');
  const reviewContainer = document.getElementById('review-container');
  const backToResultsBtn = document.getElementById('back-to-results');
  
  let currentQuestion = 0;
  let score = 0;
  let userAnswers = [];
  
  // Initialize quiz state
  if (totalQuestionsSpan) {
    totalQuestionsSpan.textContent = quizQuestions.length;
  }
  
  if (maxScoreSpan) {
    maxScoreSpan.textContent = `/${quizQuestions.length}`;
  }
  
  // Initialize quiz with empty answers
  for (let i = 0; i < quizQuestions.length; i++) {
    userAnswers.push(null);
  }
  
  // Load a question
  function loadQuestion(questionIndex) {
    if (!questionContainer || !optionsContainer) return;
    
    const question = quizQuestions[questionIndex];
    
    // Update question text
    document.getElementById('question-text').textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Add options
    question.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option';
      if (userAnswers[questionIndex] === option) {
        optionElement.classList.add('selected');
      }
      
      optionElement.innerHTML = `
        <input type="radio" id="option${index}" name="quiz-option" class="option-radio" ${userAnswers[questionIndex] === option ? 'checked' : ''}>
        <label for="option${index}">${option}</label>
      `;
      
      optionElement.addEventListener('click', () => {
        // Select this option
        selectAnswer(option);
      });
      
      optionsContainer.appendChild(optionElement);
    });
    
    // Update current question display
    if (currentQuestionSpan) {
      currentQuestionSpan.textContent = questionIndex + 1;
    }
    
    // Update progress bar
    if (progressBar) {
      const progressPercentage = ((questionIndex + 1) / quizQuestions.length) * 100;
      progressBar.style.width = `${progressPercentage}%`;
    }
    
    // Update button states
    updateButtonStates();
  }
  
  // Select an answer
  function selectAnswer(option) {
    userAnswers[currentQuestion] = option;
    
    // Update visual selection
    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
      opt.classList.remove('selected');
      const radioInput = opt.querySelector('input[type="radio"]');
      radioInput.checked = false;
    });
    
    const selectedOption = Array.from(options).find(opt => 
      opt.textContent.trim() === option
    );
    
    if (selectedOption) {
      selectedOption.classList.add('selected');
      const radioInput = selectedOption.querySelector('input[type="radio"]');
      if (radioInput) radioInput.checked = true;
    }
    
    // Enable next button if an answer is selected
    if (nextBtn) {
      nextBtn.removeAttribute('disabled');
    }
    
    // Update score
    updateScore();
  }
  
  // Update score
  function updateScore() {
    score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        score++;
      }
    });
    
    if (currentScoreSpan) {
      currentScoreSpan.textContent = score;
    }
  }
  
  // Update button states based on current question
  function updateButtonStates() {
    if (prevBtn) {
      prevBtn.disabled = currentQuestion === 0;
    }
    
    if (nextBtn) {
      if (currentQuestion === quizQuestions.length - 1) {
        nextBtn.textContent = 'Finish Quiz';
      } else {
        nextBtn.textContent = 'Next';
      }
      
      // Disable next button if no answer is selected for current question
      nextBtn.disabled = userAnswers[currentQuestion] === null;
    }
  }
  
  // Event handlers
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
      } else {
        // Show results section
        document.getElementById('quiz').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
        showResults();
      }
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
      }
    });
  }
  
  // Show quiz results
  function showResults() {
    if (!finalScoreSpan) return;
    
    // Update final score
    finalScoreSpan.textContent = score;
    
    // Update score circle visualization
    const scoreCircle = document.querySelector('.score-circle');
    if (scoreCircle) {
      const percentage = (score / quizQuestions.length) * 100;
      scoreCircle.style.background = `conic-gradient(var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-neutral-200) ${percentage}%, var(--color-neutral-200) 100%)`;
    }
    
    // Set appropriate message based on score
    if (resultMessageElement && resultDetailsElement) {
      let message, details;
      
      if (score === quizQuestions.length) {
        message = "Mükəmməl!";
        details = "Təbrik edirik! Hər sualı düzgün verdiniz. Siz quiz ustasısınız!";
      } else if (score >= quizQuestions.length * 0.8) {
        message = "Əla!";
        details = "Əla iş! Siz əla bilik nümayiş etdirdiniz.";
      } else if (score >= quizQuestions.length * 0.6) {
        message = "Yaxşı!";
        details = "Yaxşıydı! Bir az daha çox öyrənsəniz, növbəti dəfə bunu edə bilərsiniz.";
      } else if (score >= quizQuestions.length * 0.4) {
        message = "Pis deyil!";
        details = "Doğru yoldasınız. Bir az daha çox məşq etsəniz, xalınızı yaxşılaşdıracaqsınız.";
      } else {
        message = "Cəhd etməyə davam edin!";
        details = "Təslim olma! Materialı nəzərdən keçirin və daha yaxşı nəticə əldə etmək üçün yenidən cəhd edin.";
      }
      
      resultMessageElement.textContent = message;
      resultDetailsElement.textContent = details;
    }
  }
  
  // Review answers
  if (reviewAnswersBtn) {
    reviewAnswersBtn.addEventListener('click', () => {
      document.getElementById('results').classList.add('hidden');
      document.getElementById('review').classList.remove('hidden');
      
      // Generate review content
      if (reviewContainer) {
        reviewContainer.innerHTML = '';
        
        quizQuestions.forEach((question, index) => {
          const userAnswer = userAnswers[index];
          const correctAnswer = question.correctAnswer;
          const isCorrect = userAnswer === correctAnswer;
          
          const reviewItem = document.createElement('div');
          reviewItem.className = 'review-item';
          
          let reviewContent = `
            <h3 class="review-question">${index + 1}. ${question.question}</h3>
            <div class="review-options">
          `;
          
          question.options.forEach(option => {
            const isUserSelected = option === userAnswer;
            const isCorrectAnswer = option === correctAnswer;
            
            let optionClass = '';
            if (isUserSelected) optionClass += ' user-selected';
            if (isCorrectAnswer) optionClass += ' correct-answer';
            
            reviewContent += `
              <div class="review-option${optionClass}">
                ${option} 
                ${isCorrectAnswer ? '<i class="fas fa-check" style="color: var(--color-success);"></i>' : ''}
                ${isUserSelected && !isCorrect ? '<i class="fas fa-times" style="color: var(--color-error);"></i>' : ''}
              </div>
            `;
          });
          
          reviewContent += `</div>`;
          reviewItem.innerHTML = reviewContent;
          reviewContainer.appendChild(reviewItem);
        });
      }
    });
  }
  
  // Back to results
  if (backToResultsBtn) {
    backToResultsBtn.addEventListener('click', () => {
      document.getElementById('review').classList.add('hidden');
      document.getElementById('results').classList.remove('hidden');
    });
  }
  
  // Retake quiz
  if (retakeQuizBtn) {
    retakeQuizBtn.addEventListener('click', () => {
      // Reset quiz state
      currentQuestion = 0;
      score = 0;
      userAnswers = Array(quizQuestions.length).fill(null);
      
      // Hide results and show quiz
      document.getElementById('results').classList.add('hidden');
      document.getElementById('quiz').classList.remove('hidden');
      
      // Load first question
      loadQuestion(currentQuestion);
      
      // Reset score display
      if (currentScoreSpan) {
        currentScoreSpan.textContent = '0';
      }
    });
  }
  
  // If the quiz section exists, load the first question
  if (document.getElementById('quiz')) {
    loadQuestion(0);
  }
}