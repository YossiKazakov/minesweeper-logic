import React, { useState, useCallback, useEffect, useRef } from 'react'
import createBoard from '../utils/create-board'
import { revealBlockAndSurroundings, revealBombs } from '../utils/reveal'
import { ROWS, COLS, BOMBS } from '../utils/constants'
import Block from './Block'

//For testing
// eslint-disable-next-line no-unused-vars
const printBoard = (board) => {
    const boardValues = board.map(row => row.map(cell => cell.value))
    console.table(boardValues)
}


export default function Board({ restartButtonClicked, restarted }) {
    //Reference to the board
    const board = useRef(createBoard(ROWS, COLS, BOMBS))
    printBoard(board.current)

    //Force re-rendering mechanisem
    const [, reRender] = useState()
    const forceReRender = useCallback(() => reRender({}), [])

    //Boolean state indicating whether the game ended (win or lose) 
    const [gameOver, setGameOver] = useState(false)

    //Flagging logic, passed as a prop to Block for it to dispatch it on-right-click
    //A callBack function, so it wont be re-declared every time.
    //Depends on gameOver state
    const flagBlock = useCallback((e, x, y) => {
        e.preventDefault()
        if (gameOver) {
            return
        }
        const newBoard = [...board.current]
        newBoard[x][y] = { ...newBoard[x][y], flagged: !newBoard[x][y].flagged }
        board.current = newBoard
        forceReRender()
    }, [gameOver, forceReRender])

    //Revealing logic, based on BFS
    //A callBack function, so it wont be re-declared every time.
    //Depends on gameOver state
    const revealLogic = useCallback((x, y) => {
        if (gameOver) {
            return
        }
        const block = board.current[x][y]
        if (block.revealed) {
            return
        }
        if (block.value === "X") {
            setGameOver(true)
            const newBoard = (revealBombs([...board.current], x, y))
            board.current = newBoard
            forceReRender()
        }
        else {
            const newBoard = (revealBlockAndSurroundings([...board.current], x, y))
            board.current = newBoard
            forceReRender()
        }
    }, [gameOver, forceReRender])

    //Restart logic 
    useEffect(() => {
        board.current = createBoard(ROWS, COLS, BOMBS)
        setGameOver(false)
        return () => restarted()
    }, [restartButtonClicked, restarted])

    return board.current.map((row, r) => {
        return <div key={r} style={{ display: 'flex' }}>
            {row.map((block, c) =>
                <div key={[r, c]}>
                    <Block
                        details={block}
                        flagSelf={flagBlock}
                        revealSelfAndSurroundings={revealLogic}
                    />
                </div>
            )}
        </div>
    }
    )
}

