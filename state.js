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

    setCanStepOnByItem(y, x) {
        for (let i = 0; i < 4; ++i) {
            this.board[y][i].canStepOn = false;
            this.board[i][x].canStepOn = false;
        }
        const indY = Math.floor(y/2);
        const indX = Math.floor(x/2);
        if (indY === 0 && indX === 0) {
            this.board[0][0].canStepOn = false;
            this.board[0][1].canStepOn = false;
            this.board[1][0].canStepOn = false;
            this.board[1][1].canStepOn = false;
        } else if (indY === 0 && indX === 1) {
            this.board[0][2].canStepOn = false;
            this.board[0][3].canStepOn = false;
            this.board[1][2].canStepOn = false;
            this.board[1][3].canStepOn = false;
        } else if (indY === 1 && indX === 0) {
            this.board[2][0].canStepOn = false;
            this.board[2][1].canStepOn = false;
            this.board[3][0].canStepOn = false;
            this.board[3][1].canStepOn = false;
        } else if (indY === 1 && indX === 1) {
            this.board[2
            ][2].canStepOn = false;
            this.board[2][3].canStepOn = false;
            this.board[3][2].canStepOn = false;
            this.board[3][3].canStepOn = false;
        }
    }

    step(x, y) {
        if (!this.board[x][y].canStepOn) return;
        if (this.currentPlayer === Player.FIRST_PLAYER && this.currentColor === "White") return;
        if (this.currentPlayer === Player.SECOND_PLAYER && this.currentColor === "Black") return;

        this.board[x][y].item = this.currentFigure;
        this.board[x][y].itemColor = this.currentColor;
        if (this.currentPlayer === Player.FIRST_PLAYER) {
            const index = this.firstPlayersFigures.indexOf(this.currentFigure);
            if (index > -1) this.firstPlayersFigures.splice(index, 1);
        } else {
            const index = this.secondPlayersFigures.indexOf(this.currentFigure);
            if (index > -1) this.secondPlayersFigures.splice(index, 1);
        }

        this.clearCanStepOn();

        this.figureCount++;
        this.currentPlayer = this.currentPlayer === Player.FIRST_PLAYER ? Player.SECOND_PLAYER : Player.FIRST_PLAYER;
    }

    clearCanStepOn() {
        for (let y = 0; y < 4; ++y) {
            for (let x = 0; x < 4; ++x) {
                this.board[y][x].canStepOn = true;
            }
        }
    }

    checkForVictory(x, y) {
        let figuresVertical = [];
        let figuresHorizontal = [];
        let figuresSquare = [];
        
        for (let i = 0; i < 4; ++i) {
            figuresVertical.push(this.board[x][i].item);
            figuresHorizontal.push(this.board[i][y].item);
        }
        const indY = Math.floor(y/2);
        const indX = Math.floor(x/2);
        if (indX === 0 && indY === 0) {
            figuresSquare.push(this.board[0][0].item);
            figuresSquare.push(this.board[0][1].item);
            figuresSquare.push(this.board[1][0].item);
            figuresSquare.push(this.board[1][1].item);
        } else if (indX === 0 && indY === 1) {
            figuresSquare.push(this.board[0][2].item);
            figuresSquare.push(this.board[0][3].item);
            figuresSquare.push(this.board[1][2].item);
            figuresSquare.push(this.board[1][3].item);
        } else if (indX === 1 && indY === 0) {
            figuresSquare.push(this.board[2][0].item);
            figuresSquare.push(this.board[2][1].item);
            figuresSquare.push(this.board[3][0].item);
            figuresSquare.push(this.board[3][1].item);
        } else if (indX === 1 && indY === 1) {
            figuresSquare.push(this.board[2][2].item);
            figuresSquare.push(this.board[2][3].item);
            figuresSquare.push(this.board[3][2].item);
            figuresSquare.push(this.board[3][3].item);
        }

        figuresVertical = [... new Set(figuresVertical)];
        figuresHorizontal = [... new Set(figuresHorizontal)];
        figuresSquare = [... new Set(figuresSquare)];

        if ((figuresVertical.length === 4 && !figuresVertical.includes("")) || (figuresHorizontal.length === 4 && !figuresHorizontal.includes("")) || (figuresSquare.length === 4 && !figuresSquare.includes(""))) {
            this.state = GameState.WON_GAME;
            this.winnerPlayer = this.currentPlayer === Player.FIRST_PLAYER ? Player.SECOND_PLAYER : Player.FIRST_PLAYER;
            this.statistics["firstPlayersWins"] = this.winnerPlayer === Player.FIRST_PLAYER ? this.statistics["firstPlayersWins"] + 1 : this.statistics["firstPlayersWins"];
            this.statistics["secondPlayersWins"] = this.winnerPlayer === Player.SECOND_PLAYER ? this.statistics["secondPlayersWins"] + 1 : this.statistics["secondPlayersWins"];
            return true;
        }
        return false;
    }
}