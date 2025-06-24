import React, { useState } from "react";

const ProcessForm = ({ addProcess }) => {
  const [pid, setPid] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addProcess({ pid, arrival: +arrival, burst: +burst });
    setPid("");
    setArrival("");
    setBurst("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className="form-input" placeholder="PID" value={pid} onChange={(e) => setPid(e.target.value)} required />
      <input className="form-input" type="number" placeholder="Arrival" value={arrival} onChange={(e) => setArrival(e.target.value)} required />
      <input className="form-input" type="number" placeholder="Burst" value={burst} onChange={(e) => setBurst(e.target.value)} required />
      <button className="form-button" type="submit">Add Process</button>
    </form>
  );
};

export default ProcessForm;
