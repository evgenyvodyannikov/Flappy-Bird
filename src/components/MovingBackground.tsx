import React, { useEffect, useRef } from 'react';

interface Props {
    imageUrl: string;
}

const MovingBackground: React.FC<Props> = ({ imageUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        let xPos = 0;
        let animationFrameId: number;

        const moveBackground = () => {
            xPos -= 1;
            container!.style.backgroundPosition = `${xPos}px 0`;
            animationFrameId = requestAnimationFrame(moveBackground);
        }
        moveBackground();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div ref={containerRef} className="full" style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'repeat-x',
        }}></div>
        
    );
};

export default MovingBackground;