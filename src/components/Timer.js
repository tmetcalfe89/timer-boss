import { useState } from "react";
import { useInterval, useAudio } from "react-use";

function Timer({ hour, minute, start, name: outerName, removeTimer }) {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000) * 1000);
  const [audio, state, controls, ref] = useAudio({
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    autoPlay: true,
  });
  const [name, setName] = useState(outerName);

  useInterval(() => {
    setNow(Math.floor(Date.now() / 1000) * 1000);
  }, 100);

  const getTargetTime = () =>
    hour * 60 * 60 * 1000 + minute * 60 * 1000 + start;
  const getElapsedTime = () => getTargetTime() - now;
  const isTimeRemaining = () => now - start < getTargetTime();
  const getRemainingHours = () => Math.floor(getElapsedTime() / 1000 / 60 / 60);
  const getRemainingMinutes = () =>
    Math.floor(getElapsedTime() / 1000 / 60) % 60;
  const getRemainingSeconds = () => Math.floor(getElapsedTime() / 1000) % 60;
  const getTimeDisplay = () =>
    `${getRemainingHours()}:${getRemainingMinutes()
      .toString()
      .padStart(2, "0")}:${getRemainingSeconds().toString().padStart(2, "0")}`;

  return (
    <div>
      {isTimeRemaining() ? (
        <>
          <div>{getTimeDisplay()}</div>
          <div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
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
