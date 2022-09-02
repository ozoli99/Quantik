import { renderSavedGames, renderStatInfos } from "./render.js";

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

}

function handleStartButtonClick() {

}

function handleSavedGameClick(event) {

}

function handleFieldLeftClick(event) {

}

function handleFigureLeftClick(event) {

}

function handleNewGameButtonClick() {
    
}

//
// Helper functions
//

function loadSavings() {
    let savedGamesArray = localStorage.getItem("savedGames") ? JSON.parse(localStorage.getItem("savedGames")) : [];
    let statInfosArray = localStorage.getItem("statistics") ? JSON.parse(localStorage.getItem("statistics")) : [];

    savedGames.innerHTML = renderSavedGames(savedGamesArray);
    statInfos.innerHTML = renderStatInfos(statInfosArray);
}