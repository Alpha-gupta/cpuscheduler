import React, { useState } from "react";
import ProcessForm from "./components/ProcessForm";
import Controls from "./components/Controls";
import Timeline from "./components/Timeline";
import "./App.css";

const App = () => {
  const [processes, setProcesses] = useState([]);
  const [result, setResult] = useState([]);
  const [algorithm, setAlgorithm] = useState("SJF");
  const [quantum, setQuantum] = useState(2);

  const addProcess = (process) => {
    setProcesses([...processes, process]);
  };

  const runScheduling = () => {
    let output = [];
    if (algorithm === "SJF") {
      output = sjf(processes);
    } else {
      output = roundRobin(processes, quantum);
    }
    setResult(output);
  };

  const sjf = (procList) => {
    const proc = [...procList].sort((a, b) => a.arrival - b.arrival);
    const n = proc.length;
    let time = 0;
    let completed = 0;
    const visited = new Array(n).fill(false);
    const result = [];

    while (completed < n) {
      let idx = -1;
      let minBurst = Infinity;

      for (let i = 0; i < n; i++) {
        if (!visited[i] && proc[i].arrival <= time && proc[i].burst < minBurst) {
          minBurst = proc[i].burst;
          idx = i;
        }
      }

      if (idx === -1) {
        time++;
        continue;
      }

      const start = time;
      time += proc[idx].burst;
      result.push({ ...proc[idx], start, end: time });
      visited[idx] = true;
      completed++;
    }

    return result;
  };

  const roundRobin = (procList, quantum) => {
    const proc = procList.map((p) => ({ ...p, remaining: p.burst }));
    let time = 0;
    const queue = [];
    const arrived = [...proc];
    const result = [];

    while (arrived.length || queue.length) {
      for (let i = 0; i < arrived.length; i++) {
        if (arrived[i].arrival <= time) {
          queue.push(arrived[i]);
          arrived.splice(i, 1);
          i--;
        }
      }

      if (!queue.length) {
        time++;
        continue;
      }

      const current = queue.shift();
      const start = time;
      const runTime = Math.min(current.remaining, quantum);
      time += runTime;
      current.remaining -= runTime;
      result.push({ ...current, start, end: time });

      for (let i = 0; i < arrived.length; i++) {
        if (arrived[i].arrival <= time) {
          queue.push(arrived[i]);
          arrived.splice(i, 1);
          i--;
        }
      }

      if (current.remaining > 0) queue.push(current);
    }

    return result;
  };

  return (
    <div className="app">
      <h1 className="title">CPU Scheduling Simulator</h1>
      <ProcessForm addProcess={addProcess} />
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
