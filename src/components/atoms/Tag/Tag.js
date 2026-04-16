import React, { useRef, useEffect, useState } from 'react';
import './Tag.scss';

const Tag = ({ children, color }) => {
    const tagRef = useRef(null);
    const [randomColor] = useState(() => {
        if (color) return color;
        const colors = [
            '#3178C6',
            '#F7DF1E',
            '#0170FE',
            '#7A86B8',
            '#da2640',
            '#E34F26',
            '#1572B6',
            '#06B6D4',
            '#4479A1',
            '#00ed64',
            '#e10098',
            '#FF6600',
            '#5A29E4',
            '#38B832',
            '#FF6C37',
            '#fc6d26'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    });

    useEffect(() => {
        const updatePos = () => {
            if (tagRef.current) {
                const rect = tagRef.current.getBoundingClientRect();
                tagRef.current.style.setProperty('--tag-left', `${rect.left}px`);
                tagRef.current.style.setProperty('--tag-top', `${rect.top}px`);
            }
            requestAnimationFrame(updatePos);
        };
        const id = requestAnimationFrame(updatePos);
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className="tech-tag" ref={tagRef} style={{ '--tag-color': randomColor }}>
            <div className="tag-border"></div>
            <div className="tag-content">{children}</div>
        </div>
    );
};

export default Tag;
