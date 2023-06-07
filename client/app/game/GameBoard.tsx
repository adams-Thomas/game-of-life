import Cell from "./Cell";

const cells = Array(50).fill(0).map(row => new Array(50).fill(1))

function GameBoard() {
  return (<>
    <div className="w-fit border-l-[1px] border-b-[1px] border-l-black-cyan border-b-black-cyan">
      {
        cells.map((row, i) => (<div className="flex" key={i}>{row.map((_, ix) => (<Cell key={i + ix} />))}</div>))
      }
    </div>
  </>)
}

export default GameBoard