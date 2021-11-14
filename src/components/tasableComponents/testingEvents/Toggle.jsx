import React, { useState } from "react";

export default function Toggle({ onChange }) {
  const [state, setState] = useState(false);
  return (
    <button
      data-testid="toggle"
      className="btn btn-transparent border-primary rounder "
      onClick={() => {
        setState((previousState) => !previousState);
        onChange(!state);
      }}
    >
      {state ? "turn off" : "turn on"}
    </button>
  );
}
