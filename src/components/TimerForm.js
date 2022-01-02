import { useState } from "react";
import { useCss } from "react-use";

const defaultValues = {
  hour: "0",
  minute: "00",
  name: "Timer",
};

function TimerForm({ createTimer = () => {} }) {
  const inputClass = useCss({
    width: "2rem",
  });

  const [hour, setHour] = useState(defaultValues.hour);
  const [minute, setMinute] = useState(defaultValues.minute);
  const [name, setName] = useState(defaultValues.name);

  const returnToDefaults = () => {
    setHour(defaultValues.hour);
    setMinute(defaultValues.minute);
    setName(defaultValues.name);
  };

  const submit = (e) => {
    e.preventDefault();
    createTimer(hour, minute, name);
    returnToDefaults();
  };

  const updateHour = ({ target: { value: newValue } }) => {
    setHour(newValue);
  };
  const updateMinute = ({ target: { value: newValue } }) => {
    if (newValue < 0) {
      if (hour > 0) {
        setHour((oldHour) => +oldHour - 1);
        setMinute(59);
      }
    } else {
      setHour((oldHour) => +oldHour + Math.floor(+newValue / 60));
      setMinute(`${newValue % 60}`.padStart(2, "0"));
    }
  };

  return (
    <form onSubmit={submit}>
      <h1>Create Timer</h1>
      <div>
        <input
          type="number"
          min="0"
          value={hour}
          onChange={updateHour}
          className={inputClass}
        />
        :
        <input
          type="number"
          value={minute}
          onChange={updateMinute}
          className={inputClass}
        />
      </div>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button type="submit">Start</button>
    </form>
  );
}

export default TimerForm;
