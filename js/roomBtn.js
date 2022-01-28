window.onload = () =>{
    const camera = document.getElementById("js--camera");
    const QuizBtn = document.getElementsByClassName("js-startQuizBtn");
    const VRBtn = document.getElementsByClassName("js-startVRBtn");

    QuizBtn[0].addEventListener('click', function(evt){
        console.log("Quizbtn")
        location.href = "quiz.html"
    });

    VRBtn[0].addEventListener('click', function(evt){
        console.log("VRbtn")
        location.href = "game.html"
    });

};