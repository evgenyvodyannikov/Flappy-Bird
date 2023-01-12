import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let currentFrame = 0;

    function updateFrame() {
      setFrame(currentFrame);
      currentFrame++;
      animationFrameId = requestAnimationFrame(updateFrame);
    }

    animationFrameId = requestAnimationFrame(updateFrame);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div>
      Frame: {frame}
    </div>
  );
}

export default App;