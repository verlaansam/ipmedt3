window.onload = (event) =>{
  let point = 0;
  let question = 0;
  let time = 0;
  var score = document.getElementById("score")
  var quiz = document.getElementById("quiz")

  //spawns regular blocks
  function spawnBox(x, y, z, w, h, d, c, s){
    var box = document.createElement("a-box")
    box.setAttribute("point", "null")
    box.setAttribute("geometry","primitive: box")
    box.setAttribute("ammo-body", "type: dynamic; emitCollisionEvents: true;")
    box.setAttribute("ammo-shape", "type: box")
    box.setAttribute("width", `${w}`)
    box.setAttribute("height", `${h}`)
    box.setAttribute("depth", `${d}`)
    box.setAttribute("position", `${x} ${y} ${z}`)
    box.setAttribute("color", `${c}`)
    document.querySelector(`${s}`).appendChild(box)
  }

  //spawns special quiz block
  function spawnBoxQuiz(x, y, z, w, h, d, c, s){
    var box = document.createElement("a-box")
    box.setAttribute("quiz", "null")
    box.setAttribute("geometry","primitive: box")
    box.setAttribute("ammo-body", "type: dynamic; emitCollisionEvents: true;")
    box.setAttribute("ammo-shape", "type: box")
    box.setAttribute("width", `${w}`)
    box.setAttribute("height", `${h}`)
    box.setAttribute("depth", `${d}`)
    box.setAttribute("position", `${x} ${y} ${z}`)
    box.setAttribute("color", `${c}`)
    document.querySelector(`${s}`).appendChild(box)
  }

  //choses random spwan patern to spawn blocks in
  function randomSequence(){
    i = Math.floor(Math.random() * 5);
    switch(i){
      case 0:
        j = Math.floor(Math.random() * 8);
        spawnBoxQuiz(j, 90, 5, 1, 1, 2, "orange", "a-scene")
        break;
      case 1:
        spawnBox(0, 90, 5, 1, 1, 2, "green", "a-scene")
        spawnBox(3, 90, 5, 1, 1, 2, "green", "a-scene")
        spawnBox(6, 90, 5, 1, 1, 2, "green", "a-scene")
        break;
      case 2:
        spawnBox(1, 90, 5, 1, 1, 2, "green", "a-scene")
        spawnBox(4, 90, 5, 1, 1, 2, "green", "a-scene")
        spawnBox(7, 90, 5, 1, 1, 2, "green", "a-scene")
        break;
      case 3:
        j = Math.floor(Math.random() * 8);
        spawnBox(j, 90, 5, 1, 1, 2, "green", "a-scene");
        break;
      case 4:
        j = Math.floor(Math.random() * 6) + 2;
        spawnBox(j, 90, 5, 1, 1, 2, "green", "a-scene")
        spawnBox(j+2, 90, 5, 1, 1, 2, "green", "a-scene")
        break;
    }
  }

  //adds poiny every half second
  function pointsTime(){
    point +=1
    score.innerHTML = point
    time += 0.5
    console.log(time)
    localStorage.setItem('time', time)
  }

  //TODO api calls node.js

  //takes care of everything
  setInterval(randomSequence, 2000);
  setInterval(pointsTime, 500)

  /*a-frame components*/
  //gives point when you move block away
  AFRAME.registerComponent('point', {
    init: function() {
      var el = this.el;
      el.addEventListener("collidestart", function () {
        point += 1;
        console.log(point)
        score.innerHTML = point
        localStorage.setItem('points', point)
        //blocks hit function
      });
    }
  });

  //when you touch quiz block
  AFRAME.registerComponent('quiz', {
    init: function() {
      var el = this.el;
      el.addEventListener("collidestart", function () {
        question += 1;
        console.log(question)
        quiz.innerHTML = question
        localStorage.setItem('quiz', question)
      });
    }
  });
} //end window.onload

//when protected block is hit
AFRAME.registerComponent('gameover', {
  init: function() {
    var el = this.el;
    el.addEventListener("collidestart", function () {
      console.log("GameOver")
      window.location.href = "gameover.html";
    });
  }
});



  