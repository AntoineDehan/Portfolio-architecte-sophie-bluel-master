let works = null;
let id = null;
let categories = null;
let user = null;
let workId = null;
let userToken = window.localStorage.getItem("token")

const workConteneur = document.querySelector(".gallery");
const modalWorkConteneur = document.querySelector(".gallery-modal")
const btnConteneur = document.querySelector(".btn-conteneur");
const workAddForm = document.forms.namedItem("add-work-form")



// // API
//Fonction API WORKS
async function creationWorks(works) {
  for (let i = 0; i < works.length; i++) {
    projectCreation(works[i]);
    projectCreationModal(works[i]);
  }
}

// Appel API et création de works
async function apiWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
  creationWorks(works);
}

//Fonction API Categories
async function categoryList() {
  const response = await fetch("http://localhost:5678/api/categories");
  categories = await response.json();
  for (let i = 0; i < categories.length; i++) {
    btnCreation(i);
  }
}

// //


//fonction création projets HTML
function projectCreation(work) {
  let figure = document.createElement("figure");
  let imgWork = document.createElement("img");
  let descriptionWork = document.createElement("figcaption");

  workConteneur.appendChild(figure);
  figure.appendChild(imgWork);
  figure.appendChild(descriptionWork);

  descriptionWork.innerText = work.title;
  imgWork.src = work.imageUrl;
}


//Fonction création bouttons HTML
function btnCreation(i) {
  let btn = document.createElement("button");

  btnConteneur.appendChild(btn);
  btn.setAttribute("data-id", categories[i].id);
  btn.classList.add("inactif-btn")
  btn.innerText = categories[i].name;
}

function selectedBtn() {
  let currentBtn = document.querySelectorAll(".btn-conteneur button")[i]
  currentBtn.classList.add("actif-btn")
}

function unselectedBtn() {
  let currentBtn = document.querySelector(".actif-btn")
  currentBtn.classList.remove("dot_selected")
}


function regenerationProjets() {
  document.querySelector(".gallery").innerHTML = "";
}


// // Modal
// fonction création projets HTML dans la Modal
function projectCreationModal(work) {
  let figure = document.createElement("figure");
  let imgWork = document.createElement("img");
  let iHtml = document.createElement("i")

  modalWorkConteneur.appendChild(figure);

  figure.appendChild(imgWork);
  figure.appendChild(iHtml);
  figure.dataset.id = work.id

  iHtml.classList.add("fa-solid", "fa-trash-can")
  imgWork.src = work.imageUrl;
}

// Suppression d'un projet
function deleteWorks() {

  document.querySelectorAll(".fa-trash-can").forEach((delWorkBtn) => {
    delWorkBtn.addEventListener("click", async function (e) {
      const workId = e.target.parentElement.getAttribute("data-id")
      const delet = await fetch("http://localhost:5678/api/works/" + workId, {
        method: "DELETE",
        headers: { "Authorization": "Bearer" + userToken},
      })
      
    })
  })
  regenerationFiltered(workId)
}

function regenerationFiltered(id) {
  if (id === null) {
    return
  }
 else {
  const filteredDeletedWorks = works.filter(
    (work) => work.id.toString() === id
  );
  regenerationProjets()
  creationWorks(filteredDeletedWorks)
 }
}


// Ajout d'un projet
workAddForm.addEventListener("submit", async function (e, works) { 
  e.preventDefault()
  const title = document.querySelector("#title")
  const file = document.querySelector("#add-image")
  const category = document.querySelector("#category")

  const addWork = {
    image: file.value,
    title: title.value,
    category: category.value
  }
  const chargeUtile = JSON.stringify(addWork)

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { "Authorization": "Bearer" + userToken},
    body: chargeUtile,
    })
    if (response.ok) {
      works.push(addWork)
      regenerationProjets()
      creationWorks()
    }
    else {
      return
    }

})


// // 


// Changement site si login ou non
function loginCreation() {
  const loginConteneur = document.querySelector(".login-conteneur")
  const editConteneur = document.querySelector(".edit-galery-conteneur")

  let icone = document.createElement("i")
  let login = document.createElement("li")
  let link = document.createElement("a")
  if ( userToken === null) {

    loginConteneur.appendChild(login)
    login.appendChild(link)

    link.innerText = "login"
    link.href = "./login.html"
    
  }

  else {
    editConteneur.appendChild(icone)
    icone.classList.add("fa-regular", "fa-pen-to-square")
    editConteneur.appendChild(link)
    link.classList.add("js-modal-show")
    link.innerText = "Modifier"
    link.href = "#modale1"
    loginConteneur.appendChild(login)
    login.innerText = "logout"
    login.classList.add("logout")

    const logout = document.querySelector(".logout")

    logout.addEventListener("click", () => {
      userToken = null;
      location.reload()
    })

    const dialog = document.querySelector(".modal1");
    const showBtn = document.querySelector(".js-modal-show");
    const closeBtn = document.querySelector(".js-modal-close");

    const dialogAddWork = document.querySelector(".modal2");
    const showBtnAdd = document.querySelector(".add-work-btn");
    const closeBtnAdd = document.querySelector(".js-modal-close2");
    const previousBtn = document.querySelector(".fa-arrow-left");



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

    //Passer de modal 2 a modal 1
    previousBtn.addEventListener("click",() => {
      dialog.showModal();
      dialogAddWork.close();
    }) 
  }
}


// Fonction principale -- Lancement de toutes les fonctions nécessaires
async function main() {
  await apiWorks();
  await categoryList();
  deleteWorks();
  loginCreation();


  // Filtres boutons
  btnConteneur.addEventListener("click", function (event) {
    const id = event.target.getAttribute("data-id");

    const btnActif = document.querySelector(".actif-btn")
    btnActif.classList.remove("actif-btn")

    const btns = document.querySelectorAll(".btn-conteneur button")[id]
    btns.classList.add("actif-btn")

    if (id == 0) {
      regenerationProjets();
      creationWorks(works);
    } else {
      const filteredWorks = works.filter(
        (work) => work.categoryId.toString() === id
      );
      regenerationProjets();
      creationWorks(filteredWorks);
    }
  });
}


// Lancement de la fonction main
main();
