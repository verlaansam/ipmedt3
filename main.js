window.onload = (event) =>{
  
  var x;
  let point = 0;
  var score = document.getElementById("score")


  function spawnBox(x){
    var box = document.createElement("a-box")
    box.setAttribute("point", "null")
    box.setAttribute("geometry","primitive: box")
    box.setAttribute("ammo-body", "type: dynamic; emitCollisionEvents: true;")
    box.setAttribute("ammo-shape", "type: box")
    box.setAttribute("width", "1")
    box.setAttribute("height", "1")
    box.setAttribute("depth", "2")
    box.setAttribute("position", `${x} 90 5`)
    box.setAttribute("color", "green")
    document.querySelector("a-scene").appendChild(box)
  }

  function spawnBoxQuiz(x){
    var box = document.createElement("a-box")
    box.setAttribute("geometry","primitive: box")
    box.setAttribute("ammo-body", "type: dynamic; emitCollisionEvents: true;")
    box.setAttribute("ammo-shape", "type: box")
    box.setAttribute("width", "1")
    box.setAttribute("height", "1")
    box.setAttribute("depth", "2")
    box.setAttribute("position", `${x} 90 5`)
    box.setAttribute("color", "orange")
    document.querySelector("a-scene").appendChild(box)
  }

  function sequenceZero(){
    i = Math.floor(Math.random() * 8);
    spawnBoxQuiz(i)
  }

  function sequenceOne(){
    spawnBox(0)
    spawnBox(3)
    spawnBox(6)
  }

  function sequenceTwo(){
    spawnBox(1)
    spawnBox(4)
    spawnBox(7)
  }

  function sequenceThree(){
    j = Math.floor(Math.random() * 8);
    spawnBox(j)
  }

  function sequenceFour(){
    j = Math.floor(Math.random() * 6) + 2;
    spawnBox(j)
    spawnBox(j+2)
  }

  function randomSequence(){
    
    i = Math.floor(Math.random() * 5);
     switch(i){
      case 0:
         sequenceZero();
         break;
      case 1:
          sequenceOne()
         break;
      case 2:
         sequenceTwo();
         break;
      case 3:
         sequenceThree();
         break;
      case 4:
         sequenceFour();
         break;
     }
  }

  function pointsTime(){
    point +=1
    score.innerHTML = point
  }

  setInterval(randomSequence, 2000);
  setInterval(pointsTime, 500)

  AFRAME.registerComponent('point', {
    init: function() {
      var el = this.el;
      el.addEventListener("collidestart", function () {
        point += 1;
        console.log(point)
        score.innerHTML = point
      });
    }
  });
  
AFRAME.registerComponent('quiz', {
  init: function() {
    var el = this.el;
    el.addEventListener("collidestart", function () {
      console.log("quiz")
    });
  }
});

AFRAME.registerComponent('gameover', {
  init: function() {
    var el = this.el;
    el.addEventListener("collidestart", function () {
      console.log("GameOver")
    });
  }
});
  
}


  