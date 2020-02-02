let currentPage = 1;

document.addEventListener("DOMContentLoaded", function(){
    populateMonsters()
    listenForForwardClick()
    listenForBackClick()
    listenForCreateMonsterFormSubmit()
})

function postMonster(monsterData) {
    console.log(monsterData)
    return fetch("http://localhost:3000/monsters", {
        method: "POST",

        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        
        body: JSON.stringify(monsterData)
    }).then(data => data.json()).catch(error => console.log(error))
}

function listenForCreateMonsterFormSubmit() {
    let createMonsterForm = document.querySelector("#monster-form")
    createMonsterForm.addEventListener("submit", function(event){
        console.log("inside createMonster submit event")
        event.preventDefault()
        let name = createMonsterForm.querySelector("#name").value
        let number = createMonsterForm.querySelector("#number").value
        let  description = createMonsterForm.querySelector("#description").value
        let monsterObject = {
            name: name,
            age: number,
            description: description
        }
        console.log(monsterObject)
        postMonster(monsterObject).then(monster => {
            createHtmlForMonster(monster)
        })
    })
}

function listenForForwardClick() {
 let forwardButton = document.querySelector("#forward")
 forwardButton.addEventListener("click", function(){
     currentPage += 1;
     fetchMonsters(currentPage).then(nextPageMonsters => {
        document.querySelector('#monster-container').innerHTML = ""; 
        createHtmlForAllMonsters(nextPageMonsters)
     })
 })
}

function listenForBackClick() {
    let backButton = document.querySelector("#back")
    backButton.addEventListener("click", function() {
        if (currentPage > 1) {
            let goBackOnePage = currentPage -= 1;
            fetchMonsters(goBackOnePage).then(previousPageOfMonsters => {
                document.querySelector('#monster-container').innerHTML = "";
                createHtmlForAllMonsters(previousPageOfMonsters)
            })
        } 
    })
}

function createHtmlForMonster(monster) {
    let monsterHtml = `<div id="${monster.id}">
    <h2>name: ${monster.name}</h2>
    <h2>age: ${Math.round(monster.age)}</h2>
    <p>description: ${monster.description}</p>
    </div>
    `
    document.querySelector('#monster-container').innerHTML += monsterHtml;
    
}

function createHtmlForAllMonsters(monsters) {
    monsters.forEach(monster => {
        createHtmlForMonster(monster)
    })
}
function populateMonsters(){
    fetchMonsters(currentPage).then(monsters => {
        createHtmlForAllMonsters(monsters)
    })
}

function fetchMonsters(pageNumber) {
    return fetch(`http://localhost:3000/monsters/?_limit=2&_page=${pageNumber}`)
    .then(res => res.json());
}


// fetch all the monsters - return a promise with the json monster data
// make a function to create html for one monster hash - that has an argument monster
// make a function to create html for all monsters - that has an argument monsters
// use fetchMonsters to get all the monsters, then pass that into the create html monsters.
