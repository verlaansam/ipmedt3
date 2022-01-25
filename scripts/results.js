const questions = document.getElementsByClassName("js--question");

window.onload = (event) => {
    getDataOnce();
}

function fetchDatabase(data){
    console.log(data);
    for(let i = 0; i < Object.keys(data).length; i++){
        console.log(data[i].answer);
    }
}