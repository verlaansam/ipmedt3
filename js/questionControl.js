const questionText = document.getElementById("js--question");
const answerTextA = document.getElementById("js--answerA");
const answerTextB = document.getElementById("js--answerB");
const answerTextC = document.getElementById("js--answerC");
const answerTextD = document.getElementById("js--answerD");

const answerContainer = document.getElementById("js--answerContainer");
const resultContainer = document.getElementById("js--questionContainerResult");

const questionAnswer = document.getElementById("js--questionAnswer");
const questionAnswerText = document.getElementById("js--questionAnswerText");
const resultColorBox = document.getElementById("js--resultColorBox");
const nextQuestionButton = document.getElementById("js--nextQuestion");

const scoreText = document.getElementById("js--score");

let score = 0;
let questionIndex = 0;
let questionData;

fetch("questions.json")
  .then(response => response.json())
  .then((data) => {
    questionData = data;  
    showQuestions();
})
.catch(err => { throw err });


function showQuestions() {
  scoreText.innerHTML = "Score: " + score;
  answerContainer.style.display = "grid";
  resultContainer.style.display = "none"
  questionText.innerHTML = questionData[questionIndex]["question"];
  answerTextA.innerHTML = questionData[questionIndex]["choices"]["answerA"];
  answerTextB.innerHTML = questionData[questionIndex]["choices"]["answerB"];
  answerTextC.innerHTML = questionData[questionIndex]["choices"]["answerC"];
  answerTextD.innerHTML = questionData[questionIndex ]["choices"]["answerD"];
}


function checkAnswer(givenAnswer) {
  nextQuestionButton.innerHTML = "Volgende vraag";
  answerContainer.style.display = "none";
  resultContainer.style.display = "block"

  questionAnswer.innerHTML = questionData[questionIndex]["answerText"]

  if(givenAnswer == questionData[questionIndex]["answer"]){
    score += 80;
    scoreText.innerHTML = "Score: " + score;
    resultColorBox.style.background = "#96CEB4";
    questionAnswerText.innerHTML = "Goed gedaan! Je score is nu " + score + "!";
    return true;
  } else {
    resultColorBox.style.background = "#D9534F";
    questionAnswerText.innerHTML = "Volgende keer beter. Je score blijft " + score;
    return false;
  }
}


function nextQuestion(){
  questionIndex ++;
  if(questionIndex < Object.keys(questionData).length){
    showQuestions();
  } else if(questionIndex > Object.keys(questionData).length){
    resetGame();
  } else {
    answerContainer.style.display = "none";
    questionText.innerHTML = "Einde Quiz"
    nextQuestionButton.innerHTML = "Start de quiz opnieuw";
    resultColorBox.style.background = "#EF2F88";
    questionAnswer.innerHTML = "Je hebt alle vragen beantwoord!"
    questionAnswerText.innerHTML = "<b>Score:<b> <br>"  + score;
  }
}

function getQuestionIndex(){
  return questionIndex;
}

function resetGame(){
  score = 0;
  questionIndex = 0;
  showQuestions();
}


window.addEventListener('beforeunload', event => {
  event.returnValue = "Weet je zeker dat je de pagina wilt verlaten?";
});