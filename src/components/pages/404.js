import Label from "../atoms/Lable/Label";
import { useState, useEffect } from "react";

export default function PageNotFound() {
    const [funnyText, setFunnyText] = useState("");
    const funnyTexts = [
        "Oops! You've reached the digital equivalent of a black hole.",
        "404: Page playing hide and seek. It's winning.",
        "Looks like you took a wrong turn in cyberspace!",
        "This page is on vacation. Probably somewhere with better Wi-Fi.",
        "Houston, we have a problem. Page not found!",
        "The page you're looking for is in another castle.",
        "Error 404: Page got lost during quantum teleportation."
    ];

    useEffect(() => {
        // Pick a random funny text
        const randomIndex = Math.floor(Math.random() * funnyTexts.length);
        setFunnyText(funnyTexts[randomIndex]);
    }, []);

    return (
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                maxWidth: '90%'
            }}>
                <Label content={'Oops! 404 Error'} />
                <p style={{
                    fontSize: '1.5rem',
                    margin: '1rem 0',
                    color: 'var(--text-color)',
                    fontWeight: 'bold',
                    animation: 'bounce 2s infinite'
                }}>
                    {funnyText}
                </p>
                <img 
                    src={require('./../../assets/public/windows.gif')} 
                    width={410} 
                    height={150}
                    alt="404 Error"
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        marginTop: '1rem'
                    }}
                />
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(5px)'
                }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        Try one of these instead:
                    </p>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <li><a href="/" style={{ color: 'var(--primary-color)' }}>Home</a></li>
                        <li><a href="/projects" style={{ color: 'var(--primary-color)' }}>Projects</a></li>
                        <li><a href="/skill" style={{ color: 'var(--primary-color)' }}>Skills</a></li>
                        <li><a href="/about" style={{ color: 'var(--primary-color)' }}>About</a></li>
                    </ul>
                </div>
            </div>
            <style jsx>{`
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </>
    )
}