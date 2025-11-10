import React from 'react';

const Hero = () => {
  return (
    <header className="hero">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="color"></h1> {/* للحفاظ على تأثير الـ animation من CSS */}
        <p>Understanding the causes, effects, and prevention methods.</p>
      </div>
    </header>
  );
};

export default Hero;