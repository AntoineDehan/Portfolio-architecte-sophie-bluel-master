let works = null;
let id = null;
let categories = null;

let workConteneur = document.querySelector(".gallery");

let btnConteneur = document.querySelector(".btn-conteneur")


//Fonction API WORKS
async function CreationWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
  for (let i = 0; i < works.length; i++) {
  ProjectCreation(i)
  }
}

//Fonction API Categories
async function CategoryList() {
    const response = await fetch("http://localhost:5678/api/categories")
    categories = await response.json()
    for (let i = 0; i < categories.length; i++) {
        BtnCreation(i)
    }
}

//fonction création projets HTML
function ProjectCreation(i) {
  let figure = document.createElement("figure");
  let imgWork = document.createElement("img");
  let descriptionWork = document.createElement("figcaption");

  workConteneur.appendChild(figure);

  let figureConteneur = document.querySelectorAll("#portfolio figure")[i];

  figureConteneur.appendChild(imgWork);
  figureConteneur.appendChild(descriptionWork);

  descriptionWork.innerText = works[i].title;
  imgWork.src = works[i].imageUrl;
}

//Fonction création bouttons HTML
function BtnCreation(i) {
let btn = document.createElement("button");

btnConteneur.appendChild(btn)
btn.setAttribute("data-value", categories[i].id)
btn.innerText = categories[i].name
}

// Bouton filtre par OBJET --
// const btnObjets = document.querySelector(".btn-objets");

// boutonObjets.addEventListener("click", function () {
//   const filteredWorks = works.filter((work) => {
//     return (work.categoryId = 1);
//   });
// });

// Lancement des fonctions
CategoryList()
CreationWorks()




