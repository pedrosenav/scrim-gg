const agents = [
    'Fade','Neon','Chamber','Skye',
    'Yoru','Astra','KAY/O','Phoenix',
    'Raze','Brimstone','Jett','Sage',
    'Viper','Breach','Cypher','Sova',
    'Omen','Reyna','Killjoy'
]

const maps = [
    Ascent = { // fazer function factory
        name: 'Ascent',
        pic: 'linkdafoto'
    },
    'Ascent','Bind','Breeze','Fracture',
    'Haven','Icebox','Pearl','Split'
]

function getRandom(array) {
    return array[Math.floor(Math.random()*array.length)]
}

/* ELEMENTOS PARA TESTE */
const playersInput = document.querySelector('#players-input')
const addPlayersButton = document.querySelector('#add-players-button')
/* ELEMENTOS PARA TESTE */

function getPlayers(playersList) {
    console.log(playersList.value.split (/[\n,\s]+/))
}

function setTeams(playersArray = []) {
    let team1 = []
    let team2 = []
    let randomPlayer = ''
    do {
        randomPlayer = getRandom(playersArray)
        team1.push(randomPlayer)
        playersArray.splice(playersArray.indexOf(randomPlayer), 1)
    } while(playersArray.length > playersArray.length/2)

    return team1
}

addPlayersButton.addEventListener('click', () => {
    console.log(setTeams(getPlayers(playersInput)))
})
