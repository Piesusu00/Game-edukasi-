const board = document.getElementById('board');
const statusText = document.getElementById('status');
const rollBtn = document.getElementById('rollBtn');
const quizDiv = document.getElementById('quiz');
const questionP = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitAnswer = document.getElementById('submitAnswer');

let position = 0;
const badTiles = [4, 9, 14];
let currentQuestion = null;

// Buat papan
for (let i = 0; i < 25; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.id = 'tile-' + i;
    tile.textContent = i + 1;
    board.appendChild(tile);
}

function updateBoard() {
    document.querySelectorAll('.player').forEach(p => p.remove());
    const player = document.createElement('div');
    player.className = 'player';
    document.getElementById('tile-' + position).appendChild(player);
}

function showQuestion() {
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    questionP.textContent = currentQuestion.q;
    quizDiv.classList.remove('hidden');
}

submitAnswer.onclick = () => {
    if (answerInput.value.trim().toLowerCase() === currentQuestion.a) {
        statusText.textContent = "Benar! Lanjutkan.";
        quizDiv.classList.add('hidden');
    } else {
        statusText.textContent = "Salah! Ulangi soal berikutnya.";
        showQuestion();
    }
};

rollBtn.onclick = () => {
    if (!quizDiv.classList.contains('hidden')) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    statusText.textContent = `Kamu dapat angka ${roll}`;
    position += roll;
    if (position >= 24) {
        position = 24;
        statusText.textContent = "Selamat! Kamu menang!";
        rollBtn.disabled = true;
    } else if (badTiles.includes(position)) {
        statusText.textContent += " - Tantangan Pengetahuan!";
        showQuestion();
    }
    updateBoard();
};

updateBoard();
      
