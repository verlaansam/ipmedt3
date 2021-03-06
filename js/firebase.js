import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getDatabase, ref, set, child, get, onValue, update } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyCGiugHZwjbSM4ByAi1JhsYjuv8QQD6Xpk",
  authDomain: "ipmedt3-15.firebaseapp.com",
  databaseURL: "https://ipmedt3-15-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ipmedt3-15",
  storageBucket: "ipmedt3-15.appspot.com",
  messagingSenderId: "826692783774",
  appId: "1:826692783774:web:fa6e0f0311422e3b68358f",
  measurementId: "G-S9L6B259YV"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());
const currentScore = ref(db, 'questionScore');
const gameState = ref(db, 'currentQuestion');

const answerButtons = document.getElementsByClassName("answer-button");
const playerName = document.getElementById("js--player");
const scoreText = document.getElementById("js--score");

let userId;


let url = window.location.href;
if(url.includes("quiz")) {
  get(child(dbRef, 'players')).then((snapshot) => {
    if (snapshot.exists()) {
      insertUser(snapshot.val().length);
    } else {
      setUpDatabase();
    }
  }).catch((error) => {
    console.error(error);
    showAlert("Er kan geen verbinding gemaakt worden. Herlaad de pagina of check je internet verbinding");
  });
  
  for(let i = 0; i < answerButtons.length; i++){
    answerButtons[i].addEventListener("click", function(event){
      let givenAnswer = answerButtons[i].getAttribute('answer');
      get(child(dbRef, 'currentQuestion/')).then((snapshot) => {
        if(checkAnswer(givenAnswer, snapshot.val())){
          console.log("Goed gedaan!")
          insertAnswer(true);
        } else {
          console.log("Sukkel!")
          insertAnswer(false);
        }
      });
    })
  }

  
  onValue(currentScore, (snapshot) => {
    get(child(dbRef, 'questionScore/')).then((snapshot) => {
      scoreText.innerHTML = "Score: " + snapshot.val();
      if(snapshot.val() == null){
        location.reload(); 
      }
      if(document.getElementById("js--quizScore") != null) {
        document.getElementById("js--quizScore").innerHTML = "QuizScore: " + snapshot.val();
      }
    });
  })
}

if(document.getElementById("js--quizScore") != null) {
  const quizScore = document.getElementById("js--quizScore");
  set(ref(db, '/'), {});
  onValue(currentScore, (snapshot) => {
    get(child(dbRef, 'questionScore/')).then((snapshot) => {
      if(snapshot.val() == null){
        quizScore.innerHTML = "Er zijn geen Quizers";
      } else {
        quizScore.innerHTML = "QuizScore: " + snapshot.val();
      }
    });
  })
}

function setUpDatabase(){
  set(ref(db, '/'), {
    questionScore: 0,
    currentQuestion: 'empty',
    players: {
      1: {
        questions: {
          0: 'empty'
        }
      }
    }
  });
  userId = 1;
  setPlayer();
}

function insertUser(id){
  userId = id;
  set(ref(db, 'players/' + userId), {
    questions: {
      0: 'empty'
    }
  });
  setPlayer();
}

function setPlayer(){
  playerName.innerHTML = "Player: " + userId;
  const currentQuestionIndex = ref(db, 'currentQuestion');
  onValue(currentQuestionIndex, (snapshot) => {
    get(child(dbRef, 'currentQuestion/')).then((snapshot) => {
       if(snapshot.val() != "empty"){
        nextQuestion(snapshot.val());
       }
    });
  })
}

function insertAnswer(answer){
  get(child(dbRef, 'currentQuestion/')).then((snapshot) => {
    if(snapshot.val() == 0){
      set(ref(db, 'players/' + userId + '/questions/' + snapshot.val()), {
        answer: answer
      });
    } else {
      set(ref(db, 'players/' + userId + '/questions/' + snapshot.val() + '/' ), {
        answer: answer
      });
    }
  });
}

function showAlert(text){
  alert(text);
}

function calculateAnswer(index){
  let answersTrue = 0;
  let answersFalse = 0;
  get(child(dbRef, '/players')).then((snapshot) => {
    for(let i = 1; i < snapshot.val().length; i++){
      console.log(snapshot.val()[i].questions[index].answer);
      if(snapshot.val()[i].questions[index].answer){
        answersTrue++;
      } else {
        answersFalse++;
      }
    }

    if(answersTrue >= answersFalse){
      get(child(dbRef, 'questionScore/')).then((snapshot) => {
        console.log(snapshot.val() + 80);
        update(ref(db, '/'), {
          questionScore: Number(snapshot.val() + 80)
        });
      });
    } else {
      console.log("Ze hebben het fout");
    } 
  });
}

window.loadQuestion = function () {
  get(child(dbRef, 'currentQuestion/')).then((snapshot) => {
    if(snapshot.val() != null){
      if(snapshot.val() == "empty"){
        update(ref(db, '/'), {
          currentQuestion: 0
        });
      } else {
        calculateAnswer(snapshot.val());
        update(ref(db, '/'), {
          currentQuestion: Number(snapshot.val() + 1)
        });
      }
    } 
  });
}

window.showEndScore = function () {
  const endScore = document.getElementById("js--endQuizScore");
  let gameScore = localStorage.getItem('points');
  get(child(dbRef, 'questionScore/')).then((snapshot) => {
    let totalScore = Number(snapshot.val() + Number(gameScore));
    console.log(totalScore);
    endScore.setAttribute("text", `value: ` + totalScore + `; color:white;`)
  });
  update(ref(db, '/'), {
    currentQuestion: "Game Over"
  });
}