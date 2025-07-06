document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");
  const restartButton = document.getElementById("restartBtn");
  const welcomePage = document.getElementById("welcomepage");
  const quizPage = document.getElementById("quizpage");
  const resultPage = document.getElementById("resultpage");

  const questionTitle = document.getElementById("question-title");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");
  const answersContainer = document.getElementById("answers");
  const scoreText = document.getElementById("scoreText");

  const quizData = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Rome"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Mark Twain", "William Shakespeare", "Charles Dickens", "Jane Austen"],
      answer: "William Shakespeare"
    },
    {
      question: "Which language is used for web apps?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: "JavaScript"
    }
  ];

  let currentQuestion = 0;
  let userAnswers = [];

  function loadQuestion(index) {
    const q = quizData[index];
    questionTitle.textContent = `Question ${index + 1}`;
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";
    let correctSelected = false;

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.className = "option-button";

      btn.addEventListener("click", function () {
        // If correct already selected, ignore further clicks
        if (correctSelected) return;

        // Disable just this button to avoid multiple red clicks
        btn.disabled = true;

        if (option === q.answer) {
          btn.style.backgroundColor = "#c2f0c2"; // green
          correctSelected = true;
          nextBtn.style.display = "block";

          // Disable all buttons after correct
          Array.from(optionsContainer.children).forEach(b => b.disabled = true);

          userAnswers.push({
            question: q.question,
            selected: option,
            correct: q.answer,
            correctAnswer: true
          });

        } else {
          btn.style.backgroundColor = "#f8bcbc"; 
          
        }
      });

      optionsContainer.appendChild(btn);
    });
  }

  nextBtn.addEventListener("click", function () {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion(currentQuestion);
    } else {
      showFinalAnswers();
    }
  });

  function showFinalAnswers() {
    quizPage.style.display = "none";
    resultPage.style.display = "block";
    answersContainer.innerHTML = "";

    const correctCount = userAnswers.filter(a => a.correctAnswer).length;
    scoreText.textContent = `You got ${correctCount} out of ${quizData.length} correct!`;

    userAnswers.forEach((item, i) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>Q${i + 1}:</strong> ${item.question}<br>
        <span style="color: ${item.correctAnswer ? 'green' : 'red'}">
          Your Answer: ${item.selected}
        </span><br>
        <span style="color: green;">Correct Answer: ${item.correct}</span>
      `;
      div.style.marginBottom = "20px";
      answersContainer.appendChild(div);
    });
  }

  restartButton.addEventListener("click", function () {
    resultPage.style.display = "none";
    welcomePage.style.display = "flex";
    currentQuestion = 0;
    userAnswers = [];
  });

  startButton.addEventListener("click", function () {
    welcomePage.style.display = "none";
    quizPage.style.display = "flex";
    resultPage.style.display = "none";
    currentQuestion = 0;
    userAnswers = [];
    loadQuestion(currentQuestion);
  });
});
