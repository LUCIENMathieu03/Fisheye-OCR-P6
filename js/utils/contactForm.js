const modalBg = document.querySelector(".contact_modal");
const modal = document.querySelector(".modal");
const body = document.querySelector("body");

function displayModal() {
	modalBg.classList.remove("contact_modal--close");
    modalBg.classList.add("contact_modal--open");
  
    modal.classList.remove("modal--close");
    modal.classList.add("modal--open");
    
    body.classList.remove("bodyModal__close");
    body.classList.add("bodyModal__open");
}

function closeModal() {
    modal.classList.replace("modal--open", "modal--close");
    modalBg.classList.replace("contact_modal--open", "contact_modal--close");
    body.classList.replace("bodyModal__open", "bodyModal__close");
}

document.querySelector('.modalSendButton').addEventListener('click',(e)=>{
    e.preventDefault();
});
