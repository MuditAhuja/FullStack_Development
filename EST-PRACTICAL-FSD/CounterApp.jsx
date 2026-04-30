import React, { useState } from "react";

function CounterApp() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <button onClick={incrementCount}>
        Increment
      </button>
    </div>
  );
}

export default CounterApp;