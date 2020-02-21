
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    show50Monsters();
});

function show50Monsters(){
   const monsterContainer = document.getElementById("monster-container")
  
    fetch("http://localhost:3000/monsters/?_limit=0&_page=3")
    .then(function(reponse){
       return reponse.json()
    }).then(function(data){
        data.forEach(element => {
            const monsterLi = document.createElement("li")
            monsterLi.innerHTML += element.name
            monsterLi.innerHTML += element.age
            monsterLi.innerHTML += element.description

            monsterContainer. appendChild(monsterLi)
        });
    })
};

const form = document.getElementById("monster-form")
form.addEventListener("submit", function(event){

    event.preventDefault();

    createAMonster(event);

})


function createAMonster(event){
   
    let data = { name: event.target.name.value, age: event.target.age.value, description: event.target.description.value }
    fetch("http://localhost:3000/monsters", {
   
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json()
    }).then(function (monsterData) {
        console.log(monsterData)

});



}
