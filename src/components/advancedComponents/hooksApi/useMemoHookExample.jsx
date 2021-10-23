import React, { useState, useMemo } from "react";

export const CounterWithMemo = () => {
  const [count, setCount] = useState(0);
  const [evenNum, setEvenNum] = useState(2);

  // const evenNumDouble = () => {
  //   console.log("rendering double double");
  //   return evenNum * 2;
  // };

  const memoEvenNumDouble = useMemo(
    function evenNumDouble() {
      console.log(`rendering double ${evenNum} with useMemo`);
      return evenNum * 2;
    },
    [evenNum]
  );

  return (
    <div>
      <h4>Counter: {count}</h4>
      <h5>Even Numbers: {evenNum}</h5>
      <h6>even number doubled value: {memoEvenNumDouble}</h6>
      <p>when clicking increment and decrement memoEvenNumDouble not rendering</p>
      <button
        className="btn border rounded border-primary"
        onClick={() => setCount(count + 1)}
      >
        increment
      </button>
      <button
        className="btn border rounded border-primary"
        onClick={() => setCount(count - 1)}
      >
        decrement
      </button>
      <button
        className="btn border rounded border-primary"
        onClick={() => setEvenNum(evenNum + 2)}
      >
        set even num + 2
      </button>
    </div>
  );
};
