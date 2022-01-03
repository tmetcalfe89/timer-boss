import TimerForm from "./components/TimerForm";
import Timers from "./components/Timers";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "react-use";

function App() {
  const [timers, setTimers] = useLocalStorage("timers", []);

  const createTimer = (hour, minute, name) => {
    setTimers([
      ...timers,
      { hour: +hour, minute: +minute, start: Date.now(), name, id: uuid() },
    ]);
  };

  const modifyTimer = (modifications, id) => {
    setTimers(
      timers.map((timer) =>
        timer.id === id ? { ...timer, ...modifications } : timer
      )
    );
  };

  const removeTimer = (removeId) => {
    setTimers(timers.filter(({ id }) => id !== removeId));
  };

  return (
    <div className="App">
      <TimerForm createTimer={createTimer} />
      <Timers
        timers={timers}
        removeTimer={removeTimer}
        modifyTimer={modifyTimer}
      />
    </div>
  );
}

export default App;
