export function roundRobin(processes, quantum) {
  const result = [];
  const queue = [];
  const arrived = processes.map(p => ({ ...p, remaining: p.burst }));
  let time = 0;

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
    const execTime = Math.min(current.remaining, quantum);
    time += execTime;
    current.remaining -= execTime;

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
  // console.log("Round Robin Result:", result);
  return result;
}
