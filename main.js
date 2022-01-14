window.onload = (event) =>{
  let lost = false;
  var x;
  let point = 0;
  var score = document.getElementById("score")

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
    //timespend functie?
  }

  
  
/*a-frame components*/

  //gives point when you move block away
  AFRAME.registerComponent('point', {
    init: function() {
      var el = this.el;
      el.addEventListener("collidestart", function () {
        point += 1;
        console.log(point)
        score.innerHTML = point
        //blocks hit function
      });
    }
  });
  


//takes care of everything
setInterval(randomSequence, 2000);
setInterval(pointsTime, 500)
}

//when protected block is hit
AFRAME.registerComponent('gameover', {
  init: function() {
    var el = this.el;
    el.addEventListener("collidestart", function () {
      console.log("GameOver")
      gameOver()
    });
  }
});

function gameOver(){
  console.log("GameOver")
  spawnBox(0, 0, -3, 3, 1, 1, "red", "#camera")
}

//when you touch quiz block
AFRAME.registerComponent('quiz', {
  init: function() {
    var el = this.el;
    el.addEventListener("collidestart", function () {
      console.log("quiz")
      //quizblocks hit function
    });
  }
});

  