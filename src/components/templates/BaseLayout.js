import {Outlet} from "react-router-dom";
import MainHeader from "../molecules/Header/MainHeader";
import {Context} from './../../Context';
import {useContext} from "react";
import Footer from "../molecules/Footer/Footer";

export default function BaseLayout() {
    const {theme} = useContext(Context);
    return (
        <main className={`${theme}`}>
            <MainHeader/>

            <div className={`container`}>
                <Outlet/>
            </div>
            <Footer/>
        </main>
    )
}