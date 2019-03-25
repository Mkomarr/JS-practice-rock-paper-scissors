const gameSummarry = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: ""
}

const hands = [...document.querySelectorAll('.select img')];

function handSelection() {
    game.playerHand = this.dataset.option; //
    //console.log(game.playerHand); //pokazuje który obrazek został kliknięty
    hands.forEach(hand => hand.style.boxShadow = ''); //zeruje obramówkę na każdym obrazku
    this.style.boxShadow = '0 0 0 4px yellow'

}
//inny zapis powyższej funkcji, bez thisa
// const handSelection = (e) => {
//     console.log(e.currentTarget);
// }

function aiChoice() {
    const aiHand = hands[Math.floor(Math.random()*3)].dataset.option;
    return aiHand;
}

//określamy warunki wygranej, każdy inny to przegrana
function checkResult(player, ai) {
    if (player === ai) {
        return 'draw';
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return 'win';
    } else { 
        return 'loss';
        }
}

//publikacja wyniku
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameSummarry.numbers;

    if (result === 'win') {
        document.querySelector('p.wins span').textContent = ++gameSummarry.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "Ty wygrałeś!";
        document.querySelector('[data-summary="who-win"]').style.color = 'green';
    } else if (result === 'loss') {
        document.querySelector('p.losses span').textContent = ++gameSummarry.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "Komputer wygrał :( ";
        document.querySelector('[data-summary="who-win"]').style.color = 'red';
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummarry.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "Remis :\\";
        document.querySelector('[data-summary="who-win"]').style.color = 'gray';
    }
}

//resetowanie wyborów po wykonaniu gry
function endGame() {
    //sprawdzamy, który element ma obwódkę
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = ""; //czyścimy obiekt
    game.aiHand = "";
}

//funkcja sterująca
function startGame() {
    if (!game.playerHand) return alert("Wybierz coś");
    game.aiHand = aiChoice() 
    const gameResult = checkResult(game.playerHand, game.aiHand);
    console.log(gameResult);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}


hands.forEach(hand => hand.addEventListener('click', handSelection)); //nasłuch nie działa na całej tablicy, więc trzeba z forEach wybrać jeden element i na nim ustawić, do tego jest ta funkcja

document.querySelector('.start').addEventListener('click', startGame);
