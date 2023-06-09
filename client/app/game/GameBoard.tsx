"use client"

import { useEffect, useState } from "react";
import Cell from "./Cell";
import GameInstruction from "@/interfaces/GameInstruction";
import { runIteration } from "../actions";

interface Props {
  instruction: GameInstruction<boolean | number | number[][]>,
  getBoard: (board: number[][]) => void
}


function GameBoard(props: Props) {
  const { instruction, getBoard } = props;
  const [cells, setCells] = useState<number[][]>(
    Array(25).fill(0).map(row => new Array(25).fill(0))
  );
  useEffect(() => {
    switch (instruction.type) {
      case 'grid_size':
        let grid_size = instruction.value

        if (typeof grid_size !== "number")
          grid_size = 25;

        setCells(Array(+grid_size).fill(0).map(row => new Array(+grid_size).fill(0)));
        break

      case 'grid_reset':
        if (instruction.value === false)
          return
        setCells(
          Array(cells.length).fill(0).map(row => new Array(cells.length).fill(0)));
        break

      case 'new_board':
        if (typeof instruction.value == 'number' || typeof instruction.value == 'boolean')
          return
          
        setCells(instruction.value)
        break
      default:
        return
    }
  }, [instruction, cells.length])



  const cellChange = (newState: number, row: number, col: number) => {
    cells[row][col] = newState
    getBoard(cells)
  }

  return (<>
    <div className="w-fit border-l-[1px] border-b-[1px] border-l-black-cyan border-b-black-cyan">
      {
        cells.map((row, i) => (
          <div className="flex" key={i}>
            {
              row.map((state, ix) => (
                <Cell key={i + ix} initialState={state} row={i} col={ix} stateChanged={cellChange} />))
            }
          </div>)
        )
      }
    </div>
  </>)
}

export default GameBoard