import { Square } from "./Square"

export const WinnerModal = ({ winner, SCORE, newGame, restartProgress}) => {
    
    if(winner === null) return null
    const winnerText = winner === false ? 'Empate' : 'Victoria!'

    return(
        <section className='modal-win'>
            <div className='title-result'>
                <h2>{winnerText}</h2>
                <h3>{ `${SCORE.X} - ${SCORE.O}` }</h3>
            </div>

            <header className='winner-icon'>
                <Square>{ winner === false ? '=' : winner }</Square>
            </header>
            
            <footer className='modal-options'>
                <button onClick={newGame} className='new-game'>Nueva partida</button>
                <button onClick={restartProgress} className='restart-progress'>Reiniciar progreso</button>
            </footer>
        </section>
    )
}