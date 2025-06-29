import React from "react";
import "./Timeline.css";

const Timeline = ({ result }) => {
  if (!result || result.length === 0) return null;
  // console.log("Timeline result:", result);

  return (
    <div className="timeline">
      {result.map((p) =>
        p ? (
          <div key={`${p.pid}-${p.start}`} className="block">
            <div><strong>{p.pid}</strong></div>
            <div>{p.start} → {p.end}</div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Timeline;
