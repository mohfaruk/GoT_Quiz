//Variables with stored DOM elements
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

//Stores questions to be displayed to DOM
//Stores answers to be displayed as well as wrong/correct answer
const questions = [
  {
    question: "In the very first episode, who pushed Bran out of a window?",
    answers: [
      { text: "Cersei", correct: false },
      { text: "Tyrion", correct: false },
      { text: "Jaime", correct: true },
      { text: "None of the above - He fell!", correct: false },
    ],
  },
  {
    question:
      "What name was given to the infamous wedding in which Robb Stark, his wife and mother are all murdered?",
    answers: [
      { text: "Black Supper", correct: false },
      { text: "Red Festival", correct: false },
      { text: "Bloody Wedding", correct: false },
      { text: "Red Wedding", correct: true },
    ],
  },
  {
    question: "Who had his eyes gouged out and face crushed by The Mountain?",
    answers: [
      { text: "Oberyn Martell", correct: true },
      { text: "Bronn", correct: false },
      { text: "Robb Stark", correct: false },
      { text: "The Hound", correct: false },
    ],
  },
  {
    question: "Name the military order which holds and guards the Wall?",
    answers: [
      { text: "House Stark", correct: false },
      { text: "Ironborn", correct: false },
      { text: "The Wildlings", correct: false },
      { text: "The Night's Watch", correct: true },
    ],
  },
  {
    question: "Name the stronghold and ancestral seat of House Lannister?",
    answers: [
      { text: "Winterfell", correct: false },
      { text: "Casterly Rock", correct: true },
      { text: "Highgarden", correct: false },
      { text: "Storm's End", correct: false },
    ],
  },
];

//Button elements execute functions when clicked
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide"); //Hides start button
  shuffledQuestions = questions.sort(() => Math.random() - 0.5); //Randomly selects qustion from questions object
  currentQuestionIndex = 0; //Sets undefined variable to 0
  questionContainerElement.classList.remove("hide"); //Displays answers
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]); //Invokes function with random question as parameter
}

function showQuestion(question) {
  questionElement.innerText = question.question; //Stores quetsion div with question object property
  question.answers.forEach(answer => {
    //Each answer object property has a function invoked for it
    const button = document.createElement("button"); //Creates button for each answer
    button.innerText = answer.text; //Displays answer text within each button
    button.classList.add("btn"); //Adds style to each button
    if (answer.correct) {
      button.dataset.correct = answer.correct; //If user chooses correct answer then add correct to answer attribute
    }
    button.addEventListener("click", selectAnswer); //Adds event listener for each button
    answerButtonsElement.appendChild(button); //Appends answers to answer-buttons div
  });
}

//Resets all elements to default state
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide"); //Hide next button
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

//When user selcts answer
function selectAnswer(e) {
  const selectedButton = e.target; //Stores parameter element into variable
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  //Converts each button to array
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

//Adds correct or wrong styles to answer
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

//Removes correct & wrong styles from answers
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
