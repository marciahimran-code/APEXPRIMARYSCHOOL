/*
   Shared JavaScript
   Navigation • Loader • Quiz • Flashcards • Forms • Filters
*/

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavigation();
  initRevealAnimations();
  initYear();
  initHomeTip();
  initQuiz();
  initFlashcards();
  initContactForm();
});

/* Lightweight page loader */
function initLoader() {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 350);
  });

  // Safety fallback for slower environments.
  setTimeout(() => loader.classList.add("hidden"), 1800);
}

/* Mobile menu + accessible dropdown menus */
function initNavigation() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll(".nav-link, .nav-cta").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll(".dropdown-toggle").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      const parent = button.closest(".nav-dropdown");
      const isOpen = parent.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));

      document.querySelectorAll(".nav-dropdown").forEach(other => {
        if (other !== parent) {
          other.classList.remove("open");
          const otherButton = other.querySelector(".dropdown-toggle");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  document.addEventListener("click", event => {
    if (!event.target.closest(".nav-dropdown")) {
      document.querySelectorAll(".nav-dropdown").forEach(drop => {
        drop.classList.remove("open");
        const button = drop.querySelector(".dropdown-toggle");
        if (button) button.setAttribute("aria-expanded", "false");
      });
    }
  });
}

/* Scroll-in animations */
function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

function initYear() {
  document.querySelectorAll("#year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* Home learning tips */
function initHomeTip() {
  const button = document.getElementById("newTipBtn");
  const result = document.getElementById("tipResult");
  if (!button || !result) return;

const tips = [
    "Try explaining today's lesson to someone else. Teaching helps you remember.",
    "Read the question twice before answering. Understanding comes before speed.",
    "If you make a mistake, ask: “What can this mistake teach me?”",
    "Study for 25 minutes, then take a short movement break.",
    "Use examples from everyday life to make difficult ideas easier to understand.",
    "Draw pictures or diagrams to help visualize new concepts.",
    "Write down your goals before you start studying so you know what to focus on.",
    "Take deep breaths if you feel stuck or confused; it helps clear your mind.",
    "Ask questions whenever something is unclear. Curiosity is the key to learning.",
    "Review your notes from yesterday before starting something new today.",
    "Keep your study space neat and tidy to help your brain stay organized.",
    "Drink a glass of water before you study to keep your brain energized and alert.",
    "Break large, difficult tasks into smaller, bite-sized steps.",
    "Use flashcards to practice spelling, vocabulary, and math facts.",
    "Celebrate your small wins and progress every single day!"
  ];

  button.addEventListener("click", () => {
    const current = result.textContent;
    let next = tips[Math.floor(Math.random() * tips.length)];
    while (tips.length > 1 && next === current) {
      next = tips[Math.floor(Math.random() * tips.length)];
    }
    result.textContent = next;
  });
}

/* Interactive 5-question maths quiz */
function initQuiz() {
  const questionEl = document.getElementById("quizQuestion");
  const optionsEl = document.getElementById("quizOptions");
  const progressEl = document.getElementById("quizProgress");
  const scoreEl = document.getElementById("quizScore");
  const progressBar = document.getElementById("quizProgressBar");
  const feedbackEl = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("nextQuestion");

  if (!questionEl || !optionsEl || !nextButton) return;

const questions = [
    { q: "What is 7 × 8?", options: ["48", "56", "64", "54"], answer: "56" },
    { q: "What is 125 + 75?", options: ["180", "190", "200", "210"], answer: "200" },
    { q: "Which number is a prime number?", options: ["9", "15", "17", "21"], answer: "17" },
    { q: "What is 500 ÷ 10?", options: ["5", "50", "100", "500"], answer: "50" },
    { q: "What is 575 - 115?", options: ["5", "460", "100", "500"], answer: "460" },
    { q: "Which number is even?", options: ["5.1", "4", "9.10", "0"], answer: "4" },
    { q: "What is 3/4 as a decimal?", options: ["0.25", "0.5", "0.75", "1.25"], answer: "0.75" },
    { q: "What is 9 × 9?", options: ["72", "81", "90", "99"], answer: "81" },
    { q: "What is 50 + 75?", options: ["115", "125", "135", "145"], answer: "125" },
    { q: "What is 100 - 37?", options: ["53", "63", "73", "83"], answer: "63" },
    { q: "What is 63 ÷ 9?", options: ["6", "7", "8", "9"], answer: "7" },
    { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: "6" },
    { q: "What is 1/2 as a percentage?", options: ["25%", "50%", "75%", "100%"], answer: "50%" },
    { q: "What is 45 + 55?", options: ["90", "100", "110", "120"], answer: "100" },
    { q: "Which number is a multiple of 4?", options: ["6", "10", "14", "16"], answer: "16" },
    { q: "What is 80 × 10?", options: ["80", "800", "8,000", "8"], answer: "800" },
    { q: "What is the next prime number after 2?", options: ["3", "4", "5", "7"], answer: "3" },
    { q: "What is 24 ÷ 4?", options: ["4", "5", "6", "7"], answer: "6" },
    { q: "What is 99 + 1?", options: ["100", "101", "1000", "991"], answer: "100" },
    { q: "Which shape has four equal sides?", options: ["Triangle", "Rectangle", "Square", "Trapezoid"], answer: "Square" },
    { q: "What is 300 - 150?", options: ["100", "125", "150", "200"], answer: "150" },
    { q: "What is 6 × 6?", options: ["30", "36", "42", "48"], answer: "36" },
    { q: "How many hours are in one day?", options: ["12", "24", "36", "48"], answer: "24" },
    { q: "What is 1000 ÷ 100?", options: ["1", "10", "100", "1000"], answer: "10" },
    { q: "What is 15 + 15 + 15?", options: ["35", "40", "45", "50"], answer: "45" },
    { q: "Which fraction is equivalent to 1/2?", options: ["2/4", "1/3", "3/4", "2/3"], answer: "2/4" },
    { q: "What is 10 squared?", options: ["20", "50", "100", "1000"], answer: "100" }
  ];

  let current = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const item = questions[current];
    answered = false;
    questionEl.textContent = item.q;
    progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
    scoreEl.textContent = `⭐ ${score}`;
    progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;
    feedbackEl.textContent = "";
    nextButton.disabled = true;
    nextButton.textContent = current === questions.length - 1 ? "See my result →" : "Next question →";
    optionsEl.innerHTML = "";

    item.options.forEach(option => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;
      button.addEventListener("click", () => answerQuestion(button, option));
      optionsEl.appendChild(button);
    });
  }

  function answerQuestion(selectedButton, answer) {
    if (answered) return;
    answered = true;

    const item = questions[current];
    const allButtons = optionsEl.querySelectorAll(".quiz-option");
    allButtons.forEach(btn => btn.disabled = true);

    if (answer === item.answer) {
      score++;
      selectedButton.classList.add("correct");
      feedbackEl.textContent = "Correct! Great work.";
    } else {
      selectedButton.classList.add("wrong");
      feedbackEl.textContent = `Not quite. The correct answer is ${item.answer}.`;
      allButtons.forEach(btn => {
        if (btn.textContent === item.answer) btn.classList.add("correct");
      });
    }

    scoreEl.textContent = `⭐ ${score}`;
    nextButton.disabled = false;
  }

  nextButton.addEventListener("click", () => {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    } else {
      questionEl.textContent = `You scored ${score} out of ${questions.length}!`;
      optionsEl.innerHTML = score >= 20
        ? "<p>🏆 Excellent work! You are on fire.</p>"
        : score >= 15
          ? "<p>Good job! A little more practice will make you even stronger.</p>"
          : "<p>Keep practising. Every attempt helps your brain grow.</p>";
      progressEl.textContent = "Challenge complete";
      progressBar.style.width = "100%";
      nextButton.textContent = "Try again";
      nextButton.disabled = false;
      nextButton.onclick = () => {
        current = 0;
        score = 0;
        nextButton.onclick = null;
        renderQuestion();
      };
    }
  });

  renderQuestion();
}

/* Flashcard widget */
function initFlashcards() {
  const card = document.getElementById("flashcard");
  const next = document.getElementById("nextCard");
  const question = document.getElementById("flashQuestion");
  const answer = document.getElementById("flashAnswer");

  if (!card || !next || !question || !answer) return;

const cards = [
    ["What is photosynthesis?", "The process by which green plants make food using light."],
    ["What is a noun?", "A word that names a person, place, animal, thing or idea."],
    ["What is 1 kilometre?", "1,000 metres."],
    ["What is evaporation?", "The change of a liquid into a gas, usually because of heat."],
    ["What is a habitat?", "The natural home or environment where an organism lives."],
    ["What is the center of our solar system?", "The Sun."],
    ["What gas do humans need to breathe in to survive?", "Oxygen."],
    ["Which planet is known as the Red Planet?", "Mars."],
    ["What force pulls objects toward the center of the Earth?", "Gravity."],
    ["What is the process of a caterpillar turning into a butterfly called?", "Metamorphosis."],
    ["How many sides does a pentagon have?", "5 sides."],
    ["What is the product of 7 multiplied by 8?", "56."],
    ["How many minutes are in 2 hours?", "120 minutes."],
    ["What is a polygon with three sides called?", "A triangle."],
    ["What is a verb?", "An action word."],
    ["What is an adjective?", "A word that describes a noun."],
    ["What is the opposite of the word 'ancient'?", "Modern."],
    ["What do you call a word that has the same or nearly the same meaning as another word?", "A synonym."],
    ["Which is the largest ocean on Earth?", "The Pacific Ocean."],
    ["How many continents are there on Earth?", "7 continents."],
    ["What is the imaginary line that divides the Earth into the Northern and Southern Hemispheres?", "The Equator."],
    ["Which country is home to the ancient Great Pyramid of Giza?", "Egypt."],
    ["What is the main source of energy for life on Earth?", "The Sun."],
    ["What are the three primary colors of paint?", "Red, blue, and yellow."],
    ["What do you call an animal that eats only plants?", "A herbivore."]
  ];

  let index = 0;

  function renderCard() {
    card.classList.remove("flipped");
    question.textContent = cards[index][0];
    answer.textContent = cards[index][1];
  }

  card.addEventListener("click", () => card.classList.toggle("flipped"));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.classList.toggle("flipped");
    }
  });

  next.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    renderCard();
  });

  renderCard();
}

/* Contact form front-end validation/demo submission */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.className = "form-status error";
      status.textContent = "Please complete all required fields correctly.";
      form.reportValidity();
      return;
    }

    const name = document.getElementById("name").value.trim();
    status.className = "form-status success";
    status.textContent = `Thanks, ${name}! Your message has been prepared successfully.`;

    form.reset();
  });
}
