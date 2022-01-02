import { useState } from "react";
import { useInterval, useAudio } from "react-use";

function Timer({ hour, minute, start, name: outerName, removeTimer }) {
  const [now, setNow] = useState(Date.now());
  const [audio, state, controls, ref] = useAudio({
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    autoPlay: true,
  });
  const [name, setName] = useState(outerName);

  useInterval(() => {
    setNow(Date.now());
  }, 100);

  return (
    <div>
      {now - start < hour * 60 * 60 * 1000 + minute * 60 * 1000 ? (
        <>
          <div>
            {hour - Math.floor((now - start) / 1000 / 60 / 60)}:
            {minute - (Math.floor((now - start) / 1000 / 60) % (60 * 60)) - 1}:
            {`${60 - (Math.floor((now - start) / 1000) % 60) - 1}`.padStart(
              2,
              "0"
            )}
          </div>
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
