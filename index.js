import { AppState, Player, GameState } from "./state.js";
import { renderSavedGames, renderStatInfos, renderFirstPlayersCurrentFigures, renderGameArea, renderStartingPage, renderSecondPlayersCurrentFigures, renderTable } from "./render.js";

const state = new AppState();
const localStorage = window.localStorage;

let savedGames = document.querySelector("#savedGames");
let statInfos = document.querySelector("#statInfos");
let firstPlayersInput = document.querySelector("#firstPlayersName");
let secondPlayersInput = document.querySelector("#secondPlayersName");
let startButton = document.querySelector("#start");
const saveButton = document.querySelector("#saveButton");
const startingPage = document.querySelector("#startingPage");
const gameArea = document.querySelector("#gameArea");
const gameTable = document.querySelector("#gameTable");
const firstPlayer = document.querySelector("#firstPlayer");
const secondPlayer = document.querySelector("#secondPlayer");
const pawnBlack = document.querySelector("#pawnBlack");
const pawnWhite = document.querySelector("#pawnWhite");
const firstPlayersID = document.querySelector("#firstPlayersID");
const secondPlayersID = document.querySelector("#secondPlayersID");
const informativeText = document.querySelector("#informativeText");
const newGameButton = document.querySelector("#newGame");
const firstPlayersSign = document.querySelector("#firstPlayersSign");
const secondPlayersSign = document.querySelector("#secondPlayersSign");
const firstPlayersCurrentFigures = document.querySelector("#firstPlayersCurrentFigures");
const secondPlayersCurrentFigures = document.querySelector("#secondPlayersCurrentFigures");

//
// Event listeners
//

saveButton.addEventListener("click", handleSaveButtonClick);
startButton.addEventListener("click", handleStartButtonClick);
savedGames.addEventListener("click", handleSavedGameClick);
gameTable.addEventListener("click", handleFieldLeftClick);
firstPlayersCurrentFigures.addEventListener("click", handleFigureLeftClick);
secondPlayersCurrentFigures.addEventListener("click", handleFigureLeftClick);
newGameButton.addEventListener("click", handleNewGameButtonClick);

function handleSaveButtonClick() {
    saveStatistics();

    if (state.state !== GameState.WON_GAME) {
        let savedGamesArray = localStorage.getItem("savedGames") ? JSON.parse(localStorage.getItem("savedGames")) : [];
        const savedGameState = {
            board: state.board,
            firstPlayersFigures: state.firstPlayersFigures,
            secondPlayersFigures: state.secondPlayersFigures,
            currentPlayer: state.currentPlayer,
            currentFigure: state.currentFigure,
            currentColor: state.currentColor,
            winnerPlayer: state.winnerPlayer,
            state: state.state,
            figureCount: state.figureCount,
            statistics: state.statistics
        };
        savedGamesArray.push(savedGameState);
        localStorage.setItem("savedGames", JSON.stringify(savedGamesArray));
    }

    saveButton.style.border = "solid green 1px";
}

function handleStartButtonClick() {
    state.init(firstPlayersInput.value, secondPlayersInput.value);

    styleForNewGame(state.state);

    firstPlayersID.innerHTML = firstPlayersInput.value;
    secondPlayersID.innerHTML = secondPlayersInput.value;
    firstPlayersSign.innerHTML = firstPlayersInput.value;
    secondPlayersSign.innerHTML = secondPlayersInput.value;

    gameTable.innerHTML = renderTable(state.board);
    firstPlayersCurrentFigures.innerHTML = renderFirstPlayersCurrentFigures(state.firstPlayersFigures);
    secondPlayersCurrentFigures.innerHTML = renderSecondPlayersCurrentFigures(state.secondPlayersFigures);

    styleForPlayerChange(state.currentPlayer);
}

