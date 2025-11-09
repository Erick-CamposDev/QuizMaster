const select = document.getElementById("selectContent");
const startBtn = document.getElementById("startBtn");
const msgContainer = document.querySelector(".msg");
const modalLoading = document.querySelector(".modal-bg");

const startQuizContainer = document.querySelector(".start-quiz-container");
const quiz = document.querySelector(".quiz-container");
const scoreContainer = document.querySelector(".score-container");

const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers-container");
const nextButton = document.getElementById("nextQuestionBtn");

const congratulations = document.querySelector(".congratulations");
const emojiContainer = document.querySelector(".emoji-container");
const scoreMark = document.querySelector(".score-mark");

let index = 0;
let score = 0;
let answered = false;
let selectedBtn = null;
let correctAnswer = null;

const emojis = [
  {
    minScore: 0,
    img: "src/assets/imgs/icons/x-mark.svg",
    alt: "Imagem de uma marcação de X",
  },
  {
    minScore: 1,
    img: "src/assets/imgs/icons/crying.svg",
    alt: "Imagem de um emoji chorando",
  },
  {
    minScore: 2,
    img: "src/assets/imgs/icons/sad.svg",
    alt: "Imagem de um emoji triste",
  },
  {
    minScore: 3,
    img: "src/assets/imgs/icons/neutral-face.svg",
    alt: "Imagem de um emoji com expressão neutra",
  },
  {
    minScore: 4,
    img: "src/assets/imgs/icons/confused.svg",
    alt: "Imagem de um emoji confuso",
  },
  {
    minScore: 5,
    img: "src/assets/imgs/icons/smiling.svg",
    alt: "Imagem de um emoji sorrindo",
  },
  {
    minScore: 6,
    img: "src/assets/imgs/icons/sunglasses.svg",
    alt: "Imagem de um emoji com óculos escuros",
  },
  {
    minScore: 7,
    img: "src/assets/imgs/icons/star-eyed.svg",
    alt: "Imagem de um emoji com os olhos estrelados",
  },
  {
    minScore: 8,
    img: "src/assets/imgs/icons/bronze-medal.svg",
    alt: "Imagem de um emoji de medalha de bronze",
  },
  {
    minScore: 9,
    img: "src/assets/imgs/icons/silver-medal.svg",
    alt: "Imagem de um emoji de medalha de prata",
  },
  {
    minScore: 10,
    img: "src/assets/imgs/icons/crown.svg",
    alt: "Imagem de um emoji de coroa",
  },
];

async function startQuiz() {
  index = 0;
  score = 0;
  nextButton.disabled = false;

  resetToDefault(msgContainer);

  if (select.value === "") {
    showErrorMsg("ERRO: Matéria não selecionada!", msgContainer);
    return;
  } else {
    loadingQuiz();

    try {
      const response = await fetch("src/assets/data/questions.json");
      const data = await response.json();

      modalLoading.style.display = "none";

      if (response.ok) {
        const subjects = Object.keys(data.materias);
        const chosenSubject = subjects.find(
          (subject) => select.value === subject
        );

        if (chosenSubject) {
          fillQuestions(data, chosenSubject);
        }
      }
    } catch (error) {
      showErrorMsg("ERRO: Não foi possivel carregar o quiz", msgContainer);
      modalLoading.style.display = "none";
    }
  }
}

const letters = ["A", "B", "C", "D"];

