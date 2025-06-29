export function sjf(processes) {
  const result = [];
  const ready = [];
  const n = processes.length;
  const visited = new Array(n).fill(false);
  let completed = 0;
  let time = 0;

  while (completed < n) {
    for (let i = 0; i < n; i++) {
      if (!visited[i] && processes[i].arrival <= time) {
        ready.push(processes[i]);
        visited[i] = true;
      }
    }

    if (ready.length === 0) {
      time++;
      continue;
    }

    ready.sort((a, b) => {
      if (a.burst === b.burst) return a.arrival - b.arrival;
      return a.burst - b.burst;
    });

    const current = ready.shift();
    const start = time;
    const end = start + current.burst;
    time = end;

    result.push({ ...current, start, end });
    completed++;
  }
  // console.log("SJF Result:", result);
  return result;
}
