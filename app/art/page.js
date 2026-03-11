"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";

const ROWS = 6;
const COLS = 5;
const STATES = ["empty", "green", "yellow"];
const COLORS = {
  empty: "#3a3a3c",
  green: "#538d4e",
  yellow: "#b59f3b",
};

export default function Page() {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill("empty"))
  );

  function handleClick(row, col) {
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      const currentIndex = STATES.indexOf(next[row][col]);
      next[row][col] = STATES[(currentIndex + 1) % STATES.length];
      return next;
    });
  }

  return (
    <>
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-sm mb-8 mt-4">
          Wordle Art Maker
        </h1>
        <div className="grid gap-1" style={{ gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
          {grid.map((row, r) => (
            <div key={r} className="flex gap-1">
              {row.map((cell, c) => (
                <button
                  key={c}
                  onClick={() => handleClick(r, c)}
                  className="w-16 h-16 cursor-pointer"
                  style={{ backgroundColor: COLORS[cell] }}
                />
              ))}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
