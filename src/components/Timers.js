import React from "react";
import Timer from "./Timer";

function Timers({ timers, removeTimer, modifyTimer }) {
  return (
    <div>
      <h1>Active Timers</h1>
      {timers.map(({ id, ...timer }) => (
        <Timer
          key={`timer-${id}`}
          {...timer}
          removeTimer={() => removeTimer(id)}
          modifyTimer={(modifications) => modifyTimer(modifications, id)}
        />
      ))}
    </div>
  );
}

export default Timers;
