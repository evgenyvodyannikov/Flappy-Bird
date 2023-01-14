import React, { useState, useEffect, useCallback } from "react";

import AnimatedRectangle from './Player'
import MovingBackground from './MovingBackground'
import BackgroundImage from '../assets/images/background.png'
import BackgroundImage1 from '../assets/images/background1.png'
import BackgroundImage2 from '../assets/images/background2.jpg'

const Game: React.FC = () => {

  const [currentBackground, setCurrentBackground] = useState<string>(BackgroundImage);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "c":
        setCurrentBackground(BackgroundImage1)
        console.log("handled");
        break;
      case "v":
        setCurrentBackground(BackgroundImage2)
        break;
      default:
        break;
    }
  }, []);


  useEffect(() => {

    document.addEventListener("keydown", handleKeyDown);

  }, [handleKeyDown]);

  return (
    <div >
      <MovingBackground imageUrl={currentBackground} />
      <AnimatedRectangle x={0} y={0} width={75} height={75} />
    </div>
    
  )
}

export default Game;