import { useState } from "react";
import { fixTime, clamp } from "../util";

const defaultValues = {
  hour: "00",
  minute: "00",
  name: "Timer",
};

function TimerForm({ createTimer = () => {} }) {
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

  const adjustHour = (newHour) =>
    setHour((oldHour) =>
      fixTime(
        clamp(
          typeof newHour === "function" ? newHour(oldHour) : newHour,
          0,
          99
        ) || 0
      )
    );
  const adjustMinute = (newMinute) =>
    setMinute((oldMinute) =>
      fixTime(
        clamp(
          typeof newMinute === "function" ? newMinute(oldMinute) : newMinute,
          0,
          59
        ) || 0
      )
    );

  const updateHour = ({ target: { value: newValue } }) => {
    adjustHour(newValue);
  };
  const updateMinute = ({ target: { value: newValue } }) => {
    if (newValue < 0) {
      if (hour > 0) {
        adjustHour((oldHour) => +oldHour - 1);
        adjustMinute(59);
      }
    } else {
      adjustHour((oldHour) => +oldHour + Math.floor(+newValue / 60));
      adjustMinute(+newValue % 60);
    }
  };

  return (
    <form onSubmit={submit}>
      <h1>Create Timer</h1>
      <div className="timer-face">
        <input value={hour} onChange={updateHour} />
        :
        <input value={minute} onChange={updateMinute} />
      </div>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button type="submit">Start</button>
    </form>
  );
}

export default TimerForm;
