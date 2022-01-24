window.onload = (event) =>{
    var menu = document.getElementsByClassName("js--menu")
    var restart = document.getElementsByClassName("js--restart")
    var camera = document.getElementById("js--camera")
    var cursor = document.getElementById("js--cursor")
    console.log(restart)
    console.log(camera)

    var score = localStorage.getItem('points')
    var textScore = document.createElement("a-entity")
    textScore.setAttribute("scale","5 5 5")
    textScore.setAttribute("position", "2.5 0 -4")
    textScore.setAttribute("text", `value: ${score}; color:white;`)
    document.querySelector("a-scene").appendChild(textScore)

    var time = localStorage.getItem('time')
    var textTime = document.createElement("a-entity")
    textTime.setAttribute("scale","5 5 5")
    textTime.setAttribute("position", "0 0 -4")
    textTime.setAttribute("text", `value: ${time}; color:white;`)
    document.querySelector("a-scene").appendChild(textTime)

    var quiz = localStorage.getItem('quiz')
    var textQuiz = document.createElement("a-entity")
    textQuiz.setAttribute("scale","5 5 5")
    textQuiz.setAttribute("position", "4.8 -0.2 -4")
    textQuiz.setAttribute("text", `value: ${quiz}; color:white;`)
    document.querySelector("a-scene").appendChild(textQuiz)


    restart[0].addEventListener('click', function(evt){
        console.log("click")
        location.href = "game.html"
    });

    menu[0].addEventListener('click', function(evt){
        console.log("click")
        location.href = "index.html"
    });
    
}