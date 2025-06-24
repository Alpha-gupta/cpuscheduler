import React from "react";

const Controls = ({ algorithm, setAlgorithm, quantum, setQuantum, runScheduling }) => {
  return (
    <div>
      <select className="form-select" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <option value="SJF">SJF</option>
        <option value="RR">Round Robin</option>
      </select>
      {algorithm === "RR" && (
        <input
          className="form-input"
          type="number"
          placeholder="Quantum"
          value={quantum}
          onChange={(e) => setQuantum(+e.target.value)}
        />
      )}
      <button className="form-button" onClick={runScheduling}>Simulate</button>
    </div>
  );
};

export default Controls;
