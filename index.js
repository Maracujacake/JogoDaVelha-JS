window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', '']; // numero de casas do jogo
    let currentPlayer = 'X'; // padrão para ser utilizado posteriormente
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

// apenas uma visão de base para construção do código abaixo
    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [ // ao atingir qualquer uma dessas condições, o jogador em questão vence (reta,diagonal;)
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() { // condições para declarar vitória ou se o jogo deve continuar
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]]; 
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) { // levando em consideração a função acima, anuncie o vencedor de acordo com o player da vez atual
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes('')) // diferente do 'if' acima, este declara o empate
        announce(TIE);
    }

    const announce = (type) => { // constante que escreverá na tela os acontecimentos que definimos acima; vencedores e empate
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'O jogador <span class="playerO">O</span> venceu';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'O jogador <span class="playerX">X</span> venceu';
                break;
            case TIE:
                announcer.innerText = 'Empate';
        }
        announcer.classList.remove('hide');
    };


    // constante utilizada para validar ações, ou seja, jogadas, se são permitidas pela lógica do jogo
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => { // o nome é autoexplicativo
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // código que faz a mudança de jogadores
        playerDisplay.innerText = currentPlayer; // a escritura que aparece na tela
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    //constante que vai resetar (voltar ao inicio) o tabuleiro após o fim do jogo
    // também revezará a vez de início de cada um
    const resetBoard = () => { 
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    // ao clicar no botão de reset.. ele, bom.., resetará o tabuleiro
    resetButton.addEventListener('click', resetBoard);
});
