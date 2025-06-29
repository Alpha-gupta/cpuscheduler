import React, { useState } from "react";
import "./Form.css";

const ProcessForm = ({ addProcess }) => {
  const [pid, setPid] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pid || !arrival || !burst) return alert("Fill all fields!");
    addProcess({ pid, arrival: +arrival, burst: +burst });
    console.log(`Process added: PID=${pid}, Arrival=${arrival}, Burst=${burst}`);
    setPid("");
    setArrival("");
    setBurst("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input placeholder="PID" value={pid} onChange={e => setPid(e.target.value)} />
      <input placeholder="Arrival Time" type="number" value={arrival} onChange={e => setArrival(e.target.value)} />
      <input placeholder="Burst Time" type="number" value={burst} onChange={e => setBurst(e.target.value)} />
      <button className="form-button" type="submit">Add Process</button>
    </form>
  );
};

export default ProcessForm;
