import { useState } from "react";
import { useInterval, useAudio } from "react-use";
import { fixTime } from "../util";

function Timer({ hour, minute, start, name, removeTimer, modifyTimer }) {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000) * 1000);
  const [audio] = useAudio({
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    autoPlay: true,
  });

  useInterval(() => {
    setNow(Math.floor(Date.now() / 1000) * 1000);
  }, 100);

  const getTargetTime = () =>
    hour * 60 * 60 * 1000 + minute * 60 * 1000 + start;
  const getElapsedTime = () => getTargetTime() - now;
  const isTimeRemaining = () => now < getTargetTime();
  const getRemainingHours = () =>
    fixTime(Math.floor(getElapsedTime() / 1000 / 60 / 60));
  const getRemainingMinutes = () =>
    fixTime(Math.floor(getElapsedTime() / 1000 / 60) % 60);
  const getRemainingSeconds = () =>
    fixTime(Math.floor(getElapsedTime() / 1000) % 60);
  const getTimeDisplay = () => (
    <>
      <span>{getRemainingHours()}</span>:<span>{getRemainingMinutes()}</span>:
      <span>{getRemainingSeconds()}</span>
    </>
  );

  return (
    <div>
      {isTimeRemaining() ? (
        <>
          <div className="timer-face">{getTimeDisplay()}</div>
          <div>
            <input
              value={name}
              onChange={({ target: { value: name } }) => modifyTimer({ name })}
            />
          </div>
        </>
      ) : (
        <>
          <div>{name} timer complete.</div>
          {audio}
        </>
      )}
      <button onClick={removeTimer}>x</button>
    </div>
  );
}

export default Timer;
