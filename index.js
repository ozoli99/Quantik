import { renderSavedGames, renderStatInfos } from "./render.js";

const localStorage = window.localStorage;

let savedGames = document.querySelector("#savedGames");
let statInfos = document.querySelector("#statInfos");
let firstPlayersInput = document.querySelector("#firstPlayersName");
let secondPlayersInput = document.querySelector("#secondPlayersName");
let startButton = document.querySelector("#start");

//
// Helper functions
//

function loadSavings() {
    let savedGamesArray = localStorage.getItem("savedGames") ? JSON.parse(localStorage.getItem("savedGames")) : [];
    let statInfosArray = localStorage.getItem("statistics") ? JSON.parse(localStorage.getItem("statistics")) : [];

    savedGames.innerHTML = renderSavedGames(savedGamesArray);
    statInfos.innerHTML = renderStatInfos(statInfosArray);
}