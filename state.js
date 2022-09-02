import { Field } from "./field.js";

const Player = {
    FIRST_PLAYER: 1,
    SECOND_PLAYER: 2,
    NO_PLAYER: 4
};

const GameState = {
    START_GAME: 1,
    NEW_GAME: 2,
    WON_GAME: 4,
    SELECT_FIGURE: 8
};

class AppState {
    width = 4;
    height = 4;
    board = [];
    firstPlayersFigures = [];
    secondPlayersFigures = [];
    currentPlayer = Player.FIRST_PLAYER;
    currentFigure = "";
    currentColor = "";
    winnerPlayer = Player.NO_PLAYER;
    state = GameState.START_GAME;
    figureCount = 0;
}