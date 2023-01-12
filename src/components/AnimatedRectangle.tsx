import React, { useState, useEffect, useCallback } from "react";

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const AnimatedRectangle: React.FC<RectangleProps> = ({
  x,
  y,
  width,
  height,
}) => {
  const [rectangle, setRectangle] = useState({ x, y });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;

    function updateRectangle() {
      setRectangle((prevRectangle) => ({
        x: prevRectangle.x + velocity.x,
        y: prevRectangle.y + velocity.y,
      }));
      animationFrameId = requestAnimationFrame(updateRectangle);
    }

    animationFrameId = requestAnimationFrame(updateRectangle);

    return () => cancelAnimationFrame(animationFrameId);
  }, [velocity]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: -1 }));
        break;
      case "a":
        setVelocity((prevVelocity) => ({ ...prevVelocity, x: -1 }));
        break;
      case "s":
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: 1 }));
        break;
      case "d":
        setVelocity((prevVelocity) => ({ ...prevVelocity, x: 1 }));
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    function updateRectangle() {
      setRectangle((prevRectangle) => ({
        x: prevRectangle.x + velocity.x,
        y: prevRectangle.y + velocity.y,
      }));
      animationFrameId = requestAnimationFrame(updateRectangle);
    }

    document.addEventListener("keydown", handleKeyPress);
    animationFrameId = requestAnimationFrame(updateRectangle);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [velocity, handleKeyPress]);

  return (
    <div
      style={{
        position: "absolute",
        left: rectangle.x,
        top: rectangle.y,
        width: width,
        height: height,
        backgroundColor: "red",
      }}
    ></div>
  );
};

export default AnimatedRectangle;
