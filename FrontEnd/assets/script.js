let works = null;
let id = null;
let categories = null;
let user = null;
let workId = null;
const userToken = window.localStorage.getItem("token")

const workConteneur = document.querySelector(".gallery");
const modalWorkConteneur = document.querySelector(".gallery-modal")
const btnConteneur = document.querySelector(".btn-conteneur");
const workAddForm = document.forms.namedItem("add-work-form")


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
  btn.innerText = categories[i].name;
}

function regenerationProjets() {
  document.querySelector(".gallery").innerHTML = "";
}

// //  Modal -- Suppression

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
  test(workId)
}

function test(id) {
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


// //  Modal -- Ajout
workAddForm.addEventListener("submit", async function (e) { 
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
})


// Fonction principale -- Lancement de toutes les fonctions nécessaires
async function main() {
  await apiWorks();
  await categoryList();
  deleteWorks();

  // Filtres


  // Filtres boutons
  btnConteneur.addEventListener("click", function (event) {
    const id = event.target.getAttribute("data-id");
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
