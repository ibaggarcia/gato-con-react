import './App.css'
import { useState } from 'react'

const TURNS = {
    X: 'x',
    O: 'o'
}



const Square = ({children, isSelected, updateBoard, index}) => {
    
    const className = `square ${isSelected ? 'is-selected' : 'is-not-selected'}`

    const handleClick = () => updateBoard(index)

    return(
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function App() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    const checkWinner = (boardToCheck) => {

        for (const combo of WINNER_COMBOS) {
            const [a, b, c] = combo
            
            if(
                boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[b] === boardToCheck[c]    
            ) {
                return boardToCheck[a]
            }
        }
        
        return null
    }

    const updateBoard = (index) => {

        if(board[index] || winner) return

        const newBoard = [...board]

        newBoard[index] = newBoard[index] ? newBoard[index] : turn
        setBoard(newBoard)

        setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)

        const newWinner = checkWinner(newBoard)
        if(newWinner) {
            setWinner(newWinner)
        }else {
            setWinner(newBoard.every(x => x !== null) ? false : null)
        }
    }

    return(
        <main className='board'>
            <h1 className='title-name'>Juego del gato</h1>
            <section className='game'>
                {
                    board.map((_ ,index) => {
                        return(
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {board[index]}
                            </Square>
                        )
                    })
                }
            </section>

            <section className='turns'>
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>

            <section className='text-turn'>
                <Square isSelected={turn === TURNS.X}>tu turno</Square>
                <Square isSelected={turn === TURNS.O}>tu turno</Square>
            </section>
                
            {
                winner !== null && (
                    <section>
                        <div>
                            <h2>
                                {
                                    winner === false 
                                        ? 'Empate'
                                        : 'Victoria'   
                                }
                            </h2>
                        </div>
                        <header>
                            { winner && <Square>{winner}</Square> }
                        </header>
                        <footer>
                            <button>Nueva partida</button>
                            <button>Reiniciar progreso</button>
                        </footer>
                    </section>
                )
            }
        </main>
    )
}

export default App
