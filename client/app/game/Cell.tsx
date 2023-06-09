"use client"

import { useEffect, useState } from "react"

interface Props {
  stateChanged: (state: number, row: number, col: number) => void,
  initialState: number,
  row: number,
  col: number
}

function Cell(props: Props) {
  const [state, setState] = useState<number>(0)
  const { stateChanged, initialState, row, col } = props;

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  const setCellState = () => {
    setState(
      state === 0 ? 1 : 0
    )
    stateChanged(state === 0 ? 1 : 0, row, col)
  }

  return (<div className={`cell cell_${state}`} onClick={setCellState}></div>)
}

export default Cell
