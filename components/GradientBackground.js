'use client'; // Add this directive at the top of the file

import { useEffect } from 'react';
import '/styles/gradient.css'; // Import the CSS file

const GradientBackground = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/greentfrapp/pocoloco@minigl/minigl.js';
    script.async = true;
    script.onload = () => {
      const gradient = new Gradient();
      gradient.initGradient("#canvas");
    };
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="background--custom">
      <canvas id="canvas" />
    </div>
  );
};

export default GradientBackground;
