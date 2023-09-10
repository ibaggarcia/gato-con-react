export const Square = ({children, isSelected, updateBoard, index}) => {
    
    const className = `square ${isSelected ? 'is-selected' : 'is-not-selected'}`

    const handleClick = () => {
        if(index != null) updateBoard(index)
    }

    return(
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}