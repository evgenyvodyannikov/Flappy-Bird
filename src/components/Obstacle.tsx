import React, { useState, useEffect } from 'react';

interface Props {}

const Test: React.FC<Props> = () => {
  const [x, setX] = useState<number>(window.innerWidth);
  const [rectangleRef, setRectangleRef] = useState<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(true);
    console.log('activated');
  }, []);

  useEffect(() => {
    if (isActive && rectangleRef) {
      const animate = () => {
        setX(prevX => prevX - 3);
        if (rectangleRef.getBoundingClientRect().left < 0) {
          setIsActive(false);
        }
        else requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      return () => setIsActive(false);
    }
  }, [isActive, rectangleRef]);

  return (
    <div>
      {isActive && (
        <div
          style={{
            position: 'absolute',
            left: x,
            top: 50,
            width: 100,
            height: 100,
            backgroundColor: 'red'
          }}
          ref={setRectangleRef}
        />
      )}
    </div>
  );
};

export default Test;
