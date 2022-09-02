import { Field } from "./field.js";

export const Player = {
    FIRST_PLAYER: 1,
    SECOND_PLAYER: 2,
    NO_PLAYER: 4
};

export const GameState = {
    START_GAME: 1,
    NEW_GAME: 2,
    WON_GAME: 4,
    SELECT_FIGURE: 8
};

export class AppState {
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
    statistics = {
        firstPlayersName: "",
        secondPlayersName: "",
        firstPlayersWins: 0,
        secondPlayersWins: 0
    };

    init(firstPlayersName, secondPlayersName) {
        this.board = [];
        for (let y = 0; y < this.width; ++y) {
            this.board[y] = [];
            for (let x = 0; x < this.height; ++x) {
                this.board[y][x] = new Field();
            }
        }

        this.firstPlayersFigures = ["square", "square", "circle", "circle", "triangle", "triangle", "x", "x"];
        this.secondPlayersFigures = ["square", "square", "circle", "circle", "triangle", "triangle", "x", "x"];

        this.currentFigure = "";
        this.currentPlayer = Player.FIRST_PLAYER;
        this.currentColor = "Black";
        this.state = GameState.START_GAME;
        this.figureCount = 0;

        this.statistics["firstPlayersName"] = firstPlayersName;
        this.statistics["secondPlayersName"] = secondPlayersName;
    }

    load(stateToLoad) {
        this.board = stateToLoad.board;

        this.firstPlayersFigures = stateToLoad.firstPlayersFigures;
        this.secondPlayersFigures = stateToLoad.secondPlayersFigures;

        this.currentFigure = stateToLoad.currentFigure;
        this.currentPlayer = stateToLoad.currentPlayer;
        this.currentColor = stateToLoad.currentColor;
        this.state = stateToLoad.state;
        this.figureCount = stateToLoad.figureCount;

        this.statistics["firstPlayersName"] = stateToLoad.statistics["firstPlayersName"];
        this.statistics["secondPlayersName"] = stateToLoad.statistics["secondPlayersName"];
    }

    showPossibleSteps(imgSource) {
        this.state = GameState.SELECT_FIGURE;

        if (this.currentPlayer === Player.FIRST_PLAYER) {
            if (imgSource === "squareBlack.png") {
                this.currentFigure = "square";
                this.currentColor = "Black";
            } else if (imgSource === "circleBlack.png") {
                this.currentFigure = "circle";
                this.currentColor = "Black";
            } else if (imgSource === "triangleBlack.png") {
                this.currentFigure = "triangle";
                this.currentColor = "Black";
            } else if (imgSource === "xBlack.png") {
                this.currentFigure = "x";
                this.currentColor = "Black";
            } else {
                return;
            }
        } else {
            if (imgSource === "squareWhite.png") {
                this.currentFigure = "square";
                this.currentColor = "White";
            } else if (imgSource === "circleWhite.png") {
                this.currentFigure = "circle";
                this.currentColor = "White";
            } else if (imgSource === "triangleWhite.png") {
                this.currentFigure = "triangle";
                this.currentColor = "White";
            } else if (imgSource === "xWhite.png") {
                this.currentFigure = "x";
                this.currentColor = "White";
            } else {
                return;
            }
        }
        
        for (let y = 0; y < 4; ++y) {
            for (let x = 0; x < 4; ++x) {
                if (this.board[y][x].item === this.currentFigure) {
                    this.setCanStepOnByItem(y, x);
                }
            }
        }
    }
}