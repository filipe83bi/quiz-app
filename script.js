const quizData = [
  {
    question: "What will JSON.stringify({ a: 1, b: undefined }) return?",
    choices: ['{"a":1,"b":undefined}', '{"a":1}', '{"a":1,"b":null}', "{a: 1}"],
    correctAnswer: 1,
  },
  {
    question: `Which methods is used to remove the last element from an array in JavaScript?`,
    choices: ["shift()", "pop()", "splice()", "slice()"],
    correctAnswer: 1,
  },
  {
    question: "What is the typeof NaN);",
    choices: ["number", "NaN", "undefined", "object"],
    correctAnswer: 0,
  },
  {
    question: "Who is the best Javascript teacher?",
    choices: ["Dr. Dre", "Dr. Who", "Dr. House", "Hayk"],
    correctAnswer: 3,
  },
];

const mainContainerElement = document.querySelector(".main-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButtonElement = document.getElementById("submit-button");
const headerElement = document.getElementById("header");
const resultElement = document.getElementById("result");
const startElement = document.getElementById("enter-to-start");

let currentQuestion = 0;
let score = 0;
const wrongAnswers = [];

function loadQuestion() {
  const { question, choices } = quizData[currentQuestion];
  questionElement.textContent = question;
  choicesElement.innerHTML = "";

  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    choicesElement.appendChild(button);
    button.innerText = choice;

    button.addEventListener("click", () => selectChoice(index));
  });
}

function submitAnswer() {
  const selectedButton = document.querySelector(".select");
  if (!selectedButton) return;

  const selectedIndex = [...choicesElement.children].indexOf(selectedButton);

  if (selectedIndex === quizData[currentQuestion].correctAnswer) {
    score++;
  } else {
    wrongAnswers.push({
      question: quizData[currentQuestion].question,
      userAnswer: quizData[currentQuestion].choices[selectedIndex],
      correctAnswer: quizData[currentQuestion].choices[quizData[currentQuestion].correctAnswer],
    });
  }
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.style.display = "none";
  submitButtonElement.style.display = "none";

  let resultHTML = `
  <p class='score'>You score ${Math.round((score * 100) / quizData.length)}% (${score} out of ${quizData.length})</p>
  `;

  if (wrongAnswers.length > 0) {
    resultHTML += "<h3>Wrong Answers:</h3>";
    resultHTML += "<ul>";

    wrongAnswers.forEach((answer) => {
      resultHTML += `
      <li>
        <p>Question ${answer.question}</p>
        <p class='answers'>Your Answer: <span id='right'>${answer.userAnswer}</span></p>
        <p class='answers'>Correct Answer: <span id='wrong'>${answer.correctAnswer}</span></p>
      </li>
      `;
    });
    resultHTML += "</ul>";
  }

  resultElement.innerHTML = resultHTML;
}

function selectChoice(index) {
  [...choicesElement.children].forEach((button) => {
    button.classList.remove("select");
  });
  choicesElement.children[index].classList.add("select");
}

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    mainContainerElement.style.paddingTop = "5rem";
    startElement.style.display = "none";

    setTimeout(() => {
      loadQuestion();
      submitButtonElement.style.display = "initial";

      submitButtonElement.addEventListener("click", submitAnswer);
    }, "1000");
  }
});
