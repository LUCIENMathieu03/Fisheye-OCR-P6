// function displayModal() {
//     const modal = document.getElementById("contact_modal");
// 	modal.style.display = "block";
// }

// function closeModal() {
//     const modal = document.getElementById("contact_modal");
//     modal.style.display = "none";
// }


const modalBg = document.querySelector(".contact_modal");
const modal = document.querySelector(".modal");

function displayModal() {
	modalBg.classList.remove("contact_modal--close");
    modalBg.classList.add("contact_modal--open");
  
    modal.classList.remove("modal--close");
    modal.classList.add("modal--open");
}

function closeModal() {
    modal.classList.replace("modal--open", "modal--close");
    modalBg.classList.replace("contact_modal--open", "contact_modal--close");
}

