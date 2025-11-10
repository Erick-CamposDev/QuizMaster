# 🧠 QuizMaster

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)
![Mobile First](https://img.shields.io/badge/MOBILE%20FIRST-25A162?style=for-the-badge&logo=android&logoColor=white)
![Responsive](https://img.shields.io/badge/RESPONSIVO-007ACC?style=for-the-badge&logo=responsive-design&logoColor=white)

Quiz Master é projeto web de mm **quiz interativo** desenvolvido com **HTML, CSS, JavaScript e JSON**, voltado para estudantes do **Ensino Médio**.  
O objetivo é testar conhecimentos em diversas matérias, oferecendo uma experiência dinâmica e visualmente agradável, totalmente responsiva e otimizada para **dispositivos móveis (Mobile First)**.

---

## 🚀 Funcionalidades

- 📚 **Todas as matérias do ensino médio** — cada matéria contém **10 perguntas exclusivas**.
- 🔄 **Carregamento dinâmico de perguntas** — o projeto utiliza **fetch()** para buscar as perguntas a partir de um **arquivo JSON local**.
- 💯 **Sistema de pontuação automática** — o quiz calcula o desempenho do usuário com base nas respostas corretas.
- 😀 **Feedback interativo** — ao final do quiz, o resultado é exibido com **emojis da OpenMoji**, indicando se o usuário foi bem ou precisa estudar mais.
- 📱 **Design Mobile First** — interface adaptada para celulares.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia            | Função                                     |
| --------------------- | ------------------------------------------ |
| **HTML5**             | Estrutura base do projeto                  |
| **CSS3**              | Estilização e responsividade               |
| **JavaScript (ES6+)** | Lógica e interatividade                    |
| **JSON**              | Armazenamento das perguntas e alternativas |

---

## 🖼️ Demonstrações do Projeto

### 🔗 Deploy

Acesse o projeto online:  
👉 [**Quiz Interativo - Acessar Aqui**](https://link-do-deploy-placeholder.com)

---

### 📸 Prévia do Projeto

TELA INICIAL:
![Tela Inicial](/src/assets/imgs/project-imgs/tela-inicial-quiz.jpg)

PERGUNTA EM EXECUÇÃO:
![Pergunta](/src/assets/imgs/project-imgs/quizmaster.jpg)

RESULTADO FINAL:
![Resultado](/src/assets/imgs/project-imgs/score-quiz.jpg)

---

## 🧠 Lógica do Projeto

O **quiz** realiza um `fetch()` para o arquivo `questions.json`, que contém todas as perguntas organizadas por matéria.  
As perguntas são carregadas dinamicamente conforme a matéria escolhida e exibidas uma a uma.  
Ao final, a pontuação é calculada e o sistema exibe uma mensagem com **emojis da OpenMoji** correspondentes ao desempenho do jogador.

---

## 🎨 Experiência e Design

O layout foi desenvolvido com **princípios de UX simples e diretos**, garantindo:

- Foco total nas perguntas e respostas.
- Ícones e cores que reforçam o feedback visual.
- Interface fluida com **media queries** para adaptação em qualquer tela.

---

## 🧩 Próximas Melhorias

- ⏱️ Adicionar temporizador para cada pergunta.
- 🔥 Adicionar modos fácil, médio e díficil para selecionar.

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais.  
Desenvolvido com por Erick Campos.
