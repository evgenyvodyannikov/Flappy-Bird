import React, { useState, useEffect } from 'react';

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const AnimatedRectangle: React.FC<RectangleProps> = ({ x, y, width, height }) => {
  const [rectangle, setRectangle] = useState({ x, y });

  useEffect(() => {
    let animationFrameId: number;
    let velocity = 1;

    function updateRectangle() {
      setRectangle(prevRectangle => ({
        x: prevRectangle.x + velocity,
        y: prevRectangle.y + velocity,
      }));
      animationFrameId = requestAnimationFrame(updateRectangle);
    }

    animationFrameId = requestAnimationFrame(updateRectangle);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div style={{
      position: "absolute",
      left: rectangle.x,
      top: rectangle.y,
      width: width,
      height: height,
      backgroundColor: "red"
    }}>
    </div>
  );
}

export default AnimatedRectangle;