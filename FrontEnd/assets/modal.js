const dialog = document.querySelector("dialog");
const showBtn = document.querySelector(".js-modal-show");
const closeBtn = document.querySelector(".js-modal-close");


// Ouverture de la modale
showBtn.addEventListener("click", () => {
dialog.showModal();
})

// Fermeture de la modale
closeBtn.addEventListener("click", () => {
  console.log("click")
  dialog.close();
})