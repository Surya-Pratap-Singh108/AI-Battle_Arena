import React, { useEffect, useState } from "react";

function ProgressBar({ progress }) {
  return (
    <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function LoadingArena({ phase }) {
  const [progress1, setProgress1] = useState(10);
  const [progress2, setProgress2] = useState(10);
  const [progress3, setProgress3] = useState(10);

  // Mistral starts first
  useEffect(() => {
    if (phase >= 1) {
      const interval = setInterval(() => {
        setProgress1((prev) => (prev < 85 ? prev + 8 : prev));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [phase]);

  // Cohere starts later
  useEffect(() => {
    if (phase >= 2) {
      const interval = setInterval(() => {
        setProgress2((prev) => (prev < 80 ? prev + 7 : prev));
      }, 300);

      return () => clearInterval(interval);
    }
  }, [phase]);

  // Judge starts last
  useEffect(() => {
    if (phase >= 3) {
      const interval = setInterval(() => {
        setProgress3((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);

      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">

      {/* Mistral */}
      {phase >= 1 && (
        <div className="bg-zinc-900 rounded-2xl p-6 border border-green-500/30 shadow-lg shadow-green-500/10">
          <h3 className="text-green-400 font-semibold text-lg">
            🟢 Mistral Medium
          </h3>
          <p className="text-zinc-400 mt-3">Analyzing prompt...</p>
          <ProgressBar progress={progress1} />
        </div>
      )}

      {/* Cohere */}
      {phase >= 2 && (
        <div className="bg-zinc-900 rounded-2xl p-6 border border-purple-500/30 shadow-lg shadow-purple-500/10">
          <h3 className="text-purple-400 font-semibold text-lg">
            🟣 Cohere Command
          </h3>
          <p className="text-zinc-400 mt-3">Generating solution...</p>
          <ProgressBar progress={progress2} />
        </div>
      )}

      {/* Judge */}
      {phase >= 3 && (
        <div className="col-span-2 bg-zinc-900 rounded-2xl p-6 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
          <h3 className="text-yellow-400 font-semibold text-lg">
            🧠 Gemini Judge
          </h3>
          <p className="text-zinc-400 mt-3">Evaluating responses...</p>
          <ProgressBar progress={progress3} />
        </div>
      )}
    </div>
  );
}