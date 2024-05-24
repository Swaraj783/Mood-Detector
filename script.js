const questions = [
  {
    question: "How do you feel when you wake up in the morning?",
    options: ["Energized", "Tired", "Anxious", "Happy"],
    scores: [1, 2, 3, 1],
  },
  {
    question: "How do you handle stress?",
    options: ["Stay calm", "Get overwhelmed", "Panic", "Handle it well"],
    scores: [1, 3, 3, 1],
  },
  {
    question: "How often do you feel tired throughout the day?",
    options: ["Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 3],
  },
  {
    question: "How do you feel after social interactions?",
    options: ["Energized", "Drained", "Indifferent", "Anxious"],
    scores: [1, 3, 2, 3],
  },
  {
    question: "How do you cope with failure?",
    options: [
      "Learn from it",
      "Get frustrated",
      "Feel hopeless",
      "Move on quickly",
    ],
    scores: [1, 3, 3, 1],
  },
  {
    question: "How often do you worry about the future?",
    options: ["Never", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 3],
  },
  {
    question: "How do you feel about your daily routine?",
    options: ["Satisfied", "Bored", "Overwhelmed", "Content"],
    scores: [1, 2, 3, 1],
  },
  {
    question: "How often do you feel happy?",
    options: ["Always", "Often", "Sometimes", "Rarely"],
    scores: [1, 1, 2, 3],
  },
  {
    question: "How do you react to unexpected changes?",
    options: ["Adapt easily", "Feel stressed", "Get anxious", "Stay calm"],
    scores: [1, 3, 3, 1],
  },
  {
    question: "How do you feel about your work or studies?",
    options: ["Motivated", "Stressed", "Indifferent", "Anxious"],
    scores: [1, 3, 2, 3],
  },
];

let currentQuestionIndex = 0;
let scores = [];
let playerName = "";

document
  .getElementById("nameForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    playerName = document.getElementById("playerName").value;
    document.getElementById("nameForm").classList.add("d-none");
    document.getElementById("questionnaire").classList.remove("d-none");
    document.getElementById("totalQuestions").innerText = questions.length;
    displayQuestion();
  });

function displayQuestion() {
  const questionData = questions[currentQuestionIndex];
  let questionHtml = `<h3>${questionData.question}</h3>`;
  questionData.options.forEach((option, index) => {
    questionHtml += `
            <button class="btn answer-btn" onclick="selectAnswer(${questionData.scores[index]})">${option}</button>
        `;
  });
  document.getElementById("questionContainer").innerHTML = questionHtml;
  document.getElementById("currentQuestion").innerText =
    currentQuestionIndex + 1;
}

function selectAnswer(score) {
  scores.push(score);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    displayResult();
  }
}

document.getElementById("restartButton").addEventListener("click", function () {
  currentQuestionIndex = 0;
  scores = [];
  playerName = "";
  document.getElementById("result").classList.add("d-none");
  document.getElementById("nameForm").classList.remove("d-none");
  document.getElementById("playerName").value = "";
});

function displayResult() {
  const totalScore = scores.reduce((a, b) => a + b, 0);
  let mood = "";
  if (totalScore <= 15) {
    mood = "happy";
  } else if (totalScore <= 25) {
    mood = "anxious";
  } else {
    mood = "stressed";
  }
  document.getElementById("questionnaire").classList.add("d-none");
  document.getElementById("result").classList.remove("d-none");
  document.getElementById(
    "resultMessage"
  ).innerText = `${playerName}, you are feeling ${mood}!`;
}
