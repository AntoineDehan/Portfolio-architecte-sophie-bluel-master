const dialog = document.querySelector(".modal1");
const showBtn = document.querySelector(".js-modal-show");
const closeBtn = document.querySelector(".js-modal-close");

const dialogAddWork = document.querySelector(".modal2");
const showBtnAdd = document.querySelector(".add-work-btn");
const closeBtnAdd = document.querySelector(".js-modal-close2");



// Ouverture de la modale
showBtn.addEventListener("click", () => {
dialog.showModal();
})

// Fermeture de la modale
closeBtn.addEventListener("click", () => {
  dialog.close();
})

//
showBtnAdd.addEventListener("click", () => {
  dialog.close()
  dialogAddWork.showModal();
  })

//
closeBtnAdd.addEventListener("click", () => {
  dialogAddWork.close();
})