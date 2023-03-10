import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Game from "./Components/Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App bg-red-300">
      <Game />
    </div>
  );
}

export default App;
