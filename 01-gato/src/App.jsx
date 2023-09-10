import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { TURNS, SCORE } from './constants.js'
import { checkWinner } from './logic/board.js'
import { saveGameLocalStorage, newGameLocalStorage, restartProgressLocalStorage, isItWinnerLocalStorage, scoreLocalStorage } from './storage/index.js'

function App() {
    const [board, setBoard] = useState( () => {
        const boardLocalStorage = window.localStorage.getItem('board')
        return boardLocalStorage ? JSON.parse(boardLocalStorage) : Array(9).fill(null)
    })
    
    const [turn, setTurn] = useState( () => {
        const turnLocalStorage = window.localStorage.getItem('turn')
        return turnLocalStorage ?? TURNS.X
    })
    
    const [winner, setWinner] = useState( () => {
        const winnerLocalStorage = window.localStorage.getItem('isItWinner')
        return winnerLocalStorage === "false" ? false : JSON.parse(winnerLocalStorage)
    })

    const [score, setScore] = useState( () => {
        const scoreLocalStorage = window.localStorage.getItem('score')
        return scoreLocalStorage ? JSON.parse(scoreLocalStorage) : SCORE
    })


    const updateBoard = (index) => {

        if(board[index] || winner) return

        const newBoard = [...board]

        newBoard[index] = newBoard[index] ? newBoard[index] : turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        saveGameLocalStorage({
            newTurn: newTurn,
            newBoard: newBoard
        })

        const newScore = score
        const newWinner = checkWinner(newBoard)

        if(newWinner) {
            setWinner(newWinner)
            isItWinnerLocalStorage({ newWinner: newWinner})
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 }
              });
            newWinner == TURNS.X ? newScore.X++ : newScore.O++
            setScore(newScore)
            scoreLocalStorage({ newScore: newScore })
        }else {
            setWinner(newWinner)
            isItWinnerLocalStorage({ newWinner: newWinner})
        }        
    }

    const newGame = () => {
        setWinner(null)
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        newGameLocalStorage()
    }

    const restartProgress = () => {
        score.X = 0
        score.O = 0
        restartProgressLocalStorage({ score: score})
        newGame()
    }

    return(
        <main className='board'>
            <h1 className='title-name'>Juego del gato con React</h1>
            <h2 className='score'>{`${score.X} - ${score.O}`}</h2>
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
            <WinnerModal 
                winner={winner}
                SCORE={score}
                newGame={newGame}
                restartProgress={restartProgress}
            /> 
        </main>
    )
}

export default App
