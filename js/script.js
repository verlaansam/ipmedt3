const startBtn = document.querySelector('.startCloud');
const backBtn = document.querySelector('.backCloud');

const joinBtn = document.querySelector('.joinCloud');
const makeBtn = document.querySelector('.makeCloud');
const back2btn = document.querySelector('.back2Cloud');

const questBtn = document.querySelector('.questionCloud');

if(document.body.contains(startBtn)){
    startBtn.addEventListener("click", () => {
        window.location.href = 'menuPage.html';
    });
}

if (document.body.contains(backBtn)){
    backBtn.addEventListener("click", () => {
        window.history.back();
    });
}

if(document.body.contains(joinBtn)){
    joinBtn.addEventListener('click', () => {
        window.location.href = 'joinPage.html';
    })
}

if(document.body.contains(makeBtn)){
    makeBtn.addEventListener('click', () =>{
        window.location.href = 'makePage.html';
    })
}

if(document.body.contains(questBtn)){
    questBtn.addEventListener("click", () => {
        window.location.href = 'QuestionPage.html';
    });
}

