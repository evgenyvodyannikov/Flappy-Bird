import React, { useState, useEffect, useCallback } from "react";

import Player from "./Player";
import MovingBackground from "./MovingBackground";
import Obstacle from "./Obstacle";

import BackgroundImage1 from "../assets/images/background1.png";
import BackgroundImage2 from "../assets/images/background2.jpg";

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
  const [obstacles, setObstacles] = useState<Array<any>>([]);

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

  const SpawnObstacles = () => {

    if(obstacles.length < obstacleCount){
      for(let i = 0; i < obstacleCount - obstacles.length; i++){

        let newObstacle = {movingSpeed: Math.random() * (5 - 1) + 1, posX:window.innerWidth, posY:window.innerHeight, width:100, height:100};
        obstacles.push(newObstacle)
        console.log(obstacles.length < obstacleCount)
        
      }
    }

  }

  useEffect(() => {

    SpawnObstacles();

    document.addEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, SpawnObstacles]);

  return (
    <div>
      <MovingBackground imageUrl={currentBackground} />
      <Player
        playerImage={playerImage}
        width={playerBoxWidth}
        height={playerBoxHeight}
      />
      {obstacles.map(({ movingSpeed, posX, posY, width, height }) => (
        <Obstacle movingSpeed={movingSpeed} posX={posX} posY={posY} width={width} height={height}/>
      ))}
    </div>
  );
};

export default Game;
