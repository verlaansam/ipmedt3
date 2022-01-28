const startBtn = document.querySelector('.startCloud');
const backBtn = document.querySelector('.backCloud');
const questBtn = document.querySelector('.questionCloud');

/*const joinBtn = document.querySelector('.joinCloud');
const makeBtn = document.querySelector('.makeCloud');*/

const join2Btn = document.querySelector('.join2Cloud');

if(document.body.contains(startBtn)){
    startBtn.addEventListener("click", () => {
        window.location.href = 'joinPage.html';
    });
}

if (document.body.contains(backBtn)){
    backBtn.addEventListener("click", () => {
        window.history.back();
    });
}

if(document.body.contains(questBtn)){
    questBtn.addEventListener("click", () => {
        window.location.href = 'QuestionPage.html';
    });
}

if (document.body.contains(join2Btn)){
    join2Btn.addEventListener('click', ()=>{
        window.location.href = 'room.html';
    });
}

/*if(document.body.contains(joinBtn)){
    joinBtn.addEventListener('click', () => {
        window.location.href = 'joinPage.html';
    })
}

if(document.body.contains(makeBtn)){
    makeBtn.addEventListener('click', () =>{
        window.location.href = 'makePage.html';
    })
}


*/

