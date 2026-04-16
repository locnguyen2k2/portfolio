import { Context } from '../../Context';
import Footer from "../molecules/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import MainHeader from "../molecules/Header/MainHeader";
import TigerAnimation from '../atoms/TigerAnimation/TigerAnimation';

export default function BaseLayout() {
    const { theme = 'dark', language = 'en' } = useContext(Context);
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState(location.pathname);
    const mainRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (mainRef.current) {
                const { clientX, clientY } = e;
                const rect = mainRef.current.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;

                mainRef.current.style.setProperty('--mouse-x', `${x}px`);
                mainRef.current.style.setProperty('--mouse-y', `${y}px`);
                mainRef.current.style.setProperty('--mouse-color', `hsla(200, 80%, 70%, 0.3)`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (location.pathname !== currentRoute) {
            setCurrentRoute(`${location.pathname}`);
        }
    }, [location.pathname, currentRoute]);

    useEffect(() => {
        if (language !== localStorage.getItem('language')) {
            window.location.href = currentRoute;
            localStorage.setItem('language', language);
        }
    }, [language, currentRoute]);

    return (<main ref={mainRef} className={`${theme}`}>
        <div className="bg-layer dark"></div>
        <div className="bg-layer light"></div>
        <div className="glowing-blob"></div>
        <div className={'dark-filter'}></div>
        <MainHeader currentRoute={currentRoute} />

        <div className={`container`}>
            <Outlet />
        </div>

        <TigerAnimation />

        <Footer />
    </main>)
}