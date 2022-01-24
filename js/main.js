window.onload = (event) =>{
  let point = 0;
  let question = 0;
  let time = 0;
  let x = 4
  var score = document.getElementById("score")
  var quiz = document.getElementById("quiz")
  var rig = document.getElementById("rig")
  var bal = document.getElementById("bal")
  let moveRight = false;

  function move(){
    if( x <= 0.3){
      moveRight = true;
    }
    if(x >= 8){
      moveRight = false;
    }
    if(moveRight == true){
      x += 0.05
    }
    if(moveRight == false){
      x -= 0.05
    }
    rig.setAttribute('position', `${x}, -30, 7`)
    bal.setAttribute('position', `${x}, -28, 5`)
    console.log('hi')
    console.log(x)
  }

  //spawns regular blocks
  function spawnBox(x, y, z){
    i = Math.floor(Math.random() * 3);
    var m = "#p1"
    switch(i){
      case 0:
        m = "#p1"
        break
      case 1:
        m = "#p2"
        break
      case 2:
        m = "#p3"
        break
    }
    var box = document.createElement("a-box")
    box.setAttribute("point", "null")
    box.setAttribute("gltf-model", `${m}`)
    box.setAttribute("scale","0.4 0.4 0.4")
    box.setAttribute("geometry","primitive: box")
    box.setAttribute("ammo-body", "type: dynamic; emitCollisionEvents: true;")
    box.setAttribute("ammo-shape", "type: box")
    box.setAttribute("rotation", "-90 0 0")
    box.setAttribute("position", `${x} ${y} ${z}`)
    document.querySelector("a-scene").appendChild(box)
  }

  //spawns special quiz block
  function spawnBoxQuiz(x, y, z){
    var box = document.createElement("a-box")
    box.setAttribute("quiz", "null")
    box.setAttribute("gltf-model", "#p4")
    box.setAttribute("scale","0.4 0.4 0.4")
    box.setAttribute("geometry","primitive: box")
    box.setAttribute("ammo-body", "type: dynamic; emitCollisionEvents: true;")
    box.setAttribute("ammo-shape", "type: box")
    box.setAttribute("rotation", "-90 0 0")
    box.setAttribute("position", `${x} ${y} ${z}`)
    document.querySelector("a-scene").appendChild(box)
  }

  //choses random spwan patern to spawn blocks in
  function randomSequence(){
    
    let rows = [0,2,4,6,8]
    i = Math.floor(Math.random() * 8);
    switch(i){
      case 0:
        j = Math.floor(Math.random() * 5);
        spawnBoxQuiz(rows[j], 90, 5)
        break;
      case 1:
        spawnBox(0, 90, 5)
        spawnBox(2, 90, 5)
        spawnBox(4, 90, 5)
        spawnBox(6, 90, 5)
        spawnBox(8, 90, 5)
        break;
      case 2:
        spawnBox(0, 90, 5)
        spawnBox(4, 90, 5)
        spawnBox(8, 90, 5)
        break;
      case 3:
        j = Math.floor(Math.random() * 5);
        spawnBox(rows[j], 90, 5);
        break;
      case 4:
        j = Math.floor(Math.random() * 3)+1;
        spawnBox(rows[j]-2, 90, 5)
        spawnBox(rows[j], 90, 5)
        spawnBox(rows[j]+2, 90, 5)
        break;
      case 5:
        spawnBox(0, 90, 5)
        spawnBox(2, 90, 5)
        spawnBox(6, 90, 5)
        break;
      case 6:
        spawnBox(2, 90, 5)
        spawnBox(6, 90, 5)
        spawnBox(8, 90, 5)
        break;
      case 7:
        j = Math.floor(Math.random() * 5);
        spawnBox(row[j], 90, 5)
        spawnBox(row[j]+2, 90, 5)
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
  setInterval(randomSequence,  2000-time);
  // setInterval(move, 10);
  setInterval(pointsTime, 500);
  

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



  