function handleSavedGameClick(event) {
    if (!event.target.matches("button")) return;

    const extractPlayers = (string) => {
        let [firstPlayer, rest] = string.split(' vs. ')
        firstPlayer = firstPlayer.trim();
        const secondPlayer = rest.split(' ').filter(x => x).slice(0, -1).join(' ').trim()
        
        return {firstPlayer, secondPlayer}
    }

    const names = extractPlayers(event.target.innerHTML);
    const savedGamesArray = localStorage.getItem("savedGames") ? JSON.parse(localStorage.getItem("savedGames")) : [];

    for (const savedGame of savedGamesArray) {
        if (savedGame.statistics.firstPlayersName === names.firstPlayer && savedGame.statistics.secondPlayersName === names.secondPlayer) {
            state.load(savedGame);
            
            styleForNewGame(state.state);

            firstPlayersID.innerHTML = names.firstPlayer;
            secondPlayersID.innerHTML = names.secondPlayer;
            firstPlayersSign.innerHTML = names.firstPlayer;
            secondPlayersSign.innerHTML = names.secondPlayer;

            gameTable.innerHTML = renderTable(state.board);
            firstPlayersCurrentFigures.innerHTML = renderFirstPlayersCurrentFigures(state.firstPlayersFigures);
            secondPlayersCurrentFigures.innerHTML = renderSecondPlayersCurrentFigures(state.secondPlayersFigures);

            styleForPlayerChange(state.currentPlayer);
            
            return;
        }
    }
}

function handleFieldLeftClick(event) {
    if (!event.target.matches("button")) return;
    if (state.state === GameState.WON_GAME) return;

    const td = event.target.parentNode;
    const tr = td.parentNode;
    const y = td.cellIndex;
    const x = tr.rowIndex;

    if (state.state === GameState.SELECT_FIGURE) {
        state.step(x, y);
    }

    gameTable.innerHTML = renderTable(state.board);
    firstPlayersCurrentFigures.innerHTML = renderFirstPlayersCurrentFigures(state.firstPlayersFigures);
    secondPlayersCurrentFigures.innerHTML = renderSecondPlayersCurrentFigures(state.secondPlayersFigures);

    if (state.checkForVictory(x, y)) {
        styleForVictory(state.winnerPlayer);
    } else {
        styleForPlayerChange(state.currentPlayer);
    }
}

function handleFigureLeftClick(event) {
    if (!event.target.matches("img")) return;
    if (state.state === GameState.WON_GAME) return;

    if (state.state === GameState.SELECT_FIGURE) {
        state.clearCanStepOn();
    }

    const imgSource = event.target.src.split('/').pop();
    state.showPossibleSteps(imgSource);

    gameTable.innerHTML = renderTable(state.board);
}

function handleNewGameButtonClick() {
    state.state = GameState.NEW_GAME;

    let savedGamesArray = localStorage.getItem("savedGames") ? JSON.parse(localStorage.getItem("savedGames")) : [];
    for (const savedGame of savedGamesArray) {
        if (savedGame.statistics.firstPlayersName === state.statistics.firstPlayersName && savedGame.statistics.secondPlayersName === state.statistics.secondPlayersName) {
            const ind = savedGamesArray.findIndex(game => game.statistics.firstPlayersName === state.statistics.firstPlayersName && game.statistics.secondPlayersName === state.statistics.secondPlayersName);
            if (ind !== -1) {
                savedGamesArray.splice(ind, 1);
            }
        }
    }
    localStorage.setItem("savedGames", JSON.stringify(savedGamesArray));

    saveStatistics();

    styleForNewGame(state.state);
}

//
// Helper functions
//

