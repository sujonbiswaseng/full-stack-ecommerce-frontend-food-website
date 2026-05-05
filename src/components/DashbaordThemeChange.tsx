'use client'
import React, { useEffect, useState } from "react";

const DashbaordThemeChange = () => {
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "",
  );

  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div>
      <button
        aria-label="Toggle Theme"
        onClick={() => setDarkMode(!darkMode)}
        className="focus:outline-none rounded-md p-2 transition-colors text-lg text-muted-foreground hover:text-primary"
      >
        <span className="sr-only">Toggle theme</span>
        {darkMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default DashbaordThemeChange;
