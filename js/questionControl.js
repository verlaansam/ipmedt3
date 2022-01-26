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

const scoreText = document.getElementById("js--score");

let score = 0;
let questionIndex;
let questionData;

fetch("questions.json")
  .then(response => response.json())
  .then((data) => {
    questionData = data;  
    gameSet();
})
.catch(err => { throw err });

function gameSet(){
  questionText.innerHTML = "Sta klaar, de eerste vraag komt zo!"
}

function checkAnswer(givenAnswer, questionIndex) {
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


function nextQuestion(questionIndex){
  console.log(questionIndex);
  if(questionIndex < Object.keys(questionData).length){
    scoreText.innerHTML = "Score: " + score;
    answerContainer.style.display = "grid";
    resultContainer.style.display = "none"
    questionText.innerHTML = questionData[questionIndex]["question"];
    answerTextA.innerHTML = questionData[questionIndex]["choices"]["answerA"];
    answerTextB.innerHTML = questionData[questionIndex]["choices"]["answerB"];
    answerTextC.innerHTML = questionData[questionIndex]["choices"]["answerC"];
    answerTextD.innerHTML = questionData[questionIndex ]["choices"]["answerD"];
  } else if(questionIndex > Object.keys(questionData).length){
    console.log("reset");
  } else {
    answerContainer.style.display = "none";
    questionText.innerHTML = "Einde Quiz"
    resultColorBox.style.background = "#EF2F88";
    questionAnswer.innerHTML = "Je hebt alle vragen beantwoord!"
    questionAnswerText.innerHTML = "<b>Score:<b> <br>"  + score;
  }
}

function change(){
  console.log('JAAAA yessss het werkt denk ik!!!');
}





// window.addEventListener('beforeunload', event => {
//   event.returnValue = "Weet je zeker dat je de pagina wilt verlaten?";
// });