function styleForNewGame(state) {
    if (state === GameState.NEW_GAME) {
        gameArea.style.visibility = "hidden";
        saveButton.style.visibility = "hidden";
        newGameButton.style.visibility = "hidden";
        firstPlayer.style.visibility = "hidden";
        secondPlayer.style.visibility = "hidden";

        startingPage.innerHTML = renderStartingPage();
        
        firstPlayersInput = document.querySelector("#firstPlayersName");
        secondPlayersInput = document.querySelector("#secondPlayersName");

        firstPlayersInput.value = firstPlayersID.innerHTML;
        secondPlayersInput.value = secondPlayersID.innerHTML;
        
        savedGames = document.querySelector("#savedGames");
        statInfos = document.querySelector("#statInfos");

        loadSavings();
        
        startButton = document.querySelector("#start");
        startButton.addEventListener("click", handleStartButtonClick);
    } else {
        gameArea.style.visibility = "visible";
        saveButton.style.visibility = "visible";
        startingPage.innerHTML = ``;
    }
}

function styleForPlayerChange(player) {
    firstPlayer.style.visibility = "visible";
    secondPlayer.style.visibility = "visible";
    informativeText.innerHTML = `vs`;
    newGameButton.style.visibility = "hidden";
    if (player === Player.FIRST_PLAYER) {
        pawnBlack.src = "images/pawnBlack.png";
        pawnWhite.src = "images/pawnGray.png";
        firstPlayersID.style.fontWeight = "bold";
        secondPlayersID.style.fontWeight = "normal";
    } else if (player === Player.SECOND_PLAYER) {
        pawnWhite.src = "images/pawnWhite.png";
        pawnBlack.src = "images/pawnGray.png";
        secondPlayersID.style.fontWeight = "bold";
        firstPlayersID.style.fontWeight = "normal";
    }
}

function styleForVictory(player) {
    if (player === Player.FIRST_PLAYER) {
        firstPlayer.style.visibility = "visible";
        secondPlayer.style.visibility = "hidden";
        pawnBlack.src = "images/pawnBlack.png";
        firstPlayersID.style.fontWeight = "bold";
        informativeText.innerHTML = `${firstPlayersID.innerHTML} megnyerte a játékot!`;
    } else if (player === Player.SECOND_PLAYER) {
        firstPlayer.style.visibility = "hidden";
        secondPlayer.style.visibility = "visible";
        pawnWhite.src = "images/pawnWhite.png";
        secondPlayersID.style.fontWeight = "bold";
        informativeText.innerHTML = `${secondPlayersID.innerHTML} megnyerte a játékot!`;
    }
    informativeText.style.fontSize = "2em";
    newGameButton.style.visibility = "visible";
}

function loadSavings() {
    let savedGamesArray = localStorage.getItem("savedGames") ? JSON.parse(localStorage.getItem("savedGames")) : [];
    let statInfosArray = localStorage.getItem("statistics") ? JSON.parse(localStorage.getItem("statistics")) : [];

    savedGames.innerHTML = renderSavedGames(savedGamesArray);
    statInfos.innerHTML = renderStatInfos(statInfosArray);
}

function saveStatistics() {
    let statisticsArray = localStorage.getItem("statistics") ? JSON.parse(localStorage.getItem("statistics")) : [];
    let statistics = statisticsArray.find(stat => stat.firstPlayersName === state.statistics.firstPlayersName && stat.secondPlayersName === state.statistics.secondPlayersName);
    if (statistics === undefined) {
        statistics = {
            firstPlayersName: state.statistics.firstPlayersName,
            secondPlayersName: state.statistics.secondPlayersName,
            firstPlayersWin: state.statistics.firstPlayersWin,
            secondPlayersWin: state.statistics.secondPlayersWin,
        };
    } else {
        const ind = statisticsArray.findIndex(stat => stat.firstPlayersName === state.statistics.firstPlayersName && stat.secondPlayersName === state.statistics.secondPlayersName);
        if (ind !== -1) {
            statisticsArray.splice(ind, 1);
        }

        statistics["firstPlayersWins"] = state.statistics.firstPlayersWins;
        statistics["secondPlayersWins"] = state.statistics.secondPlayersWins;
    }
    statisticsArray.push(statistics);
    localStorage.setItem("statistics", JSON.stringify(statisticsArray));
}