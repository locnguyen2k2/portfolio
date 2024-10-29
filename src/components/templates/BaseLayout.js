import {Outlet, useLocation} from "react-router-dom";
import MainHeader from "../molecules/Header/MainHeader";
import {Context} from '../../Context';
import {useContext, useEffect, useState} from "react";
import Footer from "../molecules/Footer/Footer";

export default function BaseLayout() {
    const {theme} = useContext(Context);
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState("About");

    useEffect(() => {
        setCurrentRoute(`${location.pathname}`);
    }, [location.pathname])

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