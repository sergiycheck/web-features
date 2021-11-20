import React, { useState, useCallback } from "react";

const fruits = ["orange", "apple", "grape"];

function FruitsRadioButtonArr() {
  const [fruit, setFruit] = useState("apple");
  return (
    <div className="App">
      {fruits.map((f, index) => (
        <div key={index}>
          <input
            type="radio"
            name="fruit"
            value={f}
            checked={fruit === f}
            onChange={(e) => setFruit(e.currentTarget.value)}
          />{" "}
          {f}
        </div>
      ))}
      <p>{fruit}</p>
    </div>
  );
}

function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  return (
    <>
      <h1 ref={measuredRef}>Привет, мир</h1>{" "}
      <h2>Заголовок выше имеет высоту {Math.round(height)} пикселей</h2>
    </>
  );
}

export default function ExamplesWithChangingDomElementsWithState() {
  return (
    <React.Fragment>
      <FruitsRadioButtonArr />
      <MeasureExample />
    </React.Fragment>
  );
}
