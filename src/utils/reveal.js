export function revealBlockAndSurroundings(board, x, y) {
    const rows = board.length
    const cols = board.length
    const queue = []
    queue.push([x, y])
    while (queue.length > 0) {
        const [currRow, currCol] = queue.shift()
        if (
            0 <= currRow && currRow < rows &&
            0 <= currCol && currCol < cols &&
            !board[currRow][currCol].revealed &&
            board[currRow][currCol].value !== "X"
        ) {
            board[currRow][currCol] = { ...board[currRow][currCol], revealed: true }

            if (board[currRow][currCol].value === 0) {
                queue.push([currRow - 1, currCol])
                queue.push([currRow + 1, currCol])
                queue.push([currRow, currCol + 1])
                queue.push([currRow, currCol - 1])
            }
        }
    }
    return board
}

export function revealBombs(board) {
    return board.map((row) => row.map((block) => {
        if (block.value === "X") {
            block = { ...block, revealed: true }
        }
        return block
    }))
}