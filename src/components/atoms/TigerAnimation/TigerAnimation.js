import React, { useRef, useEffect } from 'react';
import './TigerAnimation.scss';
import tigerGif from '../../../assets/public/character03.gif';

const TigerAnimation = () => {
    const tigerRef = useRef(null);

    useEffect(() => {
        const updateTigerPos = () => {
            if (tigerRef.current) {
                const rect = tigerRef.current.getBoundingClientRect();
                tigerRef.current.style.setProperty('--tiger-left', `${rect.left}px`);
                tigerRef.current.style.setProperty('--tiger-top', `${rect.top}px`);
            }
            requestAnimationFrame(updateTigerPos);
        };
        const animationId = requestAnimationFrame(updateTigerPos);
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="tiger-container">
            <div className="tiger-wrapper" ref={tigerRef}>
                <img src={tigerGif} alt="Tiger" className="tiger-image dark" />
                <img src={tigerGif} alt="Tiger" className="tiger-image light" />
            </div>
        </div>
    );
};

export default TigerAnimation;
