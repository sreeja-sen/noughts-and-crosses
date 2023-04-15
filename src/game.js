import { useState } from "react";


function checkForWinner(tiles) {
    const possibleWins = [
        [0, 1, 2], // row 1
        [3, 4, 5], // row 2
        [6, 7, 8], // row 3
        [0, 3, 6], // col 1
        [1, 4, 7], // col 2
        [2, 5, 8], // col 3
        [0, 4, 8], // diagonal 1
        [2, 4, 6]  // diagonal 2
    ];
    for (let i = 0; i < possibleWins.length; i++) {
        const [a, b, c] = possibleWins[i];
        if (tiles[a] && tiles[a] == tiles[b] && tiles[a] == tiles[c]) {
            return tiles[a];
        }
    }
    return false;
}


function Tile({ value, setValue }) {
    return <button onClick={setValue}>{value}</button>;
}



function Board({tiles, handleTurn}) {
    return <>
        <div className="row">
            <Tile value={tiles[0]} setValue={() => handleTurn(0)} />
            <div className="top"><Tile value={tiles[1]} setValue={() => handleTurn(1)}/></div>
            <Tile value={tiles[2]} setValue={() => handleTurn(2)} />
        </div>
        <div className="row">
            <div id="middle"><Tile value={tiles[3]} setValue={() => handleTurn(3)} /></div>
            <div className="top" id="middle"><Tile value={tiles[4]} setValue={() => handleTurn(4)} /></div>
            <div id="middle"><Tile value={tiles[5]} setValue={() => handleTurn(5)} /></div>
        </div>
        <div className="row">
            <Tile value={tiles[6]} setValue={() => handleTurn(6)} />
            <div className="top"><Tile value={tiles[7]} setValue={() => handleTurn(7)} /></div>
            <Tile value={tiles[8]} setValue={() => handleTurn(8)} />
        </div>
    </>
}

export function Game() {
    const [history, setHistory] = useState([["", "", "", "", "", "", "", "", ""]])
    const tiles = history[history.length - 1];
    const [xTurnNext, setXTurnNext] = useState(true);

    let infoText = "";
    const winner = checkForWinner(tiles);
    if (winner) {
        infoText = <span>{winner + " has won!"}</span>;
    } else {
        infoText = "Next turn: " + (xTurnNext ? "x" : "o");
    }

    function handleTurn(index) {
        if (tiles[index] || winner) {
            return;
        }

        const nextTiles = tiles.slice();
        if (xTurnNext) {
            nextTiles[index] = "x";
            setXTurnNext(false);
        } else {
            nextTiles[index] = "o";
            setXTurnNext(true);
        }
        setHistory([...history, nextTiles]);
    }

    function handleTimetravel(event) {
        // Finds which button was clicked on (1-9)
        const parent = event.target.parentNode;
        const list = parent.parentNode;
        const moveNumber = Array.from(list.childNodes).indexOf(parent);
        
        const newHistory = history.slice(0, moveNumber + 1);
        setHistory(newHistory);
        if (moveNumber % 2) {
            setXTurnNext(true);
        } else {
            setXTurnNext(false)
        }
    }

    return <div className="game">
        <div>
            <h2>Noughts and Crosses</h2>
            <Board tiles={tiles} handleTurn={handleTurn} />
            <p>{infoText}</p>
        </div>
        <div>
            <ol>
                {history.map(function (tiles, moveNumber) {
                    return <li key={moveNumber}>
                        <button onClick={handleTimetravel}>Move #{moveNumber}</button>
                    </li>
                })}
            </ol>
        </div>
    </div>
}
