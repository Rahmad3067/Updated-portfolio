import React from "react";
import "./Portfolio3DLoader.css";

const Portfolio3DLoader: React.FC = () => {
  return (
    <div className="portfolio-3d-loader">
      <div className="loader-container">
        <div className="loader-spaceship">
          <div className="spaceship-body"></div>
          <div className="spaceship-wing left"></div>
          <div className="spaceship-wing right"></div>
          <div className="spaceship-engine"></div>
        </div>
        <div className="loader-text">
          <h3>Launching 3D Portfolio</h3>
          <p>Preparing your space adventure...</p>
        </div>
        <div className="loader-stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio3DLoader;

