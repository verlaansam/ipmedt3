window.onload = (event) =>{
    var places = document.getElementsByClassName("js--place")

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


    for (let i = 0; i < places.length; i++) {
        console.log(places[i])
        places[i].addEventListener('click', function(evt){
            console.log(places[i])
            let att = document.createAttribute("animation");
            att.value = "property: position; easing: linear; dur: 2000; to: " + this.getAttribute('position').x + " 1.6 " + this.getAttribute('position').z;
            camera.setAttribute('animation', att.value);
        });
    }
    
}