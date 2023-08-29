import './App.css'
import { useState } from 'react'

const TURNS = {
    X: 'x',
    O: 'o'
}



const Square = ({children, isSelected, updateBoard, index}) => {
    
    const className = `square ${isSelected ? 'is-selected' : 'is-not-selected'}`

    const handleClick = () => {
        updateBoard(index)
    }

    return(
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

function App() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)

    const updateBoard = (index) => {

        if(board[index]) return

        const newBoard = [...board]

        newBoard[index] = newBoard[index] ? newBoard[index] : turn
        setBoard(newBoard)

        setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
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
        </main>
    )
}

export default App
