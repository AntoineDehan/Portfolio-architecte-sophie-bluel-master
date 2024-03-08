let works = null;
let id = null;
let categories = null;
let user = null;

let workConteneur = document.querySelector(".gallery");
let btnConteneur = document.querySelector(".btn-conteneur");

//Fonction API WORKS
async function creationWorks(works) {
  for (let i = 0; i < works.length; i++) {
    projectCreation(works[i]);
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

// Lancement des fonctions
async function main() {
  await apiWorks();
  await categoryList();

  //Filtres
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
main();
