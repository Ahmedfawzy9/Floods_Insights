import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <i className="fa-solid fa-water"></i>
        <h2>Natural Disasters</h2>
      </div>
      <ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="../drought/index.html">Droughts</a></li>
        <li><a href="../earthquake/index.html">Earthquakes</a></li>
        <li><a href="../wildfire/index.html">Wildfires</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;