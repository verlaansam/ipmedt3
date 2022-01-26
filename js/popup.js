const popupOverlay = document.querySelector('.popup');
const popupBox = document.querySelector('.popupBox');
const exitBtn = document.getElementById('.exitCloud');


const popupOpen = false;

exitBtn.addEventListener("click", ()=> {
    popupOverlay.classList.add("active");
    popupBox.classList.add("active");
});


