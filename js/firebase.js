import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getDatabase, ref, set, child, get, onValue } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyC2EwA4h1cwnML5IWFC19dpsPNlarOQ7EQ",
    authDomain: "ipomedt3-groep15.firebaseapp.com",  
    databaseURL: "https://ipomedt3-groep15-default-rtdb.europe-west1.firebasedatabase.app",  
    projectId: "ipomedt3-groep15",  
    storageBucket: "ipomedt3-groep15.appspot.com",  
    messagingSenderId: "460998493030",  
    appId: "1:460998493030:web:ab156388a44dac03d97ea7",  
    measurementId: "G-BQZC42JY7V"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());

const answerButtons = document.getElementsByClassName("answer-button");
const playerName = document.getElementById("js--name");

let userId;

window.onload = (event) => {
  get(child(dbRef, 'players')).then((snapshot) => {
    if (snapshot.exists()) {
      insertUser(snapshot.val().length);
    } else {
      createUserIndex();
    }
  }).catch((error) => {
    console.error(error);
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
};


function createUserIndex(){
  set(ref(db, '/'), {
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
  const test = ref(db, 'currentQuestion');
  onValue(test, (snapshot) => {
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
