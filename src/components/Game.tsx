import React, { useState, useEffect, useCallback } from "react";

import Player from "./Player";
import MovingBackground from "./MovingBackground";

import BackgroundImage1 from "../assets/images/background1.png";
import BackgroundImage2 from "../assets/images/background2.jpg";

interface GameSettings {
  playerImage: string;
  playerBoxWidth: number;
  playerBoxHeight: number;
  backgroundImage: string;
}

const Game: React.FC<GameSettings> = ({
  playerImage,
  playerBoxWidth,
  playerBoxHeight,
  backgroundImage,
}) => {
  const [currentBackground, setCurrentBackground] =
    useState<string>(backgroundImage);

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

  useEffect(() => {
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
    </div>
  );
};

export default Game;
