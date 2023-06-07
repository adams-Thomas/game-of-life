function GameControls() {
  return (<div className='flex flex-col mx-8'>
    <button className='btn mb-8'>
      Next Iteration
    </button>
    <button className='btn mb-8'>
      Run
    </button>
    <button className='btn mb-8'>
      Stop
    </button>
    <button className='btn'>
      Reset
    </button>
  </div>)
}

export default GameControls;