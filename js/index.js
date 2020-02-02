let currentPage = 1
document.addEventListener('DOMContentLoaded', function(){
    get50Monsters() 
    renderAllMonsters(monsters)
    addMonsterForm()
    addNewMonster()
    flipPage()
    turnBackPage()
})

function get50Monsters(page=1){
    monsters = fetch(`http://localhost:3000/monsters/?_limit=5&_page=${page}`).then(resp => resp.json());
    return monsters
}

function renderSingleMonster(monster){
    return `
    <div id=${monster.id}>
        Name:<h2>${monster.name}</h2>
        Age:<h2>${monster.age}</h2>
        Description:<h2>${monster.description}</h2>
    </div>
    `
}

function renderAllMonsters(monsters){
    const monsterContainer = document.getElementById("monster-container")
    //debugger
    monsters.then(function(creatures){
        creatures.forEach(function(monster){
        monsterContainer.innerHTML += renderSingleMonster(monster)
        
    })
    })
}

function monsterForm(){
    
    return `
        <form action="/localhost:3000/monsters" method="POST">
            Name:<input id="name" type="text" name="name" value=""><br>
            Age:<input id="age" type="text" name="age" value=""><br>
            Description:<input id="description" type="text" name="description" value=""><br>
            <input type="submit" value="Submit">
        </form>`
}

function addMonsterForm(){
    const formDiv = document.getElementById('create-monster')
    formDiv.innerHTML += monsterForm()

}

function addNewMonster(){
    const formListener = document.querySelector('form')
    
    formListener.addEventListener('submit', function(){
        event.preventDefault()
        const name = document.getElementById('name').value
        const age = document.getElementById('age').value
        const description = document.getElementById('description').value
        // debugger
        const data = {  "name": name, 
                        "age": age, 
                        "description": description
                    };

        fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        }).then((response) => response.json()).then(monster => {
            const monsterContainer = document.getElementById("monster-container")
            monsterContainer.innerHTML += renderSingleMonster(monster)
        })
        
        document.getElementById('name').value = ''
        document.getElementById('age').value = ''
        document.getElementById('description').value = ''
        // debugger


})

}

function flipPage(){
    const forwardButton = document.getElementById('forward')
    forwardButton.addEventListener('click', function(){
        newPage = currentPage +1
        document.getElementById("monster-container").innerHTML = ''
        const newMonsters = get50Monsters(newPage)
        renderAllMonsters(newMonsters)
        currentPage++
    })
}

function turnBackPage(){
    const backButton = document.getElementById('back')
    backButton.addEventListener('click', function(){
        if (currentPage > 1){
        newPage = currentPage - 1
        document.getElementById("monster-container").innerHTML = ''
        const newMonsters = get50Monsters(newPage)
        renderAllMonsters(newMonsters)
        currentPage--
        }
    })
}