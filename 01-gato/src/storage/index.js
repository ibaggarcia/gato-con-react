export const saveGameLocalStorage = ({ newTurn, newBoard }) => {
    window.localStorage.setItem('turn', newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
}

export const newGameLocalStorage = () => {
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('board') 
    window.localStorage.removeItem('isItWinner')
}

export const restartProgressLocalStorage = ({ score }) => {
    window.localStorage.setItem('score', JSON.stringify(score))
}

export const isItWinnerLocalStorage = ({ newWinner }) => {
    window.localStorage.setItem('isItWinner', JSON.stringify(newWinner))
}

export const scoreLocalStorage = ({ newScore }) => {
    window.localStorage.setItem('score', JSON.stringify(newScore))
}