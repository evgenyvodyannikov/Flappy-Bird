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
  const [rectangle, setRectangle] = useState({ x: window.innerWidth / 4, y: window.innerHeight / 2 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isMovingByX, setIsMovingByX] = useState<boolean>(false);
  const [isMovingByY, setIsMovingByY] = useState<boolean>(false);

  // handle key pressed
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: -3 }));
        setIsMovingByY(true);
        break;
      case "s":
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: 3 }));
        setIsMovingByY(true);
        break;
      case "a":
        setVelocity((prevVelocity) => ({ ...prevVelocity, x: -3 }));
        setIsMovingByX(true);
        break;
      case "d":
        setVelocity((prevVelocity) => ({ ...prevVelocity, x: 3 }));
        setIsMovingByX(true);
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
        setIsMovingByY(false);
        break;
      case "s":
        setVelocity({ x: x, y: 0 });
        setIsMovingByY(false);
        break;
      case "a":
        setVelocity({ x: 0, y: y });
        setIsMovingByX(false);
        break;
      case "d":
        setVelocity({ x: 0, y: y });
        setIsMovingByX(false);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    function updateRectangle() {
      if (isMovingByX || isMovingByY) {
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
  }, [isMovingByX, isMovingByY, velocity, handleKeyDown, handleKeyUp]);

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