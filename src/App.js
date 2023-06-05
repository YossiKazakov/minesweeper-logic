import Board from "./components/Board";
import Timer from "./components/Timer";
import RestartButton from "./components/RestartButton";
import { useState } from "react";

function App() {

  const [restartGame, setRestartGame] = useState(false)

  const style = {
    width: 400,
    marginBottom: '2rem',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '80px'
  }
  return (
    <>
      <div style={style}>
        <><RestartButton restart={() => setRestartGame(true)} /></>
        <><Timer /></>
      </div>
      <div>
        <Board restartButtonClicked={restartGame} restarted={() => setRestartGame(false)} />
      </div>
    </>
  )

}

export default App;