async function fillQuestions(data, subject) {
  answersContainer.innerHTML = "";

  startQuizContainer.style.display = "none";
  quiz.style.display = "flex";

  try {
    question.innerHTML = `<h2>${data.materias[subject].perguntas[0].id}. ${data.materias[subject].perguntas[0].pergunta}</h2>`;

    const alternatives = data.materias[subject].perguntas[0].alternativas;

    const ul = document.createElement("ul");
    ul.classList.add("answers-list");
    answersContainer.appendChild(ul);

    alternatives.forEach((alt, i) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const button = document.createElement("button");

      li.classList.add("answer");
      button.classList.add("answer-button");

      button.textContent = `${alt}`;
      span.textContent = `${letters[i]}`;

      li.appendChild(span);
      li.appendChild(button);

      ul.appendChild(li);
    });

    const answerButtons = answersContainer.querySelectorAll(".answer-button");
    correctAnswer = data.materias[subject].perguntas[0].correta;

    answerButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        answerButtons.forEach((b) => {
          if (b === btn) {
            b.classList.add("active");
          } else {
            b.classList.remove("active");
          }
        });
      });
    });

    answerButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        nextButton.style.display = "flex";

        if (answered) {
          return;
        }

        selectedBtn = btn;
      });
    });

    nextButton.onclick = () => {
      const userChoice = selectedBtn.textContent;

      answerButtons.forEach((btn) => {
        btn.disabled = true;
      });

      nextButton.disabled = true;

      if (userChoice === correctAnswer) {
        selectedBtn.classList.remove("active");
        selectedBtn.classList.add("correct");
        increaseScore();
      } else {
        selectedBtn.classList.remove("active");
        selectedBtn.classList.add("wrong");

        answerButtons.forEach((btn) => {
          if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
          }
        });
      }

      setTimeout(() => {
        showNextQuestion(data, subject);
      }, 2000);
    };

    nextButton.style.display = "none";
  } catch (error) {
    alert("ERRO AO CARREGAR AS PERGUNTAS! REDIRECIONANDO A PÁGINA INICIAL");
    quiz.style.display = "none";
    startQuizContainer.style.display = "flex";
  }
}

function showNextQuestion(data, subject) {
  nextButton.style.display = "none";
  answered = false;
  selectedBtn = null;

  if (index >= data.materias[subject].perguntas.length - 1) {
    quiz.style.display = "none";
    scoreContainer.style.display = "flex";
    updateScoreContainer();
    return;
  }

  index++;

  const currentQuestion = data.materias[subject].perguntas[index];
  const alternatives = data.materias[subject].perguntas[index].alternativas;
  correctAnswer = currentQuestion.correta;

  question.innerHTML = `<h2>${currentQuestion.id}. ${currentQuestion.pergunta}</h2>`;

  const buttons = document.querySelectorAll(".answer-button");

  nextButton.disabled = false;

  buttons.forEach((btn, i) => {
    btn.innerText = `${alternatives[i]}`;
    btn.classList.remove("active", "wrong", "correct");
    btn.disabled = false;
  });
}

function increaseScore() {
  score++;
}

function updateScoreContainer() {
  emojiContainer.innerHTML = "";

  let congratulationsMsg = "";
  let msg = "";

  if (score < 1) {
    msg = "Não fique decepcionado! Estude mais!";
  } else if (score < 3) {
    msg = "Continue treinando mais!";
  } else if (score < 5) {
    congratulationsMsg = "Puxa!";
    msg = "Você está melhorando!";
  } else if (score <= 7) {
    congratulationsMsg = "Boa!";
    msg = "Bom demais! Continue assim!";
  } else if (score <= 9) {
    congratulationsMsg = "Parabéns";
    msg = "Você foi muito bem! Que incrível!";
  } else {
    congratulationsMsg = "ESPETACULAR!";
    msg = "Você é de fato o REI DO QUIZ!";
  }

  let image = document.createElement("img");

  for (let i = 0; i < emojis.length; i++) {
    const emoji = emojis[i];

    if (score === emoji.minScore) {
      image.src = emoji.img;
      image.alt = emoji.alt;
      break;
    }
  }

  congratulations.innerHTML = `<h2>${congratulationsMsg}</h2>`;
  emojiContainer.appendChild(image);
  scoreMark.innerHTML = `<p>Você acertou <span class="mark">${score}/10</span> questões do quiz!<p>
                         <p>${msg}</p>`;

  const mark = scoreMark.querySelector(".mark");

  if (score <= 4) {
    mark.style.color = "#ff0000";
  } else if (score <= 6) {
    mark.style.color = "#e0b700ff";
  } else {
    mark.style.color = "#007a00ff";
  }
}

function exit() {
  scoreContainer.style.display = "none";
  startQuizContainer.style.display = "flex";

  select.value = "";
}

function showErrorMsg(msg, element) {
  element.innerHTML = `<p>${msg}</p>`;
  element.style.color = "#ff0000";
}

function resetToDefault(element) {
  element.innerHTML = "";
  element.style.color = "";
}

function loadingQuiz() {
  modalLoading.style.display = "flex";
}
