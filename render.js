export function renderStatInfos(statInfos) {
    return `<ul>${statInfos.map(renderStatInfo).join("")}</ul>`;
}

function renderStatInfo(statInfo) {
    return `
        <li>
            ${statInfo.firstPlayersName} vs. ${statInfo.secondPlayersName} &emsp;&emsp;&emsp; ${statInfo.firstPlayersWins} - ${statInfo.secondPlayersWins}
        </li>
    `;
}



export function renderSavedGames(savedGames) {
    return `<ul>${savedGames.map(renderSavedGame).join("")}</ul>`;
}

function renderSavedGame(savedGame) {
    return `
        <li>
            <button>
                ${savedGame.statistics.firstPlayersName} vs. ${savedGame.statistics.secondPlayersName} &emsp;&emsp;&emsp; ${savedGame.figureCount / 16 * 100}%
            </button>    
        </li>
    `;
}



export function renderStartingPage() {
    return `
        <div id="rules">
            <h2>Játékszabály</h2>
            <p>A játék egy 4x4-es táblán játszódik, ami 4 egyenlő, 2x2-es részre van bontva.<br>A játékhoz négy, egymástól könnyen megkülönböztethető, alakzatot használhatunk, jelen esetben négyzetet, kört, háromszöget és X-et.<br>Mind a két játékosnak minden alakzatból 2-2 bábuja van, így összesen 8 alakzat található meg egy színből.<br>A játék célja az, hogy elsőként helyezzék le a játékosok a negyedik, többitől különböző formát egy sorba, oszlopba, vagy négyzet alakú területre (színtől függetlenül).<br>Ha egy cellára lehelyeztünk egy alakzatot, akkor annak sorába, oszlopába, vagy négyzet alakú területére nem tudja már egyik játékos sem még egyszer ugyanazt az alakzatot letenni.</p>
        </div>

        <div id="inputs">
            Első játékos neve: <input type="text" id="firstPlayersName" value="1. játékos"><br>
            Második játékos neve: <input type="text" id="secondPlayersName" value="2. játékos"><br>
            <button id="start">Start</button>
        </div>

        <div id="saves">
            <h2>Mentett játékok</h2>
            <div id="savedGames"></div>
        </div>

        <div id="stats">
            <h2>Statisztikák</h2>
            <div id="statInfos"></div>
        </div>
    `;
}

export function renderGameArea() {
    return `
        <div id="gameTable"></div>
        <div id="infos">
            <div id="firstPlayer">
                <img id="pawnBlack" src="images/pawnBlack.png" alt="pawnBlack">
                <p id="firstPlayersID">1. játékos</p>
            </div>
            
            <p id="informativeText">vs</p>
            <button id="newGame">Új játék</button>
            
            <div id="secondPlayer">
                <img id="pawnWhite" src="images/pawnWhite.png" alt="pawnWhite">
                <p id="secondPlayersID">2. játékos</p>
            </div>
        </div>
        <div id="firstPlayersFigures">
            <div id="firstPlayersSign">1. játékos</div>
            <div id="firstPlayersCurrentFigures"></div>
        </div>
        <div id="secondPlayersFigures">
            <div id="secondPlayersSign">2. játékos</div>
            <div id="secondPlayersCurrentFigures"></div>
        </div>
    `;
}



export function renderFirstPlayersCurrentFigures(currentFigures) {
    return `<table>${currentFigures.map(renderFirstPlayersFigure).join("")}</table>`;
}

function renderFirstPlayersFigure(figure) {
    return `<tr><img src="images/${figure}Black.png"></tr>`;
}

export function renderSecondPlayersCurrentFigures(currentFigures) {
    return `<table>${currentFigures.map(renderSecondPlayersFigure).join("")}</table>`;
}

function renderSecondPlayersFigure(figure) {
    return `<tr><img src="images/${figure}White.png"></tr>`;
}



export function renderTable(board) {
    return `<table>${board.map(renderRow).join("")}</table>`;
}

function renderRow(row) {
    return `<tr>${row.map(renderField).join("")}</tr>`;
}

function renderField(field) {
    let fieldInnerHTML = ``;
    
    if (field.canStepOn) {
        if (field.item === "") {
            fieldInnerHTML = `<td class="canStepOn"><button></button></td>`;
        } else {
            fieldInnerHTML = `<td class="canStepOn"><img src="images/${field.item}${field.itemColor}.png"></td>`;
        }
    } else {
        if (field.item === "") {
            fieldInnerHTML = `<td></td>`;
        } else {
            fieldInnerHTML = `<td><img src="images/${field.item}${field.itemColor}.png"></td>`;
        }
    }

    return fieldInnerHTML;
}