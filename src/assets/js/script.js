const select = document.getElementById("selectContent");
const startBtn = document.getElementById("startBtn");
const msgContainer = document.querySelector(".msg");
const modalLoading = document.querySelector(".modal-bg");

const startQuizContainer = document.querySelector(".start-quiz-container");
const quiz = document.querySelector(".quiz-container");
const scoreContainer = document.querySelector(".score-container");

const question = document.querySelector(".question");

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
        fillQuestions(data);
      }
    } catch (error) {
      showErrorMsg("ERRO: Não foi possivel carregar o quiz", msgContainer);
      modalLoading.style.display = "none";
    }
  }
}

const letters = ["A", "B", "C", "D"];

async function fillQuestions(data) {
  startQuizContainer.style.display = "none";
  quiz.style.display = "flex";

  try {
  } catch (error) {}
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
