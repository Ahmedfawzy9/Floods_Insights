import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import logo from "../assets/logo.png";
import "./Layout.css";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <div className="logo-icon">
              <img
                src={logo}
                alt="Floods Insights Logo"
                className="logo-image"
              />
            </div>
            <span className="logo-text">Floods Insights</span>
          </div>

          <ul className="navbar-links">
            <li>
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/history" className="nav-link">
                History of Floods
              </Link>
            </li>
            <li>
              <Link to="/analyze" className="nav-link">
                Analyze
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
          </ul>

          <button
            className="theme-switcher"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src={logo}
              alt="Floods Insights"
              className="footer-logo-image"
            />
            <span className="footer-logo-text">Floods Insights</span>
          </div>
          <p className="footer-copyright">
            &copy; 2025 Floods Insights. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
