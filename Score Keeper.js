const chooseScoreLimit = document.querySelector('select');
const resetButton = document.querySelector('#resetButton');
let isGameOver = false;
let scoreLimit = parseInt(chooseScoreLimit.value);
const tbody = document.querySelector('tbody');
let numMatches = 0;

const p1 = {
    name: 'Player 1',
    score: 0,
    button: document.querySelector('#player1Button'),
    display: document.querySelector('span:nth-of-type(1)')
}
const p2 = {
    name: 'Player 2',
    score: 0,
    button: document.querySelector('#player2Button'),
    display: document.querySelector('span:nth-of-type(2)')
}

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1
        if (player.score === opponent.score && scoreLimit - player.score === 1) {
            scoreLimit += 1;
            chooseScoreLimit.selectedOptions[0].innerText = `Tiebreak to ${scoreLimit}`;
            chooseScoreLimit.classList.add('tieBreak');
        }
        if (player.score === scoreLimit) {
            isGameOver = true;
            player.display.style.color = 'green';
            opponent.display.style.color = 'red';
            p1.button.classList.add('disabled');
            p2.button.classList.add('disabled');
            // table
            numMatches += 1;
            const newRow = document.createElement('tr');
            const nth = document.createElement('td');
            const winner = document.createElement('td');
            const scoreT = document.createElement('td');
            nth.textContent = numMatches;
            winner.textContent = player.name;
            scoreT.textContent = `${player.score} - ${opponent.score}`
            tbody.append(newRow);
            newRow.append(nth, winner, scoreT);
        }
    }

    console.log(player.score)
    player.display.innerHTML = player.score;
}

function reseter() {
    isGameOver = false;
    p1.score = 0;
    p2.score = 0;
    p1.display.style.color = 'black';
    p2.display.style.color = 'black';
    p1.display.innerHTML = p1.score;
    p2.display.innerHTML = p2.score;
    p1.button.classList.remove('disabled');
    p2.button.classList.remove('disabled');
    // to reset the score limit
    scoreLimit = parseInt(chooseScoreLimit.value);
    chooseScoreLimit.selectedOptions[0].innerText = scoreLimit;
    chooseScoreLimit.classList.remove('tieBreak');
}

chooseScoreLimit.addEventListener('change', () => {
    scoreLimit = parseInt(chooseScoreLimit.value);;
    console.log(scoreLimit);
    reseter();
})

p1.button.addEventListener('click', () => {
    updateScores(p1, p2);
})

p2.button.addEventListener('click', () => {
    updateScores(p2, p1);
})

document.addEventListener('keydown', function (evt) {
    if (evt.code == 'Digit1' || evt.code == 'Numpad1') {
        updateScores(p1, p2);
    }
    if (evt.code == 'Digit2' || evt.code == 'Numpad2') {
        updateScores(p2, p1);
    }
    if (evt.code == 'KeyR') {
        reseter();
    }

});

resetButton.addEventListener('click', reseter);

// form
const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');
const p1Name = document.querySelector('#p1Name');
const p2Name = document.querySelector('#p2Name');

form1.addEventListener('submit', (evt) => {
    evt.preventDefault();
    p1.button.textContent = p1Name.value;
    p1.name = p1Name.value;
    p1Name.value = '';
})

form2.addEventListener('submit', (evt) => {
    evt.preventDefault();
    p2.button.textContent = p2Name.value;
    p2.name = p2Name.value;
    p2Name.value = '';
})


