import { useReducer } from "react";

const actionTypes = {
  increment: "increment",
  decrement: "decrement",
  reset: "reset",
};

function init(initialCount){
	return {count: initialCount};
}

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.increment:
      return {
        ...state,
        count: state.count + 1,
      };
    case actionTypes.decrement:
      return {
        ...state,
        count: state.count - 1,
      };
    case actionTypes.reset:
			const {count} = init(action.payload);
      return {
        ...state,
        count: count,
      };
    default:
      throw new Error("invalid action type");
  }
}

export function CounterWithUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button
        className="btn border rounded border-primary"
        onClick={() => dispatch({ type: actionTypes.increment })}
      >
        increment
      </button>
      <button
        className="btn border rounded border-primary"
        onClick={() => dispatch({ type: actionTypes.decrement })}
      >
        decrement
      </button>
      <button
        className="btn border rounded border-primary"
        onClick={() => dispatch({ type: actionTypes.reset, payload:0 })}
      >
        reset
      </button>
    </>
  );
}
