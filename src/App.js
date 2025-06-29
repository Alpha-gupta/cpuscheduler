import React, { useState } from "react";
import ProcessForm from "./components/ProcessForm";
import Controls from "./components/Controls";
import Timeline from "./components/Timeline";
import { sjf } from "./algorithms/sjf";
import { roundRobin } from "./algorithms/roundRobin";
import "./App.css";

// Track interval globally to avoid duplicates
let animationInterval = null;

const App = () => {
  const [processes, setProcesses] = useState([]);
  const [result, setResult] = useState([]);
  const [algorithm, setAlgorithm] = useState("SJF");
  const [quantum, setQuantum] = useState(2);

  // Add process only if PID is unique
  const addProcess = (process) => {
    const exists = processes.find(p => p.pid === process.pid);
    if (exists) {
      alert("PID must be unique.");
      return;
    }
    setProcesses([...processes, process]);
  };

  const deleteProcess = (index) => {
    const updated = [...processes];
    updated.splice(index, 1);
    setProcesses(updated);
  };

  const resetProcesses = () => {
    setProcesses([]);
    setResult([]);
  };

  const simulateWithAnimation = (steps) => {
  let index = -1;

  if (animationInterval) {
    clearInterval(animationInterval);
  }

  // Delay clear, then start interval
  setTimeout(() => {
    setResult([]); // clear after 100ms
    setTimeout(() => {
      animationInterval = setInterval(() => {
        setResult((prev) => [...prev, steps[index]]);
        index++;
        if (index >= steps.length) {
          clearInterval(animationInterval);
          animationInterval = null;
        }
      }, 1000);
    }, 50); // short delay to ensure clear happened
  }, 100);
  console.log("Animation cleared and started", steps);
  console.log("Animation started with steps:", result);
};


  const runScheduling = () => {
    let output = [];
    if (algorithm === "SJF") {
      output = sjf(processes);
    } else {
      output = roundRobin(processes, quantum);
    }
    // console.log(`${algorithm} Result:`, output);
    simulateWithAnimation(output);
  };

  return (
    <div className="app">
      <h1 className="title">CPU Scheduling Simulator</h1>

      <ProcessForm addProcess={addProcess} />

      {processes.length > 0 && (
        <>
          <table className="process-table">
            <thead>
              <tr>
                <th>PID</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((p, i) => (
                <tr key={i}>
                  <td>{p.pid}</td>
                  <td>{p.arrival}</td>
                  <td>{p.burst}</td>
                  <td>
                    <button onClick={() => deleteProcess(i)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="form-button reset" onClick={resetProcesses}>
            Reset All
          </button>
        </>
      )}

      <Controls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        quantum={quantum}
        setQuantum={setQuantum}
        runScheduling={runScheduling}
      />

      
      <Timeline result={result} />
    </div>
  );
};

export default App;
