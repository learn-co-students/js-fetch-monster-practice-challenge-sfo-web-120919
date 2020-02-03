
(() => {

let currentPage = 1
const baseUrl = "http://localhost:3000/monsters"
const limit = 50;


document.addEventListener('DOMContentLoaded', function(){

    listenForNextMonsterPageClick()
    listenForPreviousMonsterPageClick()
    listenForCreateMonsterFormSubmit()
    populateMonsters();
});

function listenForCreateMonsterFormSubmit() {
    const monsterCreateForm = document.querySelector("#create-monster-form");
    const monsterDiv = document.querySelector("#monster-container");
    monsterCreateForm.addEventListener('submit', function(e) {
        e.preventDefault()
        const age = monsterCreateForm.querySelector("#age").value
        const name = monsterCreateForm.querySelector("#name").value
        const description = monsterCreateForm.querySelector("#description").value
        const monsterData = {name, age, description}
        const newMonster = postMonster(monsterData)
        newMonster.then(monster => addMonsterToDOM(monster, monsterDiv))
        
    })
}

function populateMonsters() {
    const monsters = getMonsters(currentPage);
    const monsterDiv = document.querySelector("#monster-container");
    addMonstersToDOM(monsters, monsterDiv);
}

function listenForNextMonsterPageClick() {
  const nextButton = document.querySelector('#forward'); 
  nextButton.addEventListener('click', function(){
    handleMonstersClick();
  })
}

function listenForPreviousMonsterPageClick() {
    const backButton = document.querySelector('#back'); 
    backButton.addEventListener('click', function(){
          if (currentPage > 1) {
              handleMonstersClick();
              currentPage -= 1
          }
          
        }) 
  }

function getMonsters(currentPage) {

      const fullUrl = `${baseUrl}?_limit=${limit}&page=${currentPage}`;
      debugger
      return fetch(fullUrl).then(data => data.json())
    

}



function postMonster(monster) {

    const configuration = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(monster)
    }

    return fetch(baseUrl, configuration).then(monster => monster.json()).catch(error => console.log(error))

}



function addMonstersToDOM(monsters, element) {

    monsters.then(  (monsters) => monsters.forEach(monster => addMonsterToDOM(monster, element))       );

}

function createMonsterHTML(monster) {

    const monsterHTML = `<div id=${monster.id}>
     
       <h3>${monster.name}</h3>
       <h3> Age: ${Math.round(monster.age)}</h3>
       <h3>Description: </h3><p>${monster.description}</p> 
    
    </div>`

    return monsterHTML

}

function addMonsterToDOM(monster, element) {
    
    element.innerHTML += createMonsterHTML(monster)
     
}


function handleMonstersClick() {

    const monsters = getMonsters(page);
    const monsterDiv = document.querySelector("#monster-container");
    addMonstersToDOM(monsters, monsterDiv); 

}



})()