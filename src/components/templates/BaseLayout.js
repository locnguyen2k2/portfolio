import {Outlet, useLocation} from "react-router-dom";
import MainHeader from "../molecules/Header/MainHeader";
import {Context} from '../../Context';
import {useContext, useEffect, useState} from "react";
import Footer from "../molecules/Footer/Footer";
import axios from "axios";

export default function BaseLayout() {
    const {theme, language} = useContext(Context);
    const location = useLocation();
    const [count, setCount] = useState(0);
    const [currentRoute, setCurrentRoute] = useState(location.pathname);

    const callSend = () => {
        axios.get('https://laboratory-management-system.onrender.com/apis/categories').then((response) => {
            setCount(count + 1);
        })
    }

    useEffect(() => {
        setTimeout(() => {
            callSend()
        }, 20000)
    }, [count]);

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