"use client"

import { KeyboardEvent, KeyboardEventHandler, useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import GameInstruction from "@/interfaces/GameInstruction";
import { runIteration } from "../actions";

function Game() {

  const [gridSize, setGridSize] = useState<string>('25')
  const [board, setBoard] = useState<number[][]>()
  const [instruction, setInstruction] = useState<GameInstruction<boolean | number>>({
    type: 'default',
    value: false
  })

  const onDisconnect = () => {
    console.log('Hello')
  }

  // useEffect(() => {
  //   socket.addEventListener("open", (e) => {
  //     console.log('hello there')
  //   })
  // }, [])

  const changeGrid = () => {
    setInstruction({
      type: 'grid_size',
      value: +gridSize
    })
  }

  const enterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      changeGrid()
    }
  }

  const resetGrid = () => {
    setInstruction({
      type: 'grid_reset',
      value: true
    })
  }

  const singleIter = async () => {
    try {
      if (!board)
        return

      const res = await fetch("http://localhost:8080/single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          board
        })
      })

      const newBoard = await res.json()
      setBoard(newBoard.board)
      setInstruction({
        type: 'new_board',
        value: newBoard.board
      })
    } catch (error) {
      console.error(error)
    }
  }

  const startGame = async () => {
    try {
      if (!board)
        return

      const socket = new WebSocket('ws://localhost:8080/ws')

      socket.onopen = async () => {
        const res = await fetch("http://localhost:8080/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            board
          })
        })
      }

      socket.onmessage = (e: MessageEvent) => {
        blobReader(e.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const blobReader = (data: any) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      if (!e.target)
        return

      const boardString = e.target.result
      if (!boardString)
        return

      const boardObj = JSON.parse(boardString as string)
      setBoard(boardObj.board)
      setInstruction({
        type: 'new_board',
        value: boardObj.board
      })
    })

    reader.readAsText(data)
  }

  const stopGame = async () => {
    try {
      const res = await fetch("http://localhost:8080/stop", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (<>
    <div className="p-10">
      <h1 className="mb-8">
        The main game page
      </h1>

      <div className='flex'>
        <GameBoard instruction={instruction} getBoard={setBoard} />

        <div className='flex flex-col mx-8'>
          <button className='btn mb-8' onClick={singleIter}>
            Next Iteration
          </button>
          <button className='btn mb-8' onClick={startGame}>
            Run
          </button>
          <button className='btn mb-8' onClick={stopGame}>
            Stop
          </button>
          <button className='btn' onClick={resetGrid}>
            Reset
          </button>

          <div className="mt-8">
            <label>Grid Size: </label>
            <input onKeyDown={enterPressed} className="w-10 mr-8" value={gridSize} onChange={e => setGridSize(e.target.value)} type="number" />
            <button onClick={changeGrid} className="btn btn-small">Save</button>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Game;