import React, { useState, useEffect } from 'react';

interface Props {
  movingSpeed: number,
  posX: number,
  posY: number,
  width: number,
  height: number,
  handleUnmount: Function,
  id: number,
}

const Obstacle: React.FC<Props> = ({movingSpeed, posX, posY, width, height, handleUnmount, id}) => {
  const [x, setX] = useState<number>(posX);
  const [y, setY] = useState<number>(posY);
  const [rectangleRef, setRectangleRef] = useState<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(true);
    console.log('activated');
  }, []);

  useEffect(() => {
    if (isActive && rectangleRef) {
      const animate = () => {
        setX(prevX => prevX - movingSpeed);
        if (rectangleRef.getBoundingClientRect().left < 0) {
          setIsActive(false);
        }
        else requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      return () => {
        setIsActive(false);
        handleUnmount(id);
      }
    }
  }, [isActive, rectangleRef]);

  return (
    <div>
      {isActive && (
        <div
          style={{
            position: 'absolute',
            left: x - width,
            top: y - height,
            width: width,
            height: height,
            backgroundColor: 'red'
          }}
          ref={setRectangleRef}
        />
      )}
    </div>
  );
};

export default Obstacle;
