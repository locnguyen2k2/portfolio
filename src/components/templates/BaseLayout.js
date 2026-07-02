import { Context } from '../../Context';
import Footer from "../molecules/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import MainHeader from "../molecules/Header/MainHeader";
import Sidebar from '../molecules/Sidebar/Sidebar';
import Tab from '../molecules/Tabs/Tab';
import Breadcrumb from '../molecules/Breadcrumbs/Breadcrumb';

export const tabs = [
    {
        title: 'navigation.about',
        tab: 'about',
        prefix: "html"
    },
    {
        title: 'navigation.skill',
        tab: 'skills',
        prefix: 'json'

    },
    {
        root: "projects&works",
        children: [
            {
                title: 'projects.abacNestjs.title',
                tab: 'ddd-dashboard',
                prefix: "ts",
            },
            {
                title: 'works.teknix.title',
                tab: 'teknix',
                prefix: "ts"
            },
            {
                title: 'works.datech.title',
                tab: 'datech',
                prefix: "js"
            },
            {
                title: 'projects.ems.title',
                tab: 'ems',
                prefix: 'graphql'
            },
            {
                title: 'projects.lms.title',
                tab: 'lms',
                prefix: 'ts'
            }
        ]
    },
    {
        title: 'Contact',
        tab: 'contact',
        prefix: "bash"
    }
]
export default function BaseLayout() {
    const { theme = 'dark', language = 'en' } = useContext(Context);
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState(location.pathname);
    const [fileActiveOn, setFileActiveOn] = useState('about');
    const [scrollProgress, setScrollProgress] = useState(0);
    const mainRef = useRef(null);

    const navigateTo = (id) => {
        setFileActiveOn(id);

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

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
        const container = document.querySelector('.container');
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;
            const totalHeight = scrollHeight - clientHeight;

            if (totalHeight <= 0) {
                setScrollProgress(0);
            } else {
                const progress = (scrollTop / totalHeight) * 100;
                setScrollProgress(Math.min(100, Math.max(0, progress)));
            }
        };

        handleScroll();
        container.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        // Multi-stage check to handle image loading and dynamic content
        const timers = [
            setTimeout(handleScroll, 100),
            setTimeout(handleScroll, 500),
            setTimeout(handleScroll, 1000),
            setTimeout(handleScroll, 2000),
        ];

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            timers.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        if (location.pathname !== currentRoute) {
            setCurrentRoute(`${location.pathname}`);
        }
    }, [location.pathname, currentRoute]);

    useEffect(() => {
        if (language !== localStorage.getItem('language')) {
            localStorage.setItem('language', language);
            window.location.reload();
        }
    }, [language, currentRoute]);

    return (
        <main ref={mainRef} className={`${theme}`}>
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
            <div className="bg-layer dark"></div>
            <div className="bg-layer light"></div>
            <div className="glowing-blob"></div>
            <div className={'dark-filter'}></div>
            <MainHeader currentRoute={currentRoute} />
            <Sidebar tabs={tabs} fileActiveOn={fileActiveOn} navigateTo={navigateTo} />
            <Tab tabs={tabs} fileActiveOn={fileActiveOn} navigateTo={navigateTo} />
            <Breadcrumb tabs={tabs} fileActiveOn={fileActiveOn} navigateTo={navigateTo} />

            <div className={`container`}>
                <Outlet />
            </div>

            <Footer />
        </main>
    );
}