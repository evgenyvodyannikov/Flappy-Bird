import React, { useState, useEffect, useCallback } from "react";

import Bird from "../assets/images/flappy.png";

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
  const [rectangle, setRectangle] = useState({ x: window.innerWidth / 10, y: window.innerHeight / 2 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState<boolean>(false);

  // handle key pressed
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: -2.5 }));
        setIsMoving(true);
        break;
      case "s":
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: 2.5 }));
        setIsMoving(true);
        break;
      default:
        break;
    }
  }, []);

  // handle key up so it not pressed anymore
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        setVelocity({ x: x, y: 0 });
        setIsMoving(false);
        break;
      case "s":
        setVelocity({ x: x, y: 0 });
        setIsMoving(false);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    function updateRectangle() {
      if (isMoving) {
        setRectangle((prevRectangle) => ({
          x: prevRectangle.x + velocity.x,
          y: prevRectangle.y + velocity.y,
        }));
        animationFrameId = requestAnimationFrame(updateRectangle);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    animationFrameId = requestAnimationFrame(updateRectangle);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isMoving, velocity, handleKeyDown, handleKeyUp]);

  return (
    <div
      className="bird"
      style={{
        position: "absolute",
        left: rectangle.x,
        top: rectangle.y,
        width: width,
        height: height,
      }}
    >
      <img
        src={Bird}
        alt="bird"
        style={{ maxWidth: "100%;", maxHeight: "100%" }}
      />
    </div>
  );
};

export default AnimatedRectangle;
