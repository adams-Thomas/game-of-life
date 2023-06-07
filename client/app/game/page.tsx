import GameBoard from "./GameBoard";
import GameControls from "./GameControls";

function Game() {

  return (<>
    <div className="p-10">
      <h1 className="mb-8">
        The main game page
      </h1>

      <div className='flex'>
        <GameBoard />
        <GameControls />
      </div>
    </div>
  </>)
}

export default Game;