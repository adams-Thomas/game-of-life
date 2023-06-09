"use client"

import { KeyboardEvent, KeyboardEventHandler, useState } from "react";
import GameBoard from "./GameBoard";
import GameInstruction from "@/interfaces/GameInstruction";

function Game() {

  const [gridSize, setGridSize] = useState<string>('25')
  const [instruction, setInstruction] = useState<GameInstruction<boolean | number>>({
    type: 'default',
    value: false
  })

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

  return (<>
    <div className="p-10">
      <h1 className="mb-8">
        The main game page
      </h1>

      <div className='flex'>
        <GameBoard instruction={instruction}/>

        <div className='flex flex-col mx-8'>
          <button className='btn mb-8'>
            Next Iteration
          </button>
          <button className='btn mb-8'>
            Run
          </button>
          <button className='btn mb-8'>
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