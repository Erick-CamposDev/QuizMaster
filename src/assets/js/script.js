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

async function startQuiz() {
  resetToDefault(msgContainer);

  if (select.value === "") {
    showErrorMsg("ERRO: Matéria não selecionada!", msgContainer);
    return;
  } else {
    loadingQuiz();

    try {
      const response = await fetch("src/assets/data/questions.json");
      const data = await response.json();

      console.log(data);
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
      });
    });

    nextButton.addEventListener("click", () => {
      showNextQuestion(data, subject);
    });

    nextButton.style.display = "none";
  } catch (error) {
    alert("ERRO AO CARREGAR AS PERGUNTAS! REDIRECIONANDO A PÁGINA INICIAL");
    quiz.style.display = "none";
    startQuizContainer.style.display = "flex";
  }
}

let index = 0;
let answered = false;

function showNextQuestion(data, subject) {
  if (index >= data.materias[subject].perguntas.length) {
    quiz.style.display = "none";
    scoreContainer.style.display = "flex";
    return;
  }

  index++;

  const currentQuestion = data.materias[subject].perguntas[index];
  const alternatives = data.materias[subject].perguntas[index].alternativas;

  question.innerHTML = `<h2>${currentQuestion.id}. ${currentQuestion.pergunta}</h2>`;

  const buttons = document.querySelectorAll(".answer-button");

  buttons.forEach((btn, i) => {
    btn.innerText = `${alternatives[i]}`;
  });
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
