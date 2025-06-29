import React from "react";
import "./Form.css";

const Controls = ({ algorithm, setAlgorithm, quantum, setQuantum, runScheduling }) => {
  return (
    <div className="form">
      <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <option value="SJF">SJF</option>
        <option value="RR">Round Robin</option>
      </select>

      {algorithm === "RR" && (
        <input
          type="number"
          placeholder="Quantum"
          value={quantum}
          onChange={(e) => setQuantum(Number(e.target.value))}
        />
      )}

      <button className="form-button simulate" onClick={runScheduling}>Simulate</button>
    </div>
  );
};

export default Controls;
