import { useState } from "react";

export const CounterUseState = ({ initialCount = 0 }) => {

  const [count, setCount] = useState(initialCount);
  return (
    <>
			Count: {count}
      <button
        className="btn border rounded border-primary"
        onClick={() => setCount(initialCount)}
      >
        reset
      </button>
      <button
        className="btn border rounded border-primary"
        onClick={() => setCount(prevCount=>prevCount + 1)}
      >
        increment
      </button>
      <button
        className="btn border rounded border-primary"
        onClick={() => setCount(prevCount=> prevCount - 1)}
      >
        decrement
      </button>
    </>
  );
};
