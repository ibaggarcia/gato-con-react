import { WINNER_COMBOS } from "../constants.js"

export const checkWinner = (boardToCheck) => {

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
    
    const isItDraw = boardToCheck.every(x => x !== null) ? false : null
    return isItDraw
}
