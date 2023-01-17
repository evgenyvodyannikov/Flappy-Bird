import React, { useState, useEffect, useCallback } from "react";

import Player from "./Player";
import MovingBackground from "./MovingBackground";
import Obstacle from "./Obstacle";

import BackgroundImage1 from "../assets/images/background1.png";
import BackgroundImage2 from "../assets/images/background2.jpg";
import { idText } from "typescript";

interface GameSettings {
  playerImage: string;
  playerBoxWidth: number;
  playerBoxHeight: number;
  backgroundImage: string;
  obstacleCount: number;
}


const Game: React.FC<GameSettings> = ({
  playerImage,
  playerBoxWidth,
  playerBoxHeight,
  backgroundImage,
  obstacleCount,
}) => {
  const [currentBackground, setCurrentBackground] =
    useState<string>(backgroundImage);
  const [obstacles, setObstacles] = useState<Array<{id: number, movingSpeed: number, posX: number, posY: number, width: number, height: number}>>([]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "c":
        setCurrentBackground(BackgroundImage1);
        console.log("handled");
        break;
      case "v":
        setCurrentBackground(BackgroundImage2);
        break;
      default:
        break;
    }
  }, []);

  const handleObstacleUnMount = (id: number) => {
    setObstacles((prevObstacles) => {
      return prevObstacles.filter((obstacle) => {
        return obstacle.id !== id;
      });
    });
  };

  useEffect(() => {

    setObstacles([]);

    const SpawnObstacles = () => {

      if (obstacles.length < obstacleCount) {

        console.log(obstacles)
        for (let i = 0; i <= obstacleCount - obstacles.length; i++) {

          let newObstacle = {
            id: i,
            movingSpeed: Math.random() * (5 - 1) + 1,
            posX: window.innerWidth,
            posY: window.innerHeight,
            width: 100,
            height: 100,
          };

          setObstacles((prev) => {
            return [...prev, newObstacle]
          });
        }
        
      }
      requestAnimationFrame(SpawnObstacles);
    };

    SpawnObstacles();

    document.addEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div>
      <MovingBackground imageUrl={currentBackground} />
      <Player
        playerImage={playerImage}
        width={playerBoxWidth}
        height={playerBoxHeight}
      />
      {obstacles.map(({ movingSpeed, posX, posY, width, height, id }) => (
        <Obstacle
          movingSpeed={movingSpeed}
          posX={posX}
          posY={posY}
          width={width}
          height={height}
          id={id}
          handleUnmount={handleObstacleUnMount}
        />
      ))}
    </div>
  );
};

export default Game;
