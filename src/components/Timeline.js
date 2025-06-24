import React from "react";

const Timeline = ({ result }) => {
  return (
    <div className="timeline">
      {result.map((p, i) => (
        <div key={i} className="block">
          <div><strong>{p.pid}</strong></div>
          <div>{p.start} → {p.end}</div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
