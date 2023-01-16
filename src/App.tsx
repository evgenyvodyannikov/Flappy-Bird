import React, { useState, useEffect, useCallback } from "react";
import Game from "./components/Game";

import BackgroundImage from "./assets/images/background.png";
import PlayerImage from "./assets/images/flappy.png";
import Test from "./components/Obstacle";

const App: React.FC = () => {
  return (
    <div>
      <Game
        backgroundImage={BackgroundImage}
        playerImage={PlayerImage}
        playerBoxHeight={75}
        playerBoxWidth={75}
        obstacleCount={5}
      />
    </div>
  );
};

export default App;
