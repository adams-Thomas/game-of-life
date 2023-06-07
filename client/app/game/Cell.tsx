"use client"

import { useState } from "react"

function Cell() {
  const [state, setState] = useState<string>('dead')

  const setCellState = () => {
    setState(
      state === 'dead' ? 'alive' : 'dead'
    )
  }

  return (<div className={`cell cell_${state}`} onClick={setCellState}></div>)
}

export default Cell
