"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "SYSTEM BOOT v1.0 .............. OK",
  "LOADING MODULES ................ OK",
  "ESTABLISHING CONNECTION ........ OK",
  "WELCOME TO ZAVEROUS.NET",
];

export default function BootSequence() {
  const [done, setDone]           = useState(false);
  const [lineIdx, setLineIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [complete, setComplete]   = useState<string[]>([]);

  useEffect(() => {
    if (done) return;

    if (lineIdx >= BOOT_LINES.length) {
      setDone(true);
      return;
    }

    const line = BOOT_LINES[lineIdx];

    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setComplete((prev) => [...prev, line]);
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 320);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, done]);

  const typing = done ? null : (BOOT_LINES[lineIdx]?.slice(0, charIdx) ?? "");

  return (
    <div className="boot-sequence">
      {complete.map((line, i) => (
        <div key={i} className="boot-line glow-green">
          {line}
        </div>
      ))}
      {!done && (
        <div className="boot-line glow-green">
          {typing}
          <span className="boot-cursor">{"\u2588"}</span>
        </div>
      )}
    </div>
  );
}
