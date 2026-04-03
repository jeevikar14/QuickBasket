import React, { useEffect, useState } from "react";

function getTimeLeft(target) {
  const now = new Date();
  const diff = Math.max(0, target - now);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
}

export default function FlashDealsBanner() {
  // Set a sample countdown (e.g., 2 hours from now)
  const [target] = useState(() => new Date(Date.now() + 2 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <section className="w-full flex items-center justify-center animate-fade-in py-2">
      <div className="flex flex-row items-center bg-gradient-to-r from-pink-500 to-yellow-400 rounded-xl px-6 py-2 shadow-md max-w-xl w-full gap-4 justify-center">
        <svg className="w-6 h-6 text-yellow-300 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046a1 1 0 00-1.6 0l-7 10A1 1 0 003 13h5v5a1 1 0 001.6.8l7-10A1 1 0 0017 3h-5V1a1 1 0 00-.7-.954z" /></svg>
        <span className="text-lg font-bold text-white tracking-wide animate-pulse">Flash Deals</span>
        <span className="bg-white text-pink-600 font-bold px-4 py-1 rounded-lg text-base shadow animate-bounce border-2 border-pink-300">
          {`${timeLeft.hours.toString().padStart(2, "0")}:${timeLeft.minutes.toString().padStart(2, "0")}:${timeLeft.seconds.toString().padStart(2, "0")}`} left
        </span>
        <span className="text-white text-sm font-semibold text-center">Hurry! Limited time offers!</span>
      </div>
    </section>
  );
}
