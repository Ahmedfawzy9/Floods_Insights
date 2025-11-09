import { useState } from "react";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function handleThemeToggle() {
    setIsDarkMode(!isDarkMode);
  }
  return (
    <header>
      <div className="logo">Floods Insights</div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">History Of Floods</a>
          </li>
          <li>
            <a href="/">Analyze</a>
          </li>
          <li>
            <a href="/">About Us</a>
          </li>
        </ul>
      </nav>
      <div className="theme-toggler">
        <button onClick={handleThemeToggle}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}
