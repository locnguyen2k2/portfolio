import {Outlet, useLocation} from "react-router-dom";
import MainHeader from "../molecules/Header/MainHeader";
import {Context} from '../../Context';
import {useContext, useEffect, useState} from "react";
import Footer from "../molecules/Footer/Footer";

export default function BaseLayout() {
    const {theme, language} = useContext(Context);
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState(location.pathname);

    useEffect(() => {
        if (location.pathname !== currentRoute) {
            setCurrentRoute(`${location.pathname}`);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (language !== localStorage.getItem('language')) {
            window.location.href = currentRoute;
            localStorage.setItem('language', language);
        }
    }, [language]);

    return (
        <main className={`${theme}`}>
            <div className={'dark-filter'}></div>
            <MainHeader currentRoute={currentRoute}/>

            <div className={`container`}>
                <Outlet/>
            </div>

            <Footer/>
        </main>
    )
}