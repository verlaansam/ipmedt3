window.onload = (event) =>{
    var finalscore = document.getElementById("FinalScore")
    var score = localStorage.getItem('points')
    finalscore.innerHTML = score

    var finaltime = document.getElementById("FinalTime")
    var time = localStorage.getItem('time')
    finaltime.innerHTML = time

    var finalquiz = document.getElementById("FinalQuiz")
    var quiz = localStorage.getItem('quiz')
    finalquiz.innerHTML = quiz
}