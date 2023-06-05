export default function createBoard(rows, cols, bombs) {

    //Initialize new emoty board
    const board = new Array(rows).fill(null).map(() => new Array(cols).fill(null))
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            board[x][y] = {
                value: 0,
                flagged: false,
                revealed: false,
                X: x,
                Y: y
            }
        }
    }

    //Insert bombs at random locations
    for (let _ = 0; _ < bombs; _++) {
        let bomb_X = Math.floor(Math.random() * (rows - 1))
        let bomb_Y = Math.floor(Math.random() * (cols - 1))
        board[bomb_X][bomb_Y].value = "X"
    }

    //Calculating values
    const deltas = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            if (board[x][y].value === "X") continue
            deltas.forEach(([deltaX, deltaY]) => {
                let nextX = x + deltaX
                let nextY = y + deltaY
                if (0 <= nextX && nextX < rows && 0 <= nextY && nextY < cols) {
                    if (board[nextX][nextY].value === "X") {
                        board[x][y].value++
                    }
                }
            })
        }
    }
    return board
}