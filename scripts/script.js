// CONSTANTES

const AGENTS = [
    'Fade', 'Neon', 'Chamber', 'Skye',
    'Yoru', 'Astra', 'KAY-O', 'Phoenix',
    'Raze', 'Brimstone', 'Jett', 'Sage',
    'Viper', 'Breach', 'Cypher', 'Sova',
    'Omen', 'Reyna', 'Killjoy', 'Harbor'
]

const MAPS = [
    'Ascent', 'Bind', 'Breeze', 'Fracture',
    'Haven', 'Icebox', 'Pearl', 'Split'
]

const PLAYERS = []


// FUNÇÃO AGENTES

/* 
function loadAgents() {
    AGENTS.forEach(agentName => {
        const agentsSection = document.querySelector('#teste-agentes')
        
        // cria o container
        const agentContainer = document.createElement('div')
            agentContainer.classList.add('agente')
            agentContainer.classList.add('ativo')
        
        // cria o icon
        const agentIcon = document.createElement('img')
            agentIcon.setAttribute('src', `Assets/images/agents/${agentName}_icon.png`)
            agentIcon.setAttribute('alt', `${agentName}`)

        // icon no container
        agentContainer.appendChild(agentIcon)
        // container na section
        agentsSection.appendChild(agentContainer)

        // adiciona classe de inativa
        agentContainer.addEventListener('click', (e) => {
            agentContainer.classList.toggle('inativo')
            agentContainer.classList.toggle('ativo')

            console.log(e.target.classList)
        })
    })
}

window.addEventListener('load', loadAgents)
 */

// FUNÇÃO MAPAS

/* [] - Transição da imagem do mapa
 * [] - Transição do nome do mapa
 */

function shuffleMaps() {
    console.log('foi')
    let nome = getRandomItem(MAPS)
    const mapa = document.querySelector('#mapa')
    const nomeMapa = document.querySelector('#mapa h3')
    const bgImage = `linear-gradient(231.45deg, rgba(0, 0, 0, 0) 27.82%, rgba(83, 33, 43, 0.7) 78.81%), url(./Assets/images/maps/${nome}.png)`;

    nomeMapa.textContent = nome.toUpperCase()
    
    mapa.style.background = bgImage
    mapa.style.backgroundSize = 'cover'
    mapa.style.backgroundPosition = 'center'
}

const sortearMapa = document.querySelector('input[value=SORTEAR]')
sortearMapa.addEventListener('click', shuffleMaps)


// FUNÇÕES

function getRandomItem(array) {
    // retorna um item aleatório de um array
    return array[Math.floor(Math.random() * array.length)]
}

/* JOGADORES */

function getPlayers(input) {
    // retorna um array com os nomes dos players
    return input.value.split(/,\s+|[\n]+/)
}

function insertPlayer(playerArray = []) {

    playerArray.forEach(name => {
        if (!!isPresent(name)) {
            // verifica se o jogador está presente
            console.log('Jogador já presente!')

        } else {
            // insere o jogador no array
            PLAYERS.push(name)

            // adiciona os players na tela
            const player = document.createElement('p')
            const addedPlayersGroup = document.querySelector('#grupo-jogadores')

            // cria um p e usa o nome do jogador (para cada jogador)
            player.textContent = name

            // coloca-o no grupo e adiciona a ele a opção de remove-lo
            addedPlayersGroup.appendChild(player)
            player.addEventListener('click', removePlayer)
        }
    })
}

function clearPlayers() {
    // limpa o array de jogadores
    PLAYERS.length = 0

    const groupPlayersInserted = document.querySelector('#grupo-jogadores')
    const playersInserted = document.querySelectorAll('#grupo-jogadores > p')

    playersInserted.forEach(player => {
        groupPlayersInserted.removeChild(player)
    })

    // adicionar animação na lixeira
    const clearButton = document.querySelector('#limpar')
    clearButton.classList.add('shake-animation')
    setTimeout(() => {
        clearButton.classList.remove('shake-animation')
    }, 800)
}

function removePlayer(player) {
    const addedPlayersGroup = document.querySelector('#grupo-jogadores')

    // remove o player clicado da tela
    addedPlayersGroup.removeChild(player.target)
    // remove o player clicado do array
    PLAYERS.pop(PLAYERS.indexOf(player.target))
}

/* VERIFICADORA */

function isPresent(player) {
    // verifica se o player já está presente no array
    if (PLAYERS.includes(player) === true) {
        return true // está presente
    } else {
        return false // não está presente
    }
}

function isSufficient() {
    const playersContainer = document.querySelector('#jogadores-adicionados')
    const minPlayerAlert = document.querySelector('#minimo-jogadores')

    // verifica se há players suficientes 
    if (PLAYERS.length < 2) {
        // revela o alerta de jogadores mínimos
        minPlayerAlert.style.display = 'flex'

        // adiciona classe para borda vermelha
        playersContainer.classList.add('insuficiente')

        // remove ambos com delay
        setTimeout(() => {
            minPlayerAlert.style.display = 'none'
            playersContainer.classList.remove('insuficiente')
        }, 1500)

        return false
    } else {
        return true
    }
}

/* TIMES */

function shuffleTeams(ogPlayerArray = []) {
    let randomTeam = ogPlayerArray.slice()
    let currentIndex = ogPlayerArray.length
    let randomIndex
  
    // randomiza o array de jogadores
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [randomTeam[currentIndex], randomTeam[randomIndex]] = [randomTeam[randomIndex], randomTeam[currentIndex]];
    }
    
    // copia da metade para final
    const team1 = randomTeam.slice(randomTeam.length / 2, randomTeam.length)

    // copia da inicio para metade
    const team2 = randomTeam.slice(0, randomTeam.length / 2)

    return {team1, team2}
}

// FUNÇÃO FINAL

function generateTeams() {
    if (isSufficient()) {
        // função de sortear times
        console.log('gerando times')
        console.log(shuffleTeams(PLAYERS));
    }
}

function addPlayer() {
    const playersInput = document.querySelector('textarea#players-add')

    insertPlayer(getPlayers(playersInput))
    playersInput.value = ''
}

// EVENTOS

// adicionar jogadores
const addPlayerButton = document.querySelector('#button-add')
addPlayerButton.addEventListener('click', addPlayer)

// limpar jogadores
const clearButton = document.querySelector('#limpar')
clearButton.addEventListener('click', clearPlayers)

// gerar times
const generateTeamsButton = document.querySelector('#button-gerar')
generateTeamsButton.addEventListener('click', generateTeams)