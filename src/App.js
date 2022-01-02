import { useState } from "react";
import TimerForm from "./components/TimerForm";
import Timers from "./components/Timers";
import { v4 as uuid } from "uuid";

function App() {
  const [timers, setTimers] = useState([]);

  const createTimer = (hour, minute, name) => {
    setTimers([
      ...timers,
      { hour: +hour, minute: +minute, start: Date.now(), name, id: uuid() },
    ]);
  };

  const removeTimer = (removeId) => {
    setTimers(timers.filter(({ id }) => id !== removeId));
  };

  return (
    <div className="App">
      <TimerForm createTimer={createTimer} />
      <Timers timers={timers} removeTimer={removeTimer} />
    </div>
  );
}

export default App;
